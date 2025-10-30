"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('E-posta doğrulama işlemi kontrol ediliyor...');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the code from URL (Supabase email confirmation)
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Doğrulama hatası oluştu.');
          return;
        }

        if (code) {
          // Exchange the code for a session
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error('Exchange error:', exchangeError);
            setStatus('error');
            setMessage('Doğrulama kodu geçersiz veya süresi dolmuş.');
            return;
          }

          if (data?.session) {
            setStatus('success');
            setMessage('✅ E-posta adresiniz başarıyla doğrulandı!');
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          }
        } else {
          // No code in URL - check if already authenticated
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            router.push('/dashboard');
          } else {
            setStatus('error');
            setMessage('Doğrulama linki eksik veya hatalı.');
          }
        }
      } catch (err) {
        console.error('Callback error:', err);
        setStatus('error');
        setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Loading State */}
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Doğrulanıyor...
            </h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Başarılı!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Dashboard'a yönlendiriliyorsunuz...
            </p>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Doğrulama Hatası
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Giriş Sayfasına Dön
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

