/** Side panel entry — shows loading, then loads the Vue bundle. CSP-safe (external script only). */
const root = document.getElementById("app");

function showPanelError(message) {
  if (!root) return;
  root.innerHTML =
    '<div style="padding:1.5rem;font:14px system-ui,sans-serif;color:#f87171;line-height:1.5">' +
    "<strong>Panel failed to load</strong><br>" +
    String(message || "Unknown error") +
    "<br><small>Reload extension at chrome://extensions → VEO → Reload</small></div>";
}

function showLoading() {
  if (!root) return;
  root.innerHTML =
    '<div id="veo-boot-status" style="padding:1.5rem;font:14px system-ui,sans-serif;color:#aaa">Loading…</div>';
}

showLoading();

window.addEventListener("error", (e) => {
  if (root?.querySelector("#veo-boot-status")) {
    showPanelError(e.message || e.error || "Unknown error");
  }
});

window.addEventListener("unhandledrejection", (e) => {
  if (root?.querySelector("#veo-boot-status")) {
    showPanelError(e.reason?.message || e.reason || "Unhandled promise rejection");
  }
});

import("./app.js").catch((err) => {
  console.error("[VEO panel] load failed:", err);
  showPanelError(err?.message || err);
});
