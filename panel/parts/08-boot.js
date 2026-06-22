/** 08-boot.js — edit then npm run build:panel */
try {
  const oD = ((...t) => {
    const e = (Gl || (Gl = Er(Hl))).createApp(...t),
      {
        mount: n
      } = e;
    return e.mount = t => {
      const o = function(t) {
        if (We(t)) {
          return document.querySelector(t)
        }
        return t
      }(t);
      if (!o) return;
      const i = e._component;
      Ke(i) || i.render || i.template || (i.template = o.innerHTML), 1 === o.nodeType && (o.textContent = "");
      const a = n(o, !1, function(t) {
        if (t instanceof SVGElement) return "svg";
        if ("function" == typeof MathMLElement && t instanceof MathMLElement) return "mathml"
      }(o));
      return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), a
    }, e
  })(wA);
  var iD;
  (iD = oD).use(nO, {
    theme: {
      preset: UM,
      options: {
        prefix: "p",
        darkModeSelector: ".dark"
      }
    }
  });
  iD.use(HR);
  iD.use(v_);
  iD.component("PButton", DL);
  iD.component("PCard", $L);
  iD.component("PConfirmDialog", h_);
  iD.component("PDialog", s_);
  iD.component("PSelect", iB);
  iD.component("PMultiSelect", VB);
  iD.component("PInputNumber", lF);
  iD.component("PInputSwitch", xF);
  iD.component("PInputText", z_);
  iD.component("PInputTextarea", TF);
  iD.component("PSelectButton", DF);
  iD.component("PTabs", $F);
  iD.component("PTabList", WF);
  iD.component("PTab", tR);
  iD.component("PTabPanels", eR);
  iD.component("PTabPanel", oR);
  iD.component("PTag", sR);
  iD.component("PToast", VR);
  iD.component("PProgressBar", KR);
  iD.directive("tooltip", nD);
  oD.use(Fc).use(Nc);
  try {
    oD.mount("#app");
  } catch (err) {
    console.error("[VEO panel] mount failed:", err);
    const root = document.getElementById("app");
    if (root) {
      root.innerHTML = '<div style="padding:1rem;font:14px system-ui,sans-serif;color:#f87171">' +
        "<strong>Panel failed to load</strong><br>" + String(err?.message || err) +
        "<br><small>Reload extension at chrome://extensions</small></div>";
    }
  }
  if (typeof chrome !== "undefined" && chrome.runtime?.connect) {
    try {
      const port = chrome.runtime.connect({
        name: "side-panel"
      });
      port.onDisconnect.addListener(() => {
        void chrome.runtime?.lastError;
      });
    } catch (err) {
      void chrome.runtime?.lastError;
    }
  }
  self.onerror = function(msg, src, line, col, err) {
    console.error("[VEO panel]", msg, src, line, col, err);
    return false;
  };
} catch (err) {
  console.error("[VEO panel] boot failed:", err);
  const root = document.getElementById("app");
  if (root && !root.children.length) {
    root.innerHTML = '<div style="padding:1rem;font:14px system-ui,sans-serif;color:#f87171">' +
      "<strong>Panel failed to load</strong><br>" + String(err?.message || err) +
      "<br><small>Reload extension at chrome://extensions</small></div>";
  }
}
