const SHOWN_KEY = 'unusualTipShown';
const PENDING_KEY = 'unusualTipPending';
const PAYLOAD_KEY = 'unusualTipPayload';

async function readStorage(keys) {
  try {
    return await chrome.storage.local.get(keys);
  } catch {
    return {};
  }
}

async function writeStorage(values) {
  try {
    await chrome.storage.local.set(values);
  } catch {
    // ignore
  }
}

export async function isUnusualTipShown() {
  const data = await readStorage(SHOWN_KEY);
  return !!data[SHOWN_KEY];
}

export async function markUnusualTipShown() {
  await writeStorage({
    [SHOWN_KEY]: true,
    [PENDING_KEY]: false,
    [PAYLOAD_KEY]: null,
  });
}

export async function setUnusualTipPending(payload) {
  const data = await readStorage(SHOWN_KEY);
  if (data[SHOWN_KEY]) return;
  await writeStorage({
    [PENDING_KEY]: true,
    [PAYLOAD_KEY]: payload ?? null,
  });
}

export async function hasUnusualTipPending() {
  const data = await readStorage([SHOWN_KEY, PENDING_KEY]);
  if (data[SHOWN_KEY]) return false;
  return !!data[PENDING_KEY];
}
