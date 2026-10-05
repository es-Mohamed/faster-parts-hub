import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Mail, Lock, UserPlus, AlertCircle, Fingerprint } from "lucide-react";
import { useStore, type User } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

const MOCK_USERS: Record<string, User> = {
  "admin@faster.com": { id: "usr_admin", name: "مدير النظام", phone: "01000000000", role: "admin" },
  "trader@faster.com": { id: "usr_trader", name: "قطع غيار السلام", phone: "01111111111", role: "trader" },
  "user@faster.com": { id: "usr_consumer", name: "محمد ماضي", phone: "01222222222", role: "consumer" },
};

function LoginPage() {
  const navigate = useNavigate();
  const { lang, login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);
  const isArabic = lang === "ar";

  // التحقق مما إذا كان المستخدم قد سجل دخوله مسبقاً على هذا الجهاز
  useEffect(() => {
    if (localStorage.getItem("faster_has_logged_in")) {
      setHasLoggedInBefore(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS[email.toLowerCase()];
    
    if (user && password === "123456") {
      setError(false);
      login(user);
      // تفعيل ظهور زر البصمة للمرات القادمة
      localStorage.setItem("faster_has_logged_in", "true");
      navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
    } else {
      setError(true);
    }
  };

  const handleBiometricLogin = async () => {
    setIsBiometricLoading(true);
    setTimeout(() => {
      setIsBiometricLoading(false);
      login(MOCK_USERS["trader@faster.com"]);
      navigate({ to: "/dashboard" });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">{isArabic ? "تسجيل الدخول" : "Welcome Back"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{isArabic ? "أدخل بيانات حسابك للمتابعة" : "Enter your credentials to continue"}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* حقل البريد - تم ضبط الأيقونة على اليسار والنص LTR لمنع التداخل */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
            <Mail className="size-5" />
          </div>
          <input
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(false); }}
            className={`block h-12 w-full rounded-lg border bg-background pl-10 pr-3 text-left text-foreground outline-none transition-colors ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-border focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15]"}`}
            placeholder="email@example.com"
          />
        </div>

        {/* حقل كلمة المرور */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
            <Lock className="size-5" />
          </div>
          <input
            type="password"
            required
            dir="ltr"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={`block h-12 w-full rounded-lg border bg-background pl-10 pr-3 text-left text-foreground outline-none transition-colors ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-border focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15]"}`}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500 animate-in fade-in">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span className="font-semibold">{isArabic ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password"}</span>
          </div>
        )}

        <div className="flex justify-end">
          <Link to="/auth/reset" className="text-sm font-medium text-muted-foreground hover:text-[#FACC15] transition-colors">
            {isArabic ? "نسيت كلمة المرور؟" : "Forgot Password?"}
          </Link>
        </div>

        <Button type="submit" disabled={!email || !password} className="h-12 w-full bg-[#FACC15] text-lg font-bold text-black hover:bg-[#FACC15]/90 disabled:opacity-50">
          {isArabic ? "دخول" : "Login"}
        </Button>
      </form>

      {/* زر البصمة: يظهر فقط للموبايل (md:hidden) وفقط إذا سجل دخوله مسبقاً */}
      {hasLoggedInBefore && (
        <div className="md:hidden flex flex-col gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-border" />
            <span className="text-xs text-muted-foreground">{isArabic ? "أو" : "OR"}</span>
            <hr className="flex-1 border-border" />
          </div>
          <Button variant="outline" type="button" onClick={handleBiometricLogin} disabled={isBiometricLoading} className="h-12 w-full gap-2 border-border font-bold text-foreground hover:bg-muted">
            <Fingerprint className="size-5" />
            {isBiometricLoading ? (isArabic ? "جاري التحقق..." : "Verifying...") : (isArabic ? "تسجيل الدخول بالبصمة / Face ID" : "Login with Biometrics")}
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center gap-3 border-t border-border pt-5">
        <p className="text-sm text-muted-foreground">{isArabic ? "ليس لديك حساب؟" : "Don't have an account?"}</p>
        <Link to="/auth/register" className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-bold text-foreground transition-all hover:border-[#FACC15] hover:text-[#FACC15]">
          <UserPlus className="size-5" />
          <span>{isArabic ? "إنشاء حساب جديد" : "Create New Account"}</span>
        </Link>
      </div>
    </div>
  );
}