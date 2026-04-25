import { useEffect, useState } from "react";
import { User2, Briefcase, Award, GraduationCap, Wrench, BookOpen, Mail, LogOut, Download, FileDown, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { exportMarkdown, exportPlainText } from "@/lib/exportResume";
import { resumeData } from "@/data/resume";
import { useNavigate } from "@tanstack/react-router";

const sections = [
  { id: "about", label: "About", icon: User2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "publications", label: "Publications", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Sidebar({ userEmail }: { userEmail?: string }) {
  const [active, setActive] = useState("about");
  const [exportOpen, setExportOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <aside className="bg-sidebar-grad fixed inset-y-0 left-0 z-30 flex w-72 flex-col text-sidebar-foreground">
      {/* Identity card */}
      <div className="border-b border-sidebar-border/60 px-6 py-7">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-xl font-bold text-primary-foreground shadow-card">
          SK
        </div>
        <h1 className="mt-4 font-display text-xl font-bold leading-tight">{resumeData.name}</h1>
        <p className="text-sm text-sidebar-foreground/70">{resumeData.nameEn}</p>
        <p className="mt-3 text-xs leading-relaxed text-sidebar-foreground/60">
          {resumeData.title}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-sidebar-foreground/40">
          Sections
        </div>
        <ul className="space-y-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/10 text-white shadow-soft"
                      : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <s.icon className={`h-4 w-4 transition ${isActive ? "text-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-white"}`} />
                  <span>{s.label}</span>
                  {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Export + auth */}
      <div className="border-t border-sidebar-border/60 px-4 py-4">
        <div className="relative">
          <button
            onClick={() => setExportOpen((v) => !v)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Export Resume
          </button>
          {exportOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-sidebar-border bg-card text-card-foreground shadow-card">
              <button
                onClick={() => { exportMarkdown(); setExportOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-muted"
              >
                <FileDown className="h-4 w-4 text-brand" /> Markdown (.md)
              </button>
              <button
                onClick={() => { exportPlainText(); setExportOpen(false); }}
                className="flex w-full items-center gap-2 border-t border-border px-3 py-2.5 text-sm hover:bg-muted"
              >
                <FileText className="h-4 w-4 text-brand" /> Plain Text (.txt)
              </button>
            </div>
          )}
        </div>

        {userEmail && (
          <div className="mt-3 rounded-lg bg-white/5 p-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-sidebar-foreground/40">Signed in</div>
            <div className="mt-1 truncate text-xs text-sidebar-foreground/85">{userEmail}</div>
            <button
              onClick={handleSignOut}
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-sidebar-foreground/70 hover:text-white"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
