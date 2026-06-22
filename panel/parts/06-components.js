/** 06-components.js — edit then npm run build:panel */
  SC = ca({
      __name: "SpreadsheetImportModal",
      props: {
        visible: {
          type: Boolean
        },
        sheets: {},
        filename: {}
      },
      emits: ["update:visible", "confirm"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          o = e,
          i = Zo(0),
          a = Zo(0),
          r = Ds(() => n.sheets[i.value] ?? null),
          s = t => {
            if (!t.columns.length) return 0;
            let e = 0;
            for (let n = 1; n < t.columns.length; n++) t.columns[n].totalLength > t.columns[e].totalLength && (e = n);
            return e
          };
        Rr(() => [n.visible, n.sheets], ([t, e]) => {
          t && e.length && (i.value = 0, a.value = s(e[0]))
        }, {
          immediate: !0
        }), Rr(i, t => {
          const e = n.sheets[t];
          e && (a.value = s(e))
        });
        const l = Ds(() => n.sheets.map((t, e) => ({
            label: t.name,
            value: e
          }))),
          c = Ds(() => {
            const t = r.value;
            if (!t) return [];
            const e = s(t);
            return t.columns.map((t, n) => ({
              label: n === e ? `${t.header||`Col ${n+1}`} (auto)` : t.header || `Col ${n+1}`,
              value: n
            }))
          }),
          d = Ds(() => {
            const t = r.value?.columns[a.value];
            return t?.values.slice(0, 6) ?? []
          }),
          u = Ds(() => r.value?.columns[a.value]?.values.length ?? 0),
          p = () => {
            const t = r.value?.columns[a.value];
            t && (o("confirm", t.values.join("\n\n")), o("update:visible", !1))
          };
        return (e, n) => {
          const s = _a("PSelect"),
            b = _a("PButton"),
            m = _a("PDialog");
          return ns(), ss(m, {
            visible: t.visible,
            modal: !0,
            draggable: !1,
            style: {
              width: "28rem"
            },
            "pt:root:class": "border border-slate-300/30 bg-slate-100 dark:bg-slate-800",
            "onUpdate:visible": n[3] || (n[3] = t => o("update:visible", t))
          }, {
            header: Bi(() => [ps("div", aC, [n[4] || (n[4] = ps("i", {
              class: "pi pi-table text-xl"
            }, null, -1)), ps("span", rC, In(e.$t("spreadsheetImport.title")), 1)])]),
            footer: Bi(() => [ps("div", CC, [bs(b, {
              label: e.$t("common.cancel"),
              severity: "secondary",
              size: "small",
              text: "",
              onClick: n[2] || (n[2] = t => o("update:visible", !1))
            }, null, 8, ["label"]), bs(b, {
              label: e.$t("spreadsheetImport.import", {
                count: u.value
              }),
              icon: "pi pi-check",
              size: "small",
              disabled: !u.value,
              onClick: p
            }, null, 8, ["label", "disabled"])])]),
            default: Bi(() => [ps("div", sC, [ps("div", lC, [n[5] || (n[5] = ps("i", {
                class: "pi pi-file-excel text-base text-emerald-500"
              }, null, -1)), ps("span", {
                class: "truncate font-medium",
                title: t.filename
              }, In(t.filename), 9, cC)]), ps("div", dC, [ps("label", uC, In(e.$t(
                "spreadsheetImport.sheet")), 1), bs(s, {
                modelValue: i.value,
                "onUpdate:modelValue": n[0] || (n[0] = t => i.value = t),
                options: l.value,
                "option-label": "label",
                "option-value": "value",
                size: "small",
                class: "w-full text-xs",
                disabled: t.sheets.length <= 1
              }, null, 8, ["modelValue", "options", "disabled"])]), r.value && r.value.columns.length ?
              (ns(), rs("div", pC, [ps("label", bC, In(e.$t("spreadsheetImport.column")), 1), bs(s, {
                modelValue: a.value,
                "onUpdate:modelValue": n[1] || (n[1] = t => a.value = t),
                options: c.value,
                "option-label": "label",
                "option-value": "value",
                size: "small",
                class: "w-full text-xs"
              }, null, 8, ["modelValue", "options"])])) : fs("", !0), d.value.length ? (ns(), rs("div",
                mC, [ps("div", gC, [ps("label", fC, In(e.$t("spreadsheetImport.preview")), 1), ps(
                  "span", hC, In(u.value) + " " + In(e.$t("spreadsheetImport.rows")), 1)]), ps("ul",
                  vC, [(ns(!0), rs(Xr, null, Na(d.value, (t, e) => (ns(), rs("li", {
                      key: e,
                      class: "px-3 py-2 text-xs text-foreground truncate leading-relaxed",
                      title: t
                    }, [ps("span", kC, In(e + 1) + ".", 1), gs(" " + In(t || "—"), 1)], 8,
                    yC))), 128)), u.value > d.value.length ? (ns(), rs("li", xC, " +" + In(u
                    .value - d.value.length) + " " + In(e.$t("spreadsheetImport.more")), 1)) : fs(
                    "", !0)])])) : r.value ? (ns(), rs("div", wC, In(e.$t("spreadsheetImport.noData")),
                1)) : fs("", !0)
            ])]),
            _: 1
          }, 8, ["visible"])
        }
      }
    }),
    TC = {
      class: "flex items-center justify-between mb-2"
    },
    IC = {
      class: "text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2"
    },
    AC = {
      class: "flex items-center gap-1"
    },
    EC = {
      key: 0,
      class: "mt-1.5 text-xs text-muted-foreground italic"
    },
    PC = ca({
      __name: "PromptTextarea",
      props: {
        modelValue: {},
        label: {},
        placeholder: {},
        tip: {}
      },
      emits: ["update:modelValue"],
      setup(t, {
        emit: e
      }) {
        const n = e,
          {
            t: o
          } = Tc(),
          i = Zo(null),
          a = Zo(null),
          r = Zo(!1),
          s = Zo([]),
          l = Zo(""),
          c = async t => {
            const e = t.target,
              a = e.files?.[0];
            if (a) try {
              const t = await a.text();
              n("update:modelValue", t.trim())
            } catch (r) {
              alert(o("common.errors.fileReadError"))
            } finally {
              i.value && (i.value.value = "")
            }
          }, d = async t => {
              const e = t.target,
                n = e.files?.[0];
              if (n) try {
                const t = await (async t => {
                  const e = t.name.toLowerCase().endsWith(".csv") ? Ww(await t.text(), {
                    type: "string"
                  }) : Ww(await t.arrayBuffer(), {
                    type: "array"
                  });
                  return e.SheetNames.map(t => {
                    const n = e.Sheets[t],
                      o = iC.sheet_to_json(n, {
                        header: 1
                      });
                    if (0 === o.length) return {
                      name: t,
                      columns: []
                    };
                    const i = o[0].map(t => String(t ?? "")),
                      a = o.slice(1);
                    return {
                      name: t,
                      columns: i.map((t, e) => {
                        const n = a.map(t => String(t[e] ?? "").trim()).filter(t => "" !== t),
                          o = n.reduce((t, e) => t + e.length, 0);
                        return {
                          header: t,
                          values: n,
                          totalLength: o
                        }
                      })
                    }
                  })
                })(n);
                l.value = n.name, s.value = t, r.value = !0
              } catch (i) {
                alert(o("common.errors.fileReadError"))
              } finally {
                a.value && (a.value.value = "")
              }
            }, u = t => {
              n("update:modelValue", t)
            },
            p = veoPersistResize("veo-ui-prompt-height");
        return (e, o) => {
          const b = _a("PButton"),
            m = _a("PInputTextarea");
          return ns(), rs("div", null, [ps("div", TC, [ps("label", IC, [o[4] || (o[4] = ps("i", {
              class: "pi pi-file-edit flex-shrink-0"
            }, null, -1)), ps("span", null, In(t.label), 1)]), ps("div", AC, [bs(b, {
              icon: "pi pi-file",
              label: e.$t("common.uploadTxt"),
              severity: "secondary",
              text: "",
              size: "small",
              onClick: o[0] || (o[0] = t => i.value?.click())
            }, null, 8, ["label"]), bs(b, {
              icon: "pi pi-table",
              label: e.$t("common.uploadSpreadsheet"),
              severity: "secondary",
              text: "",
              size: "small",
              onClick: o[1] || (o[1] = t => a.value?.click())
            }, null, 8, ["label"])])]), ps("input", {
              ref_key: "txtInputRef",
              ref: i,
              type: "file",
              accept: ".txt",
              class: "hidden",
              onChange: c
            }, null, 544), ps("input", {
              ref_key: "spreadsheetInputRef",
              ref: a,
              type: "file",
              accept: ".xlsx,.xls,.csv",
              class: "hidden",
              onChange: d
            }, null, 544), bs(m, {
              ref_key: "textareaRef",
              ref: p,
              "model-value": t.modelValue,
              size: "small",
              rows: "10",
              placeholder: t.placeholder,
              class: "mt-2 w-full text-xs veo-prompt-textarea",
              "onUpdate:modelValue": o[2] || (o[2] = t => n("update:modelValue", t))
            }, null, 8, ["model-value", "placeholder"]), t.tip ? (ns(), rs("p", EC, In(t.tip), 1)) : fs("", !0),
            bs(SC, {
              visible: r.value,
              "onUpdate:visible": o[3] || (o[3] = t => r.value = t),
              sheets: s.value,
              filename: l.value,
              onConfirm: u
            }, null, 8, ["visible", "sheets", "filename"])
          ])
        }
      }
    }),
    OC = {
      class: "space-y-3"
    },
    MC = {
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3"
    },
    LC = {
      class: "space-y-3"
    },
    _C = {
      class: "flex gap-2"
    },
    BC = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    FC = {
      class: "text-xs text-muted-foreground"
    },
    RC = {
      class: "rounded-lg border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 p-2 sm:p-3 space-y-2"
    },
    DC = {
      key: 0,
      class: "flex items-center gap-2 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] sm:text-xs text-primary font-medium mb-1"
    },
    VC = {
      class: "grid grid-cols-2 gap-2"
    },
    NC = {
      class: "grid grid-cols-3 gap-2"
    },
    $C = ca({
      __name: "TextToVideoControl",
      props: {
        textToVideoForm: {},
        isProcessingJob: {
          type: Boolean
        },
        settings: {},
        promptGroups: {},
        isClearingCache: {
          type: Boolean
        }
      },
      emits: ["clear", "clear-cache", "update:has-concat"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          {
            t: o
          } = Tc(),
          {
            parsePrompts: i,
            getPromptOption: a,
            setPromptOption: r,
            getOptionsForPrompt: s
          } = Fu(),
          {
            sendJob: l,
            isSending: c
          } = Vu(),
          d = jc(),
          u = Zo(!1),
          p = Ds(() => i(n.textToVideoForm.prompt)),
          {
            isLimitReached: b,
            openUpgrade: m
          } = $u(Ds(() => p.value.length)),
          g = Uu({
            getPromptOption: a,
            prompts: p,
            defaultPromptOption: Ds(() => n.settings.defaultVideoOption)
          }),
          f = Ds(() => p.value.some((t, e) => g.isConcatPrompt(e))),
          h = e;
        Rr(f, t => h("update:has-concat", t), {
          immediate: !0
        });
        const v = Zo(null),
          y = t => v.value?.getSpeakerRowBadge(t) ?? null,
          k = Zo(null),
          x = t => [k.value?.getCharacterRowBadge(t) ?? null],
          w = async () => {
              if (!n.textToVideoForm.prompt.trim() || 0 === p.value.length) return;
              u.value = !0;
              const t = f.value ? 1 : n.settings.concurrentPrompts,
                e = f.value ? 1 : n.settings.outputCount,
                i = p.value.map((o, i) => ({
                  prompt: o,
                  mode: "textToVideo",
                  speaker: v.value?.getPayloadSpeaker(i) ?? null,
                  characters: k.value?.getPayloadCharacters(i) ?? null,
                  aspectRatio: n.settings.aspectRatio,
                  outputCount: e,
                  model: n.settings.model,
                  videoOption: a(i, {
                    defaultPromptOption: n.settings.defaultVideoOption,
                    totalPrompts: p.value.length
                  }),
                  promptIndex: i + 1,
                  autoDownloadResourceQuality: n.settings.autoDownloadVideoQuality,
                  concurrentPrompts: t,
                  promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                  promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                  isConcat: g.isConcatPrompt(i),
                  maxRetries: n.settings.maxRetries,
                  autoChangeFileName: n.settings.autoChangeFileName,
                  folderName: n.settings.folderName
                }));
              try {
                l(i, {
                  concurrentPrompts: t,
                  promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                  promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                  getGroups: () => n.promptGroups
                }).catch(t => {
                  d.add({
                    severity: "error",
                    summary: o("common.errors.sendJobFailed"),
                    detail: t?.message,
                    life: 8e3
                  })
                })
              } catch (r) {} finally {
                u.value = !1
              }
            },
            C = () => h("clear"), S = Zo(!1);
        return (e, o) => {
          const l = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", OC, [ps("div", MC, [ps("div", LC, [bs(PC, {
            modelValue: t.textToVideoForm.prompt,
            "onUpdate:modelValue": o[0] || (o[0] = e => t.textToVideoForm.prompt = e),
            label: e.$t("textToVideoControl.prompt.label"),
            placeholder: e.$t("textToVideoControl.prompt.placeholder"),
            tip: e.$t("textToVideoControl.prompt.tip")
          }, null, 8, ["modelValue", "label", "placeholder", "tip"]), bs(yp, {
            ref_key: "characterControl",
            ref: k,
            settings: t.settings,
            prompts: p.value
          }, null, 8, ["settings", "prompts"]), bs(Fp, {
            ref_key: "voiceControl",
            ref: v,
            settings: t.settings,
            prompts: p.value
          }, null, 8, ["settings", "prompts"]), bs(jb, {
            prompts: ni(i)(t.textToVideoForm.prompt),
            "default-prompt-option": t.settings.defaultVideoOption,
            label: e.$t("common.videoModeControl.label"),
            tip: e.$t("common.videoModeControl.tip"),
            "concat-label": e.$t("common.videoModeControl.concatLabel"),
            "get-prompt-option": ni(a),
            "set-prompt-option": ni(r),
            "get-options-for-prompt": ni(s),
            "get-row-badge": y,
            "get-extra-row-badges": x
          }, null, 8, ["prompts", "default-prompt-option", "label", "tip", "concat-label",
            "get-prompt-option", "set-prompt-option", "get-options-for-prompt"
          ])])]), ps("div", _C, [bs(rb, {
            settings: t.settings,
            "has-concat": f.value,
            "max-count": 4
          }, null, 8, ["settings", "has-concat"]), bs(ub, {
            settings: t.settings
          }, null, 8, ["settings"])]), ps("div", BC, [ps("p", FC, In(e.$t(
            "textToVideoControl.advancedHint")), 1), bs(mb, {
            settings: t.settings
          }, null, 8, ["settings"])]), ps("div", RC, [t.settings.autoAddVoiceBySpeaker ? (ns(), rs("div",
              DC, [o[4] || (o[4] = ps("i", {
                class: "pi pi-microphone"
              }, null, -1)), ps("span", null, In(e.$t("common.warnings.autoAddVoiceActive")), 1)])) :
            fs("", !0), bs(eb, {
              "prompt-groups": n.promptGroups
            }, null, 8, ["prompt-groups"]), ps("div", VC, [ps("div", NC, [bs(l, {
              label: e.$t("common.reportBug"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-flag",
              outlined: "",
              onClick: o[1] || (o[1] = t => S.value = !0)
            }, null, 8, ["label"]), bs(l, {
              label: e.$t("common.clearCache"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-database",
              "icon-pos": "left",
              outlined: "",
              loading: t.isClearingCache,
              disabled: t.isClearingCache,
              onClick: o[2] || (o[2] = t => h("clear-cache"))
            }, null, 8, ["label", "loading", "disabled"]), bs(l, {
              label: e.$t("textToVideoControl.buttons.clear"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-refresh",
              outlined: "",
              onClick: C
            }, null, 8, ["label"])]), ni(b) ? (ns(), ss(l, {
              key: 0,
              label: e.$t("common.upgradeMax"),
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-crown",
              severity: "warning",
              onClick: ni(m)
            }, null, 8, ["label", "onClick"])) : (ns(), ss(l, {
              key: 1,
              label: ni(c) ? e.$t("textToVideoControl.buttons.sending") : e.$t(
                "textToVideoControl.buttons.run"),
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: ni(c) ? "pi pi-spin pi-spinner" : "pi pi-play",
              disabled: ni(c) || u.value,
              loading: ni(c),
              onClick: w
            }, null, 8, ["label", "icon", "disabled", "loading"]))])
          ])]), bs(ep, {
            visible: S.value,
            "onUpdate:visible": o[3] || (o[3] = t => S.value = t)
          }, null, 8, ["visible"])], 64)
        }
      }
    });
  const zC = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    UC = {
      class: "flex items-center gap-2 mb-2"
    },
    jC = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    HC = ca({
      __name: "MaxImagesPerPromptSelect",
      props: {
        settings: {},
        settingsKey: {},
        labelKey: {},
        optionsKey: {},
        optionCount: {},
        uploadedImages: {}
      },
      setup(t) {
        const e = t,
          {
            t: n
          } = Tc(),
          o = Ds(() => "Omni Flash" === e.settings.model && "componentsToVideoMaxImagesPerPrompt" === e.settingsKey),
          i = Ds(() => fb(e.uploadedImages)),
          a = Ds(() => {
            if (!o.value) return n(`settingsTab.${e.labelKey}.label`);
            const t = i.value;
            return "both" === t || "none" === t ? n("settingsTab.componentsToVideoMaxImages.labelBoth",
              "Max Input Images or Videos per Prompt") : "video-only" === t ? n(
              "settingsTab.componentsToVideoMaxImages.labelVideoOnly", "Max Input Videos per Prompt") : n(
              `settingsTab.${e.labelKey}.label`)
          }),
          r = Ds(() => Array.from({
            length: e.optionCount
          }, (t, a) => {
            const r = a + 1;
            if (!o.value) return {
              label: n(`settingsTab.${e.optionsKey}.option${r}`),
              value: r
            };
            const s = i.value;
            return "both" === s || "none" === s ? {
              label: n(`settingsTab.${e.optionsKey}.optionBoth`, {
                count: r
              }, r),
              value: r
            } : "video-only" === s ? {
              label: n(`settingsTab.${e.optionsKey}.optionVideoOnly`, {
                count: r
              }, r),
              value: r
            } : {
              label: n(`settingsTab.${e.optionsKey}.option${r}`),
              value: r
            }
          }));
        return (n, o) => {
          const i = _a("PSelect");
          return ns(), rs("div", zC, [ps("div", UC, [o[1] || (o[1] = ps("i", {
            class: "pi pi-images text-primary text-sm"
          }, null, -1)), ps("label", jC, In(a.value), 1)]), bs(i, {
            modelValue: e.settings[t.settingsKey],
            "onUpdate:modelValue": o[0] || (o[0] = n => e.settings[t.settingsKey] = n),
            options: r.value,
            "option-label": "label",
            "option-value": "value",
            class: "w-full"
          }, null, 8, ["modelValue", "options"])])
        }
      }
    }),
    GC = ["accept"],
    KC = {
      class: "space-y-1"
    },
    WC = {
      class: "text-xs sm:text-sm font-medium text-foreground"
    },
    qC = {
      class: "text-xs text-muted-foreground"
    },
    YC = {
      key: 0
    },
    XC = {
      key: 1
    },
    JC = {
      key: 0,
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3 space-y-2"
    },
    ZC = {
      class: "flex items-center justify-between gap-2"
    },
    QC = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    tS = {
      class: "grid grid-cols-4 sm:grid-cols-5 gap-2"
    },
    eS = ["onDragstart", "onDragover", "onDrop"],
    nS = ["src"],
    oS = ["src", "alt"],
    iS = {
      key: 2,
      class: "absolute bottom-1.5 left-1.5 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px] text-white rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider gap-1 pointer-events-none group-hover:opacity-0 transition-opacity duration-150"
    },
    aS = {
      class: "absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center"
    },
    rS = {
      class: "absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity"
    },
    sS = ca({
      __name: "UploadedImages",
      props: {
        modelValue: {},
        allowVideo: {
          type: Boolean,
          default: !1
        }
      },
      emits: ["update:modelValue"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          o = e,
          {
            t: i
          } = Tc(),
          a = Zo(null),
          r = Zo("custom"),
          s = Zo(null),
          l = Zo(null),
          c = Ds(() => {
            const t = [...n.modelValue];
            switch (r.value) {
              case "name-asc":
                return t.sort((t, e) => t.name.localeCompare(e.name));
              case "name-desc":
                return t.sort((t, e) => e.name.localeCompare(t.name));
              case "date-newest":
                return t.sort((t, e) => new Date(e.uploadedAt).getTime() - new Date(t.uploadedAt).getTime());
              case "date-oldest":
                return t.sort((t, e) => new Date(t.uploadedAt).getTime() - new Date(e.uploadedAt).getTime());
              default:
                return t
            }
          });
        Rr(r, () => {
          o("update:modelValue", c.value)
        });
        const d = Ds(() => {
            const t = fb(n.modelValue);
            return "both" === t ? i("common.images.labelImagesAndVideos", "Images & Videos") : "video-only" === t ?
              i("common.images.labelVideos", "Videos") : i("common.images.label")
          }),
          u = t => new Promise((e, n) => {
            const o = new FileReader;
            o.onload = () => e(o.result), o.onerror = t => n(t), o.readAsDataURL(t)
          }),
          p = async t => {
            const e = t.target.files;
            if (!e) return;
            const i = [...n.modelValue];
            for (const o of Array.from(e)) {
              const t = o.type.startsWith("image/"),
                e = n.allowVideo && o.type.startsWith("video/");
              if (t || e) try {
                const t = await u(o);
                i.push({
                  id: `${Date.now()}-${Math.random()}`,
                  file: o,
                  name: o.name,
                  base64: t,
                  uploadedAt: new Date
                })
              } catch (r) {}
            }
            o("update:modelValue", i), a.value && (a.value.value = "")
          }, b = () => {
            a.value?.click()
          }, m = t => {
            t.preventDefault(), t.stopPropagation()
          }, g = t => {
            t.preventDefault(), t.stopPropagation();
            const e = t.dataTransfer?.files;
            if (e) {
              const t = a.value;
              if (t) {
                const o = new DataTransfer;
                for (const t of Array.from(e)) {
                  const e = t.type.startsWith("image/"),
                    i = n.allowVideo && t.type.startsWith("video/");
                  (e || i) && o.items.add(t)
                }
                t.files = o.files, p({
                  target: t
                })
              }
            }
          };
        return (e, u) => {
          const f = _a("PSelect"),
            h = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", {
            class: "rounded-lg border-2 border-dashed border-border/60 bg-muted/10 p-3 text-center transition-colors hover:bg-muted/20 cursor-pointer",
            onDragover: m,
            onDrop: g,
            onClick: b
          }, [ps("input", {
            ref_key: "fileInputRef",
            ref: a,
            type: "file",
            multiple: "",
            accept: t.allowVideo ? "image/*,video/*" : "image/*",
            class: "hidden",
            onChange: p
          }, null, 40, GC), ps("div", KC, [u[3] || (u[3] = ps("i", {
            class: "pi pi-cloud-upload text-primary text-2xl block"
          }, null, -1)), ps("p", WC, In(ni(i)("common.upload.title")), 1), ps("p", qC, [t.allowVideo ?
            (ns(), rs("span", YC, [...u[2] || (u[2] = [gs(" PNG, JPG, GIF, ", -1), ps("span", {
              class: "bg-primary/15 text-primary border border-primary/20 px-1 py-0.5 rounded font-bold text-[10px] align-middle"
            }, "MP4", -1), gs(" up to 50MB each ", -1)])])) : (ns(), rs("span", XC, In(ni(i)(
              "common.upload.formats")), 1))
          ])])], 32), t.modelValue.length > 0 ? (ns(), rs("div", JC, [ps("div", ZC, [ps("label", QC, In(d
            .value) + " (" + In(t.modelValue.length) + ")", 1), bs(f, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = t => r.value = t),
            options: [{
              label: ni(i)("common.images.sortOptions.custom"),
              value: "custom"
            }, {
              label: ni(i)("common.images.sortOptions.nameAsc"),
              value: "name-asc"
            }, {
              label: ni(i)("common.images.sortOptions.nameDesc"),
              value: "name-desc"
            }, {
              label: ni(i)("common.images.sortOptions.newest"),
              value: "date-newest"
            }, {
              label: ni(i)("common.images.sortOptions.oldest"),
              value: "date-oldest"
            }],
            "option-label": "label",
            "option-value": "value",
            class: "text-xs",
            size: "small"
          }, null, 8, ["modelValue", "options"])]), ps("div", tS, [(ns(!0), rs(Xr, null, Na(c.value,
            t => (ns(), rs("div", {
              key: t.id,
              class: xn([
                "relative group rounded-lg border border-border/40 overflow-hidden bg-muted/40 transition-all aspect-square cursor-move",
                {
                  "ring-2 ring-primary": s.value === t.id
                }
              ]),
              draggable: "true",
              onDragstart: e => (t => {
                l.value = t
              })(t),
              onDragover: e => {
                return n = e, o = t.id, n.preventDefault(), n.stopPropagation(), void(s
                  .value = o);
                var n, o
              },
              onDrop: e => ((t, e) => {
                if (t.preventDefault(), t.stopPropagation(), !l.value) return;
                const i = [...n.modelValue],
                  a = i.findIndex(t => t.id === l.value.id),
                  c = i.findIndex(t => t.id === e);
                if (-1 !== a && -1 !== c && a !== c) {
                  const t = i[a];
                  i[a] = i[c], i[c] = t, r.value = "custom", o("update:modelValue", i)
                }
                l.value = null, s.value = null
              })(e, t.id),
              onDragleave: u[1] || (u[1] = t => s.value = null)
            }, [ni(gb)(t) ? (ns(), rs("video", {
              key: 0,
              src: t.base64,
              class: "w-full h-full object-cover animate-fade-in",
              muted: "",
              playsinline: "",
              loop: "",
              autoplay: ""
            }, null, 8, nS)) : (ns(), rs("img", {
              key: 1,
              src: t.base64,
              alt: t.name,
              class: "w-full h-full object-cover"
            }, null, 8, oS)), ni(gb)(t) ? (ns(), rs("div", iS, [...u[4] || (u[4] = [ps(
              "i", {
                class: "pi pi-video text-[9px]"
              }, null, -1), ps("span", null, "VIDEO", -1)])])) : fs("", !0), ps("div", aS,
              [
                bs(h, {
                  icon: "pi pi-trash",
                  severity: "danger",
                  text: "",
                  rounded: "",
                  class: "opacity-0 group-hover:opacity-100 transition-opacity",
                  onClick: e => {
                    return i = t.id, void o("update:modelValue", n.modelValue.filter(
                      t => t.id !== i));
                    var i
                  }
                }, null, 8, ["onClick"])
              ]), ps("div", rS, In(t.name), 1)], 42, eS))), 128))])])) : fs("", !0)], 64)
        }
      }
    }),
    lS = {
      class: "space-y-3"
    },
    cS = {
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3"
    },
    dS = {
      class: "space-y-3"
    },
    uS = {
      class: "flex gap-2"
    },
    pS = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    bS = {
      class: "text-xs text-muted-foreground"
    },
    mS = {
      key: 0,
      class: "rounded-md border border-warning/60 bg-warning/10 px-2 py-2 sm:px-3"
    },
    gS = {
      class: "text-xs text-warning font-medium"
    },
    fS = {
      class: "rounded-lg border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 p-2 sm:p-3 space-y-2"
    },
    hS = {
      class: "grid grid-cols-2 gap-2"
    },
    vS = {
      class: "grid grid-cols-3 gap-2"
    },
    yS = ca({
      __name: "ImageToVideoControl",
      props: {
        imageToVideoForm: {},
        isProcessingJob: {
          type: Boolean
        },
        settings: {},
        promptGroups: {},
        isClearingCache: {
          type: Boolean
        }
      },
      emits: ["clear", "clear-cache", "update:has-concat"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          o = e,
          i = Zo([]),
          {
            t: a
          } = Tc(),
          {
            parsePrompts: r,
            getPromptOption: s,
            setPromptOption: l,
            getOptionsForPrompt: c
          } = Fu(),
          {
            sendJob: d,
            isSending: u
          } = Vu(),
          p = jc(),
          b = Zo(!1),
          m = Ds(() => r(n.imageToVideoForm.prompt)),
          g = Ds(() => m.value.length),
          {
            isLimitReached: f,
            openUpgrade: h
          } = $u(g),
          v = Ds(() => n.settings.imageToVideoMaxImagesPerPrompt || 2),
          {
            isPromptAfterConcat: y,
            isConcatPrompt: k
          } = Uu({
            getPromptOption: s,
            prompts: m,
            defaultPromptOption: Ds(() => n.settings.defaultVideoOption)
          }),
          x = Ds(() => m.value.some((t, e) => k(e)));
        Rr(x, t => o("update:has-concat", t), {
          immediate: !0
        });
        const w = t => y(t) ? 1 === v.value ? 0 : 1 : v.value,
          {
            imagesPerPrompt: C
          } = function(t, e, n, o, i = !1) {
            return {
              imagesPerPrompt: Ds(() => {
                const a = [],
                  r = Array.isArray(e) ? e : e.value,
                  s = "number" == typeof n ? n : n.value;
                if (0 === t.value.length || 0 === r.length) return a;
                let l = 0;
                for (let e = 0; e < r.length; e++) {
                  const n = o ? o(e) : s,
                    r = [],
                    c = new Set;
                  if (i) {
                    for (let e = 0; e < n && r.length < n; e++) {
                      const n = (l + e) % t.value.length,
                        o = t.value[n];
                      c.has(o.id) || (r.push(o), c.add(o.id))
                    }
                    l = (l + n) % t.value.length
                  } else {
                    for (let e = 0; e < n && r.length < n && l + e < t.value.length; e++) {
                      const n = l + e,
                        o = t.value[n];
                      c.has(o.id) || (r.push(o), c.add(o.id))
                    }
                    l += n
                  }
                  a.push(r)
                }
                return a
              })
            }
          }(i, m, v, w),
          S = Ds(() => {
            let t = 0;
            for (let e = 0; e < m.value.length; e++) t += w(e);
            return t
          }),
          T = Ds(() => i.value.length >= S.value),
          I = async () => {
              if (0 === i.value.length || 0 === m.value.length) return;
              if (!T.value) return;
              b.value = !0;
              const t = x.value ? 1 : n.settings.concurrentPrompts,
                e = x.value ? 1 : n.settings.outputCount,
                o = m.value.map((o, i) => ({
                  prompt: o,
                  mode: "imageToVideo",
                  images: (C.value[i] || []).map(t => ({
                    base64: t.base64,
                    name: t.name
                  })),
                  aspectRatio: n.settings.aspectRatio,
                  outputCount: e,
                  model: n.settings.model,
                  videoOption: s(i, {
                    defaultPromptOption: n.settings.defaultVideoOption,
                    totalPrompts: m.value.length
                  }),
                  promptIndex: i + 1,
                  autoDownloadResourceQuality: n.settings.autoDownloadVideoQuality,
                  concurrentPrompts: t,
                  promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                  promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                  isConcat: k(i),
                  maxRetries: n.settings.maxRetries,
                  autoChangeFileName: n.settings.autoChangeFileName,
                  folderName: n.settings.folderName
                }));
              try {
                d(o, {
                  concurrentPrompts: t,
                  promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                  promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                  getGroups: () => n.promptGroups
                }).catch(t => {
                  p.add({
                    severity: "error",
                    summary: a("common.errors.sendJobFailed"),
                    detail: t?.message,
                    life: 8e3
                  })
                })
              } catch (r) {} finally {
                b.value = !1
              }
            },
            A = () => o("clear"), E = Zo(!1);
        return (e, a) => {
          const d = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", lS, [bs(sS, {
            modelValue: i.value,
            "onUpdate:modelValue": a[0] || (a[0] = t => i.value = t)
          }, null, 8, ["modelValue"]), bs(HC, {
            settings: t.settings,
            "settings-key": "imageToVideoMaxImagesPerPrompt",
            "label-key": "imageToVideoMaxImages",
            "options-key": "imageToVideoMaxImages",
            "option-count": 2
          }, null, 8, ["settings"]), ps("div", cS, [ps("div", dS, [bs(PC, {
            modelValue: t.imageToVideoForm.prompt,
            "onUpdate:modelValue": a[1] || (a[1] = e => t.imageToVideoForm.prompt = e),
            label: e.$t("imageToVideoControl.prompts.label"),
            placeholder: e.$t("imageToVideoControl.prompts.placeholder"),
            tip: e.$t("imageToVideoControl.prompts.tip")
          }, null, 8, ["modelValue", "label", "placeholder", "tip"]), bs(jb, {
            prompts: ni(r)(t.imageToVideoForm.prompt),
            "default-prompt-option": t.settings.defaultVideoOption,
            label: e.$t("common.videoModeControl.label"),
            tip: e.$t("common.videoModeControl.tip"),
            "concat-label": e.$t("common.videoModeControl.concatLabel"),
            "get-prompt-option": ni(s),
            "set-prompt-option": ni(l),
            "get-options-for-prompt": ni(c),
            "images-per-prompt": ni(C),
            "no-images-warning-text": e.$t("imageToVideoControl.validation.noImagesForPrompt")
          }, null, 8, ["prompts", "default-prompt-option", "label", "tip", "concat-label",
            "get-prompt-option", "set-prompt-option", "get-options-for-prompt",
            "images-per-prompt", "no-images-warning-text"
          ])])]), ps("div", uS, [bs(rb, {
            settings: t.settings,
            "has-concat": x.value,
            "max-count": 4
          }, null, 8, ["settings", "has-concat"]), bs(ub, {
            settings: t.settings
          }, null, 8, ["settings"])]), ps("div", pS, [ps("p", bS, In(e.$t(
            "imageToVideoControl.advancedHint")), 1), bs(mb, {
            settings: t.settings
          }, null, 8, ["settings"])]), g.value > 0 && !T.value ? (ns(), rs("div", mS, [ps("p", gS, "⚠️ " +
            In(e.$t("imageToVideoControl.notEnoughImages", {
              needed: S.value,
              prompts: g.value,
              uploaded: i.value.length
            })), 1)])) : fs("", !0), ps("div", fS, [bs(eb, {
            "prompt-groups": n.promptGroups
          }, null, 8, ["prompt-groups"]), ps("div", hS, [ps("div", vS, [bs(d, {
            label: e.$t("common.reportBug"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-flag",
            outlined: "",
            onClick: a[2] || (a[2] = t => E.value = !0)
          }, null, 8, ["label"]), bs(d, {
            label: e.$t("common.clearCache"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-database",
            "icon-pos": "left",
            outlined: "",
            loading: t.isClearingCache,
            disabled: t.isClearingCache,
            onClick: a[3] || (a[3] = t => o("clear-cache"))
          }, null, 8, ["label", "loading", "disabled"]), bs(d, {
            label: e.$t("imageToVideoControl.buttons.clear"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-refresh",
            outlined: "",
            onClick: A
          }, null, 8, ["label"])]), ni(f) ? (ns(), ss(d, {
            key: 0,
            label: e.$t("common.upgradeMax"),
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-crown",
            severity: "warning",
            onClick: ni(h)
          }, null, 8, ["label", "onClick"])) : (ns(), ss(d, {
            key: 1,
            label: ni(u) ? e.$t("imageToVideoControl.buttons.sending") : e.$t(
              "imageToVideoControl.buttons.run"),
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: ni(u) ? "pi pi-spin pi-spinner" : "pi pi-play",
            disabled: ni(u) || b.value || 0 === i.value.length || 0 === g.value || !T.value,
            loading: ni(u),
            onClick: I
          }, null, 8, ["label", "icon", "disabled", "loading"]))])])]), bs(ep, {
            visible: E.value,
            "onUpdate:visible": a[4] || (a[4] = t => E.value = t)
          }, null, 8, ["visible"])], 64)
        }
      }
    }),
    kS = {
      class: "space-y-3"
    },
    xS = {
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3"
    },
    wS = {
      class: "space-y-3"
    },
    CS = {
      class: "flex items-center justify-between p-2 bg-muted/20 rounded border border-border/40"
    },
    SS = {
      class: "flex items-center gap-2 flex-1"
    },
    TS = {
      class: "flex-1"
    },
    IS = {
      class: "text-xs sm:text-sm font-semibold text-foreground cursor-pointer"
    },
    AS = {
      class: "text-xs text-muted-foreground mt-0.5"
    },
    ES = {
      class: "flex gap-2"
    },
    PS = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    OS = {
      class: "text-xs text-muted-foreground"
    },
    MS = {
      key: 0,
      class: "rounded-md border border-danger/60 bg-danger/10 px-2 py-2 sm:px-3"
    },
    LS = {
      class: "text-xs text-danger font-medium flex items-center gap-2"
    },
    _S = {
      class: "rounded-lg border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 p-2 sm:p-3 space-y-2"
    },
    BS = {
      key: 0,
      class: "flex items-center gap-2 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] sm:text-xs text-primary font-medium mb-1"
    },
    FS = {
      key: 1,
      class: "flex items-center gap-2 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] sm:text-xs text-primary font-medium mb-1"
    },
    RS = {
      class: "grid grid-cols-2 gap-2"
    },
    DS = {
      class: "grid grid-cols-3 gap-2"
    },
    VS = ca({
      __name: "ComponentsToVideoControl",
      props: {
        componentsToVideoForm: {},
        isProcessingJob: {
          type: Boolean
        },
        settings: {},
        promptGroups: {},
        isClearingCache: {
          type: Boolean
        }
      },
      emits: ["clear", "clear-cache", "update:has-concat"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          o = e,
          {
            t: i
          } = Tc(),
          a = Zo([]),
          {
            parsePrompts: r,
            getPromptOption: s,
            setPromptOption: l,
            getOptionsForPrompt: c
          } = Fu(),
          {
            sendJob: d,
            isSending: u
          } = Vu(),
          p = jc(),
          b = Zo(!1),
          m = Ds(() => r(n.componentsToVideoForm.prompt)),
          g = Ds(() => m.value.length),
          {
            isLimitReached: f,
            openUpgrade: h
          } = $u(g),
          v = Ds(() => n.settings.componentsToVideoMaxImagesPerPrompt || 3),
          y = Uu({
            getPromptOption: s,
            prompts: m,
            defaultPromptOption: Ds(() => n.settings.defaultVideoOption)
          }),
          {
            isPromptAfterConcat: k
          } = y,
          x = Ds(() => m.value.some((t, e) => y.isConcatPrompt(e)));
        Rr(x, t => o("update:has-concat", t), {
          immediate: !0
        });
        const {
          imagesPerPrompt: w,
          hasCharacterImages: C,
          allPromptsHaveImages: S,
          promptsWithoutImages: T
        } = zu({
          uploadedImages: a,
          prompts: m,
          maxImagesPerPrompt: v,
          autoAddCharacterImages: Ds(() => n.settings.autoAddCharacterImages),
          concatChecker: y
        }), I = Ds(() => n.settings.autoAddVoiceBySpeaker || null != n.settings.defaultSpeaker && "none" !== n
          .settings.defaultSpeaker || n.settings.enableCharacterControl || (n.settings.defaultCharacters?.length ??
            0) > 0), A = Zo(null), E = t => A.value?.getSpeakerRowBadge(t) ?? null, P = Zo(null), O = t => [P.value
          ?.getCharacterRowBadge(t) ?? null
        ], M = async () => {
            const t = n.settings.autoAddCharacterImages || I.value;
            if (0 === a.value.length && !t || 0 === m.value.length) return;
            if (b.value = !0, !t && !S.value) return void alert(i("componentsToVideoControl.validation.noImages", {
              prompts: T.value.join(", "),
              count: T.value.length
            }));
            const e = x.value ? 1 : n.settings.concurrentPrompts,
              o = x.value ? 1 : n.settings.outputCount,
              r = m.value.map((t, i) => ({
                prompt: t,
                mode: "componentsToVideo",
                images: (w.value[i] || []).map(t => ({
                  id: t.id,
                  base64: t.base64,
                  name: t.name
                })),
                speaker: A.value?.getPayloadSpeaker(i) ?? null,
                characters: P.value?.getPayloadCharacters(i) ?? null,
                aspectRatio: n.settings.aspectRatio,
                outputCount: o,
                model: n.settings.model,
                videoOption: s(i, {
                  defaultPromptOption: n.settings.defaultVideoOption,
                  totalPrompts: m.value.length
                }),
                promptIndex: i + 1,
                autoDownloadResourceQuality: n.settings.autoDownloadVideoQuality,
                concurrentPrompts: e,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                isConcat: y.isConcatPrompt(i),
                maxRetries: n.settings.maxRetries,
                autoChangeFileName: n.settings.autoChangeFileName,
                folderName: n.settings.folderName
              }));
            try {
              d(r, {
                concurrentPrompts: e,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                getGroups: () => n.promptGroups
              }).catch(t => {
                p.add({
                  severity: "error",
                  summary: i("common.errors.sendJobFailed"),
                  detail: t?.message,
                  life: 8e3
                })
              })
            } catch (l) {} finally {
              b.value = !1
            }
          },
          L = () => o("clear"), _ = Zo(!1);
        return (e, i) => {
          const d = _a("PInputSwitch"),
            p = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", kS, [bs(sS, {
              modelValue: a.value,
              "onUpdate:modelValue": i[0] || (i[0] = t => a.value = t),
              "allow-video": "Omni Flash" === t.settings.model
            }, null, 8, ["modelValue", "allow-video"]), bs(HC, {
              settings: t.settings,
              "settings-key": "componentsToVideoMaxImagesPerPrompt",
              "label-key": "componentsToVideoMaxImages",
              "options-key": "componentsToVideoMaxImages",
              "option-count": 10,
              "uploaded-images": a.value
            }, null, 8, ["settings", "uploaded-images"]), ps("div", xS, [ps("div", wS, [bs(PC, {
              modelValue: t.componentsToVideoForm.prompt,
              "onUpdate:modelValue": i[1] || (i[1] = e => t.componentsToVideoForm.prompt = e),
              label: e.$t("componentsToVideoControl.prompts.label"),
              placeholder: e.$t("componentsToVideoControl.prompts.placeholder"),
              tip: e.$t("componentsToVideoControl.prompts.tip")
            }, null, 8, ["modelValue", "label", "placeholder", "tip"]), bs(yp, {
              ref_key: "characterControl",
              ref: P,
              settings: t.settings,
              prompts: m.value
            }, null, 8, ["settings", "prompts"]), ps("div", CS, [ps("div", SS, [i[6] || (i[6] = ps(
              "i", {
                class: "pi pi-user text-primary text-sm"
              }, null, -1)), ps("div", TS, [ps("label", IS, In(e.$t(
              "componentsToVideoControl.autoAddCharacterImages.label")), 1), ps("p", AS,
              In(e.$t("componentsToVideoControl.autoAddCharacterImages.description")), 1
              )])]), bs(d, {
              modelValue: t.settings.autoAddCharacterImages,
              "onUpdate:modelValue": i[2] || (i[2] = e => t.settings.autoAddCharacterImages =
                e)
            }, null, 8, ["modelValue"])]), bs(Fp, {
              ref_key: "voiceControl",
              ref: A,
              settings: t.settings,
              prompts: m.value
            }, null, 8, ["settings", "prompts"]), bs(jb, {
              prompts: ni(r)(t.componentsToVideoForm.prompt),
              "default-prompt-option": t.settings.defaultVideoOption,
              label: e.$t("common.videoModeControl.label"),
              tip: e.$t("common.videoModeControl.tip"),
              "concat-label": e.$t("common.videoModeControl.concatLabel"),
              "get-prompt-option": ni(s),
              "set-prompt-option": ni(l),
              "get-options-for-prompt": ni(c),
              "images-per-prompt": ni(w),
              "show-row-warning": e => !(!t.settings.autoAddCharacterImages || ni(k)(e) || ni(C)(
                e)),
              "row-warning-text": e.$t("componentsToVideoControl.autoAddCharacterImages.noMatch"),
              "get-row-badge": E,
              "get-extra-row-badges": O
            }, null, 8, ["prompts", "default-prompt-option", "label", "tip", "concat-label",
              "get-prompt-option", "set-prompt-option", "get-options-for-prompt",
              "images-per-prompt", "show-row-warning", "row-warning-text"
            ])])]), ps("div", ES, [bs(rb, {
              settings: t.settings,
              "has-concat": x.value,
              "max-count": 4
            }, null, 8, ["settings", "has-concat"]), bs(ub, {
              settings: t.settings
            }, null, 8, ["settings"])]), ps("div", PS, [ps("p", OS, In(e.$t(
              "componentsToVideoControl.advancedHint")), 1), bs(mb, {
              settings: t.settings
            }, null, 8, ["settings"])]), g.value > 0 && !ni(S) && !t.settings.autoAddCharacterImages && !I
            .value ? (ns(), rs("div", MS, [ps("p", LS, [i[7] || (i[7] = ps("i", {
              class: "pi pi-exclamation-triangle text-danger"
            }, null, -1)), ps("span", null, In(e.$t(
              "componentsToVideoControl.validation.noImages", {
                prompts: ni(T).map(t => t + 1).join(", "),
                count: ni(T).length
              })), 1)])])) : fs("", !0), ps("div", _S, [t.settings.autoAddCharacterImages ? (ns(), rs("div",
              BS,
              [i[8] || (i[8] = ps("i", {
                  class: "pi pi-info-circle"
                }, null, -1)), ps("span", null, In(e.$t("common.warnings.autoAddCharacterActive")),
                1)])) : fs("", !0), t.settings.autoAddVoiceBySpeaker ? (ns(), rs("div", FS, [i[9] || (i[
              9] = ps("i", {
              class: "pi pi-microphone"
            }, null, -1)), ps("span", null, In(e.$t("common.warnings.autoAddVoiceActive")), 1)])) : fs(
              "", !0), bs(eb, {
              "prompt-groups": n.promptGroups
            }, null, 8, ["prompt-groups"]), ps("div", RS, [ps("div", DS, [bs(p, {
              label: e.$t("common.reportBug"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-flag",
              outlined: "",
              onClick: i[3] || (i[3] = t => _.value = !0)
            }, null, 8, ["label"]), bs(p, {
              label: e.$t("common.clearCache"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-database",
              "icon-pos": "left",
              outlined: "",
              loading: t.isClearingCache,
              disabled: t.isClearingCache,
              onClick: i[4] || (i[4] = t => o("clear-cache"))
            }, null, 8, ["label", "loading", "disabled"]), bs(p, {
              label: e.$t("componentsToVideoControl.buttons.clear"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-refresh",
              outlined: "",
              onClick: L
            }, null, 8, ["label"])]), ni(f) ? (ns(), ss(p, {
              key: 0,
              label: e.$t("common.upgradeMax"),
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-crown",
              severity: "warning",
              onClick: ni(h)
            }, null, 8, ["label", "onClick"])) : (ns(), ss(p, {
              key: 1,
              label: ni(u) ? e.$t("componentsToVideoControl.buttons.sending") : e.$t(
                "componentsToVideoControl.buttons.run"),
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: ni(u) ? "pi pi-spin pi-spinner" : "pi pi-play",
              disabled: ni(u) || b.value || 0 === g.value || !t.settings
                .autoAddCharacterImages && !I.value && (0 === a.value.length || !ni(S)),
              loading: ni(u),
              onClick: M
            }, null, 8, ["label", "icon", "disabled", "loading"]))])])
          ]), bs(ep, {
            visible: _.value,
            "onUpdate:visible": i[5] || (i[5] = t => _.value = t)
          }, null, 8, ["visible"])], 64)
        }
      }
    }),
    NS = {
      class: "space-y-3"
    },
    $S = {
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3"
    },
    zS = {
      class: "space-y-3"
    },
    US = {
      class: "flex gap-2"
    },
    jS = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    HS = {
      class: "text-xs text-muted-foreground"
    },
    GS = {
      class: "rounded-lg border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 p-2 sm:p-3 space-y-2"
    },
    KS = {
      class: "grid grid-cols-2 gap-2"
    },
    WS = {
      class: "grid grid-cols-3 gap-2"
    },
    qS = ca({
      __name: "TextToImageControl",
      props: {
        textToImageForm: {},
        isProcessingJob: {
          type: Boolean
        },
        settings: {},
        promptGroups: {},
        isClearingCache: {
          type: Boolean
        }
      },
      emits: ["clear", "clear-cache", "update:has-concat"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          {
            t: o
          } = Tc(),
          {
            parsePrompts: i,
            getPromptOption: a,
            setPromptOption: r,
            getOptionsForPrompt: s
          } = Ru(),
          {
            sendJob: l,
            isSending: c
          } = Vu(),
          d = jc(),
          u = Zo(!1),
          p = Ds(() => i(n.textToImageForm.prompt)),
          {
            isLimitReached: b,
            openUpgrade: m
          } = $u(Ds(() => p.value.length)),
          g = Uu({
            getPromptOption: a,
            prompts: p,
            defaultPromptOption: Ds(() => n.settings.defaultImageOption)
          }),
          f = Ds(() => p.value.some((t, e) => g.isConcatPrompt(e))),
          h = e;
        Rr(f, t => h("update:has-concat", t), {
          immediate: !0
        });
        const v = async () => {
            if (!n.textToImageForm.prompt.trim() || 0 === p.value.length) return;
            u.value = !0;
            const t = f.value ? 1 : n.settings.concurrentPrompts,
              e = f.value ? 1 : n.settings.outputCount,
              i = p.value.map((o, i) => ({
                prompt: o,
                mode: "textToImage",
                characters: x.value?.getPayloadCharacters(i) ?? null,
                aspectRatio: n.settings.aspectRatio,
                outputCount: e,
                model: n.settings.imageModel,
                promptIndex: i + 1,
                autoDownloadResourceQuality: n.settings.autoDownloadImageQuality,
                concurrentPrompts: t,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                isConcat: g.isConcatPrompt(i),
                maxRetries: n.settings.maxRetries,
                autoChangeFileName: n.settings.autoChangeFileName,
                folderName: n.settings.folderName
              }));
            try {
              l(i, {
                concurrentPrompts: t,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                getGroups: () => n.promptGroups
              }).catch(t => {
                d.add({
                  severity: "error",
                  summary: o("common.errors.sendJobFailed"),
                  detail: t?.message,
                  life: 8e3
                })
              })
            } catch (a) {} finally {
              u.value = !1
            }
          },
          y = () => h("clear"), k = Zo(!1), x = Zo(null), w = t => [x.value?.getCharacterRowBadge(t) ?? null];
        return (e, o) => {
          const l = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", NS, [ps("div", $S, [ps("div", zS, [bs(PC, {
            modelValue: t.textToImageForm.prompt,
            "onUpdate:modelValue": o[0] || (o[0] = e => t.textToImageForm.prompt = e),
            label: e.$t("textToImageControl.prompt.label"),
            placeholder: e.$t("textToImageControl.prompt.placeholder"),
            tip: e.$t("textToImageControl.prompt.tip")
          }, null, 8, ["modelValue", "label", "placeholder", "tip"]), bs(yp, {
            ref_key: "characterControl",
            ref: x,
            settings: t.settings,
            prompts: p.value
          }, null, 8, ["settings", "prompts"]), bs(jb, {
            prompts: ni(i)(t.textToImageForm.prompt),
            "default-prompt-option": t.settings.defaultImageOption,
            label: e.$t("common.imageModeControl.label"),
            tip: e.$t("common.imageModeControl.tip"),
            "concat-label": e.$t("common.imageModeControl.chainLabel"),
            "get-prompt-option": ni(a),
            "set-prompt-option": ni(r),
            "get-options-for-prompt": ni(s),
            "chain-indicator-text": e.$t("common.imageModeOptions.concat"),
            "get-extra-row-badges": w
          }, null, 8, ["prompts", "default-prompt-option", "label", "tip", "concat-label",
            "get-prompt-option", "set-prompt-option", "get-options-for-prompt",
            "chain-indicator-text"
          ])])]), ps("div", US, [bs(rb, {
            settings: t.settings,
            "has-concat": f.value,
            "max-count": 4
          }, null, 8, ["settings", "has-concat"]), bs(ub, {
            settings: t.settings
          }, null, 8, ["settings"])]), ps("div", jS, [ps("p", HS, In(e.$t(
            "textToImageControl.advancedHint")), 1), bs(mb, {
            settings: t.settings
          }, null, 8, ["settings"])]), ps("div", GS, [bs(eb, {
            "prompt-groups": n.promptGroups
          }, null, 8, ["prompt-groups"]), ps("div", KS, [ps("div", WS, [bs(l, {
            label: e.$t("common.reportBug"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-flag",
            outlined: "",
            onClick: o[1] || (o[1] = t => k.value = !0)
          }, null, 8, ["label"]), bs(l, {
            label: e.$t("common.clearCache"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-database",
            "icon-pos": "left",
            outlined: "",
            loading: t.isClearingCache,
            disabled: t.isClearingCache,
            onClick: o[2] || (o[2] = t => h("clear-cache"))
          }, null, 8, ["label", "loading", "disabled"]), bs(l, {
            label: e.$t("textToImageControl.buttons.clear"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-refresh",
            outlined: "",
            onClick: y
          }, null, 8, ["label"])]), ni(b) ? (ns(), ss(l, {
            key: 0,
            label: e.$t("common.upgradeMax"),
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-crown",
            severity: "warning",
            onClick: ni(m)
          }, null, 8, ["label", "onClick"])) : (ns(), ss(l, {
            key: 1,
            label: ni(c) ? e.$t("textToImageControl.buttons.sending") : e.$t(
              "textToImageControl.buttons.run"),
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: ni(c) ? "pi pi-spin pi-spinner" : "pi pi-play",
            disabled: ni(c) || u.value || !t.textToImageForm.prompt.trim(),
            loading: ni(c),
            onClick: v
          }, null, 8, ["label", "icon", "disabled", "loading"]))])])]), bs(ep, {
            visible: k.value,
            "onUpdate:visible": o[3] || (o[3] = t => k.value = t)
          }, null, 8, ["visible"])], 64)
        }
      }
    }),
    YS = {
      class: "space-y-3"
    },
    XS = {
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3"
    },
    JS = {
      class: "space-y-3"
    },
    ZS = {
      class: "flex items-center justify-between gap-2 p-2 bg-muted/20 rounded border border-border/40"
    },
    QS = {
      class: "flex items-center gap-2 flex-1"
    },
    tT = {
      class: "flex-1"
    },
    eT = {
      class: "text-xs sm:text-sm font-semibold text-foreground cursor-pointer"
    },
    nT = {
      class: "text-xs text-muted-foreground mt-0.5"
    },
    oT = {
      class: "flex gap-2"
    },
    iT = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    aT = {
      class: "text-xs text-muted-foreground"
    },
    rT = {
      key: 0,
      class: "rounded-md border border-warning/60 bg-warning/10 px-2 py-2 sm:px-3"
    },
    sT = {
      class: "text-xs text-warning font-medium"
    },
    lT = {
      class: "rounded-lg border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 p-2 sm:p-3 space-y-2"
    },
    cT = {
      class: "space-y-1 mb-1"
    },
    dT = {
      key: 0,
      class: "flex items-center gap-2 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] sm:text-xs text-primary font-medium"
    },
    uT = {
      class: "grid grid-cols-2 gap-2"
    },
    pT = {
      class: "grid grid-cols-3 gap-2"
    },
    bT = ca({
      __name: "ImageToImageControl",
      props: {
        imageToImageForm: {},
        isProcessingJob: {
          type: Boolean
        },
        settings: {},
        promptGroups: {},
        isClearingCache: {
          type: Boolean
        }
      },
      emits: ["clear", "clear-cache", "update:has-concat"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          o = e,
          {
            t: i
          } = Tc(),
          a = Zo([]),
          {
            parsePrompts: r,
            getPromptOption: s,
            setPromptOption: l,
            getOptionsForPrompt: c
          } = Ru(),
          {
            sendJob: d,
            isSending: u
          } = Vu(),
          p = jc(),
          b = Zo(!1),
          m = Ds(() => r(n.imageToImageForm.prompt)),
          g = Ds(() => m.value.length),
          {
            isLimitReached: f,
            openUpgrade: h
          } = $u(g),
          v = Ds(() => n.settings.imageToImageMaxImagesPerPrompt || 3),
          y = Uu({
            getPromptOption: s,
            prompts: m,
            defaultPromptOption: Ds(() => n.settings.defaultImageOption)
          }),
          k = Ds(() => m.value.some((t, e) => y.isConcatPrompt(e)));
        Rr(k, t => o("update:has-concat", t), {
          immediate: !0
        });
        const {
          imagesPerPrompt: x,
          hasCharacterImages: w,
          allPromptsHaveImages: C,
          promptsWithoutImages: S
        } = zu({
          uploadedImages: a,
          prompts: m,
          maxImagesPerPrompt: v,
          autoAddCharacterImages: Ds(() => n.settings.autoAddCharacterImages),
          concatChecker: y
        }), T = async () => {
            if (0 === a.value.length && !n.settings.autoAddCharacterImages || 0 === m.value.length) return;
            if (b.value = !0, !n.settings.autoAddCharacterImages && !C.value) return void alert(i(
              "imageToImageControl.validation.noImages", {
                prompts: S.value.join(", ")
              }));
            const t = k.value ? 1 : n.settings.concurrentPrompts,
              e = k.value ? 1 : n.settings.outputCount,
              o = m.value.map((o, i) => ({
                prompt: o,
                mode: "imageToImage",
                characters: E.value?.getPayloadCharacters(i) ?? null,
                images: (x.value[i] || []).map(t => ({
                  base64: t.base64,
                  name: t.name
                })),
                aspectRatio: n.settings.aspectRatio,
                outputCount: e,
                model: n.settings.imageModel,
                promptIndex: i + 1,
                autoDownloadResourceQuality: n.settings.autoDownloadImageQuality,
                concurrentPrompts: t,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                isConcat: y.isConcatPrompt(i),
                maxRetries: n.settings.maxRetries,
                autoChangeFileName: n.settings.autoChangeFileName,
                folderName: n.settings.folderName
              }));
            try {
              d(o, {
                concurrentPrompts: t,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                getGroups: () => n.promptGroups
              }).catch(t => {
                p.add({
                  severity: "error",
                  summary: i("common.errors.sendJobFailed"),
                  detail: t?.message,
                  life: 8e3
                })
              })
            } catch (r) {} finally {
              b.value = !1
            }
          },
          I = () => o("clear"), A = Zo(!1), E = Zo(null), P = t => [E.value?.getCharacterRowBadge(t) ?? null];
        return (e, i) => {
          const d = _a("PInputSwitch"),
            p = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", YS, [bs(sS, {
            modelValue: a.value,
            "onUpdate:modelValue": i[0] || (i[0] = t => a.value = t)
          }, null, 8, ["modelValue"]), bs(HC, {
            settings: t.settings,
            "settings-key": "imageToImageMaxImagesPerPrompt",
            "label-key": "imageToImageMaxImages",
            "options-key": "imageToImageMaxImages",
            "option-count": 10
          }, null, 8, ["settings"]), ps("div", XS, [ps("div", JS, [bs(PC, {
            modelValue: t.imageToImageForm.prompt,
            "onUpdate:modelValue": i[1] || (i[1] = e => t.imageToImageForm.prompt = e),
            label: e.$t("imageToImageControl.prompts.label"),
            placeholder: e.$t("imageToImageControl.prompts.placeholder"),
            tip: e.$t("imageToImageControl.prompts.tip")
          }, null, 8, ["modelValue", "label", "placeholder", "tip"]), bs(yp, {
            ref_key: "characterControl",
            ref: E,
            settings: t.settings,
            prompts: m.value
          }, null, 8, ["settings", "prompts"]), ps("div", ZS, [ps("div", QS, [i[6] || (i[6] = ps(
            "i", {
              class: "pi pi-user text-primary text-sm"
            }, null, -1)), ps("div", tT, [ps("label", eT, In(e.$t(
            "imageToImageControl.autoAddCharacterImages.label")), 1), ps("p", nT, In(e
            .$t("imageToImageControl.autoAddCharacterImages.description")), 1)])]), bs(d, {
            modelValue: t.settings.autoAddCharacterImages,
            "onUpdate:modelValue": i[2] || (i[2] = e => t.settings.autoAddCharacterImages =
              e)
          }, null, 8, ["modelValue"])]), bs(jb, {
            prompts: ni(r)(t.imageToImageForm.prompt),
            "default-prompt-option": t.settings.defaultImageOption,
            label: e.$t("common.imageModeControl.label"),
            tip: e.$t("common.imageModeControl.tip"),
            "concat-label": e.$t("common.imageModeControl.chainLabel"),
            "get-prompt-option": ni(s),
            "set-prompt-option": ni(l),
            "get-options-for-prompt": ni(c),
            "images-per-prompt": ni(x),
            "chain-indicator-text": e.$t("common.imageModeOptions.concat"),
            "show-row-warning": e => !(!t.settings.autoAddCharacterImages || ni(w)(e)),
            "row-warning-text": e.$t("imageToImageControl.autoAddCharacterImages.noMatch"),
            "no-images-warning-text": e.$t("imageToImageControl.validation.noImagesForPrompt"),
            "get-extra-row-badges": P
          }, null, 8, ["prompts", "default-prompt-option", "label", "tip", "concat-label",
            "get-prompt-option", "set-prompt-option", "get-options-for-prompt",
            "images-per-prompt", "chain-indicator-text", "show-row-warning", "row-warning-text",
            "no-images-warning-text"
          ])])]), ps("div", oT, [bs(rb, {
            settings: t.settings,
            "has-concat": k.value,
            "max-count": 4
          }, null, 8, ["settings", "has-concat"]), bs(ub, {
            settings: t.settings
          }, null, 8, ["settings"])]), ps("div", iT, [ps("p", aT, In(e.$t(
            "imageToImageControl.advancedHint")), 1), bs(mb, {
            settings: t.settings
          }, null, 8, ["settings"])]), g.value > 0 && !ni(C) ? (ns(), rs("div", rT, [ps("p", sT, "⚠️ " +
            In(e.$t("imageToImageControl.validation.noImages", {
              prompts: ni(S).join(", ")
            })), 1)])) : fs("", !0), ps("div", lT, [ps("div", cT, [t.settings.autoAddCharacterImages ? (
            ns(), rs("div", dT, [i[7] || (i[7] = ps("i", {
              class: "pi pi-info-circle"
            }, null, -1)), ps("span", null, In(e.$t(
              "common.warnings.autoAddCharacterActive")), 1)])) : fs("", !0)]), bs(eb, {
            "prompt-groups": n.promptGroups
          }, null, 8, ["prompt-groups"]), ps("div", uT, [ps("div", pT, [bs(p, {
            label: e.$t("common.reportBug"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-flag",
            outlined: "",
            onClick: i[3] || (i[3] = t => A.value = !0)
          }, null, 8, ["label"]), bs(p, {
            label: e.$t("common.clearCache"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-database",
            "icon-pos": "left",
            outlined: "",
            loading: t.isClearingCache,
            disabled: t.isClearingCache,
            onClick: i[4] || (i[4] = t => o("clear-cache"))
          }, null, 8, ["label", "loading", "disabled"]), bs(p, {
            label: e.$t("imageToImageControl.buttons.clear"),
            severity: "secondary",
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-refresh",
            outlined: "",
            onClick: I
          }, null, 8, ["label"])]), ni(f) ? (ns(), ss(p, {
            key: 0,
            label: e.$t("common.upgradeMax"),
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: "pi pi-crown",
            severity: "warning",
            onClick: ni(h)
          }, null, 8, ["label", "onClick"])) : (ns(), ss(p, {
            key: 1,
            label: ni(u) ? e.$t("imageToImageControl.buttons.sending") : e.$t(
              "imageToImageControl.buttons.run"),
            class: "w-full text-xs sm:text-sm",
            size: "small",
            icon: ni(u) ? "pi pi-spin pi-spinner" : "pi pi-play",
            disabled: ni(u) || b.value || 0 === a.value.length && !t.settings
              .autoAddCharacterImages || 0 === g.value || !t.settings
              .autoAddCharacterImages && !ni(C),
            loading: ni(u),
            onClick: T
          }, null, 8, ["label", "icon", "disabled", "loading"]))])])]), bs(ep, {
            visible: A.value,
            "onUpdate:visible": i[5] || (i[5] = t => A.value = t)
          }, null, 8, ["visible"])], 64)
        }
      }
    }),
    mT = {
      class: "space-y-3"
    },
    gT = {
      class: "rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/20 p-3"
    },
    fT = {
      class: "space-y-3"
    },
    hT = {
      class: "flex items-center justify-between p-2 bg-muted/20 rounded border border-border/40"
    },
    vT = {
      class: "flex items-center gap-2 flex-1"
    },
    yT = {
      class: "flex-1"
    },
    kT = {
      class: "text-xs sm:text-sm font-semibold text-foreground cursor-pointer"
    },
    xT = {
      class: "text-xs text-muted-foreground mt-0.5"
    },
    wT = {
      class: "flex gap-2"
    },
    CT = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    ST = {
      class: "text-xs text-muted-foreground"
    },
    TT = {
      key: 0,
      class: "rounded-md border border-danger/60 bg-danger/10 px-2 py-2 sm:px-3"
    },
    IT = {
      class: "text-xs text-danger font-medium flex items-center gap-2"
    },
    AT = {
      class: "rounded-lg border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 p-2 sm:p-3 space-y-2"
    },
    ET = {
      key: 0,
      class: "flex items-center gap-2 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] sm:text-xs text-primary font-medium mb-1"
    },
    PT = {
      key: 1,
      class: "flex items-center gap-2 px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] sm:text-xs text-primary font-medium mb-1"
    },
    OT = {
      class: "grid grid-cols-2 gap-2"
    },
    MT = {
      class: "grid grid-cols-3 gap-2"
    },
    LT = ca({
      __name: "AgentAutomationControl",
      props: {
        agentAutomationForm: {},
        isProcessingJob: {
          type: Boolean
        },
        settings: {},
        promptGroups: {},
        isClearingCache: {
          type: Boolean
        }
      },
      emits: ["clear", "clear-cache", "update:has-concat"],
      setup(t, {
        emit: e
      }) {
        const n = t,
          o = e,
          {
            t: i
          } = Tc(),
          a = Zo([]),
          {
            parsePrompts: r,
            getPromptOption: s,
            setPromptOption: l,
            getOptionsForPrompt: c
          } = Fu(),
          {
            sendJob: d,
            isSending: u
          } = Vu(),
          p = jc(),
          b = Zo(!1),
          m = Ds(() => r(n.agentAutomationForm.prompt)),
          g = Ds(() => m.value.length),
          {
            isLimitReached: f,
            openUpgrade: h
          } = $u(g),
          v = Ds(() => n.settings.componentsToVideoMaxImagesPerPrompt || 3),
          y = Uu({
            getPromptOption: s,
            prompts: m,
            defaultPromptOption: Ds(() => n.settings.defaultVideoOption)
          }),
          {
            isPromptAfterConcat: k
          } = y,
          x = Ds(() => m.value.some((t, e) => y.isConcatPrompt(e)));
        Rr(x, t => o("update:has-concat", t), {
          immediate: !0
        });
        const {
          imagesPerPrompt: w,
          hasCharacterImages: C,
          allPromptsHaveImages: S,
          promptsWithoutImages: T
        } = zu({
          uploadedImages: a,
          prompts: m,
          maxImagesPerPrompt: v,
          autoAddCharacterImages: Ds(() => n.settings.autoAddCharacterImages),
          concatChecker: y
        }), I = Ds(() => n.settings.autoAddVoiceBySpeaker || null != n.settings.defaultSpeaker && "none" !== n
          .settings.defaultSpeaker || n.settings.enableCharacterControl || (n.settings.defaultCharacters?.length ??
            0) > 0), A = Zo(null), E = t => A.value?.getSpeakerRowBadge(t) ?? null, P = Zo(null), O = t => [P.value
          ?.getCharacterRowBadge(t) ?? null
        ], M = async () => {
            if (0 === m.value.length) return;
            b.value = !0;
            if (!(n.settings.autoAddCharacterImages || I.value) && !S.value) return alert(i(
              "agentAutomationControl.validation.noImages", {
                prompts: T.value.join(", "),
                count: T.value.length
              })), void(b.value = !1);
            const t = x.value ? 1 : n.settings.outputCount,
              e = m.value.map((e, o) => ({
                prompt: e,
                mode: "agentAutomation",
                images: (w.value[o] || []).map(t => ({
                  id: t.id,
                  base64: t.base64,
                  name: t.name
                })),
                speaker: A.value?.getPayloadSpeaker(o) ?? null,
                characters: P.value?.getPayloadCharacters(o) ?? null,
                aspectRatio: n.settings.aspectRatio,
                outputCount: t,
                model: n.settings.model,
                videoOption: s(o, {
                  defaultPromptOption: n.settings.defaultVideoOption,
                  totalPrompts: m.value.length
                }),
                promptIndex: o + 1,
                autoDownloadResourceQuality: n.settings.autoDownloadVideoQuality,
                concurrentPrompts: 1,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                isConcat: y.isConcatPrompt(o),
                maxRetries: n.settings.maxRetries,
                autoChangeFileName: n.settings.autoChangeFileName,
                folderName: n.settings.folderName
              }));
            try {
              d(e, {
                concurrentPrompts: 1,
                promptDelaySecondsMin: n.settings.promptDelaySecondsMin,
                promptDelaySecondsMax: n.settings.promptDelaySecondsMax,
                getGroups: () => n.promptGroups
              }).catch(t => {
                p.add({
                  severity: "error",
                  summary: i("common.errors.sendJobFailed"),
                  detail: t?.message,
                  life: 8e3
                })
              })
            } catch (o) {} finally {
              b.value = !1
            }
          },
          L = () => o("clear"), _ = Zo(!1);
        return (e, i) => {
          const d = _a("PInputSwitch"),
            p = _a("PButton");
          return ns(), rs(Xr, null, [ps("div", mT, [bs(sS, {
              modelValue: a.value,
              "onUpdate:modelValue": i[0] || (i[0] = t => a.value = t),
              "allow-video": "Omni Flash" === t.settings.model
            }, null, 8, ["modelValue", "allow-video"]), bs(HC, {
              settings: t.settings,
              "settings-key": "componentsToVideoMaxImagesPerPrompt",
              "label-key": "componentsToVideoMaxImages",
              "options-key": "componentsToVideoMaxImages",
              "option-count": 10,
              "uploaded-images": a.value
            }, null, 8, ["settings", "uploaded-images"]), ps("div", gT, [ps("div", fT, [bs(PC, {
              modelValue: t.agentAutomationForm.prompt,
              "onUpdate:modelValue": i[1] || (i[1] = e => t.agentAutomationForm.prompt = e),
              label: e.$t("agentAutomationControl.prompts.label"),
              placeholder: e.$t("agentAutomationControl.prompts.placeholder"),
              tip: e.$t("agentAutomationControl.prompts.tip")
            }, null, 8, ["modelValue", "label", "placeholder", "tip"]), bs(yp, {
              ref_key: "characterControl",
              ref: P,
              settings: t.settings,
              prompts: m.value
            }, null, 8, ["settings", "prompts"]), ps("div", hT, [ps("div", vT, [i[6] || (i[6] = ps(
              "i", {
                class: "pi pi-user text-primary text-sm"
              }, null, -1)), ps("div", yT, [ps("label", kT, In(e.$t(
              "agentAutomationControl.autoAddCharacterImages.label")), 1), ps("p", xT,
              In(e.$t("agentAutomationControl.autoAddCharacterImages.description")), 1)])]), bs(
              d, {
                modelValue: t.settings.autoAddCharacterImages,
                "onUpdate:modelValue": i[2] || (i[2] = e => t.settings.autoAddCharacterImages =
                  e)
              }, null, 8, ["modelValue"])]), bs(Fp, {
              ref_key: "voiceControl",
              ref: A,
              settings: t.settings,
              prompts: m.value
            }, null, 8, ["settings", "prompts"]), bs(jb, {
              prompts: ni(r)(t.agentAutomationForm.prompt),
              "default-prompt-option": t.settings.defaultVideoOption,
              label: e.$t("common.videoModeControl.label"),
              tip: e.$t("common.videoModeControl.tip"),
              "concat-label": e.$t("common.videoModeControl.concatLabel"),
              "get-prompt-option": ni(s),
              "set-prompt-option": ni(l),
              "get-options-for-prompt": ni(c),
              "images-per-prompt": ni(w),
              "show-row-warning": e => !(!t.settings.autoAddCharacterImages || ni(k)(e) || ni(C)(
                e)),
              "row-warning-text": e.$t("agentAutomationControl.autoAddCharacterImages.noMatch"),
              "get-row-badge": E,
              "get-extra-row-badges": O
            }, null, 8, ["prompts", "default-prompt-option", "label", "tip", "concat-label",
              "get-prompt-option", "set-prompt-option", "get-options-for-prompt",
              "images-per-prompt", "show-row-warning", "row-warning-text"
            ])])]), ps("div", wT, [bs(rb, {
              settings: t.settings,
              "has-concat": x.value,
              "max-count": 4
            }, null, 8, ["settings", "has-concat"]), bs(ub, {
              settings: t.settings
            }, null, 8, ["settings"])]), ps("div", CT, [ps("p", ST, In(e.$t(
              "agentAutomationControl.advancedHint")), 1), bs(mb, {
              settings: t.settings
            }, null, 8, ["settings"])]), g.value > 0 && !ni(S) && !t.settings.autoAddCharacterImages && !I
            .value ? (ns(), rs("div", TT, [ps("p", IT, [i[7] || (i[7] = ps("i", {
              class: "pi pi-exclamation-triangle text-danger"
            }, null, -1)), ps("span", null, In(e.$t(
            "agentAutomationControl.validation.noImages", {
              prompts: ni(T).map(t => t + 1).join(", "),
              count: ni(T).length
            })), 1)])])) : fs("", !0), ps("div", AT, [t.settings.autoAddCharacterImages ? (ns(), rs("div",
              ET,
              [i[8] || (i[8] = ps("i", {
                  class: "pi pi-info-circle"
                }, null, -1)), ps("span", null, In(e.$t("common.warnings.autoAddCharacterActive")),
                1)])) : fs("", !0), t.settings.autoAddVoiceBySpeaker ? (ns(), rs("div", PT, [i[9] || (i[
              9] = ps("i", {
              class: "pi pi-microphone"
            }, null, -1)), ps("span", null, In(e.$t("common.warnings.autoAddVoiceActive")), 1)])) : fs(
              "", !0), bs(eb, {
              "prompt-groups": n.promptGroups
            }, null, 8, ["prompt-groups"]), ps("div", OT, [ps("div", MT, [bs(p, {
              label: e.$t("common.reportBug"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-flag",
              outlined: "",
              onClick: i[3] || (i[3] = t => _.value = !0)
            }, null, 8, ["label"]), bs(p, {
              label: e.$t("common.clearCache"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-database",
              "icon-pos": "left",
              outlined: "",
              loading: t.isClearingCache,
              disabled: t.isClearingCache,
              onClick: i[4] || (i[4] = t => o("clear-cache"))
            }, null, 8, ["label", "loading", "disabled"]), bs(p, {
              label: e.$t("agentAutomationControl.buttons.clear"),
              severity: "secondary",
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-refresh",
              outlined: "",
              onClick: L
            }, null, 8, ["label"])]), ni(f) ? (ns(), ss(p, {
              key: 0,
              label: e.$t("common.upgradeMax"),
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: "pi pi-crown",
              severity: "warning",
              onClick: ni(h)
            }, null, 8, ["label", "onClick"])) : (ns(), ss(p, {
              key: 1,
              label: ni(u) ? e.$t("agentAutomationControl.buttons.sending") : e.$t(
                "agentAutomationControl.buttons.run"),
              class: "w-full text-xs sm:text-sm",
              size: "small",
              icon: ni(u) ? "pi pi-spin pi-spinner" : "pi pi-play",
              disabled: ni(u) || b.value || 0 === g.value || !t.settings
                .autoAddCharacterImages && !I.value && a.value.length > 0 && !ni(S),
              loading: ni(u),
              onClick: M
            }, null, 8, ["label", "icon", "disabled", "loading"]))])])
          ]), bs(ep, {
            visible: _.value,
            "onUpdate:visible": i[5] || (i[5] = t => _.value = t)
          }, null, 8, ["visible"])], 64)
        }
      }
    }),
    _T = {
      class: "space-y-2"
    },
    BT = {
      class: "space-y-1 mt-2"
    },
    FT = {
      class: "grid grid-cols-3 gap-1"
    },
    RT = {
      class: "grid grid-cols-3 gap-1"
    },
    DT = {
      key: 0,
      class: "mt-3 p-2 bg-blue-50 rounded border border-blue-200"
    },
    VT = {
      class: "flex items-center gap-2 mb-2"
    },
    NT = {
      class: "text-xs font-medium text-blue-800"
    },
    $T = {
      class: "space-y-1"
    },
    zT = {
      class: "flex gap-2 mt-2"
    },
    UT = {
      class: "flex-1 rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    jT = {
      class: "flex items-center gap-2 mb-2"
    },
    HT = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    GT = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    KT = {
      class: "flex-1 rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    WT = {
      class: "flex items-center gap-2 mb-2"
    },
    qT = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    YT = {
      class: "flex items-center gap-2"
    },
    XT = {
      class: "flex-1"
    },
    JT = {
      class: "flex-1"
    },
    ZT = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    QT = ca({
      __name: "index",
      props: {
        selectedMode: {},
        textToVideoForm: {},
        imageToVideoForm: {},
        componentsToVideoForm: {},
        textToImageForm: {},
        imageToImageForm: {},
        agentAutomationForm: {},
        isProcessingJob: {
          type: Boolean
        },
        modeLabel: {},
        activePrompts: {},
        settings: {},
        promptGroups: {}
      },
      emits: ["update:selected-mode", "clear"],
      setup(t, {
        emit: e
      }) {
        const n = e,
          {
            t: o
          } = Tc(),
          i = jc(),
          a = Zo(!1),
          r = async () => {
            if (a.value) return;
            const [t] = await chrome.tabs.query({
              active: !0,
              currentWindow: !0
            });
            if (t?.id && t.url?.includes("labs.google")) {
              a.value = !0;
              try {
                const e = await new Promise((e, n) => {
                  chrome.runtime.sendMessage({
                    type: "CS",
                    tabId: t.id
                  }, t => {
                    chrome.runtime.lastError ? n(new Error(chrome.runtime.lastError.message)) : e(t)
                  })
                });
                if (!e?.success) throw new Error(e?.error ?? "Clear cache failed");
                await chrome.tabs.reload(t.id)
              } catch (aD) {
                const e = aD instanceof Error ? aD.message : String(aD);
                i.add({
                  severity: "error",
                  summary: o("common.errors.clearCacheFailed"),
                  detail: e,
                  life: 8e3
                })
              } finally {
                a.value = !1
              }
            } else i.add({
              severity: "warn",
              summary: o("common.clearCache"),
              detail: o("common.errors.clearCacheNeedFlowTab"),
              life: 6e3
            })
          }, s = Ds(() => [{
            label: o("settingsTab.concurrentPrompts.option1", {
              count: 1
            }),
            value: 1
          }, {
            label: o("settingsTab.concurrentPrompts.option2", {
              count: 2
            }),
            value: 2
          }, {
            label: o("settingsTab.concurrentPrompts.option3", {
              count: 3
            }),
            value: 3
          }, {
            label: o("settingsTab.concurrentPrompts.option4", {
              count: 4
            }),
            value: 4
          }, {
            label: o("settingsTab.concurrentPrompts.option5", {
              count: 5
            }),
            value: 5
          }, {
            label: o("settingsTab.concurrentPrompts.option6", {
              count: 6
            }),
            value: 6
          }]), l = Zo(!1);
        return (e, o) => {
          const i = _a("PButton"),
            c = _a("PSelect"),
            d = _a("PInputNumber");
          return ns(), rs("div", _T, [ps("div", BT, [ps("div", FT, [bs(i, {
              label: e.$t("controlTab.modeButtons.textToVideo"),
              severity: "textToVideo" === t.selectedMode ? "primary" : "secondary",
              outlined: "textToVideo" !== t.selectedMode,
              class: "flex-1 px-0",
              size: "small",
              icon: "pi pi-file-edit",
              onClick: o[0] || (o[0] = t => n("update:selected-mode", "textToVideo"))
            }, null, 8, ["label", "severity", "outlined"]), bs(i, {
              label: e.$t("controlTab.modeButtons.imageToVideo"),
              severity: "imageToVideo" === t.selectedMode ? "primary" : "secondary",
              outlined: "imageToVideo" !== t.selectedMode,
              class: "flex-1 px-0",
              size: "small",
              icon: "pi pi-image",
              onClick: o[1] || (o[1] = t => n("update:selected-mode", "imageToVideo"))
            }, null, 8, ["label", "severity", "outlined"]), bs(i, {
              label: e.$t("controlTab.modeButtons.componentsToVideo"),
              severity: "componentsToVideo" === t.selectedMode ? "primary" : "secondary",
              outlined: "componentsToVideo" !== t.selectedMode,
              class: "flex-1 px-0",
              size: "small",
              icon: "pi pi-th-large",
              onClick: o[2] || (o[2] = t => n("update:selected-mode", "componentsToVideo"))
            }, null, 8, ["label", "severity", "outlined"])]), ps("div", RT, [bs(i, {
              label: e.$t("controlTab.modeButtons.textToImage"),
              severity: "textToImage" === t.selectedMode ? "primary" : "secondary",
              outlined: "textToImage" !== t.selectedMode,
              class: "flex-1 px-0",
              size: "small",
              icon: "pi pi-star",
              onClick: o[3] || (o[3] = t => n("update:selected-mode", "textToImage"))
            }, null, 8, ["label", "severity", "outlined"]), bs(i, {
              label: e.$t("controlTab.modeButtons.imageToImage"),
              severity: "imageToImage" === t.selectedMode ? "primary" : "secondary",
              outlined: "imageToImage" !== t.selectedMode,
              class: "flex-1 px-0",
              size: "small",
              icon: "pi pi-images",
              onClick: o[4] || (o[4] = t => n("update:selected-mode", "imageToImage"))
            }, null, 8, ["label", "severity", "outlined"]), bs(i, {
              label: e.$t("controlTab.modeButtons.agentAutomation"),
              severity: "agentAutomation" === t.selectedMode ? "primary" : "secondary",
              outlined: "agentAutomation" !== t.selectedMode,
              class: "flex-1 px-0",
              size: "small",
              icon: "pi pi-sparkles",
              onClick: o[5] || (o[5] = t => n("update:selected-mode", "agentAutomation"))
            }, null, 8, ["label", "severity", "outlined"])])]), t.isProcessingJob && t.activePrompts.length >
            0 ? (ns(), rs("div", DT, [ps("div", VT, [o[21] || (o[21] = ps("i", {
              class: "pi pi-list text-xs text-blue-600"
            }, null, -1)), ps("span", NT, In(e.$t("controlTab.activePrompts.title")), 1)]), ps("div", $T,
              [(ns(!0), rs(Xr, null, Na(t.activePrompts, (t, e) => (ns(), rs("div", {
                  key: e,
                  class: "text-xs text-blue-700 p-1 bg-blue-100 rounded"
                }, In(e + 1) + ". " + In(t.substring(0, 60)) + In(t.length > 60 ? "..." : ""),
                1))), 128))])])) : fs("", !0), ps("div", zT, [ps("div", UT, [ps("div", jT, [o[22] || (o[22] =
              ps("i", {
                class: "pi pi-bolt text-primary text-sm"
              }, null, -1)), ps("label", HT, In(e.$t("settingsTab.concurrentPrompts.label")), 1)]), bs(
              c, {
                "model-value": l.value || "agentAutomation" === t.selectedMode ? 1 : t.settings
                  .concurrentPrompts,
                options: s.value,
                "option-label": "label",
                "option-value": "value",
                class: "w-full",
                disabled: l.value || "agentAutomation" === t.selectedMode,
                "onUpdate:modelValue": o[6] || (o[6] = e => {
                  l.value || "agentAutomation" === t.selectedMode || (t.settings.concurrentPrompts =
                    e)
                })
              }, null, 8, ["model-value", "options", "disabled"]), ps("p", GT, In(e.$t(
              "settingsTab.concurrentPrompts.description")), 1)]), ps("div", KT, [ps("div", WT, [o[23] || (
              o[23] = ps("i", {
                class: "pi pi-clock text-primary text-sm"
              }, null, -1)), ps("label", qT, In(e.$t("settingsTab.promptDelay.label")), 1)]), ps("div",
              YT,
              [ps("div", XT, [bs(d, {
                "model-value": t.settings.promptDelaySecondsMin,
                min: 0,
                max: 300,
                step: 1,
                "button-layout": "horizontal",
                "input-class": "w-full",
                class: "w-full",
                "onUpdate:modelValue": o[7] || (o[7] = e => {
                  t.settings.promptDelaySecondsMin = Math.min(e, t.settings
                    .promptDelaySecondsMax)
                })
              }, null, 8, ["model-value"])]), o[24] || (o[24] = ps("i", {
                class: "pi pi-arrow-right-arrow-left text-muted-foreground text-xs shrink-0"
              }, null, -1)), ps("div", JT, [bs(d, {
                "model-value": t.settings.promptDelaySecondsMax,
                min: 0,
                max: 300,
                step: 1,
                "button-layout": "horizontal",
                "input-class": "w-full",
                class: "w-full",
                "onUpdate:modelValue": o[8] || (o[8] = e => {
                  t.settings.promptDelaySecondsMax = Math.max(e, t.settings
                    .promptDelaySecondsMin)
                })
              }, null, 8, ["model-value"])])]), ps("p", ZT, In(e.$t(
              "settingsTab.promptDelay.description")), 1)])]), "textToVideo" === t.selectedMode ? (ns(), ss(
            $C, {
              key: 1,
              "text-to-video-form": t.textToVideoForm,
              "is-processing-job": t.isProcessingJob,
              settings: t.settings,
              "prompt-groups": t.promptGroups,
              "is-clearing-cache": a.value,
              onClear: o[9] || (o[9] = t => n("clear")),
              onClearCache: r,
              "onUpdate:hasConcat": o[10] || (o[10] = t => l.value = t)
            }, null, 8, ["text-to-video-form", "is-processing-job", "settings", "prompt-groups",
              "is-clearing-cache"
            ])) : fs("", !0), "imageToVideo" === t.selectedMode ? (ns(), ss(yS, {
              key: 2,
              "image-to-video-form": t.imageToVideoForm,
              "is-processing-job": t.isProcessingJob,
              settings: t.settings,
              "prompt-groups": t.promptGroups,
              "is-clearing-cache": a.value,
              onClear: o[11] || (o[11] = t => n("clear")),
              onClearCache: r,
              "onUpdate:hasConcat": o[12] || (o[12] = t => l.value = t)
            }, null, 8, ["image-to-video-form", "is-processing-job", "settings", "prompt-groups",
              "is-clearing-cache"
            ])) : fs("", !0), "componentsToVideo" === t.selectedMode ? (ns(), ss(VS, {
              key: 3,
              "components-to-video-form": t.componentsToVideoForm,
              "is-processing-job": t.isProcessingJob,
              settings: t.settings,
              "prompt-groups": t.promptGroups,
              "is-clearing-cache": a.value,
              onClear: o[13] || (o[13] = t => n("clear")),
              onClearCache: r,
              "onUpdate:hasConcat": o[14] || (o[14] = t => l.value = t)
            }, null, 8, ["components-to-video-form", "is-processing-job", "settings", "prompt-groups",
              "is-clearing-cache"
            ])) : fs("", !0), "textToImage" === t.selectedMode ? (ns(), ss(qS, {
              key: 4,
              "text-to-image-form": t.textToImageForm,
              "is-processing-job": t.isProcessingJob,
              settings: t.settings,
              "prompt-groups": t.promptGroups,
              "is-clearing-cache": a.value,
              onClear: o[15] || (o[15] = t => n("clear")),
              onClearCache: r,
              "onUpdate:hasConcat": o[16] || (o[16] = t => l.value = t)
            }, null, 8, ["text-to-image-form", "is-processing-job", "settings", "prompt-groups",
              "is-clearing-cache"
            ])) : fs("", !0), "imageToImage" === t.selectedMode ? (ns(), ss(bT, {
              key: 5,
              "image-to-image-form": t.imageToImageForm,
              "is-processing-job": t.isProcessingJob,
              settings: t.settings,
              "prompt-groups": t.promptGroups,
              "is-clearing-cache": a.value,
              onClear: o[17] || (o[17] = t => n("clear")),
              onClearCache: r,
              "onUpdate:hasConcat": o[18] || (o[18] = t => l.value = t)
            }, null, 8, ["image-to-image-form", "is-processing-job", "settings", "prompt-groups",
              "is-clearing-cache"
            ])) : fs("", !0), "agentAutomation" === t.selectedMode ? (ns(), ss(LT, {
              key: 6,
              "agent-automation-form": t.agentAutomationForm,
              "is-processing-job": t.isProcessingJob,
              settings: t.settings,
              "prompt-groups": t.promptGroups,
              "is-clearing-cache": a.value,
              onClear: o[19] || (o[19] = t => n("clear")),
              onClearCache: r,
              "onUpdate:hasConcat": o[20] || (o[20] = t => l.value = t)
            }, null, 8, ["agent-automation-form", "is-processing-job", "settings", "prompt-groups",
              "is-clearing-cache"
            ])) : fs("", !0)
          ])
        }
      }
    });
  var tI = Symbol();
  const eI = {
      class: "space-y-3 py-2"
    },
    nI = {
      class: "space-y-2"
    },
    oI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    iI = {
      class: "flex items-center gap-2 mb-2"
    },
    aI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    rI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    sI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    lI = {
      class: "flex items-center gap-2 mb-2"
    },
    cI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    dI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    uI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    pI = {
      class: "flex items-center gap-2 mb-2"
    },
    bI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    mI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    gI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    fI = {
      class: "flex items-center gap-2 mb-2"
    },
    hI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    vI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    yI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    kI = {
      class: "flex items-center gap-2 mb-2"
    },
    xI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    wI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    CI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    SI = {
      class: "flex items-center gap-2 mb-2"
    },
    TI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    II = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    AI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    EI = {
      class: "flex items-center gap-2 mb-2"
    },
    PI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    OI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    MI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    LI = {
      class: "flex items-center gap-2 mb-2"
    },
    _I = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    BI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    FI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    RI = {
      class: "flex items-center gap-2 mb-2"
    },
    DI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    VI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    NI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    $I = {
      class: "flex items-center gap-2 mb-2"
    },
    zI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    UI = {
      class: "mt-1.5 text-xs text-muted-foreground"
    },
    jI = {
      class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
    },
    HI = {
      class: "flex items-center justify-between"
    },
    GI = {
      class: "flex items-center gap-2"
    },
    KI = {
      class: "text-xs sm:text-sm font-semibold text-foreground"
    },
    WI = {
      class: "text-xs text-muted-foreground"
    },
    qI = {
      class: "rounded-lg border border-border/60 bg-muted/5 p-2 sm:p-3 flex gap-2 justify-end flex-wrap"
    },
    YI = {
      class: "rounded-md border border-dashed border-border/40 bg-muted/20 px-2 py-2 sm:px-3"
    },
    XI = {
      class: "text-xs text-muted-foreground flex items-center gap-2 flex-wrap"
    },
    JI = ca({
      __name: "index",
      props: {
        settings: {},
        isSavingSettings: {
          type: Boolean
        }
      },
      emits: ["save-settings", "reset-settings", "open-download-config"],
      setup(t, {
        emit: e
      }) {
        const n = e,
          o = function() {
            var t = ur(tI);
            if (!t) throw new Error("No PrimeVue Confirmation provided!");
            return t
          }(),
          {
            t: i
          } = Tc(),
          a = Lc("user-locale", _c),
          r = Ds(() => [{
            label: i("settingsTab.language.english"),
            value: "en"
          }, {
            label: i("settingsTab.language.vietnamese"),
            value: "vi"
          }, {
            label: i("settingsTab.language.chinese"),
            value: "zh"
          }, {
            label: i("settingsTab.language.korean"),
            value: "ko"
          }, {
            label: i("settingsTab.language.spanish"),
            value: "es"
          }, {
            label: i("settingsTab.language.japanese"),
            value: "ja"
          }, {
            label: i("settingsTab.language.portuguese"),
            value: "pt"
          }, {
            label: i("settingsTab.language.hindi"),
            value: "hi"
          }, {
            label: i("settingsTab.language.urdu"),
            value: "ur"
          }, {
            label: i("settingsTab.language.turkish"),
            value: "tr"
          }, {
            label: i("settingsTab.language.arabic"),
            value: "ar"
          }, {
            label: i("settingsTab.language.german"),
            value: "de"
          }, {
            label: i("settingsTab.language.french"),
            value: "fr"
          }, {
            label: i("settingsTab.language.indonesian"),
            value: "id"
          }, {
            label: i("settingsTab.language.italian"),
            value: "it"
          }, {
            label: i("settingsTab.language.russian"),
            value: "ru"
          }, {
            label: i("settingsTab.language.dutch"),
            value: "nl"
          }, {
            label: i("settingsTab.language.thai"),
            value: "th"
          }, {
            label: i("settingsTab.language.bengali"),
            value: "bn"
          }, {
            label: i("settingsTab.language.filipino"),
            value: "tl"
          }]),
          s = Ds(() => [{
            label: i("sidePanel.modeOptions.textToVideo.label"),
            value: "textToVideo"
          }, {
            label: i("sidePanel.modeOptions.imageToVideo.label"),
            value: "imageToVideo"
          }, {
            label: i("sidePanel.modeOptions.componentsToVideo.label"),
            value: "componentsToVideo"
          }, {
            label: i("sidePanel.modeOptions.textToImage.label"),
            value: "textToImage"
          }, {
            label: i("sidePanel.modeOptions.imageToImage.label"),
            value: "imageToImage"
          }, {
            label: i("sidePanel.modeOptions.agentAutomation.label"),
            value: "agentAutomation"
          }]),
          l = Ds(() => [{
            label: i("sidePanel.aspectRatioOptions.youtube"),
            value: "16:9"
          }, {
            label: i("sidePanel.aspectRatioOptions.shortsReels"),
            value: "9:16"
          }, {
            label: i("sidePanel.aspectRatioOptions.square"),
            value: "square"
          }, {
            label: i("sidePanel.aspectRatioOptions.portrait"),
            value: "portrait"
          }, {
            label: i("sidePanel.aspectRatioOptions.landscape"),
            value: "landscape"
          }]),
          c = [{
            label: "Veo 3.1 - Lite",
            value: "Veo 3.1 - Lite"
          }, {
            label: "Veo 3.1 - Lite [Lower Priority]",
            value: "Veo 3.1 - Lite [Lower Priority]"
          }, {
            label: "Veo 3.1 - Fast",
            value: "Veo 3.1 - Fast"
          }, {
            label: "Veo 3.1 - Quality",
            value: "Veo 3.1 - Quality"
          }, {
            label: "Omni Flash (Pro,Ultra plan required)",
            value: "Omni Flash"
          }],
          d = Ds(() => [{
            label: "🍌 Nano Banana Pro",
            value: "🍌 Nano Banana Pro"
          }, {
            label: "🍌 Nano Banana 2",
            value: "🍌 Nano Banana 2"
          }, {
            label: "Imagen 4",
            value: "Imagen 4"
          }]),
          u = Ds(() => [{
            label: i("settingsTab.defaultVideoOption.option4s"),
            value: "4s"
          }, {
            label: i("settingsTab.defaultVideoOption.option6s"),
            value: "6s"
          }, {
            label: i("settingsTab.defaultVideoOption.option8s"),
            value: "8s"
          }, {
            label: i("settingsTab.defaultVideoOption.option10s"),
            value: "10s"
          }, {
            label: i("settingsTab.defaultVideoOption.option4sConcat"),
            value: "4s-concat"
          }, {
            label: i("settingsTab.defaultVideoOption.option6sConcat"),
            value: "6s-concat"
          }, {
            label: i("settingsTab.defaultVideoOption.option8sConcat"),
            value: "8s-concat"
          }, {
            label: i("settingsTab.defaultVideoOption.option10sConcat"),
            value: "10s-concat"
          }]),
          p = Ds(() => [{
            label: i("settingsTab.defaultImageOption.optionNewImage"),
            value: "new-image"
          }, {
            label: i("settingsTab.defaultImageOption.optionConcat"),
            value: "new-image-concat"
          }]),
          b = Ds(() => [{
            label: i("settingsTab.autoDownloadVideoQuality.optionNoDownload"),
            value: "no-download"
          }, {
            label: i("settingsTab.autoDownloadVideoQuality.option720"),
            value: "720"
          }, {
            label: i("settingsTab.autoDownloadVideoQuality.option1080"),
            value: "1080"
          }, {
            label: i("settingsTab.autoDownloadVideoQuality.option4k"),
            value: "4k"
          }]),
          m = Ds(() => [{
            label: i("settingsTab.autoDownloadImageQuality.optionNoDownload"),
            value: "no-download"
          }, {
            label: i("settingsTab.autoDownloadImageQuality.option1k"),
            value: "1k"
          }, {
            label: i("settingsTab.autoDownloadImageQuality.option2k"),
            value: "2k"
          }, {
            label: i("settingsTab.autoDownloadImageQuality.option4k"),
            value: "4k"
          }]),
          g = () => {
            o.require({
              message: i("settingsTab.confirmReset.message"),
              header: i("settingsTab.confirmReset.header"),
              icon: "pi pi-exclamation-triangle",
              acceptLabel: i("settingsTab.confirmReset.acceptLabel"),
              rejectLabel: i("settingsTab.confirmReset.rejectLabel"),
              acceptClass: "p-button-danger",
              rejectClass: "p-button-secondary p-button-outlined",
              accept: () => {
                n("reset-settings")
              }
            })
          },
          f = () => {
            n("save-settings")
          },
          h = () => {
            n("open-download-config")
          };
        return (e, n) => {
          const o = _a("PSelect"),
            i = _a("PInputNumber"),
            v = _a("PButton"),
            w = _a("PInputSwitch"),
            y = Ra("tooltip");
          return ns(), rs("div", eI, [ps("div", nI, [ps("div", oI, [ps("div", iI, [n[10] || (n[10] = ps("i", {
            class: "pi pi-sliders-h text-primary text-sm"
          }, null, -1)), ps("label", aI, In(e.$t("settingsTab.defaultMode.label")), 1)]), bs(o, {
            modelValue: t.settings.defaultMode,
            "onUpdate:modelValue": n[0] || (n[0] = e => t.settings.defaultMode = e),
            options: s.value,
            "option-label": "label",
            "option-value": "value",
            class: "w-full"
          }, null, 8, ["modelValue", "options"]), ps("p", rI, In(e.$t(
            "settingsTab.defaultMode.description")), 1)]), ps("div", sI, [ps("div", lI, [n[11] || (n[11] =
            ps("i", {
              class: "pi pi-cog text-primary text-sm"
            }, null, -1)), ps("label", cI, In(e.$t("settingsTab.model.label")), 1)]), bs(o, {
            modelValue: t.settings.model,
            "onUpdate:modelValue": n[1] || (n[1] = e => t.settings.model = e),
            options: c,
            "option-label": "label",
            "option-value": "value",
            class: "w-full"
          }, null, 8, ["modelValue"]), ps("p", dI, In(e.$t("settingsTab.model.description")), 1)]), ps(
            "div", uI, [ps("div", pI, [n[12] || (n[12] = ps("i", {
              class: "pi pi-cog text-primary text-sm"
            }, null, -1)), ps("label", bI, In(e.$t("settingsTab.imageModel.label")), 1)]), bs(o, {
              modelValue: t.settings.imageModel,
              "onUpdate:modelValue": n[2] || (n[2] = e => t.settings.imageModel = e),
              options: d.value,
              "option-label": "label",
              "option-value": "value",
              class: "w-full"
            }, null, 8, ["modelValue", "options"]), ps("p", mI, In(e.$t(
              "settingsTab.imageModel.description")), 1)]), ps("div", gI, [ps("div", fI, [n[13] || (n[
            13] = ps("i", {
              class: "pi pi-image text-primary text-sm"
            }, null, -1)), ps("label", hI, In(e.$t("settingsTab.aspectRatio.label")), 1)]), bs(o, {
            modelValue: t.settings.aspectRatio,
            "onUpdate:modelValue": n[3] || (n[3] = e => t.settings.aspectRatio = e),
            options: l.value,
            "option-label": "label",
            "option-value": "value",
            class: "w-full"
          }, null, 8, ["modelValue", "options"]), ps("p", vI, In(e.$t(
            "settingsTab.aspectRatio.description")), 1)]), ps("div", yI, [ps("div", kI, [n[14] || (n[14] =
            ps("i", {
              class: "pi pi-video text-primary text-sm"
            }, null, -1)), ps("label", xI, In(e.$t("settingsTab.defaultVideoOption.label")), 1)]), bs(
            o, {
              modelValue: t.settings.defaultVideoOption,
              "onUpdate:modelValue": n[4] || (n[4] = e => t.settings.defaultVideoOption = e),
              options: u.value,
              "option-label": "label",
              "option-value": "value",
              class: "w-full"
            }, null, 8, ["modelValue", "options"]), ps("p", wI, In(e.$t(
            "settingsTab.defaultVideoOption.description")), 1)]), ps("div", CI, [ps("div", SI, [n[15] || (
            n[15] = ps("i", {
              class: "pi pi-image text-primary text-sm"
            }, null, -1)), ps("label", TI, In(e.$t("settingsTab.defaultImageOption.label")), 1)]), bs(
            o, {
              modelValue: t.settings.defaultImageOption,
              "onUpdate:modelValue": n[5] || (n[5] = e => t.settings.defaultImageOption = e),
              options: p.value,
              "option-label": "label",
              "option-value": "value",
              class: "w-full"
            }, null, 8, ["modelValue", "options"]), ps("p", II, In(e.$t(
            "settingsTab.defaultImageOption.description")), 1)]), ps("div", AI, [ps("div", EI, [n[16] || (
            n[16] = ps("i", {
              class: "pi pi-replay text-primary text-sm"
            }, null, -1)), ps("label", PI, In(e.$t("settingsTab.maxRetries.label")), 1)]), bs(i, {
            modelValue: t.settings.maxRetries,
            "onUpdate:modelValue": n[6] || (n[6] = e => t.settings.maxRetries = e),
            min: 1,
            max: 20,
            "show-buttons": "",
            "button-layout": "horizontal",
            step: 1,
            class: "w-full",
            "input-class": "text-center"
          }, {
            decrementbuttonicon: Bi(() => [...n[17] || (n[17] = [ps("i", {
              class: "pi pi-minus"
            }, null, -1)])]),
            incrementbuttonicon: Bi(() => [...n[18] || (n[18] = [ps("i", {
              class: "pi pi-plus"
            }, null, -1)])]),
            _: 1
          }, 8, ["modelValue"]), ps("p", OI, In(e.$t("settingsTab.maxRetries.description")), 1)]), ps(
            "div", MI, [ps("div", LI, [n[19] || (n[19] = ps("i", {
                class: "pi pi-download text-primary text-sm"
              }, null, -1)), ps("label", _I, In(e.$t("settingsTab.autoDownloadVideoQuality.label")),
                1)]),
              bs(o, {
                modelValue: t.settings.autoDownloadVideoQuality,
                "onUpdate:modelValue": n[7] || (n[7] = e => t.settings.autoDownloadVideoQuality = e),
                options: b.value,
                "option-label": "label",
                "option-value": "value",
                class: "w-full"
              }, null, 8, ["modelValue", "options"]), ps("p", BI, In(e.$t(
                "settingsTab.autoDownloadVideoQuality.description")), 1)
            ]), ps("div", FI, [ps("div", RI, [n[20] || (n[20] = ps("i", {
              class: "pi pi-download text-primary text-sm"
            }, null, -1)), ps("label", DI, In(e.$t("settingsTab.autoDownloadImageQuality.label")),
              1)]),
            bs(o, {
              modelValue: t.settings.autoDownloadImageQuality,
              "onUpdate:modelValue": n[8] || (n[8] = e => t.settings.autoDownloadImageQuality = e),
              options: m.value,
              "option-label": "label",
              "option-value": "value",
              class: "w-full"
            }, null, 8, ["modelValue", "options"]), ps("p", VI, In(e.$t(
              "settingsTab.autoDownloadImageQuality.description")), 1)
          ]), ps("div", NI, [ps("div", $I, [n[21] || (n[21] = ps("i", {
            class: "pi pi-language text-primary text-sm"
          }, null, -1)), ps("label", zI, In(e.$t("settingsTab.language.label")), 1)]), bs(o, {
            modelValue: ni(a).data,
            "onUpdate:modelValue": n[9] || (n[9] = t => ni(a).data = t),
            options: r.value,
            "option-label": "label",
            "option-value": "value",
            class: "w-full"
          }, null, 8, ["modelValue", "options"]), ps("p", UI, In(e.$t(
            "settingsTab.language.description")), 1)]), UI_CONFIG.showUnusualActivityTipInSettings ? (
          ns(), rs("div", {
              key: 0,
              class: "rounded-lg border border-border/70 bg-gradient-to-br from-background to-muted/10 p-2 sm:p-3"
            }, [ps("div", {
              class: "flex items-center justify-between gap-3 mb-2"
            }, [ps("div", {
              class: "flex items-center gap-2"
            }, [n[24] || (n[24] = ps("i", {
              class: "pi pi-info-circle text-primary text-sm"
            }, null, -1)), ps("label", {
              class: "text-xs sm:text-sm font-semibold text-foreground"
            }, In(e.$t("settingsTab.showUnusualActivityTip.label")), 1)]), bs(w, {
              modelValue: t.settings.showUnusualActivityTip,
              "onUpdate:modelValue": n[25] || (n[25] = e => t.settings.showUnusualActivityTip =
                e),
              disabled: !UI_CONFIG.enableUnusualActivityTip
            }, null, 8, ["modelValue", "disabled"])]), ps("p", {
              class: "mt-1.5 text-xs text-muted-foreground"
            }, In(e.$t("settingsTab.showUnusualActivityTip.description")), 1)])) : fs("", !0), ps("div",
            jI, [ps("div", HI, [ps("div", GI, [n[22] || (n[22] = ps("i", {
              class: "pi pi-download text-primary text-sm"
            }, null, -1)), ps("div", null, [ps("label", KI, In(e.$t(
              "settingsTab.downloadSettings.label")), 1), ps("p", WI, In(e.$t(
              "settingsTab.downloadSettings.description")), 1)])]), Fi(bs(v, {
              icon: "pi pi-cog",
              severity: "secondary",
              outlined: "",
              size: "small",
              onClick: h
            }, null, 512), [
              [y, "Open download settings"]
            ])])])]), ps("div", qI, [bs(v, {
            label: e.$t("settingsTab.buttons.resetDefaults"),
            icon: "pi pi-refresh",
            severity: "secondary",
            outlined: "",
            size: "small",
            class: "text-xs",
            onClick: g
          }, null, 8, ["label"]), bs(v, {
            label: e.$t("settingsTab.buttons.saveSettings"),
            icon: "pi pi-check",
            size: "small",
            class: "text-xs",
            loading: t.isSavingSettings,
            disabled: t.isSavingSettings,
            onClick: f
          }, null, 8, ["label", "loading", "disabled"])]), ps("div", YI, [ps("p", XI, [n[23] || (n[23] = ps(
            "i", {
              class: "pi pi-info-circle text-primary text-xs"
            }, null, -1)), ps("span", null, In(e.$t("settingsTab.infoMessage")), 1)])])])
        }
      }
    }),
    ZI = {
      class: "flex flex-col gap-2 pt-2"
    },
    QI = {
      class: "flex items-center justify-between"
    },
    tA = {
      class: "text-xs text-muted-foreground"
    },
    eA = {
      class: "flex items-center gap-3"
    },
    nA = {
      class: "flex items-center gap-2"
    },
    oA = {
      class: "text-xs text-muted-foreground select-none"
    },
    iA = {
      key: 0,
      class: "text-muted-foreground text-center py-10 text-xs"
    },
    aA = {
      class: "text-muted-foreground/60 shrink-0 tabular-nums pt-0.5"
    },
    rA = {
      class: "break-all whitespace-pre-wrap text-foreground/90 pt-0.5"
    },
    sA = ca({
      __name: "index",
      setup(t) {
        const {
          t: e
        } = Tc(), {
          entries: n,
          clearLog: o
        } = Hu(), i = Zo(!1), a = async () => {
          const t = n.value.map(t => `[${d(t.timestamp)}] [${t.level.toUpperCase()}] ${t.message}`).join("\n");
          await navigator.clipboard.writeText(t), i.value = !0, setTimeout(() => i.value = !1, 2e3)
        }, r = Zo(null), s = Zo(!0), l = () => {
          s.value && r.value && (r.value.scrollTop = r.value.scrollHeight)
        };
        Rr(n, () => {
          Si(l)
        }, {
          deep: !0
        });
        const c = t => "error" === t ? "pi pi-times-circle" : "warn" === t ? "pi pi-exclamation-triangle" :
          "pi pi-info-circle",
          d = t => new Date(t).toLocaleTimeString("en-US", {
            hour12: !1,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
        return (t, l) => {
          const u = _a("PInputSwitch"),
            p = _a("PButton"),
            b = _a("PTag");
          return ns(), rs("div", ZI, [ps("div", QI, [ps("span", tA, In(ni(e)("debugLogs.entries", {
            count: ni(n).length
          })), 1), ps("div", eA, [ps("div", nA, [ps("label", oA, In(ni(e)("debugLogs.autoScroll")), 1),
            bs(u, {
              modelValue: s.value,
              "onUpdate:modelValue": l[0] || (l[0] = t => s.value = t),
              size: "small"
            }, null, 8, ["modelValue"])
          ]), bs(p, {
            size: "small",
            severity: "secondary",
            text: "",
            icon: i.value ? "pi pi-check" : "pi pi-copy",
            label: i.value ? ni(e)("debugLogs.copied") : ni(e)("debugLogs.copy"),
            disabled: 0 === ni(n).length,
            onClick: a
          }, null, 8, ["icon", "label", "disabled"]), bs(p, {
            size: "small",
            severity: "secondary",
            text: "",
            icon: "pi pi-trash",
            label: ni(e)("debugLogs.clear"),
            disabled: 0 === ni(n).length,
            onClick: ni(o)
          }, null, 8, ["label", "disabled", "onClick"])])]), ps("div", {
            ref_key: "scrollContainer",
            ref: r,
            class: "overflow-y-auto rounded text-[11px] leading-relaxed",
            style: {
              height: "50vh"
            }
          }, [0 === ni(n).length ? (ns(), rs("div", iA, In(ni(e)("debugLogs.empty")), 1)) : fs("", !0), (ns(
            !0), rs(Xr, null, Na(ni(n), (t, e) => {
            return ns(), rs("div", {
              key: e,
              class: "flex gap-2 items-start py-1 px-1 border-b border-border/20 last:border-0 hover:bg-muted/30 rounded"
            }, [ps("span", aA, In(d(t.timestamp)), 1), bs(b, {
              severity: (n = t.level, "error" === n ? "danger" : "warn" === n ? "warn" :
                "secondary"),
              icon: c(t.level),
              value: t.level,
              class: "shrink-0 !text-[10px] !py-0 !px-1 uppercase"
            }, null, 8, ["severity", "icon", "value"]), ps("span", rA, In(t.message), 1)]);
            var n
          }), 128))], 512)])
        }
      }
    }),
    lA = {
      class: "min-h-full h-full p-3 text-xs relative"
    },
    cA = {
      class: "space-y-2"
    },
    dA = {
      class: "flex items-center justify-between gap-3"
    },
    uA = {
      class: "text-base font-semibold"
    },
    pA = {
      class: "bg-yellow-400 text-black rounded px-1"
    },
    bA = {
      class: "text-xs text-muted-foreground"
    },
    mA = {
      class: "mt-1 text-sm text-muted-foreground"
    },
    gA = {
      class: "font-medium"
    },
    fA = {
      href: "https://zivofly.com/shop",
      target: "_blank",
      rel: "noopener noreferrer",
      class: "inline-flex items-center gap-1 text-primary hover:underline font-semibold"
    },
    hA = {
      class: "flex items-center gap-2"
    },
    vA = ["title"],
    yA = {
      class: "w-32"
    },
    kA = ca({
      __name: "index",
      setup(n) {
        const VERSION = (() => {
          try {
            const t = chrome?.runtime?.getManifest?.();
            return t?.version_name || t?.version || "dev"
          } catch {
            return "dev"
          }
        })(),
          {
            showLoginModal: i
          } = Qc(),
          {
            addEntry: a
          } = Hu(),
          r = jc(),
          {
            t: s
          } = Tc(),
          {
            isFlowPageActive: l,
            navigateToFlowTab: c,
            startPolling: d,
            stopPolling: u
          } = (() => {
            const t = async () => {
              try {
                if ("undefined" == typeof chrome || !chrome?.runtime) return !1;
                const e = await new Promise(t => {
                  chrome.runtime.sendMessage({
                    type: "IS_FLOW_PAGE_ACTIVE"
                  }, e => {
                    const n = chrome.runtime?.lastError;
                    t(!n && e?.active)
                  })
                });
                return Wc !== e && (Hc.value = e, Wc = e), e
              } catch (t) {
                return !1 !== Wc && (Hc.value = !1, Wc = !1), !1
              }
            };
            return {
              isFlowPageActive: Ds(() => Hc.value),
              isCheckingPage: Ds(() => Gc.value),
              checkCurrentPage: t,
              navigateToFlowTab: async e => {
                try {
                  if ("undefined" == typeof chrome || !chrome?.tabs) return void window.open(e, "_blank",
                    "noopener");
                  const n = (await chrome.tabs.query({})).find(t => {
                    if (!t.url) return !1;
                    const e = t.url.toLowerCase();
                    return (e.includes("labs.google") || e.includes("aitestkitchen.withgoogle.com")) && (e
                      .includes("/fx/") || e.includes("flow") || e.includes("/project/"))
                  });
                  n && n.id ? (await chrome.tabs.update(n.id, {
                    active: !0,
                    url: e
                  }), n.windowId && await chrome.windows.update(n.windowId, {
                    focused: !0
                  }), setTimeout(() => t(), 1500), setTimeout(() => t(), 3500)) : await chrome.tabs.create({
                    url: e
                  }, () => {
                    setTimeout(() => t(), 1500), setTimeout(() => t(), 3500)
                  })
                } catch (n) {
                  window.open(e, "_blank", "noopener")
                }
              },
              startPolling: (e = 2e3) => {
                Gc.value = !0, t().finally(() => {
                  Gc.value = !1
                }), "undefined" != typeof chrome && chrome?.tabs && (Kc = setInterval(() => {
                  t()
                }, e))
              },
              stopPolling: () => {
                Kc && (clearInterval(Kc), Kc = null)
              }
            }
          })(),
          p = Lc("user-locale", _c),
          b = Ds(() => [{
            label: s("settingsTab.language.english"),
            value: "en"
          }, {
            label: s("settingsTab.language.vietnamese"),
            value: "vi"
          }, {
            label: s("settingsTab.language.chinese"),
            value: "zh"
          }, {
            label: s("settingsTab.language.korean"),
            value: "ko"
          }, {
            label: s("settingsTab.language.spanish"),
            value: "es"
          }, {
            label: s("settingsTab.language.japanese"),
            value: "ja"
          }, {
            label: s("settingsTab.language.portuguese"),
            value: "pt"
          }, {
            label: s("settingsTab.language.hindi"),
            value: "hi"
          }, {
            label: s("settingsTab.language.urdu"),
            value: "ur"
          }, {
            label: s("settingsTab.language.turkish"),
            value: "tr"
          }, {
            label: s("settingsTab.language.arabic"),
            value: "ar"
          }, {
            label: s("settingsTab.language.german"),
            value: "de"
          }, {
            label: s("settingsTab.language.french"),
            value: "fr"
          }, {
            label: s("settingsTab.language.indonesian"),
            value: "id"
          }, {
            label: s("settingsTab.language.italian"),
            value: "it"
          }, {
            label: s("settingsTab.language.russian"),
            value: "ru"
          }, {
            label: s("settingsTab.language.dutch"),
            value: "nl"
          }, {
            label: s("settingsTab.language.thai"),
            value: "th"
          }, {
            label: s("settingsTab.language.bengali"),
            value: "bn"
          }, {
            label: s("settingsTab.language.filipino"),
            value: "tl"
          }]),
          {
            showUpdateModal: m,
            isAutoUpdating: g,
            checkForUpdate: f
          } = function(n) {
            const o = Zo(!1),
              i = Zo(!1);
            return {
              showUpdateModal: o,
              isAutoUpdating: i,
              checkForUpdate: async () => {}
            }
          }(o),
          v = Zo(!1),
          y = Zo(!1),
          k = Zo(!1),
          showTipModal = Zo(!1),
          x = Zo("0"),
          {
            updateProgress: w,
            clearProgress: C,
            generationProgress: GP
          } = zc(),
          S = Zo([]),
          T = Zo([]),
          I = $o({
            prompt: "",
            referenceLinks: "",
            duration: 30,
            aspectRatio: Xc[0].value,
            batchSize: 1
          }),
          A = $o({
            imageUrl: "",
            prompt: "",
            duration: 15,
            batchSize: 1,
            aspectRatio: Xc[0].value
          }),
          E = $o({
            imageUrl: "",
            prompt: "",
            duration: 15,
            batchSize: 1,
            aspectRatio: Xc[0].value
          }),
          P = $o({
            prompt: "",
            aspectRatio: Xc[0].value,
            batchSize: 1
          }),
          O = $o({
            prompt: "",
            aspectRatio: Xc[0].value,
            batchSize: 1
          }),
          M = $o({
            imageUrl: "",
            prompt: "",
            duration: 15,
            batchSize: 1,
            aspectRatio: Xc[0].value
          }),
          L = $o({
            ...DEFAULT_SETTINGS,
            showUnusualActivityTip: UI_CONFIG.showUnusualActivityTipDefault
          }),
          _ = Zo(L.defaultMode),
          B = async () => {
            v.value = !0;
            try {
              if ("undefined" != typeof chrome && chrome?.storage?.local) {
                const t = await chrome.storage.local.get(qc);
                if (t[qc]) {
                  const e = t[qc],
                    n = (e.migrationVersion ?? 0) < SETTINGS_MIGRATION_VERSION,
                    o = n ? migrateSettings(e) : e;
                  Object.assign(L, o), "boolean" != typeof L.showUnusualActivityTip && (L.showUnusualActivityTip =
                    UI_CONFIG.showUnusualActivityTipDefault), Array.isArray(L.defaultCharacters) || (L
                    .defaultCharacters = Object.values(L.defaultCharacters)), n && await chrome.storage.local
                .set({
                    [qc]: {
                      ...L
                    }
                  })
                } else {
                  Object.assign(L, DEFAULT_SETTINGS, {
                    showUnusualActivityTip: UI_CONFIG.showUnusualActivityTipDefault
                  }), await chrome.storage.local.set({
                    [qc]: {
                      ...L
                    }
                  })
                }
              }
            } catch (t) {} finally {
              v.value = !1
            }
          }, F = async () => {
            y.value = !0;
            try {
              "undefined" != typeof chrome && chrome?.storage?.local && await chrome.storage.local.set({
                [qc]: {
                  ...L
                }
              })
            } catch (t) {} finally {
              y.value = !1
            }
          }, R = async () => {
            try {
              "undefined" != typeof chrome && chrome?.tabs?.create ? await chrome.tabs.create({
                url: "chrome://settings/downloads"
              }) : window.open("chrome://settings/downloads", "_blank")
            } catch (t) {
              r.add({
                severity: "error",
                summary: "Error",
                detail: "Could not open download settings",
                life: 3e3
              })
            }
          }, D = async () => {
            Object.assign(L, RESET_SETTINGS, {
              showUnusualActivityTip: UI_CONFIG.showUnusualActivityTipDefault
            }), await F()
          }, V = () => {
            "textToVideo" === _.value ? I.prompt = "" : "imageToVideo" === _.value ? A.prompt = "" :
              "componentsToVideo" === _.value ? E.prompt = "" : "textToImage" === _.value ? P.prompt = "" :
              "imageToImage" === _.value ? O.prompt = "" : "agentAutomation" === _.value && (M.prompt = ""),
              C(), T.value = T.value.filter(t => "completed" !== t.status)
          };
        Rr(() => L.defaultMode, t => {
          _.value = t
        }), Rr(() => L.showUnusualActivityTip, t => {
          UI_CONFIG.enableUnusualActivityTip && (showTipModal.value = !!t)
        });
        const N = Ds(() => {
            const t = Yc.find(t => t.value === _.value);
            return t?.label ?? ""
          }),
          $ = (t, e, n) => {
            if ("ACTION_LOG" === t.type) a(t.data);
            else if ("VIDEO_GENERATION_PROGRESS" === t.type) {
              const {
                groupId: e,
                promptIndex: n,
                percentage: o,
                status: i,
                prompt: a
              } = t.data;
              if (!e) return;
              w(e, n, o, i, a || `Prompt ${n}`), "completed" === i && (k.value = !1)
            } else if ("CONTENT_SCRIPT_RESET" === t.type) T.value = [], C();
            else if ("FLOW_PAGE_CHANGED" === t.type) Hc.value = !!t.active, Wc = !!t.active;
            else if ("PROMPT_GROUP_STATUS" === t.type) {
              const e = t.data,
                n = T.value.findIndex(t => t.id === e.id);
              n >= 0 ? T.value[n] = {
                ...T.value[n],
                ...e
              } : T.value.push(e), T.value.sort((t, e) => t.createdAt - e.createdAt)
            }
          };
        Ca(async () => {
          veoSetRemovePromptGroupHandler(t => {
            T.value = T.value.filter(e => e.id !== t), GP.value = GP.value.filter(e => e.groupId !== t)
          }), await B(), await f(), d(2e3), UI_CONFIG.enableUnusualActivityTip && L.showUnusualActivityTip && (
              showTipModal.value = !0), "undefined" != typeof chrome && chrome?.runtime?.onMessage && chrome
            .runtime.onMessage.addListener($)
        });
        Aa(() => {
          veoSetRemovePromptGroupHandler(null), u(), "undefined" != typeof chrome && chrome?.runtime?.onMessage && chrome.runtime.onMessage
            .removeListener($)
        });
        Rr(L, () => {
          F()
        }, {
          deep: !0
        });
        return (t, e) => {
          const n = _a("PToast"),
            a = _a("PConfirmDialog"),
            r = _a("PSelect"),
            s = _a("PTab"),
            d = _a("PTabList"),
            u = _a("PTabPanel"),
            f = _a("PTabPanels"),
            v = _a("PTabs");
          return ns(), rs("div", lA, [bs(n), bs(a), bs(vd, {
            visible: ni(m),
            "is-auto-updating": ni(g)
          }, null, 8, ["visible", "is-auto-updating"]), bs($d, {
            visible: ni(i),
            "onUpdate:visible": e[0] || (e[0] = t => Jo(i) ? i.value = t : null)
          }, null, 8, ["visible"]), UI_CONFIG.enableUnusualActivityTip ? (ns(), ss(du, {
            key: 0,
            visible: ni(showTipModal) && L.showUnusualActivityTip,
            onDismiss: e[9] || (e[9] = () => {
              showTipModal.value = !1
            })
          }, null, 8, ["visible"])) : fs("", !0), ni(l) ? fs("", !0) : (ns(), ss(ad, {
            key: 0,
            "flow-url": ni("https://labs.google/fx/tools/flow"),
            onNavigate: ni(c)
          }, null, 8, ["flow-url", "onNavigate"])), ps("div", null, [ps("header", cA, [ps("div", dA, [ps(
            "div", null, [ps("h1", uA, [gs(In(t.$t("sidePanel.header.title")) + " ", 1), ps(
              "span", pA, "v" + In(ni(VERSION)), 1)]), ps("p", bA, In(t.$t(
              "sidePanel.header.description")), 1), ps("div", mA, [ps("span", gA, In(t.$t(
              "sidePanel.header.communityCtaPrefix")), 1), ps("a", fA, [gs(In(t.$t(
              "sidePanel.header.communityCtaLink")) + " ", 1), e[6] || (e[6] = ps("i", {
              class: "pi pi-external-link text-xs",
              "aria-hidden": "true"
            }, null, -1))])])]), ps("div", hA, [ps("a", {
              href: "https://github.com/manhgdev/veo-automation-extension-guide",
              target: "_blank",
              rel: "noopener noreferrer",
              class: "inline-flex items-center gap-1 px-2 py-1 text-xs text-primary hover:text-primary/80 hover:underline transition-colors",
              title: t.$t("sidePanel.header.userGuideLink")
            }, [e[7] || (e[7] = ps("i", {
              class: "pi pi-book text-sm",
              "aria-hidden": "true"
            }, null, -1)), ps("span", null, In(t.$t("sidePanel.header.userGuideLink")), 1)],
            8, vA), e[8] || (e[8] = ps("a", {
            href: "https://t.me/zm_veo3_extension",
            target: "_blank",
            rel: "noopener noreferrer",
            class: "inline-flex items-center justify-center w-8 h-8 text-primary hover:text-primary/80 transition-colors",
            title: "Telegram"
          }, [ps("i", {
            class: "pi pi-telegram text-lg",
            "aria-hidden": "true"
          })], -1)), ps("div", yA, [bs(r, {
            modelValue: ni(p).data,
            "onUpdate:modelValue": e[2] || (e[2] = t => ni(p).data = t),
            options: b.value,
            "option-label": "label",
            "option-value": "value",
            class: "w-full text-xs",
            size: "small"
          }, null, 8, ["modelValue", "options"])])])]), bs(Bu, {
            onShowLogin: e[3] || (e[3] = t => i.value = !0)
          })]), bs(v, {
            value: x.value,
            class: "mt-2",
            "onUpdate:value": e[5] || (e[5] = t => x.value = t)
          }, {
            default: Bi(() => [bs(d, null, {
              default: Bi(() => [bs(s, {
                value: "0"
              }, {
                default: Bi(() => [e[9] || (e[9] = ps("i", {
                  class: "pi pi-sliders-h text-xs mr-2"
                }, null, -1)), gs(" " + In(t.$t("sidePanel.tabs.control")), 1)]),
                _: 1
              }), bs(s, {
                value: "1"
              }, {
                default: Bi(() => [e[10] || (e[10] = ps("i", {
                  class: "pi pi-cog text-xs mr-2"
                }, null, -1)), gs(" " + In(t.$t("sidePanel.tabs.settings")), 1)]),
                _: 1
              }), bs(s, {
                value: "2"
              }, {
                default: Bi(() => [e[11] || (e[11] = ps("i", {
                  class: "pi pi-search text-xs mr-2"
                }, null, -1)), gs(" " + In(t.$t("sidePanel.tabs.debugLogs")), 1)]),
                _: 1
              })]),
              _: 1
            }), bs(f, null, {
              default: Bi(() => [bs(u, {
                value: "0"
              }, {
                default: Bi(() => [bs(QT, {
                  "selected-mode": _.value,
                  "text-to-video-form": I,
                  "image-to-video-form": A,
                  "components-to-video-form": E,
                  "text-to-image-form": P,
                  "image-to-image-form": O,
                  "agent-automation-form": M,
                  "is-processing-job": k.value,
                  "mode-label": N.value,
                  settings: L,
                  "active-prompts": S.value,
                  "prompt-groups": T.value,
                  "onUpdate:selectedMode": e[4] || (e[4] = t => _.value = t),
                  onClear: V
                }, null, 8, ["selected-mode", "text-to-video-form",
                  "image-to-video-form", "components-to-video-form",
                  "text-to-image-form", "image-to-image-form",
                  "agent-automation-form", "is-processing-job", "mode-label",
                  "settings", "active-prompts", "prompt-groups"
                ])]),
                _: 1
              }), bs(u, {
                value: "1"
              }, {
                default: Bi(() => [bs(JI, {
                  settings: L,
                  "is-saving-settings": y.value,
                  onSaveSettings: F,
                  onResetSettings: D,
                  onOpenDownloadConfig: R
                }, null, 8, ["settings", "is-saving-settings"])]),
                _: 1
              }), bs(u, {
                value: "2"
              }, {
                default: Bi(() => [bs(sA)]),
                _: 1
              })]),
              _: 1
            })]),
            _: 1
          }, 8, ["value"])])])
        }
      }
    }),
    xA = {
      class: "h-lvh bg-background text-foreground"
    },
    wA = ca({
      __name: "app",
      setup(t) {
        const e = new Set(["ar", "ur"]),
          n = Lc("user-locale", _c),
          o = t => {
            document.documentElement.dir = e.has(t) ? "rtl" : "ltr"
          };
        return Rr(n.data, t => o(t ?? _c)), Ca(() => {
          document.documentElement.classList.add("dark"), o(n.data.value ?? _c)
        }), (t, e) => (ns(), rs("main", xA, [bs(kA)]))
      }
    });
