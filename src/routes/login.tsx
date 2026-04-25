import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "로그인 — 김성덕 이력서" },
      { name: "description", content: "이력서 열람을 위한 로그인 페이지." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        setMessage({ type: "success", text: "가입 완료! 자동 로그인됩니다." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message ?? "로그인에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        {/* Left brand panel */}
        <div className="hidden flex-col justify-between rounded-3xl bg-sidebar-grad p-10 text-sidebar-foreground shadow-card lg:flex">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-lg font-bold text-primary-foreground">
              SK
            </div>
            <h1 className="mt-8 font-display text-4xl font-bold leading-tight">
              김성덕의 이력서에<br />오신 것을 환영합니다.
            </h1>
            <p className="mt-4 max-w-sm text-sm text-sidebar-foreground/70 leading-relaxed">
              25년+ ICT 경력의 클라우드 플랫폼 전문가. 이력서 열람을 위해 로그인해 주세요.
            </p>
          </div>
          <div className="space-y-3 text-sm text-sidebar-foreground/60">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Powered by Lovable Cloud · Supabase Auth</div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10">
          <h2 className="font-display text-2xl font-bold">
            {mode === "signin" ? "로그인" : "회원가입"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "등록된 이메일과 비밀번호로 접속하세요."
              : "이메일과 비밀번호로 새 계정을 만드세요."}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-brand focus:ring-brand"
                  placeholder="you@example.com"
                />
              </div>
            </label>
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Password</span>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-brand focus:ring-brand"
                  placeholder="••••••••"
                />
              </div>
            </label>

            {message && (
              <div className={`rounded-lg p-3 text-sm ${message.type === "error" ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-700"}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 font-semibold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "로그인" : "회원가입"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>아직 계정이 없으신가요?{" "}
                <button onClick={() => { setMode("signup"); setMessage(null); }} className="font-semibold text-brand hover:underline">회원가입</button>
              </>
            ) : (
              <>이미 계정이 있으신가요?{" "}
                <button onClick={() => { setMode("signin"); setMessage(null); }} className="font-semibold text-brand hover:underline">로그인</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
