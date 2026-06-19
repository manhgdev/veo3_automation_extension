/** Detect Google Flow pages (landing, project, editor). */
export function isFlowPageUrl(url) {
  if (!url) return false;

  const normalized = url.toLowerCase();

  const isLabsHost =
    normalized.includes('labs.google') ||
    normalized.includes('aitestkitchen.withgoogle.com');

  if (!isLabsHost) return false;

  return (
    normalized.includes('/fx/') ||
    normalized.includes('flow') ||
    normalized.includes('/project/')
  );
}
