import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  TrendingUp, Package, AlertTriangle, Users, ArrowUpRight, 
  Search, Plus, Filter, CheckCircle2, Clock, Truck, 
  DollarSign, FileSpreadsheet, ExternalLink, ArrowRight, Eye, MoreVertical
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

// داتا المبيعات والطلبات الوهمية الخاصة بالإدارة
const MOCK_ADMIN_ORDERS = [
  { 
    id: "ORD-9901", 
    customer: "شركة الأمل لنقل البضائع", 
    type: "B2B (تاجر)", 
    itemsCount: 14, 
    total: 48500, 
    status: "pending", 
    date: "اليوم 10:30 ص" 
  },
  { 
    id: "ORD-9900", 
    customer: "مركز خدمة الإسكندرية (أحمد سعد)", 
    type: "ورشة معتمدة", 
    itemsCount: 5, 
    total: 12300, 
    status: "processing", 
    date: "اليوم 09:15 ص" 
  },
  { 
    id: "ORD-9899", 
    customer: "محمود حسن", 
    type: "عميل تجزئة", 
    itemsCount: 2, 
    total: 3450, 
    status: "shipped", 
    date: "أمس 04:20 م" 
  },
  { 
    id: "ORD-9898", 
    customer: "مؤسسة التيسير لقطع الغيار", 
    type: "B2B (تاجر)", 
    itemsCount: 28, 
    total: 112000, 
    status: "completed", 
    date: "أمس 02:00 م" 
  },
];

// تنبيهات قطع الغيار المطلوبة أو القريبة من النفاد
const MOCK_LOW_STOCK = [
  { partNo: "ISZ-BK-4011", name: "طقم تيل فرامل أمامي Isuzu D-Max", stock: 3, minStock: 10 },
  { partNo: "CHV-FL-8820", name: "فلتر جاز أصلي شيفروليه دبابة", stock: 5, minStock: 15 },
  { partNo: "TYT-BL-1022", name: "سير كاتينة تويوتا هيلوكس", stock: 2, minStock: 8 },
];

