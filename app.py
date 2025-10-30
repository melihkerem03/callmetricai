import modal
import os
import tempfile

# 1. GEREKLİ KÜTÜPHANELERİ TANIMLAMA (MODAL IMAGE)
# CPU MODU - cuDNN sorunlarını tamamen bypass et
whisperx_image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("ffmpeg", "git", "pkg-config")
    .pip_install(
        "pydub",
        "faster-whisper==1.0.3",
        "fastapi",
        "python-multipart",
        "numpy<2.0",
        "pandas",
        # LangChain + OpenAI kütüphaneleri
        "langchain",
        "langchain-openai",
        "pydantic>=2.0",
    )
    # WhisperX'i GitHub'dan yükle (CPU modu için)
    .pip_install(
        "whisperx @ git+https://github.com/m-bain/whisperX.git",
    )
)

app = modal.App(name="whisperx-diarization-api", image=whisperx_image)

# Secrets
hf_secret = modal.Secret.from_name("hf-secret")
openai_secret = modal.Secret.from_name("openai-secret")

# Global değişkenler (models cache için)
whisper_model = None
diarize_model = None
align_models_cache = {}
device = None
torch_device = None


def load_models():
    """Modelleri yükle - CPU modunda (kararlı, cuDNN sorunları yok)"""
    global whisper_model, diarize_model, device, torch_device
    
    import whisperx
    import torch
    from pyannote.audio import Pipeline
    
    # CPU modu (cuDNN sorunlarını bypass et)
    device_str = "cpu"
    device = device_str
    torch_device = torch.device(device_str)
    
    print(f"🚀 Using device: {device} (CPU mode - stable)")
    print("⚠️  Note: Processing will be slower but 100% stable (no cuDNN issues)")
    
    # Whisper modelini yükle (CPU için int8)
    print("📥 Loading Whisper model (large-v3)...")
    whisper_model = whisperx.load_model("large-v3", device, compute_type="int8")
    
    # Diarization modelini yükle (CPU modunda)
    print("📥 Loading Diarization model (pyannote)...")
    diarize_model = Pipeline.from_pretrained(
        "pyannote/speaker-diarization-3.1",
        use_auth_token=os.environ["HF_TOKEN"]
    ).to(torch_device)
    
    print("✅ All models loaded successfully in CPU mode!")


def get_align_model(lang_code):
    """Alignment modelini yükle veya cache'den al"""
    import whisperx
    
    if lang_code not in align_models_cache:
        try:
            print(f"Loading alignment model for: {lang_code}")
            model, metadata = whisperx.load_align_model(language_code=lang_code, device=device)
            align_models_cache[lang_code] = (model, metadata)
        except Exception as e:
            print(f"Warning: Could not load alignment model for {lang_code}: {e}")
            return None, None
        
    return align_models_cache.get(lang_code, (None, None))


# Pydantic modelleri - Çağrı merkezi analizi için
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Union

class CallerAnalysis(BaseModel):
    """Arayan kişi analizi"""
    sentiment: str = Field(description="Arayanın genel ruh hali (Olumlu/Nötr/Olumsuz)")
    tone: str = Field(description="Konuşma tonu (Sakin/Sinirli/Endişeli/Memnun)")
    main_issue: str = Field(description="Arayanın ana sorunu veya amacı")
    satisfaction_level: str = Field(description="Memnuniyet seviyesi (Yüksek/Orta/Düşük)")
    key_concerns: List[str] = Field(description="Arayanın ana endişeleri (liste)")

class AgentPerformance(BaseModel):
    """Çağrı merkezi personeli performans analizi"""
    professionalism_score: int = Field(description="Profesyonellik puanı (0-100)", ge=0, le=100)
    empathy_score: int = Field(description="Empati puanı (0-100)", ge=0, le=100)
    problem_solving_score: int = Field(description="Problem çözme puanı (0-100)", ge=0, le=100)
    communication_score: int = Field(description="İletişim kalitesi puanı (0-100)", ge=0, le=100)
    overall_score: int = Field(description="Genel başarı yüzdesi (0-100)", ge=0, le=100)
    strengths: List[str] = Field(description="Güçlü yönler (liste)")
    improvement_areas: List[str] = Field(description="Gelişim alanları (liste)")
    key_actions: List[str] = Field(description="Personelin yaptığı önemli aksiyonlar")
    
    # Float'ları int'e çevir
    @field_validator('professionalism_score', 'empathy_score', 'problem_solving_score', 
                     'communication_score', 'overall_score', mode='before')
    @classmethod
    def round_scores(cls, v: Union[int, float]) -> int:
        """Float skorları integer'a yuvarla"""
        if isinstance(v, float):
            return round(v)
        return v

