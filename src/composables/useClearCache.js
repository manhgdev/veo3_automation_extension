import { ref } from 'vue';
import { i18n } from '@/i18n/index.js';
import { usePanelToast } from './usePanelToast.js';
import { sendRuntimeMessage } from '@/chrome/messaging.js';

export function useClearCache() {
  const t = (key, ...args) => i18n.global.t(key, ...args);
  const toast = usePanelToast();
  const isClearing = ref(false);

  async function clearFlowCache() {
    if (isClearing.value) return;

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs?.[0];

    if (!tab?.id || !tab.url?.includes('labs.google')) {
      toast.add({
        severity: 'warn',
        summary: t('common.clearCache'),
        detail: t('common.errors.clearCacheNeedFlowTab'),
        life: 6000,
      });
      return;
    }

    isClearing.value = true;
    try {
      const response = await sendRuntimeMessage({ type: 'CS', tabId: tab.id });
      if (!response?.success) throw new Error(response?.error ?? 'Clear cache failed');
      await chrome.tabs.reload(tab.id);
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: t('common.errors.clearCacheFailed'),
        detail: err?.message,
        life: 8000,
      });
    } finally {
      isClearing.value = false;
    }
  }

  return { isClearing, clearFlowCache };
}
