import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CircleGauge, Cog, Disc3, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionTitle, TradeBanner, TrustStrip } from "@/components/catalog";
import { products } from "@/lib/catalog";
import { copy, useStore } from "@/lib/store";

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
  
  // تم إضافة id لكل قسم عشان نستخدمه في الفلترة
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
              // تم إضافة search params لتوجيه المستخدم للقسم الصحيح
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
        <section><SectionTitle title={t.brands} /><BrandMarquee /></section>
        <section>
          <SectionTitle title={t.featured} to="/products" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
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
    // بدلاً من h-[50vh] min-h-[400px]
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

      {/* Pagination Dots */}
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

function BrandMarquee() {
  const logos = [
    { name: "ISUZU", src: brandIsuzu },
    { name: "Toyota", src: brandToyota },
    { name: "Nissan", src: brandNissan },
    { name: "MITSUBISHI", src: brandMitsubishi },
    { name: "Suzuki", src: brandMazda }
  ];

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 gap-4 pe-4">
      {logos.map(brand => (
        <div key={`${key}-${brand.name}`} className="grid h-24 w-44 shrink-0 place-items-center rounded-md bg-product p-4 md:h-28 md:w-56">
          <img 
            src={brand.src} 
            alt={`${brand.name} logo`} 
            className="h-12 w-auto max-w-full object-contain md:h-16" 
            loading="lazy" 
          />
        </div>
      ))}
    </div>
  );

  return (
    <div dir="ltr" className="overflow-hidden rounded-lg border border-border bg-card py-5 shadow-card">
      <div className="flex w-max animate-marquee">
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}