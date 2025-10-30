"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Görüşme istatistiklerinizi ve analizlerinizi görüntüleyin</p>
      </div>

      <div className="bg-[#1a1d2e] rounded-2xl p-8 border border-gray-800">
        <p className="text-gray-400 text-center py-12">
          Analytics sayfası yakında eklenecek...
        </p>
      </div>
    </DashboardLayout>
  );
}

