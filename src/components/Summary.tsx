import { SectionHeading } from "./SectionHeading";
import { Cloud, Cog, Users, Lightbulb, ShieldCheck, GitBranch } from "lucide-react";

const competencies = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    desc: "IaaS · PaaS · SaaS, OpenStack, VMware, Samsung Cloud Platform 기반의 엔드투엔드 설계 및 내재화.",
  },
  {
    icon: Cog,
    title: "DevOps & Automation",
    desc: "Ansible, AWX, Container, CI/CD, GitOps를 활용한 플랫폼 자동화와 운영 효율화.",
  },
  {
    icon: Users,
    title: "Technical Account Management",
    desc: "엔터프라이즈 고객 기술 파트너로서 RCA, SLA 관리, 솔루션 자문 수행.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Planning",
    desc: "기술 로드맵 개발, 솔루션 기획, IT 거버넌스 및 경영혁신 마스터플랜 수립.",
  },
  {
    icon: ShieldCheck,
    title: "Incident & RCA",
    desc: "성능 이슈 분석, 근본 원인 분석, 인시던트 관리 및 안정화 프로세스 구축.",
  },
  {
    icon: GitBranch,
    title: "Open Source Strategy",
    desc: "오픈소스 DBMS·플랫폼 도입 전략 수립, PostgreSQL 전환 등 다수의 OSS 내재화 리딩.",
  },
];

export function Summary() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="01 — About"
        title="Professional Summary"
        description="클라우드 플랫폼 설계·구축, 클라이언트 기술 지원, 인프라 운영, DevOps 자동화에 이르기까지 폭넓은 전문성을 보유한 25년+ 경력의 시니어 엔지니어."
      />

      <div className="card-elevated rounded-2xl p-8 sm:p-10">
        <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
          Cloud 및 IT 인프라 전반에 대한 <strong className="text-primary">25년 이상의 경험</strong>을
          보유한 전문가로, 클라우드 플랫폼 설계, 클라이언트 기술 지원, 인프라
          운영, DevOps 자동화에 이르기까지 폭넓은 전문성을 보유하고 있습니다.
          Samsung Cloud Platform(SCP) 내재화 및 상품 개발에서{" "}
          <strong className="text-primary">기술 리더 및 책임자</strong> 역할을
          성공적으로 수행하였으며, OpenStack·VMware 기반 대규모 전환 프로젝트와
          GenAI 콘솔, Nuri Compute 등 신규 SaaS 솔루션 기획·구현을 주도해
          왔습니다.
        </p>
        <p className="mt-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
          AWS 고객의 <strong className="text-primary">기술 전략 파트너</strong>로서,
          지속적인 성능 개선과 비즈니스 연계를 추진할 수 있는 역량을 갖추고
          있으며, 정보관리기술사·PMP 등 검증된 자격과 다수의 기고/발표 활동으로
          업계 발전에도 기여하고 있습니다.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Core Competencies
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c) => (
            <div
              key={c.title}
              className="card-elevated group rounded-xl p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition group-hover:bg-primary/20">
                <c.icon className="h-5 w-5" />
              </div>
              <h4 className="font-display text-lg font-semibold">{c.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
