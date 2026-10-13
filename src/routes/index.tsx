import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { CircleGauge, Cog, Disc3, Zap, ChevronRight, ChevronLeft, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionTitle, TradeBanner, TrustStrip } from "@/components/catalog";
import { products } from "@/lib/catalog";
import { copy, useStore } from "@/lib/store";

import review1 from "@/assets/Gemini_Generated_Image_1xi8qg1xi8qg1xi8.jfif";
import review2 from "@/assets/Gemini_Generated_Image_sxqarlsxqarlsxqa.jfif";
import review3 from "@/assets/Gemini_Generated_Image_j77ukwj77ukwj77u.jfif";
import review4 from "@/assets/Gemini_Generated_Image_6wseex6wseex6wse.jfif";
import review5 from "@/assets/Gemini_Generated_Image_2eqpzp2eqpzp2eqp.jfif";
import heroEngine from "@/assets/hero-engine.jpg";
import heroSuspension from "@/assets/hero-suspension.jpg";
import heroBrakes from "@/assets/hero-brakes.jpg";
import brandIsuzu from "@/assets/brand-isuzu.png";
import brandToyota from "@/assets/brand-toyota.png";
import brandNissan from "@/assets/brand-nissan.png";
import brandMitsubishi from "@/assets/brand-mitsubishi.png";
import brandMazda from "@/assets/brand-mazda.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Faster | قطع غيار سيارات أصلية" },
      { name: "description", content: "تسوق قطع غيار السيارات الأصلية للأفراد والتجار من فاستر." },
      { property: "og:title", content: "Faster | Genuine Auto Spare Parts" },
      { property: "og:description", content: "Premium genuine spare parts for retail and trade customers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [{ rel: "canonical", href: "/" }]
  }),
  component: Index,
});

function Index() {
  const { lang } = useStore();
  const t = copy[lang];
  
  const cats = [
    { id: "suspension", Icon: CircleGauge, ar: "التعليق", en: "Suspension", n: "14" },
    { id: "brakes", Icon: Disc3, ar: "الفرامل", en: "Brakes", n: "62" },
    { id: "engine", Icon: Cog, ar: "المحرك", en: "Engine", n: "95" },
    { id: "electrical", Icon: Zap, ar: "الكهرباء", en: "Electrical", n: "34" }
  ];

  return (
    <>
      <HeroCarousel lang={lang} t={t} />
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-8 pt-3 md:px-6 md:py-12">
        <section>
          <SectionTitle title={t.categories} to="/products" />
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {cats.map(({ id, Icon, ar, en, n }) => (
              <Link 
                to="/products" 
                search={{ category: id }} 
                key={id} 
                className="flex min-w-0 flex-col items-center rounded-lg border border-border bg-card p-2 text-center shadow-card transition-transform duration-300 hover:-translate-y-1 md:p-5"
              >
                <span className="grid size-9 place-items-center rounded-md bg-header text-brand md:size-12"><Icon className="size-4 md:size-6" /></span>
                <b className="mt-1 w-full truncate text-[10px] md:mt-2 md:text-sm">{lang === "ar" ? ar : en}</b>
                <span className="mt-0.5 hidden text-[10px] text-muted-foreground sm:block md:mt-1">{n} {lang === "ar" ? "قطعة" : "parts"}</span>
              </Link>
            ))}
          </div>
        </section>
        
        <TradeBanner />
        
        <section>
          <SectionTitle title={t.brands} />
          <BrandMarquee />
        </section>
        
        <section>
          <SectionTitle title={t.featured} to="/products" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* قسم الآراء بعد التعديل ليكون العنوان في المنتصف */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              {lang === "ar" ? "آراء شركاء النجاح" : "Customer Testimonials"}
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
          </div>
          <TestimonialsMarquee />
        </section>

        <TrustStrip />
      </div>
    </>
  );
}

const heroSlides = [
  { image: heroEngine, ar: "أداء يعتمد عليه", en: "Performance you can trust" },
  { image: heroSuspension, ar: "ثبات في كل طريق", en: "Control on every road" },
  { image: heroBrakes, ar: "توقف بثقة", en: "Stop with confidence" },
];

