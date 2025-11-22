"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Updated interface to match the new batched API response
interface TranscriptionResult {
  text: string;
  chunks: Array<{
    timestamp: [number, number];
    text: string;
  }>;
  processing_time_seconds: number;
  filename: string;
  language: string;
}

export default function MakeCallPage() {
  const { user, personnel } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState(0);
  const [processingStage, setProcessingStage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/m4a', 'audio/x-m4a'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|webm|m4a)$/i)) {
        setError('Lütfen geçerli bir ses dosyası seçin (MP3, WAV, OGG, WebM, M4A)');
        return;
      }
      setSelectedFile(file);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Lütfen önce bir ses dosyası seçin');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProcessingTime(0);
    setProcessingStage("API'ye bağlanılıyor...");

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setProcessingTime(elapsed);
    }, 1000);

    try {
      const formData = new FormData();
      formData.append('audio_file', selectedFile);
      formData.append('language', 'tr'); // 'tr' for Turkish

      const apiUrl = process.env.NEXT_PUBLIC_WHISPER_API_URL || 'https://melihkerem03--callmetric-ai-api-batched-whispermodel-fastapi-app.modal.run/transcribe';
      
      setProcessingStage("Whisper Large V3 modeli ile işleniyor... (Dynamic Batching 🚀)");

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (process.env.NODE_ENV !== 'production') {
          console.error('API Error:', errorText);
        }
        throw new Error(`API Hatası: ${response.status} - ${errorText}`);
      }

      setProcessingStage("Sonuçlar alınıyor...");
      const data: TranscriptionResult = await response.json();

      setResult(data);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Hata detayı:', err);
      }
      setError(err instanceof Error ? err.message : 'Ses dosyası işlenirken bir hata oluştu');
    } finally {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsProcessing(false);
      setProcessingStage("İşlem tamamlandı!");
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Ses Analizi (Transkripsiyon) 
          <span className="ml-3 text-sm font-normal px-3 py-1 bg-purple-600 rounded-full">Whisper Large V3 🚀</span>
        </h1>
        <p className="text-gray-400">Ses dosyası yükleyin ve metne çevirin</p>
        
        {personnel && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Giriş yapıldı: <strong>{personnel.ad} {personnel.soyad}</strong></span>
          </div>
        )}
      </div>

      {/* Info Box - Dynamic Batching */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-500/20 rounded-lg p-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">⚡ Dynamic Batching Aktif</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Whisper Large V3 modeli ile çalışıyoruz. Dynamic batching sayesinde 
              <strong className="text-blue-400"> 2.8x'e kadar performans artışı</strong> sağlanıyor. 
              A10G GPU üzerinde maksimum 64 ses dosyası aynı anda işlenebiliyor.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">Türkçe Destekli</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">Timestamp Desteği</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">A10G GPU</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1d2e] rounded-2xl p-8 border border-gray-800 mb-6">
        <h2 className="text-xl font-bold text-white mb-6">Ses Dosyası Yükle</h2>
        
        <div className="space-y-6">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,.mp3,.wav,.ogg,.webm,.m4a"
              onChange={handleFileSelect}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {selectedFile ? (
                  <>
                    <p className="mb-2 text-lg font-semibold text-white">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold text-white">Dosya seçmek için tıklayın</span> veya sürükle bırak
                    </p>
                    <p className="text-xs text-gray-500">MP3, WAV, OGG, WebM, M4A</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {isProcessing && (
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{processingStage}</h3>
                    <p className="text-sm text-gray-400 mt-1">Geçen süre: {processingTime} saniye</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isProcessing}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  İşleniyor ({processingTime}s)
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Metne Çevir
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={isProcessing}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Temizle
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-500 mb-1">Hata</h3>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Transkripsiyon Sonucu
              </h3>
              {result.processing_time_seconds && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400">
                    İşlem süresi: <strong className="text-blue-400">{result.processing_time_seconds.toFixed(2)}s</strong>
                  </span>
                </div>
              )}
            </div>
            <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {result.text}
              </pre>
            </div>
          </div>

          {result.chunks && result.chunks.length > 0 && (
            <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Detaylı Segmentler ({result.chunks.length} segment)
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {result.chunks.map((chunk, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                       <span className="text-xs text-gray-500">
                        {chunk.timestamp[0]?.toFixed(2)}s - {chunk.timestamp[1]?.toFixed(2)}s
                      </span>
                    </div>
                    <p className="text-gray-200 text-sm">{chunk.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

