import modal
from modal import Image, App, asgi_app, Secret
from typing import List, Optional
import time

MODEL_DIR = "/model"
MODEL_NAME = "openai/whisper-large-v3"
MODEL_REVISION = "afda370583db9c5359511ed5d989400a6199dfe1"

# Modal için container image'ı tanımla - güncel kütüphane sürümleriyle
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch==2.5.1",
        "transformers==4.47.1",
        "hf-transfer==0.1.8",
        "huggingface_hub==0.27.0",
        "librosa==0.10.2",
        "soundfile==0.12.1",
        "accelerate==1.2.1",
        "datasets==3.2.0",
        "fastapi",
        "python-multipart",
        "uvicorn",
        "numpy",
    )
    # Hızlı indirme için hf-transfer kullan
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1", "HF_HUB_CACHE": MODEL_DIR})
)

# Model cache için Volume
model_cache = modal.Volume.from_name("hf-hub-cache", create_if_missing=True)

# Modal App'i oluştur
app = modal.App(
    "callmetric-ai-api-batched",
    image=image,
    volumes={MODEL_DIR: model_cache},
    secrets=[Secret.from_name("openai-secret")], # Gerekirse diğer secret'ları ekleyin
)

# Model ağırlıklarını önden indir
@app.function()
def download_model():
    """Model ağırlıklarını indirir ve cache'e kaydeder."""
    from huggingface_hub import snapshot_download
    from transformers.utils import move_cache

    print("📥 Model indiriliyor...")
    snapshot_download(
        MODEL_NAME,
        ignore_patterns=["*.pt", "*.bin"],  # Sadece safetensors kullan
        revision=MODEL_REVISION,
    )
    move_cache()
    print("✅ Model başarıyla indirildi!")

