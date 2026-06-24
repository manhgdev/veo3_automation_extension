<script setup>
import { ref } from 'vue';

defineProps({
  visible: Boolean,
});

const emit = defineEmits(['update:visible', 'dismiss']);

const copied = ref(false);

async function copyInstallHint() {
  const text = window.location.origin || 'chrome://extensions';
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // ignore
  }
}

function onHide() {
  emit('update:visible', false);
  emit('dismiss');
}
</script>

<template>
  <PDialog
    :visible="visible"
    modal
    :draggable="false"
    :style="{ width: '28rem' }"
    pt:root:class="border border-green-400/40 bg-slate-100 dark:bg-slate-800"
    @update:visible="(v) => !v && onHide()"
  >
    <template #header>
      <span class="font-semibold">{{ $t('tipBeforeUseModal.title') }}</span>
    </template>

    <div class="space-y-4 text-sm">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-800">
          <i class="pi pi-exclamation-circle text-green-600 dark:text-green-300 text-xl" />
        </div>
        <p class="text-muted-foreground">{{ $t('tipBeforeUseModal.description') }}</p>
      </div>

      <div class="space-y-2">
        <p class="text-xs font-semibold">{{ $t('tipBeforeUseModal.supportedBrowsers') }}</p>
        <div class="flex gap-2">
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-3 py-2 hover:border-blue-400 transition-colors text-xs"
          >
            <span class="font-semibold">Google Chrome</span>
            <i class="pi pi-external-link text-xs ml-auto" />
          </a>
          <a
            href="https://www.microsoft.com/edge"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-3 py-2 hover:border-blue-400 transition-colors text-xs"
          >
            <span class="font-semibold">Microsoft Edge</span>
            <i class="pi pi-external-link text-xs ml-auto" />
          </a>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-xs font-semibold">{{ $t('tipBeforeUseModal.stepsTitle') }}</p>
        <ol class="list-decimal list-inside space-y-1 text-xs text-muted-foreground">
          <li>{{ $t('tipBeforeUseModal.step1') }}</li>
          <li>{{ $t('tipBeforeUseModal.step2') }}</li>
          <li>{{ $t('tipBeforeUseModal.step3') }}</li>
          <li>{{ $t('tipBeforeUseModal.step4') }}</li>
        </ol>
        <p class="text-xs text-muted-foreground">{{ $t('tipBeforeUseModal.note') }}</p>
      </div>

      <div class="rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-300/40 p-3 space-y-2">
        <p class="font-medium text-blue-700 dark:text-blue-300 text-xs">{{ $t('tipBeforeUseModal.installTitle') }}</p>
        <div class="flex items-center gap-2">
          <div class="flex-1 truncate rounded bg-white dark:bg-slate-700 border border-blue-300/40 px-2 py-1 text-xs text-muted-foreground font-mono select-all">
            chrome://extensions
          </div>
          <PButton
            :label="copied ? $t('tipBeforeUseModal.copied') : $t('tipBeforeUseModal.copyLink')"
            :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
            size="small"
            severity="secondary"
            @click="copyInstallHint"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <PButton :label="$t('tipBeforeUseModal.dismissButton')" size="small" @click="onHide" />
    </template>
  </PDialog>
</template>
