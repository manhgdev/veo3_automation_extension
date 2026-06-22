/** 04-core.js — edit then npm run build:panel */
function jc() {
  var t = ur(Uc);
  if (!t) {
    return {
      add: () => {},
      remove: () => {},
      removeGroup: () => {},
      removeAllGroups: () => {}
    };
  }
  return t
}
const Hc = Zo(!1),
  Gc = Zo(!1);
let Kc = null,
  Wc = null,
  veoRemovePromptGroupHandler = null;

function veoSetRemovePromptGroupHandler(t) {
  veoRemovePromptGroupHandler = "function" == typeof t ? t : null
}

function veoRemovePromptGroupFromQueue(t) {
  veoRemovePromptGroupHandler?.(t)
}
const qc = SETTINGS_STORAGE_KEY,
  Yc = [{
    label: "{{ $t('sidePanel.modeOptions.textToVideo.label') }}",
    value: "textToVideo",
    description: "{{ $t('sidePanel.modeOptions.textToVideo.description') }}"
  }, {
    label: "{{ $t('sidePanel.modeOptions.imageToVideo.label') }}",
    value: "imageToVideo",
    description: "{{ $t('sidePanel.modeOptions.imageToVideo.description') }}"
  }, {
    label: "{{ $t('sidePanel.modeOptions.componentsToVideo.label') }}",
    value: "componentsToVideo",
    description: "{{ $t('sidePanel.modeOptions.componentsToVideo.description') }}"
  }, {
    label: "{{ $t('sidePanel.modeOptions.textToImage.label') }}",
    value: "textToImage",
    description: "{{ $t('sidePanel.modeOptions.textToImage.description') }}"
  }, {
    label: "{{ $t('sidePanel.modeOptions.imageToImage.label') }}",
    value: "imageToImage",
    description: "{{ $t('sidePanel.modeOptions.imageToImage.description') }}"
  }, {
    label: "{{ $t('sidePanel.modeOptions.agentAutomation.label') }}",
    value: "agentAutomation",
    description: "{{ $t('sidePanel.modeOptions.agentAutomation.description') }}"
  }],
  Xc = [{
    label: "{{ $t('sidePanel.aspectRatioOptions.youtube') }}",
    value: "16:9"
  }, {
    label: "{{ $t('sidePanel.aspectRatioOptions.shortsReels') }}",
    value: "9:16"
  }, {
    label: "{{ $t('sidePanel.aspectRatioOptions.square') }}",
    value: "square"
  }, {
    label: "{{ $t('sidePanel.aspectRatioOptions.portrait') }}",
    value: "portrait"
  }, {
    label: "{{ $t('sidePanel.aspectRatioOptions.landscape') }}",
    value: "landscape"
  }];
const Zc = Zo(!1);

function Qc() {
  return {
    showLoginModal: Zc,
    showLogin: () => {
      Zc.value = !0
    }
  }
}
const td = {
    class: "absolute inset-0 flex items-center justify-center z-40 pointer-events-none",
    style: {
      background: "rgba(0, 0, 0, 0.25)",
      "backdrop-filter": "blur(5px)"
    }
  },
  ed = {
    class: "rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-8 text-center max-w-sm pointer-events-auto"
  },
  nd = {
    class: "font-semibold text-yellow-700 dark:text-yellow-300 text-lg"
  },
  od = {
    class: "mt-3 text-sm text-yellow-600 dark:text-yellow-400"
  },
  id = {
    class: "mt-6"
  },
  ad = ca({
    __name: "NotOnFlowOverlay",
    props: {
      flowUrl: {}
    },
    emits: ["navigate"],
    setup(t, {
      emit: e
    }) {
      const n = t,
        o = e,
        i = () => o("navigate", n.flowUrl);
      return (t, e) => {
        const n = _a("PButton");
        return ns(), rs("div", td, [ps("div", ed, [e[0] || (e[0] = ps("i", {
          class: "pi pi-exclamation-circle text-5xl text-yellow-500 block mb-4"
        }, null, -1)), ps("p", nd, In(t.$t("notOnFlowOverlay.title")), 1), ps("p", od, In(t.$t(
          "notOnFlowOverlay.description")), 1), ps("div", id, [bs(n, {
          label: t.$t("notOnFlowOverlay.button"),
          icon: "pi pi-external-link",
          severity: "warning",
          onClick: i
        }, null, 8, ["label"])])])])
      }
    }
  }),
  rd = {
    class: "flex items-center gap-2 text-slate-700 dark:text-slate-200"
  },
  sd = {
    class: "font-semibold text-sm"
  },
  ld = {
    key: 0,
    class: "space-y-4 text-sm"
  },
  cd = {
    class: "flex items-center gap-3"
  },
  dd = {
    class: "text-foreground font-medium"
  },
  ud = {
    class: "text-xs text-muted-foreground"
  },
  pd = {
    class: "border-t border-slate-300/30 pt-3"
  },
  bd = {
    class: "text-xs text-muted-foreground mb-2"
  },
  md = ["href"],
  gd = {
    key: 1,
    class: "space-y-4 text-sm"
  },
  fd = {
    class: "text-muted-foreground"
  },
  hd = ["href"],
  vd = ca({
    __name: "UpdateExtensionModal",
    props: {
      visible: {
        type: Boolean
      },
      isAutoUpdating: {
        type: Boolean
      }
    },
    setup(t) {
      const e = "#";
      return (n, o) => {
        const i = _a("PButton"),
          a = _a("PDialog");
        return ns(), ss(a, {
          visible: t.visible,
          closable: !1,
          modal: !0,
          draggable: !1,
          style: {
            width: "22rem"
          },
          "pt:root:class": "border border-slate-300/30 bg-slate-100 dark:bg-slate-800"
        }, {
          header: Bi(() => [ps("div", rd, [o[0] || (o[0] = ps("i", {
            class: "pi pi-sync text-xl"
          }, null, -1)), ps("span", sd, In(n.$t(t.isAutoUpdating ? "updateModal.title" :
            "updateModal.titleManual")), 1)])]),
          default: Bi(() => [t.isAutoUpdating ? (ns(), rs("div", ld, [ps("div", cd, [o[1] || (o[1] = ps("i", {
            class: "pi pi-spin pi-spinner text-2xl text-primary"
          }, null, -1)), ps("p", dd, In(n.$t("updateModal.autoUpdating")), 1)]), ps("p", ud, In(n
            .$t("updateModal.autoUpdatingHint")), 1), ps("div", pd, [ps("p", bd, In(n.$t(
            "updateModal.takingTooLong")), 1), ps("a", {
            href: ni(e),
            target: "_blank",
            rel: "noopener noreferrer",
            class: "w-full"
          }, [bs(i, {
            label: n.$t("updateModal.reinstallButton"),
            icon: "pi pi-external-link",
            severity: "success",
            size: "small",
            class: "w-full"
          }, null, 8, ["label"])], 8, md)])])) : (ns(), rs("div", gd, [ps("p", fd, In(n.$t(
            "updateModal.manualDescription")), 1), ps("a", {
            href: ni(e),
            target: "_blank",
            rel: "noopener noreferrer",
            class: "w-full"
          }, [bs(i, {
            label: n.$t("updateModal.reinstallButton"),
            icon: "pi pi-external-link",
            severity: "success",
            class: "w-full"
          }, null, 8, ["label"])], 8, hd)]))]),
          _: 1
        }, 8, ["visible"])
      }
    }
  }),
  yd = "https://zivofly.com/shop",
  kd = "auth-access-token",
  xd = "auth-email",
  wd = Zo(""),
  Cd = Zo(!0),
  Sd = Zo(!0),
  Td = Zo(!1),
  Id = Zo("");
async function Ad(t) {
  Cd.value = !0, Sd.value = !0, Id.value = ""
}
async function Ed(t) {
  Td.value = !0, Id.value = "";
  try {
    wd.value = t, Cd.value = !0, Sd.value = !0, "undefined" != typeof chrome && chrome?.storage?.local && chrome
      .storage.local.set({
        [kd]: "local-offline",
        [xd]: t
      })
  } catch {
    Id.value = "", Sd.value = !0, Cd.value = !0
  } finally {
    Td.value = !1
  }
}

function Pd() {
  "undefined" != typeof chrome && chrome?.storage?.local && chrome.storage.local.remove([kd, xd])
}

function Od() {
  wd.value = "", Cd.value = !1, Sd.value = !1, Id.value = "", Pd()
}
async function Md() {
  Cd.value = !0, Sd.value = !0, Td.value = !1
}

