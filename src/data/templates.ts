// 이력서 템플릿 정의 (업종별 / 변형별)
// - 마스터 데이터(src/data/resume.ts)는 그대로 유지하고,
//   각 템플릿은 (1) 태그 필터, (2) 표시할 섹션, (3) 헤드라인/타이틀 오버라이드만 정의한다.
// - 항목에 tags가 없으면 모든 템플릿에서 공통으로 노출된다.

export type TemplateTag =
  | "cloud-tam"
  | "solution-architect"
  | "pm-strategy"
  | "rnd";

export type ResumeSectionId =
  | "summary"
  | "competencies"
  | "expertise"
  | "achievements"
  | "experience"
  | "projects"
  | "earlier"
  | "reflections"
  | "skills"
  | "certifications"
  | "leadership"
  | "education"
  | "languages"
  | "speaking"
  | "publications"
  | "references";

export const ALL_SECTIONS: ResumeSectionId[] = [
  "summary",
  "competencies",
  "expertise",
  "achievements",
  "experience",
  "projects",
  "earlier",
  "reflections",
  "skills",
  "certifications",
  "leadership",
  "education",
  "languages",
  "speaking",
  "publications",
  "references",
];

export type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  tags: TemplateTag[]; // 빈 배열이면 필터링하지 않고 전체 노출
  sections: ResumeSectionId[];
  overrides?: {
    title?: string;
    subtitle?: string;
    headline?: string;
    valueProposition?: string;
  };
};

export const TEMPLATES: ResumeTemplate[] = [
  {
    id: "default",
    name: "기본 (Full Master)",
    description: "모든 섹션·모든 경력을 포함한 마스터 이력서",
    tags: [],
    sections: ALL_SECTIONS,
  },
  {
    id: "cloud-tam",
    name: "Cloud TAM",
    description:
      "Technical Account Manager 포지션용 — 클라우드 운영, RCA, 고객 기술 자문 중심",
    tags: ["cloud-tam"],
    sections: [
      "summary",
      "competencies",
      "expertise",
      "achievements",
      "experience",
      "projects",
      "skills",
      "certifications",
      "leadership",
      "languages",
      "speaking",
      "publications",
      "education",
      "references",
    ],
    overrides: {
      title: "Principal Cloud Specialist",
      subtitle: "Technical Account Manager Candidate",
      headline:
        "엔터프라이즈 클라우드 운영·RCA·고객 기술 자문 8년+ | SCP·OpenStack·VMware 내재화 리드",
    },
  },
  {
    id: "solution-architect",
    name: "Solution Architect",
    description: "솔루션 아키텍처/플랫폼 설계 포지션용 — 아키텍처·기술 깊이 강조",
    tags: ["solution-architect"],
    sections: [
      "summary",
      "competencies",
      "expertise",
      "achievements",
      "experience",
      "projects",
      "earlier",
      "skills",
      "certifications",
      "education",
      "publications",
      "references",
    ],
    overrides: {
      title: "Principal Solution Architect",
      subtitle: "Cloud · Platform · Open Source",
      headline:
        "30년+ 플랫폼 엔지니어링 | IaaS/PaaS/SaaS 엔드투엔드 설계 | OSS·Data·GenAI Architect",
    },
  },
  {
    id: "pm-strategy",
    name: "PM · 전략 기획",
    description: "PM/기술 기획/전략 포지션용 — 로드맵·리더십·정량 성과 중심",
    tags: ["pm-strategy"],
    sections: [
      "summary",
      "competencies",
      "achievements",
      "experience",
      "earlier",
      "reflections",
      "leadership",
      "certifications",
      "education",
      "languages",
      "speaking",
      "references",
    ],
    overrides: {
      title: "Principal Technical PM / Strategy Lead",
      subtitle: "Roadmap · Governance · Open Source Strategy",
      headline:
        "기술 로드맵·경영혁신·OSS 전환 전략 수립 경험 | PMP·정보관리기술사 보유",
    },
  },
  {
    id: "rnd",
    name: "R&D · Engineering",
    description: "R&D/엔지니어링 포지션용 — 기술 스택·연구 과제·발표 중심",
    tags: ["rnd"],
    sections: [
      "summary",
      "competencies",
      "expertise",
      "experience",
      "projects",
      "earlier",
      "skills",
      "certifications",
      "education",
      "publications",
      "speaking",
      "references",
    ],
    overrides: {
      title: "Principal R&D Engineer",
      subtitle: "Cloud · Open Source · Data Platform",
      headline:
        "통신 빌링 → OSS 전환 → 클라우드 플랫폼 내재화 | 30년의 일관된 R&D 여정",
    },
  },
];

export function getTemplate(id: string): ResumeTemplate {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

// 항목 필터링 — tags가 없으면 공통, 있으면 템플릿 태그와 교집합이 있어야 노출
export function matchTags(itemTags: string[] | undefined, templateTags: TemplateTag[]): boolean {
  if (!templateTags || templateTags.length === 0) return true; // 필터 없음
  if (!itemTags || itemTags.length === 0) return true; // 공통 항목
  return itemTags.some((t) => (templateTags as string[]).includes(t));
}
