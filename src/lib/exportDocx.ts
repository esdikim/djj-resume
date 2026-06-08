import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  ExternalHyperlink,
} from "docx";
import { resumeData } from "@/data/resume";
import { getFilteredResume } from "./exportResume";

const FONT = "Malgun Gothic";

function p(text: string, opts: { bold?: boolean; size?: number; spacingAfter?: number } = {}) {
  return new Paragraph({
    spacing: { after: opts.spacingAfter ?? 80 },
    children: [new TextRun({ text, bold: opts.bold, size: opts.size ?? 20, font: FONT })],
  });
}

function h(text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel], size: number) {
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size, font: FONT, color: "1F2937" })],
  });
}

function bullet(text: string) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 20, font: FONT })],
  });
}

function bulletRich(children: (TextRun | ExternalHyperlink)[]) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children,
  });
}

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function tcell(text: string, opts: { bold?: boolean; shade?: string; width: number } = { width: 3120 }) {
  return new TableCell({
    borders: cellBorders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: opts.shade ? { fill: opts.shade, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: opts.bold, size: 20, font: FONT })] })],
  });
}

export async function exportDocx(templateId: string = "default") {
  const { tpl, data: r } = getFilteredResume(templateId);
  const S = new Set(tpl.sections);
  const children: (Paragraph | Table)[] = [];

  // Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 80 },
      children: [new TextRun({ text: `${r.name} (${r.nameEn})`, bold: true, size: 40, font: FONT })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: `${r.title} · ${r.subtitle}`, italics: true, size: 22, font: FONT, color: "4B5563" })],
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [new TextRun({ text: r.headline, bold: true, size: 22, font: FONT, color: "1D4ED8" })],
    }),
    p(`📍 ${r.location}  |  📧 ${r.email}  |  📞 ${r.phone}  |  🔗 ${r.linkedin}`, { size: 18, spacingAfter: 200 }),
  );

  // Summary
  if (S.has("summary")) {
    children.push(h("Professional Summary", HeadingLevel.HEADING_1, 28));
    children.push(p(r.summary));
    children.push(p(`Value Proposition — ${r.valueProposition}`, { bold: true, spacingAfter: 200 }));
  }

  // Core Competencies
  if (S.has("competencies") && r.competencies.length) {
    children.push(h("Core Competencies", HeadingLevel.HEADING_1, 28));
    r.competencies.forEach((c) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${c.title}: `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: c.desc, size: 20, font: FONT }),
          ],
        }),
      ),
    );
  }

  // Expertise Matrix
  if (S.has("expertise") && r.expertiseMatrix.length) {
    children.push(h("Expertise Matrix", HeadingLevel.HEADING_1, 28));
    const matrixRows = [
      new TableRow({
        tableHeader: true,
        children: [
          tcell("Area", { bold: true, shade: "E5E7EB", width: 4680 }),
          tcell("Level", { bold: true, shade: "E5E7EB", width: 2340 }),
          tcell("Years", { bold: true, shade: "E5E7EB", width: 2340 }),
        ],
      }),
      ...r.expertiseMatrix.map(
        (e) =>
          new TableRow({
            children: [tcell(e.area, { width: 4680 }), tcell(e.level, { bold: true, width: 2340 }), tcell(e.years, { width: 2340 })],
          }),
      ),
    ];
    children.push(
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [4680, 2340, 2340],
        rows: matrixRows,
      }),
    );
  }

  // Key Achievements
  if (S.has("achievements") && r.keyAchievements.length) {
    children.push(h("Key Achievements (Quantified)", HeadingLevel.HEADING_1, 28));
    r.keyAchievements.forEach((k) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${k.metric} — `, bold: true, color: "1D4ED8", size: 22, font: FONT }),
            new TextRun({ text: k.label, bold: true, size: 20, font: FONT }),
          ],
        }),
        new Paragraph({
          spacing: { after: 100 },
          indent: { left: 720 },
          children: [new TextRun({ text: k.detail, size: 18, font: FONT, color: "4B5563" })],
        }),
      );
    });
  }

  // Experience
  if (S.has("experience")) {
    children.push(h("Professional Experience", HeadingLevel.HEADING_1, 28));
    children.push(h(`${r.currentRole.company} — ${r.currentRole.role}`, HeadingLevel.HEADING_2, 24));
    children.push(p(`${r.currentRole.sub}`, { bold: false }));
    children.push(p(`${r.currentRole.period} · ${r.currentRole.location}`, { spacingAfter: 120 }));
    children.push(p("Key Responsibilities", { bold: true }));
    r.currentRole.responsibilities.forEach((x) => children.push(bullet(x)));
    children.push(p("Impact & Outcomes", { bold: true }));
    r.currentRole.impact.forEach((x) => children.push(bullet(x)));
  }

  if (S.has("projects")) {
    children.push(h("Representative Projects (Cloud Era 2018+)", HeadingLevel.HEADING_2, 24));
    r.recentProjects.forEach((proj) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `[${proj.year}] ${proj.name} — `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: proj.desc, size: 20, font: FONT }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          indent: { left: 720 },
          children: [new TextRun({ text: `Tags: ${proj.tags.join(", ")}`, size: 18, italics: true, font: FONT, color: "6B7280" })],
        }),
      );
    });
  }

  if (S.has("earlier") && r.earlierHighlights.length) {
    children.push(h("Earlier Career (1996–2017)", HeadingLevel.HEADING_2, 24));
    r.earlierHighlights.forEach((hl) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `[${hl.period}] ${hl.title} — `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: hl.desc, size: 20, font: FONT }),
          ],
        }),
      ),
    );
  }

  // Reflections
  if (S.has("reflections") && r.reflections.length) {
    children.push(h("Career Reflections", HeadingLevel.HEADING_1, 28));
    r.reflections.forEach((rf) => {
      children.push(h(`${rf.era}  (${rf.period})`, HeadingLevel.HEADING_2, 22));
      [
        ["수행한 역할", rf.role],
        ["주요 성과", rf.achievements],
        ["가장 인상 깊었던 점", rf.mostMemorable],
        ["가장 많이 배운 점", rf.lessons],
      ].forEach(([k, v]) =>
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 60 },
            children: [
              new TextRun({ text: `${k}: `, bold: true, size: 20, font: FONT }),
              new TextRun({ text: v, size: 20, font: FONT }),
            ],
          }),
        ),
      );
    });
  }

  // Skills
  if (S.has("skills")) {
    children.push(h("Technical Skills", HeadingLevel.HEADING_1, 28));
    r.skillGroups.forEach((g) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${g.title}: `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: g.items.join(", "), size: 20, font: FONT }),
          ],
        }),
      ),
    );
  }

  // Certifications
  if (S.has("certifications")) {
    children.push(h("Certifications", HeadingLevel.HEADING_1, 28));
    r.certifications.forEach((c) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${c.name} — `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: `${c.org} (${c.year})`, size: 20, font: FONT }),
          ],
        }),
      ),
    );
  }

  // Leadership
  if (S.has("leadership")) {
    children.push(h("Leadership & People Management", HeadingLevel.HEADING_1, 28));
    [
      ["Team Size", r.leadership.teamSize],
      ["Mentoring", r.leadership.mentoring],
      ["Cross-Functional", r.leadership.crossFunctional],
    ].forEach(([k, v]) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${k}: `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: v, size: 20, font: FONT }),
          ],
        }),
      ),
    );
    r.leadership.bullets.forEach((b) => children.push(bullet(b)));
  }

  // Education
  if (S.has("education")) {
    children.push(h("Education", HeadingLevel.HEADING_1, 28));
    r.educationDetail.forEach((e) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${e.school} — `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: `${e.degree}${e.period ? ` (${e.period})` : ""}`, size: 20, font: FONT }),
          ],
        }),
      ),
    );
  }

  // Languages
  if (S.has("languages")) {
    children.push(h("Languages", HeadingLevel.HEADING_1, 28));
    r.languages.forEach((l) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${l.name}: `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: l.level, size: 20, font: FONT }),
          ],
        }),
      ),
    );
  }

  // Speaking
  if (S.has("speaking")) {
    children.push(h("Speaking & Community", HeadingLevel.HEADING_1, 28));
    r.speaking.forEach((s) =>
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `[${s.year}] `, bold: true, size: 20, font: FONT }),
            new TextRun({ text: `${s.title} — `, size: 20, font: FONT }),
            new TextRun({ text: s.venue, italics: true, size: 20, font: FONT, color: "6B7280" }),
          ],
        }),
      ),
    );
  }

  // Publications
  if (S.has("publications")) {
    children.push(h("Publications", HeadingLevel.HEADING_1, 28));
    children.push(h("『IT 미래를 혁신할 오픈소스SW』 시리즈", HeadingLevel.HEADING_2, 22));
    r.ossSeries.forEach((s) => {
      const titleRun = new TextRun({ text: `${s.n}. ${s.title}`, bold: true, size: 20, font: FONT, color: s.url ? "1D4ED8" : "111827", underline: s.url ? {} : undefined });
      const descRun = new TextRun({ text: ` — ${s.desc}`, size: 20, font: FONT });
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: s.url
            ? [new ExternalHyperlink({ link: s.url, children: [titleRun] }), descRun]
            : [titleRun, descRun],
        }),
      );
    });

    children.push(h("Articles & Talks", HeadingLevel.HEADING_2, 22));
    r.articles.forEach((a) => {
      const titleRun = new TextRun({ text: `「${a.title}」`, bold: true, size: 20, font: FONT, color: a.url ? "1D4ED8" : "111827", underline: a.url ? {} : undefined });
      const outletRun = new TextRun({ text: ` — ${a.outlet}`, size: 20, font: FONT });
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: a.url
            ? [new ExternalHyperlink({ link: a.url, children: [titleRun] }), outletRun]
            : [titleRun, outletRun],
        }),
      );
    });
  }

  // References
  if (S.has("references")) {
    children.push(h("References", HeadingLevel.HEADING_1, 28));
    children.push(p(r.references));
  }


  const doc = new Document({
    creator: r.name,
    title: `${r.name} Resume`,
    styles: {
      default: { document: { run: { font: FONT, size: 20 } } },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resume-${templateId}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