function Ld() {
  return {
    email: wd,
    isPro: Cd,
    isLoggedIn: Sd,
    isChecking: Td,
    error: Id,
    verifyEmail: Ed,
    logout: Od,
    refreshPlan: Md
  }
}
"undefined" != typeof chrome && chrome?.storage?.local && chrome.storage.local.get([kd, xd], async t => {
  const e = t[kd],
    n = t[xd];
  e && n && (wd.value = n, await Ad(e))
});
const _d = {
    class: "flex items-center gap-2"
  },
  Bd = {
    class: "text-sm font-semibold"
  },
  Fd = {
    class: "space-y-3"
  },
  Rd = {
    class: "text-xs text-muted-foreground"
  },
  Dd = {
    class: "space-y-1"
  },
  Vd = {
    class: "text-xs font-medium text-foreground pb-1 block"
  },
  Nd = {
    key: 0,
    class: "text-xs flex items-center gap-1.5 rounded px-2 py-1.5 bg-red-500/15 text-red-400 border border-red-500/30"
  },
  $d = ca({
    __name: "LoginModal",
    props: {
      visible: {
        type: Boolean
      }
    },
    emits: ["update:visible"],
    setup(t, {
      emit: e
    }) {
      const n = t,
        o = e,
        {
          t: i
        } = Tc(),
        {
          verifyEmail: a,
          isChecking: r,
          error: s
        } = Ld(),
        l = Zo(""),
        c = Zo(""),
        d = t => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),
        u = async () => {
          const t = l.value.trim();
          c.value = "", t ? d(t) ? (await a(t), s.value || (o("update:visible", !1), l.value = "")) : c.value = i(
            "loginModal.emailInvalid") : c.value = i("loginModal.emailRequired")
        };
      return (t, e) => {
        const a = _a("PInputText"),
          p = _a("PButton"),
          b = _a("PDialog");
        return ns(), ss(b, {
          visible: n.visible,
          modal: "",
          closable: !0,
          draggable: !1,
          style: {
            width: "300px"
          },
          pt: {
            header: {
              style: "padding: 0.6rem 1rem 0.4rem"
            },
            content: {
              style: "padding: 0.5rem 1rem"
            },
            footer: {
              style: "padding: 0 1rem 0.75rem"
            }
          },
          "onUpdate:visible": e[1] || (e[1] = t => o("update:visible", t))
        }, {
          header: Bi(() => [ps("div", _d, [e[2] || (e[2] = ps("i", {
            class: "pi pi-crown text-sm",
            style: {
              color: "#f59e0b"
            }
          }, null, -1)), ps("span", Bd, In(ni(i)("loginModal.title")), 1)])]),
          footer: Bi(() => [bs(p, {
            label: ni(i)("loginModal.submit"),
            icon: "pi pi-arrow-right",
            "icon-pos": "right",
            class: "w-full",
            size: "small",
            loading: ni(r),
            disabled: ni(r) || !d(l.value.trim()),
            onClick: u
          }, null, 8, ["label", "loading", "disabled"])]),
          default: Bi(() => [ps("div", Fd, [ps("p", Rd, In(ni(i)("loginModal.description")), 1), ps("div", Dd, [
            ps("label", Vd, In(ni(i)("loginModal.emailLabel")), 1), bs(a, {
              modelValue: l.value,
              "onUpdate:modelValue": e[0] || (e[0] = t => l.value = t),
              type: "email",
              placeholder: ni(i)("loginModal.emailPlaceholder"),
              class: "w-full",
              size: "small",
              autofocus: "",
              onKeyup: jl(u, ["enter"])
            }, null, 8, ["modelValue", "placeholder"])
          ]), c.value || ni(s) ? (ns(), rs("p", Nd, [e[3] || (e[3] = ps("i", {
            class: "pi pi-exclamation-circle shrink-0"
          }, null, -1)), gs(" " + In(c.value || ni(s)), 1)])) : fs("", !0)])]),
          _: 1
        }, 8, ["visible"])
      }
    }
  }),
  zd = "" + new URL("../logo/chrome.svg", import.meta.url).href,
  Ud = "" + new URL("../logo/edge.svg", import.meta.url).href,
  jd = {
    class: "font-semibold text-sm"
  },
  Hd = {
    class: "space-y-4 text-sm"
  },
  Gd = {
    class: "flex items-center gap-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-3"
  },
  Kd = {
    class: "text-xs text-foreground leading-relaxed"
  },
  Wd = {
    class: "space-y-1"
  },
  qd = {
    class: "text-xs font-medium text-muted-foreground"
  },
  Yd = {
    class: "flex gap-2"
  },
  Xd = {
    href: "https://www.microsoft.com/en-us/edge/download",
    target: "_blank",
    rel: "noopener noreferrer",
    class: "flex-1 relative flex items-center gap-2 rounded-lg border border-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
  },
  Jd = {
    class: "absolute -top-2 -right-1 rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none"
  },
  Zd = {
    class: "rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300/40 p-3 space-y-3"
  },
  Qd = {
    class: "font-medium text-yellow-700 dark:text-yellow-300 text-xs"
  },
  tu = {
    class: "space-y-2 text-xs text-foreground"
  },
  eu = {
    class: "flex items-start gap-2"
  },
  nu = {
    class: "flex items-start gap-2"
  },
  ou = {
    class: "flex items-start gap-2"
  },
  iu = {
    class: "flex items-start gap-2"
  },
  au = {
    class: "text-xs text-muted-foreground italic"
  },
  ru = {
    class: "rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-300/40 p-3 space-y-2"
  },
  su = {
    class: "font-medium text-blue-700 dark:text-blue-300 text-xs"
  },
  lu = {
    class: "flex items-center gap-2"
  },
  cu = "#",
  du = ca({
    __name: "TipBeforeUseModal",
    props: {
      visible: {
        type: Boolean
      }
    },
    emits: ["dismiss"],
    setup(t, {
      emit: e
    }) {
      const n = e,
        o = Zo(!1);
      async function i() {
        await navigator.clipboard.writeText(cu), o.value = !0, setTimeout(() => {
          o.value = !1
        }, 2e3)
      }
      return (e, a) => {
        const r = _a("PButton"),
          s = _a("PDialog");
        return ns(), ss(s, {
          visible: t.visible,
          closable: !0,
          modal: !0,
          draggable: !1,
          style: {
            width: "28rem"
          },
          "pt:root:class": "border border-green-400/40 bg-slate-100 dark:bg-slate-800",
          "onUpdate:visible": a[1] || (a[1] = t => {
            t || n("dismiss")
          })
        }, {
          header: Bi(() => [ps("span", jd, In(e.$t("tipBeforeUseModal.title")), 1)]),
          default: Bi(() => [ps("div", Hd, [ps("div", Gd, [a[2] || (a[2] = ps("div", {
            class: "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-800"
          }, [ps("i", {
            class: "pi pi-exclamation-circle text-green-600 dark:text-green-300 text-xl"
          })], -1)), ps("p", Kd, In(e.$t("tipBeforeUseModal.description")), 1)]), ps("div", Wd, [ps(
            "p", qd, In(e.$t("tipBeforeUseModal.supportedBrowsers")), 1), ps("div", Yd, [a[6] || (
            a[6] = ps("a", {
              href: "https://www.google.com/chrome/",
              target: "_blank",
              rel: "noopener noreferrer",
              class: "flex-1 flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-3 py-2 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            }, [ps("img", {
              src: zd,
              alt: "Chrome",
              class: "w-6 h-6 flex-shrink-0"
            }), ps("div", {
              class: "min-w-0"
            }, [ps("p", {
              class: "font-semibold text-xs text-foreground"
            }, "Google Chrome"), ps("p", {
              class: "text-xs text-muted-foreground truncate"
            }, "google.com/chrome")]), ps("i", {
              class: "pi pi-external-link text-xs text-muted-foreground ml-auto flex-shrink-0"
            })], -1)), ps("a", Xd, [ps("span", Jd, In(e.$t("tipBeforeUseModal.recommended")),
            1), a[3] || (a[3] = ps("img", {
            src: Ud,
            alt: "Edge",
            class: "w-6 h-6 flex-shrink-0"
          }, null, -1)), a[4] || (a[4] = ps("div", {
            class: "min-w-0"
          }, [ps("p", {
            class: "font-semibold text-xs text-foreground"
          }, "Microsoft Edge"), ps("p", {
            class: "text-xs text-muted-foreground truncate"
          }, "microsoft.com/edge")], -1)), a[5] || (a[5] = ps("i", {
            class: "pi pi-external-link text-xs text-muted-foreground ml-auto flex-shrink-0"
          }, null, -1))])])]), ps("div", Zd, [ps("p", Qd, In(e.$t("tipBeforeUseModal.stepsTitle")),
            1), ps("ol", tu, [ps("li", eu, [a[7] || (a[7] = ps("span", {
              class: "flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 font-bold text-xs"
            }, "1", -1)), ps("span", null, In(e.$t("tipBeforeUseModal.step1")), 1)]), ps("li",
              nu, [a[8] || (a[8] = ps("span", {
                class: "flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 font-bold text-xs"
              }, "2", -1)), ps("span", null, In(e.$t("tipBeforeUseModal.step2")), 1)]), ps("li",
              ou, [a[9] || (a[9] = ps("span", {
                class: "flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 font-bold text-xs"
              }, "3", -1)), ps("span", null, In(e.$t("tipBeforeUseModal.step3")), 1)]), ps("li",
              iu, [a[10] || (a[10] = ps("span", {
                class: "flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 font-bold text-xs"
              }, "4", -1)), ps("span", null, In(e.$t("tipBeforeUseModal.step4")), 1)])]), ps("p",
              au, In(e.$t("tipBeforeUseModal.note")), 1)
          ]), ps("div", ru, [ps("p", su, In(e.$t("tipBeforeUseModal.installTitle")), 1), ps("div", lu,
            [ps("div", {
              class: "flex-1 truncate rounded bg-white dark:bg-slate-700 border border-blue-300/40 px-2 py-1 text-xs text-muted-foreground font-mono select-all"
            }, In(cu)), bs(r, {
              label: o.value ? e.$t("tipBeforeUseModal.copied") : e.$t(
                "tipBeforeUseModal.copyLink"),
              icon: o.value ? "pi pi-check" : "pi pi-copy",
              severity: o.value ? "success" : "info",
              size: "small",
              class: "flex-shrink-0",
              onClick: i
            }, null, 8, ["label", "icon", "severity"])])]), bs(r, {
            label: e.$t("tipBeforeUseModal.dismissButton"),
            icon: "pi pi-check",
            severity: "success",
            size: "small",
            class: "w-full",
            onClick: a[0] || (a[0] = t => n("dismiss"))
          }, null, 8, ["label"])])]),
          _: 1
        }, 8, ["visible"])
      }
    }
  }),
  uu = "daily-prompt-count",
  pu = "daily-prompt-date",
  bu = Zo(0);

function mu() {
  return (new Date).toISOString().slice(0, 10)
}

function gu() {
  const t = Ds(() => 0),
    e = Ds(() => !1);
  return {
    usedToday: bu,
    percentage: t,
    isExceeded: e,
    limit: 999999
  }
}
"undefined" != typeof chrome && chrome?.storage?.local && (chrome.storage.local.get([uu, pu], t => {
  t[pu] === mu() ? bu.value = t[uu] ?? 0 : bu.value = 0
}), chrome.storage.local.onChanged.addListener(t => {
  (t[uu] || t[pu]) && chrome.storage.local.get([uu, pu], t => {
    t[pu] === mu() ? bu.value = t[uu] ?? 0 : bu.value = 0
  })
}));

