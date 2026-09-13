import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingCart, Star, ShieldCheck, Truck, Undo2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionTitle } from "@/components/catalog";
import { getProduct, products } from "@/lib/catalog";
import { copy, useStore } from "@/lib/store";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.nameEn ?? "Product";
    return {
      meta: [
        { title: `${name} | Faster` },
        { name: "description", content: `Shop ${name}, verified genuine automotive spare part from Faster.` }
      ]
    };
  },
  component: ProductPage
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { lang, add } = useStore();
  const t = copy[lang];
  const isAr = lang === "ar";
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState(0);
  
  const gallery = [p.image, p.image, p.image];
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const oldPrice = (p.price * 1.38).toFixed(2);
  const currency = isAr ? "ر.س" : "SAR";

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 md:px-6 md:py-12">
      {/* مسار الصفحة (Breadcrumbs) */}
      <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground md:text-xs">
        <Link to="/" className="hover:text-foreground">{t.home}</Link>
        <Arrow className="size-3" />
        <Link to="/products" className="hover:text-foreground">{t.products}</Link>
        <Arrow className="size-3" />
        <span className="text-foreground">{isAr ? p.nameAr : p.nameEn}</span>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16 items-start">
        
        {/* الصورة الرئيسية والمعرض (اليمين في العربي) */}
        <section className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-border bg-[#F8F9FA] shadow-sm dark:bg-zinc-900">
            <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2">
              <span className="rounded-full bg-[#FACC15] px-3 py-1 text-xs font-bold text-black shadow-sm">
                {t.original}
              </span>
              <span className="rounded-full bg-[#EF4444] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                -28%
              </span>
            </div>
            <img 
              src={gallery[selected]} 
              alt={isAr ? p.nameAr : p.nameEn} 
              className="h-full w-full object-cover transition-all duration-300"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => setSelected(i)} 
                className={`aspect-square overflow-hidden rounded-xl border-2 bg-card p-1 transition-all ${selected === i ? "border-[#FACC15]" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover rounded-lg" />
              </button>
            ))}
          </div>
        </section>

        {/* تفاصيل المنتج (اليسار في العربي) */}
        <section className="flex flex-col">
          {/* العلامة التجارية ورقم القطعة */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="rounded-md bg-brand/10 px-2 py-1 text-brand">Faster</span>
            <span className="rounded-md bg-muted px-2 py-1 text-muted-foreground uppercase">{p.partNo}</span>
          </div>

          <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl text-foreground">
            {isAr ? p.nameAr : p.nameEn}
          </h1>

          {/* التقييم */}
          <div className="mt-4 flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">(87 {isAr ? "تقييم" : "reviews"})</span>
            <b className="text-sm font-bold text-foreground">4.9</b>
            <div className="flex text-[#FACC15]">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-4 fill-current" />)}
            </div>
          </div>

          <hr className="my-6 border-border" />
          {/* التوافق */}
          <div className="mt-8">
            <h3 className="text-sm font-extrabold text-foreground">{isAr ? "يناسب الموديلات:" : "Compatible with:"}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.compatibility.map(c => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400">
                  {c.replace(/[0-9-]/g, '').trim()} <Check className="size-3" />
                </span>
              ))}
            </div>
          </div>

          {/* المخزن والإضافة للسلة */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
              <div className="size-2 rounded-full bg-[#10B981]" />
              {isAr ? "متوفر في المخزن" : "In Stock"}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-12 items-center rounded-xl border border-border bg-card px-1">
                <Button variant="ghost" size="icon" className="size-10 rounded-lg hover:bg-muted" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus className="size-4" /></Button>
                <b className="w-10 text-center text-sm">{qty}</b>
                <Button variant="ghost" size="icon" className="size-10 rounded-lg hover:bg-muted" onClick={() => setQty(q => q + 1)}><Plus className="size-4" /></Button>
              </div>
              <Button 
                onClick={() => add(p.id, qty)}
                className="h-12 flex-1 rounded-xl bg-[#FACC15] text-base font-black text-black shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#EAB308]"
              >
                <ShoppingCart className="size-5 me-2" />
                {t.addCart}
              </Button>
            </div>
          </div>

          {/* مميزات الشراء */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-center">
              <Undo2 className="size-6 text-[#FACC15]" />
              <b className="text-[11px] md:text-xs">{isAr ? "إرجاع مجاني" : "Free Returns"}</b>
              <span className="text-[9px] text-muted-foreground">{isAr ? "خلال 14 يوم" : "Within 14 days"}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-center">
              <Truck className="size-6 text-[#FACC15]" />
              <b className="text-[11px] md:text-xs">{isAr ? "توصيل سريع" : "Fast Delivery"}</b>
              <span className="text-[9px] text-muted-foreground">{isAr ? "خلال 24-48 ساعة" : "Within 24-48 hours"}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-center">
              <ShieldCheck className="size-6 text-[#FACC15]" />
              <b className="text-[11px] md:text-xs">{isAr ? "ضمان" : "Warranty"}</b>
              <span className="text-[9px] text-muted-foreground">{isAr ? "سنة واحدة / 20,000 كم" : "1 Year / 20,000 km"}</span>
            </div>
          </div>

          {/* وصف المنتج */}
          <div className="mt-8 rounded-2xl bg-muted/50 p-5">
            <h3 className="text-sm font-black text-foreground">{isAr ? "وصف المنتج" : "Product Description"}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {isAr ? "طقم فرامل سيراميك أمامي عالي الأداء، يوفر توقفاً سلساً وهادئاً مع تقليل الغبار بنسبة 80% مقارنة بالفرامل العادية. مصمم خصيصاً لتحمل درجات الحرارة العالية لسيارات النقل الثقيل." : "High-performance front ceramic brake pad set. Provides smooth, quiet stopping power with 80% less dust. Engineered for high-temperature durability."}
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
              <Tag className="size-3.5" />
              {isAr ? "رقم القطعة:" : "Part Number:"} <span className="text-foreground">{p.partNo}</span>
            </div>
          </div>
        </section>
      </div>

      {/* المنتجات ذات الصلة */}
      <section className="mt-16 border-t border-border pt-10">
        <SectionTitle title={t.related} />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {products.filter(x => x.id !== p.id).slice(0, 4).map(x => <ProductCard key={x.id} product={x} />)}
        </div>
      </section>
    </div>
  );
}