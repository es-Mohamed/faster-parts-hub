import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Home, ShieldAlert } from "lucide-react";
import { useStore, type User } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/verify")({
  component: VerifyPage,
});

const MOCK_USERS: Record<string, User> = {
  "01000000000": { id: "usr_admin", name: "مدير النظام", phone: "01000000000", role: "admin" },
  "01111111111": { id: "usr_trader", name: "قطع غيار السلام", phone: "01111111111", role: "trader" },
  "01222222222": { id: "usr_consumer", name: "أحمد محمود", phone: "01222222222", role: "consumer" },
};

function VerifyPage() {
  const navigate = useNavigate();
  const { lang, login } = useStore();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const isArabic = lang === "ar";
  
  const phone = sessionStorage.getItem("pending-auth-phone") || "01xxxxxxxxx";

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "123456") {
      setError(true);
      return;
    }
    setError(false);
    const existingUser = MOCK_USERS[phone];

    if (existingUser) {
      login(existingUser);
      sessionStorage.removeItem("pending-auth-phone");
      if (existingUser.role === "admin") navigate({ to: "/admin" });
      else navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/auth/register" });
    }
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">{isArabic ? "كود التحقق" : "Verification Code"}</h1>
        <p className="mt-2 text-sm text-muted-foreground" dir="ltr">
          {isArabic ? `أدخل الكود المرسل إلى ${phone}` : `Enter code sent to ${phone}`}
        </p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            required
            maxLength={6}
            dir="ltr"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ''));
              setError(false);
            }}
            className={`block h-14 w-full rounded-lg border bg-background text-center text-2xl font-bold tracking-[0.5em] text-foreground outline-none transition-colors focus:ring-1 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-[#FACC15] focus:ring-[#FACC15]"}`}
            placeholder="------"
          />
          {error && <p className="mt-2 text-center text-xs text-red-500">{isArabic ? "الكود غير صحيح! الكود هو 123456" : "Invalid code! Use 123456"}</p>}
        </div>

        <Button type="submit" disabled={otp.length !== 6} className="h-12 w-full bg-[#FACC15] text-lg font-bold text-black hover:bg-[#FACC15]/90 disabled:opacity-50">
          {isArabic ? "تأكيد الدخول" : "Verify"}
        </Button>
      </form>

      <div className="mt-4 flex justify-center">
        <Link to="/auth/login" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#FACC15]">
          {isArabic ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
          <span>{isArabic ? "تغيير رقم الموبايل" : "Change phone number"}</span>
        </Link>
      </div>
    </div>
  );
}