"use client";

import Link from "next/link";

export default function SignupPage() {

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

          {/* Signup Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-lg">
            <div className="mb-8">
              <h1 className="mb-3 text-4xl font-bold text-gray-900">Kayıt Ol</h1>
              <p className="text-base text-gray-600">
                Yeni hesap oluşturarak başlayın
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-900">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

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
                <label htmlFor="company" className="mb-2 block text-sm font-semibold text-gray-900">
                  Şirket Adı <span className="font-normal text-gray-500">(Opsiyonel)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Şirket adınız"
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
                  placeholder="En az 8 karakter"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Şifreniz en az 8 karakter olmalıdır
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-gray-900">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Şifrenizi tekrar girin"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  <Link href="/terms" className="text-cyan-600 hover:text-cyan-700">
                    Kullanım Şartları
                  </Link>
                  {" ve "}
                  <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700">
                    Gizlilik Politikası
                  </Link>
                  &apos;nı okudum ve kabul ediyorum
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-orange-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-orange-600 hover:shadow-xl"
              >
                Kayıt Ol
              </button>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  Giriş Yap
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

