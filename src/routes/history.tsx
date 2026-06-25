import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TEMPLATES, getTemplate } from "@/data/templates";
import { MarkdownPreview } from "@/components/MarkdownPreview";
import { ArrowLeft, History as HistoryIcon, RotateCcw, Trash2, Loader2, Pencil, Check, X } from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

type Row = {
  id: string;
  variant: string;
  content: string;
  label: string | null;
  created_at: string;
};

function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [variantFilter, setVariantFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Row | null>(null);
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [labelDraft, setLabelDraft] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/login" });
  }, [authLoading, user, navigate]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("resume_history")
      .select("id, variant, content, label, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) console.error(error);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filtered = variantFilter === "all" ? rows : rows.filter((r) => r.variant === variantFilter);

  const handleRestore = async (row: Row) => {
    if (!user) return;
    if (!confirm(`'${getTemplate(row.variant).name}' 템플릿을 이 스냅샷으로 복원할까요? 현재 내용은 덮어쓰여집니다.\n\n(복원 직전 내용은 자동으로 히스토리에 백업됩니다)`)) return;

    // backup current
    const { data: current } = await supabase
      .from("resumes").select("content").eq("user_id", user.id).eq("variant", row.variant).maybeSingle();
    if (current?.content) {
      await supabase.from("resume_history").insert({
        user_id: user.id, variant: row.variant, content: current.content,
        label: "복원 전 자동 백업",
      });
    }

    // upsert
    const { data: existing } = await supabase
      .from("resumes").select("id").eq("user_id", user.id).eq("variant", row.variant).maybeSingle();
    if (existing) {
      await supabase.from("resumes").update({ content: row.content }).eq("user_id", user.id).eq("variant", row.variant);
    } else {
      await supabase.from("resumes").insert({ user_id: user.id, variant: row.variant, content: row.content });
    }
    if (typeof window !== "undefined") localStorage.setItem("resume:lastVariant", row.variant);
    navigate({ to: "/" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 히스토리 항목을 삭제할까요?")) return;
    await supabase.from("resume_history").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const handleSaveLabel = async (id: string) => {
    await supabase.from("resume_history").update({ label: labelDraft || null }).eq("id", id);
    setEditingLabelId(null);
    load();
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-card/80 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> 에디터로
          </Link>
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4 text-brand" />
            <div className="font-display text-sm font-semibold">수정 히스토리</div>
            <span className="font-mono text-[11px] text-muted-foreground">({rows.length})</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-mono text-[11px] text-muted-foreground">템플릿:</label>
          <select
            value={variantFilter}
            onChange={(e) => { setVariantFilter(e.target.value); setSelected(null); }}
            className="rounded-lg border border-border bg-background px-2 py-1 text-xs"
          >
            <option value="all">전체</option>
            {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
        <aside className="border-r border-border/60 bg-card/30">
          {loading ? (
            <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> 불러오는 중...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">
              아직 저장된 히스토리가 없습니다. 이력서를 편집하면 자동으로 스냅샷이 쌓입니다.
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {filtered.map((row) => {
                const tpl = getTemplate(row.variant);
                const active = selected?.id === row.id;
                const dt = new Date(row.created_at);
                return (
                  <li key={row.id} className={`group relative cursor-pointer p-4 transition ${active ? "bg-brand/10" : "hover:bg-muted/40"}`}>
                    <button onClick={() => setSelected(row)} className="block w-full text-left">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md bg-brand/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand">{tpl.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {dt.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                      </div>
                      {editingLabelId === row.id ? (
                        <div className="mt-2 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <input
                            autoFocus
                            value={labelDraft}
                            onChange={(e) => setLabelDraft(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSaveLabel(row.id); if (e.key === "Escape") setEditingLabelId(null); }}
                            className="flex-1 rounded border border-border bg-background px-1.5 py-0.5 text-xs"
                            placeholder="메모..."
                          />
                          <button onClick={() => handleSaveLabel(row.id)} className="rounded p-1 text-emerald-500 hover:bg-emerald-500/10"><Check className="h-3 w-3" /></button>
                          <button onClick={() => setEditingLabelId(null)} className="rounded p-1 text-muted-foreground hover:bg-muted"><X className="h-3 w-3" /></button>
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-foreground/80">
                          {row.label ?? <span className="italic text-muted-foreground">메모 없음</span>}
                        </div>
                      )}
                      <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                        {row.content.length.toLocaleString()} chars
                      </div>
                    </button>
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingLabelId(row.id); setLabelDraft(row.label ?? ""); }}
                        className="flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-muted"
                      >
                        <Pencil className="h-3 w-3" /> 메모
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRestore(row); }}
                        className="flex items-center gap-1 rounded border border-brand/40 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand hover:bg-brand/20"
                      >
                        <RotateCcw className="h-3 w-3" /> 복원
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}
                        className="ml-auto flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" /> 삭제
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <main className="min-h-[calc(100vh-3.25rem)] bg-background">
          {selected ? (
            <div className="p-8">
              <div className="mx-auto max-w-3xl">
                <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
                  <div>
                    <div className="font-display text-base font-semibold">{getTemplate(selected.variant).name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {new Date(selected.created_at).toLocaleString("ko-KR")}
                      {selected.label && <> · {selected.label}</>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRestore(selected)}
                    className="flex items-center gap-1.5 rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/20"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> 이 버전으로 복원
                  </button>
                </div>
                <MarkdownPreview content={selected.content} />
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-10 text-sm text-muted-foreground">
              좌측에서 항목을 선택하면 미리보기가 표시됩니다.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
