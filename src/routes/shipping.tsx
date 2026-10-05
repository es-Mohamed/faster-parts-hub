import { createFileRoute } from "@tanstack/react-router";
import { Truck, PackageCheck, Clock, MapPin } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
});

function ShippingPage() {
  const { lang } = useStore();
  const ar = lang === "ar";

  const steps = [
    { icon: PackageCheck, title: ar ? "تجهيز الطلب" : "Order Processing", desc: ar ? "يتم مراجعة وتجهيز قطع الغيار المطلوبة من مخازننا بعناية فائقة." : "Parts are carefully picked and packed from our warehouses." },
    { icon: Truck, title: ar ? "في الطريق إليك" : "On the Way", desc: ar ? "يتم تسليم الطلب لأفضل شركات الشحن لضمان الأمان والسرعة." : "Handed over to top-tier logistics partners for safe transit." },
    { icon: Clock, title: ar ? "التوصيل السريع" : "Fast Delivery", desc: ar ? "يصلك الطلب خلال 48 ساعة كحد أقصى إلى باب عملك أو منزلك." : "Delivered to your door within 48 hours maximum." },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand/10 text-brand">
          <Truck className="size-8" />
        </span>
        <h1 className="mt-5 text-3xl font-black md:text-4xl">{ar ? "الشحن والتوصيل" : "Shipping & Delivery"}</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {ar ? "نفخر في فاستر بتغطية جميع محافظات الجمهورية بسرعة وكفاءة عالية." : "We are proud to cover all regions with speed and high efficiency."}
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <span className="mb-4 grid size-12 place-items-center rounded-full bg-header text-brand"><Icon /></span>
              <b className="mb-2 text-lg">{step.title}</b>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-center gap-3 rounded-2xl bg-muted/50 p-6 text-center font-bold">
        <MapPin className="text-brand" />
        <span>{ar ? "نوفر الشحن لجميع أنحاء الجمهورية خلال 48 ساعة فقط." : "We provide shipping nationwide within just 48 hours."}</span>
      </div>
    </div>
  );
}