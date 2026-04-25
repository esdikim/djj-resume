import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ResumeEditor } from "@/components/ResumeEditor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "김성덕 (Sung-Deok Kim) — Resume Editor" },
      {
        name: "description",
        content:
          "Markdown으로 편집하고 즉시 미리보는 인터랙티브 이력서. Samsung Cloud Platform 리드 엔지니어 김성덕.",
      },
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

  if (loading || !isAuthenticated || !user) {
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
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />
      <ResumeEditor userId={user.id} userEmail={user.email ?? undefined} />
    </>
  );
}
