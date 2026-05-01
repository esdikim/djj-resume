import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { resumeData } from "@/data/resume";
import { buildMarkdown } from "./exportResume";

// 마크다운을 간단한 HTML로 변환 (한글 안전, 외부 폰트 의존 X)
function mdToHtml(md: string): string {
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s: string) =>
    escape(s)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#1d4ed8;text-decoration:underline">$1</a>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, '<code style="background:#f3f4f6;padding:1px 5px;border-radius:3px;font-size:11px">$1</code>')
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  let inTable = false;
  let tableHeader = false;

  const closeList = () => { if (inList) { out.push("</ul>"); inList = false; } };
  const closeTable = () => { if (inTable) { out.push("</tbody></table>"); inTable = false; tableHeader = false; } };

  for (let raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { closeList(); closeTable(); continue; }

    // Tables
    if (line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (/^[-: ]+$/.test(cells.join(""))) { tableHeader = true; continue; }
      if (!inTable) {
        closeList();
        out.push('<table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:12px"><tbody>');
        inTable = true;
      }
      const tag = tableHeader ? "th" : "td";
      const style = tag === "th"
        ? "background:#f3f4f6;border:1px solid #d1d5db;padding:6px 8px;text-align:left;font-weight:600"
        : "border:1px solid #e5e7eb;padding:6px 8px";
      out.push("<tr>" + cells.map((c) => `<${tag} style="${style}">${inline(c)}</${tag}>`).join("") + "</tr>");
      continue;
    } else { closeTable(); }

    if (line.startsWith("# ")) { closeList(); out.push(`<h1 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 4px">${inline(line.slice(2))}</h1>`); }
    else if (line.startsWith("## ")) { closeList(); out.push(`<h2 style="font-size:15px;font-weight:700;color:#1d4ed8;border-bottom:2px solid #1d4ed8;padding-bottom:3px;margin:14px 0 6px">${inline(line.slice(3))}</h2>`); }
    else if (line.startsWith("### ")) { closeList(); out.push(`<h3 style="font-size:13px;font-weight:700;color:#111827;margin:10px 0 4px">${inline(line.slice(4))}</h3>`); }
    else if (line.startsWith("> ")) { closeList(); out.push(`<blockquote style="border-left:3px solid #93c5fd;background:#eff6ff;padding:6px 10px;margin:6px 0;color:#1e3a8a;font-size:12px">${inline(line.slice(2))}</blockquote>`); }
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) { out.push('<ul style="margin:4px 0 4px 18px;padding:0">'); inList = true; }
      out.push(`<li style="margin:2px 0;font-size:12px;line-height:1.55">${inline(line.slice(2))}</li>`);
    }
    else if (/^---+$/.test(line)) { closeList(); out.push('<hr style="border:0;border-top:1px solid #e5e7eb;margin:10px 0"/>'); }
    else { closeList(); out.push(`<p style="margin:4px 0;font-size:12px;line-height:1.6">${inline(line)}</p>`); }
  }
  closeList(); closeTable();
  return out.join("");
}

export async function exportPdf(markdown?: string) {
  const md = markdown ?? buildMarkdown();
  const html = mdToHtml(md);

  // 화면 밖에 렌더링 컨테이너 생성
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; left: -10000px; top: 0;
    width: 794px; padding: 40px 48px; background: #ffffff;
    font-family: 'Malgun Gothic', '맑은 고딕', -apple-system, sans-serif;
    color: #111827;
  `;
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`resume-${resumeData.nameEn.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
