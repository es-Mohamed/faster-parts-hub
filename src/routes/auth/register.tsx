import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserRound, Store, MapPin, Phone, Mail, Map, Users, Lock, AlertCircle } from "lucide-react";
import { useStore, type Role } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

const USER_TYPES = [
  { id: "consumer", labelAr: "شخصي (مستهلك أفراد)", labelEn: "Personal (Individual)" },
  { id: "retail_shop", labelAr: "محل قطع غيار", labelEn: "Spare Parts Shop" },
  { id: "workshop", labelAr: "ورشة / مركز صيانة", labelEn: "Auto Workshop / Service Center" },
  { id: "trader", labelAr: "تاجر جملة / موزع", labelEn: "Wholesaler / Distributor" },
  { id: "company", labelAr: "شركة / أسطول سيارات", labelEn: "Company / Fleet" },
];

const locationsData: Record<string, string[]> = {
  cairo: ["مدينة نصر", "مصر الجديدة", "المعادي", "وسط البلد", "التجمع الخامس"],
  alexandria: ["سموحة", "ميامي", "العصافرة", "محطة الرمل", "المنتزه"],
  dakahlia: ["المنصورة", "ميت غمر", "السنبلاوين", "دكرنس", "طلخا"],
  kafrelsheikh: ["كفر الشيخ", "دسوق", "قلين", "سيدي سالم", "بلطيم"],
};

function RegisterPage() {
  const navigate = useNavigate();
  const { lang, login } = useStore();
  const isArabic = lang === "ar";
  
  const [formData, setFormData] = useState({
    userType: "consumer",
    businessName: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    governorate: "",
    city: "",
    address: "",
  });

  const [passwordError, setPasswordError] = useState(false);
  const isBusiness = formData.userType !== "consumer";

  const handleGovChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, governorate: e.target.value, city: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    
    const role: Role = isBusiness ? "trader" : "consumer";
    login({
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name,
      phone: formData.phone,
      role: role,
    });
    
    localStorage.setItem("faster_has_logged_in", "true");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">{isArabic ? "إنشاء حساب جديد" : "Create Account"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{isArabic ? "يرجى تعبئة البيانات التالية بدقة" : "Please fill in your details accurately"}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><Users className="size-5" /></div>
          <select value={formData.userType} onChange={(e) => setFormData({ ...formData, userType: e.target.value })} className="block h-12 w-full appearance-none rounded-lg border border-border bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none">
            {USER_TYPES.map((type) => ( <option key={type.id} value={type.id}>{isArabic ? type.labelAr : type.labelEn}</option> ))}
          </select>
        </div>

        {isBusiness && (
          <div className="relative animate-in fade-in slide-in-from-top-2">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><Store className="size-5 text-[#FACC15]" /></div>
            <input type="text" required value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className="block h-12 w-full rounded-lg border border-[#FACC15]/50 bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none" placeholder={isArabic ? "اسم المحل / الورشة / الشركة *" : "Business / Shop Name *"} />
          </div>
        )}

        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><UserRound className="size-5" /></div>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="block h-12 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none" placeholder={isArabic ? "الاسم بالكامل *" : "Full Name *"} />
        </div>

        {/* الحقول الإنجليزية - الأيقونة يمين والكتابة تبدأ من اليسار بفضل dir="ltr" */}
        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><Phone className="size-5" /></div>
          <input type="tel" required dir="rtl" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })} className="block h-12 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none" placeholder="01000000000" />
        </div>

        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><Mail className="size-5" /></div>
          <input type="email" required dir="rtl" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="block h-12 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none" placeholder="email@example.com *" />
        </div>

        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><Lock className="size-5" /></div>
          <input type="password" required dir="rtl" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="block h-12 w-full rounded-lg border border-border bg-background pr-10 pl-3  text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none" placeholder={isArabic ? "كلمة المرور *" : "Password *"} />
        </div>

        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><Lock className="size-5" /></div>
          <input type="password" required dir="rtl" value={formData.confirmPassword} onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }); setPasswordError(false); }} className={`block h-12 w-full rounded-lg border bg-background pr-10 pl-3  text-foreground outline-none transition-colors ${passwordError ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-border focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15]"}`} placeholder={isArabic ? "تأكيد كلمة المرور *" : "Confirm Password *"} />
        </div>
        
        {passwordError && (
          <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="size-3" /> {isArabic ? "كلمتا المرور غير متطابقتين" : "Passwords do not match"}</p>
        )}

        <div className="relative">

<Map className="size-5" />
<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"></div>
          <select required value={formData.governorate} onChange={handleGovChange} className="block h-12 w-full appearance-none rounded-lg border border-border bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none">
            <option value="" disabled>{isArabic ? "المحافظة *" : "Governorate *"}</option>
            <option value="cairo">القاهرة</option>
            <option value="alexandria">الإسكندرية</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground"><MapPin className="size-5" /></div>
          <select required disabled={!formData.governorate} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="block h-12 w-full appearance-none rounded-lg border border-border bg-background pr-10 pl-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none disabled:opacity-50">
            <option value="" disabled>{isArabic ? "المدينة / المركز *" : "City *"}</option>
            {formData.governorate && locationsData[formData.governorate]?.map(city => ( <option key={city} value={city}>{city}</option> ))}
          </select>
        </div>

        <div className="relative">
          <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="block min-h-[75px] w-full rounded-lg border border-border bg-background p-3 text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none" placeholder={isArabic ? "عنوان الشارع بالتفصيل *" : "Detailed Street Address *"} />
        </div>

        <Button type="submit" disabled={!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword || !formData.governorate || !formData.city || !formData.address} className="mt-2 h-12 w-full bg-[#FACC15] text-lg font-bold text-black hover:bg-[#FACC15]/90 disabled:opacity-50 transition-all shadow-md">
          {isArabic ? "إنشاء حسابي الآن" : "Create My Account"}
        </Button>
      </form>
    </div>
  );
}