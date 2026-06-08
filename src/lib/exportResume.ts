import { resumeData } from "@/data/resume";
import { getTemplate, matchTags, type ResumeTemplate, type ResumeSectionId } from "@/data/templates";

// 마스터 데이터 + 템플릿 → 필터링된 이력서 데이터 반환
export function getFilteredResume(templateId: string = "default") {
  const tpl = getTemplate(templateId);
  const r = resumeData;
  const filter = <T extends { aud?: string[] }>(arr: T[]) => arr.filter((x) => matchTags(x.aud, tpl.tags));
  return {
    tpl,
    data: {
      ...r,
      title: tpl.overrides?.title ?? r.title,
      subtitle: tpl.overrides?.subtitle ?? r.subtitle,
      headline: tpl.overrides?.headline ?? r.headline,
      valueProposition: tpl.overrides?.valueProposition ?? r.valueProposition,
      competencies: filter(r.competencies as any),
      expertiseMatrix: filter(r.expertiseMatrix as any),
      keyAchievements: filter(r.keyAchievements as any),
      earlierHighlights: filter(r.earlierHighlights as any),
      reflections: filter(r.reflections as any),
    },
  };
}

function has(sections: ResumeSectionId[], id: ResumeSectionId) {
  return sections.includes(id);
}

export function buildMarkdown(templateId: string = "default"): string {
  const { tpl, data: r } = getFilteredResume(templateId);
  const S = tpl.sections;
  const lines: string[] = [];

  lines.push(`# ${r.name} (${r.nameEn})`);
  lines.push(`**${r.title}** · ${r.subtitle}`);
  lines.push(``);
  lines.push(`> ${r.headline}`);
  lines.push(``);
  lines.push(`📍 ${r.location}  |  📧 ${r.email}  |  📞 ${r.phone}  |  🔗 ${r.linkedin}`);
  lines.push(``);
  lines.push(`*Template: **${tpl.name}***`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  if (has(S, "summary")) {
    lines.push(`## Professional Summary`);
    lines.push(r.summary);
    lines.push(``);
    lines.push(`**Value Proposition** — ${r.valueProposition}`);
    lines.push(``);
  }
  if (has(S, "competencies") && r.competencies.length) {
    lines.push(`## Core Competencies`);
    r.competencies.forEach((c) => lines.push(`- **${c.title}**: ${c.desc}`));
    lines.push(``);
  }
  if (has(S, "expertise") && r.expertiseMatrix.length) {
    lines.push(`## Expertise Matrix`);
    lines.push(`| Area | Level | Years |`);
    lines.push(`|------|-------|-------|`);
    r.expertiseMatrix.forEach((e) => lines.push(`| ${e.area} | **${e.level}** | ${e.years} |`));
    lines.push(``);
  }
  if (has(S, "achievements") && r.keyAchievements.length) {
    lines.push(`## Key Achievements (Quantified)`);
    lines.push(`> 아래 수치는 기존 경력을 기반으로 한 추정치입니다. 실제 수치로 교체해 주세요.`);
    lines.push(``);
    r.keyAchievements.forEach((k) => lines.push(`- **${k.metric}** — ${k.label}  \n  ${k.detail}`));
    lines.push(``);
  }
  if (has(S, "experience")) {
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
  }
  if (has(S, "projects")) {
    lines.push(`### Representative Projects (Cloud Era 2018+)`);
    r.recentProjects.forEach((p) =>
      lines.push(`- **[${p.year}] ${p.name}** — ${p.desc}  \n  Tags: ${p.tags.join(", ")}`),
    );
    lines.push(``);
  }
  if (has(S, "earlier") && r.earlierHighlights.length) {
    lines.push(`### Earlier Career (1996–2017)`);
    r.earlierHighlights.forEach((h) => lines.push(`- **[${h.period}] ${h.title}** — ${h.desc}`));
    lines.push(``);
  }
  if (has(S, "reflections") && r.reflections.length) {
    lines.push(`## Career Reflections`);
    lines.push(`> 각 시기별로 **수행한 역할 / 주요 성과 / 가장 인상 깊었던 점 / 배운 점** 을 정리합니다.`);
    lines.push(``);
    r.reflections.forEach((rf) => {
      lines.push(`### ${rf.era}  \`${rf.period}\``);
      lines.push(`- **수행한 역할**: ${rf.role}`);
      lines.push(`- **주요 성과**: ${rf.achievements}`);
      lines.push(`- **가장 인상 깊었던 점**: ${rf.mostMemorable}`);
      lines.push(`- **가장 많이 배운 점**: ${rf.lessons}`);
      lines.push(``);
    });
  }
  if (has(S, "skills")) {
    lines.push(`## Technical Skills`);
    r.skillGroups.forEach((g) => lines.push(`- **${g.title}**: ${g.items.join(", ")}`));
    lines.push(``);
  }
  if (has(S, "certifications")) {
    lines.push(`## Certifications`);
    r.certifications.forEach((c) => lines.push(`- **${c.name}** — ${c.org} (${c.year})`));
    lines.push(``);
  }
  if (has(S, "leadership")) {
    lines.push(`## Leadership & People Management`);
    lines.push(`- **Team Size**: ${r.leadership.teamSize}`);
    lines.push(`- **Mentoring**: ${r.leadership.mentoring}`);
    lines.push(`- **Cross-Functional**: ${r.leadership.crossFunctional}`);
    r.leadership.bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push(``);
  }
  if (has(S, "education")) {
    lines.push(`## Education`);
    r.educationDetail.forEach((e) =>
      lines.push(`- **${e.school}** — ${e.degree}${e.period ? ` (${e.period})` : ""}`),
    );
    lines.push(``);
  }
  if (has(S, "languages")) {
    lines.push(`## Languages`);
    r.languages.forEach((l) => lines.push(`- **${l.name}** — ${l.level}`));
    lines.push(``);
  }
  if (has(S, "speaking")) {
    lines.push(`## Speaking & Community`);
    r.speaking.forEach((s) => lines.push(`- **[${s.year}]** ${s.title} — *${s.venue}*`));
    lines.push(``);
  }
  if (has(S, "publications")) {
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
      lines.push(a.url ? `- 「[${a.title}](${a.url})」 — ${a.outlet}` : `- 「${a.title}」 — ${a.outlet}`),
    );
    lines.push(``);
  }
  if (has(S, "references")) {
    lines.push(`## References`);
    lines.push(r.references);
    lines.push(``);
  }
  return lines.join("\n");
}

export function buildPlainText(templateId: string = "default"): string {
  return buildMarkdown(templateId)
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

export function exportMarkdown(templateId: string = "default") {
  download(`resume-${templateId}.md`, buildMarkdown(templateId), "text/markdown");
}

export function exportPlainText(templateId: string = "default") {
  download(`resume-${templateId}.txt`, buildPlainText(templateId), "text/plain");
}
