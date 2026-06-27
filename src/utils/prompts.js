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

/** Lấy nhãn STT + timeline (+ tên file) từ dòng SRT, ví dụ `147_[07:36-07:39]` hoặc `001_[00.00-00.08]_ten.jpg`. */
export function extractPromptDisplayPrefix(text) {
  const firstLine = String(text ?? '').trim().split(/\r?\n/)[0] ?? '';
  const match = firstLine.match(/^(\d{3})_(\[[^\]]+\])(?:_([^\s|]+))?/i);
  if (!match) return '';
  const displayIdx = String(parseInt(match[1], 10));
  let prefix = `${displayIdx}_${match[2]}`;
  if (match[3]) prefix += `_${match[3]}`;
  return prefix;
}

export function hasIndexedPromptDisplayPrefix(text) {
  return !!extractPromptDisplayPrefix(text);
}

/** Tooltip / title — giữ prefix SRT + toàn bộ nội dung prompt. */
export function formatPromptDisplayTitle(text) {
  const raw = String(text ?? '').trim();
  if (!raw) return '';
  const prefix = extractPromptDisplayPrefix(raw);
  let body = raw;
  if (/^\d{3}_\[[^\]]+\]/.test(body)) {
    body = extractPromptBodyFromTimedPrompt(body);
  }
  body = body.replace(/\s+/g, ' ').trim();
  if (prefix && body) return `${prefix} · ${body}`;
  if (prefix) return prefix;
  return body || raw;
}

export const PROMPT_PREVIEW_MAX_LEN = 60;

const TRUNCATE_ELLIPSIS = '...';

function truncateWithEllipsis(text, maxLen) {
  const s = String(text ?? '');
  if (maxLen <= 0) return '';
  if (s.length <= maxLen) return s;
  const cut = Math.max(0, maxLen - TRUNCATE_ELLIPSIS.length);
  return cut > 0 ? `${s.slice(0, cut)}${TRUNCATE_ELLIPSIS}` : TRUNCATE_ELLIPSIS;
}

/** Cùng format hiển thị prompt ở Chế độ ảnh/video và Hàng đợi. */
export function formatPromptPreview(text, maxLen = PROMPT_PREVIEW_MAX_LEN) {
  const raw = String(text ?? '').trim();
  if (!raw) return '';
  const prefix = extractPromptDisplayPrefix(raw);
  let body = raw;
  if (/^\d{3}_\[[^\]]+\]/.test(body)) {
    body = extractPromptBodyFromTimedPrompt(body);
  }
  body = body.replace(/\s+/g, ' ').trim();
  if (prefix) {
    const sep = body ? ' · ' : '';
    const prefixPart = `${prefix}${sep}`;
    const bodyLimit = maxLen - prefixPart.length;
    if (bodyLimit <= 0) return truncateWithEllipsis(prefixPart, maxLen);
    const bodyPart = body ? truncateWithEllipsis(body, bodyLimit) : '';
    return `${prefixPart}${bodyPart}`;
  }
  return truncateWithEllipsis(body, maxLen);
}

/** Dòng danh sách: số thứ tự queue (1,2,3…) + nhãn SRT/timeline (147_[…]) nếu có. */
export function formatPromptListLabel(text, index, maxLen = PROMPT_PREVIEW_MAX_LEN) {
  const preview = formatPromptPreview(text, maxLen);
  return `${index + 1}. ${preview}`;
}

export function buildPromptPreviews(payloads) {
  return (payloads ?? []).map((p) => formatPromptPreview(p?.prompt));
}
