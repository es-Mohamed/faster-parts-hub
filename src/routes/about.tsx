import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Zap, Users, Cog, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const { lang } = useStore();
  const ar = lang === "ar";
  const Arrow = ar ? ChevronLeft : ChevronRight;

  const features = [
    { 
      icon: Cog, 
      title: ar ? "قطع غيار أصلية 100%" : "100% Genuine Parts", 
      desc: ar ? "نضمن لك جودة وأصالة كل قطعة غيار تخرج من مخازننا لضمان أطول عمر افتراضي لسيارتك." : "We guarantee the quality and authenticity of every part to ensure the longest lifespan for your vehicle." 
    },
    { 
      icon: Zap, 
      title: ar ? "سرعة في التنفيذ" : "Speed of Execution", 
      desc: ar ? "نظام لوجستي متكامل يضمن وصول طلباتك في أسرع وقت ممكن لأي مكان في الجمهورية." : "An integrated logistics system ensuring your orders arrive as quickly as possible anywhere nationwide." 
    },
    { 
      icon: Users, 
      title: ar ? "شركاء نجاح للتجار" : "Success Partners for Trade", 
      desc: ar ? "نوفر أسعاراً تنافسية وخطط دعم مخصصة لتجار الجملة ومراكز الصيانة المعتمدة." : "We provide competitive pricing and customized support plans for wholesalers and service centers." 
    },
    { 
      icon: ShieldCheck, 
      title: ar ? "ثقة وضمان" : "Trust & Warranty", 
      desc: ar ? "جميع منتجاتنا مدعومة بضمان حقيقي وسياسة استرجاع مرنة تضع مصلحة العميل أولاً." : "All our products are backed by a real warranty and a flexible return policy putting the customer first." 
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      {/* قسم الترحيب (Hero Section) */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black md:text-5xl lg:text-6xl text-foreground">
          {ar ? "نحن " : "We Are "}
          <span className="text-[#FACC15]">FASTER</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">
          {ar 
            ? "الوجهة الأولى والأكثر موثوقية لقطع غيار السيارات الأصلية. انطلقنا برؤية واضحة وهي توفير قطع غيار مضمونة وعالية الكفاءة بأسعار تنافسية للسوق بأكمله." 
            : "The premier and most trusted destination for genuine auto spare parts. We started with a clear vision: to provide guaranteed, high-efficiency parts at competitive prices to the entire market."}
        </p>
      </div>

      {/* قسم الإحصائيات أو الرؤية */}
      <div className="mb-16 grid gap-6 md:grid-cols-2 items-center rounded-3xl bg-muted/30 p-6 md:p-10 border border-border">
        <div>
          <h2 className="text-2xl font-black mb-4">{ar ? "رؤيتنا" : "Our Vision"}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {ar 
              ? "نسعى في فاستر لإعادة تعريف معايير سوق قطع الغيار من خلال دمج التكنولوجيا الحديثة مع الخبرة العميقة في السيارات. هدفنا أن نكون الشريك الاستراتيجي لكل قائد سيارة وكل تاجر يبحث عن الجودة والموثوقية." 
              : "At Faster, we strive to redefine the standards of the spare parts market by integrating modern technology with deep automotive expertise. Our goal is to be the strategic partner for every driver and trader seeking quality and reliability."}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card p-5 text-center shadow-sm border border-border">
            <b className="block text-3xl font-black text-[#FACC15]">+50K</b>
            <span className="text-xs font-bold text-muted-foreground mt-1 block">{ar ? "قطعة غيار" : "Spare Parts"}</span>
          </div>
          <div className="rounded-2xl bg-card p-5 text-center shadow-sm border border-border">
            <b className="block text-3xl font-black text-[#FACC15]">100%</b>
            <span className="text-xs font-bold text-muted-foreground mt-1 block">{ar ? "ضمان الموثوقية" : "Guaranteed Reliability"}</span>
          </div>
        </div>
      </div>

      {/* قسم مميزات فاستر */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-center mb-10">{ar ? "لماذا فاستر؟" : "Why Faster?"}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Icon className="size-6" />
                </span>
                <div>
                  <b className="mb-2 block text-lg font-bold">{feature.title}</b>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* دعوة لاتخاذ إجراء (CTA) */}
      <div className="rounded-3xl bg-[#0A0A0A] p-8 text-center text-white shadow-xl md:p-12 border border-[#FACC15]/20">
        <h2 className="text-2xl font-black md:text-3xl mb-4">{ar ? "جاهز لتجربة فاستر؟" : "Ready to experience Faster?"}</h2>
        <p className="mb-8 text-sm text-gray-400 md:text-base max-w-lg mx-auto">
          {ar ? "تصفح الكتالوج الخاص بنا الآن واكتشف مجموعة واسعة من قطع الغيار الأصلية." : "Browse our catalog now and discover a wide range of genuine spare parts."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="catalog" size="xl" asChild>
            <Link to="/products">
              {ar ? "تصفح المنتجات" : "Browse Products"}
              <Arrow className="size-5 ms-2" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" className="bg-transparent border-gray-700 text-white hover:bg-gray-800 hover:text-white" asChild>
            <Link to="/contact">{ar ? "تواصل معنا" : "Contact Us"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}