function AdminDashboardPage() {
  const { lang } = useStore();
  const isArabic = lang === "ar";

  const [orders, setOrders] = useState(MOCK_ADMIN_ORDERS);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // تغيير حالة الطلب مباشرة من اللوحة
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex w-full flex-col gap-6">
      
      {/* 1. الهيدر العلوي وأزرار التحكم الرئيسية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#FACC15]/20 px-2 py-0.5 text-xs font-bold text-[#FACC15]">
              System Control
            </span>
            <span className="text-xs text-muted-foreground">• فاستر لإدارة قطع الغيار</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-foreground">
            {isArabic ? "لوحة الإدارة المركزية" : "Admin Master Dashboard"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90 gap-2">
            <Plus className="size-4" />
            <span>{isArabic ? "إضافة قطعة غيار" : "Add Part"}</span>
          </Button>
          
          <Button size="sm" variant="outline" className="border-border gap-2">
            <FileSpreadsheet className="size-4" />
            <span>{isArabic ? "تصدير التقرير" : "Export Report"}</span>
          </Button>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:border-[#FACC15]"
          >
            <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
            <span>{isArabic ? "المتجر" : "Storefront"}</span>
          </Link>
        </div>
      </div>

      {/* 2. كروت المؤشرات المالية والإدارية (KPIs Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">{isArabic ? "مبيعات الشهر الحالي" : "Monthly Revenue"}</span>
            <div className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-foreground">176,250 <span className="text-xs font-bold">ج.م</span></p>
            <span className="flex items-center text-xs font-bold text-emerald-500">
              <ArrowUpRight className="size-3" /> +14.2%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{isArabic ? "مقارنة بالاشهر السابق" : "Vs last month"}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">{isArabic ? "طلبات جاري مراجعتها" : "Pending Orders"}</span>
            <div className="grid size-9 place-items-center rounded-lg bg-[#FACC15]/10 text-[#FACC15]">
              <Clock className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-foreground">6 <span className="text-xs font-bold">طلبات</span></p>
            <span className="rounded-full bg-[#FACC15]/20 px-2 py-0.5 text-[10px] font-bold text-[#FACC15]">
              تتطلب إجراء
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{isArabic ? "منها 4 طلبيات تجار B2B" : "4 Wholesale B2B"}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">{isArabic ? "نواقص المخزون" : "Low Stock Items"}</span>
            <div className="grid size-9 place-items-center rounded-lg bg-red-500/10 text-red-500">
              <AlertTriangle className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-foreground">3 <span className="text-xs font-bold">أكواد</span></p>
            <span className="text-xs font-bold text-red-500">{isArabic ? "تحت الحد الأدنى" : "Critical"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">{isArabic ? "تحتاج إعادة طلب من التوريد" : "Reorder needed"}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">{isArabic ? "التجار والورش المعتمدة" : "Active Dealers"}</span>
            <div className="grid size-9 place-items-center rounded-lg bg-purple-500/10 text-purple-500">
              <Users className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-foreground">42 <span className="text-xs font-bold">حساب</span></p>
            <span className="flex items-center text-xs font-bold text-emerald-500">
              <ArrowUpRight className="size-3" /> +3
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{isArabic ? "حسابات B2B نشطة" : "Active B2B accounts"}</p>
        </div>

      </div>

      {/* 3. قسم إدارة الطلبات والتنبيهات الفرعية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* جدول الطلبات الحديثة (ياخد 2 عمود) */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
            <div>
              <h2 className="font-bold text-foreground text-lg">{isArabic ? "إدارة طلبات الفواتير" : "Recent Orders Management"}</h2>
              <p className="text-xs text-muted-foreground">{isArabic ? "مراجعة وتغيير حالة الفواتير والطلبيات" : "Review and update order lifecycle"}</p>
            </div>

            {/* الفلترة والبحث */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute start-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={isArabic ? "بحث برقم الطلب..." : "Search ID..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8 w-36 sm:w-44 rounded-lg border border-border bg-background ps-8 pe-2 text-xs text-foreground outline-none focus:border-[#FACC15]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-8 rounded-lg border border-border bg-background px-2 text-xs text-foreground outline-none focus:border-[#FACC15]"
              >
                <option value="all">{isArabic ? "كل الحالات" : "All Status"}</option>
                <option value="pending">{isArabic ? "قيد الانتظار" : "Pending"}</option>
                <option value="processing">{isArabic ? "جاري التجهيز" : "Processing"}</option>
                <option value="shipped">{isArabic ? "تم الشحن" : "Shipped"}</option>
                <option value="completed">{isArabic ? "مكتمل" : "Completed"}</option>
              </select>
            </div>
          </div>

          {/* قائمة الطلبات متجاوبة للموبايل والتابلت */}
          <div className="space-y-3">
            {filteredOrders.map((ord) => (
              <div key={ord.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/80 bg-background p-3.5 hover:border-[#FACC15]/40 transition-colors">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-foreground">{ord.id}</span>
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {ord.type}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{ord.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">{ord.customer}</p>
                  <p className="text-[11px] text-muted-foreground">{ord.itemsCount} قطع غيار • <span className="font-bold text-foreground">{ord.total.toLocaleString()} ج.م</span></p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-none border-border pt-2 sm:pt-0">
                  {/* تحديد حالة الطلب */}
                  <select
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                    className={`h-8 rounded-lg text-xs font-bold px-2 border border-border outline-none transition-colors ${
                      ord.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                      ord.status === 'shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                      ord.status === 'processing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' :
                      'bg-red-500/10 text-red-500 border-red-500/30'
                    }`}
                  >
                    <option value="pending" className="bg-card text-foreground">{isArabic ? "قيد المراجعة" : "Pending"}</option>
                    <option value="processing" className="bg-card text-foreground">{isArabic ? "جاري التجهيز" : "Processing"}</option>
                    <option value="shipped" className="bg-card text-foreground">{isArabic ? "تم الشحن" : "Shipped"}</option>
                    <option value="completed" className="bg-card text-foreground">{isArabic ? "مكتمل وتسليم" : "Completed"}</option>
                  </select>

                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                    <Eye className="size-4" />
                  </Button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* كارت نواقص المخزون والتنبيهات (1 عمود) */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-bold text-foreground text-base flex items-center gap-2">
              <AlertTriangle className="size-4 text-red-500" />
              <span>{isArabic ? "تنبيهات نواقص القطع" : "Low Stock Warning"}</span>
            </h2>
            <span className="text-xs text-muted-foreground">{MOCK_LOW_STOCK.length} أكواد</span>
          </div>

          <div className="space-y-3">
            {MOCK_LOW_STOCK.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-foreground">{item.partNo}</span>
                  <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold text-red-500">
                    متبقي {item.stock} فقط
                  </span>
                </div>
                <p className="text-xs font-medium text-foreground line-clamp-1">{item.name}</p>
                <div className="flex items-center justify-between pt-1 border-t border-red-500/10">
                  <span className="text-[11px] text-muted-foreground">الحد الأدنى للمخزن: {item.minStock}</span>
                  <button className="text-xs font-bold text-[#FACC15] hover:underline">
                    {isArabic ? "طلب توريد" : "Reorder"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-accent/40 p-3 text-center">
            <p className="text-xs text-muted-foreground">{isArabic ? "يتم تحديث بيانات المخزون تلقائياً عند تأكيد الفواتير" : "Inventory syncs automatically upon invoice confirmation"}</p>
          </div>
        </div>

      </div>

    </div>
  );
}