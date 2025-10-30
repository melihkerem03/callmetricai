import dashboardData from "@/data/dashboardTexts.json";

export default function Dashboards() {
  return (
    <section className="bg-gradient-to-br from-[var(--brand-navy)] to-gray-900 py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Dashboard Görünümleri
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Yöneticiler ve temsilciler için özelleştirilmiş paneller
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)]"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Manager Dashboard */}
          <div className="flex flex-col rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-2xl font-bold text-[var(--brand-turquoise)] md:text-3xl">
              {dashboardData.manager.title}
            </h3>
            <div className="flex flex-col gap-4">
              {dashboardData.manager.metrics.map((metric, index) => (
                <div key={index} className="rounded-lg bg-white/5 p-4">
                  <p className="mb-2 text-base font-semibold text-[var(--brand-orange)] md:text-lg">
                    {metric.label}
                  </p>
                  <p className="text-lg font-medium md:text-xl">{metric.value}</p>
                  {metric.secondary && (
                    <p className="mt-1 text-sm text-gray-300">{metric.secondary}</p>
                  )}
                  {metric.action && (
                    <p className="mt-1 text-sm text-gray-300">{metric.action}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Screen */}
          <div className="flex flex-col rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-2xl font-bold text-[var(--brand-turquoise)] md:text-3xl">
              {dashboardData.agent.title}
            </h3>
            <div className="flex flex-col gap-4">
              {dashboardData.agent.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10">
                  <div className="flex-shrink-0 rounded-lg bg-[var(--brand-orange)]/20 p-2">
                    <svg className="h-6 w-6 text-[var(--brand-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-base leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call Detail Report */}
          <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm lg:col-span-2">
            <h3 className="mb-6 text-2xl font-bold text-[var(--brand-turquoise)] md:text-3xl">
              {dashboardData.callDetail.title}
            </h3>
            
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
              {/* Scores */}
              <div className="rounded-lg bg-white/5 p-6">
                <p className="mb-4 text-base font-semibold text-[var(--brand-orange)] md:text-lg">
                  Performans Skoru
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between text-base md:text-lg">
                    <span>Genel Skor:</span>
                    <span className="font-bold">{dashboardData.callDetail.score.overall}/100</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Empati:</span>
                    <span className="font-bold">{dashboardData.callDetail.score.empathy}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Çözüm Odaklılık:</span>
                    <span className="font-bold">{dashboardData.callDetail.score.solution}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Prosedür Uyumu:</span>
                    <span className="font-bold">{dashboardData.callDetail.score.procedure}</span>
                  </div>
                </div>
              </div>

              {/* Emotion Map & Recommendations */}
              <div className="space-y-6">
                <div className="rounded-lg bg-white/5 p-6">
                  <p className="mb-4 text-base font-semibold text-[var(--brand-orange)] md:text-lg">
                    Duygu Haritası
                  </p>
                  <div className="flex items-center gap-2 text-base leading-relaxed">
                    <span className="font-medium text-gray-300">Başlangıç (nötr)</span>
                    <svg className="h-6 w-6 flex-shrink-0 text-[var(--brand-turquoise)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-red-400">00:45 artan öfke</span>
                    <svg className="h-6 w-6 flex-shrink-0 text-[var(--brand-turquoise)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-green-400">02:30 ikna/çözüm sonrası memnuniyet</span>
                  </div>
                </div>

                <div className="rounded-lg bg-white/5 p-6">
                  <p className="mb-4 text-base font-semibold text-[var(--brand-orange)] md:text-lg">
                    Öneriler
                  </p>
                  <ul className="space-y-2">
                    {dashboardData.callDetail.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-base">
                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--brand-turquoise)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


