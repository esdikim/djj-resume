import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Loader2, Upload, Trash2, Download, FileText, ArrowLeft, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import mammoth from "mammoth/mammoth.browser";

export const Route = createFileRoute("/uploads")({
  head: () => ({ meta: [{ title: "이력서 파일 관리 — Upload" }] }),
  component: UploadsPage,
});

const BUCKET = "resume-uploads";
const ACCEPT = ".doc,.docx,.txt,.md,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,application/pdf";
const MAX_BYTES = 15 * 1024 * 1024; // 15MB

type UploadRow = {
  id: string;
  file_name: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
};

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function isTextLike(mime: string, name: string) {
  return mime.startsWith("text/") || /\.(txt|md)$/i.test(name);
}
function isDocx(mime: string, name: string) {
  return mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || /\.docx$/i.test(name);
}

function UploadsPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<UploadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<UploadRow | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [previewText, setPreviewText] = useState<string>("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate({ to: "/login", replace: true });
  }, [authLoading, isAuthenticated, navigate]);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("resume_uploads")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    setRows((data ?? []) as UploadRow[]);
    setLoading(false);
  }, [user]);

  useEffect(() => { if (user) refresh(); }, [user, refresh]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || !user) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > MAX_BYTES) {
          alert(`${file.name}: 파일이 너무 큽니다 (최대 15MB)`);
          continue;
        }
        const safeName = file.name.replace(/[^\w.\-가-힣]/g, "_");
        const path = `${user.id}/${Date.now()}_${safeName}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
        if (upErr) { alert(`업로드 실패: ${upErr.message}`); continue; }
        const { error: insErr } = await supabase.from("resume_uploads").insert({
          user_id: user.id,
          file_name: file.name,
          storage_path: path,
          mime_type: file.type || "application/octet-stream",
          size_bytes: file.size,
        });
        if (insErr) {
          await supabase.storage.from(BUCKET).remove([path]);
          alert(`기록 저장 실패: ${insErr.message}`);
        }
      }
      await refresh();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (row: UploadRow) => {
    if (!confirm(`'${row.file_name}' 삭제할까요?`)) return;
    await supabase.storage.from(BUCKET).remove([row.storage_path]);
    await supabase.from("resume_uploads").delete().eq("id", row.id);
    if (selected?.id === row.id) { setSelected(null); setPreviewHtml(""); setPreviewText(""); }
    refresh();
  };

  const handleDownload = async (row: UploadRow) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(row.storage_path, 60);
    if (error || !data) { alert("다운로드 링크 생성 실패"); return; }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = row.file_name;
    document.body.appendChild(a); a.click(); a.remove();
  };

  const handlePreview = async (row: UploadRow) => {
    setSelected(row);
    setPreviewHtml(""); setPreviewText(""); setPreviewError(null);
    setPreviewLoading(true);
    try {
      const { data, error } = await supabase.storage.from(BUCKET).download(row.storage_path);
      if (error || !data) throw error ?? new Error("다운로드 실패");
      if (isDocx(row.mime_type, row.file_name)) {
        const buf = await data.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: buf });
        setPreviewHtml(result.value || "<p class='text-muted-foreground'>(빈 문서)</p>");
      } else if (isTextLike(row.mime_type, row.file_name)) {
        setPreviewText(await data.text());
      } else {
        setPreviewError("이 형식은 미리보기를 지원하지 않습니다. (Word/.docx, .txt, .md 만 지원)");
      }
    } catch (e: any) {
      console.error(e);
      setPreviewError(e?.message ?? "미리보기 실패");
    } finally {
      setPreviewLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-card/80 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Editor
          </Link>
          <div>
            <div className="font-display text-sm font-semibold">업로드한 이력서 파일</div>
            <div className="font-mono text-[11px] text-muted-foreground">Word(.docx), .txt, .md, .pdf · 미리보기: docx / txt / md</div>
          </div>
        </div>
        <label className={`flex cursor-pointer items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-90 ${uploading ? "opacity-60" : ""}`}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "업로드 중..." : "파일 업로드"}
          <input type="file" accept={ACCEPT} multiple className="hidden" disabled={uploading}
            onChange={(e) => { handleUpload(e.target.files); e.currentTarget.value = ""; }} />
        </label>
      </header>

      <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-[360px_1fr]">
        {/* List */}
        <aside className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Files ({rows.length})
          </div>
          {loading ? (
            <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> 불러오는 중...
            </div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              아직 업로드된 파일이 없습니다.<br />상단의 <b>파일 업로드</b> 버튼으로 추가하세요.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((r) => {
                const active = selected?.id === r.id;
                const canPreview = isDocx(r.mime_type, r.file_name) || isTextLike(r.mime_type, r.file_name);
                return (
                  <li key={r.id} className={`flex flex-col gap-1 px-4 py-3 ${active ? "bg-brand/5" : ""}`}>
                    <div className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground" title={r.file_name}>{r.file_name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {fmtSize(r.size_bytes)} · {new Date(r.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handlePreview(r)}
                        disabled={!canPreview}
                        title={canPreview ? "미리보기" : "이 형식은 미리보기 불가"}
                        className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
                      >
                        <Eye className="h-3 w-3" /> Preview
                      </button>
                      <button onClick={() => handleDownload(r)} className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Download className="h-3 w-3" /> 다운로드
                      </button>
                      <button onClick={() => handleDelete(r)} className="ml-auto flex items-center gap-1 rounded-md border border-destructive/30 px-2 py-1 text-[11px] text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3 w-3" /> 삭제
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Preview */}
        <section className="min-h-[60vh] rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            👁 Preview {selected ? `— ${selected.file_name}` : ""}
          </div>
          <div className="p-6">
            {!selected && (
              <div className="text-sm text-muted-foreground">왼쪽 목록에서 파일을 선택하면 미리보기가 표시됩니다.</div>
            )}
            {previewLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> 미리보기 생성 중...
              </div>
            )}
            {previewError && <div className="text-sm text-destructive">{previewError}</div>}
            {!previewLoading && !previewError && previewHtml && (
              <article
                className="prose max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-brand"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            )}
            {!previewLoading && !previewError && previewText && (
              <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-foreground">{previewText}</pre>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
