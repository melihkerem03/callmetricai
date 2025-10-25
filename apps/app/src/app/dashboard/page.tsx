"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Your Personal Dashboard</p>
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
          <h3 className="text-3xl font-bold text-white mb-2">1,247</h3>
          <p className="text-gray-400 text-sm">Görüşmeler</p>
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
          <h3 className="text-3xl font-bold text-blue-500 mb-2">1,132</h3>
          <p className="text-gray-400 text-sm">Analiz Edilenler</p>
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
          <h3 className="text-3xl font-bold text-green-500 mb-2">891</h3>
          <p className="text-gray-400 text-sm">Pozitif Görüşmeler</p>
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
          <h3 className="text-3xl font-bold text-red-500 mb-2">241</h3>
          <p className="text-gray-400 text-sm">Negatif Görüşmeler</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Graphics</h2>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-gray-400">Daily Expense</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-400">Car Insurance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">Health</span>
            </div>
            <span className="text-gray-400">Last 7 Days</span>
          </div>
        </div>
        
        {/* Chart Placeholder */}
        <div className="h-80 flex items-center justify-center border border-gray-800 rounded-lg">
          <p className="text-gray-500">Grafik alanı - Yakında eklenecek</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

