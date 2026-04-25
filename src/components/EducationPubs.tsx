import { SectionHeading } from "./SectionHeading";
import { GraduationCap, BookOpen, Newspaper } from "lucide-react";

const ossSeries = [
  { n: 1, title: "오픈소스SW 이해", desc: "개념, 역사, 라이선스 종류 및 적용 사례 소개" },
  { n: 2, title: "기업 인프라로 진화하는 OSS", desc: "기업 활용, 도입 전략, 인프라 전환 사례" },
  { n: 3, title: "오픈소스 DBMS 기술", desc: "PostgreSQL, MariaDB 등 도입 및 운영 전략" },
  { n: 4, title: "빅데이터 시대의 OSS 기술", desc: "Hadoop, Spark, Kafka 등 빅데이터 처리 OSS" },
  { n: 5, title: "OSS 차세대 트렌드", desc: "AI, 클라우드, IoT, SDN 등과 OSS의 연계 발전 방향" },
];

const articles = [
  { title: "진화하는 위치추적서비스", outlet: "전자신문" },
  { title: "스토킹범죄, 위치추적 전자장치가 대안이 될 수 있을까?", outlet: "한국일보" },
  { title: "PostgreSQL 전환 과제: 오픈소스 데이터베이스의 도입과 활용", outlet: "사내 기술 보고서 · 2016.12" },
  { title: "클라우드 플랫폼에서의 Ansible 및 AWX를 활용한 자동화 사례", outlet: "사내 세미나 · 2021.06" },
  { title: "VDI 로그 관리/검색 시스템 구축 경험 공유", outlet: "사내 워크숍 · 2013.12" },
];

export function EducationPubs() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="05 — Education & Publications"
        title="Education, Publications & Speaking"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Education */}
        <div className="card-elevated rounded-2xl p-6 lg:col-span-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary ring-1 ring-primary/20">
            <GraduationCap className="h-3.5 w-3.5" /> Education
          </div>
          <h3 className="font-display text-xl font-bold">한양대학교 대학원</h3>
          <p className="mt-1 text-muted-foreground">석사 · 컴퓨터공학</p>
          <div className="mt-6 border-t border-border pt-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Languages</h4>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>한국어</span><span className="font-mono text-primary">Native</span>
              </div>
              <div className="flex items-center justify-between">
                <span>English</span><span className="font-mono text-primary">Business</span>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Career Start</h4>
            <p className="mt-2 font-mono text-sm">Samsung SDS · 1996.01.11 ~ 현재</p>
          </div>
        </div>

        {/* OSS Series */}
        <div className="card-elevated rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary ring-1 ring-primary/20">
            <BookOpen className="h-3.5 w-3.5" /> Featured Publication Series
          </div>
          <h3 className="font-display text-xl font-bold">『IT 미래를 혁신할 오픈소스SW』 (총 5편)</h3>
          <p className="mt-1 text-sm text-muted-foreground">Samsung SDS 기술블로그 연재</p>
          <ol className="mt-5 space-y-3">
            {ossSeries.map((s) => (
              <li key={s.n} className="flex gap-4 rounded-lg p-3 transition hover:bg-surface-elevated">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/15 font-mono text-sm font-bold text-primary ring-1 ring-primary/30">
                  {s.n}
                </span>
                <div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-muted-foreground">{s.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Articles */}
      <div className="mt-6 card-elevated rounded-2xl p-6 sm:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-accent ring-1 ring-accent/30">
          <Newspaper className="h-3.5 w-3.5" /> Articles & Talks
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {articles.map((a) => (
            <li key={a.title} className="rounded-lg border border-border bg-surface/40 p-4 transition hover:border-primary/40">
              <div className="font-medium leading-snug">「{a.title}」</div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">{a.outlet}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
