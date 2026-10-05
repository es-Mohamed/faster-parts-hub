import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Search, ShieldCheck, Phone, MapPin, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

const MOCK_USERS = [
  { id: "USR-01", name: "مركز خدمة الإسكندرية (أحمد سعد)", type: "ورشة معتمدة", phone: "01001234567", address: "الإسكندرية، محرم بك، شارع قناة السويس", orders: 15, status: "active" },
  { id: "USR-02", name: "شركة الأمل لنقل البضائع", type: "B2B (تاجر)", phone: "01122334455", address: "القاهرة، مدينة نصر، الحي السابع", orders: 42, status: "active" },
];

function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="size-6 text-purple-500" />
          إدارة العملاء والتجار
        </h1>
      </div>

      <div className="relative w-full md:w-1/2">
        <Search className="absolute start-3 top-2.5 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="بحث برقم الموبايل أو اسم العميل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-card ps-9 pe-4 text-sm outline-none focus:border-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_USERS.map((user) => (
          <div 
            key={user.id} 
            onClick={() => setSelectedUser(user)}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4 hover:border-purple-500/50 hover:bg-accent/20 cursor-pointer transition-colors"
          >
            <div>
              <h3 className="font-bold text-foreground text-sm">{user.name}</h3>
              <span className="inline-block mt-1 rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-500">
                {user.type}
              </span>
            </div>
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="size-3.5" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة تفاصيل العميل */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-start border-b border-border pb-3">
              <div>
                <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                <span className="text-xs font-bold text-purple-500">{selectedUser.type}</span>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-muted-foreground hover:text-red-500">
                <X className="size-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-accent/30 p-3 rounded-lg border border-border/50">
                <Phone className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground">رقم الهاتف</p>
                  <p className="text-sm font-semibold">{selectedUser.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-accent/30 p-3 rounded-lg border border-border/50">
                <MapPin className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground">العنوان</p>
                  <p className="text-sm font-semibold">{selectedUser.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-accent/30 p-3 rounded-lg border border-border/50">
                <ShieldCheck className="size-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground">إجمالي الطلبات</p>
                  <p className="text-sm font-semibold">{selectedUser.orders} فاتورة / طلب</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                to="/admin/orders"
                search={{ customer: selectedUser.name }} 
                className="flex items-center justify-center gap-2 w-full bg-purple-500 text-white h-10 rounded-lg font-bold hover:bg-purple-600 transition-colors"
              >
                <FileText className="size-4" />
                عرض فواتير العميل
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}