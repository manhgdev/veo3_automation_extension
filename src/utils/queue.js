import { nextTick } from 'vue';

export function scrollWithin(container, target, padding = 8) {
  if (!container || !target || !container.contains(target)) return;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetTop = targetRect.top - containerRect.top + container.scrollTop;
  const targetBottom = targetTop + targetRect.height;
  const visibleTop = container.scrollTop;
  const visibleBottom = visibleTop + container.clientHeight;

  if (targetTop < visibleTop + padding) {
    container.scrollTo({ top: Math.max(0, targetTop - padding), behavior: 'smooth' });
  } else if (targetBottom > visibleBottom - padding) {
    container.scrollTo({ top: targetBottom - container.clientHeight + padding, behavior: 'smooth' });
  }
}

function findScrollableAncestor(element, root) {
  let node = element;
  while (node && node !== root) {
    if (node.classList?.contains('veo-prompt-queue-prompts') || node.classList?.contains('veo-prompt-queue-list')) {
      return node;
    }
    node = node.parentElement;
  }
  return root;
}

export function scrollQueueToActive(queueRoot, groups, getPromptStatus) {
  nextTick(() => {
    nextTick(() => {
      if (!queueRoot) return;

      const activeGroup = findActivePromptGroup(groups);
      if (!activeGroup) return;

      let scrollTarget = null;

      if (typeof activeGroup.currentPromptIndex === 'number') {
        scrollTarget = queueRoot.querySelector(
          `[data-veo-queue-prompt="${activeGroup.id}-${activeGroup.currentPromptIndex}"]`,
        );
      }
      if (!scrollTarget) {
        scrollTarget = queueRoot.querySelector(
          `[data-veo-queue-prompt-active="1"][data-veo-queue-group="${activeGroup.id}"]`,
        );
      }
      if (!scrollTarget && getPromptStatus) {
        const activeStatuses = new Set(['running', 'retrying', 'submitted']);
        for (let index = 0; index < (activeGroup.totalCount ?? 0); index++) {
          if (activeStatuses.has(getPromptStatus(activeGroup, index))) {
            scrollTarget = queueRoot.querySelector(`[data-veo-queue-prompt="${activeGroup.id}-${index}"]`);
            break;
          }
        }
      }
      if (!scrollTarget) {
        scrollTarget = queueRoot.querySelector(`[data-veo-queue-group-id="${activeGroup.id}"]`);
      }
      if (!scrollTarget) return;

      const scrollParent = findScrollableAncestor(scrollTarget, queueRoot);
      if (scrollParent) scrollWithin(scrollParent, scrollTarget);
    });
  });
}

export function findActivePromptGroup(groups) {
  if (!Array.isArray(groups) || groups.length === 0) return null;

  const terminal = new Set(['completed', 'cancelled', 'error']);

  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group.status === 'running' || group.status === 'paused') return group;
  }

  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group.downloadOnly && group.status === 'running') return group;
  }

  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group.isActive && !terminal.has(group.status)) return group;
  }

  return null;
}

export function groupOverallProgress(group, getPromptStatus, progressEntries) {
  if (!group) return null;
  if (group.status === 'completed' && !group.downloadOnly) return 100;

  const total = Math.max(1, Number(group.totalCount) || 1);
  let sum = 0;

  for (let index = 0; index < total; index++) {
    const status = getPromptStatus(group, index);
    if (status === 'completed') {
      sum += 100;
    } else if (status === 'error') {
      sum += group.status === 'completed' ? 100 : 0;
    } else if (status === 'submitted') {
      sum += 95;
    } else if (status === 'running' || status === 'retrying') {
      const entry = progressEntries.find((p) => p.groupId === group.id && p.promptIndex === index + 1);
      sum += Math.max(0, Math.min(100, Number(entry?.percentage) || 5));
    }
  }

  return Math.min(100, Math.round(sum / total));
}

export function getPromptStatus(group, promptIndex) {
  const result = group.results?.find((r) => (r.index ?? r.promptIndex - 1) === promptIndex);
  const retrying = (group.downloadRetryCountByIndex?.[promptIndex] ?? 0) > 0;

  if (group.downloadOnly && group.status === 'running') {
    if (result?.downloadComplete) return 'completed';
    if (result?.success) return retrying ? 'retrying' : 'submitted';
    if (result && !result.success) return 'error';
    return 'pending';
  }

  if (result) {
    if (result.success) {
      return result.downloadComplete || group.status === 'completed' ? 'completed' : retrying ? 'retrying' : 'submitted';
    }
    return 'error';
  }

  const hadRetry = (group.retryCountByIndex?.[promptIndex] ?? 0) > 0;
  if (group.status === 'running' && group.currentPromptIndex === promptIndex) {
    return hadRetry || retrying ? 'retrying' : 'running';
  }
  return hadRetry || retrying ? 'retrying' : 'pending';
}
