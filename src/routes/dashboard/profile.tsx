import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react";
import { User, Phone, MapPin, Mail, ShieldCheck, Save, Building, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/dashboard/profile')({
  component: UserProfilePage,
})

function UserProfilePage() {
  // حالة مبدئية للبيانات (يتم تحديثها من الجلسة لو موجودة)
  const [userData, setUserData] = useState({
    name: "أحمد سعد",
    phone: "01001234567",
    email: "ahmed.saad@example.com",
    address: "الإسكندرية، محرم بك",
    type: "ورشة معتمدة",
    status: "حساب نشط"
  });

  // جلب بيانات اليوزر الحقيقية من sessionStorage عند تحميل الصفحة
  useEffect(() => {
    try {
      const savedUser = sessionStorage.getItem("faster-user");
      if (savedUser && savedUser !== "null") {
        const parsed = JSON.parse(savedUser);
        const userObj = parsed?.state?.user || parsed;
        
        if (userObj) {
          setUserData(prev => ({
            ...prev,
            name: userObj.name || prev.name,
            phone: userObj.phone || prev.phone,
            type: userObj.type || prev.type,
            // لو مسجلين بيانات تانية نقدر نسحبها هنا
          }));
        }
      }
    } catch (e) {
      console.error("خطأ في قراءة بيانات المستخدم", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // هنا ممكن تضيف كود إرسال البيانات المحدثة للباك إند API لاحقاً
    alert("تم حفظ البيانات بنجاح!");
  };

  return (
    <div className="flex w-full flex-col gap-6 max-w-5xl mx-auto">
      {/* هيدر الصفحة */}
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <User className="size-6 text-[#FACC15]" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
          <p className="text-xs text-muted-foreground mt-1">إدارة معلومات حسابك وعناوين الشحن</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* العمود الأول: البيانات القابلة للتعديل (بياخد مساحة أكبر) */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-3">
            <Info className="size-5 text-muted-foreground" /> البيانات الأساسية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                <User className="size-3.5" /> الاسم بالكامل
              </label>
              <input 
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                <Phone className="size-3.5" /> رقم الهاتف المحمول
              </label>
              <input 
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" 
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                <Mail className="size-3.5" /> البريد الإلكتروني (اختياري)
              </label>
              <input 
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" 
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5" /> عنوان الشحن الأساسي
              </label>
              <input 
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border mt-2">
            <Button onClick={handleSave} className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90 gap-2 px-8">
              <Save className="size-4" />
              حفظ التعديلات
            </Button>
          </div>
        </div>

        {/* العمود الثاني: معلومات الحساب (للقراءة فقط) */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5 h-fit">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-3">
            <ShieldCheck className="size-5 text-emerald-500" /> حالة الحساب
          </h2>
          
          <div className="space-y-4">
            <div className="bg-accent/40 p-3 rounded-lg border border-border/50">
              <p className="text-xs font-bold text-muted-foreground mb-1 flex items-center gap-1.5">
                <Building className="size-3.5" /> نوع العميل
              </p>
              <p className="text-sm font-black text-foreground">{userData.type}</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                (هذا التصنيف يحدد الخصومات والأسعار المتاحة لك، ويتم إدارته بواسطة الإدارة)
              </p>
            </div>

            <div className="bg-accent/40 p-3 rounded-lg border border-border/50 flex justify-between items-center">
              <p className="text-xs font-bold text-muted-foreground">حالة الحساب</p>
              <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-xs font-bold">
                {userData.status}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}