function HeroCarousel({ lang, t }: { lang: "ar" | "en"; t: typeof copy.ar }) {
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const timer = window.setInterval(() => setActive(i => (i + 1) % heroSlides.length), 5500);
    return () => window.clearInterval(timer);
  }, []);
  
  const slide = heroSlides[active] ?? heroSlides[0];

  return (
    <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-black text-white md:h-[calc(100vh-5rem)] md:min-h-[600px]">
      <AnimatePresence mode="sync">
        <motion.img 
          key={slide.image} 
          src={slide.image} 
          alt={lang === "ar" ? slide.ar : slide.en} 
          initial={{ opacity: 0, scale: 1.05 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }} 
          className="absolute inset-0 h-full w-full object-cover object-center" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" dir="ltr" />
      
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
        <motion.div 
          key={`${lang}-${active}`} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          className="max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand backdrop-blur-md">
            <Zap className="size-3.5" />
            <span>{t.heroTag}</span>
          </div>
          
          <h1 className="text-4xl font-black leading-tight md:text-7xl">
            {active === 0 ? t.heroTitle : lang === "ar" ? slide.ar : slide.en}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-300 md:mt-6 md:text-lg md:leading-8">
            {t.heroBody}
          </p>
          
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="catalog" size="xl" className="rounded-full">
              <Link to="/products">{lang === "ar" ? "تصفح المنتجات" : "Browse Products"}</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-10">
        {heroSlides.map((item, i) => (
          <button 
            key={item.image} 
            type="button" 
            onClick={() => setActive(i)} 
            aria-label={`Slide ${i + 1}`} 
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? "w-8 bg-brand" : "w-2 bg-white/40 hover:bg-white/60"
            }`} 
          />
        ))}
      </div>
    </section>
  );
}

function TestimonialsMarquee() {
  const { lang } = useStore();
  const reviews = [review1, review2, review3, review4, review5];

  return (
    <div className="relative flex w-full gap-4 overflow-hidden py-6 group cursor-pointer">
      {/* ستايل مدمج لضمان عمل الحركة اللانهائية بشكل مثالي حسب اتجاه اللغة */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1rem)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100% + 1rem)); }
        }
        .animate-scroll-left { animation: scroll-left 30s linear infinite; }
        .animate-scroll-right { animation: scroll-right 30s linear infinite; }
      `}</style>

      {/* نكرر بلوك الصور مرتين لضمان استمرارية الحركة بدون فراغات نهائياً */}
      {[...Array(2)].map((_, containerIndex) => (
        <div 
          key={containerIndex} 
          className={`flex shrink-0 gap-4 group-hover:[animation-play-state:paused] ${
            lang === "ar" ? "animate-scroll-right" : "animate-scroll-left"
          }`}
        >
          {reviews.map((img, i) => (
            <div key={i} className="shrink-0 w-[280px] md:w-[350px] rounded-xl overflow-hidden border border-border bg-card shadow-sm transition-transform hover:scale-[1.02]">
              <img 
                src={img} 
                alt="رأي العميل" 
                className="w-full h-auto object-cover" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      ))}
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}

function BrandMarquee() {
  const { lang } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const logos = [
    { id: "isuzu", name: "ISUZU", src: brandIsuzu },
    { id: "toyota", name: "Toyota", src: brandToyota },
    { id: "nissan", name: "Nissan", src: brandNissan },
    { id: "mitsubishi", name: "MITSUBISHI", src: brandMitsubishi },
    { id: "suzuki", name: "Suzuki", src: brandMazda }
  ];

  const repeatedLogos = Array(6).fill(logos).flat();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const sign = lang === "ar" ? -1 : 1;
        scrollRef.current.scrollBy({ left: sign * 1.5 });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isPaused, lang]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const sign = lang === "ar" ? -1 : 1;
      const amount = direction === "right" ? 300 * sign : -300 * sign;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg border border-border bg-card py-5 shadow-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="absolute top-2 z-10 flex w-full justify-center opacity-70 transition-opacity group-hover:opacity-100">
        <span className="flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold text-muted-foreground backdrop-blur md:text-xs">
          <MousePointerClick className="size-3" />
          {lang === "ar" ? "اضغط على الماركة لعرض منتجاتها" : "Click a brand to view products"}
        </span>
      </div>

      <button 
        onClick={() => scroll("right")} 
        className="absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-brand hover:text-black group-hover:opacity-100 md:size-12"
      >
        <ChevronRight className="size-6 md:size-7" />
      </button>

      <button 
        onClick={() => scroll("left")} 
        className="absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-brand hover:text-black group-hover:opacity-100 md:size-12"
      >
        <ChevronLeft className="size-6 md:size-7" />
      </button>

      <div 
        ref={scrollRef} 
        className="scrollbar-none flex gap-4 overflow-x-auto px-4 pt-4"
      >
        {repeatedLogos.map((brand, i) => (
          <Link 
            key={`${brand.id}-${i}`} 
            to="/products"
            search={{ brand: brand.id }}
            className="grid h-32 w-32 shrink-0 place-items-center rounded-2xl bg-product p-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow md:h-40 md:w-40"
          >
            <img 
              src={brand.src} 
              alt={`${brand.name} logo`} 
              className="h-full w-full object-contain drop-shadow-sm" 
              loading="lazy" 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}