function hu() {
  return {
    isPricingEnabled: Ds(() => !1)
  }
}
const vu = {
    class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 overflow-hidden"
  },
  yu = {
    key: 0,
    class: "flex items-center justify-between gap-2 px-2.5 py-1.5 bg-emerald-400 text-black text-xs font-semibold"
  },
  ku = {
    class: "flex items-center gap-1.5"
  },
  xu = {
    key: 0,
    class: "pi pi-crown text-xs"
  },
  wu = {
    key: 1,
    class: "pi pi-bolt text-xs"
  },
  Cu = ["disabled"],
  Su = {
    key: 0,
    class: "inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
  },
  Tu = {
    key: 1,
    class: "pi pi-refresh text-xs"
  },
  Iu = {
    class: "flex items-center gap-1.5"
  },
  Au = ["title"],
  Eu = ["title"],
  Pu = {
    key: 1,
    class: "flex items-center justify-between gap-2 px-2.5 py-1.5 bg-emerald-400 text-black text-xs font-semibold"
  },
  Ou = {
    key: 2,
    class: "px-2.5 pt-1.5 pb-1.5 space-y-1 bg-muted/20"
  },
  Mu = {
    class: "text-xs text-muted-foreground"
  },
  Lu = {
    class: "w-full h-2 rounded-full bg-muted/40 overflow-hidden py-0.5"
  },
  _u = {
    class: "text-center text-xs text-muted-foreground mt-0.5"
  },
  Bu = ca({
    __name: "PlanBanner",
    emits: ["show-login"],
    setup(t, {
      emit: e
    }) {
      const n = e,
        {
          t: o
        } = Tc(),
        {
          isLoggedIn: i,
          isPro: a,
          email: r,
          logout: s,
          refreshPlan: l
        } = Ld(),
        {
          showLogin: c
        } = Qc(),
        {
          usedToday: d,
          percentage: u,
          limit: p
        } = gu(),
        {
          isPricingEnabled: b
        } = hu(),
        m = Zo(!1),
        g = Ds(() => {
          if (!r.value) return "";
          const [t, e] = r.value.split("@");
          return e ? `${"*".repeat(t.length)}@${e}` : r.value
        }),
        f = async () => {
          m.value || (m.value = !0, await Promise.all([l(), new Promise(t => setTimeout(t, 1e3))]), m.value = !1)
        }, h = "https://zivofly.com/shop/pricing", v = () => {
          if (!i.value) return void c();
          const t = r.value ? `${h}?email=${encodeURIComponent(r.value)}` : h;
          "undefined" != typeof chrome && chrome?.tabs?.create ? chrome.tabs.create({
            url: t
          }) : window.open(t, "_blank")
        };
      return (t, e) => {
        const l = _a("PButton");
        return ns(), rs("div", vu, [ni(i) ? (ns(), rs("div", yu, [ps("div", ku, [ni(b) ? (ns(), rs(Xr, {
            key: 0
          }, [ni(a) ? (ns(), rs("i", xu)) : (ns(), rs("i", wu)), ni(a) ? (ns(), rs("button", {
            key: 2,
            class: "hover:opacity-70 transition-opacity text-black bg-transparent border-none cursor-pointer p-0 font-semibold",
            onClick: v
          }, In(ni(o)("planBanner.proActive")), 1)) : (ns(), rs("button", {
            key: 3,
            class: "hover:opacity-70 transition-opacity text-black bg-transparent border-none cursor-pointer p-0 font-semibold",
            onClick: v
          }, In(ni(o)("planBanner.freeUpgrade")), 1)), ni(a) ? fs("", !0) : (ns(), rs(
          "button", {
            key: 4,
            class: "inline-flex items-center gap-1 hover:opacity-70 transition-opacity text-black bg-transparent border-none cursor-pointer p-0 font-semibold",
            disabled: m.value,
            onClick: f
          }, [m.value ? (ns(), rs("span", Su)) : (ns(), rs("i", Tu)), ps("span", null, In(
            ni(o)("planBanner.refreshPlan")), 1)], 8, Cu))], 64)) : fs("", !0)]), ps("div", Iu, [e[5] || (
            e[5] = ps("i", {
              class: "pi pi-user text-xs"
            }, null, -1)), ps("span", {
            class: "max-w-[200px] truncate cursor-default select-none",
            title: ni(r),
            onMouseenter: e[0] || (e[0] = t => t.target.textContent = ni(r)),
            onMouseleave: e[1] || (e[1] = t => t.target.textContent = g.value)
          }, In(g.value), 41, Au), ps("button", {
            class: "inline-flex items-center hover:opacity-70 transition-opacity text-black bg-transparent border-none cursor-pointer p-0",
            title: ni(o)("planBanner.signOut"),
            onClick: e[2] || (e[2] = (...t) => ni(s) && ni(s)(...t))
          }, [...e[4] || (e[4] = [ps("i", {
            class: "pi pi-sign-out text-xs"
          }, null, -1)])], 8, Eu)])])) : ni(b) ? (ns(), rs("div", Pu, [ps("button", {
            class: "flex items-center gap-1.5 hover:opacity-70 transition-opacity text-black bg-transparent border-none cursor-pointer p-0 font-semibold",
            onClick: v
          }, [e[6] || (e[6] = ps("i", {
            class: "pi pi-bolt text-xs"
          }, null, -1)), ps("span", null, In(ni(o)("planBanner.notLoggedIn")), 1)]), ps("button", {
            class: "flex items-center gap-1 hover:opacity-70 transition-opacity text-black bg-transparent border-none cursor-pointer p-0 font-semibold",
            onClick: e[3] || (e[3] = t => n("show-login"))
          }, [e[7] || (e[7] = ps("i", {
            class: "pi pi-user text-xs"
          }, null, -1)), ps("span", null, In(ni(o)("planBanner.signIn")), 1)])])) : fs("", !0), ni(b) && !ni(
          a) ? (ns(), rs("div", Ou, [ps("span", Mu, In(ni(o)("planBanner.promptsToday", {
            used: ni(d),
            limit: ni(p)
          })), 1), ps("div", Lu, [ps("div", {
            class: xn(["h-full rounded-full transition-all duration-300", ni(u) >= 100 ?
              "bg-red-500" : "bg-emerald-400"
            ]),
            style: fn({
              width: `${ni(u)}%`
            })
          }, null, 6)]), bs(l, {
            label: ni(o)("planBanner.upgrade"),
            icon: "pi pi-crown",
            size: "small",
            class: "w-full",
            pt: {
              root: {
                style: "padding: 0.35rem 0.85rem; font-size: 0.75rem;"
              }
            },
            onClick: v
          }, null, 8, ["label"]), ps("p", _u, In(ni(o)("planBanner.upgradeTagline")), 1)])) : fs("", !0)
        ])
      }
    }
  });

function Fu() {
  const {
    t
  } = Tc();
  return Du({
    getOptions: () => [{
      label: t("common.durationOptions.4s"),
      value: "4s"
    }, {
      label: t("common.durationOptions.6s"),
      value: "6s"
    }, {
      label: t("common.durationOptions.8s"),
      value: "8s"
    }, {
      label: t("common.durationOptions.10s"),
      value: "10s"
    }, {
      label: t("common.durationOptions.4sConcat"),
      value: "4s-concat"
    }, {
      label: t("common.durationOptions.6sConcat"),
      value: "6s-concat"
    }, {
      label: t("common.durationOptions.8sConcat"),
      value: "8s-concat"
    }, {
      label: t("common.durationOptions.10sConcat"),
      value: "10s-concat"
    }],
    chainValue: "concat"
  })
}

function Ru() {
  const {
    t
  } = Tc();
  return Du({
    getOptions: () => [{
      label: t("common.imageModeOptions.createNew"),
      value: "new-image"
    }, {
      label: t("common.imageModeOptions.concat"),
      value: "new-image-concat"
    }],
    chainValue: "concat"
  })
}

function Du(t) {
  const e = t.chainValue,
    n = t.getOptions;
  Ds(n);
  const o = Zo({});
  return {
    promptOptions: o,
    parsePrompts: t => t ? t.split(/\n\s*\n/).map(t => t.trim()).filter(t => t.length > 0) : [],
    getPromptOption: (t, e) => {
      if (o.value[t]) return o.value[t];
      const n = e.totalPrompts,
        i = e.defaultPromptOption;
      return n > 0 && t === n - 1 && i.includes("-concat") ? i.split("-concat")[0] : i
    },
    setPromptOption: (t, e) => {
      o.value[t] = e
    },
    getOptionsForPrompt: (t, o) => {
      const i = n();
      return t === o - 1 ? i.filter(t => !t.value.includes(e)) : i
    }
  }
}

