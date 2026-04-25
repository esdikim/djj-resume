import { SectionHeading } from "./SectionHeading";
import { Briefcase } from "lucide-react";

interface Project {
  year: string;
  name: string;
  desc: string;
  tags: string[];
}

const recentProjects: Project[] = [
  {
    year: "2025",
    name: "Nuri Compute 상품 개발",
    desc: "SCP 내재화 기반 Python SaaS Compute 상품 기획 및 개발 리드 (12.1MM).",
    tags: ["SCP", "Python", "SaaS", "IaaS"],
  },
  {
    year: "2024",
    name: "NURI 내재화 상품 개발",
    desc: "SCP 내재화 상품 개발 — Python 기반 클라우드 서비스 백엔드 구축 (11.0MM).",
    tags: ["SCP", "Python", "Cloud Native"],
  },
  {
    year: "2024",
    name: "OpenStack 내재화 개발",
    desc: "OpenStack 기반 클라우드 시스템 설계 및 구현 — 내재화 1단계 (1.0MM).",
    tags: ["OpenStack", "IaaS", "Open Source"],
  },
  {
    year: "2023",
    name: "Generative AI SCP Console 개발",
    desc: "Samsung Cloud Platform 위에서 동작하는 GenAI 콘솔 SaaS 기획 및 개발 (6.1MM).",
    tags: ["GenAI", "SaaS", "Console"],
  },
  {
    year: "2023",
    name: "VMWare 기반 SCP 개발",
    desc: "서버 애플리케이션 프레임워크 활용, VM 기반 SCP 플랫폼 개발 (12.0MM).",
    tags: ["VMware", "VM", "Framework"],
  },
  {
    year: "2022",
    name: "CMP_VMWare 개발 (SCP 2.0)",
    desc: "클라우드 인프라 기술과 AWX를 활용한 CMP/VMware 통합 개발 (6.0MM).",
    tags: ["CMP", "VMware", "AWX", "Ansible"],
  },
  {
    year: "2021–22",
    name: "21년/22년 클라우드 플랫폼 개발",
    desc: "솔루션 개발자로서 IaaS/Container 기반 SCP 플랫폼 통합 개발 및 운영 (18.0MM).",
    tags: ["IaaS", "Container", "Ansible", "AWX"],
  },
  {
    year: "2020",
    name: "20년 클라우드 플랫폼 개발",
    desc: "PaaS·Container·Ansible 기반 클라우드 플랫폼 개발 (12.0MM).",
    tags: ["PaaS", "Container", "Ansible"],
  },
  {
    year: "2019",
    name: "CMP 안정화 및 개선",
    desc: "Ansible/AWX 기반 IaaS·PaaS 클라우드 관리 플랫폼 안정화 (11.0MM).",
    tags: ["CMP", "Ansible", "AWX"],
  },
  {
    year: "2018",
    name: "차세대 클라우드 플랫폼 구축 [SS지원]",
    desc: "솔루션 기획자로서 차세대 클라우드 플랫폼 아키텍처 설계 및 자동화 도입 (8.1MM).",
    tags: ["Cloud Platform", "Ansible", "AWX"],
  },
];

