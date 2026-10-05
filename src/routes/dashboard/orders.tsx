import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  FileText, ArrowRight, Wallet, CheckCircle2, Clock, 
  Download, Package, ChevronRight, Receipt
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/orders")({
  component: OrdersPage,
});

// داتا وهمية ضفنا فيها تفاصيل المنتجات جوا الفاتورة
const MOCK_ORDERS = [
  { 
    id: "ORD-2026-8891", date: "2026/09/20", items: "طقم تيل فرامل + فلتر زيت Isuzu D-Max", total: 3450, status: "delivered",
    products: [
      { name: "طقم تيل فرامل أمامي Isuzu D-Max", qty: 1, price: 2850 },
      { name: "فلتر زيت أصلي", qty: 2, price: 300 }
    ]
  },
  { 
    id: "ORD-2026-8120", date: "2026/09/18", items: "فانوس أمامي دبابة + مساعدين خلفي", total: 5200, status: "processing",
    products: [
      { name: "فانوس أمامي يمين شيفروليه دبابة", qty: 1, price: 1200 },
      { name: "طقم مساعدين خلفي", qty: 1, price: 4000 }
    ]
  },
  { 
    id: "ORD-2026-7511", date: "2026/08/30", items: "طقم سيور كامل تويوتا هيلوكس", total: 1850, status: "delivered",
    products: [
      { name: "طقم سيور تويوتا هيلوكس", qty: 1, price: 1850 }
    ]
  },
];

