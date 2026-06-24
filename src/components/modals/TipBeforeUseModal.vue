<script setup>
import { ref } from 'vue';
import { CHROME_WEB_STORE_URL } from '@shared/config.js';
import chromeLogo from '../../../logo/chrome.svg';
import edgeLogo from '../../../logo/edge.svg';

const visible = defineModel('visible', { type: Boolean, default: false });

const copied = ref(false);

async function copyInstallHint() {
  try {
    await navigator.clipboard.writeText(CHROME_WEB_STORE_URL);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // ignore
  }
}
</script>

<template>
  <PDialog
    v-model:visible="visible"
    closable
    modal
    :draggable="false"
    :style="{ width: '28rem' }"
    pt:root:class="border border-green-400/40 bg-slate-100 dark:bg-slate-800"
  >
    <template #header>
      <span class="font-semibold text-sm">{{ $t('tipBeforeUseModal.title') }}</span>
    </template>

    <div class="space-y-4 text-sm">
      <div
        class="flex items-center gap-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-3"
      >
        <div
          class="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-800"
        >
          <i class="pi pi-exclamation-circle text-green-600 dark:text-green-300 text-xl" />
        </div>
        <p class="text-xs text-foreground leading-relaxed">
          {{ $t('tipBeforeUseModal.description') }}
        </p>
      </div>

      <div class="space-y-1">
        <p class="text-xs font-medium text-muted-foreground">
          {{ $t('tipBeforeUseModal.supportedBrowsers') }}
        </p>
        <div class="flex gap-2">
          <a
            :href="CHROME_WEB_STORE_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-3 py-2 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <img :src="chromeLogo" alt="Chrome" class="w-6 h-6 flex-shrink-0" />
            <div class="min-w-0">
              <p class="font-semibold text-xs text-foreground">Google Chrome</p>
              <p class="text-xs text-muted-foreground truncate">Chrome Web Store</p>
            </div>
            <i class="pi pi-external-link text-xs text-muted-foreground ml-auto flex-shrink-0" />
          </a>

          <a
            :href="CHROME_WEB_STORE_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 relative flex items-center gap-2 rounded-lg border border-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 hover:border-blue-500 transition-colors"
          >
            <span
              class="absolute -top-2 -right-1 rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none"
            >
              {{ $t('tipBeforeUseModal.recommended') }}
            </span>
            <img :src="edgeLogo" alt="Edge" class="w-6 h-6 flex-shrink-0" />
            <div class="min-w-0">
              <p class="font-semibold text-xs text-foreground">Microsoft Edge</p>
              <p class="text-xs text-muted-foreground truncate">Chrome Web Store</p>
            </div>
            <i class="pi pi-external-link text-xs text-muted-foreground ml-auto flex-shrink-0" />
          </a>
        </div>
      </div>

      <div class="rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300/40 p-3 space-y-3">
        <p class="font-medium text-yellow-700 dark:text-yellow-300 text-xs">
          {{ $t('tipBeforeUseModal.stepsTitle') }}
        </p>
        <ol class="space-y-2 text-xs text-foreground">
          <li class="flex items-start gap-2">
            <span
              class="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 font-bold text-xs"
            >
              1
            </span>
            <span>{{ $t('tipBeforeUseModal.step1') }}</span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 font-bold text-xs"
            >
              2
            </span>
            <span>{{ $t('tipBeforeUseModal.step2') }}</span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 font-bold text-xs"
            >
              3
            </span>
            <span>{{ $t('tipBeforeUseModal.step3') }}</span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 font-bold text-xs"
            >
              4
            </span>
            <span>{{ $t('tipBeforeUseModal.step4') }}</span>
          </li>
        </ol>
        <p class="text-xs text-muted-foreground italic">
          {{ $t('tipBeforeUseModal.note') }}
        </p>
      </div>

      <div class="rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-300/40 p-3 space-y-2">
        <p class="font-medium text-blue-700 dark:text-blue-300 text-xs">
          {{ $t('tipBeforeUseModal.installTitle') }}
        </p>
        <div class="flex items-center gap-2">
          <a
            :href="CHROME_WEB_STORE_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 truncate rounded bg-white dark:bg-slate-700 border border-blue-300/40 px-2 py-1 text-xs text-muted-foreground font-mono select-all hover:text-primary hover:underline"
          >
            {{ CHROME_WEB_STORE_URL }}
          </a>
          <PButton
            :label="copied ? $t('tipBeforeUseModal.copied') : $t('tipBeforeUseModal.copyLink')"
            :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
            :severity="copied ? 'success' : 'info'"
            size="small"
            class="flex-shrink-0"
            @click="copyInstallHint"
          />
        </div>
      </div>

      <PButton
        :label="$t('tipBeforeUseModal.dismissButton')"
        icon="pi pi-check"
        severity="success"
        size="small"
        class="w-full"
        @click="visible = false"
      />
    </div>
  </PDialog>
</template>
