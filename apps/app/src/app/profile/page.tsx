"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Demo data
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@mail.com",
    company: "CallMetricAI",
    address: "İstanbul, Türkiye",
    integrator: "Acme Entegrasyon A.Ş.",
    subscription: "Premium",
    subscriptionDate: "01.01.2024",
    subscriptionEnd: "01.01.2025",
    profilePhoto: "/callmetriclogo.png"
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profil</h1>
        <p className="text-gray-400">Hesap bilgilerinizi görüntüleyin ve düzenleyin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Profil Fotoğrafı ve Hızlı Bilgiler */}
        <div className="lg:col-span-1">
          {/* Profil Fotoğrafı Kartı */}
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800 mb-6">
            <div className="flex flex-col items-center">
              {/* Profil Fotoğrafı */}
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-4 border-purple-600">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors border-4 border-[#1a1d2e]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* İsim ve Email */}
              <h2 className="text-xl font-bold text-white mb-1">{profileData.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{profileData.email}</p>

              {/* Abonelik Badge */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 rounded-lg mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-white font-semibold">{profileData.subscription} Üyelik</span>
              </div>

              {/* Düzenle Butonu */}
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Profili Düzenle
              </button>
            </div>
          </div>

          {/* İstatistikler Kartı */}
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Hesap İstatistikleri</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Toplam Görüşme</span>
                <span className="text-white font-semibold">1,247</span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Bu Ay</span>
                <span className="text-white font-semibold">342</span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Başarı Oranı</span>
                <span className="text-green-500 font-semibold">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Detaylı Bilgiler */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kişisel Bilgiler */}
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Kişisel Bilgiler
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kullanıcı Adı */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  value={profileData.name}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>

              {/* E-posta */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>

              {/* Firma */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Firma</label>
                <input
                  type="text"
                  value={profileData.company}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                />
              </div>

              {/* Adres */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Adres</label>
                <input
                  type="text"
                  value={profileData.address}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                />
              </div>

              {/* Entegratör Firma */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Entegratör Firma</label>
                <input
                  type="text"
                  value={profileData.integrator}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onChange={(e) => setProfileData({...profileData, integrator: e.target.value})}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Değişiklikleri Kaydet
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  İptal
                </button>
              </div>
            )}
          </div>

          {/* Abonelik Bilgileri */}
          <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Abonelik Bilgileri
              </h3>
              <button className="text-purple-500 hover:text-purple-400 text-sm font-semibold">
                Planı Değiştir
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Abonelik Tipi */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-gray-400 text-sm">Abonelik Türü</span>
                </div>
                <p className="text-white font-semibold text-lg">{profileData.subscription}</p>
              </div>

              {/* Başlangıç Tarihi */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400 text-sm">Başlangıç</span>
                </div>
                <p className="text-white font-semibold text-lg">{profileData.subscriptionDate}</p>
              </div>

              {/* Bitiş Tarihi */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm">Bitiş</span>
                </div>
                <p className="text-white font-semibold text-lg">{profileData.subscriptionEnd}</p>
              </div>
            </div>

            {/* Abonelik Özellikleri */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-white font-semibold mb-3">Plan Özellikleri</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sınırsız görüşme kaydı
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gelişmiş analitik raporlar
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7/24 teknik destek
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API entegrasyonu
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
