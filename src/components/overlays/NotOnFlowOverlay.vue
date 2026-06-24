<script setup>
import { FLOW_URL } from '@/constants/options.js';

defineProps({
  flowUrl: { type: String, default: FLOW_URL },
});

const emit = defineEmits(['navigate']);

function openFlow() {
  emit('navigate', FLOW_URL);
}
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
    style="background: rgba(0, 0, 0, 0.25); backdrop-filter: blur(5px)"
  >
    <div class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-8 text-center max-w-sm pointer-events-auto">
      <i class="pi pi-exclamation-circle text-5xl text-yellow-500 block mb-4" />
      <p class="font-semibold text-yellow-700 dark:text-yellow-300 text-lg">
        {{ $t('notOnFlowOverlay.title') }}
      </p>
      <p class="mt-3 text-sm text-yellow-600 dark:text-yellow-400">
        {{ $t('notOnFlowOverlay.description') }}
      </p>
      <div class="mt-6">
        <PButton
          :label="$t('notOnFlowOverlay.button')"
          icon="pi pi-external-link"
          severity="warning"
          class="w-full"
          @click="openFlow"
        />
      </div>
    </div>
  </div>
</template>
