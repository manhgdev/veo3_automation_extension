import { getRemoteConfig } from '../shared/remote-config.js';
import { isFlowPageUrl } from '../shared/flow-page.js';

async function getTabUrl(tab) {
  if (!tab) return '';
  if (tab.url) return tab.url;
  if (!tab.id) return '';
  try {
    return (await chrome.tabs.get(tab.id)).url || '';
  } catch {
    return '';
  }
}

async function detectFlowPageOnTab(tab) {
  if (!tab) return false;

  const url = await getTabUrl(tab);
  if (isFlowPageUrl(url)) return true;

  if (tab.id) {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, { type: 'CHECK_FLOW_PAGE' });
      if (response?.isFlowPage) return true;
    } catch {
      // content script still loading
    }
  }

  return false;
}

async function findFlowTab() {
  const allTabs = await chrome.tabs.query({});

  for (const tab of allTabs) {
    if (await detectFlowPageOnTab(tab)) return tab;
  }

  return null;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function pingContentScript(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, { type: 'CHECK_FLOW_PAGE' });
    return true;
  } catch {
    return false;
  }
}

async function ensureContentScript(tabId) {
  if (await pingContentScript(tabId)) return true;

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content/content.js'],
    });
    await delay(600);
    return pingContentScript(tabId);
  } catch {
    return false;
  }
}

async function sendMessageToTab(tabId, payload) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, payload, (response) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message || 'Failed to reach Flow tab'));
      else resolve(response);
    });
  });
}

async function dispatchToFlowTab(payload) {
  const tab = await findFlowTab();
  if (!tab?.id) {
    throw new Error('No Flow tab found');
  }

  if (!(await ensureContentScript(tab.id))) {
    throw new Error('Cannot connect to Flow page. Refresh the Flow tab and try again.');
  }

  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await sendMessageToTab(tab.id, payload);
    } catch (error) {
      lastError = error;
      await delay(400);
      await ensureContentScript(tab.id);
    }
  }

  throw lastError ?? new Error('Failed to reach Flow tab');
}

function safeRuntimeSend(message) {
  try {
    chrome.runtime.sendMessage(message, () => {
      void chrome.runtime.lastError;
    });
  } catch {
    // ignore
  }
}

function notifyFlowPageState() {
  findFlowTab()
    .then((tab) => {
      safeRuntimeSend({ type: 'FLOW_PAGE_CHANGED', active: !!tab });
    })
    .catch(() => {});
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete' || changeInfo.url) {
    notifyFlowPageState();
  }
});

chrome.tabs.onActivated.addListener(() => {
  notifyFlowPageState();
});

/** Content script messages only reach the service worker — relay to side panel. */
const PANEL_RELAY_TYPES = new Set([
  'PROMPT_GROUP_STATUS',
  'ACTION_LOG',
  'VIDEO_GENERATION_PROGRESS',
  'CONTENT_SCRIPT_RESET',
]);

function relayToPanel(message) {
  if (!PANEL_RELAY_TYPES.has(message.type)) return;
  safeRuntimeSend(message);
}

const PANEL_PATH = 'panel/index.html';

let downloadFolder = '/';
let downloadPrefix = '';
let autoRenameDownloads = true;

/** url -> desired filename while a job batch is running */
const pendingDownloadNames = new Map();
let removeDownloadListenerTimer = null;

const debuggerAttachedTabs = new Set();

chrome.tabs.onRemoved.addListener((tabId) => {
  debuggerAttachedTabs.delete(tabId);
});

chrome.debugger.onDetach.addListener((source) => {
  if (source.tabId !== undefined) {
    debuggerAttachedTabs.delete(source.tabId);
  }
});

