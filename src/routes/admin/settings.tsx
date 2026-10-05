import { createFileRoute } from '@tanstack/react-router'
import { Settings, Save, Globe, Phone, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
})

function AdminSettingsPage() {
  return (
    <div className="flex w-full flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <Settings className="size-6 text-zinc-500" />
        <h1 className="text-2xl font-bold text-foreground">إعدادات النظام والموقع</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* معلومات الموقع الأساسية */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
            <Globe className="size-5 text-muted-foreground" /> البيانات الأساسية
          </h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">اسم الموقع / المتجر</label>
              <input defaultValue="فاستر لقطع الغيار" className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">وصف الموقع (للسيو ومحركات البحث)</label>
              <textarea defaultValue="المتجر الأول لقطع غيار السيارات النقل الخفيف..." className="w-full h-20 rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-[#FACC15] resize-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">رقم هاتف الدعم الفني</label>
              <div className="relative">
                <Phone className="absolute start-3 top-2.5 size-4 text-muted-foreground" />
                <input defaultValue="01000000000" className="w-full h-10 rounded-lg border border-border bg-background ps-9 pe-3 text-sm outline-none focus:border-[#FACC15]" />
              </div>
            </div>
          </div>
        </div>

        {/* روابط السوشيال ميديا */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
            <Facebook className="size-5 text-blue-500" /> السوشيال ميديا والتواصل
          </h2>
          <p className="text-xs text-muted-foreground">بمجرد وضع الرابط هنا، سيتم تفعيل الأيقونة الخاصة به في واجهة المتجر للمستخدمين.</p>
          
          <div className="space-y-3 mt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Facebook className="size-3" /> رابط فيسبوك</label>
              <input placeholder="https://facebook.com/..." className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-blue-500" dir="ltr" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Instagram className="size-3" /> رابط انستجرام</label>
              <input placeholder="https://instagram.com/..." className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-pink-500" dir="ltr" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1"><MessageCircle className="size-3 text-emerald-500" /> رقم الواتساب (لربط زر المحادثة)</label>
              <input placeholder="+2010..." className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-emerald-500" dir="ltr" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90 gap-2 px-8">
          <Save className="size-4" />
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}