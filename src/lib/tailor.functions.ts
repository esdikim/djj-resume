import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { buildMarkdown } from "./exportResume";

const Input = z.object({
  jd: z.string().min(20, "JD가 너무 짧습니다 (20자 이상)"),
  language: z.enum(["ko", "en"]).default("ko"),
});

export const tailorResumeFromJD = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    // 마스터 이력서 전체를 컨텍스트로 전달
    const master = buildMarkdown("default");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-2.5-pro");

    const langLabel = data.language === "en" ? "English" : "Korean (한국어)";

    const system = `당신은 시니어 ICT 리쿠르터이자 이력서 작성 전문가입니다.
주어진 마스터 이력서(후보자의 전체 경력·성과·자격)에서 채용공고(JD)와 가장 관련성 높은 내용을 선별·재구성하여, 해당 포지션에 최적화된 맞춤형 이력서를 ${langLabel}로 작성합니다.

작성 원칙:
1. **사실 보존**: 마스터에 없는 경력/숫자/자격은 절대 새로 만들지 마세요. 강조점·표현·순서만 조정합니다.
2. **JD 키워드 정렬**: JD의 핵심 요구사항(기술, 책임, 경험)을 식별하고, 마스터에서 매칭되는 항목을 우선 노출합니다.
3. **불필요 항목 제거**: JD와 무관한 경력/스킬은 과감히 생략하거나 한 줄로 요약합니다.
4. **상단 Match Summary**: 이력서 최상단에 "Why I Fit This Role" 섹션(3-5 bullet)을 추가하여 JD 요구사항별 대응 근거를 명시합니다.
5. **수치 강조**: 정량 성과를 가능한 한 앞쪽 bullet에 배치합니다.
6. **출력 형식**: 순수 Markdown만 출력. 코드펜스(\`\`\`)나 설명 문구 없이 # 헤더부터 바로 시작합니다.`;

    const prompt = `### 마스터 이력서 (Source of Truth)
${master}

---

### 채용공고 (JD)
${data.jd}

---

### 요청
위 마스터 이력서의 사실만을 사용하여, 위 JD에 최적화된 ${langLabel} 이력서를 Markdown으로 작성해 주세요.
- 최상단에 후보자 이름/연락처 유지
- 그 다음에 "## Why I Fit This Role" 섹션 (JD 요구사항 → 본인 경력 매칭 3-5개)
- 이후 Summary, Core Strengths, Experience, Key Achievements, Skills, Certifications, Education 순으로 JD 관련성 높은 내용 위주로 재구성
- 분량: A4 2-3페이지 수준`;

    const { text } = await generateText({
      model,
      system,
      prompt,
    });

    // 코드펜스 제거 (혹시 모델이 감쌌을 경우)
    return text.replace(/^```(?:markdown|md)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
  });
