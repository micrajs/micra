export function normalizeTemplateName(file: string) {
  return file.replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
}
