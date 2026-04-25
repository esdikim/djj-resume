import { buildMarkdown } from "./exportResume";

export function getDefaultMarkdown(): string {
  return buildMarkdown();
}
