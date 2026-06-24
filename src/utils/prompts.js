/** Tách prompt theo dòng trống (giống Flow batch). */
export function parsePrompts(text) {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}