function onDownloadDeterminingFilename(item, suggest) {
  const isGoogleUrl = item.url.includes('google');
  const fromThisExtension =
    !item.byExtensionId || item.byExtensionId === chrome.runtime.id;

  if (!isGoogleUrl || !fromThisExtension) return;

  const isVideo = /\.(mp4)$/i.test(item.filename || item.url);
  const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg|jfif)$/i.test(
    item.filename || item.url
  );

  if (!isVideo && !isImage) return;
  if (!autoRenameDownloads) return;

  if (pendingDownloadNames.has(item.url)) {
    suggest({ filename: pendingDownloadNames.get(item.url) });
    pendingDownloadNames.delete(item.url);
    return;
  }

  const originalName = item.filename;
  const baseName = originalName.split('/').pop() || originalName;
  suggest({ filename: `${downloadFolder}${downloadPrefix}${baseName}` });
}

async function setupSidePanel() {
  if (!chrome.sidePanel) return;

  try {
    await chrome.sidePanel.setOptions({ path: PANEL_PATH, enabled: true });
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch {
    // side panel API may be unavailable in some contexts
  }
}

async function reloadFlowTabs() {
  try {
    const tabs = (await chrome.tabs.query({ url: ['*://labs.google/*'] })).filter(
      (tab) => tab.url && tab.url.includes('flow')
    );

    for (const tab of tabs) {
      if (!tab.id) continue;
      try {
        await chrome.tabs.reload(tab.id);
      } catch {
        // tab may have closed
      }
    }
  } catch {
    // ignore query errors
  }
}

function scheduleDownloadListenerRemoval() {
  if (removeDownloadListenerTimer) {
    clearTimeout(removeDownloadListenerTimer);
  }

  removeDownloadListenerTimer = setTimeout(() => {
    removeDownloadListenerTimer = null;
    if (chrome.downloads.onDeterminingFilename.hasListener(onDownloadDeterminingFilename)) {
      chrome.downloads.onDeterminingFilename.removeListener(onDownloadDeterminingFilename);
    }
  }, 5 * 60 * 1000);
}

async function attachDebugger(tabId) {
  const target = { tabId };

  if (!debuggerAttachedTabs.has(tabId)) {
    await chrome.debugger.attach(target, '1.3');
    debuggerAttachedTabs.add(tabId);
  }
}

async function clearSiteStorage(tabId) {
  const sensitivePrefixes = [
    '__Secure',
    'SID',
    'SSID',
    'HSID',
    'APISID',
    'SAPISID',
    'LSID',
    'NID',
    '1P_JAR',
  ];

  const cookies = (await chrome.cookies.getAll({ domain: 'labs.google' })).filter(
    (cookie) => !sensitivePrefixes.some((prefix) => cookie.name.startsWith(prefix))
  );

  await Promise.all(
    cookies.map((cookie) =>
      chrome.cookies.remove({
        url: `https://${cookie.domain.replace(/^\./, '')}${cookie.path}`,
        name: cookie.name,
      })
    )
  );

  if (!tabId) return;

  await attachDebugger(tabId);
  await chrome.debugger.sendCommand(
    { tabId },
    'Storage.clearDataForOrigin',
    { origin: 'https://labs.google', storageTypes: 'local_storage' }
  );
}

async function enableNetwork(tabId) {
  const target = { tabId };
  await chrome.debugger.sendCommand(target, 'Network.enable', {});
  await chrome.debugger.sendCommand(target, 'Network.setCacheDisabled', {
    cacheDisabled: true,
  });
}

setupSidePanel();
notifyFlowPageState();

chrome.runtime.onInstalled.addListener(async (details) => {
  await setupSidePanel();
  if (details.reason === 'install') {
    await reloadFlowTabs();
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!chrome.sidePanel || tab.id === undefined) return;

  try {
    await chrome.sidePanel.open({ tabId: tab.id });
  } catch {
    // ignore
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.tab && PANEL_RELAY_TYPES.has(message.type)) {
    relayToPanel(message);
  }

  switch (message.type) {
    case 'IS_FLOW_PAGE_ACTIVE':
      (async () => {
        try {
          const tab = await findFlowTab();
          sendResponse({ active: !!tab });
        } catch {
          sendResponse({ active: false });
        }
      })();
      return true;

    case 'GET_FLOW_TAB_ID':
      findFlowTab()
        .then((tab) => sendResponse({ tabId: tab?.id ?? null }))
        .catch(() => sendResponse({ tabId: null }));
      return true;

    case 'DISPATCH_TO_FLOW_TAB':
      dispatchToFlowTab(message.payload)
        .then((result) => sendResponse(result ?? { success: true }))
        .catch((error) =>
          sendResponse({
            success: false,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      return true;

    case 'GET_REMOTE_CONFIG':
      getRemoteConfig().then(sendResponse).catch(() => sendResponse(null));
      return true;

    case 'SET_ZOOM': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'Tab ID not found' });
        break;
      }
      chrome.tabs.setZoom(tabId, message.zoomFactor);
      sendResponse({ success: true });
      break;
    }

    case 'DOWNLOAD_VIDEO': {
      const { url, filename, folder, autoChangeFileName } = message;

      if (autoChangeFileName !== false) {
        const fullPath = folder ? `${folder}/${filename}` : filename;
        pendingDownloadNames.set(url, fullPath);

        chrome.downloads.download({ url, filename: fullPath, saveAs: false }, (downloadId) => {
          const error = chrome.runtime?.lastError;
          sendResponse(
            !error && downloadId
              ? { success: true, downloadId }
              : { success: false, error: error?.message || 'Failed to start download' }
          );
        });
      } else {
        chrome.downloads.download({ url, saveAs: false }, (downloadId) => {
          const error = chrome.runtime?.lastError;
          sendResponse(
            !error && downloadId
              ? { success: true, downloadId }
              : { success: false, error: error?.message || 'Failed to start download' }
          );
        });
      }

      return true;
    }

    case 'SET_FOLDER_NAME': {
      const { folderName, prefix, autoChangeFileName } = message;

      if (typeof folderName === 'string') {
        downloadFolder = folderName.trim() ? `${folderName.trim()}/` : '';
      }

      if (typeof prefix === 'string') {
        downloadPrefix = prefix.trim();
      }

      if (typeof autoChangeFileName === 'boolean') {
        autoRenameDownloads = autoChangeFileName;
      }

      if (autoRenameDownloads) {
        if (removeDownloadListenerTimer) {
          clearTimeout(removeDownloadListenerTimer);
          removeDownloadListenerTimer = null;
        }

        if (!chrome.downloads.onDeterminingFilename.hasListener(onDownloadDeterminingFilename)) {
          chrome.downloads.onDeterminingFilename.addListener(onDownloadDeterminingFilename);
        }
      } else {
        if (removeDownloadListenerTimer) {
          clearTimeout(removeDownloadListenerTimer);
          removeDownloadListenerTimer = null;
        }

        if (chrome.downloads.onDeterminingFilename.hasListener(onDownloadDeterminingFilename)) {
          chrome.downloads.onDeterminingFilename.removeListener(onDownloadDeterminingFilename);
        }
      }

      sendResponse({ success: true });
      break;
    }

    case 'PROMPT_GROUP_STATUS': {
      const status = message.data?.status;
      if (status === 'completed' || status === 'cancelled' || status === 'error') {
        scheduleDownloadListenerRemoval();
      }
      break;
    }

  // Clear storage + cookies (CS)
    case 'CS':
      (async () => {
        try {
          await clearSiteStorage(sender.tab?.id);
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: String(error) });
        }
      })();
      return true;

  // Attach debugger (CA)
    case 'CA': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'No tab ID' });
        break;
      }

      (async () => {
        try {
          await attachDebugger(tabId);
          try {
            await enableNetwork(tabId);
          } catch {
            // network commands are optional
          }
          sendResponse({ success: true });
        } catch (error) {
          const messageText = error instanceof Error ? error.message : String(error);
          if (!messageText.includes('already attached')) {
            sendResponse({ success: false, error: messageText });
            return;
          }
          debuggerAttachedTabs.add(tabId);
          sendResponse({ success: true });
        }
      })();
      return true;
    }

  // Detach debugger (CD)
    case 'CD': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'No tab ID' });
        break;
      }

      (async () => {
        const target = { tabId };
        try {
          if (debuggerAttachedTabs.has(tabId)) {
            await chrome.debugger.detach(target);
            debuggerAttachedTabs.delete(tabId);
          }
          sendResponse({ success: true });
        } catch (error) {
          debuggerAttachedTabs.delete(tabId);
          sendResponse({ success: false, error: String(error) });
        }
      })();
      return true;
    }

  // Insert text (CIT)
    case 'CIT': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'No tab ID' });
        break;
      }

      (async () => {
        try {
          await attachDebugger(tabId);
          await chrome.debugger.sendCommand(
            { tabId },
            'Input.insertText',
            { text: message.text }
          );
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: String(error) });
        }
      })();
      return true;
    }

  // Key event (CK)
    case 'CK': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'No tab ID' });
        break;
      }

      (async () => {
        try {
          await attachDebugger(tabId);

          const keyEvent = {
            key: message.key,
            code: message.code,
            windowsVirtualKeyCode: message.keyCode,
            nativeVirtualKeyCode: message.keyCode,
          };

          if (message.text !== undefined) {
            keyEvent.text = message.text;
            keyEvent.unmodifiedText = message.text;
          }

          if (message.modifiers !== undefined) {
            keyEvent.modifiers = message.modifiers;
          }

          if (message.keyType) {
            await chrome.debugger.sendCommand(
              { tabId },
              'Input.dispatchKeyEvent',
              { type: message.keyType, ...keyEvent }
            );
          } else {
            await chrome.debugger.sendCommand(
              { tabId },
              'Input.dispatchKeyEvent',
              { type: 'keyDown', ...keyEvent }
            );
            await chrome.debugger.sendCommand(
              { tabId },
              'Input.dispatchKeyEvent',
              { type: 'keyUp', ...keyEvent }
            );
          }

          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: String(error) });
        }
      })();
      return true;
    }

  // Hover (CH)
    case 'CH': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'No tab ID' });
        break;
      }

      (async () => {
        try {
          await attachDebugger(tabId);
          await chrome.debugger.sendCommand(
            { tabId },
            'Input.dispatchMouseEvent',
            {
              type: 'mouseMoved',
              x: message.x,
              y: message.y,
              button: 'none',
              modifiers: 0,
            }
          );
          sendResponse({ success: true });
        } catch (error) {
          const messageText = error instanceof Error ? error.message : String(error);
          sendResponse({ success: false, error: messageText });
        }
      })();
      return true;
    }

  // Click (CC)
    case 'CC': {
      const tabId = sender.tab?.id;
      if (!tabId) {
        sendResponse({ success: false, error: 'No tab ID' });
        break;
      }

      (async () => {
        const target = { tabId };
        const x = message.x;
        const y = message.y;

        const click = async () => {
          await chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
            type: 'mouseMoved',
            x,
            y,
            button: 'none',
            modifiers: 0,
          });
          await chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
            type: 'mousePressed',
            x,
            y,
            button: 'left',
            buttons: 1,
            clickCount: 1,
            modifiers: 0,
          });
          await chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
            type: 'mouseReleased',
            x,
            y,
            button: 'left',
            buttons: 0,
            clickCount: 1,
            modifiers: 0,
          });
        };

        try {
          await attachDebugger(tabId);
          await click();
          sendResponse({ success: true });
        } catch (error) {
          const messageText = error instanceof Error ? error.message : String(error);
          sendResponse({ success: false, error: messageText });
        }
      })();
      return true;
    }

    default:
      return false;
  }

  return false;
});
