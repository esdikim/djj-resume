import { useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { tailorResumeFromJD } from "@/lib/tailor.functions";

interface Props {
  open: boolean;
  onClose: () => void;
  onGenerated: (markdown: string) => void;
}

export function JDTailorDialog({ open, onClose, onGenerated }: Props) {
  const [jd, setJd] = useState("");
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tailor = useServerFn(tailorResumeFromJD);

  if (!open) return null;

  const handleGenerate = async () => {
    setError(null);
    if (jd.trim().length < 20) {
      setError("JD는 최소 20자 이상 입력해 주세요.");
      return;
    }
    setLoading(true);
    try {
      const md = await tailor({ data: { jd: jd.trim(), language } });
      onGenerated(md);
      onClose();
      setJd("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("429")) setError("요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.");
      else if (msg.includes("402")) setError("AI 크레딧이 소진되었습니다. 워크스페이스 설정에서 크레딧을 추가해 주세요.");
      else setError(`생성 실패: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand" />
            <h2 className="font-display text-sm font-semibold">JD 기반 맞춤 이력서 생성</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          <p className="mb-3 text-xs text-muted-foreground">
            채용공고(JD) 전문을 붙여넣으세요. 마스터 이력서의 사실만 사용해 AI가 JD에 최적화된 맞춤 버전을 생성합니다.
            결과는 <strong className="text-foreground">JD 맞춤 (AI 생성)</strong> 템플릿에 저장되며, 이후 자유롭게 편집 가능합니다.
          </p>

          <div className="mb-3 flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground">출력 언어:</label>
            <div className="flex overflow-hidden rounded-md border border-border">
              <button
                onClick={() => setLanguage("ko")}
                className={`px-3 py-1 text-xs ${language === "ko" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >한국어</button>
              <button
                onClick={() => setLanguage("en")}
                className={`border-l border-border px-3 py-1 text-xs ${language === "en" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >English</button>
            </div>
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder={"예시) [Senior Cloud Solution Architect]\n- 5년+ AWS/Azure/GCP 경험\n- Kubernetes, Terraform, CI/CD 운영\n- 엔터프라이즈 고객 대상 아키텍처 설계 및 PoC 리딩\n- 책임: ..."}
            className="h-72 w-full resize-none rounded-md border border-border bg-background px-3 py-2 font-mono text-sm leading-6 text-foreground outline-none focus:border-brand"
          />
          <div className="mt-1 text-right text-[10px] text-muted-foreground">{jd.length} 자</div>

          {error && (
            <div className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-5 py-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >취소</button>
          <button
            onClick={handleGenerate}
            disabled={loading || jd.trim().length < 20}
            className="flex items-center gap-1.5 rounded-md bg-brand px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-card transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
            {loading ? "AI 생성 중... (10-30초)" : "맞춤 이력서 생성"}
          </button>
        </div>
      </div>
    </div>
  );
}
