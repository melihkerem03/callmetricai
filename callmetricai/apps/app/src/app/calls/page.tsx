"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function CallsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Görüşmeler</h1>
        <p className="text-gray-400">Tüm görüşmelerinizi görüntüleyin</p>
      </div>

      <div className="bg-[#1a1d2e] rounded-2xl p-8 border border-gray-800">
        <p className="text-gray-400 text-center py-12">
          Görüşmeler sayfası yakında eklenecek...
        </p>
      </div>
    </DashboardLayout>
  );
}

