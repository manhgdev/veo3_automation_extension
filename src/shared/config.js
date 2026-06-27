/** Extension config — settings, UI flags, Flow selectors. Chỉnh ở đây rồi reload extension. */

export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/veo-automation-for-google/fdlajfhamoclhdfcpafljokhdglmoeik';

// --- UI (panel) ---
export const UI_CONFIG = {
  enableUnusualActivityTip: true,
  showUnusualActivityTipDefault: false,
  showUnusualActivityTipInSettings: true,
  /** Ẩn khung tài khoản/gói; bật true khi có pricing + đăng nhập */
  showPlanBanner: false,
  isPricingEnabled: false,
  dailyPromptLimit: 999999,
};

// --- User settings (chrome.storage.local) ---
export const SETTINGS_STORAGE_KEY = 'flow_automation_settings';
export const SETTINGS_MIGRATION_VERSION = 8;
export const MAX_CONCURRENT_PROMPTS = 6;

export const DEFAULT_SETTINGS = {
  migrationVersion: SETTINGS_MIGRATION_VERSION,
  defaultMode: 'textToVideo',
  aspectRatio: '16:9',
  concurrentPrompts: 2,
  outputCount: 1,
  promptDelaySecondsMin: 20,
  promptDelaySecondsMax: 45,
  model: 'Veo 3.1 - Lite',
  defaultVideoOption: '8s',
  defaultImageOption: 'new-image',
  imageToVideoMaxImagesPerPrompt: 2,
  componentsToVideoMaxImagesPerPrompt: 3,
  imageToImageMaxImagesPerPrompt: 3,
  maxRetries: 1,
  autoDownloadVideoQuality: '720',
  autoDownloadImageQuality: '1k',
  autoAddCharacterImages: false,
  autoAddVoiceBySpeaker: false,
  defaultSpeaker: 'none',
  enableCharacterControl: false,
  defaultCharacters: [],
  autoChangeFileName: true,
  imageModel: '🍌 Nano Banana 2',
  folderName: 'veo-folder',
  folderNameBase: 'veo-folder',
  showUnusualActivityTip: false,
};

export const RESET_SETTINGS = {
  ...DEFAULT_SETTINGS,
};

const SETTINGS_MIGRATIONS = {
  1: () => {},
  2: (s) => { if (s.model === 'Veo 3.1 - Fast') s.model = 'Veo 3.1 - Lite'; },
  3: (s) => { if (s.model === 'Veo 3.1 - Lite') s.model = 'Veo 3.1 - Fast'; },
  4: (s) => { if (s.model === 'Veo 3.1 - Fast [Lower Priority]') s.model = 'Veo 3.1 - Fast'; },
  5: (s) => { if (s.defaultImageOption === 'concat') s.defaultImageOption = 'new-image-concat'; },
  6: (s) => {
    if ((s.concurrentPrompts ?? 1) > MAX_CONCURRENT_PROMPTS) s.concurrentPrompts = MAX_CONCURRENT_PROMPTS;
    if ((s.promptDelaySecondsMin ?? 0) < 15) s.promptDelaySecondsMin = 20;
    if ((s.promptDelaySecondsMax ?? 0) < 20) s.promptDelaySecondsMax = 30;
  },
  7: (s) => {
    if (s.maxRetries == null || s.maxRetries === 5) s.maxRetries = 1;
  },
  8: (s) => {
    if (s.promptDelaySecondsMin === 25 && s.promptDelaySecondsMax === 35) {
      s.promptDelaySecondsMin = 20;
      s.promptDelaySecondsMax = 45;
    }
  },
};

export function migrateSettings(raw) {
  const settings = { ...raw };
  for (let v = (settings.migrationVersion ?? 0) + 1; v <= SETTINGS_MIGRATION_VERSION; v += 1) {
    SETTINGS_MIGRATIONS[v]?.(settings);
  }
  settings.migrationVersion = SETTINGS_MIGRATION_VERSION;
  return settings;
}

// --- Flow page detection ---
export function isFlowPageUrl(url) {
  if (!url) return false;
  const u = url.toLowerCase();
  const host = u.includes('labs.google') || u.includes('aitestkitchen.withgoogle.com');
  if (!host) return false;
  return u.includes('/fx/') || u.includes('flow') || u.includes('/project/');
}

