import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { FileText, Search, Eye, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/admin/orders')({
  component: AdminOrdersPage,
})

const MOCK_ORDERS = [
  { 
    id: "ORD-9901", customer: "شركة الأمل لنقل البضائع", date: "2026-09-24", total: 48500, status: "pending",
    items: [
      { code: "ISZ-BK-4011", name: "طقم تيل فرامل أمامي", qty: 10, price: 2850 },
      { code: "CHV-FL-8820", name: "فلتر جاز أصلي", qty: 4, price: 300 }
    ]
  },
  { 
    id: "ORD-9900", customer: "مركز خدمة الإسكندرية", date: "2026-09-23", total: 12300, status: "completed",
    items: [
      { code: "TYT-BL-1022", name: "سير كاتينة تويوتا", qty: 5, price: 2460 }
    ]
  },
];

function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <FileText className="size-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-foreground">إدارة الطلبات والفواتير</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 gap-4 bg-accent/50 p-4 border-b border-border text-sm font-bold text-muted-foreground">
          <div>رقم الطلب</div>
          <div className="col-span-2">العميل</div>
          <div>الإجمالي</div>
          <div className="text-end">تفاصيل</div>
        </div>

        <div className="flex flex-col divide-y divide-border/60">
          {MOCK_ORDERS.map((ord) => (
            <div key={ord.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-accent/20 transition-colors">
              <div className="font-extrabold text-sm">{ord.id}</div>
              <div className="col-span-2 text-sm font-semibold">{ord.customer}</div>
              <div className="font-bold text-blue-500">{ord.total.toLocaleString()} ج.م</div>
              <div className="text-end">
                <Button onClick={() => setSelectedOrder(ord)} variant="outline" size="sm" className="border-border hover:text-blue-500 gap-2">
                  <Eye className="size-4" /> عرض الفاتورة
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نافذة تفاصيل الفاتورة */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-2xl rounded-2xl border border-border shadow-xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div>
                <h2 className="text-xl font-black">فاتورة رقم {selectedOrder.id}</h2>
                <p className="text-xs text-muted-foreground">{selectedOrder.date} • {selectedOrder.customer}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-muted-foreground hover:text-red-500">
                <X className="size-6" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              <h3 className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                <Package className="size-4" /> محتويات الطلب
              </h3>
              {selectedOrder.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-border bg-accent/20">
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{item.code}</p>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-bold">{item.qty} × {item.price} ج.م</p>
                    <p className="text-xs font-black text-blue-500">الإجمالي: {(item.qty * item.price).toLocaleString()} ج.م</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-center bg-accent/30 p-4 rounded-xl">
              <span className="font-bold text-muted-foreground">الإجمالي النهائي:</span>
              <span className="text-xl font-black text-foreground">{selectedOrder.total.toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}