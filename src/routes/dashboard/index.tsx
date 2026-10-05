import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Car, Wallet, ArrowRight, Plus, ExternalLink, ShieldCheck, Clock } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { lang, user } = useStore();
  const isArabic = lang === "ar";

  const stats = [
    { title: isArabic ? "إجمالي الطلبات" : "Total Orders", value: "12", icon: FileText, color: "text-[#FACC15]" },
    { title: isArabic ? "طلبات قيد التنفيذ" : "Active Orders", value: "2", icon: Clock, color: "text-blue-500" },
    { title: isArabic ? "سياراتي المحفوظة" : "Saved Vehicles", value: "3", icon: Car, color: "text-emerald-500" },
    { title: isArabic ? "رصيد الحساب / الآجل" : "Account Ledger", value: "0.00 ج.م", icon: Wallet, color: "text-purple-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* الهيدر العلوي ورابط الرجوع للرئيسية */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isArabic ? `أهلاً بك، ${user?.name || "عميلنا العزيز"} 👋` : `Welcome, ${user?.name || "Customer"} 👋`}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic ? "متابعة سريعة لطلباتك وسيارتك وكشف الحساب" : "Quick overview of your orders, vehicles, and ledger"}
          </p>
        </div>

        {/* زر الرجوع للرئيسية الشيك */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-[#FACC15] hover:text-[#FACC15]"
        >
          <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
          <span>{isArabic ? "الرجوع للرئيسية" : "Back to Home"}</span>
        </Link>
      </div>

      {/* كروت الإحصائيات السريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">{stat.title}</span>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`grid size-11 place-items-center rounded-xl bg-accent/50 ${stat.color}`}>
              <stat.icon className="size-6" />
            </div>
          </div>
        ))}
      </div>

      {/* اختصارات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/vehicles"
          className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-[#FACC15]"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-[#FACC15]/10 text-[#FACC15]">
              <Plus className="size-5" />
            </div>
            <div>
              <p className="font-bold text-foreground group-hover:text-[#FACC15] transition-colors">
                {isArabic ? "إضافة سيارة جديدة" : "Add New Vehicle"}
              </p>
              <p className="text-xs text-muted-foreground">{isArabic ? "لتصفح قطع الغيار المطابقة" : "For quick parts match"}</p>
            </div>
          </div>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-[#FACC15]" />
        </Link>

        <Link
          to="/dashboard/orders"
          className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-[#FACC15]"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-[#FACC15]/10 text-[#FACC15]">
              <FileText className="size-5" />
            </div>
            <div>
              <p className="font-bold text-foreground group-hover:text-[#FACC15] transition-colors">
                {isArabic ? "عرض كشف الحساب" : "View Statement"}
              </p>
              <p className="text-xs text-muted-foreground">{isArabic ? "متابعة الفواتير والمدفوعات" : "Track invoices & balances"}</p>
            </div>
          </div>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-[#FACC15]" />
        </Link>

        <Link
          to="/"
          className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-[#FACC15]"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-[#FACC15]/10 text-[#FACC15]">
              <LayoutDashboard className="size-5" />
            </div>
            <div>
              <p className="font-bold text-foreground group-hover:text-[#FACC15] transition-colors">
                {isArabic ? "تصفح الكتالوج" : "Browse Catalog"}
              </p>
              <p className="text-xs text-muted-foreground">{isArabic ? "البحث برقم القطعة أو الموديل" : "Search by part no. or model"}</p>
            </div>
          </div>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-[#FACC15]" />
        </Link>
      </div>

      {/* آخر الطلبات */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
          <h2 className="font-bold text-foreground text-lg">{isArabic ? "أحدث الطلبات" : "Recent Orders"}</h2>
          <Link to="/dashboard/orders" className="text-xs font-semibold text-[#FACC15] hover:underline">
            {isArabic ? "عرض الكل" : "View All"}
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">طلب رقم #ORD-2026-8891</p>
                <p className="text-xs text-muted-foreground">{isArabic ? "تاريخ: 2026/09/20 • 3 قطع غيار" : "Date: Sep 20, 2026 • 3 Items"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
                {isArabic ? "تم التسليم" : "Delivered"}
              </span>
              <span className="text-sm font-bold text-foreground">3,450 ج.م</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}