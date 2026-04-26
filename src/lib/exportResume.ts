import { resumeData } from "@/data/resume";

export function buildMarkdown(): string {
  const r = resumeData;
  const lines: string[] = [];
  lines.push(`# ${r.name} (${r.nameEn})`);
  lines.push(`**${r.title}** · ${r.subtitle}`);
  lines.push(``);
  lines.push(`> ${r.headline}`);
  lines.push(``);
  lines.push(`📍 ${r.location}  |  📧 ${r.email}  |  📞 ${r.phone}  |  🔗 ${r.linkedin}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Professional Summary`);
  lines.push(r.summary);
  lines.push(``);
  lines.push(`**Value Proposition** — ${r.valueProposition}`);
  lines.push(``);
  lines.push(`## Core Competencies`);
  r.competencies.forEach((c) => lines.push(`- **${c.title}**: ${c.desc}`));
  lines.push(``);
  lines.push(`## Expertise Matrix`);
  lines.push(`| Area | Level | Years |`);
  lines.push(`|------|-------|-------|`);
  r.expertiseMatrix.forEach((e) => lines.push(`| ${e.area} | **${e.level}** | ${e.years} |`));
  lines.push(``);
  lines.push(`## Key Achievements (Quantified)`);
  lines.push(`> 아래 수치는 기존 경력을 기반으로 한 추정치입니다. 실제 수치로 교체해 주세요.`);
  lines.push(``);
  r.keyAchievements.forEach((k) =>
    lines.push(`- **${k.metric}** — ${k.label}  \n  ${k.detail}`),
  );
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
  lines.push(`## Career Reflections`);
  lines.push(`> 각 시기별로 **수행한 역할 / 주요 성과 / 가장 인상 깊었던 점 / 배운 점** 을 정리합니다. (괄호 안 (예)로 시작하는 문장은 placeholder이니 실제 경험으로 교체해 주세요.)`);
  lines.push(``);
  r.reflections.forEach((rf) => {
    lines.push(`### ${rf.era}  \`${rf.period}\``);
    lines.push(`- **수행한 역할**: ${rf.role}`);
    lines.push(`- **주요 성과**: ${rf.achievements}`);
    lines.push(`- **가장 인상 깊었던 점**: ${rf.mostMemorable}`);
    lines.push(`- **가장 많이 배운 점**: ${rf.lessons}`);
    lines.push(``);
  });
  lines.push(`## Technical Skills`);
  r.skillGroups.forEach((g) => lines.push(`- **${g.title}**: ${g.items.join(", ")}`));
  lines.push(``);
  lines.push(`## Certifications`);
  r.certifications.forEach((c) => lines.push(`- **${c.name}** — ${c.org} (${c.year})`));
  lines.push(``);
  lines.push(`## Leadership & People Management`);
  lines.push(`- **Team Size**: ${r.leadership.teamSize}`);
  lines.push(`- **Mentoring**: ${r.leadership.mentoring}`);
  lines.push(`- **Cross-Functional**: ${r.leadership.crossFunctional}`);
  r.leadership.bullets.forEach((b) => lines.push(`- ${b}`));
  lines.push(``);
  lines.push(`## Education`);
  r.educationDetail.forEach((e) =>
    lines.push(`- **${e.school}** — ${e.degree}${e.period ? ` (${e.period})` : ""}`),
  );
  lines.push(``);
  lines.push(`## Languages`);
  r.languages.forEach((l) => lines.push(`- **${l.name}** — ${l.level}`));
  lines.push(``);
  lines.push(`## Speaking & Community`);
  r.speaking.forEach((s) => lines.push(`- **[${s.year}]** ${s.title} — *${s.venue}*`));
  lines.push(``);
  lines.push(`## Publications`);
  lines.push(`### 『IT 미래를 혁신할 오픈소스SW』 시리즈 (Samsung SDS 인사이트 리포트)`);
  r.ossSeries.forEach((s) =>
    lines.push(
      s.url
        ? `${s.n}. **[${s.title}](${s.url})** — ${s.desc}`
        : `${s.n}. **${s.title}** — ${s.desc}`,
    ),
  );
  lines.push(``);
  lines.push(`### Articles & Talks`);
  r.articles.forEach((a) =>
    lines.push(
      a.url
        ? `- 「[${a.title}](${a.url})」 — ${a.outlet}`
        : `- 「${a.title}」 — ${a.outlet}`,
    ),
  );
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
