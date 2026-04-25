import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="card-elevated relative overflow-hidden rounded-3xl p-10 sm:p-16">
        <div className="absolute inset-0 bg-hero-glow opacity-70" aria-hidden />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
            06 — Contact
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            Let's <span className="text-gradient">build the cloud</span> together.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            클라우드 전략, 기술 어카운트 매니지먼트, 또는 엔터프라이즈 플랫폼
            아키텍처 관련 협업 제안은 아래 연락처로 문의 부탁드립니다.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", value: "[이메일 주소]" },
              { icon: Phone, label: "Phone", value: "[전화번호]" },
              { icon: MapPin, label: "Location", value: "서울, 대한민국" },
              { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sungdeok-kim" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-4 backdrop-blur transition hover:border-primary/50">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="truncate font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} 김성덕 (Sung-Deok Kim). All rights reserved.</div>
        <div className="font-mono">Crafted with care · v1.0</div>
      </footer>
    </section>
  );
}
