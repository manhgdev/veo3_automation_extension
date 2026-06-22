! function() {
  const t = document.createElement("link").relList;
  if (!(t && t.supports && t.supports("modulepreload"))) {
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) e(t);
    new MutationObserver(t => {
      for (const n of t)
        if ("childList" === n.type)
          for (const t of n.addedNodes) "LINK" === t.tagName && "modulepreload" === t.rel && e(t)
    }).observe(document, {
      childList: !0,
      subtree: !0
    })
  }

  function e(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = function(t) {
      const e = {};
      return t.integrity && (e.integrity = t.integrity), t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
        "use-credentials" === t.crossOrigin ? e.credentials = "include" : "anonymous" === t.crossOrigin ? e
        .credentials = "omit" : e.credentials = "same-origin", e
    }(t);
    fetch(t.href, e)
  }
}();

const n = t => t && "object" == typeof t && !Array.isArray(t),
  o = (t, ...e) => {
    if (!e.length) return t;
    const i = e.shift();
    if (n(t) && n(i))
      for (const a in i) n(i[a]) ? (t[a] || Object.assign(t, {
        [a]: {}
      }), o(t[a], i[a])) : Object.assign(t, {
        [a]: i[a]
      });
    return o(t, ...e)
  };
