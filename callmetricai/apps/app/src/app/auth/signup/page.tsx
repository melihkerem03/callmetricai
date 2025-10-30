"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Password validation
    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır!");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error: signUpError } = await signUp(
        formData.email, 
        formData.password, 
        formData.name
      );
      
      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('❌ Bu e-posta adresi zaten kayıtlı!');
        } else {
          setError(`❌ Kayıt hatası: ${signUpError.message}`);
        }
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        // Success - show confirmation message
        setSuccess(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-48 h-12 relative">
          <Image
            src="/callmetriclogo.png"
            alt="CallMetricAI"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hesap Oluştur
        </h1>
        <p className="text-gray-600">
          CallMetricAI'ya katılın
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold mb-1">✅ Kayıt Başarılı!</p>
              <p className="text-sm">
                E-posta adresinize bir doğrulama linki gönderdik. 
                Lütfen gelen kutunuzu kontrol edin ve e-postanızı doğrulayın.
              </p>
              <p className="text-xs mt-2 text-green-700">
                Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            placeholder="Adınız Soyadınız"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresi
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            placeholder="ornek@email.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Şifre Tekrar
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            <Link href="/terms" className="text-purple-600 hover:text-purple-500">
              Kullanım Koşulları
            </Link>
            {" "}ve{" "}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
              Gizlilik Politikası
            </Link>
            'nı okudum ve kabul ediyorum.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
        </button>
      </form>
      )}

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">veya</span>
        </div>
      </div>

      {/* Social Signup */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700 font-medium">Google ile kayıt ol</span>
        </button>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Zaten hesabınız var mı?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}