const earlierHighlights = [
  { period: "2017", title: "B2B 클라우드향 자동화 (Smart Workflow R&D)", desc: "공공/기업 대상 워크플로우 자동화 솔루션 연구개발." },
  { period: "2015–2016", title: "PostgreSQL 적용/전환 과제", desc: "오픈소스 DBMS 도입·전환 프로젝트 리드 (18.0MM)." },
  { period: "2014", title: "DB 동기화 고도화 / CDN 분배시스템 개발 TF", desc: "Oracle·MySQL·PostgreSQL 동기화, GSLB·CDN 분배 시스템 설계." },
  { period: "2013", title: "VDI 로그 관리/검색 시스템 구축 · 빅데이터 실습 TF", desc: "Java/RHEL/Apache/Tomcat 기반 로그 시스템 및 빅데이터 전문가 양성." },
  { period: "2010–2012", title: "기술 로드맵 / 경영혁신 마스터플랜", desc: "인프라본부 기술 로드맵, 본부 솔루션 경쟁력 강화 혁신과제 (BPM, 전략경영)." },
  { period: "2009", title: "RFID/USN 위치추적 솔루션 개발", desc: "PRO*C, Oracle, Windows Server 기반 SmartCity 위치추적 솔루션 개발." },
  { period: "1996–2003", title: "UNITEL · AT&T Billing System 개발/운영", desc: "통신사 빌링/청구/수납 시스템 개발 및 운영, 청구 자동화 시스템 구축." },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="02 — Experience"
        title="Professional Experience"
        description="Samsung SDS에서 1996년 입사 이후, 빌링 시스템·연구개발·기술기획을 거쳐 현재는 Samsung Cloud Platform(SCP)의 핵심 상품 개발을 리딩하고 있습니다."
      />

      {/* Current role card */}
      <div className="card-elevated rounded-2xl p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary ring-1 ring-primary/30">
              <Briefcase className="h-3.5 w-3.5" /> Current Role
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
              Samsung SDS — Principal Cloud Engineer
            </h3>
            <p className="mt-1 text-muted-foreground">
              Cloud Technical Lead · Technical Account Manager 역할 수행
            </p>
          </div>
          <div className="text-right font-mono text-sm text-muted-foreground">
            <div>2018.01 — Present</div>
            <div>서울, 대한민국</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Key Responsibilities</h4>
            <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85">
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> 엔터프라이즈 클라이언트를 위한 클라우드 서비스 로드맵 설계 및 기술 지원</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> SCP 기반 플랫폼 상품 기획 및 기능 내재화 (Nuri Compute, GenAI Console)</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> 대규모 IaaS/PaaS 클라우드 인프라 아키텍처 설계 및 PoC 수행</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> 오픈소스(OpenStack, VMware) 기반 클라우드 내재화 프로젝트 리딩</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> 성능 이슈 분석·근본 원인 분석(RCA) 및 인시던트 관리</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> 엔지니어 팀과 고객 간 기술 중재 및 Issue Resolution 주도</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Impact & Outcomes</h4>
            <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85">
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" /> SCP의 핵심 IaaS/CMP/PaaS 상품 라인업을 다년간 리드</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" /> Ansible/AWX 기반 운영 자동화로 배포·구성 변경 효율 향상</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" /> OpenStack/VMware 듀얼 스택 내재화로 벤더 종속성 완화</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" /> GenAI Console 등 AI SaaS 콘솔 기획으로 차세대 서비스 라인 확장</li>
              <li className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" /> 사내 OSS 시리즈 기고 5편을 통해 전사 기술 문화 확산</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project timeline */}
      <h3 className="mt-16 mb-8 font-display text-xl font-semibold">
        Representative Projects <span className="text-muted-foreground">— Cloud Era (2018+)</span>
      </h3>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent sm:left-[11px]" aria-hidden />
        <div className="space-y-5">
          {recentProjects.map((p) => (
            <div key={p.name} className="relative pl-8 sm:pl-12">
              <span className="absolute left-0 top-3 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background sm:h-5 sm:w-5" />
              <div className="card-elevated rounded-xl p-5 transition hover:border-primary/50">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-lg font-semibold">{p.name}</h4>
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">{p.year}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80 ring-1 ring-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earlier career */}
      <h3 className="mt-16 mb-8 font-display text-xl font-semibold">
        Earlier Career <span className="text-muted-foreground">— R&D · Strategy · Billing (1996–2017)</span>
      </h3>
      <div className="card-elevated rounded-2xl divide-y divide-border overflow-hidden">
        {earlierHighlights.map((h) => (
          <div key={h.title} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-[160px_1fr] sm:p-6">
            <div className="font-mono text-sm uppercase tracking-widest text-primary">{h.period}</div>
            <div>
              <div className="font-semibold">{h.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{h.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
