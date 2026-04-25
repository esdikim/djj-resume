import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar";
import { ResumeContent } from "@/components/ResumeContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "김성덕 (Sung-Deok Kim) — Principal Cloud Specialist" },
      {
        name: "description",
        content:
          "25년+ ICT 경력의 클라우드 플랫폼 전문가. Samsung Cloud Platform(SCP) 내재화·상품 개발, OpenStack/VMware 아키텍처, DevOps 자동화 리드.",
      },
      { property: "og:title", content: "김성덕 — Principal Cloud Specialist / TAM" },
      { property: "og:description", content: "Samsung Cloud Platform 리드 엔지니어의 인터랙티브 이력서." },
    ],
  }),
  component: Index,
});

function Index() {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-brand" />
          <span className="font-mono text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />
      <Sidebar userEmail={user?.email ?? undefined} />
      <main className="ml-72 px-10 py-14 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <ResumeContent />
        </div>
      </main>
    </div>
  );
}
