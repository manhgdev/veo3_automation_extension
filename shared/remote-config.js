/** Remote selectors config for Google Flow automation. */
import { FALLBACK_FLOW_CONFIG } from './fallback-flow-config.js';

let cachedConfig = null;

const CONFIG_URLS = [
  'https://zivofly.com/shop/veo3/setting',
];

const CLIENT_SECRET = 'YES_THAT_IS_VERY_EASY_RIGHT_?!$';

export function isVersionSupported(config, version) {
  if (!config?.version) return false;
  return config.version
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
    .includes(version.trim());
}

async function fetchConfig(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'X-Client-Secret': CLIENT_SECRET },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data?.selectors) {
    throw new Error('Invalid config shape');
  }

  return data;
}

export async function getRemoteConfig() {
  if (cachedConfig) return cachedConfig;

  for (const url of CONFIG_URLS) {
    try {
      cachedConfig = await fetchConfig(url);
      return cachedConfig;
    } catch {
      // try next mirror
    }
  }

  cachedConfig = FALLBACK_FLOW_CONFIG;
  return cachedConfig;
}
