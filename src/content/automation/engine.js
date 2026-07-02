/**
 * Flow page automation — DOM interaction, job queue, downloads.
 * Flow automation — source: src/content/automation/
 */
import jQuery from 'jquery';
import { getRemoteConfig, FALLBACK_FLOW_CONFIG, MAX_CONCURRENT_PROMPTS, FLOW_INPUT_CONFIG } from '@shared/config.js';
import {
  nativeFocusElement,
  nativeClickElement,
  nativeDispatchKey,
  nativeClearEditable,
  nativeInsertText,
} from './dom-input.js';
import { collectOrderedTileIds, assignTilesToPayloads } from './download-only.js';
import { stripDownloadPayload } from '@/utils/downloadOnly.js';
import {
  formatPromptPreview,
  extractPromptBodyFromTimedPrompt,
  parsePromptHeaderLine,
  buildDownloadFileStem,
} from '@/utils/prompts.js';
import {
  formatTimelineTagForFilename,
  parseVisualSuffix,
  VISUAL_SUFFIX_RE,
} from '@/utils/timeline.js';
import { batchIdentityMatches } from '@/utils/batchIdentity.js';
import {
  isModelQuotaMessage as veoIsModelQuotaMessage,
  extractModelFromQuotaMessage,
  getModelChainForPayload,
  pickNextModelAfterQuota,
  IMAGEN_4_MODEL,
} from '@/utils/modelQuota.js';

const i = jQuery;

async function loadFlowConfig() {
  try {
    const config = await getRemoteConfig();
    return config?.selectors ? config : FALLBACK_FLOW_CONFIG;
  } catch {
    return FALLBACK_FLOW_CONFIG;
  }
}

const lockCancelError = new Error('request for lock canceled');