function OrdersPage() {
  const { lang, user } = useStore();
  const [filter, setFilter] = useState<"all" | "processing" | "delivered">("all");
  // متغير لحفظ الطلب اللي العميل داس عليه عشان نعرض تفاصيله
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);
  
  const isArabic = lang === "ar";

  const filteredOrders = MOCK_ORDERS.filter((ord) => (filter === "all" ? true : ord.status === filter));

  // 1. عرض تفاصيل الفاتورة (لو العميل اختار طلب)
  if (selectedOrder) {
    return (
      <div className="flex w-full flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        {/* هيدر صفحة التفاصيل */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <Receipt className="size-6 text-[#FACC15]" />
              {isArabic ? `تفاصيل طلب #${selectedOrder.id}` : `Order Details #${selectedOrder.id}`}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {isArabic ? `تاريخ الطلب: ${selectedOrder.date}` : `Order Date: ${selectedOrder.date}`}
            </p>
          </div>

          <Button 
            variant="outline" 
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-xs border-border"
          >
            <ChevronRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
            <span>{isArabic ? "الرجوع للطلبات" : "Back to Orders"}</span>
          </Button>
        </div>

        {/* حالة الطلب الإجمالية */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-foreground">{isArabic ? "إجمالي الفاتورة" : "Total Amount"}</p>
              <p className="text-2xl font-extrabold text-[#FACC15]">{selectedOrder.total.toLocaleString()} ج.م</p>
            </div>
            <div className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${selectedOrder.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {selectedOrder.status === "delivered" ? <CheckCircle2 className="size-5" /> : <Clock className="size-5" />}
              {selectedOrder.status === "delivered" ? (isArabic ? "تم التسليم بنجاح" : "Delivered") : (isArabic ? "جاري الشحن" : "Processing")}
            </div>
          </div>
        </div>

        {/* جدول/قائمة المنتجات (متجاوب مع الموبايل) */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="bg-accent/50 p-4 border-b border-border">
            <h2 className="font-bold text-sm text-foreground">{isArabic ? "المنتجات المطلوبة" : "Ordered Items"}</h2>
          </div>
          <div className="flex flex-col divide-y divide-border/60">
            {selectedOrder.products.map((product, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-md bg-background border border-border text-muted-foreground">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground line-clamp-2">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{isArabic ? `الكمية: ${product.qty}` : `Qty: ${product.qty}`}</p>
                  </div>
                </div>
                <div className="text-start sm:text-end font-bold text-sm">
                  {(product.price * product.qty).toLocaleString()} ج.م
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. عرض القائمة الرئيسية للطلبات وكشف الحساب
  return (
    <div className="flex w-full flex-col gap-6">
      {/* الهيدر ورابط الرئيسية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            {isArabic ? "طلباتي وكشف الحساب" : "Orders & Financial Ledger"}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic ? "متابعة سجل المشتريات والمدفوعات الخاصة بحسابك" : "Track purchase history and statement of account"}
          </p>
        </div>

        <Link
          to="/"
          className="flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-[#FACC15] hover:text-[#FACC15]"
        >
          <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
          <span>{isArabic ? "الرجوع للرئيسية" : "Back to Home"}</span>
        </Link>
      </div>

      {/* كارت ملخص كشف الحساب (تم تعديله للموبايل) */}
      <div className="w-full rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 md:size-12 shrink-0 place-items-center rounded-xl bg-[#FACC15]/10 text-[#FACC15]">
              <Wallet className="size-5 md:size-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">{isArabic ? "الملخص المالي بالحساب" : "Financial Summary"}</p>
              <p className="text-base md:text-lg font-extrabold text-foreground">
                {isArabic ? `نوع الحساب: ${user?.role === "trader" ? "تجاري (آجل)" : "أفراد"}` : `Type: ${user?.role}`}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 rounded-lg bg-background p-3 md:bg-transparent md:p-0 border border-border md:border-none">
            <div className="flex justify-between sm:block gap-4">
              <p className="text-xs text-muted-foreground">{isArabic ? "المشتريات" : "Purchases"}</p>
              <p className="text-sm md:text-base font-bold text-foreground">10,500 ج.م</p>
            </div>
            
            {/* خط فاصل يختفي في الموبايل أو يتحول لخط أفقي */}
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div className="block sm:hidden h-px w-full bg-border" />

            <div className="flex justify-between sm:block gap-4">
              <p className="text-xs text-muted-foreground">{isArabic ? "المديونية" : "Ledger Balance"}</p>
              <p className="text-sm md:text-base font-bold text-emerald-500">0.00 ج.م</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2 border-border mt-2 sm:mt-0">
              <Download className="size-4 shrink-0" />
              <span className="text-xs">{isArabic ? "تحميل كشف الحساب (PDF)" : "Download PDF"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* فلترة سجل الطلبات (تعديل الـ overflow للموبايل) */}
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto snap-x hide-scrollbar">
          <button
            onClick={() => setFilter("all")}
            className={`shrink-0 snap-start rounded-lg px-4 py-2 text-xs font-bold transition-colors ${filter === "all" ? "bg-[#FACC15] text-black" : "text-muted-foreground hover:bg-accent"}`}
          >
            {isArabic ? "جميع الطلبات" : "All Orders"}
          </button>
          <button
            onClick={() => setFilter("processing")}
            className={`shrink-0 snap-start rounded-lg px-4 py-2 text-xs font-bold transition-colors ${filter === "processing" ? "bg-[#FACC15] text-black" : "text-muted-foreground hover:bg-accent"}`}
          >
            {isArabic ? "قيد التنفيذ" : "In Progress"}
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`shrink-0 snap-start rounded-lg px-4 py-2 text-xs font-bold transition-colors ${filter === "delivered" ? "bg-[#FACC15] text-black" : "text-muted-foreground hover:bg-accent"}`}
          >
            {isArabic ? "المكتملة" : "Completed"}
          </button>
        </div>

        {/* قائمة الطلبات */}
        <div className="space-y-3 w-full">
          {filteredOrders.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-[#FACC15]/50">
              
              <div className="flex items-start gap-3 w-full md:w-auto">
                <div className="mt-1 grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-foreground">
                  <Package className="size-5" />
                </div>
                <div className="w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{order.id}</span>
                    <span className="text-xs text-muted-foreground">({order.date})</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted-foreground line-clamp-1">{order.items}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-none border-border pt-3 md:pt-0">
                <div className="text-start md:text-end">
                  <p className="text-sm font-extrabold text-foreground">{order.total.toLocaleString()} ج.م</p>
                  {order.status === "delivered" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                      <CheckCircle2 className="size-3" />
                      {isArabic ? "تم التسليم" : "Delivered"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-500">
                      <Clock className="size-3" />
                      {isArabic ? "جاري الشحن" : "Processing"}
                    </span>
                  )}
                </div>
                
                {/* زرار تفاصيل الفاتورة اللي بيغير الـ State */}
                <Button 
                  onClick={() => setSelectedOrder(order)}
                  variant="outline" 
                  size="sm" 
                  className="text-xs shrink-0"
                >
                  {isArabic ? "تفاصيل الفاتورة" : "Details"}
                </Button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}