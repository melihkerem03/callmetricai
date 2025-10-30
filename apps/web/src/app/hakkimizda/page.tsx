import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutTwoCol from "@/components/about/AboutTwoCol";
import AboutStats from "@/components/about/AboutStats";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "Hakkımızda | CallMetric AI",
  description:
    "CallMetric AI, insan zekâsı ve Agentic AI'nın dönüştürücü gücünü birleştiren bir vizyondur. Çağrı merkezi performansını optimize ederek çalışma hayatını daha akıllı ve verimli hale getiriyoruz.",
  openGraph: {
    title: "Hakkımızda | CallMetric AI",
    description:
      "İnsan zekâsı ve yapay zekânın aynı hedefte birleştiği bir gelecek inşa ediyoruz.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | CallMetric AI",
    description:
      "İnsan zekâsı ve yapay zekânın aynı hedefte birleştiği bir gelecek inşa ediyoruz.",
  },
};

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Biz Kimiz */}
      <AboutIntro />

      {/* Stats (isteğe bağlı - gösteriliyor) */}
      <AboutStats />

      {/* Vizyonumuz */}
      <AboutTwoCol
        title="Vizyonumuz"
        accent="turquoise"
        icon="🎯"
        paragraphs={[
          "İnsan zekâsı ile yapay zekânın aynı hedefte birleştiği bir gelecek inşa etmek.",
          "Her çağrıda, her kararda, her etkileşimde sezgiyi ve veriyi bir araya getirerek iş dünyasının verimlilik, doğruluk ve mutluluk dengesini yeniden tanımlamak.",
          "CallMetric AI bu vizyonun ilk adımıdır.",
          "Her yeni ürün, entegrasyon ve sistemde bu yaklaşımı sürdürüyoruz: zamanı optimize etmek, işi sadeleştirmek, insana alan açmak.",
        ]}
      />

      {/* Misyonumuz */}
      <AboutTwoCol
        title="Misyonumuz"
        accent="orange"
        icon="🚀"
        paragraphs={[
          "Agentic AI teknolojilerini insan zekâsıyla birleştirerek çağrı merkezlerinde performansı, üretkenliği ve memnuniyeti artırmak.",
          "Bizim için başarı, yalnızca metrikleri yükseltmek değil — her çalışanın potansiyelini ortaya çıkarmak, yöneticilerin kararlarını kolaylaştırmak ve müşterilere daha iyi bir deneyim sunmaktır.",
        ]}
      />

      {/* Hikayemiz */}
      <AboutTwoCol
        title="Hikayemiz"
        accent="navy"
        icon="📖"
        paragraphs={[
          "CallMetric AI fikri, hızlı büyüyen ama karmaşıklaşan iş dünyasının içinden doğdu.",
          "Yıllar boyunca operasyonlarda aynı döngüyü gözlemledik: insanlar yoğun çalışıyor ama süreçler verimsizdi. Biz bu kısır döngüyü kırmak istedik.",
          "Teknolojiyi insan için çalıştırmak, yapay zekâyı insana rakip değil iş ortağı yapmak vizyonuyla yola çıktık.",
          "Bugün, bu yaklaşım bizi çağrı merkezi performans analizinde yeni bir seviyeye taşıdı.",
        ]}
      />

      {/* Yolculuğumuz */}
      <AboutTwoCol
        title="Yolculuğumuz"
        accent="turquoise"
        icon="🛤️"
        paragraphs={[
          "Bu bir yazılım değil, bir dönüşüm yolculuğu.",
          "Bugüne kadar edindiğimiz tüm bilgi birikimini ve teknolojiyi CallMetric AI'a aktardık. Ancak bu sadece başlangıç.",
          "Yeni modüller, sistemler ve veri teknolojileriyle performans analizinin geleceğini şekillendiriyoruz.",
          "Her adımda, insanı merkezde tutmaya kararlıyız. Çünkü nihai hedefimiz yalnızca işi değil — hayatı optimize etmek.",
        ]}
      />

      {/* Değerlerimiz */}
      <AboutValues />

      {/* CTA */}
      <AboutCTA />
    </main>
  );
}