/** @type {typeof import('tslib').__awaiter} */
function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))((resolve, reject) => {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P((res) => {
            res(value);
          });
    }
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

const s = __awaiter;
const l = __awaiter;

  // --- VEO automation logic (prompt queue, Flow DOM) ---
  class c {
    constructor(e, t = lockCancelError) {
      this._value = e, this._cancelError = t, this._queue = [], this._weightedWaiters = []
    }
    acquire(e = 1, t = 0) {
      if (e <= 0) throw new Error(`invalid weight ${e}: must be positive`);
      return new Promise((n, r) => {
        const o = {
            resolve: n,
            reject: r,
            weight: e,
            priority: t
          },
          idx = u(this._queue, e => t <= e.priority);
        (-1 === idx && e <= this._value ? this._dispatchItem(o) : this._queue.splice(idx + 1, 0, o));
      })
    }
    runExclusive(e) {
      return s(this, arguments, void 0, function*(e, t = 1, n = 0) {
        const [r, o] = yield this.acquire(t, n);
        try {
          return yield e(r)
        } finally {
          o()
        }
      })
    }
    waitForUnlock(e = 1, t = 0) {
      if (e <= 0) throw new Error(`invalid weight ${e}: must be positive`);
      return this._couldLockImmediately(e, t) ? Promise.resolve() : new Promise(n => {
        this._weightedWaiters[e - 1] || (this._weightedWaiters[e - 1] = []),
          function(e, t) {
            const n = u(e, e => t.priority <= e.priority);
            e.splice(n + 1, 0, t)
          }(this._weightedWaiters[e - 1], {
            resolve: n,
            priority: t
          })
      })
    }
    isLocked() {
      return this._value <= 0
    }
    getValue() {
      return this._value
    }
    setValue(e) {
      this._value = e, this._dispatchQueue()
    }
    release(e = 1) {
      if (e <= 0) throw new Error(`invalid weight ${e}: must be positive`);
      this._value += e, this._dispatchQueue()
    }
    cancel() {
      this._queue.forEach(e => e.reject(this._cancelError)), this._queue = []
    }
    _dispatchQueue() {
      for (this._drainUnlockWaiters(); this._queue.length > 0 && this._queue[0].weight <= this._value;) this
        ._dispatchItem(this._queue.shift()), this._drainUnlockWaiters()
    }
    _dispatchItem(e) {
      const t = this._value;
      this._value -= e.weight, e.resolve([t, this._newReleaser(e.weight)])
    }
    _newReleaser(e) {
      let t = !1;
      return () => {
        t || (t = !0, this.release(e))
      }
    }
    _drainUnlockWaiters() {
      if (0 === this._queue.length)
        for (let e = this._value; e > 0; e--) {
          const t = this._weightedWaiters[e - 1];
          t && (t.forEach(e => e.resolve()), this._weightedWaiters[e - 1] = [])
        } else {
          const e = this._queue[0].priority;
          for (let t = this._value; t > 0; t--) {
            const n = this._weightedWaiters[t - 1];
            if (!n) continue;
            const r = n.findIndex(t => t.priority <= e);
            (-1 === r ? n : n.splice(0, r)).forEach(e => e.resolve())
          }
        }
    }
    _couldLockImmediately(e, t) {
      return (0 === this._queue.length || this._queue[0].priority < t) && e <= this._value
    }
  }

  function u(e, t) {
    for (let n = e.length - 1; n >= 0; n--)
      if (t(e[n])) return n;
    return -1
  }

  const d = new class {
      constructor(e) {
        this._semaphore = new c(1, e)
      }
      acquire() {
        return l(this, arguments, void 0, function*(e = 0) {
          const [, t] = yield this._semaphore.acquire(1, e);
          return t
        })
      }
      runExclusive(e, t = 0) {
        return this._semaphore.runExclusive(() => e(), 1, t)
      }
      isLocked() {
        return this._semaphore.isLocked()
      }
      waitForUnlock(e = 0) {
        return this._semaphore.waitForUnlock(1, e)
      }
      release() {
        this._semaphore.isLocked() && this._semaphore.release()
      }
      cancel() {
        return this._semaphore.cancel()
      }
    },
    p = (e, t = !1) => {
      const n = t ? e * (.6 + .8 * Math.random()) : e;
      return new Promise(e => setTimeout(e, n))
    },
    veoFlowStepState = {
      chain: Promise.resolve()
    },
    veoFlowAlertState = {
      lastUnusualText: "",
      lastUnusualAt: 0
    },
    veoRunFlowStepExclusive = async e => {
        const t = veoFlowStepState.chain.then(() => e());
        return veoFlowStepState.chain = t.then(() => {}, () => {}), t
      },
    veoUseNativeInput = () => !!FLOW_INPUT_CONFIG.useNativeDomInput,
    veoUseNativeTextInput = () => !!(FLOW_INPUT_CONFIG.nativeTextInputOnly || FLOW_INPUT_CONFIG.useNativeDomInput),
    veoFlowBlockIsFatal = e => !!e && "model-switch" !== e && "unusual-retry" !== e && "paused" !== e,
    veoActivePromptEditor = () => {
      const active = document.activeElement;
      if (active?.getAttribute?.("role") === "textbox" || active?.isContentEditable) return active;
      const found = document.querySelector("div[role='textbox']");
      return found || active
    },
    veoClearPromptEditor = async () => {
      try {
        if (veoUseNativeInput()) {
          nativeClearEditable(veoActivePromptEditor());
          return
        }
        await h("a", "KeyA", 65, 2), await p(120), await h("Backspace", "Backspace", 8), await p(200)
      } catch {}
    },
    f = async e => {
      if (veoUseNativeTextInput()) {
        const nativeOk = await nativeInsertText(veoActivePromptEditor(), e, {
          chunkChars: FLOW_INPUT_CONFIG.typeChunkChars,
          chunkDelayMs: FLOW_INPUT_CONFIG.typeChunkDelayMs
        });
        if (nativeOk) return !0;
        if (!FLOW_INPUT_CONFIG.cdpFallback) return !1
      }
      try {
        const t = await chrome.runtime.sendMessage({
          type: "CIT",
          text: e
        });
        return !!t?.success
      } catch {
        return !1
      }
    }, h = async (e, t, n, r) => {
      let o, a;
      "@" === e && (o = "@", a = 8);
      if (veoUseNativeInput()) {
        const nativeOk = nativeDispatchKey(veoActivePromptEditor() || document.activeElement, e, t, n,
          void 0 !== r ? r : a, o);
        if (nativeOk) return !0;
        if (!FLOW_INPUT_CONFIG.cdpFallback) return !1
      }
      try {
        const i = await chrome.runtime.sendMessage({
          type: "CK",
          key: e,
          code: t,
          keyCode: n,
          text: o,
          modifiers: void 0 !== r ? r : a
        });
        return !!i?.success
      } catch {
        return !1
      }
    }, g = async () => {
          try {
            await chrome.runtime.sendMessage({
              type: "CD"
            })
          } catch {}
        }, m = async (e, t = "Undefined element button", n = 5e3, r = 100) => d.runExclusive(async () => {
          const o = Date.now();
          for (; Date.now() - o < n;) {
            await p(r);
            const t = i(e);
            if (y(t)) {
              const e = t.get(0);
              if (e) {
                if (veoUseNativeInput()) {
                  if (nativeFocusElement(e)) {
                    await p(300);
                    return
                  }
                  if (!FLOW_INPUT_CONFIG.cdpFallback) break
                }
                const t = e.getBoundingClientRect(),
                  n = Math.round(t.left + t.width / 2),
                  r = Math.round(t.top + t.height / 2);
                await chrome.runtime.sendMessage({
                  type: "CH",
                  x: n,
                  y: r
                }), await p(300)
              }
              return
            }
          }
          throw 0 === i(e).length ? new Error(`❌ ${t} - Element not found within timeout (${n}ms)`) :
            new Error(`❌ ${t} - Element found but not fully visible/ready within timeout (${n}ms)`)
        }), y = e => {
          if (0 === e.length) return !1;
          const t = e[0];
          if (!e.is(":visible")) return !1;
          if (e.is(":disabled")) return !1;
          if ("true" === (t.getAttribute?.("aria-disabled") || "").toLowerCase()) return !1;
          const n = t.getBoundingClientRect();
          if (0 === n.width || 0 === n.height) return !1;
          const r = window.getComputedStyle(t);
          return "none" !== r.display && "hidden" !== r.visibility && "0" !== r.opacity && (n.top >= 0 && n
            .left >= 0 && n.bottom <= (window.innerHeight || document.documentElement.clientHeight) && (n
              .right, window.innerWidth || document.documentElement.clientWidth), !0)
        }, veoIsFlowSurfaceNodeVisible = e => {
          if (!e) return !1;
          const t = e.getBoundingClientRect();
          if (!t.width || !t.height) return !1;
          const n = window.getComputedStyle(e);
          return "none" !== n.display && "hidden" !== n.visibility && "0" !== n.opacity
        }, veoDismissFlowAlerts = async () => {
          try {
            document.querySelectorAll('[data-sonner-toast] button, [role="alert"] button').forEach(e => {
              const t = (e.getAttribute("aria-label") || e.textContent || "").toLowerCase();
              /close|dismiss|đóng|huỷ|hủy/.test(t) && e.click()
            }), await h("Escape", "Escape", 27), await p(300)
          } catch {}
        }, veoDismissFlowOverlays = async e => {
          try {
            await h("Escape", "Escape", 27), await p(400)
          } catch {}
          await veoDismissFlowAlerts();
          const t = i(e.downloadDoneButton);
          if (t.length && y(t)) try {
            await w(e.downloadDoneButton, "Close overlay", 4e3), await p(400)
          } catch {}
        }, veoWaitSubmitReady = async (e, t = 2e4) => {
          const n = Date.now() + t;
          for (; Date.now() < n;) {
            const t = i(e);
            if (t.length && y(t)) return t;
            await p(250)
          }
          return null
        }, v = async (e, t = 5e3, n = 100, r = !0) => {
          const o = Date.now();
          for (; Date.now() - o < t;) {
            const t = i(e);
            if (r ? y(t) : t.length > 0) return await p(200), t;
            await p(n)
          }
          return null
        }, w = async (e, t = "Undefined element button", n = 5e3, r = 100, reliable = !1) => d.runExclusive(async () => {
            const o = Date.now();
            for (; Date.now() - o < n;) {
              await p(r);
              const t = i(e);
              if (y(t)) {
                const e = t.get(0);
                if (e) {
                  let nativeClicked = !1;
                  if (veoUseNativeInput()) {
                    nativeClicked = nativeClickElement(e, .25, .5);
                    if (nativeClicked) await p(300);
                    if (nativeClicked && !reliable) return
                  }
                  if (!veoUseNativeInput() || reliable || !nativeClicked) {
                    if (veoUseNativeInput() && !FLOW_INPUT_CONFIG.cdpFallback && !nativeClicked) break;
                    const t = e.getBoundingClientRect(),
                      n = Math.round(t.left + .25 * t.width),
                      r = Math.round(t.top + t.height / 2);
                    await chrome.runtime.sendMessage({
                      type: "CC",
                      x: n,
                      y: r
                    }), await p(300)
                  }
                }
                return
              }
            }
            throw 0 === i(e).length ? new Error(
              `❌ ${t} - Element not found within timeout (${n}ms)`) : new Error(
                `❌ ${t} - Element found but not fully visible/ready within timeout (${n}ms)`)
          }), x = 3e5, b = new Map, C = (e, t = !1) => {
            const n = e.some(([e, n]) => {
              const r = ((e, t = !1) => {
                const n = b.get(e);
                if (n) {
                  if (!(Date.now() > n.expiresAt)) return t && (n.expiresAt = Date.now() + x), n
                    .value;
                  b.delete(e)
                }
              })(e, t);
              return void 0 === r || JSON.stringify(r) !== JSON.stringify(n)
            });
            return n && t && e.forEach(([e, t]) => {
              return n = e, r = t, void b.set(n, {
                value: r,
                expiresAt: Date.now() + x
              });
              var n, r
            }), n
          }, veoFlowModelCacheKey = "model", veoClearFlowModelCache = () => {
            b.delete(veoFlowModelCacheKey)
          }, veoFlowModelLabelCandidates = (model) => {
            const labels = [model];
            const noEmoji = String(model || "").replace(/^🍌\s*/, "").trim();
            if (noEmoji && noEmoji !== model) labels.push(noEmoji);
            return [...new Set(labels.filter(Boolean))]
          }, veoSelectFlowModel = async (e, selectors, jobGroup, logLabel = "Model") => {
            const model = e.model;
            if (!model) return !0;
            const force = !!jobGroup?.forceFlowModelApply;
            const cached = (() => {
              const entry = b.get(veoFlowModelCacheKey);
              return entry && Date.now() <= entry.expiresAt ? entry.value : void 0
            })();
            if (!force && cached !== void 0 && JSON.stringify(cached) === JSON.stringify(model)) return !0;
            await w(selectors.modelSelectButton, "AI model select button");
            jobGroup && (jobGroup.flowHasImagen4 = i(selectors.modelTemplate.replace("{model}", IMAGEN_4_MODEL))
              .length > 0);
            let clicked = !1;
            for (const label of veoFlowModelLabelCandidates(model)) {
              const sel = selectors.modelTemplate.replace("{model}", label),
                found = await v(sel);
              if (found && found.length > 0) {
                await w(sel, `${logLabel} option: ${label}`);
                clicked = !0;
                break
              }
            }
            if (!clicked) return A(`⚠️ Could not find model button: ${model}`), !1;
            b.set(veoFlowModelCacheKey, {
              value: model,
              expiresAt: Date.now() + x
            });
            jobGroup && (jobGroup.forceFlowModelApply = !1);
            return !0
          }, veoStableFlowSettings = e => {
            const t = [
              ["mode", e.mode],
              ["aspectRatio", e.aspectRatio],
              ["model", e.model],
              ["outputCount", e.outputCount]
            ];
            return e.videoOption && t.push(["videoOption", e.videoOption]), t.push(["flowAgent",
              "agentAutomation" === e.mode ? "1" : "0"
            ]), t
          }, veoNeedsFlowSettings = (e, t) => !t?.flowSettingsApplied || C(veoStableFlowSettings(e), !1),
          T = async e => {
              if (!e || 0 === e.length) return null;
              const t = e[e.length - 1];
              try {
                return await (n = t, new Promise((e, t) => {
                  n.crossOrigin = "anonymous", n.preload = "auto", n.addEventListener(
                    "loadedmetadata", () => {
                      n.currentTime = n.duration
                    }), n.addEventListener("seeked", () => {
                    const r = document.createElement("canvas");
                    r.width = n.videoWidth, r.height = n.videoHeight;
                    const o = r.getContext("2d");
                    if (!o) return void t(new Error("Could not get canvas context"));
                    o.drawImage(n, 0, 0, r.width, r.height);
                    const i = r.toDataURL("image/jpeg", .95);
                    e(i)
                  }), n.addEventListener("error", e => {
                    t(new Error(`Failed to load video: ${e.message||"Unknown error"}`))
                  });
                  const r = n.src || n.currentSrc;
                  r ? (n.src = "", n.src = r, n.load()) : n.load()
                }))
              } catch (r) {
                r instanceof Error ? r.message : String(r);
                return null
              }
              var n
            }, veoFormatTagForFilename = (tag) => formatTimelineTagForFilename(tag), veoSanitizeDownloadStem = (stem) => {
              let safe = String(stem || "").trim();
              safe = safe.replace(/\s\|\s*[\s\S]*$/, "");
              return safe.replace(/:/g, ".").replace(
                /[<>"/\\|?*\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim()
            }, veoExplicitOutputFilenameRe =
            /\.(jpg|jpeg|png|mp4|webp|gif|jfif)$/i,
            veoExtractExplicitOutputFilename = (prompt) => {
              const text = (prompt || "").trim().replace(/^\ufeff/, "");
              const firstLine = text.split(/\r?\n/)[0]?.trim() ?? "";
              if (!firstLine || firstLine.length > 180) return null;
              if (!veoExplicitOutputFilenameRe.test(firstLine)) return null;
              if (/[;,]/.test(firstLine) || /\s{2,}/.test(firstLine)) return null;
              const extMatch = firstLine.match(/(\.[^./\\]+)$/i);
              if (!extMatch) return null;
              const ext = extMatch[1].toLowerCase();
              const stem = veoSanitizeDownloadStem(firstLine.slice(0, -ext.length));
              if (!stem) return null;
              return {
                stem,
                ext,
                fullName: `${stem}${ext}`
              }
            }, veoStripExplicitOutputFilenameLine = (prompt) => {
              const text = (prompt || "").trim().replace(/^\ufeff/, "");
              if (!veoExtractExplicitOutputFilename(text)) return text;
              return text.split(/\r?\n/).slice(1).join("\n").trim()
            }, veoStripLeadingTimelineFromBody = (body) => {
              let text = (body || "").trim();
              const tagPrefix = text.match(/^\[([^\]]+)\]\s*/);
              if (tagPrefix) text = text.slice(tagPrefix[0].length).trim();
              return text;
            }, veoPromptSnippetBoilerplateRes = [
              /^Hand-drawn\s+2D\s+doodle\s+cartoon\s+animation,?\s*/i,
              /^flat\s+solid\s+colors,?\s*/i,
              /^bold\s+black\s+(?:hand-drawn\s+)?outlines?,?\s*/i,
              /^slightly\s+wobbly\s+imperfect\s+marker\s+lines,?\s*/i
            ], veoStripPromptBoilerplateForSnippet = (body) => {
              let text = (body || "").trim();
              if (!text) return text;
              let prev;
              do {
                prev = text;
                for (const re of veoPromptSnippetBoilerplateRes) text = text.replace(re, "");
                text = text.trim();
              } while (text !== prev);
              return text;
            }, veoLooksLikePromptSlug = (token, hasExt) => {
              const slug = (token || "").trim();
              if (!slug) return !1;
              if (VISUAL_SUFFIX_RE.test(slug)) return !1;
              if (hasExt) return !0;
              return slug.includes("_") && !/^Hand-drawn/i.test(slug);
            }, veoSplitSlugFromRest = (rest) => {
              let text = veoNormalizePromptBodyAfterPrefix(rest);
              if (!text) return {
                slugPart: null,
                slugExt: null,
                body: ""
              };
              const lines = text.split(/\r?\n/);
              const firstLine = lines[0]?.trim() ?? "";
              const slugLineRe =
                /^([a-zA-Z0-9_-]+)(?:\.(jpg|jpeg|png|mp4|webp|gif|jfif))?$/i;
              const slugLineMatch = firstLine.match(slugLineRe);
              if (slugLineMatch && veoLooksLikePromptSlug(slugLineMatch[1], !!slugLineMatch[2]) &&
                lines.length > 1) {
                return {
                  slugPart: slugLineMatch[1],
                  slugExt: slugLineMatch[2]?.toLowerCase() ?? null,
                  body: veoStripLeadingTimelineFromBody(lines.slice(1).join("\n"))
                };
              }
              if (slugLineMatch && veoLooksLikePromptSlug(slugLineMatch[1], !!slugLineMatch[2]) &&
                lines.length === 1) {
                return {
                  slugPart: slugLineMatch[1],
                  slugExt: slugLineMatch[2]?.toLowerCase() ?? null,
                  body: ""
                };
              }
              const inlineMatch = firstLine.match(
                /^([a-zA-Z0-9_-]+)(?:\.(jpg|jpeg|png|mp4|webp|gif|jfif))?\s+([\s\S]*)$/i);
              if (inlineMatch && veoLooksLikePromptSlug(inlineMatch[1], !!inlineMatch[2])) {
                const tail = inlineMatch[3] + (lines.length > 1 ? "\n" + lines.slice(1).join("\n") : "");
                return {
                  slugPart: inlineMatch[1],
                  slugExt: inlineMatch[2]?.toLowerCase() ?? null,
                  body: veoStripLeadingTimelineFromBody(tail)
                };
              }
              return {
                slugPart: null,
                slugExt: null,
                body: text
              };
            }, veoParseIndexedTagRest = (rest) => {
              const visualMatch = (rest || "").match(
                /^(?:_+)?(VISUAL_\d{2}_\d{2})(?:\s*(?:\|\s*)?([\s\S]*))?$/i
              );
              if (visualMatch) {
                return {
                  slugPart: null,
                  slugExt: null,
                  visualIndex: parseVisualSuffix(visualMatch[1])?.visualIndex ?? null,
                  visualTotal: parseVisualSuffix(visualMatch[1])?.visualTotal ?? null,
                  body: veoStripLeadingTimelineFromBody(veoNormalizePromptBodyAfterPrefix(visualMatch[2] ?? ""))
                };
              }
              const directSlugMatch = (rest || "").match(
                /^_+([a-zA-Z0-9_-]+)(?:\.(jpg|jpeg|png|mp4|webp|gif|jfif))?(?:\r?\n\s*([\s\S]*)|\s+([\s\S]+)|([\s\S]*))$/i
              );
              if (directSlugMatch && veoLooksLikePromptSlug(directSlugMatch[1], !!directSlugMatch[2])) {
                const bodyAfter = directSlugMatch[3] ?? directSlugMatch[4] ?? directSlugMatch[5] ?? "";
                return {
                  slugPart: directSlugMatch[1],
                  slugExt: directSlugMatch[2]?.toLowerCase() ?? null,
                  visualIndex: null,
                  visualTotal: null,
                  body: veoStripLeadingTimelineFromBody(veoNormalizePromptBodyAfterPrefix(bodyAfter))
                };
              }
              const split = veoSplitSlugFromRest(rest);
              return {
                ...split,
                visualIndex: null,
                visualTotal: null
              };
            }, veoNormalizePromptBodyAfterPrefix = (body) => {
              let text = (body || "").replace(/^_+\s*/, "").trim();
              text = text.replace(/^\s*\|\s*/, "").trim();
              return text
            }, veoParsePromptFilenamePrefix = (prompt) => {
              const text = veoStripExplicitOutputFilenameLine(prompt);
              const firstLine = text.split(/\r?\n/)[0] ?? "";
              const parsed = parsePromptHeaderLine(firstLine);
              if (parsed && (parsed.indexPart || parsed.tagRaw || parsed.range)) {
                const body = extractPromptBodyFromTimedPrompt(text) || parsed.body || text;
                return {
                  indexPart: parsed.indexPart,
                  tagRaw: parsed.tagRaw,
                  slugPart: parsed.slugPart,
                  slugExt: parsed.slugExt,
                  visualIndex: parsed.visualIndex,
                  visualTotal: parsed.visualTotal,
                  body
                };
              }
              const indexedTagMatch = text.match(/^(\d{3})_\[([^\]]+)\]\s*([\s\S]*)$/);
              if (indexedTagMatch) {
                const split = veoParseIndexedTagRest(indexedTagMatch[3]);
                return {
                  indexPart: indexedTagMatch[1],
                  tagRaw: indexedTagMatch[2],
                  slugPart: split.slugPart,
                  slugExt: split.slugExt,
                  visualIndex: split.visualIndex,
                  visualTotal: split.visualTotal,
                  body: split.body
                };
              }
              const tagMatch = text.match(/^\[([^\]]+)\]\s*([\s\S]*)$/);
              if (tagMatch) {
                return {
                  indexPart: null,
                  tagRaw: tagMatch[1],
                  slugPart: null,
                  slugExt: null,
                  visualIndex: null,
                  visualTotal: null,
                  body: veoStripLeadingTimelineFromBody(veoNormalizePromptBodyAfterPrefix(tagMatch[2]))
                };
              }
              return {
                indexPart: null,
                tagRaw: null,
                slugPart: null,
                slugExt: null,
                visualIndex: null,
                visualTotal: null,
                body: text
              };
            }, veoExtractPromptTag = (prompt) => {
              const { tagRaw } = veoParsePromptFilenamePrefix(prompt);
              return tagRaw ? veoFormatTagForFilename(tagRaw) : "";
            }, veoExtractPromptSnippet = (prompt, maxLen = 50) => {
              const { slugPart, body } = veoParsePromptFilenamePrefix(prompt);
              if (slugPart) return slugPart;
              const stripped = veoStripPromptBoilerplateForSnippet(body);
              if (!stripped) return "prompt";
              return stripped.slice(0, maxLen);
            }, veoSanitizeFileNamePart = (part) => {
              let safe = (part || "name").trim();
              if (!safe) return "name";
              safe = safe.replace(/\s+/g, "-");
              safe = safe.replace(/[^\p{L}\p{N}_-]/gu, "");
              safe = safe.replace(/-+/g, "-").replace(/^-+|-+$/g, "");
              return safe || "name";
            }, veoBuildOutputFileStem = (promptIndex, prompt) => {
              const explicit = veoExtractExplicitOutputFilename(prompt);
              if (explicit) return explicit.stem;
              const labeled = buildDownloadFileStem(prompt, {
                promptIndex
              });
              if (labeled) return veoSanitizeDownloadStem(labeled);
              const {
                indexPart,
                tagRaw,
                slugPart
              } = veoParsePromptFilenamePrefix(prompt);
              const indexPartFinal = indexPart || String(promptIndex).padStart(3, "0");
              const tagPart = veoExtractPromptTag(prompt);
              const snippetPart = veoSanitizeFileNamePart(veoExtractPromptSnippet(prompt));
              const joined = tagPart ? `${indexPartFinal}_${tagPart}_${snippetPart}` :
                slugPart ? `${indexPartFinal}_${tagPart || ""}_${slugPart}`.replace(/_+/g, "_").replace(/^_|_$/g, "") :
                `${indexPartFinal}_${snippetPart}`;
              return veoSanitizeDownloadStem(joined);
            }, veoBuildOutputFileStemWithVariant = (promptIndex, prompt, variantIndex, variantCount) => {
              const explicit = veoExtractExplicitOutputFilename(prompt);
              if (explicit) return variantCount > 1 ? `${explicit.stem}_${variantIndex + 1}` :
                explicit.stem;
              const labeled = buildDownloadFileStem(prompt, {
                promptIndex,
                variantIndex,
                variantCount
              });
              if (labeled) return veoSanitizeDownloadStem(labeled);
              const stem = veoBuildOutputFileStem(promptIndex, prompt);
              return variantCount > 1 ? `${stem}_${variantIndex + 1}` : stem;
            }, veoGetOutputFileExtension = (prompt, isVideo) => {
              const explicit = veoExtractExplicitOutputFilename(prompt);
              if (explicit) return explicit.ext.replace(/^\./, "");
              const { slugExt } = veoParsePromptFilenamePrefix(prompt);
              if (slugExt) return slugExt.replace(/^\./, "");
              return isVideo ? "mp4" : "png";
            }, veoApplyDownloadNaming = async (folderName, prefix, autoChangeFileName) => {
              await chrome.runtime.sendMessage({
                type: "SET_FOLDER_NAME",
                folderName,
                prefix,
                autoChangeFileName
              });
              await p(300)
            }, veoRunUiDownloadExclusive = async (folderName, prefix, autoChangeFileName, action) => d
              .runExclusive(async () => {
                await veoApplyDownloadNaming(folderName, prefix, autoChangeFileName), await action(), await p(
                  600)
              }), I = e => {
              try {
                chrome.runtime.sendMessage({
                  type: "ACTION_LOG",
                  data: e
                }).catch(() => {})
              } catch (t) {}
            }, k = e => e.map(e => "string" == typeof e ? e : e instanceof Error ? e.message : JSON
              .stringify(e)).join(" "), S = (...e) => {
              I({
                level: "info",
                message: k(e),
                timestamp: Date.now()
              })
            }, A = (...e) => {
              I({
                level: "warn",
                message: k(e),
                timestamp: Date.now()
              })
            }, D = (...e) => {
              I({
                level: "error",
                message: k(e),
                timestamp: Date.now()
              })
            }, $ = async (e, t, n) => {
              const r = [{
                name: "Create Project",
                status: "pending"
              }, {
                name: "Configure Video",
                status: "pending"
              }, {
                name: "Fill Prompt",
                status: "pending"
              }, {
                name: "Check & Download Video",
                status: "pending"
              }];
              try {
                if (t && t()) return S("❌ Automation cancelled before starting"), {
                  success: !1,
                  steps: r,
                  cancelled: !0,
                  error: "Cancelled"
                };
                await (async () => {
                  if (FLOW_INPUT_CONFIG.skipCaPreAttach) return;
                  try {
                    await chrome.runtime.sendMessage({
                      type: "CA"
                    })
                  } catch {}
                })();
                if (window.location.href.includes("/project/")) S(
                  "✅ Already in a project, skipping project creation"), r[0].status = "completed", r[
                  0].name = "Create Project (Skipped)";
                else {
                  if (S("🚀 Starting Flow Automation - Step 1: Create Project"), r[0].status =
                    "running", t && t()) return r[0].status = "error", r[0].error = "Cancelled", {
                    success: !1,
                    steps: r,
                    cancelled: !0,
                    error: "Cancelled"
                  };
                  if (!(await P(n))) return r[0].status = "error", r[0].error =
                    "Failed to create project", {
                      success: !1,
                      steps: r,
                      error: "Failed to create project"
                    };
                  r[0].status = "completed", S("✅ Project created successfully")
                }
                if (t && t()) return S("❌ Automation cancelled before configuring video"), {
                  success: !1,
                  steps: r,
                  cancelled: !0,
                  error: "Cancelled"
                };
                const jobGroup = Z.find(t => t.id === e.groupId),
                  needsFullSettings = veoNeedsFlowSettings(e, jobGroup),
                  needsEditImageOnly = !needsFullSettings && !!e.outputPreviousPrompt
                  ?.nextPromptEditImage;
                if (needsFullSettings) {
                  if (i(n.selectors.removeSelectedImagesButton).length > 0 && await w(n.selectors
                      .removeSelectedImagesButton, "Remove selected images and videos"),
                    "agentAutomation" !== e.mode && i(n.selectors.disableAgentModeButton).length > 0 ? (
                      await w(n.selectors.disableAgentModeButton, "Disable Agent Mode"), await p(1e3),
                      i(n.selectors.disableAgentModeButton).length > 0 && await w(n.selectors
                        .disableAgentModeButton, "Disable Agent Mode")) : "agentAutomation" === e
                    .mode && i(n.selectors.enableAgentModeButton).length > 0 && (await w(n.selectors
                      .enableAgentModeButton, "Enable Agent Mode"), await p(1e3), i(n.selectors
                      .enableAgentModeButton).length > 0 && await w(n.selectors.enableAgentModeButton,
                      "Enable Agent Mode")), C([
                      ["uiMode", "open"]
                    ], !0) && (S("⏳ Step 2.1: PreConfigure UI Mode"), await O(n), S(
                      "✅ UI Mode configured")), e.mode.includes("ToVideo")) {
                    S("⏳ Step 2: Configuring video..."), r[1].status = "running";
                    if (!(await N(e, t, n))) return t && t() ? (r[1].status = "error", r[1].error =
                      "Cancelled", {
                        success: !1,
                        steps: r,
                        cancelled: !0,
                        error: "Cancelled"
                      }) : (r[1].status = "error", r[1].error = "Failed to configure video", {
                      success: !1,
                      steps: r,
                      error: "Failed to configure video"
                    });
                    r[1].status = "completed", S("✅ Video configured")
                  } else if (e.mode.includes("ToImage")) {
                    S("⏳ Step 2: Configuring image..."), r[1].status = "running";
                    if (!(await L(e, t, n))) return t && t() ? (r[1].status = "error", r[1].error =
                      "Cancelled", {
                        success: !1,
                        steps: r,
                        cancelled: !0,
                        error: "Cancelled"
                      }) : (r[1].status = "error", r[1].error = "Failed to configure image", {
                      success: !1,
                      steps: r,
                      error: "Failed to configure image"
                    });
                    r[1].status = "completed", S("✅ Image configured")
                  } else if (e.mode.includes("agentAutomation")) {
                    S("⏳ Step 2: Configuring agent automation..."), r[1].status = "running";
                    if (!(await _(e, t, n))) return t && t() ? (r[1].status = "error", r[1].error =
                      "Cancelled", {
                        success: !1,
                        steps: r,
                        cancelled: !0,
                        error: "Cancelled"
                      }) : (r[1].status = "error", r[1].error =
                      "Failed to configure agent automation", {
                        success: !1,
                        steps: r,
                        error: "Failed to configure agent automation"
                      });
                    r[1].status = "completed", S("✅ Agent automation configured")
                  }
                  C(veoStableFlowSettings(e), !0), jobGroup && (jobGroup.flowSettingsApplied = !0)
                } else if (needsEditImageOnly) {
                  S("⏳ Step 2: Opening image edit for concat chain..."), r[1].status = "running";
                  if (!(await L(e, t, n))) return t && t() ? (r[1].status = "error", r[1].error =
                    "Cancelled", {
                      success: !1,
                      steps: r,
                      cancelled: !0,
                      error: "Cancelled"
                    }) : (r[1].status = "error", r[1].error = "Failed to configure image", {
                    success: !1,
                    steps: r,
                    error: "Failed to configure image"
                  });
                  r[1].status = "completed", S("✅ Image edit ready")
                } else S("✅ Settings unchanged — skip config, fill prompt only"), r[1].status =
                  "completed", r[1].name = "Configure (Skipped)";
                if (needsFullSettings && e.characters && e.characters.length > 0)
                  for (let r = 0; r < e.characters.length; r++) {
                    S(`Selecting character ${r+1}/${e.characters.length}: ${e.characters[r]}...`);
                    await j(e, r, n, t) || A(`⚠️ Failed to select character ${r+1}, but continuing...`)
                  }
                if (e.images && e.images.length > 0)
                  for (let r = 0; r < e.images.length; r++) {
                    S(`Uploading image ${r+1}/${e.images.length}: ${e.images[r].name}...`);
                    await M(e, r, n, t) ? S(`✅ Image ${r+1} uploaded successfully`) : A(
                      `⚠️ Failed to upload image ${r+1}, but continuing...`);
                    await veoDismissFlowOverlays(n.selectors), await p(800, !0)
                  } else A("No images provided");
                if (t && t()) return S("❌ Automation cancelled before filling prompt"), {
                  success: !1,
                  steps: r,
                  cancelled: !0,
                  error: "Cancelled"
                };
                S("⏳ Step 3: Filling prompt..."), r[2].status = "running";
                let tileResult = {
                  success: !1,
                  tileIds: []
                };
                const stepResult = await veoRunFlowStepExclusive(async () => {
                  if (!(await F(e, n))) return "fill_fail";
                  if (r[2].status = "completed", S("✅ Prompt filled"), t && t())
                  return "cancelled";
                  S("⏳ Step 4: Locating tile IDs..."), r[3].status = "running";
                  return tileResult = await H(e, t, n), "ok"
                });
                if ("fill_fail" === stepResult) return r[2].status = "error", r[2].error =
                  "Failed to fill prompt", {
                    success: !1,
                    steps: r,
                    error: "Failed to fill prompt"
                  };
                if ("cancelled" === stepResult) return S(
                  "❌ Automation cancelled before locating tiles"), {
                    success: !1,
                    steps: r,
                    cancelled: !0,
                    error: "Cancelled"
                  };
                if (t && t()) return S("❌ Automation cancelled before downloading video"), {
                  success: !1,
                  steps: r,
                  cancelled: !0,
                  error: "Cancelled"
                };
                if (tileResult.modelSwitch) return {
                  success: !1,
                  steps: r,
                  modelSwitch: !0,
                  error: tileResult.error
                };
                if (tileResult.fatal) {
                  const t = Z.find(t => t.id === e.groupId);
                  return t && veoHandleFlowBlockError(t, tileResult.error, re, {
                    requeueIndex: (e.promptIndex ?? 1) - 1
                  }), {
                    success: !1,
                    steps: r,
                    fatal: !0,
                    error: tileResult.error,
                    cancelled: !0
                  }
                }
                if (tileResult.unusualRetry) return {
                  success: !1,
                  steps: r,
                  unusualRetry: !0,
                  error: tileResult.error
                }
                return tileResult.success ? (r[3].status = "completed", {
                  success: !0,
                  steps: r,
                  tileIds: tileResult.tileIds
                }) : t && t() ? (r[3].status = "error", r[3].error = "Cancelled", {
                  success: !1,
                  steps: r,
                  cancelled: !0,
                  error: "Cancelled"
                }) : (r[3].status = "error", r[3].error = "Could not find tile IDs", {
                  success: !1,
                  steps: r,
                  error: "Could not find tile IDs"
                })
              } catch (err) {
                D("❌ Automation failed:", err);
                const e = r.find(e => "running" === e.status);
                return e && (e.status = "error", e.error = String(err)), {
                  success: !1,
                  steps: r,
                  error: String(err)
                }
              }
            }, P = e => new Promise(async t => {
              try {
                const n = e.selectors,
                  r = await v(n.createProjectButton);
                if (!r || 0 === r.length) return A("Could not find create project button"), void t(!
                  1);
                await w(n.createProjectButton, "Create project button"), setTimeout(
                  () => {
                    t(!0)
                  }, 5e3)
              } catch (n) {
                D("Error in createFlowProject:", n), t(!1)
              }
            }), j = async (e, t, n, r) => {
              const o = n.selectors;
              if (0 === i(o.addImageButton).length) return A(
                "Ignore select character because no add character button found"), !1;
              await w(o.addImageButton, "Open select character"), i(o.selectUploadCharacterType)
                .length > 0 && await w(o.selectUploadCharacterType,
                  "Click select upload character option");
              const a = e.characters?.[t] ?? "",
                s = `${o.virtuosoItemList}:first:has(div:contains("${a}"))`;
              await w(o.searchUploadedImage, "Click search input");
              const c = i(o.searchUploadedImage);
              if (c.length > 0) {
                const e = c.get(0);
                e.value = a, e.dispatchEvent(new Event("input", {
                  bubbles: !0
                })), await p(500)
              }
              return i(s).length > 0 && (S(`✅ First item contains "${a}"`), await w(`${s} img`,
                `Select character "${a}"`), !0)
            }, M = async (e, t, n, r) => {
              const o = n.selectors;
              if (0 === i(o.addImageButton).length) return A(
                "Ignore upload single image because no add image button found"), !1;
              document.documentElement.setAttribute("data-veo-active", "true");
              try {
                await w(o.addImageButton, `Open upload (image ${t+1})`);
                const n = e.images?.[t];
                !(!n || !n.base64.startsWith("data:video/") && !
                  /\.(mp4|webm|mov|avi|mkv|3gp|flv|wmv)$/i.test(n.name)) ? i(o
                    .selectUploadVideoType).length > 0 && await w(o.selectUploadVideoType,
                    "Click select upload video option"): i(o.selectUploadImageType).length > 0 &&
                  await w(o.selectUploadImageType, "Click select upload image option"),
                  await w(o.sortOptionsButton, "Click sort options button"), await w(o
                    .sortLatestOption, "Click latest option");
                const a = (e.images?.[t]?.name ?? "").replace(/\.[^/.]+$/, ""),
                  s = `${o.virtuosoItemList}:first:has(div:contains("${a}"))`;
                await w(o.searchUploadedImage, "Click search input");
                const c = i(o.searchUploadedImage);
                if (c.length > 0) {
                  const e = c.get(0);
                  e.value = a, e.dispatchEvent(new Event("input", {
                    bubbles: !0
                  })), await p(500)
                }
                if (i(s).length > 0) return S(`✅ First item contains "${a}"`),
                  await w(`${s} img`, `Select uploaded image "${a}"`), !0;
                await w(o.uploadMediaButton, "Upload image button"), await (async (e, t) => {
                  try {
                    if (!e.images || 0 === e.images.length) return A(
                      "No images provided in config"), !1;
                    if (t >= e.images.length || t < 0) return A(
                        `Image index ${t} out of range. Total images: ${e.images.length}`),
                      !1;
                    const n = e.images[t];
                    if (!n || !n.base64) return A("No image base64 provided"), !1;
                    let r = "image/jpeg";
                    if (n.base64.startsWith("data:")) {
                      const e = n.base64.match(/^data:([^;]+);/);
                      e && (r = e[1])
                    }
                    const o = {
                      base64: n.base64,
                      filename: n.name,
                      mimeType: r
                    };
                    return document.dispatchEvent(new CustomEvent("VEO_UPLOAD_FILE_DATA", {
                      detail: o
                    })), !0
                  } catch (n) {
                    return D("Error in uploadImageFromBase64 event dispatch:", n), !1
                  }
                })(e, t), await p(2e3), i(o.agreeTermUploadedVideoButton).length > 0 && (await w(o
                  .agreeTermUploadedVideoButton, "Agree term uploaded video button"), await p(
                  1e3), await w(o.addImageButton, `Open upload (image ${t+1})`), i(o
                  .selectUploadVideoType).length > 0 && await w(o.selectUploadVideoType,
                  "Click select upload video option"));
                const u = 180;
                for (let e = 0; e < u; e++) {
                  if (r?.()) return !1;
                  if (await p(1e3), i(s).length > 0) return await w(`${s} img`,
                    `Select uploaded image "${a}"`), !0
                }
                return !1
              } finally {
                document.documentElement.removeAttribute("data-veo-active")
              }
            };
  let R = !1;
  const O = async e => {
    if (!e) return !1;
    const t = e.selectors;
    return !!R || (await v(t.configureUIModeButton, 2e3) ? (await w(t.configureUIModeButton,
      "Open Configure UI Mode"), await v(t.closeConfigureUIModeButton, 100) && await v(t.selectGridModeOption,
      100) && await v(t.selectSizeGridModeOption, 100) && await v(t.selectShowTextModeOption, 100) && await v(
      t.selectClearPromptModeOption, 100) ? (await w(t.selectGridModeOption, "Select Grid Mode"), await w(t
      .selectSizeGridModeOption, "Select Size Grid Mode"), await w(t.selectShowTextModeOption,
      "Select Show Text Mode"), await w(t.selectClearPromptModeOption, "Select Clear Prompt Mode"), await w(
      t.closeConfigureUIModeButton, "Close Configure UI Mode"), R = !0, !0) : (A(
      "Could not find configure UI mode button"), !1)) : (A("Could not find configure UI mode button"), !1))
  }, N = async (e, t, n) => {
    if (!n) return !1;
    try {
      if (t && t()) return !1;
      e.outputPreviousPrompt?.extractedFrame && (e.mode = "imageToVideo", e.images || (e.images = []), e.images
        .unshift({
          base64: e.outputPreviousPrompt.extractedFrame,
          name: `extracted-frame-${Date.now()}.jpg`
        }), S("✅ Last frame from previous prompt injected as first image"));
      const r = n.selectors;
      if (S("Looking for video configuration button..."), await w(r.configButton, "Configuration button"), C([
          ["mode", e.mode]
        ], !0) && (await w(r.selectVideoMode, "Select video mode button"), "textToVideo" === e.mode ? await w(r
          .textToVideoModeOption, "TextToVideo mode option") : "imageToVideo" === e.mode ? await w(r
          .imageToVideoModeOption, "ImageToVideo mode option") : "componentsToVideo" === e.mode && await w(r
          .componentToVideoModeOption, "ComponentsToVideo mode option")), C([
          ["aspectRatio", e.aspectRatio]
        ], !0)) {
        S(`Looking for aspect ratio: ${e.aspectRatio}`);
        const t = r.aspectRatioTemplate.replace("{aspectRatio}", e.aspectRatio.replace(":", "_")),
          n = await v(t);
        n && n.length > 0 ? await w(t, `Aspect ratio option: ${e.aspectRatio}`) : A(
          `⚠️ Could not find aspect ratio option: ${e.aspectRatio}`)
      }
      if (C([
          ["outputCount", e.outputCount]
        ], !0)) {
        const t = e.outputCount;
        S(`Looking for video count: ${t}`);
        const n = r.outputCountTemplate.replace("{outputCount}", t > 1 ? `x${t}` : "1x"),
          o = await v(n);
        o && o.length > 0 ? await w(n, `Video count option: ${t}`) : A(
          `⚠️ Could not find video count option: ${t}`)
      }
      if (!(await veoSelectFlowModel(e, r, Z.find((t) => t.id === e.groupId), "AI model"))) return !1;
      if (C([
          ["videoOption", e.videoOption]
        ], !0)) {
        const t = r.videoLengthTemplate.replace("{videoLength}", e.videoOption.split("-")[0]);
        i(t).length > 0 && await w(t, `Video length option: ${e.videoOption.split("-")[0]}`)
      }
      if (S("Looking for configuration button to close..."), await w(r.configButtonActived,
          "Close configuration button"), t && t()) return !1;
      if (C([
          ["speaker", e.speaker]
        ], !0) && e.speaker) {
        S(`Selecting speaker: ${e.speaker}`);
        const t = await (async (e, t) => {
          const n = t.selectors,
            r = n.addImageButton;
          await w(r, "Open speaker select"), i(n.selectSpeakerType).length > 0 && await w(n
            .selectSpeakerType, "Click select speaker option");
          const o = e.speaker ?? "",
            a = `${n.virtuosoItemList}:eq(0)`;
          await w(n.searchUploadedImage, "Click search input");
          const s = i(n.searchUploadedImage);
          if (s.length > 0) {
            const e = s.get(0);
            e.value = o, e.dispatchEvent(new Event("input", {
              bubbles: !0
            })), await p(500)
          }
          return i(a).length > 0 && (S(`✅ First item contains "${o}"`), await w(
            `${a} > div > div > div:eq(1)`, `Select speaker "${o}"`), !0)
        })(e, n);
        t ? S(`✅ Speaker ${e.speaker} selected successfully`) : A(`⚠️ Failed to select speaker: ${e.speaker}`)
      }
      return !0
    } catch (r) {
      return D("Error in configureVideo:", r), !1
    }
  }, L = async (e, t, n) => {
    if (!n) return !1;
    try {
      if (t && t()) return !1;
      const r = n.selectors;
      let o = !1;
      const a = i(r.downloadDoneButton);
      if (S("config.outputPreviousPrompt", e.outputPreviousPrompt), e.outputPreviousPrompt?.tileIds && e
        .outputPreviousPrompt.tileIds.length > 0) {
        const t = r.tileEditLinkTemplate.replace("{tileId}", e.outputPreviousPrompt.tileIds[0]),
          n = await v(t);
        n && n.length > 0 && (await w(t, "Edit image"), o = !0)
      } else a && a.length > 0 && await w(r.downloadDoneButton, "Exit button");
      if (!o) {
        if (S("Looking for image configuration button..."), await w(r.configButton, "Configuration button"), C([
            ["mode", e.mode]
          ], !0) && await w(r.selectImageMode, "Select image mode button"), C([
            ["aspectRatio", e.aspectRatio]
          ], !0)) {
          S(`Looking for aspect ratio: ${e.aspectRatio}`);
          const t = r.aspectRatioTemplate.replace("{aspectRatio}", e.aspectRatio.replace(":", "_")),
            n = await v(t);
          n && n.length > 0 ? await w(t, `Aspect ratio option: ${e.aspectRatio}`) : A(
            `⚠️ Could not find aspect ratio option: ${e.aspectRatio}`)
        }
        if (C([
            ["outputCount", e.outputCount]
          ], !0)) {
          const t = e.outputCount;
          S(`Looking for image count: ${t}`);
          const n = r.outputCountTemplate.replace("{outputCount}", t > 1 ? `x${t}` : "1x"),
            o = await v(n);
          o && o.length > 0 ? await w(n, `Image count option: ${t}`) : A(
            `⚠️ Could not find image count option: ${t}`)
        }
        if (!(await veoSelectFlowModel(e, r, Z.find((t) => t.id === e.groupId), "Image model"))) return !1;
        if (await w(r.configButtonActived, "Close configuration button"), t && t()) return !1
      }
      return !0
    } catch (r) {
      return D("Error in configureImage:", r), !1
    }
  }, _ = async (e, t, n) => {
    if (!n) return !1;
    try {
      if (t && t()) return !1;
      const r = n.selectors;
      let o = !1;
      const a = i(r.downloadDoneButton);
      if (S("config.outputPreviousPrompt", e.outputPreviousPrompt), e.outputPreviousPrompt?.tileIds && e
        .outputPreviousPrompt.tileIds.length > 0) {
        const t = r.tileEditLinkTemplate.replace("{tileId}", e.outputPreviousPrompt.tileIds[0]),
          n = await v(t);
        n && n.length > 0 && (await w(t, "Edit image"), o = !0)
      } else a && a.length > 0 && await w(r.downloadDoneButton, "Exit button");
      return !(!o && (S("Looking for image configuration button..."), await w(r.configButton,
          "Configuration button"), await w(r.neverAskAgentSettingButton,
        "Select never ask agent setting"), await w(r.saveAgentSettings, "Save configuration button"), t &&
        t()))
    } catch (r) {
      return D("Error in configureImage:", r), !1
    }
  }, q = async (e, t) => {
    const n = e.replace(/\.[^/.]+$/, "");
    S(`🎯 Selecting reference image via @ mention: ${n}`);
    const r = t.selectors;
    await h("@", "Digit2", 50), await p(300), await w(r.sortOptionsButton, "Click sort options button"),
      await w(r.sortLatestOption, "Click latest option"), await f(n), await p(1e3), await h("Enter",
        "Enter", 13), await p(500)
  }, B = async (e, t) => {
      S(`🎯 Selecting character via @ mention: ${e}`);
      const n = t.selectors;
      await h("@", "Digit2", 50), await p(300), await w(n.selectUploadCharacterType,
          "Click select upload character option"), await f(e), await p(1e3), await h("Enter", "Enter", 13),
        await p(500)
    }, veoStripTimelinePrefix = e => {
      let t = veoStripExplicitOutputFilenameLine(e || "").trim().replace(/^\ufeff/, "");
      if (/^\d{3}_\[[^\]]+\]/.test(t)) return extractPromptBodyFromTimedPrompt(t);
      const indexedPrefix = t.match(/^(\d{3})_\[([^\]]+)\]\s*([\s\S]*)$/);
      if (indexedPrefix) {
        const split = veoParseIndexedTagRest(indexedPrefix[3]);
        t = split.body;
      } else {
        const tagPrefix = t.match(/^\[([^\]]+)\]\s*([\s\S]*)$/);
        if (tagPrefix) t = veoStripLeadingTimelineFromBody(veoNormalizePromptBodyAfterPrefix(tagPrefix[2]));
      }
      return t || veoStripExplicitOutputFilenameLine(e || "").trim().replace(/^\ufeff/, "")
    }, F = async (e, t) => {
      try {
        const n = t.selectors,
          u = !!(e.images && e.images.length > 0),
          promptText = veoStripTimelinePrefix(e.prompt);
        S("📝 Starting to fill prompt..."), await veoDismissFlowOverlays(n);
        const r = await v(n.promptTextarea, 1e4, 150);
        if (!r || 0 === r.length) return D("Could not find prompt editor (div[role='textbox'])"), !1;
        try {
          await w(n.promptTextarea, "Prompt textarea", 8e3)
        } catch {
          A("⚠️ Prompt textarea click failed, trying to continue...")
        }
        await p(800, !0), await veoClearPromptEditor();
        if ("imageToVideo" === e.mode || e.outputPreviousPrompt?.extractedFrame) await f(promptText);
        else {
          const n = ((e, t) => {
              const n = [];
              if (!t || 0 === t.length || !e) return n;
              for (let i = 0; i < t.length; i++) {
                const r = t[i];
                if (!r.name) continue;
                const o = r.name.lastIndexOf("."),
                  a = -1 !== o ? r.name.substring(0, o) : r.name;
                if (!a) continue;
                const s = a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
                  c = /^\w/.test(a) && /\w$/.test(a),
                  u = new RegExp(c ? `\\b${s}\\b` : s, "gi");
                let l;
                for (; null !== (l = u.exec(e));) n.push({
                  index: l.index,
                  length: l[0].length,
                  imageIndex: i
                })
              }
              n.sort((e, t) => e.index - t.index);
              const r = [];
              let o = 0;
              for (const i of n) i.index >= o && (r.push(i), o = i.index + i.length);
              return r
            })(promptText, e.images),
            r = ((e, t) => {
              const n = [];
              if (!t || 0 === t.length || !e) return n;
              for (let i = 0; i < t.length; i++) {
                const r = t[i];
                if (!r) continue;
                const o = r.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
                  a = /^\w/.test(r) && /\w$/.test(r),
                  s = new RegExp(a ? `\\b${o}\\b` : o, "gi");
                let c;
                for (; null !== (c = s.exec(e));) n.push({
                  index: c.index,
                  length: c[0].length,
                  characterIndex: i
                })
              }
              n.sort((e, t) => e.index - t.index);
              const r = [];
              let o = 0;
              for (const i of n) i.index >= o && (r.push(i), o = i.index + i.length);
              return r
            })(promptText, e.characters),
            o = [...n.map(e => ({
              index: e.index,
              length: e.length,
              type: "image",
              targetIndex: e.imageIndex
            })), ...r.map(e => ({
              index: e.index,
              length: e.length,
              type: "character",
              targetIndex: e.characterIndex
            }))];
          o.sort((e, t) => e.index - t.index);
          const i = [];
          let a = 0;
          for (const e of o) e.index >= a && (i.push(e), a = e.index + e.length);
          if (i.length > 0) {
            S(`💡 Found ${i.length} inline match(es) in prompt. Typing inline...`);
            let n = 0;
            for (const r of i) {
              const o = promptText.substring(n, r.index + r.length);
              if (o && (await f(o), await p(100)), await f(" "), await p(100), "image" === r.type) {
                if (!u) {
                  const n = e.images[r.targetIndex];
                  await q(n.name, t)
                }
              } else if ("character" === r.type) {
                const n = e.characters[r.targetIndex];
                await B(n, t)
              }
              n = r.index + r.length
            }
            if (n < promptText.length) {
              const t = promptText.substring(n);
              await f(t), await p(100)
            }
          } else u ? (S(`📝 ${e.images.length} image(s) attached — typing prompt only`), e.characters && e
            .characters.length > 0 && await (async (e, t) => {
              S(`🎯 Mentioning all ${e.length} characters at start...`);
              for (const n of e) n && (await B(n, t), await f(" "), await p(200))
            })(e.characters, t), await f(promptText)) : (e.images && e.images.length > 0 && await (
          async (e, t) => {
              S(`🎯 Fallback: Mentioning all ${e.length} uploaded images at start...`);
              for (const n of e) n.name && (await q(n.name, t), await f(" "), await p(200))
            })(e.images, t), e.characters && e.characters.length > 0 && await (async (e, t) => {
            S(`🎯 Fallback: Mentioning all ${e.length} characters at start...`);
            for (const n of e) n && (await B(n, t), await f(" "), await p(200))
          })(e.characters, t), await f(promptText))
        }
        S(`✍️  Filled prompt: ${e.prompt.substring(0,50)}...`), await p(1200, !0);
        try {
          const editor = veoActivePromptEditor();
          editor?.dispatchEvent?.(new Event("input", {
            bubbles: !0
          }))
        } catch {}
        e.knownTileIdsBeforeSubmit = new Set(Ce(n)), S(
          `📸 Snapshot ${e.knownTileIdsBeforeSubmit.size} tile(s) before submit`);
        await veoDismissFlowOverlays(n);
        const o = await veoWaitSubmitReady(n.submitButton, 2e4);
        if (!o || 0 === o.length) return A(
          "Could not find submit button — kiểm tra prompt/ảnh đã sẵn sàng chưa"), !1;
        try {
          await w(n.submitButton, "Submit button", 8e3, 100, !0)
        } catch {
          S("⚠️ Click submit failed, trying Enter..."), await h("Enter", "Enter", 13)
        }
        await p(800, !0);
        if (y(i(n.submitButton))) {
          S("⚠️ Submit not started, retry Enter...");
          await h("Enter", "Enter", 13);
          await p(500)
        }
        if (e.outputPreviousPrompt?.tileIds && e.outputPreviousPrompt.tileIds.length > 0) {
          const e = i(n.downloadDoneButton);
          e && e.length > 0 && (S("❌ Not in Last Image To Image mode, skipping configuration..."),
            await w(n.downloadDoneButton, "Exit button"))
        }
        return await p(2e3), await (async (e, t = 3e4, n = 200) => {
          const r = Date.now();
          for (; Date.now() - r < t;) {
            const t = i(e);
            if (!y(t)) return !0;
            await p(n)
          }
          return A("Submit may have failed — stop button still visible"), !0
        })(n.stopButton, 9e5, 200), !0
      } catch (n) {
        return D("Error in fillFlowPrompt:", n), !1
      }
    }, Ce = e => {
      const t = [];
      return i(e.outputItems).each((e, n) => {
        const r = i(n).attr("data-tile-id");
        r && t.push(r)
      }), t.length || document.querySelectorAll("[data-tile-id]").forEach(e => {
        const n = e.getAttribute("data-tile-id");
        n && t.push(n)
      }), t
    }, veoFindNewTileIds = (e, t, n) => {
      const r = [];
      return i(e.outputItems).each((e, o) => {
        const i = o.getAttribute("data-tile-id");
        i && !t.has(i) && !n.has(i) && r.push(i)
      }), r.length || document.querySelectorAll("[data-tile-id]").forEach(e => {
        const o = e.getAttribute("data-tile-id");
        o && !t.has(o) && !n.has(o) && !r.includes(o) && r.push(o)
      }), r
    }, H = async (e, t, n) => {
      if (!n) return {
        success: !1,
        tileIds: []
      };
      const r = n.selectors,
        o = Z.find(t => t.id === e.groupId),
        a = e.knownTileIdsBeforeSubmit ?? o?.knownTileIdsBeforeSubmit ?? new Set,
        s = o?.claimedTileIds ?? new Set,
        c = Math.max(1, Number(e.outputCount) || 1);
      try {
        let n = 0;
        const u = 120;
        for (; n < u;) {
          if (t && t()) return {
            success: !1,
            tileIds: []
          };
          const o = Z.find(t => t.id === e.groupId);
          if (o) {
            const blockResult = veoHandleFlowBlockError(o, null, re, {
              requeueIndex: (e.promptIndex ?? 1) - 1
            });
            if ("model-switch" === blockResult) return {
              success: !1,
              tileIds: [],
              modelSwitch: !0
            };
            if ("unusual-retry" === blockResult) return {
              success: !1,
              tileIds: [],
              unusualRetry: !0
            };
            if (veoFlowBlockIsFatal(blockResult)) return {
              success: !1,
              tileIds: [],
              fatal: !0,
              error: o.errorMessage || o.fatalError
            };
          }
          const l = veoFindNewTileIds(r, a, s);
          if (l.length >= c) {
            const t = l.slice(0, c);
            return o && t.forEach(e => s.add(e)), {
              success: !0,
              tileIds: t
            }
          }
          if (1 === c && l.length > 0) return o && s.add(l[0]), {
            success: !0,
            tileIds: [l[0]]
          };
          S(`⏳ Waiting for new tiles... attempt ${n+1}/${u} (${l.length}/${c}, known=${a.size})`), n++,
            await p(500)
        }
        return A(`Could not find tile IDs (${a.size} known before submit)`), {
          success: !1,
          tileIds: []
        }
      } catch (l) {
        return D("Error in waitForTileIds:", l), {
          success: !1,
          tileIds: []
        }
      }
    }, veoScrollTileIntoView = e => {
      try {
        const t = e?.get?.(0) ?? e;
        t?.scrollIntoView?.({
          block: "nearest",
          inline: "nearest",
          behavior: "instant"
        })
      } catch {}
    }, veoInspectTile = (e, t) => {
      if (!e || !e.length) return {
        ready: !1,
        pct: 0,
        resource: null,
        error: !1
      };
      const n = e.find("video").toArray(),
        r = e.find("img").toArray();
      for (const e of n)
        if (e.src && e.src.length > 8 && (e.readyState >= 2 || e.duration > 0 || e.src.startsWith(
            "blob:"))) return {
          ready: !0,
          pct: 100,
          resource: e,
          error: !1
        };
      for (const e of r)
        if (e.src && e.src.length > 8 && (e.naturalWidth > 0 || e.complete)) return {
          ready: !0,
          pct: 100,
          resource: e,
          error: !1
        };
      const o = e.find("div").filter(function() {
          return /^\d+%$/.test(i(this).text().trim())
        }),
        a = e.find(t.tileOnQueue);
      if (o.length) {
        const e = o.first().text().trim().match(/^(\d+)%$/);
        return {
          ready: !1,
          pct: e ? parseInt(e[1], 10) : 0,
          resource: null,
          error: !1
        }
      }
      if (a.length) return {
        ready: !1,
        pct: 5,
        resource: null,
        error: !1
      };
      return veoFlowTextMatchesAny(e.text().toLowerCase(), veoFlowFailPatterns) ? {
        ready: !1,
        pct: 0,
        resource: null,
        error: !0
      } : {
        ready: !1,
        pct: 0,
        resource: null,
        error: !1
      }
    },
    veoHandlePromptFlowBlockError = (jobGroup, message, job, progressPct, tileIdsError, onUpdate) => {
      if (!jobGroup || !message) return null;
      const requeueIndex = (job.promptIndex ?? 1) - 1;
      const isBlock = veoIsModelQuotaMessage(message) || veoFlowTextMatchesAny(message, veoFlowQuotaPatterns) ||
        veoIsUnusualActivityMessage(message);
      if (!isBlock) return null;
      const blockResult = veoHandleFlowBlockError(jobGroup, message, onUpdate, {
        requeueIndex
      });
      if ("model-switch" === blockResult) return veoReportPromptProgress(job, progressPct, "error"), {
        success: !1,
        resourceElements: [],
        tileIdsError: tileIdsError || [],
        error: message,
        modelSwitch: !0
      };
      if ("unusual-retry" === blockResult) return veoReportPromptProgress(job, progressPct, "error"), {
        success: !1,
        resourceElements: [],
        tileIdsError: tileIdsError || [],
        unusualRetry: !0,
        error: message
      };
      if (veoFlowBlockIsFatal(blockResult)) return veoReportPromptProgress(job, progressPct, "error"), {
        success: !1,
        resourceElements: [],
        tileIdsError: tileIdsError || [],
        fatal: !0,
        error: jobGroup.errorMessage || jobGroup.fatalError || message
      };
      return null
    }, W = async (e, t, n, r) => {
      if (!r) return {
        success: !1,
        resourceElements: [],
        tileIdsError: []
      };
      const o = r.selectors;
      try {
        const r = t.mode.includes("ToVideo"),
          a = t.outputCount;
        let s = 0,
          veoLastPct = -1,
          veoStallCount = 0;
        const c = 150;
        for (; s < c;) {
          if (n && n()) return {
            success: !1,
            resourceElements: [],
            tileIdsError: []
          };
          const jobGroup = Z.find(e => e.id === t.groupId);
          if (jobGroup) {
            const blockResult = veoHandleFlowBlockError(jobGroup, null, re, {
              requeueIndex: (t.promptIndex ?? 1) - 1
            });
            if ("model-switch" === blockResult) return {
              success: !1,
              resourceElements: [],
              tileIdsError: [],
              modelSwitch: !0
            };
            if ("unusual-retry" === blockResult) return {
              success: !1,
              resourceElements: [],
              tileIdsError: [],
              unusualRetry: !0
            };
            if (veoFlowBlockIsFatal(blockResult)) return {
              success: !1,
              resourceElements: [],
              tileIdsError: [],
              fatal: !0,
              error: jobGroup.errorMessage || jobGroup.fatalError
            };
          }
          const u = e.map(e => i(o.tileByIdTemplate.replace("{tileId}", e)).first()).filter(e => e
            .length > 0);
          if (0 === u.length) {
            S(`⏳ Attempt ${s+1} - tiles not in DOM yet...`), s++, await p(2e3);
            continue
          }
          let l = [],
            d = [],
            f = 0,
            h = [],
            g = 0;
          for (let n = 0; n < u.length; n++) {
            let a = u[n];
            const s = e[n];
            veoScrollTileIntoView(a);
            let c = veoInspectTile(a, o);
            for (let e = 0; e < 3 && !c.ready && !c.error && 0 === c.pct; e++) e > 0 && await p(800),
              a = i(o.tileByIdTemplate.replace("{tileId}", s)).first(), veoScrollTileIntoView(a), c =
              veoInspectTile(a, o);
            if (c.error) h.push(s);
            else if (c.ready) r ? l.push(c.resource) : d.push(c.resource), g++, f += 100;
            else f += c.pct
          }
          const m = Math.round(f / u.length);
          veoStallCount = m === veoLastPct ? veoStallCount + 1 : 0, veoLastPct = m;
          const y = (r ? l : d).slice(0, a);
          if (S(
            `⏳ Generation: ${m}% — ${g}/${a} ready${h.length>0?`, ${h.length} tile(s) error`:""}`), h
            .length > 0 && 0 === g && (h.length >= a || h.length >= u.length && (m >= 70 ||
              veoStallCount >= 3))) {
            const n = i(o.tileByIdTemplate.replace("{tileId}", h[0])).first(),
              s = veoExtractFlowFailMessage(n.text(), "Flow: tile generation failed"),
              jobGroup = Z.find(e => e.id === t.groupId),
              blocked = jobGroup && veoHandlePromptFlowBlockError(jobGroup, s, t, m, h, re);
            if (blocked) return blocked;
            if (veoIsContentBlockMessage(s)) return await veoFinishContentBlockPromptError(t, s, m, h);
            return veoReportPromptProgress(t, m, "error"), {
              success: !1,
              resourceElements: [],
              tileIdsError: h,
              error: s
            }
          }
          const flowPromptErr = veoDetectFlowPromptError();
          if (flowPromptErr) {
            const e = Z.find(e => e.id === t.groupId),
              blocked = e && veoHandlePromptFlowBlockError(e, flowPromptErr, t, m, h, re);
            if (blocked) return blocked;
            if (veoIsContentBlockMessage(flowPromptErr)) return await veoFinishContentBlockPromptError(t,
              flowPromptErr, m, h);
            return veoReportPromptProgress(t, m, "error"), {
              success: !1,
              resourceElements: [],
              tileIdsError: h,
              error: flowPromptErr
            }
          }
          if (g >= a || m >= 99 && g >= a || veoStallCount >= 15 && g >= a) {
            if (g < a) return veoReportPromptProgress(t, m, "error"), {
              success: !1,
              resourceElements: y,
              tileIdsError: h,
              error: `Only ${g}/${a} output(s) ready`
            };
            try {
              veoReportPromptProgress(t, 100, "completed")
            } catch {}
            return {
              success: !0,
              resourceElements: y,
              tileIdsError: h
            }
          }
          try {
            veoReportPromptProgress(t, m, "generating")
          } catch {}
          await p(2e3), s++
        }
        return A("Generation did not complete within timeout"), veoReportPromptProgress(t, 0,
          "error"), {
            success: !1,
            resourceElements: [],
            tileIdsError: []
          }
      } catch (a) {
        return D("Error in waitForResourcesInTiles:", a), {
          success: !1,
          resourceElements: [],
          tileIdsError: []
        }
      }
    }, U = async (e, t, n, r) => {
      if (!r) return {
        success: !1
      };
    const o = r.selectors,
      jobGroup = t.groupId ? Z.find(e => e.id === t.groupId) : null;
    try {
      const c = await W(e, t, n, r);
      if (!c.success) return n && n() ? {
          success: !1,
          cancelled: !0
        } : c.modelSwitch ? {
          success: !1,
          modelSwitch: !0,
          error: c.error
        } : c.unusualRetry ? {
          success: !1,
          unusualRetry: !0,
          error: c.error
        } : c.contentBlock ? {
          success: !1,
          contentBlock: !0,
          skipRetry: !0,
          error: c.error
        } : c.fatal ? {
          success: !1,
          fatal: !0,
          error: c.error
        } : (A(`⚠️ Prompt generation failed for prompt ${t.promptIndex}, skipping download`), {
          success: !1,
          error: c.error || "Prompt generation failed"
        });
        const u = c.tileIdsError || [],
          l = e.filter(e => !u.includes(e)).slice(0, Math.max(1, Number(t.outputCount) || 1));
        if (0 === l.length) {
          const e = Z.find(e => e.id === t.groupId);
          if (e) {
            const blockResult = veoHandleFlowBlockError(e, null, re, {
              requeueIndex: (t.promptIndex ?? 1) - 1
            });
            if ("model-switch" === blockResult) return {
              success: !1,
              modelSwitch: !0
            };
            if ("unusual-retry" === blockResult) return {
              success: !1,
              unusualRetry: !0
            };
            if (veoFlowBlockIsFatal(blockResult)) return {
              success: !1,
              fatal: !0,
              error: e.errorMessage || e.fatalError
            };
          }
          return A(`⚠️ All tiles have warning for prompt ${t.promptIndex}, need retry`), await p(
            3e3), {
            success: !1,
            error: "Prompt generation failed"
          }
        }
        u.length > 0 && S(
          `⚠️ Filtered ${u.length} error tile(s) for prompt ${t.promptIndex}: [${u.join(", ")}]`);
        const d = async () => {
          if (t.isConcat && t.mode.includes("ToVideo")) {
            const e = c.resourceElements;
            if (e.length > 0) {
              const t = await T(e);
              if (t) return {
                extractedFrame: t
              }
            }
            return {}
          }
          return t.isConcat && t.mode.includes("ToImage") ? {
            nextPromptEditImage: !0,
            tileIds: l
          } : {}
        };
        if ("no-download" === t.autoDownloadResourceQuality) return S(
          `📥 Skipping download for prompt ${t.promptIndex} (no-download)`), {
          success: !0,
          ...await d()
        };
        const g = t.folderName.trim(),
          h = veoBuildOutputFileStem(t.promptIndex, t.prompt);
        S(`📁 Download folder set: ${g||"(default)"}`);
        const y = l.map(e => i(o.tileByIdTemplate.replace("{tileId}", e)).first()).filter(e => e
          .length > 0).map(e => e[0]);
        if ("1080" === t.autoDownloadResourceQuality || "720" === t.autoDownloadResourceQuality ||
          "2k" === t.autoDownloadResourceQuality || "4k" === t.autoDownloadResourceQuality) {
          let e;
          switch (S(
              `📥 Downloading prompt ${t.promptIndex} in ${t.autoDownloadResourceQuality} (${y.length} tile(s))...`
              ), t.autoDownloadResourceQuality) {
            case "2k":
              e = o.quality2KOption;
              break;
            case "4k":
              e = o.quality4KOption;
              break;
            default:
              e = o.quality1080Option
          }
          const r = t.maxRetries ?? 1;
          let veoUiDlOk = 0;
          for (let i = 0; i < y.length; i++) {
            if (n && n()) return {
              success: !1,
              cancelled: !0
            };
            const s = l[i];
            let c = !1;
            for (let u = 1; u <= r; u++) {
              if (n && n()) return {
                success: !1,
                cancelled: !0
              };
              try {
                const tileSel = o.tileByIdTemplate.replace("{tileId}", s),
                  $tile = i(tileSel).first(),
                  tileStem = veoBuildOutputFileStemWithVariant(t.promptIndex, t.prompt, i, y.length),
                  autoName = !1 !== t.autoChangeFileName,
                  dlKey = veoDownloadAssetKey(t.promptIndex, tileStem, s);
                if (jobGroup && veoShouldSkipDownload(jobGroup, dlKey)) {
                  S(`⏭️ Skip duplicate download: ${tileStem}`), c = !0, veoUiDlOk++;
                  break
                }
                await veoRunUiDownloadExclusive(g, tileStem, autoName, async () => {
                  S(
                    `📥 Tile ${i+1}/${y.length} [${s}]: chờ sẵn sàng tải ${t.autoDownloadResourceQuality}p (${tileStem})...`
                    );
                  if (!await veoWaitBeforeHighResDownload(n, $tile)) throw new Error(
                    "Resolution upscale wait timeout");
                  S(`📥 Tile ${i+1}/${y.length} [${s}]: trying to download... (attempt ${u}/${r})`);
                  await m(tileSel, `Tile ${i+1} [${s}] hover tile`), await v(
                      `${tileSel} ${o.moreOptionsButtonInHoverTile}`) && await w(
                      `${tileSel} ${o.moreOptionsButtonInHoverTile}`, `Tile ${i+1} download button`),
                    await v(o.downloadButtonInHoverTile) && await m(o.downloadButtonInHoverTile,
                      `Tile ${i+1} download button`), await w(e,
                      `Tile ${i+1}: ${t.autoDownloadResourceQuality} option`),
                    veoIsResolutionUpscaleActive($tile) && (S(
                        `📥 Tile ${i+1}: Flow đang tăng độ phân giải, chờ hoàn tất...`), await
                      veoWaitForResolutionUpscaleIdle(n, 6e5, $tile))
                });
                jobGroup && veoMarkDownloaded(jobGroup, dlKey), S(
                  `✅ Tile ${i+1}: ${t.autoDownloadResourceQuality} download initiated as ${tileStem}`),
                  c = !0, veoUiDlOk++;
                break
              } catch (a) {
                A(`⚠️ Tile ${i+1} [${s}] attempt ${u}/${r} failed:`, a), u < r && await p(1e3)
              }
            }
            c || D(`❌ Tile ${i+1} [${s}]: all ${r} attempts failed, skipping`)
          }
          return veoUiDlOk >= y.length ? {
            success: !0,
            ...await d()
          } : (A(`⚠️ Downloaded ${veoUiDlOk}/${y.length} tile(s) for prompt ${t.promptIndex}`), {
            success: !1,
            error: `Download failed (${veoUiDlOk}/${y.length})`
          })
        }
        const x = c.resourceElements.slice(0, Math.max(1, Number(t.outputCount) || 1)),
          b = t.mode.includes("ToVideo");
        S(`📥 Downloading ${x.length} resource(s) for prompt ${t.promptIndex}...`);
        let R = 0;
        for (let e = 0; e < x.length; e++) {
          if (n && n()) return S("❌ Resource download cancelled"), {
            success: !1,
            cancelled: !0
          };
          let r = x[e].src;
          if (!r && b && o.quality1080Option) {
            A(`⚠️ Resource ${e+1} has no src — trying Flow UI download (1080)...`);
            const tileId = l[e];
            if (tileId) try {
              const tileSel = o.tileByIdTemplate.replace("{tileId}", tileId),
                $tile = i(tileSel).first(),
                tileStem = veoBuildOutputFileStemWithVariant(t.promptIndex, t.prompt, e, x.length),
                autoName = !1 !== t.autoChangeFileName,
                a = t.maxRetries ?? 1;
              for (let s = 1; s <= a; s++) {
                try {
                  const dlKey = veoDownloadAssetKey(t.promptIndex, tileStem, tileId);
                  if (jobGroup && veoShouldSkipDownload(jobGroup, dlKey)) {
                    S(`⏭️ Skip duplicate UI fallback download: ${tileStem}`), R++;
                    break
                  }
                  await veoRunUiDownloadExclusive(g, tileStem, autoName, async () => {
                    if (!await veoWaitBeforeHighResDownload(n, $tile)) throw new Error(
                      "Resolution upscale wait timeout");
                    await m(tileSel, `Tile ${e+1} hover`), await v(
                      `${tileSel} ${o.moreOptionsButtonInHoverTile}`) && await w(
                      `${tileSel} ${o.moreOptionsButtonInHoverTile}`, "Download menu"), await v(o
                      .downloadButtonInHoverTile) && await m(o.downloadButtonInHoverTile,
                      "Download button"), await w(o.quality1080Option, "1080 option"),
                    veoIsResolutionUpscaleActive($tile) && await veoWaitForResolutionUpscaleIdle(n, 6e5,
                      $tile)
                  });
                  jobGroup && veoMarkDownloaded(jobGroup, dlKey), R++, S(
                    `✅ Tile ${e+1}: UI download initiated (1080 fallback) as ${tileStem}`);
                  break
                } catch (c) {
                  s < a && await p(1e3)
                }
              }
              continue
            } catch (u) {
              A(`⚠️ UI download fallback failed for tile ${e+1}:`, u)
            }
          }
          if (!r) {
            A(`⚠️ Resource ${e+1} has no src, skipping...`);
            continue
          }
          const variantLabel = x.length > 1 ? `_${e + 1}` : "";
          S(`📹 Resource ${t.promptIndex}${variantLabel}: ${r.substring(0,100)}...`);
          try {
            const autoName = !1 !== t.autoChangeFileName;
            let n, i;
            if (autoName) {
              const stem = veoBuildOutputFileStemWithVariant(t.promptIndex, t.prompt, e, x.length),
                ext = veoGetOutputFileExtension(t.prompt, b);
              n = `${stem}.${ext}`, i = t.folderName.trim()
            } else {
              n = new URL(r).pathname.split("/").pop() || `${String(t.promptIndex).padStart(3, "0")}_resource${variantLabel || `_${e + 1}`}.png`, i = ""
            }
            const dlKey = veoDownloadAssetKey(t.promptIndex, n, null, r);
            if (jobGroup && veoShouldSkipDownload(jobGroup, dlKey)) {
              S(`⏭️ Skip duplicate URL download: ${n}`), R++;
              continue
            }
            const a = await chrome.runtime.sendMessage({
              type: "DOWNLOAD_VIDEO",
              url: r,
              filename: n,
              folder: i,
              autoChangeFileName: autoName
            }).then(e => e || {
              success: !1,
              error: "No response from background script"
            }).catch(e => ({
              success: !1,
              error: e.message || String(e)
            }));
            if (!a.success) throw new Error(a.error || "Failed to initiate download");
            jobGroup && veoMarkDownloaded(jobGroup, dlKey), S(
              `✅ Resource ${t.promptIndex}${variantLabel} downloaded to ${i}/${n}`), R++, await p(500)
          } catch (s) {
            D(`❌ Error downloading resource ${t.promptIndex}${variantLabel}:`, s)
          }
        }
        return R > 0 ? {
          success: !0,
          ...await d()
        } : (A(`⚠️ No resources downloaded for prompt ${t.promptIndex}`), {
          success: !1,
          error: "Download failed"
        })
      } catch (a) {
        return D("Error in downloadFromTileIds:", a), {
          success: !1
        }
      }
    };

  function V(e, t) {
    if (0 === t) return !0;
    const n = t - 1;
    if (e.payloads[t - 1].isConcat) {
      const t = e.completedPromptIndexes.has(n);
      return t
    }
    return !0
  }

  function veoHasPendingGeneration(e) {
    const pending = e.pendingIndexes;
    if (!Array.isArray(pending) || pending.length === 0) return !1;
    const done = e.completedPromptIndexes;
    if (!(done instanceof Set)) return !0;
    return pending.some((idx) => !done.has(idx));
  }

  function veoAdvanceDownloadCursor(e, t) {
    e.pendingDownloads = e.pendingDownloads || {};
    e.nextDownloadIndex = e.nextDownloadIndex ?? 0;
    for (; e.nextDownloadIndex < e.totalCount;) {
      const n = e.nextDownloadIndex;
      if (Object.prototype.hasOwnProperty.call(e.pendingDownloads, n)) {
        if (null !== e.pendingDownloads[n]) break;
        delete e.pendingDownloads[n], e.nextDownloadIndex++;
        continue
      }
      const r = veoGetResultForIndex(e, n);
      if (r?.downloadComplete || r?.cancelled || !1 === r?.success || r?.error) {
        e.nextDownloadIndex++;
        continue
      }
      if (veoIsDownloadQueuedForIndex(e, n, t || [])) break;
      break
    }
  }

  function veoGroupDownloadsPending(e, t) {
    if ((t || []).some(n => n.id === e.id && "completed" !== n.status)) return !0;
    return (e.results || []).some(n => !1 !== n.success && !n.downloadComplete && !n.cancelled && !n.error)
  }

  function veoEnsureDownloadKeySet(e) {
    if (!e.downloadedAssetKeys || !(e.downloadedAssetKeys instanceof Set)) {
      const t = e.downloadedAssetKeys;
      e.downloadedAssetKeys = new Set(Array.isArray(t) ? t : t ? [...t] : [])
    }
    return e.downloadedAssetKeys
  }

  function veoDownloadAssetKey(e, t, n, r) {
    return n ? `tile:${n}:${t}` : r ? `url:${r}:${t}` : `stem:${e}:${t}`
  }

  function veoShouldSkipDownload(e, t) {
    return !e?.downloadOnly && veoEnsureDownloadKeySet(e).has(t)
  }

  function veoMarkDownloaded(e, t) {
    veoEnsureDownloadKeySet(e).add(t)
  }

  function veoResultIndex(e) {
    return e?.index ?? Math.max(0, (e?.config?.promptIndex ?? 1) - 1)
  }

  function veoGetResultForIndex(e, t) {
    return (e.results ?? []).find(e => (e.index ?? e.promptIndex - 1) === t)
  }

  function veoIsDownloadQueuedForIndex(e, t, n) {
    return n.some(n => n.id === e.id && "completed" !== n.status && (n.items ?? []).some(n => veoResultIndex(
      n) === t))
  }

  function pe(e, t) {
    veoAdvanceDownloadCursor(e, t)
  }

  function ue(e, t, n, o) {
    if (e.pendingDownloads = e.pendingDownloads || {}, e.nextDownloadIndex = e.nextDownloadIndex ?? 0, n) {
      const i = veoResultIndex(n);
      if (veoGetResultForIndex(e, i)?.downloadComplete) return S(
          `⏭️ Skip download queue — prompt ${i + 1} already downloaded`), fe(e, o);
      if (veoIsDownloadQueuedForIndex(e, i, o)) return S(
        `⏭️ Skip download queue — prompt ${i + 1} already queued`);
      return e.downloadItems = e.downloadItems || [], e.downloadItems.push(n), o.push({
        id: e.id,
        items: [n],
        status: "queued",
        isCancelling: !!e.isCancelling
      }), void S(`📥 Queued download prompt ${n.promptIndex ?? t + 1}`)
    }
    e.pendingDownloads[t] = null, veoAdvanceDownloadCursor(e, o)
  }

  function fe(e, t) {
    e.nextDownloadIndex = (e.nextDownloadIndex ?? 0) + 1, veoAdvanceDownloadCursor(e, t)
  }

  function veoFinalizeRecoveryPassSummary(e) {
    const indexes = e.recoveryPassRetryIndexes;
    if (!indexes?.length) return;
    let succeeded = 0,
      failed = 0;
    for (const idx of indexes) {
      const r = (e.results || []).find((res) => (res.index ?? res.promptIndex - 1) === idx);
      r?.success && !r?.cancelled ? succeeded++ : failed++
    }
    e.recoveryPassSummary = {
      succeeded,
      failed,
      total: indexes.length
    };
    delete e.recoveryPassRetryIndexes;
    S(`🔄 Chạy lại prompt lỗi xong: ${succeeded} thành công, ${failed} lỗi`)
  }

  function veoFailedDownloadResult(downloadItem, index, promptIndex, error) {
    const tileIds = Array.isArray(downloadItem?.tileIds) && downloadItem.tileIds.length ?
      downloadItem.tileIds.slice() :
      void 0;
    return {
      index,
      promptIndex,
      success: !1,
      downloadComplete: !0,
      ...tileIds?.length ? {
        tileIds
      } : {},
      error
    }
  }

  function veoDownloadRecoveryPass(e, t) {
    if (e.downloadRecoveryPassDone || e.downloadOnly) return !1;
    const n = (e.results || []).filter(e => !e.cancelled && !e.success && e.downloadComplete && Array.isArray(e
      .tileIds) && e.tileIds.length).map(e => e.index ?? e.promptIndex - 1).sort((e, t) => e - t);
    if (!n.length) return !1;
    e.downloadRecoveryPassDone = !0, e.recoveryPassActive = !0;
    for (const r of n) {
      const o = veoGetResultForIndex(e, r);
      if (!o?.tileIds?.length) continue;
      o.success = !0, o.downloadComplete = !1, delete o.error, e.downloadRetryCountByIndex && delete e
        .downloadRetryCountByIndex[r];
      const i = e.payloads[r] || {};
      ue(e, r, {
        tileIds: o.tileIds.slice(),
        config: {
          ...i,
          groupId: e.id
        },
        promptIndex: i.promptIndex ?? r + 1,
        index: r,
        retryCount: 0
      }, t)
    }
    return e.nextDownloadIndex = Math.min(e.nextDownloadIndex ?? 0, n[0]), re(e), S(
      `🔄 Tải lại ${n.length} file lỗi (giữ tile đã tạo)`), !0
  }

  function Be(e) {
    if (e.finalRetryPassDone) return !1;
    const t = e.results.filter(e => !e.success && !e.cancelled && !(Array.isArray(e.tileIds) && e.tileIds.length))
      .map(e => e.index ?? e.promptIndex - 1).sort((e, t) => e - t);
    if (e.finalRetryPassDone = !0, 0 === t.length) return !1;
    e.recoveryPassActive = !0;
    e.recoveryPassRetryIndexes = [...t];
    e.recoveryPassSummary = void 0;
    for (const n of t) e.results = e.results.filter(e => e.index !== n), e.completedPromptIndexes.delete(n), delete e
      .retryCountByIndex[n], e.downloadRetryCountByIndex && delete e.downloadRetryCountByIndex[n], e.pendingDownloads &&
      delete e.pendingDownloads[n];
    return e.processedCount = e.results.length, e.pendingIndexes = t, e.nextDownloadIndex = Math.min(e
      .nextDownloadIndex ?? 0, t[0]), re(e), !0
  }

  function veoGetSuccessfulIndexes(e) {
    const t = new Set;
    for (const n of e.results ?? []) n.success && t.add(n.index ?? n.promptIndex - 1);
    return t
  }

  function veoStableSettingsKey(e) {
    return JSON.stringify(veoStableFlowSettings(e))
  }

  function veoGetActiveBatchGroup(excludeId) {
    return Z.find(g => !g.downloadOnly && (g.isPaused || "queued" === g.status || "running" === g.status || "paused" === g.status) && g.id !== excludeId)
  }

  function veoApplyResumeDispatchOptions(e, t) {
    null != t?.concurrentPrompts && (e.concurrentPrompts = veoEffectiveConcurrent(t.concurrentPrompts));
    void 0 !== t?.promptDelaySecondsMin && (e.promptDelaySecondsMin = t.promptDelaySecondsMin);
    void 0 !== t?.promptDelaySecondsMax && (e.promptDelaySecondsMax = t.promptDelaySecondsMax);
  }

  function veoEnsurePromptWorkers(e, t, n, r) {
    if (e.isCancelling || e.isPaused || e.pendingModelSwitch) return;
    e._promptWorkersAlive = e._promptWorkersAlive ?? 0;
    const o = veoEffectiveConcurrent(e.concurrentPrompts);
    for (; e._promptWorkersAlive < o;) {
      e._promptWorkersAlive++;
      X(e, t, n, r).catch(() => {}).finally(() => {
        e._promptWorkersAlive = Math.max(0, (e._promptWorkersAlive ?? 1) - 1);
      });
    }
  }

  function veoMergeResumePayloads(e, t, n) {
    if (!t?.length) return;
    const r = e.payloads ?? [],
      o = veoGetSuccessfulIndexes(e);
    let i = "number" == typeof e.currentPromptIndex ? e.currentPromptIndex : null;
    null !== i && o.has(i) && (i = null);
    const a = t.map((t, n) => ({
      ...t,
      groupId: e.id,
      promptIndex: n + 1
    }));
    for (let t = 0; t < a.length; t++)
      if (o.has(t) && r[t]) a[t] = {
        ...r[t],
        folderName: a[t].folderName,
        autoChangeFileName: a[t].autoChangeFileName,
        autoDownloadResourceQuality: a[t].autoDownloadResourceQuality,
        groupId: e.id,
        promptIndex: t + 1
      };
    e.payloads = a, e.totalCount = a.length, e.promptPreviews = a.map(e => formatPromptPreview(e.prompt));
    veoApplyResumeDispatchOptions(e, n);
    let s = !1;
    for (let t = 0; t < a.length; t++)
      if (!o.has(t)) {
        const n = r[t],
          i = a[t];
        if (!n || n.prompt !== i.prompt || veoStableSettingsKey(n) !== veoStableSettingsKey(i)) {
          s = !0;
          break
        }
      }
    s && (e.flowSettingsApplied = !1);
    const c = (e.results ?? []).filter(t => {
      const n = t.index ?? t.promptIndex - 1;
      return o.has(n) && t.success && n < a.length
    });
    if (null !== i && !o.has(i)) {
      const t = i;
      e.retryCountByIndex && delete e.retryCountByIndex[t], e.downloadRetryCountByIndex && delete e
        .downloadRetryCountByIndex[t], e.pendingDownloads && delete e.pendingDownloads[t]
    }
    e.results = c, e.completedPromptIndexes = new Set(o), e.processedCount = c.length;
    const u = [];
    for (let e = 0; e < a.length; e++) o.has(e) || u.push(e);
    null !== i ? e.pendingIndexes = [i, ...u.filter(e => e !== i)] : e.pendingIndexes = u, e
      .recoveryPassActive = !1, S(`🔄 Merged resume settings for group ${e.id} — ${u.length} prompt(s) pending`)
  }

  function G(e, t) {
    for (let n = 0; n < e.pendingIndexes.length; n++) {
      const t = e.pendingIndexes[n];
      if (e.completedPromptIndexes?.has?.(t)) {
        e.pendingIndexes.splice(n, 1);
        n--;
        continue
      }
      if (V(e, t)) return e.pendingIndexes.splice(n, 1), t
    }
    return null
  }
  const z = e => new Promise(t => setTimeout(t, e)),
    veoEffectiveConcurrent = e => Math.min(MAX_CONCURRENT_PROMPTS, Math.max(1, Number(e) || 1)),
    veoSyncDelayLegacyFields = e => {
      const map = e.promptDelayEndsAt ?? {},
        now = e.isPaused && e.delayPauseStartedAt ? Number(e.delayPauseStartedAt) : Date.now();
      let bestIdx, bestEnd = 0;
      for (const [k, v] of Object.entries(map)) {
        const end = Number(v);
        end > now && end >= bestEnd && (bestEnd = end, bestIdx = Number(k))
      }
      void 0 !== bestIdx ? (e.delayPromptIndex = bestIdx, e.delayEndsAt = bestEnd, e.delayRemainingSeconds = Math
        .max(0, Math.ceil((bestEnd - now) / 1e3))) : (e.delayPromptIndex = void 0, e.delayEndsAt = void 0, e
        .delayRemainingSeconds = 0, e.delayTotalSeconds = void 0)
    },
    veoCountActivePromptDelays = e => {
      const map = e.promptDelayEndsAt ?? {},
        now = Date.now();
      let n = 0;
      for (const v of Object.values(map)) Number(v) > now && n++;
      return n
    },
    veoClearPromptDelay = (e, promptIndex, t) => {
      e.promptDelayEndsAt = e.promptDelayEndsAt ?? {}, delete e.promptDelayEndsAt[promptIndex], e
        .promptDelayPickedSeconds = e.promptDelayPickedSeconds ?? {}, delete e.promptDelayPickedSeconds[
          promptIndex], veoSyncDelayLegacyFields(e), t?.(e)
    },
    veoAcquireDelayPickLock = async jobGroup => {
      jobGroup._delayPickQueue = jobGroup._delayPickQueue || Promise.resolve();
      const prev = jobGroup._delayPickQueue;
      let release;
      jobGroup._delayPickQueue = new Promise(r => {
        release = r
      });
      await prev;
      return release
    },
    veoPickSpreadPromptDelay = (jobGroup, min, max, activeDelayCount = 0, maxConcurrent = 1) => {
      const lo = Math.max(0, Math.ceil(Number(min) || 0)),
        hi = Math.max(lo, Math.floor(Number(max) || lo));
      if (hi <= lo) return lo;
      const span = hi - lo,
        recent = jobGroup._recentPromptDelays = jobGroup._recentPromptDelays || [],
        picksMap = jobGroup.promptDelayPickedSeconds ?? {},
        delayMap = jobGroup.promptDelayEndsAt ?? {},
        now = Date.now(),
        activePicks = [];
      for (const [k, end] of Object.entries(delayMap)) {
        const sec = picksMap[k];
        Number(end) > now && "number" == typeof sec && activePicks.push(Math.round(sec))
      }
      const slices = Math.max(1, Math.min(Math.max(1, maxConcurrent), MAX_CONCURRENT_PROMPTS, span + 1)),
        sliceWidth = Math.max(1, Math.ceil((span + 1) / slices)),
        minGap = Math.max(1, Math.min(Math.max(8, Math.ceil(.65 * span)), sliceWidth)),
        farEnough = candidate => recent.every(r => Math.abs(candidate - r) >= minGap) && activePicks.every(
          r => Math.abs(candidate - r) >= minGap),
        occupied = new Set();
      for (const p of activePicks) occupied.add(Math.min(slices - 1, Math.floor((p - lo) / sliceWidth)));
      let sliceIndex = activeDelayCount % slices;
      if (occupied.has(sliceIndex))
        for (let s = 1; s < slices && occupied.has(sliceIndex); s++) sliceIndex = (activeDelayCount + s) %
          slices;
      const trySlice = idx => {
        const sliceLo = Math.min(hi, lo + idx * sliceWidth),
          sliceHi = Math.min(hi, sliceLo + sliceWidth - 1);
        return sliceLo + Math.floor(Math.random() * (sliceHi - sliceLo + 1))
      },
        commitPick = candidate => (jobGroup.lastPromptDelaySeconds = candidate, recent.push(candidate), recent
          .length > MAX_CONCURRENT_PROMPTS && recent.shift(), candidate);
      for (let round = 0; round < slices; round++) {
        const idx = (sliceIndex + round) % slices;
        for (let attempt = 0; attempt < 12; attempt++) {
          const candidate = trySlice(idx);
          if (farEnough(candidate)) return commitPick(candidate)
        }
        const sliceLo = Math.min(hi, lo + idx * sliceWidth),
          sliceHi = Math.min(hi, sliceLo + sliceWidth - 1),
          mid = Math.min(hi, sliceLo + Math.floor((sliceHi - sliceLo) / 2));
        if (farEnough(mid)) return commitPick(mid)
      }
      const spreadStep = Math.max(1, Math.round(span / slices)),
        fallback = Math.min(hi, lo + (activeDelayCount % slices) * spreadStep);
      return commitPick(fallback)
    },
    veoWaitGenerationCooldown = async (e, t, promptIndex) => {
        const n = e.promptDelaySecondsMin ?? 0,
          r = e.promptDelaySecondsMax ?? n;
        if (e.promptDelayEndsAt = e.promptDelayEndsAt ?? {}, n <= 0 && r <= 0) return veoClearPromptDelay(e,
          promptIndex, t), !e.isCancelling;
        const releasePick = await veoAcquireDelayPickLock(e);
        let waitSec, endsAt;
        try {
          if (!FLOW_INPUT_CONFIG.noFirstPromptSkip && !e._firstPromptCooldownUsed && !(e.processedCount || 0) && !(e.activeGenerationCount || 0)) {
            e._firstPromptCooldownUsed = !0;
            return veoClearPromptDelay(e, promptIndex, t), e.lastGenerationStartedAt = Date.now(), !e
              .isCancelling
          }
          const activeCount = veoCountActivePromptDelays(e),
            maxConc = veoEffectiveConcurrent(e.concurrentPrompts);
          waitSec = veoPickSpreadPromptDelay(e, n, r, activeCount, maxConc);
          e.promptDelayPickedSeconds = e.promptDelayPickedSeconds ?? {}, e.promptDelayPickedSeconds[promptIndex] =
            waitSec;
          endsAt = Date.now() + waitSec * 1e3;
          e.promptDelayEndsAt[promptIndex] = endsAt, e.delayTotalSeconds = Math.ceil(waitSec);
          veoSyncDelayLegacyFields(e), t(e)
        } finally {
          releasePick()
        }
        const tick = () => {
          e.promptDelayEndsAt[promptIndex] = endsAt, veoSyncDelayLegacyFields(e), t(e)
        };
        for (;;) {
          if (e.isCancelling) return veoClearPromptDelay(e, promptIndex, t), !1;
          if (e.isPaused) {
            const pauseStart = Date.now();
            for (; e.isPaused && !e.isCancelling;) await z(500);
            if (e.isCancelling) return veoClearPromptDelay(e, promptIndex, t), !1;
            endsAt += Date.now() - pauseStart, e.promptDelayEndsAt[promptIndex] = endsAt, tick()
          }
          const remaining = endsAt - Date.now();
          if (remaining <= 0) break;
          await z(Math.min(250, remaining)), tick()
        }
        return veoClearPromptDelay(e, promptIndex, t), e.lastGenerationStartedAt = Date.now(), !0
      },
    veoWaitUnusualCooldown = async (e, t) => {
        const until = e.unusualCooldownUntil;
        if (!until || Date.now() >= until) return !e.isCancelling;
        for (S(`⏳ Chờ sau hoạt động bất thường (${Math.ceil((until - Date.now()) / 1e3)}s)...`);;) {
          if (e.isCancelling) return !1;
          if (e.isPaused) {
            await z(500);
            continue
          }
          const remaining = until - Date.now();
          if (remaining <= 0) break;
          e.delayRemainingSeconds = Math.ceil(remaining / 1e3), t?.(e), await z(Math.min(500, remaining))
        }
        return e.unusualCooldownUntil = 0, e.delayRemainingSeconds = 0, t?.(e), !e.isCancelling
      },
      veoFlowQuotaPatterns = [/quota\s*(?:limit|exceeded|reached)/i, /exceeds?\s+(?:the\s+)?quota/i,
        /error\s*(?:code\s*)?253/i, /out of (?:google flow )?credits/i, /not enough (?:google flow )?credits/i,
        /don'?t have enough (?:google flow )?credits/i, /do not have enough (?:google flow )?credits/i,
        /(?:no|zero)\s+(?:google flow )?credits/i, /credit(?:s)?\s*(?:limit|exceeded|depleted|exhausted)/i,
        /used up (?:your |all )?(?:quota|credits|generations)/i, /daily (?:credit |generation )?limit/i,
        /monthly (?:credit )?limit/i, /rate[\s-]?limit/i, /requesting generations too quickly/i, /too many requests/i,
        /hết hạn mức/i, /hạn mức.*(?:lượt|tạo|credit)/i, /đã dùng hết.*(?:lượt|credit)/i, /không đủ.*credit/i,
        /hết.*credit/i, /l[ií]mite de (?:cuota|cr[eé]ditos)/i, /cr[eé]ditos? agotados/i, /quota d[eé]pass[eé]/i,
        /cr[eé]dits? (?:insuffisants|[eé]puis[eé]s)/i, /kontingent/i, /guthaben.*(?:aufgebraucht|erschöpft)/i,
        /配额|额度|积分.*(?:不足|用完|耗尽)/, /信用.*不足/, /할당량|크레딧.*(?:부족|소진)/, /한도.*초과/, /クレジット.*(?:不足|切れ)/, /上限.*超過/
      ],
      veoFlowUnusualPatterns = [/unusual\s+activit/i, /suspicious\s+activit/i, /hoạt động bất thường/i,
        /phát hiện.*hoạt động bất thường/i, /detect(?:ed)?\s+unusual/i, /activit[eé].*inhabituelle/i,
        /aktivit[aä]t.*ungewöhnlich/i, /异常活动/, /異常なアクティビティ/
      ],
      veoFlowGeneralFailPatterns = [/không thành công/i, /generation failed/i, /failed to generate/i,
        /policy|vi phạm|violated/i, /something went wrong/i, /could not generate/i, /unable to generate/i,
        /génération.*échoué/i, /generación fallida/i, /生成失败/, /生成に失敗/
      ],
      veoFlowContentBlockPatterns = [/content\s*block/i, /blocked\s+(?:by|due to|for)\s+(?:content|policy|safety)/i,
        /policy\s*violation/i, /safety\s*(?:filter|policy|violation)/i,
        /violat(?:e|es|ed|ing)\s+(?:our\s+)?(?:content\s+)?polic/i, /doesn'?t comply with/i,
        /not allowed.*(?:content|policy|generate)/i, /cannot generate.*(?:content|policy)/i,
        /nội dung.*(?:vi phạm|bị chặn|không được phép)/i, /vi phạm.*(?:chính sách|nội dung)/i,
        /bị chặn.*nội dung/i, /chính sách.*nội dung/i, /敏感内容|内容违规|违反.*政策|内容.*被.*阻止/
      ],
      veoFlowFailPatterns = [...veoFlowQuotaPatterns, ...veoFlowUnusualPatterns, ...veoFlowGeneralFailPatterns],
      veoFlowTextMatchesAny = (text, patterns) => {
        const normalized = (text || "").replace(/\s+/g, " ").trim();
        return !!normalized && patterns.some((pattern) => pattern.test(normalized));
      },
      veoIsQuotaLimitMessage = (message) => veoFlowTextMatchesAny(message, veoFlowQuotaPatterns) && !veoIsModelQuotaMessage(message),
      veoIsUnusualActivityMessage = (message) => veoFlowTextMatchesAny(message, veoFlowUnusualPatterns),
      veoIsContentBlockMessage = (message) => {
        if (!message) return !1;
        if (veoIsModelQuotaMessage(message) || veoFlowTextMatchesAny(message, veoFlowQuotaPatterns) ||
          veoIsUnusualActivityMessage(message)) return !1;
        return veoFlowTextMatchesAny(message, veoFlowContentBlockPatterns)
      },
      veoFlowLooksFailed = (message) => veoFlowTextMatchesAny(message, veoFlowFailPatterns),
      veoFlowFallbackLang = () => {
        const lang = (document.documentElement.lang || navigator.language || "en").toLowerCase();
        return lang.startsWith("vi") ? "vi" : "en";
      },
      veoFlowFallbackMsg = (kind, fallback) => ({
        quota: {
          en: "Flow: quota/credit limit reached — group paused",
          vi: "Flow: hết hạn mức — tạm dừng group"
        },
        unusual: {
          en: "Flow: unusual activity detected — try another profile or wait",
          vi: "Flow: hoạt động bất thường — đổi profile hoặc thử lại sau"
        },
        fail: {
          en: "Flow: generation failed",
          vi: "Flow: tạo không thành công"
        }
      } [kind][veoFlowFallbackLang()] || fallback),
      veoExtractFlowFailMessage = (text, fallback) => {
        const normalized = (text || "").replace(/\s+/g, " ").trim();
        if (!normalized) return fallback || veoFlowFallbackMsg("fail");
        const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
        const modelQuotaSentence = sentences.find((part) => veoIsModelQuotaMessage(part));
        if (modelQuotaSentence) return modelQuotaSentence.trim().slice(0, 320);
        if (veoIsModelQuotaMessage(normalized)) return normalized.slice(0, 320);
        const failedSentence = sentences.find((part) => veoFlowLooksFailed(part));
        if (failedSentence) return failedSentence.trim().slice(0, 240);
        return veoFlowLooksFailed(normalized) ? normalized.slice(0, 240) : fallback || veoFlowFallbackMsg("fail");
      },
      veoGetJobCompletedTileIds = (jobGroup) => {
        const ids = new Set(jobGroup?.claimedTileIds ?? []);
        for (const result of jobGroup?.results ?? []) {
          for (const tileId of result.tileIds ?? []) ids.add(tileId);
        }
        return ids;
      },
      veoCollectFlowSurfaceText = () => {
        let combined = "";
        try {
          document.querySelectorAll('[role="alert"], [data-sonner-toast], [data-state="open"][role="alertdialog"]')
            .forEach((node) => {
              if (!veoIsFlowSurfaceNodeVisible(node)) return;
              combined += " " + (node.textContent || "");
            });
        } catch {}
        return combined.replace(/\s+/g, " ").trim();
      },
      veoCollectFlowTileModelQuotaError = (jobGroup, requeueIndex) => {
        try {
          let found = null;
          const completedTileIds = veoGetJobCompletedTileIds(jobGroup);
          document.querySelectorAll("[data-tile-id]").forEach((node) => {
            if (found) return;
            const tileId = node.getAttribute("data-tile-id");
            if (tileId && completedTileIds.has(tileId)) return;
            const text = (node.textContent || "").replace(/\s+/g, " ").trim();
            if (text && veoIsModelQuotaMessage(text)) {
              const msg = veoExtractFlowFailMessage(text);
              if (jobGroup && veoIsStaleModelQuotaError(jobGroup, msg, requeueIndex)) return;
              found = msg
            }
          });
          return found;
        } catch {}
        return null;
      },
      veoDetectFlowQuotaError = (jobGroup, requeueIndex) => {
        try {
          const surfaceText = veoCollectFlowSurfaceText();
          if (!surfaceText) return null;
          if (veoIsModelQuotaMessage(surfaceText)) {
            const msg = veoExtractFlowFailMessage(surfaceText);
            if (jobGroup && veoIsStaleModelQuotaError(jobGroup, msg, requeueIndex)) return null;
            return msg
          }
          if (!veoFlowTextMatchesAny(surfaceText, veoFlowQuotaPatterns)) return null;
          return veoExtractFlowFailMessage(surfaceText, veoFlowFallbackMsg("quota"));
        } catch {}
        return null;
      },
      veoDetectFlowFatalError = () => {
        try {
          const surfaceText = veoCollectFlowSurfaceText();
          if (!surfaceText || !veoIsUnusualActivityMessage(surfaceText) || veoIsQuotaLimitMessage(surfaceText))
          return null;
          const msg = veoExtractFlowFailMessage(surfaceText, veoFlowFallbackMsg("unusual"));
          const now = Date.now();
          if (msg === veoFlowAlertState.lastUnusualText && now - veoFlowAlertState.lastUnusualAt < 12e4) return null;
          return msg
        } catch {}
        return null;
      },
      veoDetectFlowPromptError = () => {
        try {
          const surfaceText = veoCollectFlowSurfaceText();
          return surfaceText && veoFlowLooksFailed(surfaceText) ? veoExtractFlowFailMessage(surfaceText) : null;
        } catch {}
        return null;
      },
      veoFlowResolutionUpscalePatterns = [/đang tăng độ phân giải/i, /tăng độ phân giải/i,
        /tránh bắt đầu nhiều công việc tăng độ phân giải/i, /increasing.*(?:video\s+)?resolution/i,
        /upscal(?:e|ing)/i, /resolution upgrade/i, /upgrading.*resolution/i, /nâng.*phân giải/i,
        /multiple resolution upgrade/i, /enhancing.*(?:video\s+)?quality/i, /正在.*分辨率/i, /解像度.*上/
      ],
      veoIsResolutionUpscaling = (text) => veoFlowTextMatchesAny(text, veoFlowResolutionUpscalePatterns),
      veoCollectUpscaleScopeText = (scope$) => {
        let combined = veoCollectFlowSurfaceText();
        if (scope$ && scope$.length) combined += " " + (scope$.text() || "");
        try {
          document.querySelectorAll(
              '[role="dialog"], [role="status"], [aria-live="polite"], [aria-live="assertive"]')
            .forEach((node) => {
              combined += " " + (node.textContent || "");
            });
        } catch {}
        return combined.replace(/\s+/g, " ").trim();
      },
      veoIsResolutionUpscaleActive = (scope$) => veoIsResolutionUpscaling(veoCollectUpscaleScopeText(scope$)),
      veoWaitBeforeHighResDownload = async (cancelFn, scope$, maxMs = 6e5) => {
        const deadline = Date.now() + maxMs,
          minWaitMs = 1e4,
          start = Date.now();
        let lastLog = 0;
        for (; Date.now() < deadline;) {
          if (cancelFn && cancelFn()) return !1;
          const upscaling = veoIsResolutionUpscaleActive(scope$),
            elapsed = Date.now() - start;
          if (upscaling) {
            Date.now() - lastLog > 12e3 && (S(
              "⏳ Flow đang tăng độ phân giải — chờ trước khi tải..."), lastLog = Date.now()), await p(
              2e3);
            continue
          }
          if (elapsed >= minWaitMs) {
            await p(2e3);
            if (!veoIsResolutionUpscaleActive(scope$)) return !0
          }
          await p(1500)
        }
        return A("⚠️ Timeout chờ tăng độ phân giải trước khi tải"), !1
      },
      veoWaitForResolutionUpscaleIdle = async (cancelFn, maxMs = 6e5, scope$ = null) => {
        const deadline = Date.now() + maxMs;
        let idleSince = 0,
          lastLog = 0;
        for (; Date.now() < deadline;) {
          if (cancelFn && cancelFn()) return !1;
          if (veoIsResolutionUpscaleActive(scope$)) {
            idleSince = 0, Date.now() - lastLog > 12e3 && (S(
              "⏳ Đang chờ hoàn tất tăng độ phân giải..."), lastLog = Date.now()), await p(2e3);
            continue
          }
          idleSince || (idleSince = Date.now());
          if (Date.now() - idleSince >= 3e3) return !0;
          await p(1e3)
        }
        return !1
      },
      veoReportPromptProgress = (job, percent, status) => {
        try {
          chrome.runtime.sendMessage({
            type: "VIDEO_GENERATION_PROGRESS",
            data: {
              groupId: job.groupId,
              promptIndex: job.promptIndex,
              percentage: percent,
              status,
              prompt: job.prompt
            }
          }).catch(() => {});
        } catch {}
      },
      veoReportContentBlockPrompt = async (job, flowMessage) => {
        const promptIndex = job.promptIndex ?? 1;
        const groupId = job.groupId ?? "";
        const jobGroup = Z.find(e => e.id === groupId);
        jobGroup && (jobGroup.contentBlockReportedIndexes = jobGroup.contentBlockReportedIndexes || new Set);
        const reported = jobGroup?.contentBlockReportedIndexes;
        const indexKey = Math.max(0, promptIndex - 1);
        if (reported?.has(indexKey)) return;
        reported?.add(indexKey);
        const stem = veoBuildOutputFileStem(promptIndex, job.prompt) || String(promptIndex).padStart(3, "0");
        const filename = `${stem}_CONTENT_BLOCK.txt`;
        const folder = (job.folderName || "").trim();
        const reportBody = String(job.prompt ?? "");
        try {
          const dl = await chrome.runtime.sendMessage({
            type: "DOWNLOAD_TEXT_BLOB",
            content: reportBody,
            filename,
            folder
          });
          const savedPath = dl?.filename || (folder ? `${folder}/${filename}` : filename);
          A(`🚫 Content Block — prompt ${promptIndex}. Đã tải báo lỗi: ${savedPath}`);
          chrome.runtime.sendMessage({
            type: "CONTENT_BLOCK_PROMPT",
            data: {
              groupId,
              promptIndex,
              message: flowMessage,
              filename: savedPath
            }
          }).catch(() => {})
        } catch (e) {
          D("Content Block report download failed:", e)
        }
      },
      veoFinishContentBlockPromptError = async (job, flowMessage, progressPct, tileIdsError) => {
        await veoReportContentBlockPrompt(job, flowMessage);
        veoReportPromptProgress(job, progressPct, "error");
        return {
          success: !1,
          resourceElements: [],
          tileIdsError: tileIdsError || [],
          error: flowMessage,
          contentBlock: !0,
          skipRetry: !0
        }
      },
      veoPauseJobOnQuota = (jobGroup, message, onUpdate, opts) => {
        if (!jobGroup || jobGroup.isCancelling) return null;
        const pauseMessage = (message || veoDetectFlowQuotaError() || veoFlowFallbackMsg("quota")).trim();
        const requeueIndex = opts?.requeueIndex;
        if (typeof requeueIndex === "number" && !jobGroup.pendingIndexes.includes(requeueIndex)) {
          jobGroup.pendingIndexes.unshift(requeueIndex);
        } else if (typeof jobGroup.currentPromptIndex === "number" && !jobGroup.pendingIndexes.includes(jobGroup
            .currentPromptIndex)) {
          jobGroup.pendingIndexes.unshift(jobGroup.currentPromptIndex);
        }
        jobGroup.isPaused = !0;
        jobGroup.status = "paused";
        jobGroup.isCancelling = !1;
        jobGroup.pauseReason = "quota";
        jobGroup.errorMessage = pauseMessage;
        jobGroup.delayRemainingSeconds = 0;
        jobGroup.delayPromptIndex = void 0;
        jobGroup.delayEndsAt = void 0;
        jobGroup.delayTotalSeconds = void 0;
        jobGroup.promptDelayEndsAt = {};
        jobGroup.promptDelayPickedSeconds = {};
        jobGroup.currentPromptIndex = void 0;
        onUpdate?.(jobGroup);
        S(`⏸️ Tạm dừng group ${jobGroup.id}: ${pauseMessage}`);
        D(`⏸️ Tạm dừng group (hết hạn mức): ${pauseMessage}`);
        return "paused";
      },
      veoHandleUnusualActivity = (jobGroup, message, onUpdate, opts) => {
        if (!jobGroup || jobGroup.isCancelling) return null;
        const unusualMessage = (message || veoDetectFlowFatalError() || veoFlowFallbackMsg("unusual")).trim();
        const requeueIndex = opts?.requeueIndex;
        const now = Date.now();
        if (jobGroup.unusualActivityGraceUntil && now < jobGroup.unusualActivityGraceUntil) {
          if (typeof requeueIndex === "number" && !jobGroup.pendingIndexes.includes(requeueIndex)) {
            jobGroup.pendingIndexes.unshift(requeueIndex)
          } else if (typeof jobGroup.currentPromptIndex === "number" && !jobGroup.pendingIndexes.includes(jobGroup
              .currentPromptIndex)) {
            jobGroup.pendingIndexes.unshift(jobGroup.currentPromptIndex)
          }
          jobGroup.currentPromptIndex = void 0;
          onUpdate?.(jobGroup);
          S("⏳ Bỏ qua cảnh báo cũ sau khi tiếp tục — thử lại prompt...");
          return "unusual-retry"
        }

        const lastAt = jobGroup.unusualActivityLastAt || 0;
        // reset counter if it hasn't happened recently
        if (now - lastAt > 2 * 60 * 1000) jobGroup.unusualActivityCount = 0;
        jobGroup.unusualActivityLastAt = now;
        jobGroup.unusualActivityCount = (jobGroup.unusualActivityCount || 0) + 1;

        if (1 === jobGroup.unusualActivityCount) try {
          chrome.runtime.sendMessage({
            type: "UNUSUAL_ACTIVITY_FIRST",
            data: {
              groupId: jobGroup.id,
              message: unusualMessage
            }
          }).catch(() => {});
        } catch {}

        // After many consecutive unusual blocks, pause the group instead of hard-failing.
        // User requirement: only stop after ~5-10 consecutive occurrences.
        const MAX_CONSEC_UNUSUAL = 8;

        if (typeof requeueIndex === "number" && !jobGroup.pendingIndexes.includes(requeueIndex)) {
          jobGroup.pendingIndexes.unshift(requeueIndex);
        } else if (typeof jobGroup.currentPromptIndex === "number" && !jobGroup.pendingIndexes.includes(jobGroup
            .currentPromptIndex)) {
          jobGroup.pendingIndexes.unshift(jobGroup.currentPromptIndex);
        }

        jobGroup.currentPromptIndex = void 0;
        if (jobGroup.errorMessage && veoIsUnusualActivityMessage(jobGroup.errorMessage)) jobGroup.errorMessage = "";
        const backoffBase = FLOW_INPUT_CONFIG.unusualRetryBackoffSec ?? 60;
        const backoffSec = Math.min(300, backoffBase + Math.max(0, (jobGroup.unusualActivityCount || 1) - 1) * 30);
        jobGroup.unusualCooldownUntil = Date.now() + backoffSec * 1e3;
        try {
          chrome.runtime.sendMessage({
            type: "UNUSUAL_ACTIVITY",
            data: {
              groupId: jobGroup.id,
              message: unusualMessage,
              count: jobGroup.unusualActivityCount,
              paused: jobGroup.unusualActivityCount >= MAX_CONSEC_UNUSUAL
            }
          }).catch(() => {});
        } catch {}
        onUpdate?.(jobGroup);

        if (jobGroup.unusualActivityCount >= MAX_CONSEC_UNUSUAL) {
          jobGroup.isPaused = !0;
          jobGroup.status = "paused";
          jobGroup.pauseReason = "unusual";
          jobGroup.delayPauseStartedAt = jobGroup.delayPauseStartedAt || Date.now();
          jobGroup.errorMessage = "";
          S(`⏸️ Tạm dừng group ${jobGroup.id} (hoạt động bất thường): ${unusualMessage}`);
          D(`⏸️ Tạm dừng group (unusual activity): ${unusualMessage}`);
          return "paused";
        }

        // soft-block: keep running, retry later
        S(`🔁 Unusual activity (${jobGroup.unusualActivityCount}/${MAX_CONSEC_UNUSUAL}) — sẽ thử lại prompt...`);
        veoFlowAlertState.lastUnusualText = unusualMessage;
        veoFlowAlertState.lastUnusualAt = now;
        void veoDismissFlowAlerts();
        return "unusual-retry";
      },
      veoResetUnusualActivityState = (jobGroup) => {
        if (!jobGroup) return;
        jobGroup.unusualActivityCount = 0;
        jobGroup.unusualActivityLastAt = 0;
        jobGroup.unusualActivityGraceUntil = Date.now() + 2e4;
        if (jobGroup.errorMessage && veoIsUnusualActivityMessage(jobGroup.errorMessage)) jobGroup.errorMessage = ""
      },
      veoGetJobExhaustedModels = (jobGroup) => jobGroup.exhaustedModels instanceof Set ? jobGroup.exhaustedModels :
        new Set(jobGroup.exhaustedModels || []),
      veoGetPayloadModel = (jobGroup, requeueIndex) => {
        const idx = typeof requeueIndex === "number" ? requeueIndex : jobGroup?.currentPromptIndex;
        const payload = typeof idx === "number" ? jobGroup?.payloads?.[idx] : null;
        return payload?.model || jobGroup?.payloads?.[0]?.model || null
      },
      veoIsStaleModelQuotaError = (jobGroup, message, requeueIndex) => {
        if (!jobGroup || !message || !veoIsModelQuotaMessage(message)) return !1;
        const activeModel = veoGetPayloadModel(jobGroup, requeueIndex),
          errorModel = extractModelFromQuotaMessage(message),
          exhausted = veoGetJobExhaustedModels(jobGroup);
        if (errorModel && activeModel && errorModel !== activeModel) return !0;
        if (errorModel && exhausted.has(errorModel)) return !0;
        if (jobGroup.modelSwitchGraceUntil && Date.now() < jobGroup.modelSwitchGraceUntil && exhausted.size > 0)
          return !0;
        return !1
      },
      veoBeginModelSwitchGrace = (jobGroup, ms = 45e3) => {
        jobGroup && (jobGroup.modelSwitchGraceUntil = Date.now() + ms)
      },
      veoFinalizeModelSwitchNotice = (jobGroup) => {
        if (!jobGroup?.modelSwitchFrom || !jobGroup?.modelSwitchTo) return;
        const notice = `Đã chuyển ${jobGroup.modelSwitchFrom} → ${jobGroup.modelSwitchTo}, tiếp tục chạy`;
        jobGroup.modelSwitchNotice = notice;
        jobGroup.errorMessage = "";
      },
      veoResetModelQuotaResumeState = (jobGroup) => {
        if (!jobGroup) return;
        veoGetJobExhaustedModels(jobGroup).size > 0 && veoBeginModelSwitchGrace(jobGroup, 3e4);
        /đang chuyển model/i.test(jobGroup.modelSwitchNotice || jobGroup.errorMessage || "") && veoFinalizeModelSwitchNotice(jobGroup);
      },
      veoRequeuePromptForModelSwitch = (jobGroup, requeueIndex) => {
        if (!jobGroup || typeof requeueIndex !== "number") return;
        jobGroup.pendingIndexes = jobGroup.pendingIndexes || [];
        jobGroup.pendingIndexes.includes(requeueIndex) || jobGroup.pendingIndexes.unshift(requeueIndex);
        jobGroup.results = (jobGroup.results || []).filter((r) => (r.index ?? r.promptIndex - 1) !== requeueIndex);
        jobGroup.completedPromptIndexes?.delete?.(requeueIndex);
        jobGroup.pendingDownloads && delete jobGroup.pendingDownloads[requeueIndex];
        jobGroup.processedCount = jobGroup.results.length;
      },
      veoResumeGroupAfterModelSwitch = (jobGroup, onUpdate) => {
        if (!jobGroup || jobGroup.isCancelling) return;
        jobGroup.isPaused = !1;
        jobGroup.pauseReason = void 0;
        jobGroup.errorMessage = "";
        jobGroup.status = "running";
        veoFinalizeModelSwitchNotice(jobGroup);
        veoBeginModelSwitchGrace(jobGroup, 3e4);
        onUpdate?.(jobGroup);
      },
      veoGroupGenerationIncomplete = (e) => {
        const total = Math.max(0, Number(e.totalCount) || 0);
        if ((e.pendingIndexes?.length ?? 0) > 0) return !0;
        if ((e.activeGenerationCount || 0) > 0) return !0;
        const done = e.completedPromptIndexes;
        if (!(done instanceof Set)) return total > 0;
        for (let i = 0; i < total; i++) {
          if (!done.has(i)) return !0;
          if (!e.finalRetryPassDone) {
            const r = veoGetResultForIndex(e, i);
            if (!r?.success) return !0;
          }
        }
        return !1;
      },
      veoRefillPendingIndexes = (e) => {
        const total = Math.max(0, Number(e.totalCount) || 0);
        const done = e.completedPromptIndexes;
        if (!(done instanceof Set)) return !1;
        e.pendingIndexes = e.pendingIndexes || [];
        let added = !1;
        for (let i = 0; i < total; i++)
          if (!done.has(i) && !e.pendingIndexes.includes(i)) e.pendingIndexes.push(i), added = !0;
        return added;
      },
      veoTrySwitchModelOnQuota = (jobGroup, message, onUpdate, opts) => {
        if (!jobGroup || jobGroup.isCancelling) return null;
        const requeueIndex = opts?.requeueIndex ?? jobGroup.currentPromptIndex;
        const payload = typeof requeueIndex === "number" ? jobGroup.payloads[requeueIndex] : null;
        const exhausted = veoGetJobExhaustedModels(jobGroup);
        const activeModel = payload?.model || jobGroup.payloads?.[0]?.model;
        const errorModel = extractModelFromQuotaMessage(message);
        if (errorModel && activeModel && errorModel !== activeModel) {
          S(`⏭️ Bỏ qua quota ${errorModel} — group đang dùng ${activeModel}`);
          return null
        }
        if (activeModel && !errorModel) {
          S("⏭️ Bỏ qua quota không chỉ rõ model — có thể là thông báo cũ trên Flow");
          return null
        }
        const currentModel = activeModel || errorModel;
        if (!currentModel) return null;
        exhausted.add(currentModel);
        const chain = getModelChainForPayload(payload || jobGroup.payloads[0]);
        const nextModel = pickNextModelAfterQuota(currentModel, chain, exhausted, jobGroup.flowHasImagen4);
        if (!nextModel || nextModel === currentModel) {
          jobGroup.flowHasImagen4 !== true && chain.includes(IMAGEN_4_MODEL) && !exhausted.has(IMAGEN_4_MODEL) ?
            S("⚠️ Imagen 4 không có trên acc — bỏ qua, không mở menu quét") : S(
              `⚠️ Không còn model ảnh khả dụng (đã hết: ${[...exhausted].join(", ")})`);
          return null;
        }
        jobGroup.exhaustedModels = exhausted;
        jobGroup.payloads = jobGroup.payloads.map((p) => ({
          ...p,
          model: nextModel
        }));
        jobGroup.flowSettingsApplied = !1;
        jobGroup.forceFlowModelApply = !0;
        veoClearFlowModelCache();
        jobGroup.isPaused = !1;
        jobGroup.pauseReason = void 0;
        jobGroup.pendingModelSwitch = !0;
        veoBeginModelSwitchGrace(jobGroup);
        veoRequeuePromptForModelSwitch(jobGroup, requeueIndex);
        jobGroup.modelSwitchFrom = currentModel;
        jobGroup.modelSwitchTo = nextModel;
        jobGroup.modelSwitchNotice = `Đang chuyển model ${currentModel} → ${nextModel}...`;
        jobGroup.errorMessage = "";
        if (!jobGroup.modelQuotaSwitchNotified) {
          jobGroup.modelQuotaSwitchNotified = !0;
          try {
            chrome.runtime.sendMessage({
              type: "MODEL_QUOTA_SWITCH",
              data: {
                groupId: jobGroup.id,
                fromModel: currentModel,
                toModel: nextModel,
                message: String(message || "").slice(0, 320)
              }
            }).catch(() => {});
          } catch {}
        }
        jobGroup.currentPromptIndex = void 0;
        if ((jobGroup.activeGenerationCount || 0) === 0) {
          jobGroup.pendingModelSwitch = !1;
          veoResumeGroupAfterModelSwitch(jobGroup, onUpdate);
          S(`▶️ Đã chuyển model — tự tiếp tục group ${jobGroup.id}`);
        } else {
          S(`🔄 Chờ prompt đang chạy xong — đổi model ${currentModel} → ${nextModel} (group ${jobGroup.id})`);
          onUpdate?.(jobGroup);
        }
        return "model-switch";
      },
      veoTryResumeAfterModelSwitch = async (jobGroup, onUpdate) => {
        if (!jobGroup?.pendingModelSwitch || jobGroup.isCancelling) return !1;
        if ((jobGroup.activeGenerationCount || 0) > 0) return !1;
        jobGroup.pendingModelSwitch = !1;
        veoResumeGroupAfterModelSwitch(jobGroup, onUpdate);
        S(`▶️ Đã chuyển model — tự tiếp tục group ${jobGroup.id}`);
        return !0;
      },
      veoHandleFlowBlockError = (jobGroup, message, onUpdate, opts) => {
        if (!jobGroup || jobGroup.isCancelling) return null;
        const blockMessage = message != null ? message : veoCollectFlowTileModelQuotaError(jobGroup, opts
          ?.requeueIndex) || veoDetectFlowQuotaError(jobGroup, opts?.requeueIndex) || veoDetectFlowFatalError();
        if (!blockMessage) return null;
        if (veoIsStaleModelQuotaError(jobGroup, blockMessage, opts?.requeueIndex)) return null;
        if (veoIsModelQuotaMessage(blockMessage)) {
          const switched = veoTrySwitchModelOnQuota(jobGroup, blockMessage, onUpdate, opts);
          if (switched) return switched;
          S("⏭️ Bỏ qua quota model — không tạm dừng (thông báo cũ hoặc không đủ thông tin)");
          return null;
        }
        if (veoIsUnusualActivityMessage(blockMessage)) {
          const handled = veoHandleUnusualActivity(jobGroup, blockMessage, onUpdate, opts);
          if (handled) return handled;
        }
        if (veoIsContentBlockMessage(blockMessage)) {
          S("⏭️ Content Block trên giao diện — bỏ qua, không dừng cả queue");
          return null;
        }
        return veoFlowTextMatchesAny(blockMessage, veoFlowQuotaPatterns) ? veoPauseJobOnQuota(jobGroup,
          blockMessage, onUpdate, opts) : veoAbortJobOnFatal(jobGroup, blockMessage, onUpdate);
      },
      veoAbortJobOnFatal = (jobGroup, message, onUpdate) => {
        if (!jobGroup || jobGroup.isCancelling) return null;
        const fatalMessage = message != null ? message : veoDetectFlowFatalError();
        if (!fatalMessage || veoFlowTextMatchesAny(fatalMessage, veoFlowQuotaPatterns) || veoIsModelQuotaMessage(
            fatalMessage) || veoIsUnusualActivityMessage(fatalMessage) || veoIsContentBlockMessage(
            fatalMessage)) return null;
        jobGroup.isCancelling = !0;
        jobGroup.fatalError = fatalMessage;
        jobGroup.errorMessage = fatalMessage;
        jobGroup.recoveryPassActive = !1;
        jobGroup.pendingIndexes = [];
        jobGroup.status = "error";
        jobGroup.finalRetryPassDone = !0;
        jobGroup.downloadRecoveryPassDone = !0;
        jobGroup.pendingDownloads = {};
        jobGroup.nextDownloadIndex = jobGroup.totalCount;
        onUpdate?.(jobGroup);
        for (let i = ee.length - 1; i >= 0; i--) {
          if (ee[i].id === jobGroup.id) {
            ee[i].isCancelling = !0;
            ee.splice(i, 1);
          }
        }
        D(`🛑 Dừng job: ${fatalMessage}`);
        S(`🛑 Dừng toàn bộ queue: ${fatalMessage}`);
        return "fatal";
      };
  async function X(e, t, n, r) {
    Math.random().toString(36).slice(2, 6);
    for (;;) {
      if (e.isCancelling) return;
      if (e.pendingModelSwitch) {
        await veoTryResumeAfterModelSwitch(e, r);
        await z(200);
        continue
      }
      if (e.isPaused) {
        await z(500);
        continue
      }
      if (e.processedCount >= e.totalCount && !veoHasPendingGeneration(e)) return;
      if ((e.activeGenerationCount || 0) >= veoEffectiveConcurrent(e.concurrentPrompts)) {
        await z(500);
        continue
      }
      const i = G(e);
      if (null === i) {
        if (e.processedCount >= e.totalCount && !veoHasPendingGeneration(e)) return;
        await z(500);
        continue
      }
      const a = e.payloads[i] || {},
        s = {
          ...a,
          model: e.payloads[i]?.model ?? a.model
        },
        c = s.promptIndex;
      if (!(await veoWaitUnusualCooldown(e, r))) return;
      if (!(await veoWaitGenerationCooldown(e, r, i))) return;
      if (e.isPaused) {
        e.pendingIndexes.includes(i) || e.pendingIndexes.unshift(i);
        continue
      }
      e.activeGenerationCount = (e.activeGenerationCount || 0) + 1;
      try {
        const o = e.retryCountByIndex[i] || 0,
          maxRetries = Math.max(1, Number(a.maxRetries) || 1);
        e.currentPromptIndex = i, r(e);
        s.model = e.payloads[i]?.model ?? s.model;
        const u = await $(s, () => !!e.isCancelling, t);
        if (e.currentPromptIndex = void 0, u.modelSwitch || (u.fatal || u.error && (veoFlowTextMatchesAny(u.error,
            veoFlowQuotaPatterns) || veoIsModelQuotaMessage(u.error))) && "model-switch" === veoHandleFlowBlockError(
            e, u.error, r, {
              requeueIndex: i
            })) continue;
        if (u.unusualRetry) {
          r(e);
          continue
        }
        if ((u.fatal || u.error && (veoFlowTextMatchesAny(u.error, veoFlowQuotaPatterns) || veoIsModelQuotaMessage(u
            .error))) && veoHandleFlowBlockError(e, u.error, r, {
            requeueIndex: i
          })) return;
        if (!u.success && !u.cancelled) {
          const isContentBlock = u.contentBlock || u.skipRetry || veoIsContentBlockMessage(u.error);
          if (!isContentBlock && o < maxRetries) {
            e.retryCountByIndex[i] = o + 1, e.pendingIndexes.includes(i) || e.pendingIndexes.unshift(i),
              r(e);
            continue
          }
        }
        if (e.completedPromptIndexes.add(i), e.results.push({
            index: i,
            promptIndex: c,
            success: u.success,
            downloadComplete: !1,
            tileIds: u.success && u.tileIds?.length ? u.tileIds.slice(0, Math.max(1, Number(a.outputCount) || 1)) : void 0,
            steps: u.steps,
            error: u.error,
            contentBlock: !!(u.contentBlock || veoIsContentBlockMessage(u.error)),
            cancelled: !!e.isCancelling
          }), u.success && u.tileIds && u.tileIds.length > 0) {
          const t = (e.downloadRetryCountByIndex || {})[i] || 0;
          ue(e, i, {
            tileIds: u.tileIds.slice(0, Math.max(1, Number(a.outputCount) || 1)),
            config: {
              ...a
            },
            promptIndex: a.promptIndex,
            index: i,
            retryCount: t
          }, n)
        } else ue(e, i, null, n);
        if (e.processedCount += 1, r(e), u.success, e.isCancelling) return
      } catch (o) {
        if (e.currentPromptIndex = void 0, (e.retryCountByIndex[i] || 0) < Math.max(1, Number(a.maxRetries) || 1) && !e.isCancelling) {
          e.retryCountByIndex[i] = (e.retryCountByIndex[i] || 0) + 1, e.pendingIndexes.includes(i) || e.pendingIndexes
            .unshift(i), r(e);
          continue
        }
        if (e.completedPromptIndexes.add(i), e.results.push({
            index: i,
            promptIndex: c,
            success: !1,
            downloadComplete: !0,
            error: o instanceof Error ? o.message : "Unknown error"
          }), ue(e, i, null, n), e.processedCount += 1, r(e), e.isCancelling) return
      } finally {
        e.activeGenerationCount = Math.max(0, (e.activeGenerationCount || 0) - 1)
      }
    }
  }

  function Q(e, t, n, r) {
    const o = n.find(e => e.id === t);
    if (!o) return;
    const i = "number" == typeof e.index ? e.index : Math.max(0, (e.config?.promptIndex ?? 1) - 1),
      a = o.results.find(e => e.index === i);
    a && (a.downloadComplete = !0, a.success = !0, delete a.error), r(o), fe(o, ee)
  }

  function Y(e, t, n, r, o) {
    const i = e.index ?? e.config?.promptIndex ?? 0,
      a = n.find(e => e.id === t);
    a && (a.results = a.results.filter(e => e.index !== i), a.results.push(veoFailedDownloadResult(e, i, e
      .config?.promptIndex ?? i + 1, o || "Download failed")), r(a), fe(a, ee))
  }

  function J(e, t, n, r) {
    const o = e.config?.maxRetries ?? 1,
      i = e.retryCount ?? 0,
      a = veoResultIndex(e),
      s = n.find(e => e.id === t);
    if (s) {
      const c = veoGetResultForIndex(s, a);
      if (c?.downloadComplete) return fe(s, ee), void r(s)
    }
    if (i < o && s && "running" === s.status) {
      s.downloadRetryCountByIndex = s.downloadRetryCountByIndex || {}, s.downloadRetryCountByIndex[a] = (s
        .downloadRetryCountByIndex[a] || 0) + 1;
      const c = {
        tileIds: e.tileIds,
        config: {
          ...e.config
        },
        promptIndex: e.config?.promptIndex ?? a,
        index: a,
        retryCount: i + 1
      };
      return s.downloadItems = s.downloadItems || [], s.downloadItems.push(c), ee.push({
        id: s.id,
        items: [c],
        status: "queued",
        isCancelling: !!s.isCancelling
      }), void r(s)
    }
    s && (s.results = s.results.filter(e => e.index !== a), s.results.push(veoFailedDownloadResult(e, a, e.config
      ?.promptIndex ?? a + 1, `Download failed (max ${o} retries)`)), s.completedPromptIndexes.add(a), fe(s, ee),
      r(s))
  }
  async function veoProcessDownloadJob(e, t) {
    for (const n of e.items) {
      if (e.isCancelling) break;
      const r = Z.find(t => t.id === e.id);
      for (; r?.isPaused && !e.isCancelling;) await K(500);
      if (e.isCancelling) break;
      const o = await U(n.tileIds, n.config, () => e.isCancelling, t);
      if (o.success) {
        if (void 0 !== o.extractedFrame || void 0 !== o.nextPromptEditImage || void 0 !== o.tileIds) {
          const t = Z.find(t => t.id === e.id);
          if (t) {
            const e = (n.index ?? n.config?.promptIndex ?? 0) + 1;
            e < t.payloads.length && (t.payloads[e] = {
              ...t.payloads[e],
              outputPreviousPrompt: {
                extractedFrame: o.extractedFrame,
                nextPromptEditImage: o.nextPromptEditImage,
                tileIds: o.tileIds
              }
            })
          }
        }
        Q(n, e.id, Z, re)
      } else if (o.contentBlock) {
        const idx = veoResultIndex(n);
        const s = Z.find(t => t.id === e.id);
        s && (s.results = s.results.filter(e => e.index !== idx), s.results.push({
          index: idx,
          promptIndex: n.config?.promptIndex ?? idx + 1,
          success: !1,
          downloadComplete: !0,
          error: o.error || "Content blocked",
          contentBlock: !0
        }), s.completedPromptIndexes.add(idx), fe(s, ee), re(s))
      } else if (o.modelSwitch) {
        const idx = veoResultIndex(n);
        veoRequeuePromptForModelSwitch(r, idx);
        S(`🔄 Model switched — requeue prompt ${idx + 1} for generation`);
        re(r);
      } else o.cancelled ? Y(n, e.id, Z, re, o.error ?? "Download failed") : J(n, e.id, Z, re)
    }
    e.status = "completed";
    const n = Z.find(t => t.id === e.id);
    n && veoAdvanceDownloadCursor(n, ee)
  }
  const K = e => new Promise(t => setTimeout(t, e)),
    Z = [],
    ee = [];
  let te = null;
  const ne = e => {
      if (FLOW_INPUT_CONFIG.disableRunZoom && 1 !== e) return;
      try {
        chrome.runtime.sendMessage({
          type: "SET_ZOOM",
          zoomFactor: e
        }).catch(() => {})
      } catch {}
    },
    re = e => {
      try {
        chrome.runtime.sendMessage({
          type: "PROMPT_GROUP_STATUS",
          data: {
            id: e.id,
            status: e.status,
            processedCount: e.processedCount,
            totalCount: e.totalCount,
            createdAt: e.createdAt,
            isCancelling: !!e.isCancelling,
            isPaused: !!e.isPaused,
            pauseReason: e.pauseReason || "",
            isActive: te === e.id && ("running" === e.status || "paused" === e.status || "queued" === e.status),
            recoveryPassActive: !!e.recoveryPassActive,
            recoveryPassSummary: e.recoveryPassSummary || null,
            delayRemainingSeconds: e.delayRemainingSeconds ?? 0,
            delayPromptIndex: e.delayPromptIndex ?? null,
            delayEndsAt: e.delayEndsAt ?? null,
            delayTotalSeconds: e.delayTotalSeconds ?? null,
            delayPauseStartedAt: e.delayPauseStartedAt ?? null,
            promptDelayEndsAt: {
              ...(e.promptDelayEndsAt ?? {})
            },
            promptDelayPickedSeconds: {
              ...(e.promptDelayPickedSeconds ?? {})
            },
            results: e.results.map(e => ({
              index: e.index,
              promptIndex: e.promptIndex,
              success: e.success,
              downloadComplete: e.downloadComplete,
              tileIds: Array.isArray(e.tileIds) ? e.tileIds : void 0,
              error: e.error,
              contentBlock: !!e.contentBlock
            })),
            currentPromptIndex: e.currentPromptIndex,
            promptPreviews: (e.payloads || []).map(e => formatPromptPreview(e?.prompt)),
            runMode: e.payloads?.[0]?.mode || void 0,
            batchIdentity: e.batchIdentity || void 0,
            retryCountByIndex: {
              ...e.retryCountByIndex
            },
            downloadRetryCountByIndex: {
              ...e.downloadRetryCountByIndex || {}
            },
            downloadOnly: !!e.downloadOnly,
            downloadPayloads: (e.payloads || [])
              .map((p, idx) => {
                const stripped = stripDownloadPayload(p, e.id);
                if (!stripped) return null;
                const result = (e.results || []).find(
                  (r) => (r.index ?? r.promptIndex - 1) === idx,
                );
                if (!stripped.tileIds?.length && result?.tileIds?.length) {
                  stripped.tileIds = result.tileIds;
                }
                return stripped;
              })
              .filter(Boolean),
            errorMessage: e.errorMessage || "",
            modelSwitchNotice: e.modelSwitchNotice || "",
            modelSwitchFrom: e.modelSwitchFrom || "",
            modelSwitchTo: e.modelSwitchTo || ""
          }
        }).catch(() => {})
      } catch {}
    };

  async function veoWaitGroupDownloadsComplete(e, t = 3e5) {
    const n = Date.now() + t;
    for (; !e.isCancelling && Date.now() < n;) {
      veoAdvanceDownloadCursor(e, ee);
      if (!veoGroupDownloadsPending(e, ee)) return !0;
      if (e.isPaused) {
        await K(500);
        continue
      }
      await K(200)
    }
    return !e.isCancelling
  }

  async function veoRunDownloadOnlyGroup(e) {
    const t = await loadFlowConfig();
    if (!t?.selectors) return e.status = "error", e.errorMessage =
      "Cannot connect to server. Extension may be unauthorized.", te = null, re(e), e.sendResponse?.({
        success: !1,
        error: e.errorMessage,
        results: e.results || []
      }), Z.shift(), void ne(1);
    const n = collectOrderedTileIds(t.selectors),
      r = assignTilesToPayloads(e.payloads, n);
    if (!r.ok) return e.status = "error", e.errorMessage = r.error, te = null, re(e), e.sendResponse?.({
      success: !1,
      error: r.error,
      results: e.results || []
    }), Z.shift(), void ne(1);
    S(r.usedStoredTiles ?
      `📥 Download-only: ${r.items.length} prompt(s) using saved tile IDs` :
      `📥 Download-only: ${r.items.length} prompt(s), ${r.requiredTiles} tile(s) from page (no saved IDs)`), e
      .downloadOnly = !0, e.results = r.items.map(({
        index: t,
        config: n
      }) => ({
        index: t,
        promptIndex: n.promptIndex ?? t + 1,
        success: !0,
        downloadComplete: !1
      })), e.processedCount = e.totalCount, e.pendingIndexes = [], e.completedPromptIndexes = new Set(e
        .results.map(e => e.index)), e.nextDownloadIndex = 0, e.pendingDownloads = {}, e.downloadItems = [], e
      .downloadRetryCountByIndex = {}, e.finalRetryPassDone = !0, e.downloadRecoveryPassDone = !0, e.recoveryPassActive = !1, e.errorMessage = "", re(
        e);
    for (const o of r.items) {
      if (e.isCancelling) break;
      ue(e, o.index, {
        tileIds: o.tileIds,
        config: {
          ...o.config,
          groupId: e.id
        },
        promptIndex: o.config.promptIndex ?? o.index + 1,
        index: o.index,
        retryCount: 0
      }, ee)
    }
    await veoWaitGroupDownloadsComplete(e);
    if (e.isCancelling) e.status = "cancelled";
    else {
      e.downloadOnly = !1;
      const t = e.results.length,
        n = e.results.filter(e => e.downloadComplete).length;
      n === t ? (e.status = "completed", e.errorMessage = "") : n > 0 ? (e.status = "completed", e
        .errorMessage = `Downloaded ${n}/${t} prompt(s)`) : (e.status = "error", e.errorMessage = e
        .errorMessage || "Some downloads failed")
    }
    te = null, re(e), e.sendResponse?.({
      success: "completed" === e.status,
      results: e.results,
      error: e.errorMessage
    }), Z.shift(), ne(1)
  }

  function veoEnqueueDownloadOnly(e, t) {
    const {
      payloads: n,
      groupId: r
    } = e;
    if (!n?.length) return t({
      success: !1,
      error: "No prompts to download"
    });
    const o = r || `dl-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    if (Z.some(e => "queued" === e.status || "running" === e.status || "paused" === e.status)) return t({
      success: !1,
      error: "Another job is already running"
    });
    const i = Z.findIndex(e => e.id === o);
    i >= 0 && Z.splice(i, 1);
    const a = n.map(e => ({
        ...e,
        groupId: o,
        autoDownloadResourceQuality: e.autoDownloadResourceQuality && "no-download" !== e
          .autoDownloadResourceQuality ? e.autoDownloadResourceQuality : "original"
      })),
      s = {
        id: o,
        payloads: a,
        status: "queued",
        downloadOnly: !0,
        createdAt: Date.now(),
        totalCount: a.length,
        processedCount: a.length,
        sendResponse: t,
        isCancelling: !1,
        isPaused: !1,
        isActive: !1,
        activeGenerationCount: 0,
        results: [],
        pendingIndexes: [],
        completedPromptIndexes: new Set,
        retryCountByIndex: {},
        downloadRetryCountByIndex: {},
        downloadItems: [],
        nextDownloadIndex: 0,
        pendingDownloads: {},
        promptPreviews: a.map(e => formatPromptPreview(e.prompt)),
        concurrentPrompts: 1,
        promptDelaySecondsMin: 0,
        promptDelaySecondsMax: 0,
        finalRetryPassDone: !0,
        downloadRecoveryPassDone: !0,
        recoveryPassActive: !1,
        flowSettingsApplied: !1
      };
    S(`📥 Queue download-only group ${o} — ${a.length} prompt(s)`), Z.push(s), re(s), t({
      success: !0,
      groupId: o
    })
  }
  async function oe(e) {
    const t = await loadFlowConfig();
    if (!t?.selectors) return e.status = "error", e.errorMessage = "Cannot connect to server. Extension may be unauthorized.",
      te = null, re(e), Z.shift(), e.sendResponse({
        success: !1,
        error: "Cannot connect to server. Extension may be unauthorized.",
        results: []
      }), void ne(1);
    for (;;) {
      if (e.isCancelling) {
        e.recoveryPassActive = !1;
        e.status = e.fatalError ? "error" : "cancelled";
        const t = e.results;
        return Z.shift(), te = null, re(e), e.sendResponse({
          success: !1,
          cancelled: !e.fatalError,
          error: e.fatalError || void 0,
          results: t
        }), void ne(1)
      }
      if (e.pendingModelSwitch) {
        await veoTryResumeAfterModelSwitch(e, re);
        await K(200);
        continue
      }
      if (e.isPaused) {
        await K(500);
        continue
      }
      for (; !e.isCancelling && (e.pendingIndexes.length > 0 || (e.activeGenerationCount || 0) > 0 || veoHasPendingGeneration(e));) {
        if (e.pendingModelSwitch) {
          await veoTryResumeAfterModelSwitch(e, re);
          await K(200);
          continue;
        }
        if (e.isPaused) {
          await K(500);
          continue;
        }
        veoEnsurePromptWorkers(e, t, ee, re);
        await K(200);
      }
      if (e.isCancelling) continue;
      if (e.recoveryPassActive) {
        e.recoveryPassActive = !1;
        re(e)
      }
      veoAdvanceDownloadCursor(e, ee);
      for (; !e.isCancelling && veoGroupDownloadsPending(e, ee);) await K(200);
      if (e.isCancelling) continue;
      if (0 === e.pendingIndexes.length) {
        if (e.fatalError) continue;
        if (veoDownloadRecoveryPass(e, ee)) continue;
        if (Be(e)) continue;
        if (veoRefillPendingIndexes(e)) {
          re(e);
          continue;
        }
        if (veoGroupGenerationIncomplete(e)) continue;
        veoFinalizeRecoveryPassSummary(e);
        e.recoveryPassActive = !1;
        e.modelSwitchNotice = "";
        e.modelSwitchFrom = "";
        e.modelSwitchTo = "";
        e.status = "completed";
        const t = e.results.every(e => e.success),
          n = e.results;
        return Z.shift(), te = null, re(e), e.sendResponse({
          success: t,
          results: n
        }), void ne(1)
      }
    }
  }
  const ie = 'content/upload-hook.js';
  (() => {
    const e = document.createElement("script");
    e.src = chrome.runtime.getURL(ie);
    (document.head || document.documentElement).appendChild(e);
    e.remove();
  })();
  try {
    chrome.runtime.sendMessage({
      type: "CONTENT_SCRIPT_RESET"
    }).catch(() => {})
  } catch {}
  self.onerror = function(e, t, n, r, o) {}, !FLOW_INPUT_CONFIG.disablePageLoadZoom && window.location.href.includes("labs.google") && chrome.runtime
  .sendMessage({
    type: "SET_ZOOM",
    zoomFactor: .8
  });
  const ae = {},
    se = {};

  function ce(e, t) {
    const {
      payloads: n,
      groupId: r,
      concurrentPrompts: o,
      promptDelaySecondsMin: i,
      promptDelaySecondsMax: a,
      resumeFrom: c,
      batchIdentity: u
    } = e;
    let queued = !1;
    const result = {
      groupId: r
    };
    ((e, t, n, r, o, i, a) => {
      const s = t || `group-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
      result.groupId = s;
      const existing = Z.find(e => e.id === s);
      if (existing) {
        if (a) {
          const c = e.map(e => ({
            ...e,
            groupId: s
          }));
          existing.payloads = c;
          existing.concurrentPrompts = veoEffectiveConcurrent(n || existing.concurrentPrompts || 1);
          existing.promptDelaySecondsMin = r ?? existing.promptDelaySecondsMin ?? 0;
          existing.promptDelaySecondsMax = o ?? existing.promptDelaySecondsMax ?? 0;
          existing.processedCount = a.processedCount ?? existing.processedCount ?? 0;
          existing.totalCount = a.totalCount ?? c.length;
          existing.results = Array.isArray(a.results) ? [...a.results] : existing.results ?? [];
          existing.pendingIndexes = [...(a.pendingIndexes ?? [])];
          existing.completedPromptIndexes = new Set((existing.results ?? []).map(e => e.index ?? e.promptIndex - 1));
          existing.isPaused = !1;
          existing.isCancelling = !1;
          existing.errorMessage = "";
          existing.fatalError = void 0;
          veoResetUnusualActivityState(existing);
          existing.status = "queued" === existing.status ? "queued" : "running";
          a.promptPreviews && (existing.promptPreviews = a.promptPreviews);
          try {
            const idx = Z.findIndex(e => e.id === s);
            if (idx > 0) {
              Z.splice(idx, 1);
              Z.unshift(existing);
            }
          } catch {}
          S(`▶️ Resume group ${s} — retry ${existing.pendingIndexes.length} prompt(s)`);
          re(existing);
          result.groupId = s;
          queued = !0;
          return;
        }
        return i({
          success: !1,
          error: "Group is already in queue"
        }), void 0;
      }
      const activeBatch = veoGetActiveBatchGroup(s);
      if (activeBatch && !a && batchIdentityMatches(activeBatch.batchIdentity, u)) {
        const u = e.map(e => ({
          ...e,
          groupId: activeBatch.id
        }));
        const l = {
          concurrentPrompts: n,
          promptDelaySecondsMin: r,
          promptDelaySecondsMax: o
        };
        veoMergeResumePayloads(activeBatch, u, l);
        activeBatch.isPaused = !1;
        activeBatch.isCancelling = !1;
        activeBatch.errorMessage = "";
        activeBatch.fatalError = void 0;
        veoResetUnusualActivityState(activeBatch);
        activeBatch.status = "queued" === activeBatch.status ? "queued" : "running";
        try {
          const e = Z.findIndex(e => e.id === activeBatch.id);
          e > 0 && (Z.splice(e, 1), Z.unshift(activeBatch))
        } catch {}
        S(`♻️ Reused active group ${activeBatch.id} (blocked duplicate ${s})`);
        re(activeBatch);
        result.groupId = activeBatch.id;
        queued = !0;
        return
      }
      const c = e.map(e => ({
          ...e,
          groupId: s
        })),
        d = a && t ? {
          id: s,
          payloads: c,
          concurrentPrompts: veoEffectiveConcurrent(n || 1),
          promptDelaySecondsMin: r || 0,
          promptDelaySecondsMax: o || 0,
          sendResponse: i,
          status: "queued",
          createdAt: Date.now(),
          processedCount: a.processedCount ?? 0,
          totalCount: a.totalCount ?? c.length,
          isCancelling: !1,
          isPaused: !1,
          isActive: !1,
          activeGenerationCount: 0,
          pendingModelSwitch: !1,
          forceFlowModelApply: !1,
          lastGenerationStartedAt: 0,
          results: Array.isArray(a.results) ? [...a.results] : [],
          pendingIndexes: [...a.pendingIndexes ?? []],
          completedPromptIndexes: new Set((a.results ?? []).map(e => e.index ?? e.promptIndex - 1)),
          retryCountByIndex: {},
          downloadRetryCountByIndex: {},
          downloadItems: [],
          nextDownloadIndex: a.processedCount ?? 0,
          pendingDownloads: {},
          knownTileIdsBeforeSubmit: new Set,
          claimedTileIds: new Set,
          finalRetryPassDone: !1,
          downloadRecoveryPassDone: !1,
          recoveryPassActive: !1,
          flowSettingsApplied: !1,
          fatalError: void 0,
          errorMessage: ""
        } : {
          id: s,
          payloads: c,
          concurrentPrompts: veoEffectiveConcurrent(n || 1),
          promptDelaySecondsMin: r || 0,
          promptDelaySecondsMax: o || 0,
          sendResponse: i,
          status: "queued",
          createdAt: Date.now(),
          processedCount: 0,
          totalCount: c.length,
          isCancelling: !1,
          isPaused: !1,
          activeGenerationCount: 0,
          pendingModelSwitch: !1,
          forceFlowModelApply: !1,
          lastGenerationStartedAt: 0,
          results: [],
          pendingIndexes: c.map((e, t) => t),
          completedPromptIndexes: new Set,
          retryCountByIndex: {},
          downloadRetryCountByIndex: {},
          downloadItems: [],
          nextDownloadIndex: 0,
          pendingDownloads: {},
          knownTileIdsBeforeSubmit: new Set,
          claimedTileIds: new Set,
          finalRetryPassDone: !1,
          downloadRecoveryPassDone: !1,
          recoveryPassActive: !1,
          flowSettingsApplied: !1
        };
      a?.promptPreviews && (d.promptPreviews = a.promptPreviews), u && (d.batchIdentity = u), S(a ?
        `▶️ Resume group ${s} — retry ${d.pendingIndexes.length} prompt(s)` :
        `🆕 New group ${s} — ${d.totalCount} prompt(s)`), Z.push(d), re(d), queued = !0
    })(n.map(e => {
      if (e.imageIds && Array.isArray(e.imageIds)) {
        const t = e.imageIds.map(e => ae[e]).filter(Boolean);
        return {
          ...e,
          images: t
        }
      }
      return e
    }), r, o, i, a, t, c), queued && t({
      success: !0,
      groupId: result.groupId
    })
  }
  chrome.runtime.onMessage.addListener((e, t, n) => {
    switch (e.type) {
      case "PREPARE_IMAGE":
        return function(e, t) {
          const {
            id: n,
            data: r
          } = e;
          n && r ? (ae[n] = r, t({
            success: !0
          })) : t({
            success: !1,
            error: "Missing image ID or data"
          })
        }(e, n), !0;
      case "PREPARE_IMAGE_CHUNK":
        return function(e, t) {
          const {
            id: n,
            chunk: r,
            chunkIndex: o,
            totalChunks: i
          } = e, a = `img-${n}`;
          se[a] || (se[a] = {
            chunks: Array(i).fill(""),
            totalChunks: i,
            options: {}
          });
          const s = se[a];
          s.chunks[o] = r;
          const c = s.chunks.filter(e => "" !== e).length;
          if (c === i) try {
            const e = JSON.parse(s.chunks.join(""));
            ae[n] = e, delete se[a], t({
              success: !0
            })
          } catch (u) {
            t({
              success: !1,
              error: "Failed to parse image chunks"
            })
          } else t({
            success: !0,
            chunkReceived: !0,
            receivedCount: c,
            totalChunks: i
          })
        }(e, n), !0;
      case "SYNC_PROMPT_QUEUE":
        return Z.forEach(e => re(e)), n({
          success: !0,
          count: Z.length
        }), !0;
      case "AUTO_FILL_FLOW":
        return ce(e, n), !0;
      case "DOWNLOAD_ONLY_FLOW":
        return veoEnqueueDownloadOnly(e, n), !0;
      case "CANCEL_PROMPT_GROUP":
        return n((e => {
          const t = Z.findIndex(t => t.id === e);
          if (-1 === t) return {
            success: !1,
            error: "Prompt group not found"
          };
          const n = Z[t];
          return "queued" === n.status ? (n.status = "cancelled", Z.splice(t, 1), re(n), n.sendResponse({
            success: !1,
            cancelled: !0,
            results: []
          }), {
            success: !0,
            cancelled: !0
          }) : "running" === n.status || "paused" === n.status ? (n.isCancelling = !0, n.isPaused = !1, re(
            n), ee.filter(t => t.id === e).forEach(e => e.isCancelling = !0), {
            success: !0,
            cancelling: !0
          }) : {
            success: !1,
            error: "Prompt group is already finished"
          }
        })(e.groupId)), !0;
      case "PAUSE_PROMPT_GROUP":
        return n((e => {
          const t = Z.findIndex(t => t.id === e);
          if (-1 === t) return {
            success: !1,
            error: "Prompt group not found"
          };
          const n = Z[t];
          return "running" === n.status || "queued" === n.status ? (n.isPaused = !0, n.status = "paused", n
            .delayPauseStartedAt = n.delayPauseStartedAt || Date.now(), re(n), {
            success: !0,
            paused: !0
          }) : "paused" === n.status ? {
            success: !0,
            paused: !0
          } : {
            success: !1,
            error: "Prompt group is already finished"
          }
        })(e.groupId)), !0;
      case "RESUME_PROMPT_GROUP":
        return n((t => {
          const r = Z.findIndex(e => e.id === t.groupId);
          if (-1 === r) return {
            success: !1,
            error: "Prompt group not found"
          };
          const n = Z[r];
          if (!(n.isPaused && ("paused" === n.status || "running" === n.status))) return {
            success: !1,
            error: "Prompt group is not paused"
          };
          veoApplyResumeDispatchOptions(n, t);
          if (t.payloads?.length) {
            const e = t.payloads.map(e => {
              if (e.imageIds && Array.isArray(e.imageIds)) {
                const t = e.imageIds.map(e => ae[e]).filter(Boolean);
                return {
                  ...e,
                  images: t
                }
              }
              return e
            });
            veoMergeResumePayloads(n, e, t)
          }
          try {
            const e = "number" == typeof n.currentPromptIndex ? n.currentPromptIndex : null;
            if (null !== e && !n.pendingIndexes.includes(e) && !(n.completedPromptIndexes?.has?.(e))) n
              .pendingIndexes.unshift(e)
          } catch {}
          try {
            if (0 === (n.pendingIndexes?.length || 0) && (n.processedCount ?? 0) < (n.totalCount ?? 0)) {
              const e = n.completedPromptIndexes instanceof Set ? n.completedPromptIndexes : new Set,
                t = [];
              for (let r = 0; r < (n.totalCount ?? 0); r++) e.has(r) || t.push(r);
              n.pendingIndexes = t
            }
          } catch {}
          try {
            if (r > 0) {
              Z.splice(r, 1);
              Z.unshift(n)
            }
          } catch {}
          veoResetUnusualActivityState(n);
          veoResetModelQuotaResumeState(n);
          return n.pendingModelSwitch = !1, n.isPaused = !1, n.delayPauseStartedAt = void 0, n.status = "running", n
            .currentPromptIndex = void 0, re(n), {
            success: !0,
            resumed: !0,
            groupId: n.id
          }
        })(e)), !0;
      case "CHECK_FLOW_PAGE":
        return n({
          isFlowPage: (() => {
            const href = window.location.href.toLowerCase();
            const isLabsHost = href.includes("labs.google") || href.includes(
            "aitestkitchen.withgoogle.com");
            return isLabsHost && (href.includes("/fx/") || href.includes("flow") || href.includes(
              "/project/"))
          })()
        }), !0;
      case "SCAN_CHARACTERS":
        return async function() {
          const e = await loadFlowConfig();
          if (!e?.selectors) return [];
          if (i(e.selectors.charactersTabButton).length > 0) {
            await w(e.selectors.charactersTabButton, "Click characters tab"), await v(e.selectors
              .charactersNameSelector);
            return i(e.selectors.charactersNameSelector).map((e, t) => i(t).attr("alt") || i(t).text() || "")
              .get()
          }
          return []
        }().then(e => n({
          characters: e
        })), !0;
      default:
        return !0
    }
  }), (async () => {
    for (;;) {
      if (0 === Z.length) {
        await K(1e3);
        continue
      }
      const t = Z[0];
      if (t)
        if ("queued" === t.status || "running" === t.status || "paused" === t.status) {
          te = t.id, "paused" !== t.status && (t.status = "running"), re(t), ne(.5);
          try {
            t.downloadOnly ? await veoRunDownloadOnlyGroup(t) : await oe(t)
          } catch (e) {
            t.status = "error", t.errorMessage = e instanceof Error ? e.message : "Unknown error", te = null, re(t), t
              .sendResponse({
                success: !1,
                error: e instanceof Error ? e.message : "Unknown error",
                results: t.results || []
              }), Z.shift(), ne(1)
          }
          0 === Z.length && await g()
        } else "cancelled" === t.status ? (Z.shift(), re(t), t.sendResponse({
          success: !1,
          cancelled: !0,
          results: []
        })) : (Z.shift(), re(t))
    }
  })(), (async () => {
    const t = new Set;
    for (;;) {
      for (; t.size < 1 && ee.length > 0;) {
        const e = ee.shift();
        if (!e) break;
        e.status = "running", t.add(e), (async e => {
          let n = null;
          for (let t = 0; t < 5 && !n; t++) n = await loadFlowConfig(), n?.selectors || await K(1e3);
          try {
            n?.selectors ? await veoProcessDownloadJob(e, n) : (A(
              "⚠️ Download skipped — no remote config, re-queuing..."), e.status = "queued", ee.push(e))
          } catch (r) {
            D("Download job error:", r), J(e.items[0], e.id, Z, re)
          } finally {
            t.delete(e)
          }
        })(e)
      }
      await K(300)
    }
  })();
