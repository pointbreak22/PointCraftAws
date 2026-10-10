/** CMS long-form text → paragraphs (the admin separates them with a blank line). */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.replace(/\s*\r?\n\s*/g, ' ').trim())
    .filter((paragraph) => paragraph.length > 0);
}
