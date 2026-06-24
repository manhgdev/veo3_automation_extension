<script setup>
defineProps({
  settings: { type: Object, required: true },
});
</script>

<template>
  <div class="space-y-1">
    <label class="text-xs font-semibold text-foreground">{{ $t('controlTab.folderName.label') }}</label>
    <PInputText
      v-model="settings.folderName"
      :placeholder="$t('controlTab.folderName.placeholder')"
      size="small"
      class="w-full text-sm"
    />
    <p class="text-[10px] text-muted-foreground">{{ $t('controlTab.folderName.description') }}</p>
  </div>
</template>
