import { useEffect, useRef, useState } from "react";
import { Loader2, Save, RotateCcw, FileDown, FileText, LogOut, Eye, Pencil, Columns } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { MarkdownPreview } from "./MarkdownPreview";
import { getDefaultMarkdown } from "@/lib/defaultMarkdown";
import { resumeData } from "@/data/resume";

type SaveState = "idle" | "saving" | "saved" | "error";
type ViewMode = "split" | "edit" | "preview";

export function ResumeEditor({ userId, userEmail }: { userId: string; userEmail?: string }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [view, setView] = useState<ViewMode>("split");
  const navigate = useNavigate();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialized = useRef(false);

  // Load resume from DB (or seed with default)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("content")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.error("Load resume error:", error);
      }

      if (data?.content) {
        setContent(data.content);
      } else {
        const seed = getDefaultMarkdown();
        setContent(seed);
        await supabase.from("resumes").insert({ user_id: userId, content: seed });
      }
      setLoading(false);
      initialized.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Debounced auto-save
  useEffect(() => {
    if (!initialized.current) return;
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const { error } = await supabase
        .from("resumes")
        .update({ content })
        .eq("user_id", userId);
      if (error) {
        console.error("Save error:", error);
        setSaveState("error");
      } else {
        setSaveState("saved");
      }
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [content, userId]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const handleReset = () => {
    if (confirm("기본 이력서 템플릿으로 되돌립니다. 현재 내용을 잃게 됩니다. 계속할까요?")) {
      setContent(getDefaultMarkdown());
    }
  };

  const downloadFile = (filename: string, mime: string, body: string) => {
    const blob = new Blob([body], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportMd = () => downloadFile("resume.md", "text/markdown", content);
  const exportTxt = () =>
    downloadFile(
      "resume.txt",
      "text/plain",
      content
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/^- /gm, "• "),
    );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-brand" />
          <span className="font-mono text-sm">Loading resume...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top toolbar */}
      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-card/80 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-primary-foreground shadow-card">
            SK
          </div>
          <div>
            <div className="font-display text-sm font-semibold leading-tight">{resumeData.name} · Resume Editor</div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {saveState === "saving" && "● 저장 중..."}
              {saveState === "saved" && "✓ 자동 저장됨"}
              {saveState === "error" && "⚠ 저장 실패"}
              {saveState === "idle" && "준비됨"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View switcher */}
          <div className="flex overflow-hidden rounded-lg border border-border bg-muted/40">
            <button
              onClick={() => setView("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition ${view === "edit" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
            <button
              onClick={() => setView("split")}
              className={`flex items-center gap-1.5 border-x border-border px-3 py-1.5 text-xs font-medium transition ${view === "split" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Columns className="h-3.5 w-3.5" /> Split
            </button>
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition ${view === "preview" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button
            onClick={exportMd}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <FileDown className="h-3.5 w-3.5" /> .md
          </button>
          <button
            onClick={exportTxt}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <FileText className="h-3.5 w-3.5" /> .txt
          </button>

          {userEmail && (
            <div className="ml-2 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-1.5 text-xs">
              <span className="hidden text-muted-foreground md:inline">{userEmail}</span>
              <button onClick={handleSignOut} className="flex items-center gap-1 text-muted-foreground transition hover:text-foreground">
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Editor + Preview */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        {(view === "edit" || view === "split") && (
          <div className={`flex flex-col border-border/60 ${view === "split" ? "border-r" : ""} ${view === "edit" ? "lg:col-span-2" : ""}`}>
            <div className="border-b border-border/60 bg-muted/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              📝 Markdown
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
              className="min-h-[calc(100vh-7.5rem)] w-full flex-1 resize-none border-0 bg-background px-6 pt-4 pb-6 font-mono text-[15px] font-medium leading-7 text-foreground caret-brand outline-none focus:ring-0"
              placeholder="# 이름&#10;&#10;마크다운으로 이력서를 작성하세요..."
            />
          </div>
        )}

        {(view === "preview" || view === "split") && (
          <div className={`flex flex-col bg-card/30 ${view === "preview" ? "lg:col-span-2" : ""}`}>
            <div className="border-b border-border/60 bg-muted/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              👁 Preview
            </div>
            <div className="flex-1 overflow-auto p-8">
              <div className="mx-auto max-w-3xl">
                <MarkdownPreview content={content} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 border-t border-border/60 bg-card/60 px-4 py-1.5">
        <Save className="h-3 w-3 text-muted-foreground" />
        <span className="font-mono text-[10px] text-muted-foreground">
          입력하는 즉시 미리보기에 반영되며, 약 0.6초 후 자동으로 클라우드에 저장됩니다.
        </span>
      </div>
    </div>
  );
}
