import { resumeData } from "@/data/resume";
import { Mail, Phone, MapPin, Linkedin, Briefcase, Award, GraduationCap, Wrench, BookOpen, Cloud, Cog, Users, Lightbulb, ShieldCheck, GitBranch } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const compIcons = [Cloud, Cog, Users, Lightbulb, ShieldCheck, GitBranch];

export function ResumeContent() {
  const r = resumeData;
  return (
    <div className="space-y-24">
      {/* About / Hero */}
      <section id="about" className="relative scroll-mt-8">
        <div className="absolute inset-x-0 -top-8 h-64 bg-dot opacity-40" aria-hidden />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-mono uppercase tracking-widest text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            Available for TAM Roles
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            {r.name}
            <span className="ml-3 align-middle text-2xl font-normal text-muted-foreground">
              {r.nameEn}
            </span>
          </h1>
          <p className="mt-4 text-xl font-medium text-brand sm:text-2xl">
            {r.title} <span className="text-muted-foreground font-normal">· {r.subtitle}</span>
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            {r.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> {r.location}</span>
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /> {r.email}</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /> {r.phone}</span>
            <span className="inline-flex items-center gap-2"><Linkedin className="h-4 w-4 text-brand" /> {r.linkedin}</span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {r.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display text-3xl font-bold text-brand">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <h3 className="mt-14 mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Core Competencies
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {r.competencies.map((c, i) => {
              const Icon = compIcons[i % compIcons.length];
              return (
                <div key={c.title} className="group rounded-xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold">{c.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="scroll-mt-8">
        <SectionHeading eyebrow="02 — Experience" title="Professional Experience" description="Samsung SDS에서 1996년 입사 이후, 빌링·R&D·기술기획을 거쳐 현재는 Samsung Cloud Platform(SCP)의 핵심 상품 개발을 리딩하고 있습니다." />

        <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-brand">
                <Briefcase className="h-3 w-3" /> Current Role
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">
                {r.currentRole.company} — {r.currentRole.role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.currentRole.sub}</p>
            </div>
            <div className="text-right font-mono text-sm text-muted-foreground">
              <div>{r.currentRole.period}</div>
              <div>{r.currentRole.location}</div>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">Key Responsibilities</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
                {r.currentRole.responsibilities.map((x) => (
                  <li key={x} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" /> {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">Impact & Outcomes</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
                {r.currentRole.impact.map((x) => (
                  <li key={x} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" /> {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h3 className="mt-12 mb-6 font-display text-lg font-semibold">
          Representative Projects <span className="text-muted-foreground font-normal">— Cloud Era (2018+)</span>
        </h3>
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/60 via-brand/30 to-transparent" aria-hidden />
          <div className="space-y-4">
            {r.recentProjects.map((p) => (
              <div key={p.name} className="relative pl-8">
                <span className="absolute left-0 top-4 h-3.5 w-3.5 rounded-full border-2 border-brand bg-background" />
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft transition hover:border-brand/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-base font-semibold">{p.name}</h4>
                    <span className="font-mono text-xs uppercase tracking-widest text-brand">{p.year}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mt-12 mb-6 font-display text-lg font-semibold">
          Earlier Career <span className="text-muted-foreground font-normal">— R&D · Strategy · Billing (1996–2017)</span>
        </h3>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft divide-y divide-border">
          {r.earlierHighlights.map((h) => (
            <div key={h.title} className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-[160px_1fr]">
              <div className="font-mono text-xs uppercase tracking-widest text-brand">{h.period}</div>
              <div>
                <div className="font-semibold">{h.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-8">
        <SectionHeading eyebrow="03 — Skills" title="Technical Skills" description="총 42건의 보유 기술 및 직무 역량 중 핵심 기술 스택." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.skillGroups.map((g) => (
            <div key={g.title} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h4 className="mb-4 font-display text-base font-semibold text-brand inline-flex items-center gap-2">
                <Wrench className="h-4 w-4" /> {g.title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground/80 transition hover:border-brand hover:text-brand">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="scroll-mt-8">
        <SectionHeading eyebrow="04 — Credentials" title="Certifications" description="총 12건의 자격을 보유. 검증된 기술 전문성과 프로젝트 관리 역량을 갖추고 있습니다." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {r.certifications.map((c) => (
            <div key={c.name} className={`rounded-xl border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 ${c.featured ? "border-brand/40" : "border-border"}`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.featured ? "bg-brand text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  <Award className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold leading-snug text-sm">{c.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {c.org} · <span className="font-mono">{c.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="scroll-mt-8">
        <SectionHeading eyebrow="05 — Education" title="Education & Languages" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2 rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="inline-flex items-center gap-2 rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-brand">
              <GraduationCap className="h-3 w-3" /> Graduate School
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold">{r.education.school}</h3>
            <p className="mt-1 text-muted-foreground">{r.education.degree}</p>
            <div className="mt-5 border-t border-border pt-4 text-sm font-mono text-muted-foreground">
              Career Start · Samsung SDS · 1996.01.11 ~ Present
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Languages</h4>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-sm font-medium">한국어</span><span className="font-mono text-xs text-brand">Native</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">English</span><span className="font-mono text-xs text-brand">Business</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="scroll-mt-8">
        <SectionHeading eyebrow="06 — Publications" title="Publications & Speaking" />
        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-brand">
            <BookOpen className="h-3 w-3" /> Featured Series
          </div>
          <h3 className="mt-3 font-display text-xl font-bold">『IT 미래를 혁신할 오픈소스SW』 (총 5편)</h3>
          <p className="mt-1 text-sm text-muted-foreground">Samsung SDS 기술블로그 연재</p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {r.ossSeries.map((s) => (
              <li key={s.n} className="flex gap-3 rounded-lg border border-border bg-background/50 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-soft font-mono text-xs font-bold text-brand">
                  {s.n}
                </span>
                <div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-7 shadow-soft">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-brand">Articles & Talks</h4>
          <ul className="grid gap-3 sm:grid-cols-2">
            {r.articles.map((a) => (
              <li key={a.title} className="rounded-lg border border-border bg-background/50 p-3">
                <div className="text-sm font-medium leading-snug">「{a.title}」</div>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground">{a.outlet}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-8 pb-12">
        <SectionHeading eyebrow="07 — Contact" title="Let's connect" description="클라우드 전략, TAM 포지션, 또는 엔터프라이즈 플랫폼 아키텍처 협업 제안 환영합니다." />
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", value: r.email },
              { icon: Phone, label: "Phone", value: r.phone },
              { icon: MapPin, label: "Location", value: r.location },
              { icon: Linkedin, label: "LinkedIn", value: r.linkedin },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition hover:border-brand/50">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="truncate font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {r.name} ({r.nameEn}). All rights reserved.
        </footer>
      </section>
    </div>
  );
}
