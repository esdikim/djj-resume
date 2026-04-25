import { Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for Technical Account Manager Roles
        </div>

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          김성덕
          <span className="block text-2xl font-normal text-muted-foreground sm:text-3xl mt-2">
            Sung-Deok Kim
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-xl font-medium sm:text-2xl">
          <span className="text-gradient">Principal Cloud Specialist</span>
          <span className="text-muted-foreground"> · Technical Account Manager</span>
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          25년+ ICT 경력의 클라우드 플랫폼 전문가. Samsung Cloud Platform(SCP)
          내재화·상품 개발을 리딩하며 OpenStack, VMware, Kubernetes, DevOps
          자동화 전반을 아우르는 엔드투엔드 기술 책임을 수행하고 있습니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-ring"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-surface-elevated"
          >
            <Download className="h-4 w-4" /> View Experience
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 서울, 대한민국</span>
          <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> [이메일 주소]</span>
          <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> [전화번호]</span>
          <span className="inline-flex items-center gap-2"><Linkedin className="h-4 w-4 text-primary" /> LinkedIn</span>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "25+", label: "Years in ICT" },
            { value: "40+", label: "Major Projects" },
            { value: "12", label: "Certifications" },
            { value: "8+", label: "Years on Cloud" },
          ].map((s) => (
            <div key={s.label} className="card-elevated rounded-xl p-5">
              <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
