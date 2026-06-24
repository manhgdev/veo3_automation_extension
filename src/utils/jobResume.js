function findResumableGroup(groups) {
  if (!groups?.length) return null;

  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group.status === 'error' || group.status === 'paused') return group;
    if (group.status === 'cancelled' && (group.processedCount ?? 0) < (group.totalCount ?? 0)) return group;
    if (group.status === 'completed' && group.results?.some((r) => !r.success)) return group;
  }
  return null;
}

/** Tự gắn groupId + resumeFrom khi gửi lại batch chưa xong. */
export function buildResumeOptions(groups, options, payloads) {
  if (options.groupId || options.resumeFrom) return options;

  const resumable = findResumableGroup(groups);
  if (!resumable || (resumable.totalCount && payloads.length !== resumable.totalCount)) return options;

  const pendingIndexes = [];
  for (let index = 0; index < (resumable.totalCount ?? payloads.length); index++) {
    const result = resumable.results?.find((r) => (r.index ?? r.promptIndex - 1) === index);
    if (!result || !result.success) pendingIndexes.push(index);
  }

  if (!pendingIndexes.length) return options;

  return {
    ...options,
    groupId: resumable.id,
    resumeFrom: {
      totalCount: resumable.totalCount ?? payloads.length,
      processedCount: resumable.results?.filter((r) => r.success).length ?? resumable.processedCount ?? 0,
      results: (resumable.results ?? []).filter((r) => r.success),
      pendingIndexes,
      promptPreviews: resumable.promptPreviews,
    },
  };
}
