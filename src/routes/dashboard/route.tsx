import { createFileRoute, Outlet, Link, redirect, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Car, LogOut } from "lucide-react";
import { useStore } from "@/lib/store";
import logoAsset from "@/assets/faster-logo.png";

// استبدل الجزء الخاص بـ Route فقط في أول الملف
export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const savedUser = sessionStorage.getItem("faster-user");
    
    if (!savedUser || savedUser === "null") {
      throw redirect({ to: "/dashboard" }); 
    }

    let userRole = null;
    try {
      const parsedData = JSON.parse(savedUser);
      userRole = parsedData?.state?.user?.role || parsedData?.role;
    } catch (e) {
      console.error("Error parsing user data", e);
    }

    // 🚀 التوجيه بقى بره الـ try/catch 
    // لو الرول أدمن، اطرده فورا للوحة الإدارة
    if (userRole === "admin") {
      throw redirect({ to: "/admin" });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  const { lang, user, logout } = useStore();
  const navigate = useNavigate();
  const isArabic = lang === "ar";

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  // قائمة خاصة بالعميل فقط (نظيفة ومفيهاش أي ربط بالأدمن)
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: isArabic ? "نظرة عامة" : "Overview", exact: true },
    { to: "/dashboard/orders", icon: FileText, label: isArabic ? "طلباتي وكشف الحساب" : "Orders & Ledger" },
    { to: "/dashboard/vehicles", icon: Car, label: isArabic ? "سياراتي المحفوظة" : "My Vehicles" },
    { to: "/dashboard/profile", icon: Car, label: isArabic ? "الملف الشخصي" : "Profile" },
  ];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen bg-background">
      
      {/* القائمة الجانبية (للديسكتوب) */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-e border-border bg-card md:flex">
        <div className="flex h-20 items-center gap-3 border-b border-border px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset} alt="Faster" className="h-8 w-auto" />
            <span className="text-xl font-extrabold tracking-widest text-[#FACC15]">FASTER</span>
          </Link>
        </div>
        
        <div className="flex flex-1 flex-col overflow-y-auto py-6">
          <nav className="flex flex-1 flex-col gap-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ 
                  className: "bg-[#FACC15]/10 text-[#FACC15] hover:bg-[#FACC15]/20 hover:text-[#FACC15]" 
                }}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto border-t border-border p-4">
            <div className="mb-4 flex items-center gap-3 px-2">
              <div className="grid size-10 place-items-center rounded-full bg-accent text-lg font-bold uppercase text-foreground">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-foreground">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {isArabic ? "عميل" : "Customer"}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="size-5" />
              {isArabic ? "تسجيل الخروج" : "Logout"}
            </button>
          </div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 pb-20 md:pb-0">
        {/* هيدر الموبايل */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset} alt="Faster" className="h-6 w-auto" />
            <span className="text-lg font-extrabold text-[#FACC15]">FASTER</span>
          </Link>
          <button onClick={handleLogout} className="grid size-9 place-items-center rounded-full bg-accent text-red-500">
            <LogOut className="size-4" />
          </button>
        </header>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* القائمة السفلية (للموبايل) */}
      <nav 
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 border-t border-border bg-card md:hidden"
        style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
      >
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact }}
            className="flex flex-col items-center justify-center gap-1 text-[10px] font-semibold text-muted-foreground"
            activeProps={{ 
              className: "text-[#FACC15]" 
            }}
          >
            <item.icon className="size-5" />
            <span className="text-center leading-tight">{item.label}</span>
          </Link>
        ))}
      </nav>
      
    </div>
  );
}