const MEDIA_EXT = '(?:jpg|jpeg|png|mp4|webp|gif|jfif)';

/**
 * Tiền tố SRT + thời gian, tùy chọn tên file, rồi ` | ` hoặc khoảng trắng + prompt.
 * Ví dụ:
 *   001_[00.00-00.08]_ten_file.jpg | prompt...
 *   001_[00.00-00.08]_ten_file | prompt...
 *   001_[00.00-00.08] | prompt...
 */
export const INDEXED_TIMED_HEADER_RE = new RegExp(
  `^\\d{3}_\\[[^\\]]+\\](?:_[^\\s|]+(?:\\.${MEDIA_EXT})?)?\\s*(?:\\|\\s*|\\s+)\\S`,
  'i',
);

/** @deprecated dùng INDEXED_TIMED_HEADER_RE */
export const INDEXED_PIPE_LINE_RE = INDEXED_TIMED_HEADER_RE;

export function isIndexedTimedPromptHeaderLine(line) {
  return INDEXED_TIMED_HEADER_RE.test(String(line ?? '').trim());
}

/** @deprecated */
export function isIndexedPipePromptLine(line) {
  return isIndexedTimedPromptHeaderLine(line);
}

/** Lấy phần prompt từ dòng tiêu đề (sau ` | ` hoặc sau tên file). */
export function extractPromptBodyFromIndexedHeaderLine(line) {
  const trimmed = String(line ?? '').trim();
  const match = trimmed.match(
    new RegExp(
      `^\\d{3}_\\[[^\\]]+\\](?:_[^\\s|]+(?:\\.${MEDIA_EXT})?)?\\s*(?:\\|\\s*|\\s+)([\\s\\S]+)$`,
      'i',
    ),
  );
  return match ? match[1].trim() : trimmed;
}

/** @deprecated */
export const extractPromptBodyFromIndexedLine = extractPromptBodyFromIndexedHeaderLine;

/** Lấy nội dung prompt từ khối có thể nhiều dòng (dòng đầu là tiêu đề SRT). */
export function extractPromptBodyFromTimedPrompt(block) {
  const text = String(block ?? '').trim();
  if (!text) return '';
  const nl = text.indexOf('\n');
  const firstLine = nl === -1 ? text : text.slice(0, nl);
  const tail = nl === -1 ? '' : text.slice(nl + 1).trim();
  const body = extractPromptBodyFromIndexedHeaderLine(firstLine);
  return tail ? `${body}\n${tail}` : body;
}

function parseIndexedTimedPrompts(text) {
  const lines = String(text).split(/\r?\n/);
  const prompts = [];
  let current = null;
  let sawHeader = false;

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    if (isIndexedTimedPromptHeaderLine(trimmed)) {
      sawHeader = true;
      if (current) prompts.push(current.trim());
      current = trimmed;
    } else if (current !== null) {
      current += `\n${trimmed}`;
    } else {
      return null;
    }
  }

  if (!sawHeader) return null;
  if (current) prompts.push(current.trim());
  return prompts.length ? prompts : null;
}

export function isIndexedPipePromptBlock(text) {
  return parseIndexedTimedPrompts(text) !== null;
}

/** Tách prompt: dòng trống (Flow batch) hoặc khối SRT + thời gian (có thể để trống giữa các dòng). */
export function parsePrompts(text) {
  if (!text?.trim()) return [];
  const normalized = text.trim().replace(/^\ufeff/, '');

  const indexed = parseIndexedTimedPrompts(normalized);
  if (indexed) return indexed;

  return normalized
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export const PROMPT_PREVIEW_MAX_LEN = 60;

/** Cùng format hiển thị prompt ở Chế độ ảnh/video và Hàng đợi. */
export function formatPromptPreview(text, maxLen = PROMPT_PREVIEW_MAX_LEN) {
  let body = String(text ?? '').trim();
  if (/^\d{3}_\[[^\]]+\]/.test(body)) {
    body = extractPromptBodyFromTimedPrompt(body);
  }
  return body.replace(/\s+/g, ' ').substring(0, maxLen);
}

export function buildPromptPreviews(payloads) {
  return (payloads ?? []).map((p) => formatPromptPreview(p?.prompt));
}
