import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowRight, Home, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import logoAsset from "@/assets/faster-logo.png";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { lang } = useStore();
  const isArabic = lang === "ar";

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between bg-muted/20 px-4 py-6 md:py-10">
      
      {/* 1. زر الرجوع للرئيسية - محاذاته في الأعلى لمنع التداخل في الموبايل */}
      <div className="absolute top-6 start-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:border-[#FACC15] hover:text-[#FACC15]"
        >
          <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
          <Home className="size-4" />
          <span>{isArabic ? "الرئيسية" : "Home"}</span>
        </Link>
      </div>

      {/* 2. الكارت المركزي وبداخله اللوجو الموحد */}
      <div className="my-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        
        {/* محتوى الصفحات الداخلية */}
        <Outlet />
      </div>

      {/* 3. الـ Slogan أسفل الصفحة */}
      <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-medium text-muted-foreground">
        <ShieldCheck className="size-4 text-[#FACC15]" />
        <span>
          {isArabic 
            ? "فاستر - قطع الغيار الأصلية بأعلى جودة وأسرع توصيل" 
            : "FASTER - Genuine Auto Spare Parts & Fast Delivery"}
        </span>
      </div>

    </div>
  );
}