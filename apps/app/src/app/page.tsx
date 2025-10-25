"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Authentication kontrolü yap
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (isAuthenticated === "true") {
      // Giriş yapılmışsa dashboard'a yönlendir
      router.push("/dashboard");
    } else {
      // Giriş yapılmamışsa login'e yönlendir
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Yönlendiriliyor...</p>
      </div>
    </div>
  );
}
