"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Production'da app.callmetricai.com'a yönlendirecek
    // Development'ta localhost:3001'e yönlendirecek
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    window.location.href = `${appUrl}/auth/login`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Giriş sayfasına yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
}