function Vu() {
  const t = Zo(!1),
    e = Zo(null);
  return {
    sendJob: async (n, o = {}) => {
      t.value = !0, e.value = null;
      o = veoBuildResumeOptions(o.getGroups?.() ?? [], o, n);
      const {
        getGroups: _g,
        ...runOpts
      } = o, i = runOpts.groupId ?? `group-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        a = runOpts.concurrentPrompts,
        r = runOpts.promptDelaySecondsMin,
        s = runOpts.promptDelaySecondsMax,
        resumeFrom = runOpts.resumeFrom;
      return new Promise((o, l) => {
        try {
          if ("undefined" != typeof window && "undefined" != typeof chrome && chrome.runtime) {
            const c = chrome,
              d = 1048576,
              h = t => new Promise((e, n) => {
                c.runtime.sendMessage({
                  type: "DISPATCH_TO_FLOW_TAB",
                  payload: t
                }, t => {
                  if (c.runtime.lastError) {
                    const t = c.runtime.lastError.message || "";
                    t.includes("Receiving end does not exist") || t.includes(
                      "Could not establish connection") ? n(new Error(Fc.global.t(
                      "common.errors.connectionError"))) : n(c.runtime.lastError)
                  } else t?.success === !1 && t?.error ? n(new Error(t.error)) : e(t)
                })
              }),
              p = async (e, n, o) => {
                  const i = JSON.stringify(n),
                    a = Math.ceil(i.length / d);
                  if (a <= 1) return await h({
                    type: e,
                    id: o,
                    data: n
                  });
                  let r = null;
                  for (let s = 0; s < a; s++) {
                    const n = i.slice(s * d, (s + 1) * d);
                    r = await h({
                      type: `${e}_CHUNK`,
                      id: o,
                      chunk: n,
                      chunkIndex: s,
                      totalChunks: a
                    })
                  }
                  return r
                },
                m = {},
                g = n.map(t => {
                  if (t.images && Array.isArray(t.images)) {
                    const e = [];
                    return t.images.forEach(t => {
                      const n = t.id || `img-${t.name}-${t.base64.length}`;
                      m[n] = {
                        base64: t.base64,
                        name: t.name
                      }, e.push(n)
                    }), {
                      ...t,
                      imageIds: e,
                      images: void 0
                    }
                  }
                  return t
                }),
                f = Object.keys(m);
            (async () => {
              try {
                const flowActive = await new Promise(e => {
                  c.runtime.sendMessage({
                    type: "IS_FLOW_PAGE_ACTIVE"
                  }, t => {
                    e(!c.runtime.lastError && !!t?.active)
                  })
                });
                if (!flowActive) throw new Error(Fc.global.t("notOnFlowOverlay.description"));
                if (f.length > 0)
                  for (const t of f) try {
                    await p("PREPARE_IMAGE", m[t], t)
                  } catch (d) {}
                const e = await h({
                  type: "AUTO_FILL_FLOW",
                  payloads: g,
                  groupId: i,
                  resumeFrom: resumeFrom,
                  concurrentPrompts: a,
                  promptDelaySecondsMin: r,
                  promptDelaySecondsMax: s
                });
                t.value = !1, async function(t = 1) {
                  if ("undefined" == typeof chrome || !chrome?.storage?.local) return;
                  const e = mu(),
                    n = await chrome.storage.local.get([uu, pu]),
                    o = (n[pu] === e ? n[uu] ?? 0 : 0) + t;
                  await chrome.storage.local.set({
                    [uu]: o,
                    [pu]: e
                  }), bu.value = o
                }(n.length), o({
                  ...e || {},
                  groupId: i
                })
              } catch (b) {
                t.value = !1, e.value = b?.message || "Unknown error", l(b)
              }
            })()
          } else t.value = !1, l(new Error("Chrome extension API not available"))
        } catch (c) {
          t.value = !1, e.value = c.message || "Failed to send message", l(c)
        }
      })
    },
    cancelJobGroup: async t => new Promise((e, n) => {
      try {
        if ("undefined" != typeof window && "undefined" != typeof chrome && chrome.runtime) {
          chrome.runtime.sendMessage({
            type: "DISPATCH_TO_FLOW_TAB",
            payload: {
              type: "CANCEL_PROMPT_GROUP",
              groupId: t
            }
          }, t => {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : t?.success === !1 && t?.error ? n(
              new Error(t.error)) : e(t)
          })
        } else n(new Error("Chrome extension API not available"))
      } catch (o) {
        n(o)
      }
    }),
    pauseJobGroup: async t => new Promise((e, n) => {
      try {
        if ("undefined" != typeof window && "undefined" != typeof chrome && chrome.runtime) {
          chrome.runtime.sendMessage({
            type: "DISPATCH_TO_FLOW_TAB",
            payload: {
              type: "PAUSE_PROMPT_GROUP",
              groupId: t
            }
          }, t => {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : t?.success === !1 && t?.error ? n(
              new Error(t.error)) : e(t)
          })
        } else n(new Error("Chrome extension API not available"))
      } catch (o) {
        n(o)
      }
    }),
    resumeJobGroup: async t => new Promise((e, n) => {
      try {
        if ("undefined" != typeof window && "undefined" != typeof chrome && chrome.runtime) {
          chrome.runtime.sendMessage({
            type: "DISPATCH_TO_FLOW_TAB",
            payload: {
              type: "RESUME_PROMPT_GROUP",
              groupId: t
            }
          }, t => {
            chrome.runtime.lastError ? n(chrome.runtime.lastError) : t?.success === !1 && t?.error ? n(
              new Error(t.error)) : e(t)
          })
        } else n(new Error("Chrome extension API not available"))
      } catch (o) {
        n(o)
      }
    }),
    isSending: t,
    error: e
  }
}
const Nu = "https://zivofly.com/shop/pricing";

function $u(t) {
  const {
    isPro: e,
    isLoggedIn: n,
    email: o,
    refreshPlan: i
  } = Ld(), {
    usedToday: a
  } = gu(), {
    showLogin: r
  } = Qc(), {
    isPricingEnabled: s
  } = hu();
  return {
    isLimitReached: Ds(() => !1),
    openUpgrade: async () => {
      if (!n.value) return void r();
      if (await i(), e.value) return;
      const t = o.value ? `${Nu}?email=${encodeURIComponent(o.value)}` : Nu;
      "undefined" != typeof chrome && chrome?.tabs?.create ? chrome.tabs.create({
        url: t
      }) : window.open(t, "_blank")
    }
  }
}

function zu({
  uploadedImages: t,
  prompts: e,
  maxImagesPerPrompt: n,
  autoAddCharacterImages: o,
  concatChecker: i
}) {
  const a = e => {
      if (!o.value) return [];
      const n = e.toLowerCase();
      return t.value.filter(t => {
        const e = t.name.replace(/\.[^/.]+$/, "").toLowerCase();
        return e && n.includes(e)
      })
    },
    r = Ds(() => {
      if (0 === e.value.length || 0 === t.value.length) return [];
      const r = [];
      let s = 0;
      for (let l = 0; l < e.value.length; l++) {
        const c = e.value[l],
          d = i?.isPromptAfterConcat(l) ?? !1,
          u = d ? 0 : n.value,
          p = [],
          b = new Set;
        if (!d && o.value)
          for (const t of a(c)) !b.has(t.id) && p.length < u && (p.push(t), b.add(t.id));
        if (!d && !o.value) {
          const e = Math.min(u, t.value.length),
            n = e - p.length;
          for (let o = 0; o < n && p.length < e; o++) {
            const e = t.value[s % t.value.length];
            b.has(e.id) || (p.push(e), b.add(e.id)), s++
          }
        }
        r.push(p)
      }
      return r
    }),
    s = Ds(() => {
      if (0 === e.value.length) return !0;
      if (o.value) return !0;
      if (0 === t.value.length) return !0;
      for (let t = 0; t < e.value.length; t++)
        if (!i?.isPromptAfterConcat(t) && 0 === (r.value[t] || []).length) return !1;
      return !0
    }),
    l = Ds(() => r.value.map((t, e) => i?.isPromptAfterConcat(e) ? null : 0 === t.length ? e + 1 : null).filter(t =>
      null !== t));
  return {
    imagesPerPrompt: r,
    hasCharacterImages: t => {
      if (!o.value) return !1;
      const n = e.value[t];
      return !!n && a(n).length > 0
    },
    allPromptsHaveImages: s,
    promptsWithoutImages: l
  }
}

function Uu({
  getPromptOption: t,
  prompts: e,
  defaultPromptOption: n
}) {
  return {
    isConcatPrompt: o => t(o, {
      defaultPromptOption: n.value,
      totalPrompts: e.value.length
    }).includes("concat"),
    isPromptAfterConcat: o => 0 !== o && t(o - 1, {
      defaultPromptOption: n.value,
      totalPrompts: e.value.length
    }).includes("concat")
  }
}
const ju = Zo([]),
  Hu = () => ({
    entries: ju,
    addEntry: t => {
      ju.value = [...ju.value, t], ju.value.length > 500 && (ju.value = ju.value.slice(-500))
    },
    clearLog: () => {
      ju.value = []
    }
  }),
  Gu = {
    class: "flex items-center gap-2 text-slate-700 dark:text-slate-200"
  },
  Ku = {
    class: "font-semibold text-sm"
  },
  Wu = {
    class: "space-y-3 text-sm"
  },
  qu = {
    class: "text-muted-foreground text-xs"
  },
  Yu = {
    class: "h-52 overflow-y-auto rounded border border-border/60 bg-black/80 p-2 font-mono text-xs leading-relaxed"
  },
  Xu = {
    key: 0,
    class: "text-muted-foreground italic"
  },
  Ju = {
    class: "opacity-50"
  },
  Zu = {
    class: "mx-1 font-bold"
  },
  Qu = {
    class: "border-t border-slate-300/30 pt-2"
  },
  tp = {
    class: "text-xs text-muted-foreground mb-2"
  },
  ep = ca({
    __name: "BugReportModal",
    props: {
      visible: {
        type: Boolean
      }
    },
    emits: ["update:visible"],
    setup(t, {
      emit: e
    }) {
      const n = e,
        {
          t: o
        } = Tc(),
        {
          entries: i
        } = Hu(),
        a = Zo(!1),
        r = Ds(() => i.value.map(t =>
          `[${new Date(t.timestamp).toISOString()}] [${t.level.toUpperCase()}] ${t.message}`).join("\n")),
        s = async () => {
          r.value && (await navigator.clipboard.writeText(r.value), a.value = !0, setTimeout(() => a.value = !1,
            2e3))
        }, l = () => window.open("https://zivofly.com/shop/?report-bugs", "_blank");
      return (e, o) => {
        const r = _a("PButton"),
          c = _a("PDialog");
        return ns(), ss(c, {
          visible: t.visible,
          modal: !0,
          draggable: !1,
          style: {
            width: "26rem"
          },
          "pt:root:class": "border border-slate-300/30 bg-slate-100 dark:bg-slate-800",
          "onUpdate:visible": o[0] || (o[0] = t => n("update:visible", t))
        }, {
          header: Bi(() => [ps("div", Gu, [o[1] || (o[1] = ps("i", {
            class: "pi pi-flag text-xl"
          }, null, -1)), ps("span", Ku, In(e.$t("bugReportModal.title")), 1)])]),
          default: Bi(() => [ps("div", Wu, [ps("p", qu, In(e.$t("bugReportModal.instruction")), 1), ps("div",
            Yu, [0 === ni(i).length ? (ns(), rs("div", Xu, In(e.$t("bugReportModal.noLogs")), 1)) :
              fs("", !0), (ns(!0), rs(Xr, null, Na(ni(i), (t, e) => (ns(), rs("div", {
                key: e,
                class: xn({
                  "text-red-400": "error" === t.level,
                  "text-yellow-400": "warn" === t.level,
                  "text-green-300": "info" === t.level
                })
              }, [ps("span", Ju, In(new Date(t.timestamp).toISOString().slice(11, 23)), 1),
                ps("span", Zu, "[" + In(t.level.toUpperCase()) + "]", 1), ps("span", null,
                  In(t.message), 1)
              ], 2))), 128))
            ]), bs(r, {
            label: a.value ? e.$t("bugReportModal.copied") : e.$t("bugReportModal.copyLogs"),
            icon: a.value ? "pi pi-check" : "pi pi-copy",
            severity: a.value ? "success" : "secondary",
            size: "small",
            class: "w-full",
            outlined: "",
            disabled: 0 === ni(i).length,
            onClick: s
          }, null, 8, ["label", "icon", "severity", "disabled"]), ps("div", Qu, [ps("p", tp, In(e.$t(
            "bugReportModal.sendHint")), 1), bs(r, {
            label: e.$t("bugReportModal.openSupport"),
            icon: "pi pi-external-link",
            severity: "warning",
            size: "small",
            class: "w-full",
            onClick: l
          }, null, 8, ["label"])])])]),
          _: 1
        }, 8, ["visible"])
      }
    }
  }),
  np = "scanned-characters";

function op({
  prompts: t,
  enableCharacterControl: e
}) {
  const n = Lc(np, []);
  return {
    characterPerPrompt: Ds(() => t.value.map(t => {
      const o = (t => {
        if (!e.value) return [];
        const o = t.toLowerCase();
        return n.data.value.filter(t => o.includes(t.toLowerCase()))
      })(t);
      return o.length > 0 ? o : null
    }))
  }
}
const ip = {
    class: "flex flex-col gap-1.5 p-2 bg-muted/20 rounded border border-border/40"
  },
  ap = {
    class: "flex items-center justify-between"
  },
  rp = {
    class: "flex items-center gap-2 flex-1"
  },
  sp = {
    class: "flex-1"
  },
  lp = {
    class: "text-xs sm:text-sm font-semibold text-foreground cursor-pointer"
  },
  cp = {
    class: "text-xs text-muted-foreground mt-0.5"
  },
  dp = {
    class: "mt-2 space-y-1.5"
  },
  up = {
    class: "text-xs text-muted-foreground block"
  },
  pp = {
    class: "flex items-center gap-2"
  },
  bp = {
    key: 0,
    class: "text-xs text-muted-foreground mt-1 italic"
  },
  mp = {
    key: 0,
    class: "text-xs text-red-500 italic"
  },
  gp = {
    key: 1,
    class: "text-xs text-muted-foreground italic"
  },
  fp = {
    key: 0,
    class: "mt-1"
  },
  hp = {
    key: 0,
    class: "mt-1.5 space-y-1"
  },
  vp = {
    class: "text-xs font-semibold text-foreground"
  },
  yp = ca({
    __name: "CharacterControl",
    props: {
      settings: {},
      prompts: {}
    },
    setup(t, {
      expose: e
    }) {
      const n = t,
        {
          t: o
        } = Tc(),
        i = Ds(() => n.prompts),
        {
          characters: a,
          isScanning: r,
          scanError: s,
          scanCharacters: l
        } = function(t) {
          const e = Zo(!1),
            n = Zo(null),
            o = Lc(np, []);
          return {
            characters: o.data,
            isScanning: e,
            scanError: n,
            scanCharacters: async () => {
              e.value = !0, n.value = null;
              try {
                const e = await new Promise(t => chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                  }, t)),
                  i = e?.[0];
                if (!i?.id) return void(n.value = "No active tab found.");
                const a = chrome,
                  r = await new Promise((t, e) => {
                    a.tabs.sendMessage(i.id, {
                      type: "SCAN_CHARACTERS"
                    }, n => {
                      a.runtime.lastError ? e(new Error(a.runtime.lastError.message)) : t(n)
                    })
                  }),
                  s = r?.characters ?? [];
                o.data.value = s;
                const l = Object.values(t.value);
                if (0 === l.length) s.length > 0 && (t.value = [s[0]]);
                else {
                  const e = l.filter(t => s.includes(t));
                  t.value = e
                }
              } catch (i) {
                n.value = i?.message ?? "Failed to scan characters."
              } finally {
                e.value = !1
              }
            }
          }
        }(si(n.settings, "defaultCharacters")),
        {
          characterPerPrompt: c
        } = op({
          prompts: i,
          enableCharacterControl: Ds(() => n.settings.enableCharacterControl)
        }),
        d = Ds(() => a.value.map(t => ({
          label: t,
          value: t
        }))),
        u = Zo(!1);
      return e({
        getCharacterRowBadge: t => {
          if (n.settings.enableCharacterControl) {
            const e = c.value[t];
            return e && e.length > 0 ? {
              icon: "pi-user",
              text: e.join(", "),
              colorClass: "text-violet-500"
            } : {
              icon: "pi-user",
              text: o("componentsToVideoControl.characterControl.noMatch"),
              colorClass: "text-muted-foreground italic"
            }
          }
          return n.settings.defaultCharacters && n.settings.defaultCharacters.length > 0 ? {
            icon: "pi-user",
            text: Object.values(n.settings.defaultCharacters).join(", "),
            colorClass: "text-violet-500"
          } : null
        },
        getPayloadCharacters: t => {
          if (n.settings.enableCharacterControl) return c.value[t] ?? null;
          const e = Object.values(n.settings.defaultCharacters);
          return e.length > 0 ? e : null
        }
      }), (e, n) => {
        const o = _a("PInputSwitch"),
          i = _a("PMultiSelect"),
          c = _a("PButton");
        return ns(), rs("div", ip, [ps("div", ap, [ps("div", rp, [n[3] || (n[3] = ps("i", {
          class: "pi pi-user text-primary text-sm"
        }, null, -1)), ps("div", sp, [ps("label", lp, In(e.$t(
          "componentsToVideoControl.characterControl.label")), 1), ps("p", cp, In(e.$t(
          "componentsToVideoControl.characterControl.description")), 1)])]), bs(o, {
          modelValue: t.settings.enableCharacterControl,
          "onUpdate:modelValue": n[0] || (n[0] = e => t.settings.enableCharacterControl = e)
        }, null, 8, ["modelValue"])]), ps("div", dp, [ps("label", up, In(e.$t(
          "componentsToVideoControl.characterControl.defaultCharacterLabel")), 1), ps("div", pp, [bs(i, {
          modelValue: t.settings.defaultCharacters,
          "onUpdate:modelValue": n[1] || (n[1] = e => t.settings.defaultCharacters = e),
          options: d.value,
          "option-label": "label",
          "option-value": "value",
          disabled: t.settings.enableCharacterControl,
          placeholder: e.$t("componentsToVideoControl.characterControl.defaultCharacterNone"),
          class: "flex-1 text-xs",
          size: "small",
          display: "chip"
        }, null, 8, ["modelValue", "options", "disabled", "placeholder"]), bs(c, {
          icon: "pi pi-search",
          label: e.$t("componentsToVideoControl.characterControl.scanButton"),
          severity: "secondary",
          text: "",
          size: "small",
          loading: ni(r),
          disabled: ni(r),
          onClick: ni(l)
        }, null, 8, ["label", "loading", "disabled", "onClick"])]), t.settings.enableCharacterControl ? (
          ns(), rs("p", bp, In(e.$t("componentsToVideoControl.characterControl.autoSelectHint")), 1)) : (
          ns(), rs(Xr, {
            key: 1
          }, [ni(s) ? (ns(), rs("p", mp, In(ni(s)), 1)) : ni(r) || 0 !== ni(a).length ? fs("", !0) : (
            ns(), rs("p", gp, In(e.$t("componentsToVideoControl.characterControl.noCharactersHint")),
              1))], 64))]), ni(a).length > 0 ? (ns(), rs("div", fp, [ps("button", {
          type: "button",
          class: "text-xs text-primary underline underline-offset-2 cursor-pointer",
          onClick: n[2] || (n[2] = t => u.value = !u.value)
        }, In(u.value ? e.$t("componentsToVideoControl.characterControl.hideCharacters") : e.$t(
          "componentsToVideoControl.characterControl.showCharacters", {
            count: ni(a).length
          })), 1), u.value ? (ns(), rs("div", hp, [(ns(!0), rs(Xr, null, Na(ni(a), t => (ns(), rs(
        "div", {
          key: t,
          class: "flex items-center gap-2 px-2 py-1 rounded bg-muted/30 border border-border/30"
        }, [n[4] || (n[4] = ps("i", {
          class: "pi pi-user text-[10px] shrink-0 text-violet-500"
        }, null, -1)), ps("span", vp, In(t), 1)]))), 128))])) : fs("", !0)])) : fs("", !0)])
      }
    }
  }),
  kp = [{
    name: "Achernar",
    gender: "Female"
  }, {
    name: "Achird",
    gender: "Male"
  }, {
    name: "Algenib",
    gender: "Male"
  }, {
    name: "Algieba",
    gender: "Male"
  }, {
    name: "Alnilam",
    gender: "Male"
  }, {
    name: "Aoede",
    gender: "Female"
  }, {
    name: "Autonoe",
    gender: "Female"
  }, {
    name: "Callirrhoe",
    gender: "Female"
  }, {
    name: "Charon",
    gender: "Male"
  }, {
    name: "Despina",
    gender: "Female"
  }, {
    name: "Enceladus",
    gender: "Male"
  }, {
    name: "Erinome",
    gender: "Female"
  }, {
    name: "Fenrir",
    gender: "Male"
  }, {
    name: "Gacrux",
    gender: "Female"
  }, {
    name: "Iapetus",
    gender: "Male"
  }, {
    name: "Kore",
    gender: "Female"
  }, {
    name: "Laomedeia",
    gender: "Female"
  }, {
    name: "Leda",
    gender: "Female"
  }, {
    name: "Orus",
    gender: "Male"
  }, {
    name: "Puck",
    gender: "Male"
  }, {
    name: "Pulcherrima",
    gender: "Ungendered"
  }, {
    name: "Rasalgethi",
    gender: "Male"
  }, {
    name: "Sadachbia",
    gender: "Male"
  }, {
    name: "Sadaltager",
    gender: "Male"
  }];

function xp({
  prompts: t,
  autoAddVoiceBySpeaker: e
}) {
  return {
    speakerPerPrompt: Ds(() => t.value.map(t => (t => {
      if (!e.value) return null;
      const n = t.toLowerCase();
      return kp.find(t => n.includes(t.name.toLowerCase())) ?? null
    })(t)))
  }
}
const wp = {
    class: "flex flex-col gap-1.5 p-2 bg-muted/20 rounded border border-border/40"
  },
  Cp = {
    class: "flex items-center justify-between"
  },
  Sp = {
    class: "flex items-center gap-2 flex-1"
  },
  Tp = {
    class: "flex-1"
  },
  Ip = {
    class: "text-xs sm:text-sm font-semibold text-foreground cursor-pointer"
  },
  Ap = {
    class: "text-xs text-muted-foreground mt-0.5"
  },
  Ep = {
    class: "mt-2"
  },
  Pp = {
    class: "text-xs text-muted-foreground mb-1 block"
  },
  Op = {
    key: 0,
    class: "text-xs text-muted-foreground mt-1 italic"
  },
  Mp = {
    key: 0,
    class: "mt-1"
  },
  Lp = {
    key: 0,
    class: "mt-1.5 space-y-1"
  },
  _p = {
    class: "text-xs font-semibold text-foreground min-w-[80px]"
  },
  Bp = {
    class: "text-xs text-muted-foreground"
  },
  Fp = ca({
    __name: "VoiceSpeakerControl",
    props: {
      settings: {},
      prompts: {}
    },
    setup(t, {
      expose: e
    }) {
      const n = t,
        {
          t: o
        } = Tc(),
        i = Ds(() => n.prompts),
        {
          speakerPerPrompt: a
        } = xp({
          prompts: i,
          autoAddVoiceBySpeaker: Ds(() => n.settings.autoAddVoiceBySpeaker)
        }),
        r = Ds(() => [{
          label: o("componentsToVideoControl.autoAddVoiceBySpeaker.defaultSpeakerNone"),
          value: "none"
        }, ...kp.map(t => ({
          label: `${t.name} - ${o(`common.speakerDescriptions.${t.name}`)}`,
          value: t.name
        }))]),
        s = Zo(!1);
      return e({
        getSpeakerRowBadge: t => {
          if (n.settings.autoAddVoiceBySpeaker) {
            const e = a.value[t];
            return e ? {
              icon: "pi-microphone",
              text: `${e.name} - ${o(`common.speakerDescriptions.${e.name}`)}`,
              colorClass: "text-green-600"
            } : {
              icon: "pi-microphone",
              text: o("componentsToVideoControl.autoAddVoiceBySpeaker.noMatch"),
              colorClass: "text-muted-foreground italic"
            }
          }
          return "none" !== n.settings.defaultSpeaker ? {
            icon: "pi-microphone",
            text: `${n.settings.defaultSpeaker} - ${o(`common.speakerDescriptions.${n.settings.defaultSpeaker}`)}`,
            colorClass: "text-primary"
          } : null
        },
        getPayloadSpeaker: t => n.settings.autoAddVoiceBySpeaker ? a.value[t]?.name ?? null : "none" !== n
          .settings.defaultSpeaker ? n.settings.defaultSpeaker : null
      }), (e, n) => {
        const o = _a("PInputSwitch"),
          i = _a("PSelect");
        return ns(), rs("div", wp, [ps("div", Cp, [ps("div", Sp, [n[3] || (n[3] = ps("i", {
            class: "pi pi-microphone text-primary text-sm"
          }, null, -1)), ps("div", Tp, [ps("label", Ip, In(e.$t(
            "componentsToVideoControl.autoAddVoiceBySpeaker.label")), 1), ps("p", Ap, In(e.$t(
            "componentsToVideoControl.autoAddVoiceBySpeaker.description")), 1)])]), bs(o, {
            modelValue: t.settings.autoAddVoiceBySpeaker,
            "onUpdate:modelValue": n[0] || (n[0] = e => t.settings.autoAddVoiceBySpeaker = e)
          }, null, 8, ["modelValue"])]), ps("div", Ep, [ps("label", Pp, In(e.$t(
            "componentsToVideoControl.autoAddVoiceBySpeaker.defaultSpeakerLabel")), 1), bs(i, {
            modelValue: t.settings.defaultSpeaker,
            "onUpdate:modelValue": n[1] || (n[1] = e => t.settings.defaultSpeaker = e),
            options: r.value,
            "option-label": "label",
            "option-value": "value",
            disabled: t.settings.autoAddVoiceBySpeaker,
            class: "w-full text-xs",
            size: "small"
          }, null, 8, ["modelValue", "options", "disabled"]), t.settings.autoAddVoiceBySpeaker ? (ns(), rs(
            "p", Op, In(e.$t(
            "componentsToVideoControl.autoAddVoiceBySpeaker.defaultSpeakerDisabledHint")), 1)) : fs("", !0)]), t
          .settings.autoAddVoiceBySpeaker ? (ns(), rs("div", Mp, [ps("button", {
            type: "button",
            class: "text-xs text-primary underline underline-offset-2 cursor-pointer",
            onClick: n[2] || (n[2] = t => s.value = !s.value)
          }, In(s.value ? e.$t("componentsToVideoControl.autoAddVoiceBySpeaker.hideSpeakers") : e.$t(
            "componentsToVideoControl.autoAddVoiceBySpeaker.showSpeakers", {
              count: ni(kp).length
            })), 1), s.value ? (ns(), rs("div", Lp, [(ns(!0), rs(Xr, null, Na(ni(kp), t => (ns(), rs(
            "div", {
              key: t.name,
              class: "flex items-center gap-2 px-2 py-1 rounded bg-muted/30 border border-border/30"
            }, [ps("i", {
              class: xn(["pi text-[10px] shrink-0", "Female" === t.gender ?
                "pi-user text-pink-500" : "Male" === t.gender ?
                "pi-user text-blue-500" : "pi-user text-muted-foreground"
              ])
            }, null, 2), ps("span", _p, In(t.name), 1), ps("span", Bp, In(e.$t(
              `common.speakerDescriptions.${t.name}`)), 1)]))), 128))])) : fs("", !0)])) : fs("", !0)
        ])
      }
    }
  }),
  Rp = {
    class: "rounded-xl border border-border/60 bg-background/70 backdrop-blur-md shadow-sm p-3 space-y-3 text-foreground"
  },
  Dp = {
    class: "flex items-center justify-between gap-2"
  },
  Vp = {
    class: "flex items-center gap-2 text-foreground"
  },
  Np = {
    class: "text-sm font-semibold tracking-wide uppercase text-foreground"
  },
  $p = {
    class: "text-xs text-muted-foreground dark:text-slate-300"
  },
  zp = ["onClick"],
  Up = {
    class: "flex-1 min-w-0 space-y-1"
  },
  jp = {
    class: "flex items-center gap-2"
  },
  Hp = {
    class: "text-xs font-semibold text-foreground truncate"
  },
  Gp = {
    class: "space-y-0.5 pl-4"
  },
  Kp = {
    class: "text-xs text-muted-foreground dark:text-slate-300"
  },
  Wp = {
    key: 0,
    class: "flex items-center gap-1 text-xs text-amber-600 dark:text-amber-200 font-medium"
  },
  qp = {
    key: 0,
    class: "border-t border-border/50 bg-background/90 px-3 py-2 space-y-1.5"
  },
  Yp = {
    class: "flex items-center gap-2"
  },
  Xp = ["title"],
  Jp = {
    class: "shrink-0 font-medium"
  },
  Zp = ["title"],
  Qp = {
    key: 0,
    class: "mt-1.5 flex items-center gap-2"
  },
  tb = {
    class: "flex-1 bg-muted rounded-full h-1.5"
  },
  qOpWrap = {
    class: "space-y-1.5"
  },
  qOpHead = {
    class: "flex items-center justify-between gap-2 text-xs"
  },
  qOpLabel = {
    class: "text-muted-foreground dark:text-slate-300"
  },
  qOpVal = {
    class: "font-semibold tabular-nums text-primary"
  },
  qOpTrack = {
    class: "h-2 bg-muted rounded-full overflow-hidden"
  },
  qOpFill = {
    class: "h-full bg-primary transition-all duration-300 rounded-full"
  },
  qRecovBanner = {
    class: "flex items-center gap-2 rounded-lg border border-orange-300/60 bg-orange-50 dark:bg-orange-950/40 px-3 py-2 text-xs text-orange-800 dark:text-orange-200"
  },
  eb = ca({
    __name: "PromptGroupQueue",
    props: {
      promptGroups: {},
      setHeight: {
        default: "max-h-[1500px] min-h-[300px]"
      }
    },
    setup(t) {
      const e = t,
        {
          t: n
        } = Tc(),
        o = Zo(null),
        {
          generationProgress: i
        } = zc(),
        a = Ds(() => n("controlTab.promptGroups.countLabel", {
          count: e.promptGroups.length
        }));
      Rr(() => e.promptGroups.length, (t, n) => {
        if (t > (n ?? 0)) {
          const t = e.promptGroups[e.promptGroups.length - 1];
          t && (o.value = t.id)
        }
      });
      const {
        cancelJobGroup: veoCancelGroupFn,
        pauseJobGroup: veoPauseGroupFn,
        resumeJobGroup: veoResumeGroupFn
      } = Vu(), veoQueueToast = jc(), veoQueueGroupAction = async (t, e) => {
          try {
            await t(e)
          } catch (o) {
            veoQueueToast.add({
              severity: "error",
              summary: n("common.errors.sendJobFailed"),
              detail: o?.message,
              life: 8e3
            })
          }
        }, veoCancelGroup = t => {
          veoCancelGroupFn(t)
        }, veoDeleteGroup = t => {
          o.value === t && (o.value = null), veoRemovePromptGroupFromQueue(t)
        }, veoPauseGroup = t => {
          veoQueueGroupAction(veoPauseGroupFn, t)
        }, veoResumeGroup = t => {
          veoQueueGroupAction(veoResumeGroupFn, t)
        }, l = (t, e) => {
          const n = t.results?.find(t => (t.index ?? t.promptIndex - 1) === e),
            o = (t.downloadRetryCountByIndex?.[e] ?? 0) > 0;
          if (n) return n.success ? n.downloadComplete || "completed" === t.status ? "completed" : o ? "retrying" :
            "submitted" : "error";
          const i = (t.retryCountByIndex?.[e] ?? 0) > 0;
          return "running" === t.status && t.currentPromptIndex === e ? i || o ? "retrying" : "running" : i || o ?
            "retrying" : "pending"
        }, c = {
          queued: "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600",
          running: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700",
          paused: "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700",
          completed: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700",
          cancelled: "bg-slate-200 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600",
          error: "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-700"
        }, d = {
          pending: "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-600",
          running: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-200 border-amber-200 dark:border-amber-700",
          retrying: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200 border-orange-200 dark:border-orange-700",
          submitted: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700",
          completed: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700",
          error: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-200 border-rose-200 dark:border-rose-700"
        }, u = t => n(`controlTab.promptGroups.status.${t}`), p = (t, e, o) => {
          if ("retrying" === t && e && void 0 !== o) {
            const t = ((t, e) => t.downloadRetryCountByIndex?.[e] ?? 0)(e, o);
            return n("controlTab.promptGroups.promptStatus.retrying", {
              n: t
            })
          }
          return n(`controlTab.promptGroups.promptStatus.${t}`)
        }, b = (t, e) => i.value.find(n => n.groupId === t && n.promptIndex === e) ?? null,
        _ = (t, e) => {
          const n = b(t, e);
          return n && "number" == typeof n.percentage ? n : null
        },
        w = t => Math.max(0, Number(t.totalCount) || 0),
        m = veoPersistResize("veo-ui-queue-height"),
        g = Ds(() => {
          const t = e.promptGroups.find(t => t.isActive || "running" === t.status || "paused" === t.status);
          return t ? veoGroupOverallProgress(t, l, i.value) : null
        }),
        v = Ds(() => null != g.value),
        y = Ds(() => e.promptGroups.some(t => t.recoveryPassActive));
      const veoUserQueueScrollingUntil = Zo(0);
      let veoQueueScrollEl = null;
      const veoOnQueueScroll = () => {
        veoUserQueueScrollingUntil.value = Date.now() + 4e3
      };
      const veoBindQueueScrollGuard = () => {
        Si(() => {
          const t = m.value?.$el ?? m.value;
          if (!t || t === veoQueueScrollEl) return;
          veoQueueScrollEl?.removeEventListener("scroll", veoOnQueueScroll), veoQueueScrollEl = t, t
            .addEventListener("scroll", veoOnQueueScroll, {
              passive: !0
            })
        })
      };
      Ca(veoBindQueueScrollGuard), Rr(m, veoBindQueueScrollGuard, {
        flush: "post"
      }), Aa(() => {
        veoQueueScrollEl?.removeEventListener("scroll", veoOnQueueScroll), veoQueueScrollEl = null
      });
      const veoScrollToActiveInQueue = () => {
        if (Date.now() < veoUserQueueScrollingUntil.value) return;
        const t = e.promptGroups.find(t => t.isActive || "running" === t.status || "paused" === t
          .status);
        if (t && o.value && o.value !== t.id) return;
        veoScrollQueueToActive(m, e.promptGroups, l)
      };
      Rr(() => {
        const t = e.promptGroups.find(t => t.isActive || "running" === t.status || "paused" === t.status);
        return t?.id ?? null
      }, (activeId, prevActiveId) => {
        if (activeId && activeId !== prevActiveId) o.value = activeId;
        veoScrollToActiveInQueue()
      }, {
        flush: "post"
      });
      Rr(() => {
        const t = e.promptGroups.find(t => t.isActive || "running" === t.status || "paused" === t.status);
        return t ? `${t.id}:${t.currentPromptIndex ?? ""}` : null
      }, (t, n) => {
        t !== n && veoScrollToActiveInQueue()
      }, {
        flush: "post"
      });
      return (e, i) => {
        const r = _a("PButton");
        return ns(), rs("div", Rp, [ps("div", Dp, [ps("div", Vp, [i[1] || (i[1] = ps("i", {
            class: "pi pi-list-check text-sm text-primary"
          }, null, -1)), ps("span", Np, In(ni(n)("controlTab.promptGroups.title")), 1)]), ps("span", $p, In(
            a.value), 1)]), v.value ? (ns(), rs("div", qOpWrap, [ps("div", qOpHead, [ps("span", qOpLabel, In(ni(
            n)("controlTab.promptGroups.overallProgress")), 1), ps("span", qOpVal, In(g.value) + "%",
            1)]), ps("div", qOpTrack, [ps("div", {
            class: "h-full bg-primary transition-all duration-300 rounded-full",
            style: fn(`width: ${g.value}%`)
          }, null, 4)])])) : fs("", !0), y.value ? (ns(), rs("div", qRecovBanner, [i[3] || (i[3] = ps("i", {
            class: "pi pi-replay text-sm"
          }, null, -1)), ps("span", null, In(ni(n)("controlTab.promptGroups.recoveryPass")), 1)])) : fs("", !0),
          ps("div", {
            ref_key: "queueListRef",
            ref: m,
            class: "veo-prompt-queue-list text-muted-foreground dark:text-slate-300"
          }, [ps("div", {
            class: "space-y-2"
          }, [(ns(!0), rs(Xr, null, Na(t.promptGroups, t => {
            return ns(), rs("div", {
              key: t.id,
              "data-veo-queue-group-id": t.id,
              class: xn([
                "rounded-lg border border-border/50 bg-background/80 text-xs transition hover:border-primary/40 text-foreground overflow-hidden",
                {
                  "border-primary/60 bg-primary/5 shadow-sm": t.isActive
                }
              ])
            }, [ps("div", {
              class: "flex items-start justify-between gap-3 px-3 py-2 cursor-pointer",
              onClick: e => {
                return n = t.id, void(o.value = o.value === n ? null : n);
                var n
              }
            }, [ps("div", Up, [ps("div", jp, [ps("i", {
              class: xn(["pi text-xs transition-transform", o.value === t.id ?
                "pi-chevron-down" : "pi-chevron-right"
              ])
            }, null, 2), ps("span", Hp, In(t.id), 1), ps("span", {
              class: xn([
                "px-2 py-0.5 rounded-full text-xs font-semibold capitalize",
                c[t.status] || c.queued
              ])
            }, In(u(t.status)), 3)]), ps("div", Gp, [ps("span", Kp, In(ni(n)(
                "controlTab.promptGroups.itemsLabel", {
                  processed: t.processedCount,
                  total: t.totalCount
                })), 1), void 0 !== t.delayRemainingSeconds && t
              .delayRemainingSeconds > 0 ? (ns(), rs("div", Wp, [i[2] || (i[2] =
                ps("i", {
                  class: "pi pi-clock text-xs"
                }, null, -1)), ps("span", null, In(ni(n)(
                "controlTab.promptGroups.delayCountdown", {
                  seconds: t.delayRemainingSeconds
                })), 1)])) : fs("", !0)
            ])]), ps("div", {
              class: "flex flex-row flex-wrap gap-1 justify-end",
              onClick: i[0] || (i[0] = zl(() => {}, ["stop"]))
            }, ["paused" === t.status ? (ns(), ss(r, {
                key: "resume",
                size: "small",
                label: ni(n)("common.resume"),
                severity: "warning",
                icon: "pi pi-play",
                text: "",
                onClick: e => veoResumeGroup(t.id)
              }, null, 8, ["label", "onClick"])) : fs("", !0), "running" === t
              .status || "queued" === t.status ? (ns(), ss(r, {
                key: "pause",
                size: "small",
                label: ni(n)("common.pause"),
                severity: "secondary",
                icon: "pi pi-pause",
                text: "",
                onClick: e => veoPauseGroup(t.id)
              }, null, 8, ["label", "onClick"])) : fs("", !0), "queued" === t.status ?
              (ns(), ss(r, {
                key: "remove",
                size: "small",
                label: ni(n)("controlTab.promptGroups.actions.remove"),
                severity: "secondary",
                text: "",
                onClick: e => veoCancelGroup(t.id)
              }, null, 8, ["label", "onClick"])) : fs("", !0), "running" === t
              .status || "paused" === t.status ? (ns(), ss(r, {
                key: "stop",
                size: "small",
                label: ni(n)("controlTab.promptGroups.actions.stop"),
                severity: "danger",
                text: "",
                onClick: e => veoCancelGroup(t.id)
              }, null, 8, ["label", "onClick"])) : fs("", !0), "completed" === t.status ||
              "cancelled" === t.status || "error" === t.status ? (ns(), ss(r, {
                key: "delete",
                size: "small",
                label: ni(n)("controlTab.promptGroups.actions.remove"),
                severity: "secondary",
                icon: "pi pi-trash",
                text: "",
                onClick: e => veoDeleteGroup(t.id)
              }, null, 8, ["label", "onClick"])) : fs("", !0)
            ])], 8, zp), o.value === t.id ? (ns(), rs("div", qp, ["error" === t.status && t
              .errorMessage ? (ns(), rs("div", {
                key: "err",
                class: "mx-2 mb-2 rounded border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 px-2 py-1.5 text-xs text-rose-700 dark:text-rose-200"
              }, In(t.errorMessage), 1)) : fs("", !0), 0 === w(t) ? (ns(), rs("div", {
                key: "empty",
                class: "px-2 py-1.5 text-xs text-muted-foreground"
              }, In("Không có prompt trong nhóm này."), 1)) : (ns(), rs("div", {
                key: "list",
                class: "veo-prompt-queue-prompts",
                "data-veo-queue-prompts": t.id
              }, [(ns(!0), rs(Xr, null, Na(w(t), promptIdx => {
                const prog = _(t.id, promptIdx),
                  pi = promptIdx - 1,
                  st = l(t, pi) || "pending",
                  active = t.currentPromptIndex === pi || ["running",
                    "retrying", "submitted"
                  ].includes(st);
                return ns(), rs("div", {
                  key: promptIdx,
                  "data-veo-queue-group": t.id,
                  "data-veo-queue-prompt": `${t.id}-${pi}`,
                  "data-veo-queue-prompt-active": active ? "1" : null,
                  class: xn([
                    "flex flex-col rounded px-2 py-1.5 border text-xs",
                    d[st] || d.pending
                  ])
                }, [ps("div", Yp, [ps("i", {
                    class: xn(["pi w-4 shrink-0", {
                      "pi-clock": "pending" === st,
                      "pi-spin pi-spinner": ("running" ===
                        st || "retrying" === st && !t
                        .results?.find(r => (r.index ?? r
                          .promptIndex - 1) === pi)
                        ?.success),
                      "pi-download": "submitted" === st ||
                        "retrying" === st && !!t.results
                        ?.find(r => (r.index ?? r
                          .promptIndex - 1) === pi)
                        ?.success,
                      "pi-check-circle": "completed" === st,
                      "pi-times-circle": "error" === st
                    }])
                  }, null, 2), ps("span", {
                    class: "flex-1 min-w-0 truncate",
                    title: t.promptPreviews?.[pi]
                  }, In(t.promptPreviews?.[pi] ||
                    `Prompt ${promptIdx}`), 9, Xp), ps("span", Jp,
                    In(p(st, t, pi)), 1), "error" === st ? (ns(),
                    rs("span", {
                      key: 0,
                      class: "shrink-0 max-w-24 text-xs text-rose-600 dark:text-rose-200",
                      title: t.results?.find(r => (r.index ?? r
                        .promptIndex - 1) === pi)?.error
                    }, In(t.results?.find(r => (r.index ?? r
                      .promptIndex - 1) === pi)?.error), 9, Zp)) :
                  fs("", !0)
                ]), prog ? (ns(), rs("div", Qp, [ps("div", tb, [ps(
                  "div", {
                    class: xn([
                      "h-1.5 rounded-full transition-all duration-300",
                      "error" === st ? "bg-rose-500" :
                      "completed" === st ||
                      "completed" === prog.status ?
                      "bg-green-500" : "bg-primary"
                    ]),
                    style: fn(
                      `width: ${Number(prog.percentage) || 0}%`
                      )
                  }, null, 6)]), ps("span", {
                    class: xn(["shrink-0 font-bold text-xs",
                      "error" === st ? "text-rose-500" :
                      "completed" === st || "completed" ===
                      prog.status ? "text-green-500" :
                      "text-primary"
                    ])
                  }, In(String(Number(prog.percentage) || 0)) +
                  "% ", 3)])) : fs("", !0)], 2)
              }), 128))], 2))
            ], 2)) : fs("", !0)], 2)
          }), 128))]), ])
        ])
      }
    }
  }),
  nb = {
    class: "flex-1 rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
  },
  ob = {
    class: "flex items-center gap-2 mb-2"
  },
  ib = {
    class: "text-xs sm:text-sm font-semibold text-foreground"
  },
  ab = {
    class: "mt-1.5 text-xs text-muted-foreground"
  },
  rb = ca({
    __name: "OutputCountSelect",
    props: {
      settings: {},
      hasConcat: {
        type: Boolean
      },
      maxCount: {},
      countField: {}
    },
    setup(t) {
      const e = t,
        n = Ds(() => e.countField ?? "outputCount"),
        o = Ds({
          get: () => e.hasConcat ? 1 : e.settings[n.value],
          set: t => {
            e.hasConcat || (e.settings[n.value] = t)
          }
        }),
        i = Ds(() => Array.from({
          length: e.maxCount ?? 1
        }, (t, e) => ({
          label: String(e + 1),
          value: e + 1
        })));
      return (e, n) => {
        const a = _a("PSelect");
        return ns(), rs("div", nb, [ps("div", ob, [n[1] || (n[1] = ps("i", {
          class: "pi pi-list text-primary text-sm"
        }, null, -1)), ps("label", ib, In(e.$t("settingsTab.outputCount.label")), 1)]), bs(a, {
          modelValue: o.value,
          "onUpdate:modelValue": n[0] || (n[0] = t => o.value = t),
          options: i.value,
          "option-label": "label",
          "option-value": "value",
          disabled: t.hasConcat,
          class: "w-full"
        }, null, 8, ["modelValue", "options", "disabled"]), ps("p", ab, In(e.$t(
          "settingsTab.outputCount.description")), 1)])
      }
    }
  }),
  sb = {
    class: "flex-1 rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
  },
  lb = {
    class: "flex items-center gap-2 mb-2"
  },
  cb = {
    class: "text-xs sm:text-sm font-semibold text-foreground"
  },
  db = {
    class: "mt-1.5 text-xs text-muted-foreground"
  },
  ub = ca({
    __name: "FolderNameInput",
    props: {
      settings: {}
    },
    setup: t => (e, n) => {
      const o = _a("PInputText");
      return ns(), rs("div", sb, [ps("div", lb, [n[1] || (n[1] = ps("i", {
        class: "pi pi-folder text-primary text-sm"
      }, null, -1)), ps("label", cb, In(e.$t("controlTab.folderName.label")), 1)]), bs(o, {
        modelValue: t.settings.folderName,
        "onUpdate:modelValue": n[0] || (n[0] = e => t.settings.folderName = e),
        placeholder: e.$t("controlTab.folderName.placeholder"),
        class: "w-full",
        size: "small"
      }, null, 8, ["modelValue", "placeholder"]), ps("p", db, In(e.$t("controlTab.folderName.description")),
        1)])
    }
  }),
  pb = {
    class: "flex items-center justify-between mt-2 pt-2 border-t border-border/40"
  },
  bb = {
    class: "text-xs text-muted-foreground"
  },
  mb = ca({
    __name: "AutoChangeFileNameToggle",
    props: {
      settings: {}
    },
    setup: t => (e, n) => {
      const o = _a("PInputSwitch");
      return ns(), rs("div", pb, [ps("span", bb, In(e.$t("controlTab.autoChangeFileName")), 1), bs(o, {
        modelValue: t.settings.autoChangeFileName,
        "onUpdate:modelValue": n[0] || (n[0] = e => t.settings.autoChangeFileName = e)
      }, null, 8, ["modelValue"])])
    }
  });

function gb(t) {
  return !(!t.file?.type.startsWith("video/") && !t.base64.startsWith("data:video/"))
}

function fb(t) {
  if (!t || 0 === t.length) return "none";
  const e = t.some(gb);
  return t.some(t => !gb(t)) && e ? "both" : e ? "video-only" : "image-only"
}
const hb = {
    key: 0,
    class: "space-y-2"
  },
  vb = {
    class: "text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2"
  },
  yb = {
    class: "grid gap-2 veo-prompt-mode-list"
  },
  kb = {
    class: "flex items-center gap-2"
  },
  xb = {
    class: "flex-1 min-w-0"
  },
  wb = {
    class: "text-xs text-foreground truncate"
  },
  Cb = {
    class: "text-xs text-muted-foreground"
  },
  Sb = {
    key: 0,
    class: "flex gap-2 flex-wrap"
  },
  Tb = {
    key: 0,
    class: "relative rounded border border-dashed border-primary/60 overflow-hidden bg-primary/10 aspect-square w-12 h-12 flex-shrink-0"
  },
  Ib = {
    class: "w-full h-full flex flex-col items-center justify-center p-1"
  },
  Ab = {
    class: "text-[8px] text-primary font-semibold text-center leading-tight"
  },
  Eb = ["src"],
  Pb = ["src", "alt"],
  Ob = {
    class: "absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-0.5 truncate flex items-center gap-0.5"
  },
  Mb = {
    key: 0,
    class: "pi pi-video text-[9px] mr-0.5 flex-shrink-0"
  },
  Lb = {
    key: 1,
    class: "flex gap-2"
  },
  _b = {
    class: "relative rounded border border-dashed border-primary/60 overflow-hidden bg-primary/10 aspect-square w-12 h-12 flex-shrink-0"
  },
  Bb = {
    class: "w-full h-full flex flex-col items-center justify-center p-1"
  },
  Fb = {
    class: "text-[8px] text-primary font-semibold text-center leading-tight"
  },
  Rb = {
    key: 2,
    class: "flex items-center gap-2 p-2 bg-warning/10 border border-warning/30 rounded text-xs text-warning"
  },
  Db = {
    key: 3,
    class: "text-xs text-warning italic"
  },
  Vb = {
    key: 0,
    class: "flex gap-2"
  },
  Nb = {
    class: "relative rounded border border-dashed border-primary/60 overflow-hidden bg-primary/10 aspect-square w-12 h-12 flex-shrink-0"
  },
  $b = {
    class: "w-full h-full flex flex-col items-center justify-center p-1"
  },
  zb = {
    class: "text-[8px] text-primary font-semibold text-center leading-tight"
  },
  Ub = {
    class: "text-xs text-muted-foreground italic"
  };

function veoPersistResize(t) {
  const e = Zo(null);
  let n = null,
    o = null;
  const i = async () => {
    await Si();
    const a = e.value?.$el ?? e.value;
    if (!a) return;
    n && (n.disconnect(), n = null);
    if ("undefined" != typeof chrome && chrome?.storage?.local) {
      const r = await chrome.storage.local.get(t),
        s = r[t];
      "number" == typeof s && s > 0 && (a.style.height = `${s}px`)
    }
    n = new ResizeObserver(() => {
      clearTimeout(o), o = setTimeout(() => {
        const e = a.offsetHeight;
        e > 0 && chrome?.storage?.local && chrome.storage.local.set({
          [t]: e
        }).catch(() => {})
      }, 200)
    }), n.observe(a)
  };
  return Ca(i), Rr(e, () => {
    i()
  }, {
    flush: "post"
  }), Aa(() => {
    n?.disconnect(), n = null, clearTimeout(o), o = null
  }), e
}

function veoScrollWithin(t, e, n = 8) {
  if (!t || !e || !t.contains(e)) return;
  const o = t.getBoundingClientRect(),
    i = e.getBoundingClientRect(),
    a = i.top - o.top + t.scrollTop,
    r = a + i.height,
    s = t.scrollTop,
    l = s + t.clientHeight;
  a < s + n ? t.scrollTo({
    top: Math.max(0, a - n),
    behavior: "smooth"
  }) : r > l - n && t.scrollTo({
    top: r - t.clientHeight + n,
    behavior: "smooth"
  })
}

function veoFindScrollableAncestor(t, e) {
  let n = t;
  for (; n && n !== e;) {
    if (n.classList?.contains("veo-prompt-queue-prompts") || n.classList?.contains("veo-prompt-queue-list")) return n;
    n = n.parentElement
  }
  return e
}

function veoScrollQueueToActive(t, e, n) {
  Si(() => {
    Si(() => {
      const o = t.value?.$el ?? t.value;
      if (!o) return;
      const i = e?.find(t => t.isActive || "running" === t.status || "paused" === t.status);
      if (!i) return;
      let a = null;
      if ("number" == typeof i.currentPromptIndex && (a = o.querySelector(
          `[data-veo-queue-prompt="${i.id}-${i.currentPromptIndex}"]`)), !a && (a = o.querySelector(
          `[data-veo-queue-prompt-active="1"][data-veo-queue-group="${i.id}"]`)), !a) {
        const t = e => "running" === e || "retrying" === e || "submitted" === e;
        if (n)
          for (let e = 0; e < (i.totalCount ?? 0); e++)
            if (t(n(i, e))) {
              a = o.querySelector(`[data-veo-queue-prompt="${i.id}-${e}"]`);
              break
            }
      }
      a || (a = o.querySelector(`[data-veo-queue-group-id="${i.id}"]`));
      if (!a) return;
      const r = veoFindScrollableAncestor(a, o);
      r && veoScrollWithin(r, a)
    })
  })
}

function veoGroupOverallProgress(t, e, n) {
  if ("completed" === t.status) return 100;
  const o = Math.max(1, Number(t.totalCount) || 1);
  let i = 0;
  for (let a = 0; a < o; a++) {
    const r = e(t, a);
    "completed" === r || "error" === r ? i += 100 : "submitted" === r ? i += 95 : "running" === r || "retrying" === r ?
      i += Math.max(0, Math.min(100, Number(n.find(e => e.groupId === t.id && e.promptIndex === a + 1)?.percentage) ||
        5)) : i += 0
  }
  return Math.min(100, Math.round(i / o))
}

function veoFindResumableGroup(t) {
  if (!t?.length) return null;
  for (let e = t.length - 1; e >= 0; e--) {
    const n = t[e];
    if ("error" === n.status || "paused" === n.status) return n;
    if ("cancelled" === n.status && (n.processedCount ?? 0) < (n.totalCount ?? 0)) return n;
    if ("completed" === n.status && n.results?.some(t => !t.success)) return n
  }
  return null
}

function veoBuildResumeOptions(t, e, n) {
  if (e.groupId || e.resumeFrom) return e;
  const o = veoFindResumableGroup(t);
  if (!o || o.totalCount && n.length !== o.totalCount) return e;
  const i = [];
  for (let a = 0; a < (o.totalCount ?? n.length); a++) {
    const t = o.results?.find(t => (t.index ?? t.promptIndex - 1) === a);
    (!t || !t.success) && i.push(a)
  }
  return i.length ? {
    ...e,
    groupId: o.id,
    resumeFrom: {
      totalCount: o.totalCount ?? n.length,
      processedCount: o.results?.filter(t => t.success).length ?? o.processedCount ?? 0,
      results: (o.results ?? []).filter(t => t.success),
      pendingIndexes: i,
      promptPreviews: o.promptPreviews
    }
  } : e
}
const jb = ca({
  __name: "PromptDurationControl",
  props: {
    prompts: {},
    defaultPromptOption: {},
    label: {},
    tip: {},
    concatLabel: {},
    getPromptOption: {
      type: Function
    },
    setPromptOption: {
      type: Function
    },
    getOptionsForPrompt: {
      type: Function
    },
    imagesPerPrompt: {},
    showRowWarning: {
      type: Function
    },
    rowWarningText: {},
    chainValue: {},
    chainIndicatorText: {},
    noImagesWarningText: {},
    showNoImagesWarning: {
      type: Function
    },
    getRowBadge: {
      type: Function
    },
    getExtraRowBadges: {
      type: Function
    }
  },
  setup(t) {
    const e = t,
      n = () => e.chainValue ?? "concat",
      o = () => e.chainIndicatorText ?? "Last Frame",
      i = t => e.getPromptOption(t, {
        defaultPromptOption: e.defaultPromptOption,
        totalPrompts: e.prompts.length
      }),
      a = t => t > 0 && e.getPromptOption(t - 1, {
        defaultPromptOption: e.defaultPromptOption,
        totalPrompts: e.prompts.length
      }).includes(n()),
      r = t => !!e.imagesPerPrompt && e.imagesPerPrompt[t]?.length > 0,
      s = t => !!e.noImagesWarningText && (e.showNoImagesWarning?.(t) ?? !0),
      l = veoPersistResize("veo-ui-mode-list-height");
    return (e, c) => {
      const d = _a("PSelect");
      return t.prompts.length > 0 ? (ns(), rs("div", hb, [ps("label", vb, [c[0] || (c[0] = ps("i", {
        class: "pi pi-clock flex-shrink-0"
      }, null, -1)), ps("span", null, In(t.label), 1)]), ps("div", {
        ref_key: "modeListRef",
        ref: l,
        class: "veo-prompt-mode-list"
      }, [ps("div", {
        class: "grid gap-2"
      }, [(ns(!0), rs(Xr, null, Na(t.prompts, (e, u) => (ns(), rs("div", {
        key: u,
        class: "p-1.5 bg-muted/30 rounded border space-y-1"
      }, [ps("div", kb, [bs(d, {
          "model-value": i(u),
          options: t.getOptionsForPrompt(u, t.prompts.length),
          "option-label": "label",
          "option-value": "value",
          class: "text-xs w-35 sm:w-35 flex-shrink-0",
          size: "small",
          "onUpdate:modelValue": e => t.setPromptOption(u, e)
        }, null, 8, ["model-value", "options", "onUpdate:modelValue"]), ps("div",
          xb, [
            ps("p", wb, In(u + 1) + ". " + In(e.length > 30 ? e.substring(0, 30) +
              "..." : e), 1), ps("p", Cb, In(i(u).includes(n()) ? t.concatLabel :
              `${e.length} characters - ${i(u)}`), 1)
          ])]), void 0 !== t.imagesPerPrompt ? (ns(), rs(Xr, {
          key: 0
        }, [r(u) ? (ns(), rs("div", Sb, [a(u) ? (ns(), rs("div", Tb, [ps("div", Ib,
            [c[1] || (c[1] = ps("i", {
              class: "pi pi-image text-primary text-xs mb-0.5"
            }, null, -1)), ps("span", Ab, In(o()), 1)])])) : fs("", !0), (ns(!
            0), rs(Xr, null, Na(t.imagesPerPrompt[u], t => (ns(), rs(
          "div", {
            key: t.id,
            class: "relative rounded border border-border/40 overflow-hidden bg-muted/40 aspect-square w-12 h-12 flex-shrink-0"
          }, [ni(gb)(t) ? (ns(), rs("video", {
            key: 0,
            src: t.base64,
            class: "w-full h-full object-cover",
            muted: "",
            playsinline: ""
          }, null, 8, Eb)) : (ns(), rs("img", {
            key: 1,
            src: t.base64,
            alt: t.name,
            class: "w-full h-full object-cover"
          }, null, 8, Pb)), ps("div", Ob, [ni(gb)(t) ? (ns(), rs(
            "i", Mb)) : fs("", !0), ps("span", null, In(t.name
            .length > 8 ? t.name.substring(0, 8) + "..." : t
            .name), 1)])]))), 128))])) : a(u) ? (ns(), rs("div", Lb, [ps("div", _b,
            [ps("div", Bb, [c[2] || (c[2] = ps("i", {
              class: "pi pi-image text-primary text-xs mb-0.5"
            }, null, -1)), ps("span", Fb, In(o()), 1)])])])) : t.showRowWarning?.(
          u) ? (ns(), rs("div", Rb, [c[3] || (c[3] = ps("i", {
            class: "pi pi-flag text-warning"
          }, null, -1)), ps("span", null, In(t.rowWarningText), 1)])) : s(u) ? (
          ns(), rs("div", Db, " ⚠️ " + In(t.noImagesWarningText), 1)) : fs("", !0)
        ], 64)) : (ns(), rs(Xr, {
          key: 1
        }, [a(u) ? (ns(), rs("div", Vb, [ps("div", Nb, [ps("div", $b, [c[4] || (c[
          4] = ps("i", {
            class: "pi pi-image text-primary text-xs mb-0.5"
          }, null, -1)), ps("span", zb, In(o()), 1)])])])) : fs("", !0)], 64)), t
        .getRowBadge?.(u) ? (ns(), rs("div", {
          key: 2,
          class: xn(["flex items-center gap-1.5 text-xs", t.getRowBadge(u)
            .colorClass
          ])
        }, [ps("i", {
          class: xn(["pi flex-shrink-0", t.getRowBadge(u).icon])
        }, null, 2), ps("span", null, In(t.getRowBadge(u).text), 1)], 2)) : fs("", !0),
        t.getExtraRowBadges ? (ns(!0), rs(Xr, {
          key: 3
        }, Na(t.getExtraRowBadges(u).filter(Boolean), (t, e) => (ns(), rs("div", {
          key: e,
          class: xn(["flex items-center gap-1.5 text-xs", t.colorClass])
        }, [ps("i", {
          class: xn(["pi flex-shrink-0", t.icon])
        }, null, 2), ps("span", null, In(t.text), 1)], 2))), 128)) : fs("", !0)
      ]))), 128))]), ]), ps("p", Ub, In(t.tip), 1)])) : fs("", !0)
    }
  }
});
