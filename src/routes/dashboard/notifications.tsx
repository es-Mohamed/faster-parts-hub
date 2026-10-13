import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCircle2, AlertCircle, Wallet, Package, ArrowRight, CheckCheck, FileText } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/notifications")({
  component: NotificationsPage,
});

// داتا وهمية للإشعارات
const MOCK_NOTIFICATIONS = [
  { id: 1, title: "تم تسليم الطلب", desc: "طلبك رقم #ORD-2026-8891 تم تسليمه بنجاح.", date: "منذ ساعتين", read: false, type: "order", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", link: "/dashboard/orders" },
  { id: 2, title: "جاري تجهيز الطلب", desc: "طلبك رقم #ORD-2026-8120 قيد التجهيز الآن.", date: "منذ 5 ساعات", read: false, type: "order", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", link: "/dashboard/orders" },
  { id: 3, title: "تحديث الرصيد", desc: "تمت إضافة مبلغ 1,500 ج.م إلى رصيد حسابك الآجل.", date: "أمس", read: true, type: "wallet", icon: Wallet, color: "text-purple-500", bg: "bg-purple-500/10", link: "/dashboard/orders" },
  { id: 4, title: "تنبيه من النظام", desc: "تم تحديث أسعار الكتالوج لبعض قطع الغيار الخاصة بسيارات شيفروليه.", date: "منذ يومين", read: true, type: "system", icon: AlertCircle, color: "text-[#FACC15]", bg: "bg-[#FACC15]/10", link: "/" }
];

function NotificationsPage() {
  const { lang } = useStore();
  const isArabic = lang === "ar";
  const [filter, setFilter] = useState<"all" | "order" | "wallet" | "system">("all");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter((n) => (filter === "all" ? true : n.type === filter));
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-200">
      {/* الهيدر العلوي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="size-6 text-[#FACC15]" />
            {isArabic ? "الإشعارات" : "Notifications"}
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {unreadCount} {isArabic ? "جديد" : "New"}
              </span>
            )}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic ? "تابع أحدث التحديثات لطلباتك ورصيدك" : "Follow up on your latest orders and balance updates"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleMarkAllAsRead} 
            variant="outline"
            size="sm"
            className="text-xs gap-2 border-border"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="size-4" />
            <span>{isArabic ? "تحديد الكل كمقروء" : "Mark all as read"}</span>
          </Button>
          
          <Link
            to="/"
            className="flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-[#FACC15] hover:text-[#FACC15]"
          >
            <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
            <span className="hidden sm:inline">{isArabic ? "الرئيسية" : "Home"}</span>
          </Link>
        </div>
      </div>

      {/* أزرار الفلترة (Tabs) */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto snap-x hide-scrollbar">
        {[
          { id: "all", label: isArabic ? "الكل" : "All" },
          { id: "order", label: isArabic ? "الطلبات" : "Orders" },
          { id: "wallet", label: isArabic ? "الرصيد" : "Wallet" },
          { id: "system", label: isArabic ? "النظام" : "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`shrink-0 snap-start rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
              filter === tab.id ? "bg-[#FACC15] text-black" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* قائمة الإشعارات */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Bell className="size-12 text-muted-foreground/40 mb-3" />
            <h3 className="text-base font-bold text-foreground">{isArabic ? "لا توجد إشعارات" : "No notifications"}</h3>
            <p className="text-xs text-muted-foreground mt-1">{isArabic ? "أنت على إطلاع بكل جديد!" : "You are all caught up!"}</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => handleMarkAsRead(notif.id)}
              className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 transition-all hover:border-[#FACC15]/50 cursor-pointer ${
                notif.read ? "bg-background border-border/60" : "bg-card border-[#FACC15]/30 shadow-sm"
              }`}
            >
              {/* النقطة اللي بتدل على إنه مش مقروء */}
              {!notif.read && (
                <span className="absolute top-4 rtl:left-4 ltr:right-4 size-2.5 rounded-full bg-rose-500 animate-pulse" />
              )}

              <div className="flex items-start gap-4">
                <div className={`mt-1 grid size-10 shrink-0 place-items-center rounded-lg ${notif.bg} ${notif.color}`}>
                  <notif.icon className="size-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${notif.read ? "text-foreground/80" : "text-foreground"}`}>
                    {notif.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {notif.desc}
                  </p>
                  <span className="mt-2 block text-[10px] font-semibold text-muted-foreground/70">
                    {notif.date}
                  </span>
                </div>
              </div>

              {/* زر الذهاب للتفاصيل */}
              <div className="border-t sm:border-t-0 border-border pt-3 sm:pt-0 mt-1 sm:mt-0">
                <Link
                  to={notif.link}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-[#FACC15] hover:text-black"
                >
                  {notif.type === "order" || notif.type === "wallet" ? (
                    <FileText className="size-3.5" />
                  ) : (
                    <AlertCircle className="size-3.5" />
                  )}
                  {isArabic ? "عرض التفاصيل" : "View Details"}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}