import { computed } from 'vue';
import { UI_CONFIG } from '@shared/config.js';
import { useAuth, useLoginModal } from './useAuth.js';
import { useDailyPromptQuota } from './useDailyPromptQuota.js';

export function usePlanUpgrade() {
  const { isLoggedIn, email, refreshPlan, isPro } = useAuth();
  const { openLogin } = useLoginModal();
  const { isExceeded } = useDailyPromptQuota();

  const isLimitReached = computed(() => {
    if (!UI_CONFIG.showPlanBanner || !UI_CONFIG.isPricingEnabled) return false;
    if (isPro.value) return false;
    return isExceeded.value;
  });

  async function openUpgrade() {
    if (!isLoggedIn.value) {
      openLogin();
      return;
    }
    await refreshPlan();
    if (isPro.value) return;

    const url = email.value
      ? `https://zivofly.com/shop/pricing?email=${encodeURIComponent(email.value)}`
      : 'https://zivofly.com/shop/pricing';

    if (chrome?.tabs?.create) chrome.tabs.create({ url });
    else window.open(url, '_blank');
  }

  return { isLimitReached, openUpgrade };
}
