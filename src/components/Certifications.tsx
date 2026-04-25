import { SectionHeading } from "./SectionHeading";
import { Award } from "lucide-react";

const certs = [
  { name: "정보관리기술사", org: "HRD Korea", year: "2024 (재취득) / 2004", featured: true },
  { name: "PMP — Project Management Professional", org: "PMI", year: "2004", featured: true },
  { name: "Samsung Cloud Platform Certified Cloud Engineer – Associate", org: "Samsung SDS", year: "2022", featured: true },
  { name: "SW검정 (Professional)", org: "Samsung", year: "2017" },
  { name: "감리원", org: "한국정보통신공사협회", year: "2008" },
  { name: "CCAH", org: "Microsoft", year: "2013" },
  { name: "GB (Green Belt)", org: "한국커리어개발원", year: "2005" },
  { name: "SCJP — Sun Certified Java Programmer", org: "SUN Microsystems", year: "1999" },
  { name: "정보처리 산업기사", org: "HRD Korea", year: "1999" },
  { name: "워드프로세서 2급", org: "대한상공회의소", year: "1999" },
];

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="04 — Credentials"
        title="Certifications"
        description="총 12건의 자격을 보유하고 있으며, 검증된 기술 전문성과 프로젝트 관리 역량을 갖추고 있습니다."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <div
            key={c.name}
            className={`card-elevated rounded-xl p-5 transition hover:-translate-y-1 ${
              c.featured ? "ring-1 ring-primary/40" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.featured ? "bg-primary/15 text-primary" : "bg-secondary/60 text-muted-foreground"}`}>
                <Award className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold leading-snug">{c.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {c.org} · <span className="font-mono">{c.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
