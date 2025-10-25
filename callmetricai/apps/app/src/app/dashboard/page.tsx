"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { dashboardService, callsService } from "@/lib/database";

export default function DashboardPage() {
  const { user, personnel } = useAuth();
  const [stats, setStats] = useState({
    totalCalls: 0,
    completedCalls: 0,
    avgScore: 0,
    todayCalls: 0,
    activePersonnel: 0 // Admin için
  });
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && personnel) {
      loadDashboardData();
    }
  }, [user, personnel]);

  const loadDashboardData = async () => {
    try {
      console.log('Loading dashboard data for personnel:', personnel);
      
      if (!personnel?.id) {
        console.error('No personnel ID found!');
        setLoading(false);
        return;
      }
      
      if (personnel?.yonetici) {
        // Admin dashboard
        console.log('Loading admin stats...');
        const adminStats = await dashboardService.getAdminStats();
        console.log('Admin stats:', adminStats);
        setStats(adminStats);
        
        const { data: allCalls, error: callsError } = await callsService.getAllCalls();
        console.log('All calls:', allCalls, 'Error:', callsError);
        setRecentCalls(allCalls?.slice(0, 5) || []);
      } else {
        // Personnel dashboard
        console.log('Loading personnel stats for:', personnel?.id);
        const personnelStats = await dashboardService.getPersonnelStats(personnel?.id || '');
        console.log('Personnel stats:', personnelStats);
        setStats({ ...personnelStats, activePersonnel: 0 });
        
        const { data: personnelCalls, error: callsError } = await callsService.getPersonnelCalls(personnel?.id || '');
        console.log('Personnel calls:', personnelCalls, 'Error:', callsError);
        console.log('Total calls:', personnelCalls?.length || 0);
        setRecentCalls(personnelCalls?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {personnel?.yonetici ? 'Yönetici Dashboard' : 'Personel Dashboard'}
        </h1>
        <p className="text-gray-400">
          {personnel?.yonetici 
            ? 'Tüm personel ve görüşmelerin genel durumu' 
            : `Hoş geldiniz, ${personnel?.ad} ${personnel?.soyad}`
          }
        </p>
        {personnel && (
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-300">
            <span className="px-2 py-1 bg-blue-600 rounded-full">
              {personnel.departman === 'satis' && 'Satış Temsilcisi'}
              {personnel.departman === 'teknik' && 'Teknik Personel'}
              {personnel.departman === 'musteri_hizmetleri' && 'Müşteri Hizmetleri'}
            </span>
            <span>Personel ID: {personnel.personel_id}</span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 - Görüşmeler */}
        <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <button className="text-gray-500 hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">
            {loading ? "..." : stats.totalCalls}
          </h3>
          <p className="text-gray-400 text-sm">Toplam Görüşme</p>
        </div>

        {/* Card 2 - Analiz Edilenler */}
        <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <button className="text-gray-500 hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <h3 className="text-3xl font-bold text-blue-500 mb-2">
            {loading ? "..." : stats.completedCalls}
          </h3>
          <p className="text-gray-400 text-sm">Tamamlanan Görüşme</p>
        </div>

        {/* Card 3 - Pozitif Görüşmeler */}
        <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <button className="text-gray-500 hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <h3 className="text-3xl font-bold text-green-500 mb-2">
            {loading ? "..." : stats.avgScore}
          </h3>
          <p className="text-gray-400 text-sm">Ortalama Puan</p>
        </div>

        {/* Card 4 - Negatif Görüşmeler */}
        <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </div>
            <button className="text-gray-500 hover:text-gray-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <h3 className="text-3xl font-bold text-purple-500 mb-2">
            {loading ? "..." : stats.todayCalls}
          </h3>
          <p className="text-gray-400 text-sm">Bugünkü Görüşmeler</p>
        </div>
      </div>

      {/* Recent Calls Section */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Son Görüşmeler</h2>
          <button className="text-purple-400 hover:text-purple-300 text-sm">
            Tümünü Gör
          </button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : recentCalls.length > 0 ? (
          <div className="space-y-4">
            {recentCalls.map((call: any) => (
              <div key={call.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    call.gorusme_durumu === 'tamamlandi' ? 'bg-green-500' :
                    call.gorusme_durumu === 'aktif' ? 'bg-blue-500' :
                    call.gorusme_durumu === 'kacirildi' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="text-white font-medium">
                      {call.musteri_adi || 'İsimsiz Müşteri'}
                    </p>
                    <p className="text-gray-400 text-sm">{call.musteri_telefon}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">
                    {call.gorusme_tipi === 'gelen' ? 'Gelen' : 'Giden'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(call.gorusme_tarihi).toLocaleDateString('tr-TR')}
                  </p>
                  {call.gorusme_puani && (
                    <p className="text-yellow-400 text-sm">
                      ⭐ {call.gorusme_puani}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Henüz görüşme kaydı bulunmuyor</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

