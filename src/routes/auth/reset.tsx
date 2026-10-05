import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/reset")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { lang } = useStore();
  const isArabic = lang === "ar";
  
  // التحكم في خطوات الصفحة (1: البريد, 2: الكود, 3: كلمة المرور الجديدة)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // الخطوة 1: إرسال الكود
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // محاكاة إرسال البريد
      setStep(2);
      setError(false);
    }
  };

  // الخطوة 2: التحقق من الكود (الكود الوهمي 123456)
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      setStep(3);
      setError(false);
    } else {
      setError(true);
    }
  };

  // الخطوة 3: تعيين كلمة المرور الجديدة
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 6) {
      // محاكاة تغيير كلمة المرور بنجاح
      navigate({ to: "/auth/login" });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* العناوين المتغيرة بناءً على الخطوة */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">
          {step === 1 && (isArabic ? "نسيت كلمة المرور" : "Forgot Password")}
          {step === 2 && (isArabic ? "كود التحقق" : "Verification Code")}
          {step === 3 && (isArabic ? "كلمة مرور جديدة" : "New Password")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === 1 && (isArabic ? "أدخل بريدك الإلكتروني لإرسال كود الاستعادة" : "Enter your email to receive a reset code")}
          {step === 2 && (isArabic ? `أدخل الكود المكون من 6 أرقام المرسل إلى ${email}` : `Enter the 6-digit code sent to ${email}`)}
          {step === 3 && (isArabic ? "قم بتعيين كلمة مرور جديدة وقوية لحسابك" : "Set a new, strong password for your account")}
        </p>
      </div>

      {/* الخطوة 1: إدخال البريد */}
      {step === 1 && (
        <form onSubmit={handleSendCode} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
              <Mail className="size-5" />
            </div>
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block h-12 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-left text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none"
              placeholder="email@example.com"
            />
          </div>
          <Button type="submit" disabled={!email} className="h-12 w-full bg-[#FACC15] text-lg font-bold text-black hover:bg-[#FACC15]/90 disabled:opacity-50">
            {isArabic ? "إرسال الكود" : "Send Code"}
          </Button>
        </form>
      )}

      {/* الخطوة 2: إدخال الكود (بنفس تصميم verify القديم) */}
      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-2">
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
            {error && <p className="mt-2 text-center text-xs text-red-500">{isArabic ? "الكود غير صحيح! للتجربة استخدم 123456" : "Invalid code! Use 123456"}</p>}
          </div>
          <Button type="submit" disabled={otp.length !== 6} className="h-12 w-full bg-gray-900 text-lg font-bold text-white hover:bg-gray-800 disabled:opacity-50">
            {isArabic ? "تأكيد الكود" : "Verify Code"}
          </Button>
          <button type="button" onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground mt-2">
            {isArabic ? "تعديل البريد الإلكتروني" : "Edit Email"}
          </button>
        </form>
      )}

      {/* الخطوة 3: كلمة المرور الجديدة */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-2">
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
              <Lock className="size-5" />
            </div>
            <input
              type="password"
              required
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block h-12 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-left text-foreground focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none"
              placeholder={isArabic ? "كلمة المرور الجديدة" : "New Password"}
            />
          </div>
          <Button type="submit" disabled={password.length < 6} className="h-12 w-full bg-[#FACC15] text-lg font-bold text-black hover:bg-[#FACC15]/90 disabled:opacity-50">
            {isArabic ? "حفظ تسجيل الدخول" : "Save & Login"}
          </Button>
        </form>
      )}

      {/* رابط العودة لتسجيل الدخول الثابت في أسفل الصفحة */}
      <div className="mt-4 flex justify-center border-t border-border pt-4">
        <Link to="/auth/login" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          {isArabic ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
          <span>{isArabic ? "العودة لتسجيل الدخول" : "Back to Login"}</span>
        </Link>
      </div>

    </div>
  );
}