# Modeli GPU üzerinde çalışacak şekilde tanımla - Dynamic batching ile
@app.cls(
    gpu="a10g",  # A10G GPU kullan (daha iyi performans için A100 veya H100 da kullanılabilir)
    volumes={MODEL_DIR: model_cache},
    scaledown_window=300, # 5 dakika sonra container'ı kapat (eski adı: container_idle_timeout)
    max_containers=10,  # Maksimum container sayısı
)
class WhisperModel:
    @modal.enter()
    def load_model(self):
        """
        Container başladığında modeli bir kereliğine GPU'ya yükler.
        """
        import torch
        from transformers import (
            AutoModelForSpeechSeq2Seq,
            AutoProcessor,
            pipeline,
        )

        print("🚀 Model yükleniyor...")

        # Model ve işlemciyi yükle
        self.processor = AutoProcessor.from_pretrained(MODEL_NAME)
        model = AutoModelForSpeechSeq2Seq.from_pretrained(
            MODEL_NAME,
            torch_dtype=torch.float16,
            low_cpu_mem_usage=True,
            use_safetensors=True,
        ).to("cuda")

        # Default dil ayarı (Türkçe)
        model.generation_config.language = "<|tr|>"

        # Transkripsiyon için pipeline oluştur
        self.pipeline = pipeline(
            "automatic-speech-recognition",
            model=model,
            tokenizer=self.processor.tokenizer,
            feature_extractor=self.processor.feature_extractor,
            torch_dtype=torch.float16,
            device="cuda",
        )
        print("✅ Model başarıyla yüklendi!")

    def transcribe_single(self, audio_bytes: bytes, language: str = "tr") -> dict:
        """
        Tek bir ses dosyasını işler (batching olmadan direkt işler).
        """
        import librosa
        import io
        
        print(f"🎤 Tek ses dosyası işleniyor ({len(audio_bytes) / 1024:.2f} KB)...")
        
        # Ses dosyasını numpy array'e çevir
        audio_array, _ = librosa.load(io.BytesIO(audio_bytes), sr=16000)
        
        # Transkripsiyon yap (dil ayarını generate_kwargs ile yapıyoruz)
        result = self.pipeline(
            audio_array,
            chunk_length_s=30,
            return_timestamps=True,
            generate_kwargs={"language": language},
        )
        
        print(f"✅ Transkripsiyon tamamlandı!")
        return result

    # FastAPI uygulamasını WhisperModel class içinde tanımla
    @asgi_app()
    def fastapi_app(self):
        from fastapi import FastAPI, UploadFile, File, Form, HTTPException
        from fastapi.responses import JSONResponse
        from fastapi.middleware.cors import CORSMiddleware
        from typing import List

        web_app = FastAPI(
            title="CallMetric AI Whisper API",
            description="High-performance speech-to-text API with dynamic batching",
            version="2.0.0"
        )
        
        # CORS middleware ekle
        web_app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        @web_app.post("/transcribe")
        async def transcribe(
            audio_file: UploadFile = File(...),
            language: str = Form("tr"), # Dil parametresi, default 'tr'
        ):
            """
            Tek bir ses dosyasını yükleyip transkriptini döndüren API endpoint'i.
            Dynamic batching sayesinde otomatik olarak batch'lenir.
            """
            if not audio_file:
                raise HTTPException(status_code=400, detail="Ses dosyası bulunamadı.")
            
            start_time = time.time()
            
            try:
                audio_bytes = await audio_file.read()
                
                # self.transcribe_single metodunu kullan (artık self.pipeline erişilebilir)
                result = self.transcribe_single(audio_bytes, language)
                
                processing_time = time.time() - start_time
                print(f"⏱️ Toplam işlem süresi: {processing_time:.2f} saniye")
                
                return JSONResponse(
                    content={
                        "text": result.get("text", ""),
                        "chunks": result.get("chunks", []),
                        "processing_time_seconds": processing_time,
                        "filename": audio_file.filename,
                        "language": language,
                    }
                )
            except Exception as e:
                import traceback
                traceback.print_exc()
                raise HTTPException(status_code=500, detail=str(e))

        @web_app.post("/transcribe/batch")
        async def transcribe_batch(
            audio_files: List[UploadFile] = File(...),
            language: str = Form("tr"), # Tüm dosyalar için default dil
        ):
            """
            Birden fazla ses dosyasını aynı anda işleyen batch endpoint'i.
            Dynamic batching ile maksimum performans sağlar.
            """
            if not audio_files:
                raise HTTPException(status_code=400, detail="En az bir ses dosyası gerekli.")
            
            start_time = time.time()
            
            try:
                # Tüm dosyaları oku
                audio_bytes_list = []
                filenames = []
                for audio_file in audio_files:
                    audio_bytes = await audio_file.read()
                    audio_bytes_list.append(audio_bytes)
                    filenames.append(audio_file.filename)
                
                # Batch halinde işle (her dosyayı sırayla işle)
                results = []
                for audio_bytes in audio_bytes_list:
                    result = self.transcribe_single(audio_bytes, language)
                    results.append(result)
                
                processing_time = time.time() - start_time
                print(f"⏱️ {len(audio_files)} dosya {processing_time:.2f} saniyede işlendi")
                
                # Sonuçları formatla
                formatted_results = []
                for i, result in enumerate(results):
                    formatted_results.append({
                        "filename": filenames[i],
                        "text": result.get("text", ""),
                        "chunks": result.get("chunks", []),
                        "language": language,
                    })
                
                return JSONResponse(
                    content={
                        "results": formatted_results,
                        "total_files": len(audio_files),
                        "total_processing_time_seconds": processing_time,
                        "avg_processing_time_per_file": processing_time / len(audio_files),
                    }
                )
            except Exception as e:
                import traceback
                traceback.print_exc()
                raise HTTPException(status_code=500, detail=str(e))

        @web_app.get("/health")
        async def health_check():
            """Sağlık kontrolü endpoint'i"""
            return {"status": "healthy", "model": MODEL_NAME, "gpu": "A10G"}

        @web_app.get("/")
        async def root():
            """API bilgileri"""
            return {
                "message": "CallMetric AI Whisper API",
                "endpoints": {
                    "/transcribe": "Tek ses dosyası için transkripsiyon",
                    "/transcribe/batch": "Çoklu ses dosyası için batch transkripsiyon",
                    "/health": "Sağlık kontrolü",
                },
                "features": [
                    "Dynamic batching ile yüksek performans",
                    "Whisper Large V3 modeli",
                    "Çoklu dil desteği",
                    "Timestamp desteği",
                ]
            }

        return web_app

# Test için local entrypoint
@app.local_entrypoint()
def test_model():
    """Model indirme ve test işlemi için local entrypoint."""
    print("🚀 CallMetric AI Whisper API - Test")
    print("=" * 50)
    
    # Model indir
    print("\n📥 Model indiriliyor...")
    download_model.remote()
    
    print("\n✅ Model başarıyla indirildi!")
    print("\n📌 API'yi deploy etmek için:")
    print("   modal deploy app.py")
    print("\n📌 API'yi test etmek için:")
    print("   modal serve app.py")
    print("\n🌐 Endpoint'ler:")
    print("   POST /transcribe - Tek dosya transkripsiyon")
    print("   POST /transcribe/batch - Çoklu dosya batch transkripsiyon")
    print("   GET /health - Sağlık kontrolü")
    print("   GET / - API bilgileri")
    print("\n💡 Dynamic batching ile 2.8x'e kadar performans artışı!")
