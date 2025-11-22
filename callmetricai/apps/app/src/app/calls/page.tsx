"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { callsService } from "@/lib/database";

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

interface CallAnalysisData {
  call_summary: string;
  call_duration_analysis: string;
  resolution_status: string;
  caller_analysis: CallerAnalysis;
  agent_performance: AgentPerformance;
  recommendations: string[];
}

interface Call {
  id: string;
  gorusme_adi: string;
  gorusme_tarihi: string;
  gorusme_suresi: number;
  gorusme_durumu: string;
  gorusme_puani: number;
  transkript: string;
  dil: string;
  musteri_memnuniyeti: string;
  ai_ozet: string;
  ai_onerileri: string;
  call_analysis?: CallAnalysisData | string | null;  // Can be JSON string or object
}

export default function CallsPage() {
  const { user, personnel } = useAuth();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [filter, setFilter] = useState<'all' | 'tamamlandi' | 'devam_ediyor' | 'iptal'>('all');

  useEffect(() => {
    loadCalls();
  }, [personnel]);

  const loadCalls = async () => {
    if (!personnel?.id) return;

    setLoading(true);
    try {
      let data, error;
      
      if (personnel.yonetici) {
        // Admin: tüm görüşmeleri getir
        ({ data, error } = await callsService.getAllCalls());
      } else {
        // Personnel: sadece kendi görüşmeleri
        ({ data, error } = await callsService.getPersonnelCalls(personnel.id));
      }

      if (error) {
        console.error('Error loading calls:', error);
      } else {
        setCalls(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCalls = calls.filter(call => 
    filter === 'all' ? true : call.gorusme_durumu === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'tamamlandi': 'bg-green-900/30 border-green-700 text-green-400',
      'devam_ediyor': 'bg-yellow-900/30 border-yellow-700 text-yellow-400',
      'iptal': 'bg-red-900/30 border-red-700 text-red-400'
    };
    return colors[status] || 'bg-gray-900/30 border-gray-700 text-gray-400';
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'tamamlandi': 'Tamamlandı',
      'devam_ediyor': 'Devam Ediyor',
      'iptal': 'İptal'
    };
    return map[status] || status;
  };

  // Parse call_analysis (JSON string veya object olabilir)
  const parseCallAnalysis = (call: Call): CallAnalysisData | null => {
    if (!call.call_analysis) return null;
    
    try {
      if (typeof call.call_analysis === 'string') {
        return JSON.parse(call.call_analysis);
      }
      return call.call_analysis as CallAnalysisData;
    } catch (e) {
      console.error('Failed to parse call_analysis:', e);
      return null;
    }
  };

  // Debug loading issues
  useEffect(() => {
    if (!loading && !personnel) {
      console.error('⚠️ Personnel data missing in calls page!');
      console.log('User:', user);
    }
  }, [loading, personnel, user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Görüşmeler yükleniyor...</p>
            <p className="text-xs text-gray-500 mt-2">Bu 5 saniyeden uzun sürüyorsa, RLS politikası sorunu olabilir</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!personnel) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center bg-yellow-900/30 border border-yellow-700 rounded-xl p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Personnel Verisi Yüklenemedi</h3>
            <p className="text-gray-300 mb-4">
              Kullanıcı bilgileriniz veritabanında bulunamadı. 
              Görüşmeleri listeleyebilmek için personnel kaydınızın olması gerekiyor.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              🔄 Yeniden Dene
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Görüşmeler</h1>
        <p className="text-gray-400">
          {personnel?.yonetici ? 'Tüm görüşmeleri' : 'Görüşme geçmişinizi'} görüntüleyin
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-400 font-medium">Filtrele:</span>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Tümü' },
              { value: 'tamamlandi', label: 'Tamamlandı' },
              { value: 'devam_ediyor', label: 'Devam Ediyor' },
              { value: 'iptal', label: 'İptal' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="ml-auto text-gray-400">
            <span className="font-semibold text-white">{filteredCalls.length}</span> görüşme
          </div>
        </div>
      </div>

      {/* Calls Grid */}
      {filteredCalls.length === 0 ? (
        <div className="bg-[#1a1d2e] rounded-2xl p-12 border border-gray-800 text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <h3 className="text-xl font-bold text-white mb-2">Henüz görüşme yok</h3>
          <p className="text-gray-400">Ses analizi yaparak ilk görüşmenizi kaydedin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800 hover:border-purple-600 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  {call.gorusme_adi}
                </h3>
                <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(call.gorusme_durumu)}`}>
                  {getStatusText(call.gorusme_durumu)}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Puan</p>
                  <p className="text-2xl font-bold text-purple-400">{call.gorusme_puani || 0}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Süre</p>
                  <p className="text-lg font-semibold text-white">{formatDuration(call.gorusme_suresi)}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(call.gorusme_tarihi)}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Dil: {call.dil?.toUpperCase()}
                </div>
              </div>

              {/* View Detail */}
              <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Detayları Gör
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCall(null)}>
          <div className="bg-[#1a1d2e] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1a1d2e] border-b border-gray-800 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{selectedCall.gorusme_adi}</h2>
              <button
                onClick={() => setSelectedCall(null)}
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {(() => {
                const analysis = parseCallAnalysis(selectedCall);
                
                return (
                  <>
                    {/* Language & Basic Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">Dil</p>
                        <p className="text-lg font-bold text-white uppercase">{selectedCall.dil}</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">Puan</p>
                        <p className="text-2xl font-bold text-purple-400">{selectedCall.gorusme_puani || 0}</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">Süre</p>
                        <p className="text-xl font-semibold text-white">{formatDuration(selectedCall.gorusme_suresi)}</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">Durum</p>
                        <div className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(selectedCall.gorusme_durumu)}`}>
                          {getStatusText(selectedCall.gorusme_durumu)}
                        </div>
                      </div>
                    </div>

                    {/* Transkript with Speakers */}
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Konuşmacılar ve Metin
                      </h3>
                      <div className="bg-black/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                          {selectedCall.transkript}
                        </pre>
                      </div>
                    </div>

                    {/* AI Analysis - If available */}
                    {analysis && (
                      <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg p-6 border border-purple-500/30">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            AI Performans Analizi
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                              <div className="text-xs text-gray-400 mb-1">Çözüm Durumu</div>
                              <div className={`text-lg font-bold ${
                                analysis.resolution_status === 'Resolved' || analysis.resolution_status === 'Çözüldü' ? 'text-green-400' :
                                analysis.resolution_status === 'Partially Resolved' || analysis.resolution_status === 'Kısmen Çözüldü' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {analysis.resolution_status}
                              </div>
                            </div>
                            
                            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                              <div className="text-xs text-gray-400 mb-1">Genel Başarı</div>
                              <div className="text-3xl font-bold text-purple-400">
                                {analysis.agent_performance.overall_score}%
                              </div>
                            </div>
                            
                            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                              <div className="text-xs text-gray-400 mb-1">Süre Değerlendirmesi</div>
                              <div className="text-xs text-gray-300">
                                {analysis.call_duration_analysis}
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <div className="text-xs text-gray-400 mb-2">Görüşme Özeti</div>
                            <p className="text-sm text-gray-200 leading-relaxed">{analysis.call_summary}</p>
                          </div>
                        </div>

                        {/* Agent Performance */}
                        <div className="bg-gray-800 rounded-lg p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Personel Performansı
                          </h3>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[
                              { label: 'Profesyonellik', score: analysis.agent_performance.professionalism_score },
                              { label: 'Empati', score: analysis.agent_performance.empathy_score },
                              { label: 'Problem Çözme', score: analysis.agent_performance.problem_solving_score },
                              { label: 'İletişim', score: analysis.agent_performance.communication_score },
                            ].map(({label, score}) => (
                              <div key={label} className="bg-black/30 rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">{label}</div>
                                <div className="flex items-end gap-1">
                                  <div className="text-2xl font-bold text-white">{score}</div>
                                  <div className="text-gray-500 text-sm mb-0.5">/100</div>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                                    style={{ width: `${score}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Güçlü Yönler</h4>
                              <ul className="space-y-1">
                                {analysis.agent_performance.strengths.map((s, idx) => (
                                  <li key={idx} className="text-xs text-gray-300">• {s}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚡ Gelişim Alanları</h4>
                              <ul className="space-y-1">
                                {analysis.agent_performance.improvement_areas.map((a, idx) => (
                                  <li key={idx} className="text-xs text-gray-300">• {a}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Caller Analysis */}
                        <div className="bg-gray-800 rounded-lg p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Arayan Kişi Analizi
                          </h3>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-black/30 rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">Ruh Hali</div>
                              <div className="text-sm font-semibold text-white">{analysis.caller_analysis.sentiment}</div>
                            </div>
                            <div className="bg-black/30 rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">Ton</div>
                              <div className="text-sm font-semibold text-white">{analysis.caller_analysis.tone}</div>
                            </div>
                            <div className="bg-black/30 rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">Memnuniyet</div>
                              <div className="text-sm font-semibold text-white">{analysis.caller_analysis.satisfaction_level}</div>
                            </div>
                          </div>

                          <div className="bg-black/30 rounded-lg p-4 mb-3">
                            <div className="text-xs text-gray-400 mb-2">Ana Sorun</div>
                            <p className="text-sm text-gray-200">{analysis.caller_analysis.main_issue}</p>
                          </div>

                          <div className="bg-black/30 rounded-lg p-4">
                            <div className="text-xs text-gray-400 mb-2">Ana Endişeler</div>
                            <ul className="space-y-1">
                              {analysis.caller_analysis.key_concerns.map((c, idx) => (
                                <li key={idx} className="text-sm text-gray-300">• {c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-gray-800 rounded-lg p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Öneriler
                          </h3>
                          <ul className="space-y-2">
                            {analysis.recommendations.map((rec, idx) => (
                              <li key={idx} className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-3 text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-cyan-400 font-bold">{idx + 1}</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <div className="text-sm text-gray-400 text-center pt-4 border-t border-gray-800">
                      Kayıt Tarihi: {formatDate(selectedCall.gorusme_tarihi)}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
