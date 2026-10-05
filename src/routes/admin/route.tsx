import { createFileRoute, Outlet, Link, redirect, useNavigate } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  ShieldCheck
} from "lucide-react"; // شلنا ArrowRightLeft لأننا مش هنحتاجها
import { useStore } from "@/lib/store";
import logoAsset from "@/assets/faster-logo.png";

// استبدل الجزء الخاص بـ Route فقط في أول الملف
export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    const savedUser = sessionStorage.getItem("faster-user");
    
    if (!savedUser || savedUser === "null") {
      throw redirect({ to: "/admin" });
    }
    
    let userRole = null;
    try {
      const parsedData = JSON.parse(savedUser);
      // بنجيب الصلاحية سواء كانت جوه Zustand أو مباشرة
      userRole = parsedData?.state?.user?.role || parsedData?.role;
    } catch (e) {
      console.error("Error parsing user data", e);
    }

    // 🚀 التوجيه بقى بره الـ try/catch عشان يشتغل صح
    if (userRole !== "admin") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { lang, user, logout } = useStore();
  const navigate = useNavigate();
  const isArabic = lang === "ar";

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const adminNavItems = [
    { to: "/admin", icon: LayoutDashboard, label: isArabic ? "الإحصائيات" : "Dashboard", exact: true },
    { to: "/admin/orders", icon: ShoppingCart, label: isArabic ? "إدارة الطلبات" : "Orders" },
    { to: "/admin/products", icon: Package, label: isArabic ? "المنتجات والمخزون" : "Products" },
    { to: "/admin/users", icon: Users, label: isArabic ? "العملاء" : "Customers" },
    { to: "/admin/settings", icon: Settings, label: isArabic ? "الإعدادات" : "Settings" },
  ];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen bg-background">
      
      {/* القائمة الجانبية (للديسكتوب) - ثيم غامق */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col bg-slate-950 text-slate-300 md:flex border-e border-slate-900 shadow-xl">
        {/* اللوجو */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-800/60 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset} alt="Faster" className="h-8 w-auto invert opacity-90" />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-widest text-white">FASTER</span>
              <span className="text-[10px] font-bold tracking-wider text-blue-400">ADMIN PANEL</span>
            </div>
          </Link>
        </div>
        
        {/* الروابط */}
        <div className="flex flex-1 flex-col overflow-y-auto py-6">
          <nav className="flex flex-1 flex-col gap-2 px-4">
            {adminNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-slate-400 hover:bg-slate-800 hover:text-white"
                activeProps={{ 
                  className: "bg-blue-600 text-white hover:bg-blue-600 shadow-md shadow-blue-900/20" 
                }}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* قسم المستخدم السفلي */}
          <div className="mt-auto border-t border-slate-800/60 p-4 flex flex-col gap-2">
            
            <div className="mb-2 flex items-center gap-3 px-2">
              <div className="grid size-10 place-items-center rounded-full bg-blue-950 text-lg font-bold uppercase text-blue-400 border border-blue-900/50">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-white">{user?.name}</span>
                <span className="flex items-center gap-1 truncate text-xs text-blue-400 font-medium">
                  <ShieldCheck className="size-3" />
                  {isArabic ? "مدير النظام" : "System Admin"}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/50 hover:text-red-300"
            >
              <LogOut className="size-5" />
              {isArabic ? "تسجيل الخروج" : "Logout"}
            </button>
          </div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 pb-20 md:pb-0">
        {/* هيدر الموبايل (معدل ليناسب الثيم الغامق للادمن) */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 md:hidden shadow-sm">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset} alt="Faster" className="h-6 w-auto brightness-0 invert" />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-white leading-none">FASTER</span>
              <span className="text-[9px] font-bold text-blue-400">ADMIN</span>
            </div>
          </Link>
          
          {/* ✅ التصحيح: شلنا زرار التحويل للوحة المستخدم واكتفينا بتسجيل الخروج */}
          <button onClick={handleLogout} className="grid size-9 place-items-center rounded-full bg-red-950/50 text-red-400">
            <LogOut className="size-4" />
          </button>
        </header>

        {/* مساحة عرض المحتوى */}
        <div className="p-4 md:p-8 bg-background min-h-[calc(100vh-4rem)] md:min-h-screen">
          <Outlet />
        </div>
      </main>

      {/* القائمة السفلية (للموبايل) - ثيم غامق */}
      <nav 
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 border-t border-slate-800 bg-slate-950 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.1)]"
        style={{ gridTemplateColumns: `repeat(${adminNavItems.length > 5 ? 5 : adminNavItems.length}, minmax(0, 1fr))` }}
      >
        {adminNavItems.slice(0, 5).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact }}
            className="flex flex-col items-center justify-center gap-1 text-[10px] font-semibold text-slate-400 transition-colors"
            activeProps={{ 
              className: "text-blue-400" 
            }}
          >
            <item.icon className="size-5" />
            <span className="text-center leading-tight truncate px-1">{item.label}</span>
          </Link>
        ))}
      </nav>
      
    </div>
  );
}