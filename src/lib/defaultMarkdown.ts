import { buildMarkdown } from "./exportResume";

export function getDefaultMarkdown(templateId: string = "default"): string {
  return buildMarkdown(templateId);
}
