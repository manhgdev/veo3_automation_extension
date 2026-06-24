/**
 * Content script entry — labs.google Flow pages.
 * Injects upload hook and starts Flow automation.
 */
if (!globalThis.__VEO_CONTENT_SCRIPT__) {
  globalThis.__VEO_CONTENT_SCRIPT__ = true;
  import('./automation/engine.js');
}