// --- Flow automation selectors ---
export const FALLBACK_FLOW_CONFIG = {
  version: '1.0.0',
  selectors: {
    charactersTabButton: "button:has(i:contains('accessibility_new'))",
    charactersNameSelector: 'div[data-tile-id] img',
    createProjectButton: 'button:has(i:contains("add_2")):first()',
    configureUIModeButton: 'button:has(i:contains("settings_2"))',
    selectGridModeOption: 'div[role="menu"] > div[data-orientation="horizontal"]:eq(0) button:eq(0)',
    selectSizeGridModeOption: 'div[role="menu"] > div[data-orientation="horizontal"]:eq(1) button:eq(0)',
    selectShowTextModeOption: 'div[role="menu"] > div:has(i:contains(visibility)) button:eq(1)',
    selectClearPromptModeOption: 'div[role="menu"] > div:has(i:contains(ink_eraser)) button:eq(1)',
    closeConfigureUIModeButton: 'button:has(i:contains("settings_2"))',
    fileInput: 'input[type="file"]',
    configButton: 'button:has(i:contains("crop")), button:has(i:contains("tune"))',
    removeSelectedImagesButton: 'button:has(i:contains("close")):has(span:contains("prompt"))',
    disableAgentModeButton:
      'div:has(div[data-scroll-state="START"]) button[aria-pressed="true"], button:has(i:contains("close")):has(span:contains("prompt")), div:has(i:contains("edit_square")) > button:has(i:contains("close"))',
    enableAgentModeButton:
      'div:has(div[data-scroll-state="START"]) button[aria-pressed="false"], button:has(i:contains("expand_content"))',
    neverAskAgentSettingButton: 'div[role="radiogroup"] button:last()',
    saveAgentSettings:
      'div[style*="width"]:has(div[aria-orientation="vertical"]) button:has(div[data-type="button-overlay"]):last()',
    configButtonActived: 'button:has(i:contains("crop")), button:has(i:contains("tune"))',
    configVideoButton: 'button[color="BLURPLE"][aria-haspopup="dialog"]',
    configImageButton: 'button:has(i:contains("tune"))',
    modelSelectButton: 'div[data-state="open"] button:has(i:contains("arrow_drop_down"))',
    selectVideoMode: 'div[data-state="open"] div[role="tablist"]:eq(0) button:eq(1)',
    selectImageMode: 'div[data-state="open"] div[role="tablist"]:eq(0) button:eq(0)',
    toImageModeOption: 'div[data-state="open"] div[role="tablist"]:eq(0) button:eq(0)',
    textToVideoModeOption: 'div[data-state="open"] div[role="tablist"]:eq(1) button:eq(1)',
    imageToVideoModeOption: 'div[data-state="open"] div[role="tablist"]:eq(1) button:eq(0)',
    componentToVideoModeOption: 'div[data-state="open"] div[role="tablist"]:eq(1) button:eq(1)',
    aspectRatioTemplate: 'div[data-state="open"] div[role="tablist"] button:has(i:contains("{aspectRatio}"))',
    outputCountTemplate: 'div[data-state="open"] div[role="tablist"] button:contains("{outputCount}")',
    modelTemplate: 'div[role="menu"] button:has(span:contains("{model}"))',
    videoLengthTemplate: 'div[data-orientation="horizontal"] > div > button:contains("{videoLength}")',
    addImageButton: 'div[type="button"][aria-controls*="radix-"]:first(), button:has(i:contains("add_2"))',
    promptTextarea: 'div[role="textbox"]',
    submitButton: 'button:has(i:contains("arrow_forward"))',
    stopButton: 'button:has(i:contains("stop"))',
    downloadButton: 'button[aria-haspopup="menu"]:has(i:contains("download"))',
    uploadMediaButton: 'button:has(i:contains("upload")):last()',
    selectUploadImageType: 'div[data-side="top"] button:has(i:contains("image")):eq(0)',
    agreeTermUploadedVideoButton: 'div[role="dialog"]:contains("policies") button:eq(-1)',
    selectUploadVideoType: 'div[data-side="top"] button:has(i:contains("videocam")):eq(0)',
    selectUploadCharacterType: 'div[data-side="top"] button:has(i:contains("accessibility_new")):eq(0)',
    selectSpeakerType: 'div[data-side="top"] button:has(i:contains("voice_selection")):eq(0)',
    sortOptionsButton:
      'div[data-side="top"] button[aria-haspopup="menu"]:last(), div[role="dialog"]:not([data-side="top"]) div > i:contains("search")',
    sortLatestOption: 'div[role="menu"] > button:eq(2), div[role="dialog"]:not([data-side="top"]) div > i:contains("search")',
    virtuosoItemList: 'div[data-side="top"] div[data-testid="virtuoso-item-list"] > div:has(img)',
    searchUploadedImage: 'div[data-side="top"] input[type="text"]',
    outputItems: 'div > div > div[data-tile-id]:has(div)',
    tileOnQueue: 'i:contains("movie"), div[style*="brightness(1)"]',
    tileByIdTemplate: 'div[data-tile-id="{tileId}"]:has(div)',
    tileEditLinkTemplate: 'div[data-tile-id="{tileId}"] a[href*="/edit/"]',
    moreOptionsButtonInHoverTile: 'button:has(i:contains("more_vert"))',
    downloadButtonInTile: 'button:has(i:contains("download"))',
    downloadButtonInHoverTile: 'div[aria-haspopup="menu"] i:contains("download")',
    quality1KOption: 'button:has(span:contains("1K"))',
    quality2KOption: 'button:has(span:contains("2K"))',
    quality1080Option: 'button:has(span:contains("1080p"))',
    quality4KOption: 'button:has(span:contains("4K"))',
    downloadDoneButton: 'button:has(i:contains("check")), header button:last(), button:has(span:contains("Done"))',
    openProfileInfoButton: 'button > img[width="32"][height="32"]',
    closeProfileInfoButton: 'div[role="dialog"] button:has(i:contains("close"))',
  },
};

const USE_REMOTE_SERVER = false;
const CONFIG_URLS = ['https://zivofly.com/shop/veo3/setting'];
const CLIENT_SECRET = 'YES_THAT_IS_VERY_EASY_RIGHT_?!$';
let cachedConfig = null;

export function isVersionSupported(config, version) {
  if (!config?.version) return false;
  return config.version.split(',').map((v) => v.trim()).filter(Boolean).includes(version.trim());
}

async function fetchRemoteConfig(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'X-Client-Secret': CLIENT_SECRET },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data?.selectors) throw new Error('Invalid config shape');
  return data;
}

export async function getRemoteConfig() {
  if (cachedConfig) return cachedConfig;
  if (!USE_REMOTE_SERVER) {
    cachedConfig = FALLBACK_FLOW_CONFIG;
    return cachedConfig;
  }
  for (const url of CONFIG_URLS) {
    try {
      cachedConfig = await fetchRemoteConfig(url);
      return cachedConfig;
    } catch {
      // try next
    }
  }
  cachedConfig = FALLBACK_FLOW_CONFIG;
  return cachedConfig;
}
