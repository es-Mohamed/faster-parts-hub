import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/catalog";
import { products } from "@/lib/catalog";
import { copy, useStore } from "@/lib/store";

// تعريف البارامترات المسموحة في الرابط
type ProductSearch = {
  category?: string;
};

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return { category: search.category as string | undefined };
  },
  head: () => ({
    meta: [
      { title: "المنتجات | Faster" },
      { name: "description", content: "تصفح وابحث عن قطع غيار السيارات الأصلية." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const searchParams = Route.useSearch();
  
  // لمعرفة هل نحن في صفحة المنتجات الرئيسية أم في صفحة التفاصيل الفرعية
  const isExact = useRouterState({ 
    select: (s) => s.location.pathname === "/products" || s.location.pathname === "/products/" 
  });
  
  const { lang } = useStore();
  const t = copy[lang];
  
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.category || "all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (searchParams.category) {
      setCategory(searchParams.category);
    }
  }, [searchParams.category]);

  const cats = [
    { id: "all", ar: "الكل", en: "All" },
    { id: "suspension", ar: "تعليق", en: "Suspension" },
    { id: "brakes", ar: "فرامل", en: "Brakes" },
    { id: "engine", ar: "محرك", en: "Engine" },
    { id: "electrical", ar: "كهرباء", en: "Electrical" },
  ];

  const shown = useMemo(() => 
    products
      .filter(p => (category === "all" || p.category === category) && (`${p.nameAr} ${p.nameEn} ${p.partNo}`.toLowerCase().includes(query.toLowerCase())))
      .sort((a, b) => sort === "high" ? b.price - a.price : sort === "low" ? a.price - b.price : 0),
    [query, category, sort]
  );

  const Swipe = lang === "ar" ? ChevronLeft : ChevronRight;

  // لو الرابط اتغير لصفحة التفاصيل، اعرض التفاصيل (Outlet) وأخفي لستة المنتجات
  if (!isExact) {
    return <Outlet />;
  }

  return (
    <>
      <section className="bg-header px-4 py-8 text-header-foreground md:px-6 md:py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">{lang === "ar" ? "تصفح المنتجات" : "Browse products"}</h1>
          <p className="mt-1 text-sm text-header-muted">{shown.length} {lang === "ar" ? "منتج متاح" : "parts available"}</p>
          <label className="mt-5 flex h-12 items-center gap-3 rounded-md border border-header-border bg-header-soft px-4 focus-within:border-brand focus-within:shadow-glow">
            <Search className="size-5 text-header-muted" />
            <input value={query} onChange={e => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-header-muted" placeholder={t.search} />
          </label>
        </div>
      </section>
      
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="relative">
          <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2 pe-10">
            {cats.map(c => (
              <button 
                key={c.id} 
                type="button" 
                onClick={() => setCategory(c.id)} 
                className={`shrink-0 rounded-full border px-5 py-2 text-xs font-bold transition-colors ${category === c.id ? "border-header bg-header text-brand" : "border-border bg-card"}`}
              >
                {lang === "ar" ? c.ar : c.en}
              </button>
            ))}
          </div>
          <span className="pointer-events-none absolute end-0 top-0 grid size-9 place-items-center bg-background text-brand md:hidden"><Swipe /></span>
        </div>
        
        <div className="my-5 flex items-center justify-between gap-4">
          <b className="text-sm">{lang === "ar" ? `النتائج: ${shown.length}` : `${shown.length} results`}</b>
          <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium outline-none focus:border-brand">
            <option value="default">{lang === "ar" ? "الترتيب الافتراضي" : "Default order"}</option>
            <option value="high">{lang === "ar" ? "السعر: من الأعلى" : "Price: high to low"}</option>
            <option value="low">{lang === "ar" ? "السعر: من الأقل" : "Price: low to high"}</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {shown.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}