class CallCenterAnalysis(BaseModel):
    """Tam çağrı merkezi analizi"""
    call_summary: str = Field(description="Görüşme özeti (2-3 cümle)")
    call_duration_analysis: str = Field(description="Görüşme süresi değerlendirmesi")
    resolution_status: str = Field(description="Çözüm durumu (Çözüldü/Kısmen Çözüldü/Çözülmedi)")
    caller_analysis: CallerAnalysis = Field(description="Arayan kişi analizi")
    agent_performance: AgentPerformance = Field(description="Personel performans analizi")
    recommendations: List[str] = Field(description="Öneriler (liste)")


def analyze_call_with_openai(diarized_transcript: str, language: str = "en") -> dict:
    """
    Diarization yapılmış konuşmayı OpenAI ile analiz et
    
    Args:
        diarized_transcript: Speaker etiketli transkript (örn: "SPEAKER_00: Hello\nSPEAKER_01: Hi")
        language: Tespit edilen dil
    
    Returns:
        Analiz sonuçları (JSON)
    """
    from langchain_openai import ChatOpenAI
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import PydanticOutputParser
    
    print("🤖 Analyzing call with OpenAI...")
    
    # Pydantic parser oluştur
    parser = PydanticOutputParser(pydantic_object=CallCenterAnalysis)
    
    # Prompt oluştur
    system_message = """You are an expert call center quality analyst. 
Analyze the following call center conversation transcript and provide a comprehensive analysis.

The transcript shows a conversation between a customer (caller) and a call center agent.
Usually SPEAKER_00 is the agent and SPEAKER_01 is the caller, but analyze the content to determine roles.

Provide detailed analysis including:
- Call summary and resolution status
- Caller sentiment, tone, and satisfaction
- Agent performance scores (0-100) for professionalism, empathy, problem-solving, and communication
- Overall success percentage
- Strengths and areas for improvement
- Actionable recommendations

Be objective, specific, and constructive in your analysis."""

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_message),
        ("human", """Analyze this call center conversation:

{transcript}

Language: {language}

{format_instructions}""")
    ])
    
    # LLM oluştur
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.3,
        openai_api_key=os.environ["OPENAI_API_KEY"]
    )
    
    # Chain oluştur
    chain = prompt | llm | parser
    
    # Analiz yap
    try:
        result = chain.invoke({
            "transcript": diarized_transcript,
            "language": language,
            "format_instructions": parser.get_format_instructions()
        })
        
        print("✅ OpenAI analysis completed!")
        return result.model_dump()
    
    except Exception as e:
        print(f"❌ OpenAI analysis error: {e}")
        import traceback
        traceback.print_exc()
        raise


