import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, LifeBuoy, MessageCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/support")({
  component: SupportPage,
});

function SupportPage() {
  const { lang } = useStore();
  const ar = lang === "ar";
  const [openQ, setOpenQ] = useState<number | null>(0);

  const faqs = [
    { 
      q: ar ? "كيف يمكنني تتبع طلبي؟" : "How can I track my order?", 
      a: ar ? "يمكنك تتبع طلبك من خلال الدخول إلى 'حسابي' ثم قسم 'طلباتي'، أو من خلال رقم التتبع المرسل في رسالة التأكيد." : "Track your order via 'My Account' -> 'Orders', or using the tracking number sent in the confirmation message." 
    },
    { 
      q: ar ? "هل يمكنني تعديل الطلب بعد تأكيده؟" : "Can I modify my order after confirmation?", 
      a: ar ? "نعم، يمكنك تعديل الطلب طالما لم يدخل مرحلة الشحن (خلال أول ساعتين عادةً) عبر التواصل معنا." : "Yes, as long as it hasn't been shipped (usually within 2 hours), by contacting us." 
    },
    { 
      q: ar ? "ماذا أفعل إذا وصلتني قطعة غير مطابقة؟" : "What if I receive an incompatible part?", 
      a: ar ? "نعتذر عن ذلك. تواصل مع الدعم الفني فوراً وسنقوم باستبدالها لك مجاناً خلال فترة الاسترجاع المسموحة (14 يوم)." : "We apologize. Contact support immediately, and we will replace it for free within the 14-day return period." 
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand/10 text-brand">
          <LifeBuoy className="size-8" />
        </span>
        <h1 className="mt-5 text-3xl font-black md:text-4xl">{ar ? "الدعم الفني والمساعدة" : "Technical Support"}</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {ar ? "نحن هنا لمساعدتك والإجابة على كافة استفساراتك." : "We are here to help and answer all your questions."}
        </p>
      </div>

      <div className="mb-12 space-y-4">
        <h2 className="text-xl font-bold mb-6">{ar ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2>
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden transition-all">
            <button 
              onClick={() => setOpenQ(openQ === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-start font-bold outline-none"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`size-5 text-muted-foreground transition-transform ${openQ === i ? "rotate-180 text-brand" : ""}`} />
            </button>
            {openQ === i && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground border-t border-border/50 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* لم يتم حل المشكلة؟ */}
      <div className="rounded-2xl bg-header p-8 text-center text-header-foreground shadow-card">
        <Headphones className="mx-auto mb-4 size-10 text-brand" />
        <h3 className="text-xl font-black mb-2">{ar ? "لم تجد إجابة لسؤالك؟" : "Didn't find your answer?"}</h3>
        <p className="text-sm text-header-muted mb-6">
          {ar ? "فريق الدعم الفني جاهز للرد عليك ومساعدتك في أي مشكلة فنية أو استفسار." : "Our technical support team is ready to assist you."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="catalog" size="xl" asChild>
            <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer">
              <MessageCircle className="size-5 me-2" />
              {ar ? "محادثة واتساب" : "WhatsApp Chat"}
            </a>
          </Button>
          <Button variant="outline" size="xl" className="bg-transparent border-header-border text-header-foreground hover:text-brand hover:border-brand" asChild>
            <Link to="/contact">{ar ? "صفحة التواصل" : "Contact Page"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}