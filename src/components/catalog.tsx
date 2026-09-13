import { Link } from "@tanstack/react-router";
import { ShieldCheck, BadgeCheck, Truck, ArrowLeft, ArrowRight, Star, ShoppingCart, type LucideIcon } from "lucide-react";
import { copy, useStore } from "@/lib/store";
import type { Product } from "@/lib/catalog";

export function SectionTitle({ title, to }: { title: string; to?: "/categories" | "/products" }) {
  const { lang } = useStore();
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
      {to && <Link to={to} className="text-sm font-bold text-brand underline-offset-4 hover:underline">{copy[lang].all}</Link>}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { lang, add } = useStore();
  const t = copy[lang];
  const isAr = lang === "ar";
  const title = isAr ? product.nameAr : product.nameEn;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <Link to="/products/$productId" params={{ productId: product.id }} className="relative block shrink-0">
        <div className="absolute right-2 top-2 z-10 flex flex-col items-end gap-1">
          <span className="rounded-full bg-[#FACC15] px-2.5 py-0.5 text-[10px] font-bold text-black shadow-sm">
            {t.original}
          </span>
        </div>
        <div className="aspect-[4/3] w-full bg-[#F8F9FA] dark:bg-zinc-900">
          <img
            src={product.image}
            alt={title}
            width={400}
            height={400}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link to="/products/$productId" params={{ productId: product.id }} className="flex flex-col">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{product.partNo}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground md:text-base">
            {title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.compatibility.slice(0, 2).map((c) => (
              <span key={c} className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400">
                {c.replace(/[0-9-]/g, '').trim()}
              </span>
            ))}
            {product.compatibility.length > 2 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                +{product.compatibility.length - 2}
              </span>
            )}
          </div>
        </Link>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-[11px] font-bold text-green-600 dark:text-green-500">
            {isAr ? "متوفر بالمخزن" : "In Stock"}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.id);
            }}
            aria-label={`${t.add} ${title}`}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[#FACC15] text-black shadow-sm transition-transform hover:scale-105 hover:bg-[#EAB308] focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:ring-offset-2"
          >
            <ShoppingCart className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function TrustStrip() {
  const { lang } = useStore();
  const t = copy[lang];
  const items: [LucideIcon, string][] = [[ShieldCheck, t.warranty], [BadgeCheck, t.genuine], [Truck, t.delivery]];
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(([Icon, label]) => (
        <div key={label} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-2 py-4 text-center shadow-card">
          <span className="grid size-10 place-items-center rounded-md bg-header text-brand"><Icon className="size-5" /></span>
          <b className="text-xs md:text-sm">{label}</b>
        </div>
      ))}
    </div>
  );
}

export function TradeBanner() {
  const { lang } = useStore();
  const t = copy[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link to="/account" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg bg-brand px-5 py-4 text-brand-foreground shadow-brand">
      <div className="min-w-0">
        <h2 className="text-lg font-black">{t.trade}</h2>
        <p className="mt-1 text-xs font-medium opacity-75">{t.tradeSub}</p>
      </div>
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-header text-brand"><Arrow /></span>
    </Link>
  );
}