<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { parsePrompts } from '@/utils/prompts.js';
import { usePromptOptions, useConcatDetection } from '@/composables/usePromptOptions.js';
import { useJobService } from '@/composables/useJobService.js';
import { usePlanUpgrade } from '@/composables/usePlanUpgrade.js';
import { usePanelToast } from '@/composables/usePanelToast.js';
import PromptTextarea from '@/components/widgets/PromptTextarea.vue';
import PromptDurationList from '@/components/widgets/PromptDurationList.vue';
import CharacterControl from '@/components/widgets/CharacterControl.vue';
import VoiceSpeakerControl from '@/components/widgets/VoiceSpeakerControl.vue';
import OutputCountSelect from '@/components/widgets/OutputCountSelect.vue';
import FolderNameInput from '@/components/widgets/FolderNameInput.vue';
import AutoFileNameToggle from '@/components/widgets/AutoFileNameToggle.vue';
import VideoControlFooter from '@/components/widgets/VideoControlFooter.vue';
import BugReportModal from '@/components/modals/BugReportModal.vue';

const props = defineProps({
  textToVideoForm: { type: Object, required: true },
  settings: { type: Object, required: true },
  promptGroups: { type: Array, default: () => [] },
  isClearingCache: Boolean,
});

const emit = defineEmits(['clear', 'clear-cache', 'update:has-concat']);

const { t } = useI18n();
const toast = usePanelToast();
const { sendJob, isSending } = useJobService();
const { isLimitReached, openUpgrade } = usePlanUpgrade();

const isRunning = ref(false);
const bugReportOpen = ref(false);
const characterControlRef = ref(null);
const voiceControlRef = ref(null);

const { getPromptOption, setPromptOption, setAllPromptOptions, getOptionsForPrompt, allOptions } = usePromptOptions({ optionType: 'video' });

const prompts = computed(() => parsePrompts(props.textToVideoForm.prompt));
const defaultVideoOption = computed(() => props.settings.defaultVideoOption);
const { isConcatPrompt, hasConcat } = useConcatDetection(getPromptOption, prompts, defaultVideoOption);

watch(
  hasConcat,
  (value) => emit('update:has-concat', value),
  { immediate: true },
);

function getRowBadge(index) {
  return voiceControlRef.value?.getSpeakerRowBadge?.(index) ?? null;
}

function getExtraRowBadges(index) {
  const badge = characterControlRef.value?.getCharacterRowBadge?.(index);
  return badge ? [badge] : [];
}

async function runJob() {
  if (!props.textToVideoForm.prompt.trim() || !prompts.value.length) return;

  isRunning.value = true;
  const concurrent = hasConcat.value ? 1 : props.settings.concurrentPrompts;
  const outputCount = hasConcat.value ? 1 : props.settings.outputCount;

  const payloads = prompts.value.map((prompt, index) => ({
    prompt,
    mode: 'textToVideo',
    speaker: voiceControlRef.value?.getPayloadSpeaker?.(index) ?? null,
    characters: characterControlRef.value?.getPayloadCharacters?.(index) ?? null,
    aspectRatio: props.settings.aspectRatio,
    outputCount,
    model: props.settings.model,
    videoOption: getPromptOption(index, {
      defaultPromptOption: props.settings.defaultVideoOption,
      totalPrompts: prompts.value.length,
    }),
    promptIndex: index + 1,
    autoDownloadResourceQuality: props.settings.autoDownloadVideoQuality,
    concurrentPrompts: concurrent,
    promptDelaySecondsMin: props.settings.promptDelaySecondsMin,
    promptDelaySecondsMax: props.settings.promptDelaySecondsMax,
    isConcat: isConcatPrompt(index),
    maxRetries: props.settings.maxRetries,
    autoChangeFileName: props.settings.autoChangeFileName,
    folderName: props.settings.folderName,
  }));

  try {
    await sendJob(payloads, {
      concurrentPrompts: concurrent,
      promptDelaySecondsMin: props.settings.promptDelaySecondsMin,
      promptDelaySecondsMax: props.settings.promptDelaySecondsMax,
      getGroups: () => props.promptGroups,
    });
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: t('common.errors.sendJobFailed'),
      detail: err?.message,
      life: 8000,
    });
  } finally {
    isRunning.value = false;
  }
}
</script>

<template>
  <div class="space-y-4">
    <PromptTextarea
      v-model="textToVideoForm.prompt"
      :label="$t('textToVideoControl.prompt.label')"
      :placeholder="$t('textToVideoControl.prompt.placeholder')"
      :tip="$t('textToVideoControl.prompt.tip')"
    />

    <CharacterControl ref="characterControlRef" :settings="settings" :prompts="prompts" />
    <VoiceSpeakerControl ref="voiceControlRef" :settings="settings" :prompts="prompts" />

    <PromptDurationList
      :prompts="prompts"
      :default-option="settings.defaultVideoOption"
      :get-prompt-option="getPromptOption"
      :set-prompt-option="setPromptOption"
      :set-all-prompt-options="setAllPromptOptions"
      :all-options="allOptions"
      :get-options-for-prompt="getOptionsForPrompt"
      :get-row-badge="getRowBadge"
      :get-extra-row-badges="getExtraRowBadges"
      :label="$t('common.videoModeControl.label')"
      :tip="$t('common.videoModeControl.tip')"
      :concat-label="$t('common.videoModeControl.concatLabel')"
    />

    <div class="grid grid-cols-2 gap-3">
      <OutputCountSelect :settings="settings" :has-concat="hasConcat" />
      <FolderNameInput :settings="settings" />
    </div>

    <div class="space-y-2">
      <p class="text-xs text-muted-foreground">{{ $t('textToVideoControl.advancedHint') }}</p>
      <AutoFileNameToggle :settings="settings" />
    </div>

    <VideoControlFooter
      :settings="settings"
      :prompt-groups="promptGroups"
      selected-mode="textToVideo"
      :is-clearing-cache="isClearingCache"
      :is-sending="isSending"
      :is-running="isRunning"
      :show-upgrade="isLimitReached"
      :run-label="isSending ? $t('textToVideoControl.buttons.sending') : $t('textToVideoControl.buttons.run')"
      :clear-label="$t('textToVideoControl.buttons.clear')"
      :on-run="isLimitReached ? openUpgrade : runJob"
      :on-clear="() => emit('clear')"
      :on-clear-cache="() => emit('clear-cache')"
      :on-report-bug="() => (bugReportOpen = true)"
    />

    <BugReportModal v-model:visible="bugReportOpen" />
  </div>
</template>
