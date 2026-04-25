import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Summary } from "@/components/Summary";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { EducationPubs } from "@/components/EducationPubs";
import { Contact } from "@/components/Contact";

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
      {
        property: "og:description",
        content: "Samsung Cloud Platform 리드 엔지니어의 인터랙티브 이력서.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />
      <NavBar />
      <Hero />
      <Summary />
      <Experience />
      <Skills />
      <Certifications />
      <EducationPubs />
      <Contact />
    </main>
  );
}
