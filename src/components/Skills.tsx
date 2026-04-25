import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    title: "Cloud Platforms",
    items: ["Samsung Cloud Platform (SCP)", "OpenStack", "VMware vSphere", "AWS (기초)", "CMP", "Hybrid Cloud"],
  },
  {
    title: "DevOps & Automation",
    items: ["Ansible", "AWX", "Container (Docker)", "Kubernetes", "GitOps", "CI/CD", "SVN / Git"],
  },
  {
    title: "Infrastructure",
    items: ["Linux (RHEL)", "Windows Server", "NAS", "SAN", "Apache", "Tomcat"],
  },
  {
    title: "Databases",
    items: ["Oracle Database", "PostgreSQL", "MySQL"],
  },
  {
    title: "Languages",
    items: ["Python", "Java", "Shell Script", "PHP", "PRO*C", "Ruby"],
  },
  {
    title: "Strategy & PM",
    items: ["Agile", "MS Project", "BPM", "전략경영", "IT 전략/거버넌스", "기술 로드맵"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="03 — Skills"
        title="Technical Skills"
        description="총 42건의 보유 기술 및 직무 역량 중 핵심 기술 스택."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="card-elevated rounded-xl p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">
              <span className="text-gradient">{g.title}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="rounded-md border border-border bg-surface/60 px-2.5 py-1 font-mono text-xs text-foreground/85 transition hover:border-primary/50 hover:text-primary"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
