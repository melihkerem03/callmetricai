"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { personnelService } from "@/lib/database";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, personnel, signOut } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const [profileData, setProfileData] = useState({
    ad: "",
    soyad: "",
    email: "",
    departman: "",
    pozisyon: "",
    personel_id: "",
  });

  useEffect(() => {
    if (personnel && user) {
      setProfileData({
        ad: personnel.ad || "",
        soyad: personnel.soyad || "",
        email: user.email || "",
        departman: personnel.departman || "",
        pozisyon: personnel.pozisyon || "",
        personel_id: personnel.personel_id || "",
      });
    }
  }, [personnel, user]);

  const handleSave = async () => {
    if (!personnel?.id) return;
    
    setIsSaving(true);
    setMessage(null);

    try {
      const { error } = await personnelService.updatePersonnel(personnel.id, {
        ad: profileData.ad,
        soyad: profileData.soyad,
        pozisyon: profileData.pozisyon,
      });

      if (error) {
        setMessage({ type: 'error', text: `Hata: ${error.message}` });
      } else {
        setMessage({ type: 'success', text: '✅ Profil başarıyla güncellendi!' });
        setIsEditing(false);
        // Reload page to refresh auth context
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: `Bir hata oluştu: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };

  const getDepartmanText = (dep: string) => {
    const map: Record<string, string> = {
      'satis': 'Satış',
      'teknik': 'Teknik Destek',
      'musteri_hizmetleri': 'Müşteri Hizmetleri'
    };
    return map[dep] || dep;
  };

  // Debug: Show loading state with timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!personnel && user && process.env.NODE_ENV !== 'production') {
        console.error('⚠️ Personnel data not loading after 5 seconds!');
        console.log('User ID:', user?.id);
        console.log('Session:', user);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [personnel, user]);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Oturum yükleniyor...</p>
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
              Lütfen yöneticinizle iletişime geçin.
            </p>
            <p className="text-xs text-gray-400 mb-4">User ID: {user?.id}</p>
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
        <h1 className="text-3xl font-bold text-white mb-2">Profil</h1>
        <p className="text-gray-400">Hesap bilgilerinizi görüntüleyin ve düzenleyin</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-900/30 border border-green-700 text-green-300' : 
          'bg-red-900/30 border border-red-700 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Profil Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.ad.charAt(0)}{profileData.soyad.charAt(0)}
                </div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-white mb-1">
                {profileData.ad} {profileData.soyad}
              </h2>
              <p className="text-gray-400 mb-4">{profileData.email}</p>

              {/* Badges */}
              <div className="flex flex-col gap-2 w-full">
                <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Personel ID</p>
                  <p className="text-lg font-bold text-purple-400">{profileData.personel_id}</p>
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Departman</p>
                  <p className="text-sm font-semibold text-blue-400">{getDepartmanText(profileData.departman)}</p>
                </div>
                {personnel.yonetici && (
                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-yellow-400">👑 Yönetici</p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Profil Bilgileri */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a1d2e] rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Profil Bilgileri</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Düzenle
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Ad */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Ad</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.ad}
                    onChange={(e) => setProfileData({...profileData, ad: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  />
                ) : (
                  <p className="text-lg text-white">{profileData.ad}</p>
                )}
              </div>

              {/* Soyad */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Soyad</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.soyad}
                    onChange={(e) => setProfileData({...profileData, soyad: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  />
                ) : (
                  <p className="text-lg text-white">{profileData.soyad}</p>
                )}
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
                <p className="text-lg text-gray-500">{profileData.email}</p>
                <p className="text-xs text-gray-600 mt-1">E-posta değiştirilemez</p>
              </div>

              {/* Pozisyon */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Pozisyon</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.pozisyon}
                    onChange={(e) => setProfileData({...profileData, pozisyon: e.target.value})}
                    placeholder="Örn: Kıdemli Çağrı Merkezi Uzmanı"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  />
                ) : (
                  <p className="text-lg text-white">{profileData.pozisyon || "Belirtilmemiş"}</p>
                )}
              </div>

              {/* Departman (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Departman</label>
                <p className="text-lg text-gray-500">{getDepartmanText(profileData.departman)}</p>
                <p className="text-xs text-gray-600 mt-1">Departman yönetici tarafından değiştirilir</p>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Kaydediliyor..." : "💾 Kaydet"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setMessage(null);
                      // Reset to original data
                      if (personnel && user) {
                        setProfileData({
                          ad: personnel.ad || "",
                          soyad: personnel.soyad || "",
                          email: user.email || "",
                          departman: personnel.departman || "",
                          pozisyon: personnel.pozisyon || "",
                          personel_id: personnel.personel_id || "",
                        });
                      }
                    }}
                    disabled={isSaving}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    İptal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
