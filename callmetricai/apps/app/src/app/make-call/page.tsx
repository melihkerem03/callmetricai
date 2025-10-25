"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState, useRef } from "react";

interface CallerAnalysis {
  sentiment: string;
  tone: string;
  main_issue: string;
  satisfaction_level: string;
  key_concerns: string[];
}

interface AgentPerformance {
  professionalism_score: number;
  empathy_score: number;
  problem_solving_score: number;
  communication_score: number;
  overall_score: number;
  strengths: string[];
  improvement_areas: string[];
  key_actions: string[];
}

interface CallAnalysis {
  call_summary: string;
  call_duration_analysis: string;
  resolution_status: string;
  caller_analysis: CallerAnalysis;
  agent_performance: AgentPerformance;
  recommendations: string[];
}

interface TranscriptionResult {
  detected_language: string;
  transcript_with_speakers: string;
  raw_segments: Array<{
    start: number;
    end: number;
    text: string;
    speaker?: string;
  }>;
  call_analysis?: CallAnalysis;
}

export default function MakeCallPage() {
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
      // Ses dosyası kontrolü
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

    // Süre sayacını başlat (sadece süre için, mesaj yok)
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setProcessingTime(elapsed);
    }, 1000);

    try {
      const formData = new FormData();
      formData.append('audio_file', selectedFile);

      console.log('📤 Ses dosyası gönderiliyor:', selectedFile.name);
      console.log('📊 Dosya boyutu:', (selectedFile.size / 1024 / 1024).toFixed(2), 'MB');
      console.log('🌐 API URL:', 'https://melihkerem03--whisperx-diarization-api-fastapi-app.modal.run');
      
      setProcessingStage("Ses dosyası yükleniyor...");

      const response = await fetch(
        'https://melihkerem03--whisperx-diarization-api-fastapi-app.modal.run',
        {
          method: 'POST',
          body: formData,
          // 10 dakikalık timeout ekle (CPU modu için uzun işlemler)
          signal: AbortSignal.timeout(600000), // 10 dakika = 600000ms
        }
      ).catch((fetchError) => {
        console.error('🔥 Fetch error:', fetchError);
        if (fetchError.name === 'TimeoutError') {
          throw new Error('İşlem 10 dakikadan uzun sürdü. Lütfen daha kısa bir ses dosyası deneyin veya işlemin tamamlanmasını bekleyin.');
        }
        throw new Error(`Bağlantı hatası: ${fetchError.message}`);
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`API Hatası: ${response.status} - ${errorText}`);
      }

      setProcessingStage("Sonuçlar alınıyor...");
      const data = await response.json();
      console.log('✅ API Response:', data);
      console.log('🎤 Algılanan Dil:', data.detected_language);
      console.log('📝 Segment sayısı:', data.raw_segments?.length || 0);

      setProcessingStage("Tamamlandı!");
      setResult(data);
    } catch (err) {
      console.error('💥 Hata detayı:', err);
      setError(err instanceof Error ? err.message : 'Ses dosyası işlenirken bir hata oluştu');
    } finally {
      // Timer'ı durdur
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsProcessing(false);
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
        <h1 className="text-3xl font-bold text-white mb-2">Ses Analizi</h1>
        <p className="text-gray-400">Ses dosyası yükleyin ve konuşmacılara göre analiz edin</p>
      </div>

      {/* Upload Section */}
      <div className="bg-[#1a1d2e] rounded-2xl p-8 border border-gray-800 mb-6">
        <h2 className="text-xl font-bold text-white mb-6">Ses Dosyası Yükle</h2>
        
        <div className="space-y-6">
          {/* File Input */}
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

          {/* Processing Status */}
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
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-500">{processingTime}s</div>
                  {processingTime > 120 && (
                    <div className="text-xs text-yellow-400 mt-1">
                      ⚠️ Normal süreden uzun
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 transition-all duration-1000 animate-pulse"
                  style={{ 
                    width: processingTime < 120 ? `${(processingTime / 120) * 100}%` : '100%' 
                  }}
                ></div>
              </div>
              
              {processingTime > 180 && (
                <div className="mt-4 bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 text-sm text-yellow-200">
                  <strong>💡 İpucu:</strong> Uzun ses dosyaları için işlem 2-5 dakika sürebilir. Modal Dashboard'dan logları kontrol edebilirsiniz.
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
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
                  Analiz Et
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

      {/* Error Display */}
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

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Language Detection */}
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Algılanan Dil
            </h3>
            <p className="text-2xl font-semibold text-white uppercase">
              {result.detected_language}
            </p>
          </div>

          {/* Transcript with Speakers */}
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Konuşmacılar ve Metin
            </h3>
            <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {result.transcript_with_speakers}
              </pre>
            </div>
          </div>

          {/* Call Analysis - AI Powered */}
          {result.call_analysis && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Performans Analizi
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/30 rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Çözüm Durumu</div>
                    <div className={`text-xl font-bold ${
                      result.call_analysis.resolution_status === 'Çözüldü' ? 'text-green-400' :
                      result.call_analysis.resolution_status === 'Kısmen Çözüldü' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {result.call_analysis.resolution_status}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Genel Başarı</div>
                    <div className="text-3xl font-bold text-purple-400">
                      {result.call_analysis.agent_performance.overall_score}%
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Süre Değerlendirmesi</div>
                    <div className="text-sm text-gray-300 font-medium">
                      {result.call_analysis.call_duration_analysis}
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Görüşme Özeti</div>
                  <p className="text-gray-200 leading-relaxed">{result.call_analysis.call_summary}</p>
                </div>
              </div>

              {/* Agent Performance */}
              <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Personel Performansı
                </h3>
                
                {/* Performance Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Profesyonellik', score: result.call_analysis.agent_performance.professionalism_score, color: 'blue' },
                    { label: 'Empati', score: result.call_analysis.agent_performance.empathy_score, color: 'purple' },
                    { label: 'Problem Çözme', score: result.call_analysis.agent_performance.problem_solving_score, color: 'green' },
                    { label: 'İletişim', score: result.call_analysis.agent_performance.communication_score, color: 'yellow' },
                  ].map(({label, score, color}) => (
                    <div key={label} className="bg-gray-800 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-2">{label}</div>
                      <div className="flex items-end gap-2">
                        <div className={`text-3xl font-bold text-${color}-400`}>{score}</div>
                        <div className="text-gray-500 mb-1">/100</div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-900/20 border border-green-700 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Güçlü Yönler
                    </h4>
                    <ul className="space-y-2">
                      {result.call_analysis.agent_performance.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Gelişim Alanları
                    </h4>
                    <ul className="space-y-2">
                      {result.call_analysis.agent_performance.improvement_areas.map((area, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Actions */}
                <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3">Önemli Aksiyonlar</h4>
                  <ul className="space-y-2">
                    {result.call_analysis.agent_performance.key_actions.map((action, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Caller Analysis */}
              <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Arayan Kişi Analizi
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Ruh Hali</div>
                    <div className="text-lg font-semibold text-white">{result.call_analysis.caller_analysis.sentiment}</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Ton</div>
                    <div className="text-lg font-semibold text-white">{result.call_analysis.caller_analysis.tone}</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Memnuniyet</div>
                    <div className="text-lg font-semibold text-white">{result.call_analysis.caller_analysis.satisfaction_level}</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="text-sm text-gray-400 mb-2">Ana Sorun</div>
                  <p className="text-gray-200">{result.call_analysis.caller_analysis.main_issue}</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-3">Ana Endişeler</div>
                  <ul className="space-y-2">
                    {result.call_analysis.caller_analysis.key_concerns.map((concern, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Öneriler
                </h3>
                <ul className="space-y-3">
                  {result.call_analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-lg">{idx + 1}</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Detailed Segments */}
          {result.raw_segments && result.raw_segments.length > 0 && (
            <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Detaylı Segmentler ({result.raw_segments.length} segment)
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {result.raw_segments.map((segment, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-semibold text-purple-400">
                        {segment.speaker || 'UNKNOWN'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {segment.start?.toFixed(2)}s - {segment.end?.toFixed(2)}s
                      </span>
                    </div>
                    <p className="text-gray-200 text-sm">{segment.text}</p>
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

