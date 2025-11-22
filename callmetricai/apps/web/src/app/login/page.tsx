"use client";

import Link from "next/link";

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-16 text-center">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <img
                src="/callmetriclogo.png"
                alt="CallMetric AI"
                className="mx-auto h-24 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-lg">
            <div className="mb-8">
              <h1 className="mb-3 text-4xl font-bold text-gray-900">Giriş Yap</h1>
              <p className="text-base text-gray-600">
                Hesabınıza giriş yaparak devam edin
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-900">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Beni hatırla
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  Şifremi unuttum
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-orange-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-orange-600 hover:shadow-xl"
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-600">
                Hesabınız yok mu?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  Kayıt Ol
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
