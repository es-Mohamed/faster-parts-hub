import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Undo2 } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/warranty")({
  component: WarrantyPage,
});

function WarrantyPage() {
  const { lang } = useStore();
  const ar = lang === "ar";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black md:text-4xl">{ar ? "الضمان والاسترجاع" : "Warranty & Returns"}</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {ar ? "في فاستر، نضمن لك جودة القطع الأصلية وحقك الكامل في الاسترجاع." : "We guarantee the quality of genuine parts and your full right to return."}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* الاسترجاع */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-header text-brand">
            <Undo2 className="size-6" />
          </span>
          <h2 className="text-2xl font-black mb-4">{ar ? "سياسة الاسترجاع" : "Return Policy"}</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground list-disc list-inside">
            <li>{ar ? "يحق للعميل استرجاع المنتج خلال 14 يوماً من تاريخ الاستلام." : "Returns are accepted within 14 days of receipt."}</li>
            <li>{ar ? "يجب أن تكون القطعة في حالتها الأصلية وغلافها الأصلي ولم يتم تركيبها." : "Parts must be in their original packaging, uninstalled, and in original condition."}</li>
            <li>{ar ? "يتم استرداد المبلغ بنفس طريقة الدفع الأصلية." : "Refunds are processed using the original payment method."}</li>
          </ul>
        </div>

        {/* الضمان */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-header text-brand">
            <ShieldCheck className="size-6" />
          </span>
          <h2 className="text-2xl font-black mb-4">{ar ? "شروط الضمان" : "Warranty Terms"}</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground list-disc list-inside">
            <li>{ar ? "جميع القطع مغطاة بضمان شامل لمدة سنة كاملة." : "All parts are covered by a comprehensive 1-year warranty."}</li>
            <li>{ar ? "يغطي الضمان عيوب الصناعة ولا يشمل سوء التركيب أو الاستخدام." : "Warranty covers manufacturing defects, not improper installation or misuse."}</li>
            <li>{ar ? "يتطلب تفعيل الضمان الاحتفاظ بفاتورة الشراء الأصلية." : "Original purchase invoice is required for warranty claims."}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}