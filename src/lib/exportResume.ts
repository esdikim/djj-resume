import { resumeData } from "@/data/resume";

export function buildMarkdown(): string {
  const r = resumeData;
  const lines: string[] = [];
  lines.push(`# ${r.name} (${r.nameEn})`);
  lines.push(`**${r.title}** · ${r.subtitle}`);
  lines.push(``);
  lines.push(`📍 ${r.location}  |  📧 ${r.email}  |  📞 ${r.phone}  |  🔗 ${r.linkedin}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Professional Summary`);
  lines.push(r.summary);
  lines.push(``);
  lines.push(`## Core Competencies`);
  r.competencies.forEach((c) => lines.push(`- **${c.title}**: ${c.desc}`));
  lines.push(``);
  lines.push(`## Professional Experience`);
  lines.push(`### ${r.currentRole.company} — ${r.currentRole.role}`);
  lines.push(`*${r.currentRole.sub}*  `);
  lines.push(`${r.currentRole.period} · ${r.currentRole.location}`);
  lines.push(``);
  lines.push(`**Key Responsibilities**`);
  r.currentRole.responsibilities.forEach((x) => lines.push(`- ${x}`));
  lines.push(``);
  lines.push(`**Impact & Outcomes**`);
  r.currentRole.impact.forEach((x) => lines.push(`- ${x}`));
  lines.push(``);
  lines.push(`### Representative Projects (Cloud Era 2018+)`);
  r.recentProjects.forEach((p) =>
    lines.push(`- **[${p.year}] ${p.name}** — ${p.desc}  \n  Tags: ${p.tags.join(", ")}`),
  );
  lines.push(``);
  lines.push(`### Earlier Career (1996–2017)`);
  r.earlierHighlights.forEach((h) => lines.push(`- **[${h.period}] ${h.title}** — ${h.desc}`));
  lines.push(``);
  lines.push(`## Technical Skills`);
  r.skillGroups.forEach((g) => lines.push(`- **${g.title}**: ${g.items.join(", ")}`));
  lines.push(``);
  lines.push(`## Certifications`);
  r.certifications.forEach((c) => lines.push(`- **${c.name}** — ${c.org} (${c.year})`));
  lines.push(``);
  lines.push(`## Education`);
  lines.push(`- **${r.education.school}** — ${r.education.degree}`);
  lines.push(``);
  lines.push(`## Publications`);
  lines.push(`### 『IT 미래를 혁신할 오픈소스SW』 시리즈 (Samsung SDS 기술블로그)`);
  r.ossSeries.forEach((s) => lines.push(`${s.n}. **${s.title}** — ${s.desc}`));
  lines.push(``);
  lines.push(`### Articles & Talks`);
  r.articles.forEach((a) => lines.push(`- 「${a.title}」 — ${a.outlet}`));
  lines.push(``);
  return lines.join("\n");
}

export function buildPlainText(): string {
  // 마크다운 기호를 제거한 깔끔한 텍스트
  return buildMarkdown()
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^- /gm, "• ")
    .replace(/\s\s\n/g, "\n");
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportMarkdown() {
  download("resume-sungdeok-kim.md", buildMarkdown(), "text/markdown");
}

export function exportPlainText() {
  download("resume-sungdeok-kim.txt", buildPlainText(), "text/plain");
}
