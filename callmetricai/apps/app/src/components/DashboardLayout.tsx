"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Authentication kontrolü
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");

    if (!isAuthenticated || isAuthenticated !== "true") {
      // Giriş yapılmamış, login'e yönlendir
      router.push("/auth/login");
    } else {
      setUserEmail(email || "");
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // Logout - localStorage'ı temizle
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    // Login sayfasına yönlendir
    router.push("/auth/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0f1117]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <Sidebar onLogout={handleLogout} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-[#1a1d2e] border-b border-gray-800 px-8 py-4 flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4 ml-8">
            <div className="text-right">
              <p className="text-sm text-gray-400">{userEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Çıkış
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

