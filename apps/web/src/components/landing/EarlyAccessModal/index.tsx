"use client";

import { useState } from "react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    agentCount: "",
    integrationNote: "",
    kvkkConsent: false
  });
  const [showKVKKModal, setShowKVKKModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkConsent) {
      alert("KVKK onayını kabul etmelisiniz.");
      return;
    }
    // Form submission logic here
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl md:p-10" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Erken Erişim Talep Et</h2>
            <p className="text-gray-600">
              CallMetric AI'ı ilk deneyenler arasında yer alın. Formu doldurun, sizi hemen arayalım.
            </p>
          </div>

          {/* Scrollable Form Container */}
          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required Fields */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                İsim Soyisim <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-[var(--brand-turquoise)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-turquoise)]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Şirket Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-[var(--brand-turquoise)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-turquoise)]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Kurumsal E-posta <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-[var(--brand-turquoise)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-turquoise)]/20"
              />
            </div>

            {/* Optional Fields */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-[var(--brand-turquoise)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-turquoise)]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Temsilci Sayısı
              </label>
              <input
                type="text"
                value={formData.agentCount}
                onChange={(e) => setFormData({ ...formData, agentCount: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-[var(--brand-turquoise)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-turquoise)]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Entegrasyon Notu
              </label>
              <textarea
                rows={3}
                value={formData.integrationNote}
                onChange={(e) => setFormData({ ...formData, integrationNote: e.target.value })}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-[var(--brand-turquoise)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-turquoise)]/20"
                style={{ minHeight: '80px', maxHeight: '80px' }}
              />
            </div>

            {/* KVKK Consent */}
            <div className="rounded-lg bg-gray-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={formData.kvkkConsent}
                  onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-[var(--brand-turquoise)] focus:ring-[var(--brand-turquoise)]"
                />
                <span className="text-sm text-gray-700">
                  Kişisel verilerimin KVKK kapsamında işlenmesini kabul ediyorum. <span className="text-red-500">*</span>
                  <button
                    type="button"
                    onClick={() => setShowKVKKModal(true)}
                    className="ml-1 text-[var(--brand-turquoise)] underline"
                  >
                    Detayları gör
                  </button>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Gönder
            </button>
          </form>
          </div>
        </div>
      </div>

      {/* KVKK Info Modal */}
      {showKVKKModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">KVKK Aydınlatma Metni</h3>
            <div className="prose prose-sm text-gray-600">
              <p>
                Çağrı kayıtları ve konuşma verileri KVKK'na uygun olarak işlenir. Müşteri verileri 
                yalnızca hizmet sağlama amaçlı kullanılır, anonimleştirme ve veri minimalizasyonu uygulanır.
              </p>
              <p className="mt-4">
                Kişisel veri işlemlerine ilişkin detaylı doküman için Gizlilik Politikası sayfasını inceleyin.
              </p>
            </div>
            <button
              onClick={() => setShowKVKKModal(false)}
              className="mt-6 w-full rounded-lg bg-[var(--brand-navy)] px-6 py-3 font-semibold text-white"
            >
              Anladım
            </button>
          </div>
        </div>
      )}
    </>
  );
}