def process_audio_internal(audio_bytes: bytes):
    """Ses dosyasını işle"""
    import whisperx
    from pydub import AudioSegment
    import time
    
    start_time = time.time()
    print(f"🎵 Audio file received: {len(audio_bytes) / 1024 / 1024:.2f} MB")
    
    # Geçici dosya oluştur
    with tempfile.NamedTemporaryFile(delete=False, suffix=".tmp") as temp_in:
        temp_in.write(audio_bytes)
        temp_in_path = temp_in.name
    
    try:
        # WAV formatına dönüştür
        print("🔄 Converting to WAV format...")
        sound = AudioSegment.from_file(temp_in_path)
        sound = sound.set_frame_rate(16000).set_channels(1)
        duration = len(sound) / 1000.0  # saniye cinsinden
        print(f"⏱️  Audio duration: {duration:.2f}s")
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_out:
            sound.export(temp_out.name, format="wav")
            audio_path = temp_out.name
        
        os.remove(temp_in_path)
        
        # Ses dosyasını yükle
        audio_input = whisperx.load_audio(audio_path)

        # Transkripsyon
        print("🎤 Transcribing audio...")
        trans_start = time.time()
        whisper_result = whisper_model.transcribe(audio_input, batch_size=16)
        detected_lang = whisper_result["language"]
        print(f"✅ Transcription done in {time.time() - trans_start:.2f}s - Language: {detected_lang}")
        
        # Alignment
        print("🔗 Aligning transcription...")
        align_start = time.time()
        align_model, align_metadata = get_align_model(detected_lang)
        
        if align_model:
            aligned_result = whisperx.align(
                whisper_result["segments"],
                align_model,
                align_metadata,
                audio_input,
                device,
                return_char_alignments=False
            )
            segments_for_diarization = aligned_result["segments"]
            print(f"✅ Alignment done in {time.time() - align_start:.2f}s")
        else:
            segments_for_diarization = whisper_result["segments"]
            print(f"⚠️  No alignment model for {detected_lang}, using raw segments")
        
        # Diarization (dosya yolu gerekiyor, numpy array değil)
        print("👥 Diarizing speakers...")
        diar_start = time.time()
        diarize_segments = diarize_model(audio_path)
        print(f"✅ Diarization done in {time.time() - diar_start:.2f}s")
        
        # Speaker assignment
        print("🎯 Assigning speakers to segments...")
        assign_start = time.time()
        # Diarization annotation'ı pandas DataFrame'e çevir
        import pandas as pd
        diarize_df = pd.DataFrame([
            {'start': turn.start, 'end': turn.end, 'speaker': speaker}
            for turn, _, speaker in diarize_segments.itertracks(yield_label=True)
        ])
        
        # assign_word_speakers(diarization_df, aligned_segments) formatı
        if align_model:
            final_result = whisperx.assign_word_speakers(diarize_df, aligned_result)
        else:
            # Alignment olmadıysa whisper_result kullan
            final_result = whisperx.assign_word_speakers(diarize_df, whisper_result)
        print(f"✅ Speaker assignment done in {time.time() - assign_start:.2f}s")
        
        # Format sonuç
        diarized_text = ""
        for segment in final_result["segments"]:
            speaker = segment.get('speaker', 'UNKNOWN')
            text = segment.get('text', '').strip()
            if text:
                diarized_text += f"{speaker}: {text}\n"

        os.remove(audio_path)
        
        print(f"🎉 Transcription processing time: {time.time() - start_time:.2f}s")
        
        # OpenAI ile çağrı merkezi analizi yap
        analysis_start = time.time()
        try:
            call_analysis = analyze_call_with_openai(diarized_text, detected_lang)
            print(f"✅ Analysis completed in {time.time() - analysis_start:.2f}s")
        except Exception as e:
            print(f"⚠️  Analysis failed: {e}, continuing without analysis")
            call_analysis = None
        
        total_time = time.time() - start_time
        print(f"🎉 Total processing time: {total_time:.2f}s")
        
        result = {
            "detected_language": detected_lang,
            "transcript_with_speakers": diarized_text,
            "raw_segments": final_result["segments"],
        }
        
        # Analiz varsa ekle
        if call_analysis:
            result["call_analysis"] = call_analysis
        
        return result
    
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        if os.path.exists(temp_in_path):
            os.remove(temp_in_path)
        raise


# Modal'a ASGI app'i bağla (CPU modu - kararlı)
@app.function(
    image=whisperx_image,
    cpu=8.0,  # 8 CPU core (hızlı işlem için)
    memory=16384,  # 16GB RAM (modeller için)
    secrets=[hf_secret, openai_secret],  # HuggingFace + OpenAI
    timeout=900,  # CPU için daha uzun timeout
)
@modal.asgi_app()
def fastapi_app():
    from fastapi import FastAPI, UploadFile, File
    from fastapi.responses import JSONResponse
    from fastapi.middleware.cors import CORSMiddleware
    
    web_app = FastAPI()
    
    # CORS middleware ekle (tüm origin'lere izin ver)
    web_app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    @web_app.post("/")
    async def upload_audio(audio_file: UploadFile = File(...)):
        """Ses dosyası yükle ve işle"""
        try:
            # Modeller yüklü değilse yükle
            if whisper_model is None:
                load_models()
            
            # Dosyayı oku
            audio_bytes = await audio_file.read()
            
            # İşle
            result = process_audio_internal(audio_bytes)
            
            return JSONResponse(content=result)
        
        except Exception as e:
            print(f"Endpoint error: {e}")
            return JSONResponse(
                status_code=500,
                content={"error": str(e)}
            )
    
    return web_app
