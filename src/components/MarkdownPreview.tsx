import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownPreview({ content }: { content: string }) {
  return (
    <article className="prose max-w-none prose-headings:font-display prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mt-0 prose-h1:mb-6 prose-h2:mt-10 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2 prose-h2:text-2xl prose-h3:text-lg prose-h3:text-brand prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-li:my-1 prose-hr:border-border/60">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
