function a(t, e) {}
const r = "undefined" != typeof window,
  s = (t, e = !1) => e ? Symbol.for(t) : Symbol(t),
  l = t => JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
  c = t => "number" == typeof t && isFinite(t),
  d = t => "[object RegExp]" === T(t),
  u = t => I(t) && 0 === Object.keys(t).length,
  p = Object.assign,
  b = Object.create,
  m = (t = null) => b(t);

function g(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g,
    "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;")
}

function f(t) {
  return t.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g,
    "&lt;").replace(/>/g, "&gt;")
}
const h = Object.prototype.hasOwnProperty;

function v(t, e) {
  return h.call(t, e)
}
const y = Array.isArray,
  k = t => "function" == typeof t,
  x = t => "string" == typeof t,
  w = t => "boolean" == typeof t,
  C = t => null !== t && "object" == typeof t,
  S = Object.prototype.toString,
  T = t => S.call(t),
  I = t => "[object Object]" === T(t);

function A(t, e = "") {
  return t.reduce((t, n, o) => 0 === o ? t + n : t + e + n, "")
}
const E = t => !C(t) || y(t);

function P(t, e) {
  if (E(t) || E(e)) throw new Error("Invalid value");
  const n = [{
    src: t,
    des: e
  }];
  for (; n.length;) {
    const {
      src: t,
      des: e
    } = n.pop();
    Object.keys(t).forEach(o => {
      "__proto__" !== o && (C(t[o]) && !C(e[o]) && (e[o] = Array.isArray(t[o]) ? [] : m()), E(e[o]) || E(t[o]) ? e[
        o] = t[o] : n.push({
        src: t[o],
        des: e[o]
      }))
    })
  }
}

function O(t, e, n) {
  return {
    start: t,
    end: e
  }
}
const M = 1,
  L = 2,
  _ = 3,
  B = 4,
  F = 5,
  R = 6,
  D = 7,
  V = 8,
  N = 9,
  z = 10,
  U = 11,
  j = 12,
  H = 13,
  G = 14;

function K(t, e, n = {}) {
  const {
    domain: o,
    messages: i,
    args: a
  } = n, r = new SyntaxError(String(t));
  return r.code = t, e && (r.location = e), r.domain = o, r
}

function W(t) {
  throw t
}
const q = " ",
  Y = "\n",
  X = String.fromCharCode(8232),
  J = String.fromCharCode(8233);

function Z(t) {
  const e = t;
  let n = 0,
    o = 1,
    i = 1,
    a = 0;
  const r = t => "\r" === e[t] && e[t + 1] === Y,
    s = t => e[t] === J,
    l = t => e[t] === X,
    c = t => r(t) || (t => e[t] === Y)(t) || s(t) || l(t),
    d = t => r(t) || s(t) || l(t) ? Y : e[t];

  function u() {
    return a = 0, c(n) && (o++, i = 0), r(n) && n++, n++, i++, e[n]
  }
  return {
    index: () => n,
    line: () => o,
    column: () => i,
    peekOffset: () => a,
    charAt: d,
    currentChar: () => d(n),
    currentPeek: () => d(n + a),
    next: u,
    peek: function() {
      return r(n + a) && a++, a++, e[n + a]
    },
    reset: function() {
      n = 0, o = 1, i = 1, a = 0
    },
    resetPeek: function(t = 0) {
      a = t
    },
    skipToPeek: function() {
      const t = n + a;
      for (; t !== n;) u();
      a = 0
    }
  }
}
const Q = void 0;

function tt(t, e = {}) {
  const n = !1 !== e.location,
    o = Z(t),
    i = () => o.index(),
    a = () => {
      return t = o.line(), e = o.column(), n = o.index(), {
        line: t,
        column: e,
        offset: n
      };
      var t, e, n
    },
    r = a(),
    s = i(),
    l = {
      currentType: 13,
      offset: s,
      startLoc: r,
      endLoc: r,
      lastType: 13,
      lastOffset: s,
      lastStartLoc: r,
      lastEndLoc: r,
      braceNest: 0,
      inLinked: !1,
      text: ""
    },
    c = () => l,
    {
      onError: d
    } = e;

  function u(t, e, o, ...i) {
    const a = c();
    if (e.column += o, e.offset += o, d) {
      const o = K(t, n ? O(a.startLoc, e) : null, {
        domain: "tokenizer",
        args: i
      });
      d(o)
    }
  }

  function p(t, e, o) {
    t.endLoc = a(), t.currentType = e;
    const i = {
      type: e
    };
    return n && (i.loc = O(t.startLoc, t.endLoc)), null != o && (i.value = o), i
  }
  const b = t => p(t, 13);

  function m(t, e) {
    return t.currentChar() === e ? (t.next(), e) : (u(M, a(), 0, e), "")
  }

  function g(t) {
    let e = "";
    for (; t.currentPeek() === q || t.currentPeek() === Y;) e += t.currentPeek(), t.peek();
    return e
  }

  function f(t) {
    const e = g(t);
    return t.skipToPeek(), e
  }

  function h(t) {
    if (t === Q) return !1;
    const e = t.charCodeAt(0);
    return e >= 97 && e <= 122 || e >= 65 && e <= 90 || 95 === e
  }

  function v(t, e) {
    const {
      currentType: n
    } = e;
    if (2 !== n) return !1;
    g(t);
    const o = function(t) {
      if (t === Q) return !1;
      const e = t.charCodeAt(0);
      return e >= 48 && e <= 57
    }("-" === t.currentPeek() ? t.peek() : t.currentPeek());
    return t.resetPeek(), o
  }

  function y(t) {
    g(t);
    const e = "|" === t.currentPeek();
    return t.resetPeek(), e
  }

  function k(t, e = !0) {
    const n = (e = !1, o = "") => {
        const i = t.currentPeek();
        return "{" === i ? e : "@" !== i && i ? "|" === i ? !(o === q || o === Y) : i === q ? (t.peek(), n(!0, q)) :
          i !== Y || (t.peek(), n(!0, Y)) : e
      },
      o = n();
    return e && t.resetPeek(), o
  }

  function x(t, e) {
    const n = t.currentChar();
    return n === Q ? Q : e(n) ? (t.next(), n) : null
  }

  function w(t) {
    const e = t.charCodeAt(0);
    return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || 95 === e || 36 === e
  }

  function C(t) {
    return x(t, w)
  }

  function S(t) {
    const e = t.charCodeAt(0);
    return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || 95 === e || 36 === e || 45 === e
  }

  function T(t) {
    return x(t, S)
  }

  function I(t) {
    const e = t.charCodeAt(0);
    return e >= 48 && e <= 57
  }

  function A(t) {
    return x(t, I)
  }

  function E(t) {
    const e = t.charCodeAt(0);
    return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102
  }

  function P(t) {
    return x(t, E)
  }

  function $(t) {
    let e = "",
      n = "";
    for (; e = A(t);) n += e;
    return n
  }

  function U(t) {
    return "'" !== t && t !== Y
  }

  function j(t) {
    const e = t.currentChar();
    switch (e) {
      case "\\":
      case "'":
        return t.next(), `\\${e}`;
      case "u":
        return H(t, e, 4);
      case "U":
        return H(t, e, 6);
      default:
        return u(B, a(), 0, e), ""
    }
  }

  function H(t, e, n) {
    m(t, e);
    let o = "";
    for (let i = 0; i < n; i++) {
      const n = P(t);
      if (!n) {
        u(F, a(), 0, `\\${e}${o}${t.currentChar()}`);
        break
      }
      o += n
    }
    return `\\${e}${o}`
  }

  function G(t) {
    return "{" !== t && "}" !== t && t !== q && t !== Y
  }

  function W(t) {
    f(t);
    let e = "",
      n = "";
    for (; e = x(t, G);) n += e;
    return n
  }

  function X(t) {
    f(t);
    const e = m(t, "|");
    return f(t), e
  }

  function J(t, e) {
    let n = null;
    switch (t.currentChar()) {
      case "{":
        return e.braceNest >= 1 && u(N, a(), 0), t.next(), n = p(e, 2, "{"), f(t), e.braceNest++, n;
      case "}":
        return e.braceNest > 0 && 2 === e.currentType && u(V, a(), 0), t.next(), n = p(e, 3, "}"), e.braceNest--, e
          .braceNest > 0 && f(t), e.inLinked && 0 === e.braceNest && (e.inLinked = !1), n;
      case "@":
        return e.braceNest > 0 && u(D, a(), 0), n = tt(t, e) || b(e), e.braceNest = 0, n;
      default: {
        let o = !0,
          i = !0,
          r = !0;
        if (y(t)) return e.braceNest > 0 && u(D, a(), 0), n = p(e, 1, X(t)), e.braceNest = 0, e.inLinked = !1, n;
        if (e.braceNest > 0 && (4 === e.currentType || 5 === e.currentType || 6 === e.currentType)) return u(D, a(), 0),
          e.braceNest = 0, et(t, e);
        if (o = function(t, e) {
            const {
              currentType: n
            } = e;
            if (2 !== n) return !1;
            g(t);
            const o = h(t.currentPeek());
            return t.resetPeek(), o
          }(t, e)) return n = p(e, 4, function(t) {
          f(t);
          let e = "",
            n = "";
          for (; e = T(t);) n += e;
          const o = t.currentChar();
          if (o && "}" !== o && o !== Q && o !== q && o !== Y && "\u3000" !== o) {
            const e = W(t);
            return u(L, a(), 0, n + e), n + e
          }
          return t.currentChar() === Q && u(D, a(), 0), n
        }(t)), f(t), n;
        if (i = v(t, e)) return n = p(e, 5, function(t) {
          f(t);
          let e = "";
          return "-" === t.currentChar() ? (t.next(), e += `-${$(t)}`) : e += $(t), t.currentChar() === Q && u(D,
            a(), 0), e
        }(t)), f(t), n;
        if (r = function(t, e) {
            const {
              currentType: n
            } = e;
            if (2 !== n) return !1;
            g(t);
            const o = "'" === t.currentPeek();
            return t.resetPeek(), o
          }(t, e)) return n = p(e, 6, function(t) {
          f(t), m(t, "'");
          let e = "",
            n = "";
          for (; e = x(t, U);) n += "\\" === e ? j(t) : e;
          const o = t.currentChar();
          return o === Y || o === Q ? (u(_, a(), 0), o === Y && (t.next(), m(t, "'")), n) : (m(t, "'"), n)
        }(t)), f(t), n;
        if (!o && !i && !r) return n = p(e, 12, W(t)), u(L, a(), 0, n.value), f(t), n;
        break
      }
    }
    return n
  }

  function tt(t, e) {
    const {
      currentType: n
    } = e;
    let o = null;
    const i = t.currentChar();
    switch (7 !== n && 8 !== n && 11 !== n && 9 !== n || i !== Y && i !== q || u(z, a(), 0), i) {
      case "@":
        return t.next(), o = p(e, 7, "@"), e.inLinked = !0, o;
      case ".":
        return f(t), t.next(), p(e, 8, ".");
      case ":":
        return f(t), t.next(), p(e, 9, ":");
      default:
        return y(t) ? (o = p(e, 1, X(t)), e.braceNest = 0, e.inLinked = !1, o) : function(t, e) {
          const {
            currentType: n
          } = e;
          if (7 !== n) return !1;
          g(t);
          const o = "." === t.currentPeek();
          return t.resetPeek(), o
        }(t, e) || function(t, e) {
          const {
            currentType: n
          } = e;
          if (7 !== n && 11 !== n) return !1;
          g(t);
          const o = ":" === t.currentPeek();
          return t.resetPeek(), o
        }(t, e) ? (f(t), tt(t, e)) : function(t, e) {
          const {
            currentType: n
          } = e;
          if (8 !== n) return !1;
          g(t);
          const o = h(t.currentPeek());
          return t.resetPeek(), o
        }(t, e) ? (f(t), p(e, 11, function(t) {
          let e = "",
            n = "";
          for (; e = C(t);) n += e;
          return n
        }(t))) : function(t, e) {
          const {
            currentType: n
          } = e;
          if (9 !== n) return !1;
          const o = () => {
              const e = t.currentPeek();
              return "{" === e ? h(t.peek()) : !("@" === e || "|" === e || ":" === e || "." === e || e === q || !e) &&
                (e === Y ? (t.peek(), o()) : k(t, !1))
            },
            i = o();
          return t.resetPeek(), i
        }(t, e) ? (f(t), "{" === i ? J(t, e) || o : p(e, 10, function(t) {
          const e = n => {
            const o = t.currentChar();
            return "{" !== o && "@" !== o && "|" !== o && "(" !== o && ")" !== o && o ? o === q ? n : (n += o, t
              .next(), e(n)) : n
          };
          return e("")
        }(t))) : (7 === n && u(z, a(), 0), e.braceNest = 0, e.inLinked = !1, et(t, e))
    }
  }

  function et(t, e) {
    let n = {
      type: 13
    };
    if (e.braceNest > 0) return J(t, e) || b(e);
    if (e.inLinked) return tt(t, e) || b(e);
    switch (t.currentChar()) {
      case "{":
        return J(t, e) || b(e);
      case "}":
        return u(R, a(), 0), t.next(), p(e, 3, "}");
      case "@":
        return tt(t, e) || b(e);
      default:
        if (y(t)) return n = p(e, 1, X(t)), e.braceNest = 0, e.inLinked = !1, n;
        if (k(t)) return p(e, 0, function(t) {
          let e = "";
          for (;;) {
            const n = t.currentChar();
            if ("{" === n || "}" === n || "@" === n || "|" === n || !n) break;
            if (n === q || n === Y)
              if (k(t)) e += n, t.next();
              else {
                if (y(t)) break;
                e += n, t.next()
              }
            else e += n, t.next()
          }
          return e
        }(t))
    }
    return n
  }
  return {
    nextToken: function() {
      const {
        currentType: t,
        offset: e,
        startLoc: n,
        endLoc: r
      } = l;
      return l.lastType = t, l.lastOffset = e, l.lastStartLoc = n, l.lastEndLoc = r, l.offset = i(), l.startLoc = a(),
        o.currentChar() === Q ? p(l, 13) : et(o, l)
    },
    currentOffset: i,
    currentPosition: a,
    context: c
  }
}
const et = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

function nt(t, e, n) {
  switch (t) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const t = parseInt(e || n, 16);
      return t <= 55295 || t >= 57344 ? String.fromCodePoint(t) : "\ufffd"
    }
  }
}

function ot(t = {}) {
  const e = !1 !== t.location,
    {
      onError: n
    } = t;

  function o(t, o, i, a, ...r) {
    const s = t.currentPosition();
    if (s.offset += a, s.column += a, n) {
      const t = K(o, e ? O(i, s) : null, {
        domain: "parser",
        args: r
      });
      n(t)
    }
  }

  function i(t, n, o) {
    const i = {
      type: t
    };
    return e && (i.start = n, i.end = n, i.loc = {
      start: o,
      end: o
    }), i
  }

  function a(t, n, o, i) {
    e && (t.end = n, t.loc && (t.loc.end = o))
  }

  function r(t, e) {
    const n = t.context(),
      o = i(3, n.offset, n.startLoc);
    return o.value = e, a(o, t.currentOffset(), t.currentPosition()), o
  }

  function s(t, e) {
    const n = t.context(),
      {
        lastOffset: o,
        lastStartLoc: r
      } = n,
      s = i(5, o, r);
    return s.index = parseInt(e, 10), t.nextToken(), a(s, t.currentOffset(), t.currentPosition()), s
  }

  function l(t, e) {
    const n = t.context(),
      {
        lastOffset: o,
        lastStartLoc: r
      } = n,
      s = i(4, o, r);
    return s.key = e, t.nextToken(), a(s, t.currentOffset(), t.currentPosition()), s
  }

  function c(t, e) {
    const n = t.context(),
      {
        lastOffset: o,
        lastStartLoc: r
      } = n,
      s = i(9, o, r);
    return s.value = e.replace(et, nt), t.nextToken(), a(s, t.currentOffset(), t.currentPosition()), s
  }

  function d(t) {
    const e = t.context(),
      n = i(6, e.offset, e.startLoc);
    let r = t.nextToken();
    if (8 === r.type) {
      const e = function(t) {
        const e = t.nextToken(),
          n = t.context(),
          {
            lastOffset: r,
            lastStartLoc: s
          } = n,
          l = i(8, r, s);
        return 11 !== e.type ? (o(t, j, n.lastStartLoc, 0), l.value = "", a(l, r, s), {
          nextConsumeToken: e,
          node: l
        }) : (null == e.value && o(t, G, n.lastStartLoc, 0, it(e)), l.value = e.value || "", a(l, t.currentOffset(),
          t.currentPosition()), {
          node: l
        })
      }(t);
      n.modifier = e.node, r = e.nextConsumeToken || t.nextToken()
    }
    switch (9 !== r.type && o(t, G, e.lastStartLoc, 0, it(r)), r = t.nextToken(), 2 === r.type && (r = t.nextToken()), r
      .type) {
      case 10:
        null == r.value && o(t, G, e.lastStartLoc, 0, it(r)), n.key = function(t, e) {
          const n = t.context(),
            o = i(7, n.offset, n.startLoc);
          return o.value = e, a(o, t.currentOffset(), t.currentPosition()), o
        }(t, r.value || "");
        break;
      case 4:
        null == r.value && o(t, G, e.lastStartLoc, 0, it(r)), n.key = l(t, r.value || "");
        break;
      case 5:
        null == r.value && o(t, G, e.lastStartLoc, 0, it(r)), n.key = s(t, r.value || "");
        break;
      case 6:
        null == r.value && o(t, G, e.lastStartLoc, 0, it(r)), n.key = c(t, r.value || "");
        break;
      default: {
        o(t, H, e.lastStartLoc, 0);
        const s = t.context(),
          l = i(7, s.offset, s.startLoc);
        return l.value = "", a(l, s.offset, s.startLoc), n.key = l, a(n, s.offset, s.startLoc), {
          nextConsumeToken: r,
          node: n
        }
      }
    }
    return a(n, t.currentOffset(), t.currentPosition()), {
      node: n
    }
  }

  function u(t) {
    const e = t.context(),
      n = i(2, 1 === e.currentType ? t.currentOffset() : e.offset, 1 === e.currentType ? e.endLoc : e.startLoc);
    n.items = [];
    let u = null;
    do {
      const i = u || t.nextToken();
      switch (u = null, i.type) {
        case 0:
          null == i.value && o(t, G, e.lastStartLoc, 0, it(i)), n.items.push(r(t, i.value || ""));
          break;
        case 5:
          null == i.value && o(t, G, e.lastStartLoc, 0, it(i)), n.items.push(s(t, i.value || ""));
          break;
        case 4:
          null == i.value && o(t, G, e.lastStartLoc, 0, it(i)), n.items.push(l(t, i.value || ""));
          break;
        case 6:
          null == i.value && o(t, G, e.lastStartLoc, 0, it(i)), n.items.push(c(t, i.value || ""));
          break;
        case 7: {
          const e = d(t);
          n.items.push(e.node), u = e.nextConsumeToken || null;
          break
        }
      }
    } while (13 !== e.currentType && 1 !== e.currentType);
    return a(n, 1 === e.currentType ? e.lastOffset : t.currentOffset(), 1 === e.currentType ? e.lastEndLoc : t
      .currentPosition()), n
  }

  function b(t) {
    const e = t.context(),
      {
        offset: n,
        startLoc: r
      } = e,
      s = u(t);
    return 13 === e.currentType ? s : function(t, e, n, r) {
      const s = t.context();
      let l = 0 === r.items.length;
      const c = i(1, e, n);
      c.cases = [], c.cases.push(r);
      do {
        const e = u(t);
        l || (l = 0 === e.items.length), c.cases.push(e)
      } while (13 !== s.currentType);
      return l && o(t, U, n, 0), a(c, t.currentOffset(), t.currentPosition()), c
    }(t, n, r, s)
  }
  return {
    parse: function(n) {
      const r = tt(n, p({}, t)),
        s = r.context(),
        l = i(0, s.offset, s.startLoc);
      return e && l.loc && (l.loc.source = n), l.body = b(r), t.onCacheKey && (l.cacheKey = t.onCacheKey(n)), 13 !== s
        .currentType && o(r, G, s.lastStartLoc, 0, n[s.offset] || ""), a(l, r.currentOffset(), r.currentPosition()), l
    }
  }
}

function it(t) {
  if (13 === t.type) return "EOF";
  const e = (t.value || "").replace(/\r?\n/gu, "\\n");
  return e.length > 10 ? e.slice(0, 9) + "\u2026" : e
}

function at(t, e) {
  for (let n = 0; n < t.length; n++) rt(t[n], e)
}

function rt(t, e) {
  switch (t.type) {
    case 1:
      at(t.cases, e), e.helper("plural");
      break;
    case 2:
      at(t.items, e);
      break;
    case 6:
      rt(t.key, e), e.helper("linked"), e.helper("type");
      break;
    case 5:
      e.helper("interpolate"), e.helper("list");
      break;
    case 4:
      e.helper("interpolate"), e.helper("named")
  }
}

function st(t, e = {}) {
  const n = function(t) {
    const e = {
      ast: t,
      helpers: new Set
    };
    return {
      context: () => e,
      helper: t => (e.helpers.add(t), t)
    }
  }(t);
  n.helper("normalize"), t.body && rt(t.body, n);
  const o = n.context();
  t.helpers = Array.from(o.helpers)
}

function lt(t) {
  if (1 === t.items.length) {
    const e = t.items[0];
    3 !== e.type && 9 !== e.type || (t.static = e.value, delete e.value)
  } else {
    const e = [];
    for (let n = 0; n < t.items.length; n++) {
      const o = t.items[n];
      if (3 !== o.type && 9 !== o.type) break;
      if (null == o.value) break;
      e.push(o.value)
    }
    if (e.length === t.items.length) {
      t.static = A(e);
      for (let e = 0; e < t.items.length; e++) {
        const n = t.items[e];
        3 !== n.type && 9 !== n.type || delete n.value
      }
    }
  }
}

function ct(t) {
  switch (t.t = t.type, t.type) {
    case 0: {
      const e = t;
      ct(e.body), e.b = e.body, delete e.body;
      break
    }
    case 1: {
      const e = t,
        n = e.cases;
      for (let t = 0; t < n.length; t++) ct(n[t]);
      e.c = n, delete e.cases;
      break
    }
    case 2: {
      const e = t,
        n = e.items;
      for (let t = 0; t < n.length; t++) ct(n[t]);
      e.i = n, delete e.items, e.static && (e.s = e.static, delete e.static);
      break
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const e = t;
      e.value && (e.v = e.value, delete e.value);
      break
    }
    case 6: {
      const e = t;
      ct(e.key), e.k = e.key, delete e.key, e.modifier && (ct(e.modifier), e.m = e.modifier, delete e.modifier);
      break
    }
    case 5: {
      const e = t;
      e.i = e.index, delete e.index;
      break
    }
    case 4: {
      const e = t;
      e.k = e.key, delete e.key;
      break
    }
  }
  delete t.type
}

function dt(t, e) {
  const {
    helper: n
  } = t;
  switch (e.type) {
    case 0:
      ! function(t, e) {
        e.body ? dt(t, e.body) : t.push("null")
      }(t, e);
      break;
    case 1:
      ! function(t, e) {
        const {
          helper: n,
          needIndent: o
        } = t;
        if (e.cases.length > 1) {
          t.push(`${n("plural")}([`), t.indent(o());
          const i = e.cases.length;
          for (let n = 0; n < i && (dt(t, e.cases[n]), n !== i - 1); n++) t.push(", ");
          t.deindent(o()), t.push("])")
        }
      }(t, e);
      break;
    case 2:
      ! function(t, e) {
        const {
          helper: n,
          needIndent: o
        } = t;
        t.push(`${n("normalize")}([`), t.indent(o());
        const i = e.items.length;
        for (let a = 0; a < i && (dt(t, e.items[a]), a !== i - 1); a++) t.push(", ");
        t.deindent(o()), t.push("])")
      }(t, e);
      break;
    case 6:
      ! function(t, e) {
        const {
          helper: n
        } = t;
        t.push(`${n("linked")}(`), dt(t, e.key), e.modifier ? (t.push(", "), dt(t, e.modifier), t.push(", _type")) : t
          .push(", undefined, _type"), t.push(")")
      }(t, e);
      break;
    case 8:
    case 7:
    case 9:
    case 3:
      t.push(JSON.stringify(e.value), e);
      break;
    case 5:
      t.push(`${n("interpolate")}(${n("list")}(${e.index}))`, e);
      break;
    case 4:
      t.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(e.key)}))`, e)
  }
}

function ut(t, e = {}) {
  const n = p({}, e),
    o = !!n.jit,
    i = !!n.minify,
    a = null == n.optimize || n.optimize,
    r = ot(n).parse(t);
  return o ? (a && function(t) {
    const e = t.body;
    2 === e.type ? lt(e) : e.cases.forEach(t => lt(t))
  }(r), i && ct(r), {
    ast: r,
    code: ""
  }) : (st(r, n), ((t, e = {}) => {
    const n = x(e.mode) ? e.mode : "normal",
      o = x(e.filename) ? e.filename : "message.intl";
    e.sourceMap;
    const i = null != e.breakLineCode ? e.breakLineCode : "arrow" === n ? ";" : "\n",
      a = e.needIndent ? e.needIndent : "arrow" !== n,
      r = t.helpers || [],
      s = function(t, e) {
        const {
          filename: n,
          breakLineCode: o,
          needIndent: i
        } = e, a = !1 !== e.location, r = {
          filename: n,
          code: "",
          column: 1,
          line: 1,
          offset: 0,
          map: void 0,
          breakLineCode: o,
          needIndent: i,
          indentLevel: 0
        };

        function s(t, e) {
          r.code += t
        }

        function l(t, e = !0) {
          const n = e ? o : "";
          s(i ? n + "  ".repeat(t) : n)
        }
        return a && t.loc && (r.source = t.loc.source), {
          context: () => r,
          push: s,
          indent: function(t = !0) {
            const e = ++r.indentLevel;
            t && l(e)
          },
          deindent: function(t = !0) {
            const e = --r.indentLevel;
            t && l(e)
          },
          newline: function() {
            l(r.indentLevel)
          },
          helper: t => `_${t}`,
          needIndent: () => r.needIndent
        }
      }(t, {
        filename: o,
        breakLineCode: i,
        needIndent: a
      });
    s.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), r.length > 0 && (s.push(
        `const { ${A(r.map(t=>`${t}: _${t}`),", ")} } = ctx`), s.newline()), s.push("return "), dt(s, t), s
      .deindent(a), s.push("}"), delete t.helpers;
    const {
      code: l,
      map: c
    } = s.context();
    return {
      ast: t,
      code: l,
      map: c ? c.toJSON() : void 0
    }
  })(r, n))
}

function pt(t) {
  return C(t) && 0 === vt(t) && (v(t, "b") || v(t, "body"))
}
const bt = ["b", "body"];
const mt = ["c", "cases"];
const gt = ["s", "static"];
const ft = ["i", "items"];
const ht = ["t", "type"];

function vt(t) {
  return Ct(t, ht)
}
const yt = ["v", "value"];

function kt(t, e) {
  const n = Ct(t, yt);
  if (null != n) return n;
  throw Tt(e)
}
const xt = ["m", "modifier"];
const wt = ["k", "key"];

function Ct(t, e, n) {
  for (let o = 0; o < e.length; o++) {
    const n = e[o];
    if (v(t, n) && null != t[n]) return t[n]
  }
  return n
}
const St = [...bt, ...mt, ...gt, ...ft, ...wt, ...xt, ...yt, ...ht];

function Tt(t) {
  return new Error(`unhandled node type: ${t}`)
}

function It(t) {
  return e => function(t, e) {
    const n = (o = e, Ct(o, bt));
    var o;
    if (null == n) throw Tt(0);
    if (1 === vt(n)) {
      const e = function(t) {
        return Ct(t, mt, [])
      }(n);
      return t.plural(e.reduce((e, n) => [...e, At(t, n)], []))
    }
    return At(t, n)
  }(e, t)
}

function At(t, e) {
  const n = function(t) {
    return Ct(t, gt)
  }(e);
  if (null != n) return "text" === t.type ? n : t.normalize([n]);
  {
    const n = function(t) {
      return Ct(t, ft, [])
    }(e).reduce((e, n) => [...e, Et(t, n)], []);
    return t.normalize(n)
  }
}

function Et(t, e) {
  const n = vt(e);
  switch (n) {
    case 3:
    case 9:
    case 7:
    case 8:
      return kt(e, n);
    case 4: {
      const o = e;
      if (v(o, "k") && o.k) return t.interpolate(t.named(o.k));
      if (v(o, "key") && o.key) return t.interpolate(t.named(o.key));
      throw Tt(n)
    }
    case 5: {
      const o = e;
      if (v(o, "i") && c(o.i)) return t.interpolate(t.list(o.i));
      if (v(o, "index") && c(o.index)) return t.interpolate(t.list(o.index));
      throw Tt(n)
    }
    case 6: {
      const n = e,
        o = function(t) {
          return Ct(t, xt)
        }(n),
        i = function(t) {
          const e = Ct(t, wt);
          if (e) return e;
          throw Tt(6)
        }(n);
      return t.linked(Et(t, i), o ? Et(t, o) : void 0, t.type)
    }
    default:
      throw new Error(`unhandled node on format message part: ${n}`)
  }
}
const Pt = t => t;
let Ot = m();
const Mt = 17,
  Lt = 18,
  _t = 19,
  Bt = 21,
  Ft = 22,
  Rt = 23;

function Dt(t) {
  return K(t, null, void 0)
}

function Vt(t, e) {
  return null != e.locale ? $t(e.locale) : $t(t.locale)
}
let Nt;

function $t(t) {
  if (x(t)) return t;
  if (k(t)) {
    if (t.resolvedOnce && null != Nt) return Nt;
    if ("Function" === t.constructor.name) {
      const n = t();
      if (C(e = n) && k(e.then) && k(e.catch)) throw Dt(Bt);
      return Nt = n
    }
    throw Dt(Ft)
  }
  throw Dt(Rt);
  var e
}

function zt(t, e, n) {
  return [...new Set([n, ...y(e) ? e : C(e) ? Object.keys(e) : x(e) ? [e] : [n]])]
}

function Ut(t, e, n) {
  const o = x(n) ? n : Zt,
    i = t;
  i.__localeChainCache || (i.__localeChainCache = new Map);
  let a = i.__localeChainCache.get(o);
  if (!a) {
    a = [];
    let t = [n];
    for (; y(t);) t = jt(a, t, e);
    const r = y(e) || !I(e) ? e : e.default ? e.default : null;
    t = x(r) ? [r] : r, y(t) && jt(a, t, !1), i.__localeChainCache.set(o, a)
  }
  return a
}

function jt(t, e, n) {
  let o = !0;
  for (let i = 0; i < e.length && w(o); i++) {
    const a = e[i];
    x(a) && (o = Ht(t, e[i], n))
  }
  return o
}

function Ht(t, e, n) {
  let o;
  const i = e.split("-");
  do {
    o = Gt(t, i.join("-"), n), i.splice(-1, 1)
  } while (i.length && !0 === o);
  return o
}

function Gt(t, e, n) {
  let o = !1;
  if (!t.includes(e) && (o = !0, e)) {
    o = "!" !== e[e.length - 1];
    const i = e.replace(/!/g, "");
    t.push(i), (y(n) || I(n)) && n[i] && (o = n[i])
  }
  return o
}
const Kt = [];
Kt[0] = {
  w: [0],
  i: [3, 0],
  "[": [4],
  o: [7]
}, Kt[1] = {
  w: [1],
  ".": [2],
  "[": [4],
  o: [7]
}, Kt[2] = {
  w: [2],
  i: [3, 0],
  0: [3, 0]
}, Kt[3] = {
  i: [3, 0],
  0: [3, 0],
  w: [1, 1],
  ".": [2, 1],
  "[": [4, 1],
  o: [7, 1]
}, Kt[4] = {
  "'": [5, 0],
  '"': [6, 0],
  "[": [4, 2],
  "]": [1, 3],
  o: 8,
  l: [4, 0]
}, Kt[5] = {
  "'": [4, 0],
  o: 8,
  l: [5, 0]
}, Kt[6] = {
  '"': [4, 0],
  o: 8,
  l: [6, 0]
};
const Wt = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function qt(t) {
  if (null == t) return "o";
  switch (t.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return t;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w"
  }
  return "i"
}

function Yt(t) {
  const e = t.trim();
  return ("0" !== t.charAt(0) || !isNaN(parseInt(t))) && (n = e, Wt.test(n) ? function(t) {
    const e = t.charCodeAt(0);
    return e !== t.charCodeAt(t.length - 1) || 34 !== e && 39 !== e ? t : t.slice(1, -1)
  }(e) : "*" + e);
  var n
}
const Xt = new Map;

function Jt(t, e) {
  return C(t) ? t[e] : null
}
const Zt = "en-US",
  Qt = t => `${t.charAt(0).toLocaleUpperCase()}${t.substr(1)}`;
let te, ee, ne;
let oe = null;
const ie = t => {
  oe = t
};
let ae = 0;

function re(t = {}) {
  const e = k(t.onWarn) ? t.onWarn : a,
    n = x(t.version) ? t.version : "11.1.12",
    o = x(t.locale) || k(t.locale) ? t.locale : Zt,
    i = k(o) ? Zt : o,
    r = y(t.fallbackLocale) || I(t.fallbackLocale) || x(t.fallbackLocale) || !1 === t.fallbackLocale ? t
    .fallbackLocale : i,
    s = I(t.messages) ? t.messages : se(i),
    l = I(t.datetimeFormats) ? t.datetimeFormats : se(i),
    c = I(t.numberFormats) ? t.numberFormats : se(i),
    u = p(m(), t.modifiers, {
      upper: (t, e) => "text" === e && x(t) ? t.toUpperCase() : "vnode" === e && C(t) && "__v_isVNode" in t ? t
        .children.toUpperCase() : t,
      lower: (t, e) => "text" === e && x(t) ? t.toLowerCase() : "vnode" === e && C(t) && "__v_isVNode" in t ? t
        .children.toLowerCase() : t,
      capitalize: (t, e) => "text" === e && x(t) ? Qt(t) : "vnode" === e && C(t) && "__v_isVNode" in t ? Qt(t
        .children) : t
    }),
    b = t.pluralRules || m(),
    g = k(t.missing) ? t.missing : null,
    f = !w(t.missingWarn) && !d(t.missingWarn) || t.missingWarn,
    h = !w(t.fallbackWarn) && !d(t.fallbackWarn) || t.fallbackWarn,
    v = !!t.fallbackFormat,
    S = !!t.unresolving,
    T = k(t.postTranslation) ? t.postTranslation : null,
    A = I(t.processor) ? t.processor : null,
    E = !w(t.warnHtmlMessage) || t.warnHtmlMessage,
    P = !!t.escapeParameter,
    O = k(t.messageCompiler) ? t.messageCompiler : te,
    M = k(t.messageResolver) ? t.messageResolver : ee || Jt,
    L = k(t.localeFallbacker) ? t.localeFallbacker : ne || zt,
    _ = C(t.fallbackContext) ? t.fallbackContext : void 0,
    B = t,
    F = C(B.__datetimeFormatters) ? B.__datetimeFormatters : new Map,
    R = C(B.__numberFormatters) ? B.__numberFormatters : new Map,
    D = C(B.__meta) ? B.__meta : {};
  ae++;
  const V = {
    version: n,
    cid: ae,
    locale: o,
    fallbackLocale: r,
    messages: s,
    modifiers: u,
    pluralRules: b,
    missing: g,
    missingWarn: f,
    fallbackWarn: h,
    fallbackFormat: v,
    unresolving: S,
    postTranslation: T,
    processor: A,
    warnHtmlMessage: E,
    escapeParameter: P,
    messageCompiler: O,
    messageResolver: M,
    localeFallbacker: L,
    fallbackContext: _,
    onWarn: e,
    __meta: D
  };
  return V.datetimeFormats = l, V.numberFormats = c, V.__datetimeFormatters = F, V.__numberFormatters = R, V
}
const se = t => ({
  [t]: m()
});

function le(t, e, n, o, i) {
  const {
    missing: a,
    onWarn: r
  } = t;
  if (null !== a) {
    const o = a(t, n, e, i);
    return x(o) ? o : e
  }
  return e
}

function ce(t, e, n) {
  t.__localeChainCache = new Map, t.localeFallbacker(t, n, e)
}

function de(t, e) {
  return t !== e && t.split("-")[0] === e.split("-")[0]
}

function ue(t, e) {
  const n = e.indexOf(t);
  if (-1 === n) return !1;
  for (let o = n + 1; o < e.length; o++)
    if (de(t, e[o])) return !0;
  return !1
}

function pe(t, ...e) {
  const {
    datetimeFormats: n,
    unresolving: o,
    fallbackLocale: i,
    onWarn: a,
    localeFallbacker: r
  } = t, {
    __datetimeFormatters: s
  } = t, [l, c, d, b] = me(...e);
  w(d.missingWarn) ? d.missingWarn : t.missingWarn;
  w(d.fallbackWarn) ? d.fallbackWarn : t.fallbackWarn;
  const m = !!d.part,
    g = Vt(t, d),
    f = r(t, i, g);
  if (!x(l) || "" === l) return new Intl.DateTimeFormat(g, b).format(c);
  let h, v = {},
    y = null;
  for (let u = 0; u < f.length && (h = f[u], v = n[h] || {}, y = v[l], !I(y)); u++) le(t, l, h, 0, "datetime format");
  if (!I(y) || !x(h)) return o ? -1 : l;
  let k = `${h}__${l}`;
  u(b) || (k = `${k}__${JSON.stringify(b)}`);
  let C = s.get(k);
  return C || (C = new Intl.DateTimeFormat(h, p({}, y, b)), s.set(k, C)), m ? C.formatToParts(c) : C.format(c)
}
const be = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName",
  "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem",
  "hourCycle", "fractionalSecondDigits"
];

function me(...t) {
  const [e, n, o, i] = t, a = m();
  let r, s = m();
  if (x(e)) {
    const t = e.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!t) throw Dt(_t);
    const n = t[3] ? t[3].trim().startsWith("T") ? `${t[1].trim()}${t[3].trim()}` : `${t[1].trim()}T${t[3].trim()}` : t[
      1].trim();
    r = new Date(n);
    try {
      r.toISOString()
    } catch {
      throw Dt(_t)
    }
  } else if ("[object Date]" === T(e)) {
    if (isNaN(e.getTime())) throw Dt(Lt);
    r = e
  } else {
    if (!c(e)) throw Dt(Mt);
    r = e
  }
  return x(n) ? a.key = n : I(n) && Object.keys(n).forEach(t => {
    be.includes(t) ? s[t] = n[t] : a[t] = n[t]
  }), x(o) ? a.locale = o : I(o) && (s = o), I(i) && (s = i), [a.key || "", r, a, s]
}

function ge(t, e, n) {
  const o = t;
  for (const i in n) {
    const t = `${e}__${i}`;
    o.__datetimeFormatters.has(t) && o.__datetimeFormatters.delete(t)
  }
}

function fe(t, ...e) {
  const {
    numberFormats: n,
    unresolving: o,
    fallbackLocale: i,
    onWarn: a,
    localeFallbacker: r
  } = t, {
    __numberFormatters: s
  } = t, [l, c, d, b] = ve(...e);
  w(d.missingWarn) ? d.missingWarn : t.missingWarn;
  w(d.fallbackWarn) ? d.fallbackWarn : t.fallbackWarn;
  const m = !!d.part,
    g = Vt(t, d),
    f = r(t, i, g);
  if (!x(l) || "" === l) return new Intl.NumberFormat(g, b).format(c);
  let h, v = {},
    y = null;
  for (let u = 0; u < f.length && (h = f[u], v = n[h] || {}, y = v[l], !I(y)); u++) le(t, l, h, 0, "number format");
  if (!I(y) || !x(h)) return o ? -1 : l;
  let k = `${h}__${l}`;
  u(b) || (k = `${k}__${JSON.stringify(b)}`);
  let C = s.get(k);
  return C || (C = new Intl.NumberFormat(h, p({}, y, b)), s.set(k, C)), m ? C.formatToParts(c) : C.format(c)
}
const he = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping",
  "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits",
  "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode",
  "roundingPriority", "roundingIncrement", "trailingZeroDisplay"
];

function ve(...t) {
  const [e, n, o, i] = t, a = m();
  let r = m();
  if (!c(e)) throw Dt(Mt);
  const s = e;
  return x(n) ? a.key = n : I(n) && Object.keys(n).forEach(t => {
    he.includes(t) ? r[t] = n[t] : a[t] = n[t]
  }), x(o) ? a.locale = o : I(o) && (r = o), I(i) && (r = i), [a.key || "", s, a, r]
}

function ye(t, e, n) {
  const o = t;
  for (const i in n) {
    const t = `${e}__${i}`;
    o.__numberFormatters.has(t) && o.__numberFormatters.delete(t)
  }
}
const ke = t => t,
  xe = t => "",
  we = t => 0 === t.length ? "" : A(t),
  Ce = t => null == t ? "" : y(t) || I(t) && t.toString === S ? JSON.stringify(t, null, 2) : String(t);

function Se(t, e) {
  return t = Math.abs(t), 2 === e ? t ? t > 1 ? 1 : 0 : 1 : t ? Math.min(t, 2) : 0
}

function Te(t = {}) {
  const e = t.locale,
    n = function(t) {
      const e = c(t.pluralIndex) ? t.pluralIndex : -1;
      return t.named && (c(t.named.count) || c(t.named.n)) ? c(t.named.count) ? t.named.count : c(t.named.n) ? t.named
        .n : e : e
    }(t),
    o = C(t.pluralRules) && x(e) && k(t.pluralRules[e]) ? t.pluralRules[e] : Se,
    i = C(t.pluralRules) && x(e) && k(t.pluralRules[e]) ? Se : void 0,
    a = t.list || [],
    r = t.named || m();
  c(t.pluralIndex) && function(t, e) {
    e.count || (e.count = t), e.n || (e.n = t)
  }(n, r);

  function s(e, n) {
    const o = k(t.messages) ? t.messages(e, !!n) : !!C(t.messages) && t.messages[e];
    return o || (t.parent ? t.parent.message(e) : xe)
  }
  const l = I(t.processor) && k(t.processor.normalize) ? t.processor.normalize : we,
    d = I(t.processor) && k(t.processor.interpolate) ? t.processor.interpolate : Ce,
    u = {
      list: t => a[t],
      named: t => r[t],
      plural: t => t[o(n, t.length, i)],
      linked: (e, ...n) => {
        const [o, i] = n;
        let a = "text",
          r = "";
        1 === n.length ? C(o) ? (r = o.modifier || r, a = o.type || a) : x(o) && (r = o || r) : 2 === n.length && (x(
          o) && (r = o || r), x(i) && (a = i || a));
        const l = s(e, !0)(u),
          c = "vnode" === a && y(l) && r ? l[0] : l;
        return r ? (d = r, t.modifiers ? t.modifiers[d] : ke)(c, a) : c;
        var d
      },
      message: s,
      type: I(t.processor) && x(t.processor.type) ? t.processor.type : "text",
      interpolate: d,
      normalize: l,
      values: p(m(), a, r)
    };
  return u
}
const Ie = () => "",
  Ae = t => k(t);

function Ee(t, ...e) {
  const {
    fallbackFormat: n,
    postTranslation: o,
    unresolving: i,
    messageCompiler: a,
    fallbackLocale: r,
    messages: s
  } = t, [l, d] = Me(...e), u = w(d.missingWarn) ? d.missingWarn : t.missingWarn, p = w(d.fallbackWarn) ? d
    .fallbackWarn : t.fallbackWarn, b = w(d.escapeParameter) ? d.escapeParameter : t.escapeParameter, h = !!d
    .resolvedMessage, v = x(d.default) || w(d.default) ? w(d.default) ? a ? l : () => l : d.default : n ? a ? l : () =>
    l : null, S = n || null != v && (x(v) || k(v)), T = Vt(t, d);
  b && function(t) {
    y(t.list) ? t.list = t.list.map(t => x(t) ? g(t) : t) : C(t.named) && Object.keys(t.named).forEach(e => {
      x(t.named[e]) && (t.named[e] = g(t.named[e]))
    })
  }(d);
  let [I, A, E] = h ? [l, T, s[T] || m()] : Pe(t, l, T, r, p, u), P = I, O = l;
  if (h || x(P) || pt(P) || Ae(P) || S && (P = v, O = P), !(h || (x(P) || pt(P) || Ae(P)) && x(A))) return i ? -1 : l;
  let M = !1;
  const L = Ae(P) ? P : Oe(t, l, A, P, O, () => {
    M = !0
  });
  if (M) return P;
  const _ = function(t, e, n, o) {
      const {
        modifiers: i,
        pluralRules: a,
        messageResolver: r,
        fallbackLocale: s,
        fallbackWarn: l,
        missingWarn: d,
        fallbackContext: u
      } = t, p = (o, i) => {
        let a = r(n, o);
        if (null == a && (u || i)) {
          const [, , n] = Pe(u || t, o, e, s, l, d);
          a = r(n, o)
        }
        if (x(a) || pt(a)) {
          let n = !1;
          const i = Oe(t, o, e, a, o, () => {
            n = !0
          });
          return n ? Ie : i
        }
        return Ae(a) ? a : Ie
      }, b = {
        locale: e,
        modifiers: i,
        pluralRules: a,
        messages: p
      };
      t.processor && (b.processor = t.processor);
      o.list && (b.list = o.list);
      o.named && (b.named = o.named);
      c(o.plural) && (b.pluralIndex = o.plural);
      return b
    }(t, A, E, d),
    B = function(t, e, n) {
      const o = e(n);
      return o
    }(0, L, Te(_));
  let F = o ? o(B, l) : B;
  var R;
  return b && x(F) && (R = (R = (R = F).replace(/(\w+)\s*=\s*"([^"]*)"/g, (t, e, n) => `${e}="${f(n)}"`)).replace(
    /(\w+)\s*=\s*'([^']*)'/g, (t, e, n) => `${e}='${f(n)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(R) && (R = R
    .replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach(t => {
    R = R.replace(t, "$1javascript&#58;")
  }), F = R), F
}

function Pe(t, e, n, o, i, a) {
  const {
    messages: r,
    onWarn: s,
    messageResolver: l,
    localeFallbacker: c
  } = t, d = c(t, o, n);
  let u, p = m(),
    b = null;
  for (let g = 0; g < d.length && (u = d[g], p = r[u] || m(), null === (b = l(p, e)) && (b = p[e]), !(x(b) || pt(b) ||
      Ae(b))); g++)
    if (!ue(u, d)) {
      const n = le(t, e, u, 0, "translate");
      n !== e && (b = n)
    } return [b, u, p]
}

function Oe(t, e, n, o, i, a) {
  const {
    messageCompiler: r,
    warnHtmlMessage: s
  } = t;
  if (Ae(o)) {
    const t = o;
    return t.locale = t.locale || n, t.key = t.key || e, t
  }
  if (null == r) {
    const t = () => o;
    return t.locale = n, t.key = e, t
  }
  const c = r(o, function(t, e, n, o, i, a) {
    return {
      locale: e,
      key: n,
      warnHtmlMessage: i,
      onError: t => {
        throw a && a(t), t
      },
      onCacheKey: t => ((t, e, n) => l({
        l: t,
        k: e,
        s: n
      }))(e, n, t)
    }
  }(0, n, i, 0, s, a));
  return c.locale = n, c.key = e, c.source = o, c
}

function Me(...t) {
  const [e, n, o] = t, i = m();
  if (!(x(e) || c(e) || Ae(e) || pt(e))) throw Dt(Mt);
  const a = c(e) ? String(e) : (Ae(e), e);
  return c(n) ? i.plural = n : x(n) ? i.default = n : I(n) && !u(n) ? i.named = n : y(n) && (i.list = n), c(o) ? i
    .plural = o : x(o) ? i.default = o : I(o) && p(i, o), [a, i]
}

function Le(t) {
  const e = Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return t => t in e
}
const _e = {},
  Be = [],
  Fe = () => {},
  Re = () => !1,
  De = t => 111 === t.charCodeAt(0) && 110 === t.charCodeAt(1) && (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
  Ve = t => t.startsWith("onUpdate:"),
  Ne = Object.assign,
  $e = (t, e) => {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
  },
  ze = Object.prototype.hasOwnProperty,
  Ue = (t, e) => ze.call(t, e),
  je = Array.isArray,
  He = t => "[object Map]" === Ze(t),
  Ge = t => "[object Set]" === Ze(t),
  Ke = t => "function" == typeof t,
  We = t => "string" == typeof t,
  qe = t => "symbol" == typeof t,
  Ye = t => null !== t && "object" == typeof t,
  Xe = t => (Ye(t) || Ke(t)) && Ke(t.then) && Ke(t.catch),
  Je = Object.prototype.toString,
  Ze = t => Je.call(t),
  Qe = t => "[object Object]" === Ze(t),
  tn = t => We(t) && "NaN" !== t && "-" !== t[0] && "" + parseInt(t, 10) === t,
  en = Le(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
  nn = t => {
    const e = Object.create(null);
    return n => e[n] || (e[n] = t(n))
  },
  on = /-\w/g,
  an = nn(t => t.replace(on, t => t.slice(1).toUpperCase())),
  rn = /\B([A-Z])/g,
  sn = nn(t => t.replace(rn, "-$1").toLowerCase()),
  ln = nn(t => t.charAt(0).toUpperCase() + t.slice(1)),
  cn = nn(t => t ? `on${ln(t)}` : ""),
  dn = (t, e) => !Object.is(t, e),
  un = (t, ...e) => {
    for (let n = 0; n < t.length; n++) t[n](...e)
  },
  pn = (t, e, n, o = !1) => {
    Object.defineProperty(t, e, {
      configurable: !0,
      enumerable: !1,
      writable: o,
      value: n
    })
  },
  bn = t => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e
  };
let mn;
const gn = () => mn || (mn = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self :
  "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});

function fn(t) {
  if (je(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const o = t[n],
        i = We(o) ? kn(o) : fn(o);
      if (i)
        for (const t in i) e[t] = i[t]
    }
    return e
  }
  if (We(t) || Ye(t)) return t
}
const hn = /;(?![^(]*\))/g,
  vn = /:([^]+)/,
  yn = /\/\*[^]*?\*\//g;

function kn(t) {
  const e = {};
  return t.replace(yn, "").split(hn).forEach(t => {
    if (t) {
      const n = t.split(vn);
      n.length > 1 && (e[n[0].trim()] = n[1].trim())
    }
  }), e
}

function xn(t) {
  let e = "";
  if (We(t)) e = t;
  else if (je(t))
    for (let n = 0; n < t.length; n++) {
      const o = xn(t[n]);
      o && (e += o + " ")
    } else if (Ye(t))
      for (const n in t) t[n] && (e += n + " ");
  return e.trim()
}

function wn(t) {
  if (!t) return null;
  let {
    class: e,
    style: n
  } = t;
  return e && !We(e) && (t.class = xn(e)), n && (t.style = fn(n)), t
}
const Cn = Le("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function Sn(t) {
  return !!t || "" === t
}
const Tn = t => !(!t || !0 !== t.__v_isRef),
  In = t => We(t) ? t : null == t ? "" : je(t) || Ye(t) && (t.toString === Je || !Ke(t.toString)) ? Tn(t) ? In(t
  .value) : JSON.stringify(t, An, 2) : String(t),
  An = (t, e) => Tn(e) ? An(t, e.value) : He(e) ? {
    [`Map(${e.size})`]: [...e.entries()].reduce((t, [e, n], o) => (t[En(e, o) + " =>"] = n, t), {})
  } : Ge(e) ? {
    [`Set(${e.size})`]: [...e.values()].map(t => En(t))
  } : qe(e) ? En(e) : !Ye(e) || je(e) || Qe(e) ? e : String(e),
  En = (t, e = "") => {
    var n;
    return qe(t) ? `Symbol(${null!=(n=t.description)?n:e})` : t
  };
let Pn, On;
class Mn {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1,
      this.parent = Pn, !t && Pn && (this.index = (Pn.scopes || (Pn.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  pause() {
    if (this._active) {
      let t, e;
      if (this._isPaused = !0, this.scopes)
        for (t = 0, e = this.scopes.length; t < e; t++) this.scopes[t].pause();
      for (t = 0, e = this.effects.length; t < e; t++) this.effects[t].pause()
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      let t, e;
      if (this._isPaused = !1, this.scopes)
        for (t = 0, e = this.scopes.length; t < e; t++) this.scopes[t].resume();
      for (t = 0, e = this.effects.length; t < e; t++) this.effects[t].resume()
    }
  }
  run(t) {
    if (this._active) {
      const e = Pn;
      try {
        return Pn = this, t()
      } finally {
        Pn = e
      }
    }
  }
  on() {
    1 === ++this._on && (this.prevScope = Pn, Pn = this)
  }
  off() {
    this._on > 0 && 0 === --this._on && (Pn = this.prevScope, this.prevScope = void 0)
  }
  stop(t) {
    if (this._active) {
      let e, n;
      for (this._active = !1, e = 0, n = this.effects.length; e < n; e++) this.effects[e].stop();
      for (this.effects.length = 0, e = 0, n = this.cleanups.length; e < n; e++) this.cleanups[e]();
      if (this.cleanups.length = 0, this.scopes) {
        for (e = 0, n = this.scopes.length; e < n; e++) this.scopes[e].stop(!0);
        this.scopes.length = 0
      }
      if (!this.detached && this.parent && !t) {
        const t = this.parent.scopes.pop();
        t && t !== this && (this.parent.scopes[this.index] = t, t.index = this.index)
      }
      this.parent = void 0
    }
  }
}

function Ln(t) {
  return new Mn(t)
}
const _n = new WeakSet;
class Bn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup =
      void 0, this.scheduler = void 0, Pn && Pn.active && Pn.effects.push(this)
  }
  pause() {
    this.flags |= 64
  }
  resume() {
    64 & this.flags && (this.flags &= -65, _n.has(this) && (_n.delete(this), this.trigger()))
  }
  notify() {
    2 & this.flags && !(32 & this.flags) || 8 & this.flags || Vn(this)
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, Jn(this), zn(this);
    const t = On,
      e = Wn;
    On = this, Wn = !0;
    try {
      return this.fn()
    } finally {
      Un(this), On = t, Wn = e, this.flags &= -3
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let t = this.deps; t; t = t.nextDep) Gn(t);
      this.deps = this.depsTail = void 0, Jn(this), this.onStop && this.onStop(), this.flags &= -2
    }
  }
  trigger() {
    64 & this.flags ? _n.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
  }
  runIfDirty() {
    jn(this) && this.run()
  }
  get dirty() {
    return jn(this)
  }
}
let Fn, Rn, Dn = 0;

function Vn(t, e = !1) {
  if (t.flags |= 8, e) return t.next = Rn, void(Rn = t);
  t.next = Fn, Fn = t
}

function Nn() {
  Dn++
}

function $n() {
  if (--Dn > 0) return;
  if (Rn) {
    let t = Rn;
    for (Rn = void 0; t;) {
      const e = t.next;
      t.next = void 0, t.flags &= -9, t = e
    }
  }
  let t;
  for (; Fn;) {
    let n = Fn;
    for (Fn = void 0; n;) {
      const o = n.next;
      if (n.next = void 0, n.flags &= -9, 1 & n.flags) try {
        n.trigger()
      } catch (e) {
        t || (t = e)
      }
      n = o
    }
  }
  if (t) throw t
}

function zn(t) {
  for (let e = t.deps; e; e = e.nextDep) e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e
}

function Un(t) {
  let e, n = t.depsTail,
    o = n;
  for (; o;) {
    const t = o.prevDep; - 1 === o.version ? (o === n && (n = t), Gn(o), Kn(o)) : e = o, o.dep.activeLink = o
      .prevActiveLink, o.prevActiveLink = void 0, o = t
  }
  t.deps = e, t.depsTail = n
}

function jn(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Hn(e.dep.computed) || e.dep.version !== e.version)) return !0;
  return !!t._dirty
}

function Hn(t) {
  if (4 & t.flags && !(16 & t.flags)) return;
  if (t.flags &= -17, t.globalVersion === Zn) return;
  if (t.globalVersion = Zn, !t.isSSR && 128 & t.flags && (!t.deps && !t._dirty || !jn(t))) return;
  t.flags |= 2;
  const e = t.dep,
    n = On,
    o = Wn;
  On = t, Wn = !0;
  try {
    zn(t);
    const n = t.fn(t._value);
    (0 === e.version || dn(n, t._value)) && (t.flags |= 128, t._value = n, e.version++)
  } catch (i) {
    throw e.version++, i
  } finally {
    On = n, Wn = o, Un(t), t.flags &= -3
  }
}

function Gn(t, e = !1) {
  const {
    dep: n,
    prevSub: o,
    nextSub: i
  } = t;
  if (o && (o.nextSub = i, t.prevSub = void 0), i && (i.prevSub = o, t.nextSub = void 0), n.subs === t && (n.subs = o, !
      o && n.computed)) {
    n.computed.flags &= -5;
    for (let t = n.computed.deps; t; t = t.nextDep) Gn(t, !0)
  }
  e || --n.sc || !n.map || n.map.delete(n.key)
}

function Kn(t) {
  const {
    prevDep: e,
    nextDep: n
  } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0)
}
let Wn = !0;
const qn = [];

function Yn() {
  qn.push(Wn), Wn = !1
}

function Xn() {
  const t = qn.pop();
  Wn = void 0 === t || t
}

function Jn(t) {
  const {
    cleanup: e
  } = t;
  if (t.cleanup = void 0, e) {
    const t = On;
    On = void 0;
    try {
      e()
    } finally {
      On = t
    }
  }
}
let Zn = 0;
class Qn {
  constructor(t, e) {
    this.sub = t, this.dep = e, this.version = e.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub =
      this.prevActiveLink = void 0
  }
}
class to {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key =
      void 0, this.sc = 0, this.__v_skip = !0
  }
  track(t) {
    if (!On || !Wn || On === this.computed) return;
    let e = this.activeLink;
    if (void 0 === e || e.sub !== On) e = this.activeLink = new Qn(On, this), On.deps ? (e.prevDep = On.depsTail, On
      .depsTail.nextDep = e, On.depsTail = e) : On.deps = On.depsTail = e, eo(e);
    else if (-1 === e.version && (e.version = this.version, e.nextDep)) {
      const t = e.nextDep;
      t.prevDep = e.prevDep, e.prevDep && (e.prevDep.nextDep = t), e.prevDep = On.depsTail, e.nextDep = void 0, On
        .depsTail.nextDep = e, On.depsTail = e, On.deps === e && (On.deps = t)
    }
    return e
  }
  trigger(t) {
    this.version++, Zn++, this.notify(t)
  }
  notify(t) {
    Nn();
    try {
      0;
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify()
    } finally {
      $n()
    }
  }
}

function eo(t) {
  if (t.dep.sc++, 4 & t.sub.flags) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let t = e.deps; t; t = t.nextDep) eo(t)
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t
  }
}
const no = new WeakMap,
  oo = Symbol(""),
  io = Symbol(""),
  ao = Symbol("");

function ro(t, e, n) {
  if (Wn && On) {
    let e = no.get(t);
    e || no.set(t, e = new Map);
    let o = e.get(n);
    o || (e.set(n, o = new to), o.map = e, o.key = n), o.track()
  }
}

function so(t, e, n, o, i, a) {
  const r = no.get(t);
  if (!r) return void Zn++;
  const s = t => {
    t && t.trigger()
  };
  if (Nn(), "clear" === e) r.forEach(s);
  else {
    const i = je(t),
      a = i && tn(n);
    if (i && "length" === n) {
      const t = Number(o);
      r.forEach((e, n) => {
        ("length" === n || n === ao || !qe(n) && n >= t) && s(e)
      })
    } else switch ((void 0 !== n || r.has(void 0)) && s(r.get(n)), a && s(r.get(ao)), e) {
      case "add":
        i ? a && s(r.get("length")) : (s(r.get(oo)), He(t) && s(r.get(io)));
        break;
      case "delete":
        i || (s(r.get(oo)), He(t) && s(r.get(io)));
        break;
      case "set":
        He(t) && s(r.get(oo))
    }
  }
  $n()
}

function lo(t) {
  const e = Wo(t);
  return e === t ? e : (ro(e, 0, ao), Go(t) ? e : e.map(Yo))
}

function co(t) {
  return ro(t = Wo(t), 0, ao), t
}
const uo = {
  __proto__: null,
  [Symbol.iterator]() {
    return po(this, Symbol.iterator, Yo)
  },
  concat(...t) {
    return lo(this).concat(...t.map(t => je(t) ? lo(t) : t))
  },
  entries() {
    return po(this, "entries", t => (t[1] = Yo(t[1]), t))
  },
  every(t, e) {
    return mo(this, "every", t, e, void 0, arguments)
  },
  filter(t, e) {
    return mo(this, "filter", t, e, t => t.map(Yo), arguments)
  },
  find(t, e) {
    return mo(this, "find", t, e, Yo, arguments)
  },
  findIndex(t, e) {
    return mo(this, "findIndex", t, e, void 0, arguments)
  },
  findLast(t, e) {
    return mo(this, "findLast", t, e, Yo, arguments)
  },
  findLastIndex(t, e) {
    return mo(this, "findLastIndex", t, e, void 0, arguments)
  },
  forEach(t, e) {
    return mo(this, "forEach", t, e, void 0, arguments)
  },
  includes(...t) {
    return fo(this, "includes", t)
  },
  indexOf(...t) {
    return fo(this, "indexOf", t)
  },
  join(t) {
    return lo(this).join(t)
  },
  lastIndexOf(...t) {
    return fo(this, "lastIndexOf", t)
  },
  map(t, e) {
    return mo(this, "map", t, e, void 0, arguments)
  },
  pop() {
    return ho(this, "pop")
  },
  push(...t) {
    return ho(this, "push", t)
  },
  reduce(t, ...e) {
    return go(this, "reduce", t, e)
  },
  reduceRight(t, ...e) {
    return go(this, "reduceRight", t, e)
  },
  shift() {
    return ho(this, "shift")
  },
  some(t, e) {
    return mo(this, "some", t, e, void 0, arguments)
  },
  splice(...t) {
    return ho(this, "splice", t)
  },
  toReversed() {
    return lo(this).toReversed()
  },
  toSorted(t) {
    return lo(this).toSorted(t)
  },
  toSpliced(...t) {
    return lo(this).toSpliced(...t)
  },
  unshift(...t) {
    return ho(this, "unshift", t)
  },
  values() {
    return po(this, "values", Yo)
  }
};

function po(t, e, n) {
  const o = co(t),
    i = o[e]();
  return o === t || Go(t) || (i._next = i.next, i.next = () => {
    const t = i._next();
    return t.done || (t.value = n(t.value)), t
  }), i
}
const bo = Array.prototype;

function mo(t, e, n, o, i, a) {
  const r = co(t),
    s = r !== t && !Go(t),
    l = r[e];
  if (l !== bo[e]) {
    const e = l.apply(t, a);
    return s ? Yo(e) : e
  }
  let c = n;
  r !== t && (s ? c = function(e, o) {
    return n.call(this, Yo(e), o, t)
  } : n.length > 2 && (c = function(e, o) {
    return n.call(this, e, o, t)
  }));
  const d = l.call(r, c, o);
  return s && i ? i(d) : d
}

function go(t, e, n, o) {
  const i = co(t);
  let a = n;
  return i !== t && (Go(t) ? n.length > 3 && (a = function(e, o, i) {
    return n.call(this, e, o, i, t)
  }) : a = function(e, o, i) {
    return n.call(this, e, Yo(o), i, t)
  }), i[e](a, ...o)
}

function fo(t, e, n) {
  const o = Wo(t);
  ro(o, 0, ao);
  const i = o[e](...n);
  return -1 !== i && !1 !== i || !Ko(n[0]) ? i : (n[0] = Wo(n[0]), o[e](...n))
}

function ho(t, e, n = []) {
  Yn(), Nn();
  const o = Wo(t)[e].apply(t, n);
  return $n(), Xn(), o
}
const vo = Le("__proto__,__v_isRef,__isVue"),
  yo = new Set(Object.getOwnPropertyNames(Symbol).filter(t => "arguments" !== t && "caller" !== t).map(t => Symbol[t])
    .filter(qe));

function ko(t) {
  qe(t) || (t = String(t));
  const e = Wo(this);
  return ro(e, 0, t), e.hasOwnProperty(t)
}
class xo {
  constructor(t = !1, e = !1) {
    this._isReadonly = t, this._isShallow = e
  }
  get(t, e, n) {
    if ("__v_skip" === e) return t.__v_skip;
    const o = this._isReadonly,
      i = this._isShallow;
    if ("__v_isReactive" === e) return !o;
    if ("__v_isReadonly" === e) return o;
    if ("__v_isShallow" === e) return i;
    if ("__v_raw" === e) return n === (o ? i ? Vo : Do : i ? Ro : Fo).get(t) || Object.getPrototypeOf(t) === Object
      .getPrototypeOf(n) ? t : void 0;
    const a = je(t);
    if (!o) {
      let t;
      if (a && (t = uo[e])) return t;
      if ("hasOwnProperty" === e) return ko
    }
    const r = Reflect.get(t, e, Jo(t) ? t : n);
    if (qe(e) ? yo.has(e) : vo(e)) return r;
    if (o || ro(t, 0, e), i) return r;
    if (Jo(r)) {
      const t = a && tn(e) ? r : r.value;
      return o && Ye(t) ? zo(t) : t
    }
    return Ye(r) ? o ? zo(r) : $o(r) : r
  }
}
class wo extends xo {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, e, n, o) {
    let i = t[e];
    if (!this._isShallow) {
      const e = Ho(i);
      if (Go(n) || Ho(n) || (i = Wo(i), n = Wo(n)), !je(t) && Jo(i) && !Jo(n)) return e || (i.value = n), !0
    }
    const a = je(t) && tn(e) ? Number(e) < t.length : Ue(t, e),
      r = Reflect.set(t, e, n, Jo(t) ? t : o);
    return t === Wo(o) && (a ? dn(n, i) && so(t, "set", e, n) : so(t, "add", e, n)), r
  }
  deleteProperty(t, e) {
    const n = Ue(t, e);
    t[e];
    const o = Reflect.deleteProperty(t, e);
    return o && n && so(t, "delete", e, void 0), o
  }
  has(t, e) {
    const n = Reflect.has(t, e);
    return qe(e) && yo.has(e) || ro(t, 0, e), n
  }
  ownKeys(t) {
    return ro(t, 0, je(t) ? "length" : oo), Reflect.ownKeys(t)
  }
}
class Co extends xo {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, e) {
    return !0
  }
  deleteProperty(t, e) {
    return !0
  }
}
const So = new wo,
  To = new Co,
  Io = new wo(!0),
  Ao = t => t,
  Eo = t => Reflect.getPrototypeOf(t);

function Po(t) {
  return function(...e) {
    return "delete" !== t && ("clear" === t ? void 0 : this)
  }
}

function Oo(t, e) {
  const n = {
    get(n) {
      const o = this.__v_raw,
        i = Wo(o),
        a = Wo(n);
      t || (dn(n, a) && ro(i, 0, n), ro(i, 0, a));
      const {
        has: r
      } = Eo(i), s = e ? Ao : t ? Xo : Yo;
      return r.call(i, n) ? s(o.get(n)) : r.call(i, a) ? s(o.get(a)) : void(o !== i && o.get(n))
    },
    get size() {
      const e = this.__v_raw;
      return !t && ro(Wo(e), 0, oo), e.size
    },
    has(e) {
      const n = this.__v_raw,
        o = Wo(n),
        i = Wo(e);
      return t || (dn(e, i) && ro(o, 0, e), ro(o, 0, i)), e === i ? n.has(e) : n.has(e) || n.has(i)
    },
    forEach(n, o) {
      const i = this,
        a = i.__v_raw,
        r = Wo(a),
        s = e ? Ao : t ? Xo : Yo;
      return !t && ro(r, 0, oo), a.forEach((t, e) => n.call(o, s(t), s(e), i))
    }
  };
  Ne(n, t ? {
    add: Po("add"),
    set: Po("set"),
    delete: Po("delete"),
    clear: Po("clear")
  } : {
    add(t) {
      e || Go(t) || Ho(t) || (t = Wo(t));
      const n = Wo(this);
      return Eo(n).has.call(n, t) || (n.add(t), so(n, "add", t, t)), this
    },
    set(t, n) {
      e || Go(n) || Ho(n) || (n = Wo(n));
      const o = Wo(this),
        {
          has: i,
          get: a
        } = Eo(o);
      let r = i.call(o, t);
      r || (t = Wo(t), r = i.call(o, t));
      const s = a.call(o, t);
      return o.set(t, n), r ? dn(n, s) && so(o, "set", t, n) : so(o, "add", t, n), this
    },
    delete(t) {
      const e = Wo(this),
        {
          has: n,
          get: o
        } = Eo(e);
      let i = n.call(e, t);
      i || (t = Wo(t), i = n.call(e, t)), o && o.call(e, t);
      const a = e.delete(t);
      return i && so(e, "delete", t, void 0), a
    },
    clear() {
      const t = Wo(this),
        e = 0 !== t.size,
        n = t.clear();
      return e && so(t, "clear", void 0, void 0), n
    }
  });
  return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
    n[o] = function(t, e, n) {
      return function(...o) {
        const i = this.__v_raw,
          a = Wo(i),
          r = He(a),
          s = "entries" === t || t === Symbol.iterator && r,
          l = "keys" === t && r,
          c = i[t](...o),
          d = n ? Ao : e ? Xo : Yo;
        return !e && ro(a, 0, l ? io : oo), {
          next() {
            const {
              value: t,
              done: e
            } = c.next();
            return e ? {
              value: t,
              done: e
            } : {
              value: s ? [d(t[0]), d(t[1])] : d(t),
              done: e
            }
          },
          [Symbol.iterator]() {
            return this
          }
        }
      }
    }(o, t, e)
  }), n
}

function Mo(t, e) {
  const n = Oo(t, e);
  return (e, o, i) => "__v_isReactive" === o ? !t : "__v_isReadonly" === o ? t : "__v_raw" === o ? e : Reflect.get(Ue(n,
    o) && o in e ? n : e, o, i)
}
const Lo = {
    get: Mo(!1, !1)
  },
  _o = {
    get: Mo(!1, !0)
  },
  Bo = {
    get: Mo(!0, !1)
  },
  Fo = new WeakMap,
  Ro = new WeakMap,
  Do = new WeakMap,
  Vo = new WeakMap;

function No(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : function(t) {
    switch (t) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0
    }
  }((t => Ze(t).slice(8, -1))(t))
}

function $o(t) {
  return Ho(t) ? t : Uo(t, !1, So, Lo, Fo)
}

function zo(t) {
  return Uo(t, !0, To, Bo, Do)
}

function Uo(t, e, n, o, i) {
  if (!Ye(t)) return t;
  if (t.__v_raw && (!e || !t.__v_isReactive)) return t;
  const a = No(t);
  if (0 === a) return t;
  const r = i.get(t);
  if (r) return r;
  const s = new Proxy(t, 2 === a ? o : n);
  return i.set(t, s), s
}

function jo(t) {
  return Ho(t) ? jo(t.__v_raw) : !(!t || !t.__v_isReactive)
}

function Ho(t) {
  return !(!t || !t.__v_isReadonly)
}

function Go(t) {
  return !(!t || !t.__v_isShallow)
}

function Ko(t) {
  return !!t && !!t.__v_raw
}

function Wo(t) {
  const e = t && t.__v_raw;
  return e ? Wo(e) : t
}

function qo(t) {
  return !Ue(t, "__v_skip") && Object.isExtensible(t) && pn(t, "__v_skip", !0), t
}
const Yo = t => Ye(t) ? $o(t) : t,
  Xo = t => Ye(t) ? zo(t) : t;

function Jo(t) {
  return !!t && !0 === t.__v_isRef
}

function Zo(t) {
  return ti(t, !1)
}

function Qo(t) {
  return ti(t, !0)
}

function ti(t, e) {
  return Jo(t) ? t : new ei(t, e)
}
class ei {
  constructor(t, e) {
    this.dep = new to, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = e ? t : Wo(t), this._value = e ?
      t : Yo(t), this.__v_isShallow = e
  }
  get value() {
    return this.dep.track(), this._value
  }
  set value(t) {
    const e = this._rawValue,
      n = this.__v_isShallow || Go(t) || Ho(t);
    t = n ? t : Wo(t), dn(t, e) && (this._rawValue = t, this._value = n ? t : Yo(t), this.dep.trigger())
  }
}

function ni(t) {
  return Jo(t) ? t.value : t
}
const oi = {
  get: (t, e, n) => "__v_raw" === e ? t : ni(Reflect.get(t, e, n)),
  set: (t, e, n, o) => {
    const i = t[e];
    return Jo(i) && !Jo(n) ? (i.value = n, !0) : Reflect.set(t, e, n, o)
  }
};

function ii(t) {
  return jo(t) ? t : new Proxy(t, oi)
}
class ai {
  constructor(t, e, n) {
    this._object = t, this._key = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0
  }
  get value() {
    const t = this._object[this._key];
    return this._value = void 0 === t ? this._defaultValue : t
  }
  set value(t) {
    this._object[this._key] = t
  }
  get dep() {
    return function(t, e) {
      const n = no.get(t);
      return n && n.get(e)
    }(Wo(this._object), this._key)
  }
}
class ri {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0
  }
  get value() {
    return this._value = this._getter()
  }
}

function si(t, e, n) {
  return Jo(t) ? t : Ke(t) ? new ri(t) : Ye(t) && arguments.length > 1 ? function(t, e, n) {
    const o = t[e];
    return Jo(o) ? o : new ai(t, e, n)
  }(t, e, n) : Zo(t)
}
class li {
  constructor(t, e, n) {
    this.fn = t, this.setter = e, this._value = void 0, this.dep = new to(this), this.__v_isRef = !0, this.deps =
      void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Zn - 1, this.next = void 0, this.effect =
      this, this.__v_isReadonly = !e, this.isSSR = n
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && On !== this) return Vn(this, !0), !0
  }
  get value() {
    const t = this.dep.track();
    return Hn(this), t && (t.version = this.dep.version), this._value
  }
  set value(t) {
    this.setter && this.setter(t)
  }
}
const ci = {},
  di = new WeakMap;
let ui;

function pi(t, e, n = _e) {
  const {
    immediate: o,
    deep: i,
    once: a,
    scheduler: r,
    augmentJob: s,
    call: l
  } = n, c = t => i ? t : Go(t) || !1 === i || 0 === i ? bi(t, 1) : bi(t);
  let d, u, p, b, m = !1,
    g = !1;
  if (Jo(t) ? (u = () => t.value, m = Go(t)) : jo(t) ? (u = () => c(t), m = !0) : je(t) ? (g = !0, m = t.some(t => jo(
      t) || Go(t)), u = () => t.map(t => Jo(t) ? t.value : jo(t) ? c(t) : Ke(t) ? l ? l(t, 2) : t() : void 0)) : u = Ke(
      t) ? e ? l ? () => l(t, 2) : t : () => {
      if (p) {
        Yn();
        try {
          p()
        } finally {
          Xn()
        }
      }
      const e = ui;
      ui = d;
      try {
        return l ? l(t, 3, [b]) : t(b)
      } finally {
        ui = e
      }
    } : Fe, e && i) {
    const t = u,
      e = !0 === i ? 1 / 0 : i;
    u = () => bi(t(), e)
  }
  const f = Pn,
    h = () => {
      d.stop(), f && f.active && $e(f.effects, d)
    };
  if (a && e) {
    const t = e;
    e = (...e) => {
      t(...e), h()
    }
  }
  let v = g ? new Array(t.length).fill(ci) : ci;
  const y = t => {
    if (1 & d.flags && (d.dirty || t))
      if (e) {
        const t = d.run();
        if (i || m || (g ? t.some((t, e) => dn(t, v[e])) : dn(t, v))) {
          p && p();
          const n = ui;
          ui = d;
          try {
            const n = [t, v === ci ? void 0 : g && v[0] === ci ? [] : v, b];
            v = t, l ? l(e, 3, n) : e(...n)
          } finally {
            ui = n
          }
        }
      } else d.run()
  };
  return s && s(y), d = new Bn(u), d.scheduler = r ? () => r(y, !1) : y, b = t => function(t, e = !1, n = ui) {
      if (n) {
        let e = di.get(n);
        e || di.set(n, e = []), e.push(t)
      }
    }(t, !1, d), p = d.onStop = () => {
      const t = di.get(d);
      if (t) {
        if (l) l(t, 4);
        else
          for (const e of t) e();
        di.delete(d)
      }
    }, e ? o ? y(!0) : v = d.run() : r ? r(y.bind(null, !0), !0) : d.run(), h.pause = d.pause.bind(d), h.resume = d
    .resume.bind(d), h.stop = h, h
}

function bi(t, e = 1 / 0, n) {
  if (e <= 0 || !Ye(t) || t.__v_skip) return t;
  if (((n = n || new Map).get(t) || 0) >= e) return t;
  if (n.set(t, e), e--, Jo(t)) bi(t.value, e, n);
  else if (je(t))
    for (let o = 0; o < t.length; o++) bi(t[o], e, n);
  else if (Ge(t) || He(t)) t.forEach(t => {
    bi(t, e, n)
  });
  else if (Qe(t)) {
    for (const o in t) bi(t[o], e, n);
    for (const o of Object.getOwnPropertySymbols(t)) Object.prototype.propertyIsEnumerable.call(t, o) && bi(t[o], e, n)
  }
  return t
}

function mi(t, e, n, o) {
  try {
    return o ? t(...o) : t()
  } catch (i) {
    fi(i, e, n)
  }
}

function gi(t, e, n, o) {
  if (Ke(t)) {
    const i = mi(t, e, n, o);
    return i && Xe(i) && i.catch(t => {
      fi(t, e, n)
    }), i
  }
  if (je(t)) {
    const i = [];
    for (let a = 0; a < t.length; a++) i.push(gi(t[a], e, n, o));
    return i
  }
}

function fi(t, e, n, o = !0) {
  e && e.vnode;
  const {
    errorHandler: i,
    throwUnhandledErrorInProduction: a
  } = e && e.appContext.config || _e;
  if (e) {
    let o = e.parent;
    const a = e.proxy,
      r = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o;) {
      const e = o.ec;
      if (e)
        for (let n = 0; n < e.length; n++)
          if (!1 === e[n](t, a, r)) return;
      o = o.parent
    }
    if (i) return Yn(), mi(i, null, 10, [t, a, r]), void Xn()
  }! function(t, e, n, o = !0, i = !1) {
    if (i) throw t
  }(t, 0, 0, o, a)
}
const hi = [];
let vi = -1;
const yi = [];
let ki = null,
  xi = 0;
const wi = Promise.resolve();
let Ci = null;

function Si(t) {
  const e = Ci || wi;
  return t ? e.then(this ? t.bind(this) : t) : e
}

function Ti(t) {
  if (!(1 & t.flags)) {
    const e = Pi(t),
      n = hi[hi.length - 1];
    !n || !(2 & t.flags) && e >= Pi(n) ? hi.push(t) : hi.splice(function(t) {
      let e = vi + 1,
        n = hi.length;
      for (; e < n;) {
        const o = e + n >>> 1,
          i = hi[o],
          a = Pi(i);
        a < t || a === t && 2 & i.flags ? e = o + 1 : n = o
      }
      return e
    }(e), 0, t), t.flags |= 1, Ii()
  }
}

function Ii() {
  Ci || (Ci = wi.then(Oi))
}

function Ai(t, e, n = vi + 1) {
  for (; n < hi.length; n++) {
    const e = hi[n];
    if (e && 2 & e.flags) {
      if (t && e.id !== t.uid) continue;
      hi.splice(n, 1), n--, 4 & e.flags && (e.flags &= -2), e(), 4 & e.flags || (e.flags &= -2)
    }
  }
}

function Ei(t) {
  if (yi.length) {
    const t = [...new Set(yi)].sort((t, e) => Pi(t) - Pi(e));
    if (yi.length = 0, ki) return void ki.push(...t);
    for (ki = t, xi = 0; xi < ki.length; xi++) {
      const t = ki[xi];
      4 & t.flags && (t.flags &= -2), 8 & t.flags || t(), t.flags &= -2
    }
    ki = null, xi = 0
  }
}
const Pi = t => null == t.id ? 2 & t.flags ? -1 : 1 / 0 : t.id;

function Oi(t) {
  try {
    for (vi = 0; vi < hi.length; vi++) {
      const t = hi[vi];
      !t || 8 & t.flags || (4 & t.flags && (t.flags &= -2), mi(t, t.i, t.i ? 15 : 14), 4 & t.flags || (t.flags &= -2))
    }
  } finally {
    for (; vi < hi.length; vi++) {
      const t = hi[vi];
      t && (t.flags &= -2)
    }
    vi = -1, hi.length = 0, Ei(), Ci = null, (hi.length || yi.length) && Oi()
  }
}
let Mi = null,
  Li = null;

function _i(t) {
  const e = Mi;
  return Mi = t, Li = t && t.type.__scopeId || null, e
}

function Bi(t, e = Mi, n) {
  if (!e) return t;
  if (t._n) return t;
  const o = (...n) => {
    o._d && is(-1);
    const i = _i(e);
    let a;
    try {
      a = t(...n)
    } finally {
      _i(i), o._d && is(1)
    }
    return a
  };
  return o._n = !0, o._c = !0, o._d = !0, o
}

function Fi(t, e) {
  if (null === Mi) return t;
  const n = Fs(Mi),
    o = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [t, a, r, s = _e] = e[i];
    t && (Ke(t) && (t = {
      mounted: t,
      updated: t
    }), t.deep && bi(a), o.push({
      dir: t,
      instance: n,
      value: a,
      oldValue: void 0,
      arg: r,
      modifiers: s
    }))
  }
  return t
}

function Ri(t, e, n, o) {
  const i = t.dirs,
    a = e && e.dirs;
  for (let r = 0; r < i.length; r++) {
    const s = i[r];
    a && (s.oldValue = a[r].value);
    let l = s.dir[o];
    l && (Yn(), gi(l, n, 8, [t.el, s, t, e]), Xn())
  }
}
const Di = Symbol("_vte"),
  Vi = t => t.__isTeleport,
  Ni = t => t && (t.disabled || "" === t.disabled),
  $i = t => t && (t.defer || "" === t.defer),
  zi = t => "undefined" != typeof SVGElement && t instanceof SVGElement,
  Ui = t => "function" == typeof MathMLElement && t instanceof MathMLElement,
  ji = (t, e) => {
    const n = t && t.to;
    if (We(n)) {
      if (e) {
        return e(n)
      }
      return null
    }
    return n
  },
  Hi = {
    name: "Teleport",
    __isTeleport: !0,
    process(t, e, n, o, i, a, r, s, l, c) {
      const {
        mc: d,
        pc: u,
        pbc: p,
        o: {
          insert: b,
          querySelector: m,
          createText: g,
          createComment: f
        }
      } = c, h = Ni(e.props);
      let {
        shapeFlag: v,
        children: y,
        dynamicChildren: k
      } = e;
      if (null == t) {
        const t = e.el = g(""),
          c = e.anchor = g("");
        b(t, n, o), b(c, n, o);
        const u = (t, e) => {
            16 & v && d(y, t, e, i, a, r, s, l)
          },
          p = () => {
            const t = e.target = ji(e.props, m),
              n = qi(t, e, g, b);
            t && ("svg" !== r && zi(t) ? r = "svg" : "mathml" !== r && Ui(t) && (r = "mathml"), i && i.isCE && (i.ce
              ._teleportTargets || (i.ce._teleportTargets = new Set)).add(t), h || (u(t, n), Wi(e, !1)))
          };
        h && (u(n, c), Wi(e, !0)), $i(e.props) ? (e.el.__isMounted = !1, Ar(() => {
          p(), delete e.el.__isMounted
        }, a)) : p()
      } else {
        if ($i(e.props) && !1 === t.el.__isMounted) return void Ar(() => {
          Hi.process(t, e, n, o, i, a, r, s, l, c)
        }, a);
        e.el = t.el, e.targetStart = t.targetStart;
        const d = e.anchor = t.anchor,
          b = e.target = t.target,
          g = e.targetAnchor = t.targetAnchor,
          f = Ni(t.props),
          v = f ? n : b,
          y = f ? d : g;
        if ("svg" === r || zi(b) ? r = "svg" : ("mathml" === r || Ui(b)) && (r = "mathml"), k ? (p(t.dynamicChildren, k,
            v, i, a, r, s), Mr(t, e, !0)) : l || u(t, e, v, y, i, a, r, s, !1), h) f ? e.props && t.props && e.props
          .to !== t.props.to && (e.props.to = t.props.to) : Gi(e, n, d, c, 1);
        else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
          const t = e.target = ji(e.props, m);
          t && Gi(e, t, null, c, 0)
        } else f && Gi(e, b, g, c, 1);
        Wi(e, h)
      }
    },
    remove(t, e, n, {
      um: o,
      o: {
        remove: i
      }
    }, a) {
      const {
        shapeFlag: r,
        children: s,
        anchor: l,
        targetStart: c,
        targetAnchor: d,
        target: u,
        props: p
      } = t;
      if (u && (i(c), i(d)), a && i(l), 16 & r) {
        const t = a || !Ni(p);
        for (let i = 0; i < s.length; i++) {
          const a = s[i];
          o(a, e, n, t, !!a.dynamicChildren)
        }
      }
    },
    move: Gi,
    hydrate: function(t, e, n, o, i, a, {
      o: {
        nextSibling: r,
        parentNode: s,
        querySelector: l,
        insert: c,
        createText: d
      }
    }, u) {
      function p(t, e, l, c) {
        e.anchor = u(r(t), e, s(t), n, o, i, a), e.targetStart = l, e.targetAnchor = c
      }
      const b = e.target = ji(e.props, l),
        m = Ni(e.props);
      if (b) {
        const s = b._lpa || b.firstChild;
        if (16 & e.shapeFlag)
          if (m) p(t, e, s, s && r(s));
          else {
            e.anchor = r(t);
            let l = s;
            for (; l;) {
              if (l && 8 === l.nodeType)
                if ("teleport start anchor" === l.data) e.targetStart = l;
                else if ("teleport anchor" === l.data) {
                e.targetAnchor = l, b._lpa = e.targetAnchor && r(e.targetAnchor);
                break
              }
              l = r(l)
            }
            e.targetAnchor || qi(b, e, d, c), u(s && r(s), e, b, n, o, i, a)
          } Wi(e, m)
      } else m && 16 & e.shapeFlag && p(t, e, t, r(t));
      return e.anchor && r(e.anchor)
    }
  };

function Gi(t, e, n, {
  o: {
    insert: o
  },
  m: i
}, a = 2) {
  0 === a && o(t.targetAnchor, e, n);
  const {
    el: r,
    anchor: s,
    shapeFlag: l,
    children: c,
    props: d
  } = t, u = 2 === a;
  if (u && o(r, e, n), (!u || Ni(d)) && 16 & l)
    for (let p = 0; p < c.length; p++) i(c[p], e, n, 2);
  u && o(s, e, n)
}
const Ki = Hi;

function Wi(t, e) {
  const n = t.ctx;
  if (n && n.ut) {
    let o, i;
    for (e ? (o = t.el, i = t.anchor) : (o = t.targetStart, i = t.targetAnchor); o && o !== i;) 1 === o.nodeType && o
      .setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut()
  }
}

function qi(t, e, n, o) {
  const i = e.targetStart = n(""),
    a = e.targetAnchor = n("");
  return i[Di] = a, t && (o(i, t), o(a, t)), a
}
const Yi = Symbol("_leaveCb"),
  Xi = Symbol("_enterCb");

function Ji() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map
  };
  return Ca(() => {
    t.isMounted = !0
  }), Ia(() => {
    t.isUnmounting = !0
  }), t
}
const Zi = [Function, Array],
  Qi = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Zi,
    onEnter: Zi,
    onAfterEnter: Zi,
    onEnterCancelled: Zi,
    onBeforeLeave: Zi,
    onLeave: Zi,
    onAfterLeave: Zi,
    onLeaveCancelled: Zi,
    onBeforeAppear: Zi,
    onAppear: Zi,
    onAfterAppear: Zi,
    onAppearCancelled: Zi
  },
  ta = t => {
    const e = t.subTree;
    return e.component ? ta(e.component) : e
  };

function ea(t) {
  let e = t[0];
  if (t.length > 1)
    for (const n of t)
      if (n.type !== Zr) {
        e = n;
        break
      } return e
}
const na = {
  name: "BaseTransition",
  props: Qi,
  setup(t, {
    slots: e
  }) {
    const n = Ts(),
      o = Ji();
    return () => {
      const i = e.default && la(e.default(), !0);
      if (!i || !i.length) return;
      const a = ea(i),
        r = Wo(t),
        {
          mode: s
        } = r;
      if (o.isLeaving) return aa(a);
      const l = ra(a);
      if (!l) return aa(a);
      let c = ia(l, r, o, n, t => c = t);
      l.type !== Zr && sa(l, c);
      let d = n.subTree && ra(n.subTree);
      if (d && d.type !== Zr && !cs(d, l) && ta(n).type !== Zr) {
        let t = ia(d, r, o, n);
        if (sa(d, t), "out-in" === s && l.type !== Zr) return o.isLeaving = !0, t.afterLeave = () => {
          o.isLeaving = !1, 8 & n.job.flags || n.update(), delete t.afterLeave, d = void 0
        }, aa(a);
        "in-out" === s && l.type !== Zr ? t.delayLeave = (t, e, n) => {
          oa(o, d)[String(d.key)] = d, t[Yi] = () => {
            e(), t[Yi] = void 0, delete c.delayedLeave, d = void 0
          }, c.delayedLeave = () => {
            n(), delete c.delayedLeave, d = void 0
          }
        } : d = void 0
      } else d && (d = void 0);
      return a
    }
  }
};

function oa(t, e) {
  const {
    leavingVNodes: n
  } = t;
  let o = n.get(e.type);
  return o || (o = Object.create(null), n.set(e.type, o)), o
}

function ia(t, e, n, o, i) {
  const {
    appear: a,
    mode: r,
    persisted: s = !1,
    onBeforeEnter: l,
    onEnter: c,
    onAfterEnter: d,
    onEnterCancelled: u,
    onBeforeLeave: p,
    onLeave: b,
    onAfterLeave: m,
    onLeaveCancelled: g,
    onBeforeAppear: f,
    onAppear: h,
    onAfterAppear: v,
    onAppearCancelled: y
  } = e, k = String(t.key), x = oa(n, t), w = (t, e) => {
    t && gi(t, o, 9, e)
  }, C = (t, e) => {
    const n = e[1];
    w(t, e), je(t) ? t.every(t => t.length <= 1) && n() : t.length <= 1 && n()
  }, S = {
    mode: r,
    persisted: s,
    beforeEnter(e) {
      let o = l;
      if (!n.isMounted) {
        if (!a) return;
        o = f || l
      }
      e[Yi] && e[Yi](!0);
      const i = x[k];
      i && cs(t, i) && i.el[Yi] && i.el[Yi](), w(o, [e])
    },
    enter(t) {
      let e = c,
        o = d,
        i = u;
      if (!n.isMounted) {
        if (!a) return;
        e = h || c, o = v || d, i = y || u
      }
      let r = !1;
      const s = t[Xi] = e => {
        r || (r = !0, w(e ? i : o, [t]), S.delayedLeave && S.delayedLeave(), t[Xi] = void 0)
      };
      e ? C(e, [t, s]) : s()
    },
    leave(e, o) {
      const i = String(t.key);
      if (e[Xi] && e[Xi](!0), n.isUnmounting) return o();
      w(p, [e]);
      let a = !1;
      const r = e[Yi] = n => {
        a || (a = !0, o(), w(n ? g : m, [e]), e[Yi] = void 0, x[i] === t && delete x[i])
      };
      x[i] = t, b ? C(b, [e, r]) : r()
    },
    clone(t) {
      const a = ia(t, e, n, o, i);
      return i && i(a), a
    }
  };
  return S
}

function aa(t) {
  if (ga(t)) return (t = ms(t)).children = null, t
}

function ra(t) {
  if (!ga(t)) return Vi(t.type) && t.children ? ea(t.children) : t;
  if (t.component) return t.component.subTree;
  const {
    shapeFlag: e,
    children: n
  } = t;
  if (n) {
    if (16 & e) return n[0];
    if (32 & e && Ke(n.default)) return n.default()
  }
}

function sa(t, e) {
  6 & t.shapeFlag && t.component ? (t.transition = e, sa(t.component.subTree, e)) : 128 & t.shapeFlag ? (t.ssContent
    .transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e
}

function la(t, e = !1, n) {
  let o = [],
    i = 0;
  for (let a = 0; a < t.length; a++) {
    let r = t[a];
    const s = null == n ? r.key : String(n) + String(null != r.key ? r.key : a);
    r.type === Xr ? (128 & r.patchFlag && i++, o = o.concat(la(r.children, e, s))) : (e || r.type !== Zr) && o.push(
      null != s ? ms(r, {
        key: s
      }) : r)
  }
  if (i > 1)
    for (let a = 0; a < o.length; a++) o[a].patchFlag = -2;
  return o
}

function ca(t, e) {
  return Ke(t) ? (() => Ne({
    name: t.name
  }, e, {
    setup: t
  }))() : t
}

function da(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0]
}
const ua = new WeakMap;

function pa(t, e, n, o, i = !1) {
  if (je(t)) return void t.forEach((t, a) => pa(t, e && (je(e) ? e[a] : e), n, o, i));
  if (ma(o) && !i) return void(512 & o.shapeFlag && o.type.__asyncResolved && o.component.subTree.component && pa(t, e,
    n, o.component.subTree));
  const a = 4 & o.shapeFlag ? Fs(o.component) : o.el,
    r = i ? null : a,
    {
      i: s,
      r: l
    } = t,
    c = e && e.r,
    d = s.refs === _e ? s.refs = {} : s.refs,
    u = s.setupState,
    p = Wo(u),
    b = u === _e ? Re : t => Ue(p, t);
  if (null != c && c !== l)
    if (ba(e), We(c)) d[c] = null, b(c) && (u[c] = null);
    else if (Jo(c)) {
    c.value = null;
    const t = e;
    t.k && (d[t.k] = null)
  }
  if (Ke(l)) mi(l, s, 12, [r, d]);
  else {
    const e = We(l),
      o = Jo(l);
    if (e || o) {
      const s = () => {
        if (t.f) {
          const n = e ? b(l) ? u[l] : d[l] : l.value;
          if (i) je(n) && $e(n, a);
          else if (je(n)) n.includes(a) || n.push(a);
          else if (e) d[l] = [a], b(l) && (u[l] = d[l]);
          else {
            const e = [a];
            l.value = e, t.k && (d[t.k] = e)
          }
        } else e ? (d[l] = r, b(l) && (u[l] = r)) : o && (l.value = r, t.k && (d[t.k] = r))
      };
      if (r) {
        const e = () => {
          s(), ua.delete(t)
        };
        e.id = -1, ua.set(t, e), Ar(e, n)
      } else ba(t), s()
    }
  }
}

function ba(t) {
  const e = ua.get(t);
  e && (e.flags |= 8, ua.delete(t))
}
gn().requestIdleCallback, gn().cancelIdleCallback;
const ma = t => !!t.type.__asyncLoader,
  ga = t => t.type.__isKeepAlive;

function fa(t, e) {
  va(t, "a", e)
}

function ha(t, e) {
  va(t, "da", e)
}

function va(t, e, n = Ss) {
  const o = t.__wdc || (t.__wdc = () => {
    let e = n;
    for (; e;) {
      if (e.isDeactivated) return;
      e = e.parent
    }
    return t()
  });
  if (ka(e, o, n), n) {
    let t = n.parent;
    for (; t && t.parent;) ga(t.parent.vnode) && ya(o, e, n, t), t = t.parent
  }
}

function ya(t, e, n, o) {
  const i = ka(e, t, o, !0);
  Aa(() => {
    $e(o[e], i)
  }, n)
}

function ka(t, e, n = Ss, o = !1) {
  if (n) {
    const i = n[t] || (n[t] = []),
      a = e.__weh || (e.__weh = (...o) => {
        Yn();
        const i = Es(n),
          a = gi(e, n, t, o);
        return i(), Xn(), a
      });
    return o ? i.unshift(a) : i.push(a), a
  }
}
const xa = t => (e, n = Ss) => {
    Ms && "sp" !== t || ka(t, (...t) => e(...t), n)
  },
  wa = xa("bm"),
  Ca = xa("m"),
  Sa = xa("bu"),
  Ta = xa("u"),
  Ia = xa("bum"),
  Aa = xa("um"),
  Ea = xa("sp"),
  Pa = xa("rtg"),
  Oa = xa("rtc");

function Ma(t, e = Ss) {
  ka("ec", t, e)
}
const La = "components";

function _a(t, e) {
  return Da(La, t, !0, e) || t
}
const Ba = Symbol.for("v-ndc");

function Fa(t) {
  return We(t) ? Da(La, t, !1) || t : t || Ba
}

function Ra(t) {
  return Da("directives", t)
}

function Da(t, e, n = !0, o = !1) {
  const i = Mi || Ss;
  if (i) {
    const n = i.type;
    if (t === La) {
      const t = Rs(n, !1);
      if (t && (t === e || t === an(e) || t === ln(an(e)))) return n
    }
    const a = Va(i[t] || n[t], e) || Va(i.appContext[t], e);
    return !a && o ? n : a
  }
}

function Va(t, e) {
  return t && (t[e] || t[an(e)] || t[ln(an(e))])
}

function Na(t, e, n, o) {
  let i;
  const a = n,
    r = je(t);
  if (r || We(t)) {
    let n = !1,
      o = !1;
    r && jo(t) && (n = !Go(t), o = Ho(t), t = co(t)), i = new Array(t.length);
    for (let r = 0, s = t.length; r < s; r++) i[r] = e(n ? o ? Xo(Yo(t[r])) : Yo(t[r]) : t[r], r, void 0, a)
  } else if ("number" == typeof t) {
    i = new Array(t);
    for (let n = 0; n < t; n++) i[n] = e(n + 1, n, void 0, a)
  } else if (Ye(t))
    if (t[Symbol.iterator]) i = Array.from(t, (t, n) => e(t, n, void 0, a));
    else {
      const n = Object.keys(t);
      i = new Array(n.length);
      for (let o = 0, r = n.length; o < r; o++) {
        const r = n[o];
        i[o] = e(t[r], r, o, a)
      }
    }
  else i = [];
  return i
}

function $a(t, e) {
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (je(o))
      for (let e = 0; e < o.length; e++) t[o[e].name] = o[e].fn;
    else o && (t[o.name] = o.key ? (...t) => {
      const e = o.fn(...t);
      return e && (e.key = o.key), e
    } : o.fn)
  }
  return t
}

function za(t, e, n = {}, o, i) {
  if (Mi.ce || Mi.parent && ma(Mi.parent) && Mi.parent.ce) {
    const t = Object.keys(n).length > 0;
    return "default" !== e && (n.name = e), ns(), ss(Xr, null, [bs("slot", n, o && o())], t ? -2 : 64)
  }
  let a = t[e];
  a && a._c && (a._d = !1), ns();
  const r = a && Ua(a(n)),
    s = n.key || r && r.key,
    l = ss(Xr, {
      key: (s && !qe(s) ? s : `_${e}`) + (!r && o ? "_fb" : "")
    }, r || (o ? o() : []), r && 1 === t._ ? 64 : -2);
  return l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), a && a._c && (a._d = !0), l
}

function Ua(t) {
  return t.some(t => !ls(t) || t.type !== Zr && !(t.type === Xr && !Ua(t.children))) ? t : null
}

function ja(t, e) {
  const n = {};
  for (const o in t) n[/[A-Z]/.test(o) ? `on:${o}` : cn(o)] = t[o];
  return n
}
const Ha = t => t ? Os(t) ? Fs(t) : Ha(t.parent) : null,
  Ga = Ne(Object.create(null), {
    $: t => t,
    $el: t => t.vnode.el,
    $data: t => t.data,
    $props: t => t.props,
    $attrs: t => t.attrs,
    $slots: t => t.slots,
    $refs: t => t.refs,
    $parent: t => Ha(t.parent),
    $root: t => Ha(t.root),
    $host: t => t.ce,
    $emit: t => t.emit,
    $options: t => Qa(t),
    $forceUpdate: t => t.f || (t.f = () => {
      Ti(t.update)
    }),
    $nextTick: t => t.n || (t.n = Si.bind(t.proxy)),
    $watch: t => Vr.bind(t)
  }),
  Ka = (t, e) => t !== _e && !t.__isScriptSetup && Ue(t, e),
  Wa = {
    get({
      _: t
    }, e) {
      if ("__v_skip" === e) return !0;
      const {
        ctx: n,
        setupState: o,
        data: i,
        props: a,
        accessCache: r,
        type: s,
        appContext: l
      } = t;
      let c;
      if ("$" !== e[0]) {
        const s = r[e];
        if (void 0 !== s) switch (s) {
          case 1:
            return o[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return a[e]
        } else {
          if (Ka(o, e)) return r[e] = 1, o[e];
          if (i !== _e && Ue(i, e)) return r[e] = 2, i[e];
          if ((c = t.propsOptions[0]) && Ue(c, e)) return r[e] = 3, a[e];
          if (n !== _e && Ue(n, e)) return r[e] = 4, n[e];
          Ya && (r[e] = 0)
        }
      }
      const d = Ga[e];
      let u, p;
      return d ? ("$attrs" === e && ro(t.attrs, 0, ""), d(t)) : (u = s.__cssModules) && (u = u[e]) ? u : n !== _e &&
        Ue(n, e) ? (r[e] = 4, n[e]) : (p = l.config.globalProperties, Ue(p, e) ? p[e] : void 0)
    },
    set({
      _: t
    }, e, n) {
      const {
        data: o,
        setupState: i,
        ctx: a
      } = t;
      return Ka(i, e) ? (i[e] = n, !0) : o !== _e && Ue(o, e) ? (o[e] = n, !0) : !Ue(t.props, e) && (("$" !== e[0] ||
        !(e.slice(1) in t)) && (a[e] = n, !0))
    },
    has({
      _: {
        data: t,
        setupState: e,
        accessCache: n,
        ctx: o,
        appContext: i,
        propsOptions: a,
        type: r
      }
    }, s) {
      let l, c;
      return !!(n[s] || t !== _e && "$" !== s[0] && Ue(t, s) || Ka(e, s) || (l = a[0]) && Ue(l, s) || Ue(o, s) || Ue(Ga,
        s) || Ue(i.config.globalProperties, s) || (c = r.__cssModules) && c[s])
    },
    defineProperty(t, e, n) {
      return null != n.get ? t._.accessCache[e] = 0 : Ue(n, "value") && this.set(t, e, n.value, null), Reflect
        .defineProperty(t, e, n)
    }
  };

function qa(t) {
  return je(t) ? t.reduce((t, e) => (t[e] = null, t), {}) : t
}
let Ya = !0;

function Xa(t) {
  const e = Qa(t),
    n = t.proxy,
    o = t.ctx;
  Ya = !1, e.beforeCreate && Ja(e.beforeCreate, t, "bc");
  const {
    data: i,
    computed: a,
    methods: r,
    watch: s,
    provide: l,
    inject: c,
    created: d,
    beforeMount: u,
    mounted: p,
    beforeUpdate: b,
    updated: m,
    activated: g,
    deactivated: f,
    beforeDestroy: h,
    beforeUnmount: v,
    destroyed: y,
    unmounted: k,
    render: x,
    renderTracked: w,
    renderTriggered: C,
    errorCaptured: S,
    serverPrefetch: T,
    expose: I,
    inheritAttrs: A,
    components: E,
    directives: P,
    filters: O
  } = e;
  if (c && function(t, e) {
      je(t) && (t = or(t));
      for (const n in t) {
        const o = t[n];
        let i;
        i = Ye(o) ? "default" in o ? ur(o.from || n, o.default, !0) : ur(o.from || n) : ur(o), Jo(i) ? Object
          .defineProperty(e, n, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: t => i.value = t
          }) : e[n] = i
      }
    }(c, o, null), r)
    for (const L in r) {
      const t = r[L];
      Ke(t) && (o[L] = t.bind(n))
    }
  if (i) {
    const e = i.call(n, n);
    Ye(e) && (t.data = $o(e))
  }
  if (Ya = !0, a)
    for (const L in a) {
      const t = a[L],
        e = Ke(t) ? t.bind(n, n) : Ke(t.get) ? t.get.bind(n, n) : Fe,
        i = !Ke(t) && Ke(t.set) ? t.set.bind(n) : Fe,
        r = Ds({
          get: e,
          set: i
        });
      Object.defineProperty(o, L, {
        enumerable: !0,
        configurable: !0,
        get: () => r.value,
        set: t => r.value = t
      })
    }
  if (s)
    for (const L in s) Za(s[L], o, n, L);
  if (l) {
    const t = Ke(l) ? l.call(n) : l;
    Reflect.ownKeys(t).forEach(e => {
      ! function(t, e) {
        if (Ss) {
          let n = Ss.provides;
          const o = Ss.parent && Ss.parent.provides;
          o === n && (n = Ss.provides = Object.create(o)), n[t] = e
        } else;
      }(e, t[e])
    })
  }

  function M(t, e) {
    je(e) ? e.forEach(e => t(e.bind(n))) : e && t(e.bind(n))
  }
  if (d && Ja(d, t, "c"), M(wa, u), M(Ca, p), M(Sa, b), M(Ta, m), M(fa, g), M(ha, f), M(Ma, S), M(Oa, w), M(Pa, C), M(
      Ia, v), M(Aa, k), M(Ea, T), je(I))
    if (I.length) {
      const e = t.exposed || (t.exposed = {});
      I.forEach(t => {
        Object.defineProperty(e, t, {
          get: () => n[t],
          set: e => n[t] = e,
          enumerable: !0
        })
      })
    } else t.exposed || (t.exposed = {});
  x && t.render === Fe && (t.render = x), null != A && (t.inheritAttrs = A), E && (t.components = E), P && (t
    .directives = P), T && da(t)
}

function Ja(t, e, n) {
  gi(je(t) ? t.map(t => t.bind(e.proxy)) : t.bind(e.proxy), e, n)
}

function Za(t, e, n, o) {
  let i = o.includes(".") ? Nr(n, o) : () => n[o];
  if (We(t)) {
    const n = e[t];
    Ke(n) && Rr(i, n)
  } else if (Ke(t)) Rr(i, t.bind(n));
  else if (Ye(t))
    if (je(t)) t.forEach(t => Za(t, e, n, o));
    else {
      const o = Ke(t.handler) ? t.handler.bind(n) : e[t.handler];
      Ke(o) && Rr(i, o, t)
    }
}

function Qa(t) {
  const e = t.type,
    {
      mixins: n,
      extends: o
    } = e,
    {
      mixins: i,
      optionsCache: a,
      config: {
        optionMergeStrategies: r
      }
    } = t.appContext,
    s = a.get(e);
  let l;
  return s ? l = s : i.length || n || o ? (l = {}, i.length && i.forEach(t => tr(l, t, r, !0)), tr(l, e, r)) : l = e,
    Ye(e) && a.set(e, l), l
}

function tr(t, e, n, o = !1) {
  const {
    mixins: i,
    extends: a
  } = e;
  a && tr(t, a, n, !0), i && i.forEach(e => tr(t, e, n, !0));
  for (const r in e)
    if (o && "expose" === r);
    else {
      const o = er[r] || n && n[r];
      t[r] = o ? o(t[r], e[r]) : e[r]
    } return t
}
const er = {
  data: nr,
  props: rr,
  emits: rr,
  methods: ar,
  computed: ar,
  beforeCreate: ir,
  created: ir,
  beforeMount: ir,
  mounted: ir,
  beforeUpdate: ir,
  updated: ir,
  beforeDestroy: ir,
  beforeUnmount: ir,
  destroyed: ir,
  unmounted: ir,
  activated: ir,
  deactivated: ir,
  errorCaptured: ir,
  serverPrefetch: ir,
  components: ar,
  directives: ar,
  watch: function(t, e) {
    if (!t) return e;
    if (!e) return t;
    const n = Ne(Object.create(null), t);
    for (const o in e) n[o] = ir(t[o], e[o]);
    return n
  },
  provide: nr,
  inject: function(t, e) {
    return ar(or(t), or(e))
  }
};

function nr(t, e) {
  return e ? t ? function() {
    return Ne(Ke(t) ? t.call(this, this) : t, Ke(e) ? e.call(this, this) : e)
  } : e : t
}

function or(t) {
  if (je(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
    return e
  }
  return t
}

function ir(t, e) {
  return t ? [...new Set([].concat(t, e))] : e
}

function ar(t, e) {
  return t ? Ne(Object.create(null), t, e) : e
}

function rr(t, e) {
  return t ? je(t) && je(e) ? [...new Set([...t, ...e])] : Ne(Object.create(null), qa(t), qa(null != e ? e : {})) : e
}

function sr() {
  return {
    app: null,
    config: {
      isNativeTag: Re,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
let lr = 0;

function cr(t, e) {
  return function(e, n = null) {
    Ke(e) || (e = Ne({}, e)), null == n || Ye(n) || (n = null);
    const o = sr(),
      i = new WeakSet,
      a = [];
    let r = !1;
    const s = o.app = {
      _uid: lr++,
      _component: e,
      _props: n,
      _container: null,
      _context: o,
      _instance: null,
      version: Ns,
      get config() {
        return o.config
      },
      set config(t) {},
      use: (t, ...e) => (i.has(t) || (t && Ke(t.install) ? (i.add(t), t.install(s, ...e)) : Ke(t) && (i.add(t), t(s,
        ...e))), s),
      mixin: t => (o.mixins.includes(t) || o.mixins.push(t), s),
      component: (t, e) => e ? (o.components[t] = e, s) : o.components[t],
      directive: (t, e) => e ? (o.directives[t] = e, s) : o.directives[t],
      mount(i, a, l) {
        if (!r) {
          const a = s._ceVNode || bs(e, n);
          return a.appContext = o, !0 === l ? l = "svg" : !1 === l && (l = void 0), t(a, i, l), r = !0, s
            ._container = i, i.__vue_app__ = s, Fs(a.component)
        }
      },
      onUnmount(t) {
        a.push(t)
      },
      unmount() {
        r && (gi(a, s._instance, 16), t(null, s._container), delete s._container.__vue_app__)
      },
      provide: (t, e) => (o.provides[t] = e, s),
      runWithContext(t) {
        const e = dr;
        dr = s;
        try {
          return t()
        } finally {
          dr = e
        }
      }
    };
    return s
  }
}
let dr = null;

function ur(t, e, n = !1) {
  const o = Ts();
  if (o || dr) {
    let i = dr ? dr._context.provides : o ? null == o.parent || o.ce ? o.vnode.appContext && o.vnode.appContext
      .provides : o.parent.provides : void 0;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return n && Ke(e) ? e.call(o && o.proxy) : e
  }
}
const pr = {},
  br = () => Object.create(pr),
  mr = t => Object.getPrototypeOf(t) === pr;

function gr(t, e, n, o = !1) {
  const i = {},
    a = br();
  t.propsDefaults = Object.create(null), fr(t, e, i, a);
  for (const r in t.propsOptions[0]) r in i || (i[r] = void 0);
  n ? t.props = o ? i : Uo(i, !1, Io, _o, Ro) : t.type.props ? t.props = i : t.props = a, t.attrs = a
}

function fr(t, e, n, o) {
  const [i, a] = t.propsOptions;
  let r, s = !1;
  if (e)
    for (let l in e) {
      if (en(l)) continue;
      const c = e[l];
      let d;
      i && Ue(i, d = an(l)) ? a && a.includes(d) ? (r || (r = {}))[d] = c : n[d] = c : Hr(t.emitsOptions, l) || l in
        o && c === o[l] || (o[l] = c, s = !0)
    }
  if (a) {
    const e = Wo(n),
      o = r || _e;
    for (let r = 0; r < a.length; r++) {
      const s = a[r];
      n[s] = hr(i, e, s, o[s], t, !Ue(o, s))
    }
  }
  return s
}

function hr(t, e, n, o, i, a) {
  const r = t[n];
  if (null != r) {
    const t = Ue(r, "default");
    if (t && void 0 === o) {
      const t = r.default;
      if (r.type !== Function && !r.skipFactory && Ke(t)) {
        const {
          propsDefaults: a
        } = i;
        if (n in a) o = a[n];
        else {
          const r = Es(i);
          o = a[n] = t.call(null, e), r()
        }
      } else o = t;
      i.ce && i.ce._setProp(n, o)
    }
    r[0] && (a && !t ? o = !1 : !r[1] || "" !== o && o !== sn(n) || (o = !0))
  }
  return o
}
const vr = new WeakMap;

function yr(t, e, n = !1) {
  const o = n ? vr : e.propsCache,
    i = o.get(t);
  if (i) return i;
  const a = t.props,
    r = {},
    s = [];
  let l = !1;
  if (!Ke(t)) {
    const o = t => {
      l = !0;
      const [n, o] = yr(t, e, !0);
      Ne(r, n), o && s.push(...o)
    };
    !n && e.mixins.length && e.mixins.forEach(o), t.extends && o(t.extends), t.mixins && t.mixins.forEach(o)
  }
  if (!a && !l) return Ye(t) && o.set(t, Be), Be;
  if (je(a))
    for (let d = 0; d < a.length; d++) {
      const t = an(a[d]);
      kr(t) && (r[t] = _e)
    } else if (a)
      for (const d in a) {
        const t = an(d);
        if (kr(t)) {
          const e = a[d],
            n = r[t] = je(e) || Ke(e) ? {
              type: e
            } : Ne({}, e),
            o = n.type;
          let i = !1,
            l = !0;
          if (je(o))
            for (let t = 0; t < o.length; ++t) {
              const e = o[t],
                n = Ke(e) && e.name;
              if ("Boolean" === n) {
                i = !0;
                break
              }
              "String" === n && (l = !1)
            } else i = Ke(o) && "Boolean" === o.name;
          n[0] = i, n[1] = l, (i || Ue(n, "default")) && s.push(t)
        }
      }
  const c = [r, s];
  return Ye(t) && o.set(t, c), c
}

function kr(t) {
  return "$" !== t[0] && !en(t)
}
const xr = t => "_" === t || "_ctx" === t || "$stable" === t,
  wr = t => je(t) ? t.map(hs) : [hs(t)],
  Cr = (t, e, n) => {
    if (e._n) return e;
    const o = Bi((...t) => wr(e(...t)), n);
    return o._c = !1, o
  },
  Sr = (t, e, n) => {
    const o = t._ctx;
    for (const i in t) {
      if (xr(i)) continue;
      const n = t[i];
      if (Ke(n)) e[i] = Cr(0, n, o);
      else if (null != n) {
        const t = wr(n);
        e[i] = () => t
      }
    }
  },
  Tr = (t, e) => {
    const n = wr(e);
    t.slots.default = () => n
  },
  Ir = (t, e, n) => {
    for (const o in e) !n && xr(o) || (t[o] = e[o])
  },
  Ar = function(t, e) {
    e && e.pendingBranch ? je(t) ? e.effects.push(...t) : e.effects.push(t) : (je(n = t) ? yi.push(...n) : ki && -1 ===
      n.id ? ki.splice(xi + 1, 0, n) : 1 & n.flags || (yi.push(n), n.flags |= 1), Ii());
    var n
  };

function Er(t) {
  return function(t) {
    gn().__VUE__ = !0;
    const {
      insert: e,
      remove: n,
      patchProp: o,
      createElement: i,
      createText: a,
      createComment: r,
      setText: s,
      setElementText: l,
      parentNode: c,
      nextSibling: d,
      setScopeId: u = Fe,
      insertStaticContent: p
    } = t, b = (t, e, n, o = null, i = null, a = null, r = void 0, s = null, l = !!e.dynamicChildren) => {
      if (t === e) return;
      t && !cs(t, e) && (o = z(t), R(t, i, a, !0), t = null), -2 === e.patchFlag && (l = !1, e.dynamicChildren =
        null);
      const {
        type: c,
        ref: d,
        shapeFlag: u
      } = e;
      switch (c) {
        case Jr:
          m(t, e, n, o);
          break;
        case Zr:
          g(t, e, n, o);
          break;
        case Qr:
          null == t && f(e, n, o, r);
          break;
        case Xr:
          I(t, e, n, o, i, a, r, s, l);
          break;
        default:
          1 & u ? y(t, e, n, o, i, a, r, s, l) : 6 & u ? A(t, e, n, o, i, a, r, s, l) : (64 & u || 128 & u) && c
            .process(t, e, n, o, i, a, r, s, l, H)
      }
      null != d && i ? pa(d, t && t.ref, a, e || t, !e) : null == d && t && null != t.ref && pa(t.ref, null, a, t, !
        0)
    }, m = (t, n, o, i) => {
      if (null == t) e(n.el = a(n.children), o, i);
      else {
        const e = n.el = t.el;
        n.children !== t.children && s(e, n.children)
      }
    }, g = (t, n, o, i) => {
      null == t ? e(n.el = r(n.children || ""), o, i) : n.el = t.el
    }, f = (t, e, n, o) => {
      [t.el, t.anchor] = p(t.children, e, n, o, t.el, t.anchor)
    }, h = ({
      el: t,
      anchor: n
    }, o, i) => {
      let a;
      for (; t && t !== n;) a = d(t), e(t, o, i), t = a;
      e(n, o, i)
    }, v = ({
      el: t,
      anchor: e
    }) => {
      let o;
      for (; t && t !== e;) o = d(t), n(t), t = o;
      n(e)
    }, y = (t, e, n, o, i, a, r, s, l) => {
      if ("svg" === e.type ? r = "svg" : "math" === e.type && (r = "mathml"), null == t) k(e, n, o, i, a, r, s, l);
      else {
        const n = t.el && t.el._isVueCE ? t.el : null;
        try {
          n && n._beginPatch(), C(t, e, i, a, r, s, l)
        } finally {
          n && n._endPatch()
        }
      }
    }, k = (t, n, a, r, s, c, d, u) => {
      let p, b;
      const {
        props: m,
        shapeFlag: g,
        transition: f,
        dirs: h
      } = t;
      if (p = t.el = i(t.type, c, m && m.is, m), 8 & g ? l(p, t.children) : 16 & g && w(t.children, p, null, r, s,
          Pr(t, c), d, u), h && Ri(t, null, r, "created"), x(p, t, t.scopeId, d, r), m) {
        for (const t in m) "value" === t || en(t) || o(p, t, null, m[t], c, r);
        "value" in m && o(p, "value", null, m.value, c), (b = m.onVnodeBeforeMount) && xs(b, r, t)
      }
      h && Ri(t, null, r, "beforeMount");
      const v = function(t, e) {
        return (!t || t && !t.pendingBranch) && e && !e.persisted
      }(s, f);
      v && f.beforeEnter(p), e(p, n, a), ((b = m && m.onVnodeMounted) || v || h) && Ar(() => {
        b && xs(b, r, t), v && f.enter(p), h && Ri(t, null, r, "mounted")
      }, s)
    }, x = (t, e, n, o, i) => {
      if (n && u(t, n), o)
        for (let a = 0; a < o.length; a++) u(t, o[a]);
      if (i) {
        let n = i.subTree;
        if (e === n || Yr(n.type) && (n.ssContent === e || n.ssFallback === e)) {
          const e = i.vnode;
          x(t, e, e.scopeId, e.slotScopeIds, i.parent)
        }
      }
    }, w = (t, e, n, o, i, a, r, s, l = 0) => {
      for (let c = l; c < t.length; c++) {
        const l = t[c] = s ? vs(t[c]) : hs(t[c]);
        b(null, l, e, n, o, i, a, r, s)
      }
    }, C = (t, e, n, i, a, r, s) => {
      const c = e.el = t.el;
      let {
        patchFlag: d,
        dynamicChildren: u,
        dirs: p
      } = e;
      d |= 16 & t.patchFlag;
      const b = t.props || _e,
        m = e.props || _e;
      let g;
      if (n && Or(n, !1), (g = m.onVnodeBeforeUpdate) && xs(g, n, e, t), p && Ri(e, t, n, "beforeUpdate"), n && Or(
          n, !0), (b.innerHTML && null == m.innerHTML || b.textContent && null == m.textContent) && l(c, ""), u ? S(
          t.dynamicChildren, u, c, n, i, Pr(e, a), r) : s || L(t, e, c, null, n, i, Pr(e, a), r, !1), d > 0) {
        if (16 & d) T(c, b, m, n, a);
        else if (2 & d && b.class !== m.class && o(c, "class", null, m.class, a), 4 & d && o(c, "style", b.style, m
            .style, a), 8 & d) {
          const t = e.dynamicProps;
          for (let e = 0; e < t.length; e++) {
            const i = t[e],
              r = b[i],
              s = m[i];
            s === r && "value" !== i || o(c, i, r, s, a, n)
          }
        }
        1 & d && t.children !== e.children && l(c, e.children)
      } else s || null != u || T(c, b, m, n, a);
      ((g = m.onVnodeUpdated) || p) && Ar(() => {
        g && xs(g, n, e, t), p && Ri(e, t, n, "updated")
      }, i)
    }, S = (t, e, n, o, i, a, r) => {
      for (let s = 0; s < e.length; s++) {
        const l = t[s],
          d = e[s],
          u = l.el && (l.type === Xr || !cs(l, d) || 198 & l.shapeFlag) ? c(l.el) : n;
        b(l, d, u, null, o, i, a, r, !0)
      }
    }, T = (t, e, n, i, a) => {
      if (e !== n) {
        if (e !== _e)
          for (const r in e) en(r) || r in n || o(t, r, e[r], null, a, i);
        for (const r in n) {
          if (en(r)) continue;
          const s = n[r],
            l = e[r];
          s !== l && "value" !== r && o(t, r, l, s, a, i)
        }
        "value" in n && o(t, "value", e.value, n.value, a)
      }
    }, I = (t, n, o, i, r, s, l, c, d) => {
      const u = n.el = t ? t.el : a(""),
        p = n.anchor = t ? t.anchor : a("");
      let {
        patchFlag: b,
        dynamicChildren: m,
        slotScopeIds: g
      } = n;
      g && (c = c ? c.concat(g) : g), null == t ? (e(u, o, i), e(p, o, i), w(n.children || [], o, p, r, s, l, c,
        d)) : b > 0 && 64 & b && m && t.dynamicChildren ? (S(t.dynamicChildren, m, o, r, s, l, c), (null != n.key ||
          r && n === r.subTree) && Mr(t, n, !0)) : L(t, n, o, p, r, s, l, c, d)
    }, A = (t, e, n, o, i, a, r, s, l) => {
      e.slotScopeIds = s, null == t ? 512 & e.shapeFlag ? i.ctx.activate(e, n, o, r, l) : E(e, n, o, i, a, r, l) :
        P(t, e, l)
    }, E = (t, e, n, o, i, a, r) => {
      const s = t.component = function(t, e, n) {
        const o = t.type,
          i = (e ? e.appContext : t.appContext) || ws,
          a = {
            uid: Cs++,
            vnode: t,
            type: o,
            parent: e,
            appContext: i,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            job: null,
            scope: new Mn(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: e ? e.provides : Object.create(i.provides),
            ids: e ? e.ids : ["", 0, 0],
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: yr(o, i),
            emitsOptions: jr(o, i),
            emit: null,
            emitted: null,
            propsDefaults: _e,
            inheritAttrs: o.inheritAttrs,
            ctx: _e,
            data: _e,
            props: _e,
            attrs: _e,
            slots: _e,
            refs: _e,
            setupState: _e,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
          };
        a.ctx = {
          _: a
        }, a.root = e ? e.root : a, a.emit = zr.bind(null, a), t.ce && t.ce(a);
        return a
      }(t, o, i);
      if (ga(t) && (s.ctx.renderer = H), function(t, e = !1, n = !1) {
          e && As(e);
          const {
            props: o,
            children: i
          } = t.vnode, a = Os(t);
          gr(t, o, a, e), ((t, e, n) => {
            const o = t.slots = br();
            if (32 & t.vnode.shapeFlag) {
              const t = e._;
              t ? (Ir(o, e, n), n && pn(o, "_", t, !0)) : Sr(e, o)
            } else e && Tr(t, e)
          })(t, i, n || e);
          const r = a ? function(t, e) {
            const n = t.type;
            t.accessCache = Object.create(null), t.proxy = new Proxy(t.ctx, Wa);
            const {
              setup: o
            } = n;
            if (o) {
              Yn();
              const n = t.setupContext = o.length > 1 ? function(t) {
                  const e = e => {
                    t.exposed = e || {}
                  };
                  return {
                    attrs: new Proxy(t.attrs, Bs),
                    slots: t.slots,
                    emit: t.emit,
                    expose: e
                  }
                }(t) : null,
                i = Es(t),
                a = mi(o, t, 0, [t.props, n]),
                r = Xe(a);
              if (Xn(), i(), !r && !t.sp || ma(t) || da(t), r) {
                if (a.then(Ps, Ps), e) return a.then(e => {
                  Ls(t, e)
                }).catch(e => {
                  fi(e, t, 0)
                });
                t.asyncDep = a
              } else Ls(t, a)
            } else _s(t)
          }(t, e) : void 0;
          e && As(!1)
        }(s, !1, r), s.asyncDep) {
        if (i && i.registerDep(s, O, r), !t.el) {
          const o = s.subTree = bs(Zr);
          g(null, o, e, n), t.placeholder = o.el
        }
      } else O(s, t, e, n, i, a, r)
    }, P = (t, e, n) => {
      const o = e.component = t.component;
      if (function(t, e, n) {
          const {
            props: o,
            children: i,
            component: a
          } = t, {
            props: r,
            children: s,
            patchFlag: l
          } = e, c = a.emitsOptions;
          if (e.dirs || e.transition) return !0;
          if (!(n && l >= 0)) return !(!i && !s || s && s.$stable) || o !== r && (o ? !r || qr(o, r, c) : !!r);
          if (1024 & l) return !0;
          if (16 & l) return o ? qr(o, r, c) : !!r;
          if (8 & l) {
            const t = e.dynamicProps;
            for (let e = 0; e < t.length; e++) {
              const n = t[e];
              if (r[n] !== o[n] && !Hr(c, n)) return !0
            }
          }
          return !1
        }(t, e, n)) {
        if (o.asyncDep && !o.asyncResolved) return void M(o, e, n);
        o.next = e, o.update()
      } else e.el = t.el, o.vnode = e
    }, O = (t, e, n, o, i, a, r) => {
      const s = () => {
        if (t.isMounted) {
          let {
            next: e,
            bu: n,
            u: o,
            parent: l,
            vnode: d
          } = t;
          {
            const n = Lr(t);
            if (n) return e && (e.el = d.el, M(t, e, r)), void n.asyncDep.then(() => {
              t.isUnmounted || s()
            })
          }
          let u, p = e;
          Or(t, !1), e ? (e.el = d.el, M(t, e, r)) : e = d, n && un(n), (u = e.props && e.props
            .onVnodeBeforeUpdate) && xs(u, l, e, d), Or(t, !0);
          const m = Gr(t),
            g = t.subTree;
          t.subTree = m, b(g, m, c(g.el), z(g), t, i, a), e.el = m.el, null === p && function({
            vnode: t,
            parent: e
          }, n) {
            for (; e;) {
              const o = e.subTree;
              if (o.suspense && o.suspense.activeBranch === t && (o.el = t.el), o !== t) break;
              (t = e.vnode).el = n, e = e.parent
            }
          }(t, m.el), o && Ar(o, i), (u = e.props && e.props.onVnodeUpdated) && Ar(() => xs(u, l, e, d), i)
        } else {
          let r;
          const {
            el: s,
            props: l
          } = e, {
            bm: c,
            m: d,
            parent: u,
            root: p,
            type: m
          } = t, g = ma(e);
          Or(t, !1), c && un(c), !g && (r = l && l.onVnodeBeforeMount) && xs(r, u, e), Or(t, !0);
          {
            p.ce && !1 !== p.ce._def.shadowRoot && p.ce._injectChildStyle(m);
            const r = t.subTree = Gr(t);
            b(null, r, n, o, t, i, a), e.el = r.el
          }
          if (d && Ar(d, i), !g && (r = l && l.onVnodeMounted)) {
            const t = e;
            Ar(() => xs(r, u, t), i)
          }(256 & e.shapeFlag || u && ma(u.vnode) && 256 & u.vnode.shapeFlag) && t.a && Ar(t.a, i), t
            .isMounted = !0, e = n = o = null
        }
      };
      t.scope.on();
      const l = t.effect = new Bn(s);
      t.scope.off();
      const d = t.update = l.run.bind(l),
        u = t.job = l.runIfDirty.bind(l);
      u.i = t, u.id = t.uid, l.scheduler = () => Ti(u), Or(t, !0), d()
    }, M = (t, e, n) => {
      e.component = t;
      const o = t.vnode.props;
      t.vnode = e, t.next = null,
        function(t, e, n, o) {
          const {
            props: i,
            attrs: a,
            vnode: {
              patchFlag: r
            }
          } = t, s = Wo(i), [l] = t.propsOptions;
          let c = !1;
          if (!(o || r > 0) || 16 & r) {
            let o;
            fr(t, e, i, a) && (c = !0);
            for (const a in s) e && (Ue(e, a) || (o = sn(a)) !== a && Ue(e, o)) || (l ? !n || void 0 === n[a] &&
              void 0 === n[o] || (i[a] = hr(l, s, a, void 0, t, !0)) : delete i[a]);
            if (a !== s)
              for (const t in a) e && Ue(e, t) || (delete a[t], c = !0)
          } else if (8 & r) {
            const n = t.vnode.dynamicProps;
            for (let o = 0; o < n.length; o++) {
              let r = n[o];
              if (Hr(t.emitsOptions, r)) continue;
              const d = e[r];
              if (l)
                if (Ue(a, r)) d !== a[r] && (a[r] = d, c = !0);
                else {
                  const e = an(r);
                  i[e] = hr(l, s, e, d, t, !1)
                }
              else d !== a[r] && (a[r] = d, c = !0)
            }
          }
          c && so(t.attrs, "set", "")
        }(t, e.props, o, n), ((t, e, n) => {
          const {
            vnode: o,
            slots: i
          } = t;
          let a = !0,
            r = _e;
          if (32 & o.shapeFlag) {
            const t = e._;
            t ? n && 1 === t ? a = !1 : Ir(i, e, n) : (a = !e.$stable, Sr(e, i)), r = e
          } else e && (Tr(t, e), r = {
            default: 1
          });
          if (a)
            for (const s in i) xr(s) || null != r[s] || delete i[s]
        })(t, e.children, n), Yn(), Ai(t), Xn()
    }, L = (t, e, n, o, i, a, r, s, c = !1) => {
      const d = t && t.children,
        u = t ? t.shapeFlag : 0,
        p = e.children,
        {
          patchFlag: b,
          shapeFlag: m
        } = e;
      if (b > 0) {
        if (128 & b) return void B(d, p, n, o, i, a, r, s, c);
        if (256 & b) return void _(d, p, n, o, i, a, r, s, c)
      }
      8 & m ? (16 & u && $(d, i, a), p !== d && l(n, p)) : 16 & u ? 16 & m ? B(d, p, n, o, i, a, r, s, c) : $(d, i,
        a, !0) : (8 & u && l(n, ""), 16 & m && w(p, n, o, i, a, r, s, c))
    }, _ = (t, e, n, o, i, a, r, s, l) => {
      e = e || Be;
      const c = (t = t || Be).length,
        d = e.length,
        u = Math.min(c, d);
      let p;
      for (p = 0; p < u; p++) {
        const o = e[p] = l ? vs(e[p]) : hs(e[p]);
        b(t[p], o, n, null, i, a, r, s, l)
      }
      c > d ? $(t, i, a, !0, !1, u) : w(e, n, o, i, a, r, s, l, u)
    }, B = (t, e, n, o, i, a, r, s, l) => {
      let c = 0;
      const d = e.length;
      let u = t.length - 1,
        p = d - 1;
      for (; c <= u && c <= p;) {
        const o = t[c],
          d = e[c] = l ? vs(e[c]) : hs(e[c]);
        if (!cs(o, d)) break;
        b(o, d, n, null, i, a, r, s, l), c++
      }
      for (; c <= u && c <= p;) {
        const o = t[u],
          c = e[p] = l ? vs(e[p]) : hs(e[p]);
        if (!cs(o, c)) break;
        b(o, c, n, null, i, a, r, s, l), u--, p--
      }
      if (c > u) {
        if (c <= p) {
          const t = p + 1,
            u = t < d ? e[t].el : o;
          for (; c <= p;) b(null, e[c] = l ? vs(e[c]) : hs(e[c]), n, u, i, a, r, s, l), c++
        }
      } else if (c > p)
        for (; c <= u;) R(t[c], i, a, !0), c++;
      else {
        const m = c,
          g = c,
          f = new Map;
        for (c = g; c <= p; c++) {
          const t = e[c] = l ? vs(e[c]) : hs(e[c]);
          null != t.key && f.set(t.key, c)
        }
        let h, v = 0;
        const y = p - g + 1;
        let k = !1,
          x = 0;
        const w = new Array(y);
        for (c = 0; c < y; c++) w[c] = 0;
        for (c = m; c <= u; c++) {
          const o = t[c];
          if (v >= y) {
            R(o, i, a, !0);
            continue
          }
          let d;
          if (null != o.key) d = f.get(o.key);
          else
            for (h = g; h <= p; h++)
              if (0 === w[h - g] && cs(o, e[h])) {
                d = h;
                break
              } void 0 === d ? R(o, i, a, !0) : (w[d - g] = c + 1, d >= x ? x = d : k = !0, b(o, e[d], n, null, i,
            a, r, s, l), v++)
        }
        const C = k ? function(t) {
          const e = t.slice(),
            n = [0];
          let o, i, a, r, s;
          const l = t.length;
          for (o = 0; o < l; o++) {
            const l = t[o];
            if (0 !== l) {
              if (i = n[n.length - 1], t[i] < l) {
                e[o] = i, n.push(o);
                continue
              }
              for (a = 0, r = n.length - 1; a < r;) s = a + r >> 1, t[n[s]] < l ? a = s + 1 : r = s;
              l < t[n[a]] && (a > 0 && (e[o] = n[a - 1]), n[a] = o)
            }
          }
          a = n.length, r = n[a - 1];
          for (; a-- > 0;) n[a] = r, r = e[r];
          return n
        }(w) : Be;
        for (h = C.length - 1, c = y - 1; c >= 0; c--) {
          const t = g + c,
            u = e[t],
            p = e[t + 1],
            m = t + 1 < d ? p.el || p.placeholder : o;
          0 === w[c] ? b(null, u, n, m, i, a, r, s, l) : k && (h < 0 || c !== C[h] ? F(u, n, m, 2) : h--)
        }
      }
    }, F = (t, o, i, a, r = null) => {
      const {
        el: s,
        type: l,
        transition: c,
        children: d,
        shapeFlag: u
      } = t;
      if (6 & u) return void F(t.component.subTree, o, i, a);
      if (128 & u) return void t.suspense.move(o, i, a);
      if (64 & u) return void l.move(t, o, i, H);
      if (l === Xr) {
        e(s, o, i);
        for (let t = 0; t < d.length; t++) F(d[t], o, i, a);
        return void e(t.anchor, o, i)
      }
      if (l === Qr) return void h(t, o, i);
      if (2 !== a && 1 & u && c)
        if (0 === a) c.beforeEnter(s), e(s, o, i), Ar(() => c.enter(s), r);
        else {
          const {
            leave: a,
            delayLeave: r,
            afterLeave: l
          } = c, d = () => {
            t.ctx.isUnmounted ? n(s) : e(s, o, i)
          }, u = () => {
            s._isLeaving && s[Yi](!0), a(s, () => {
              d(), l && l()
            })
          };
          r ? r(s, d, u) : u()
        }
      else e(s, o, i)
    }, R = (t, e, n, o = !1, i = !1) => {
      const {
        type: a,
        props: r,
        ref: s,
        children: l,
        dynamicChildren: c,
        shapeFlag: d,
        patchFlag: u,
        dirs: p,
        cacheIndex: b
      } = t;
      if (-2 === u && (i = !1), null != s && (Yn(), pa(s, null, n, t, !0), Xn()), null != b && (e.renderCache[b] =
          void 0), 256 & d) return void e.ctx.deactivate(t);
      const m = 1 & d && p,
        g = !ma(t);
      let f;
      if (g && (f = r && r.onVnodeBeforeUnmount) && xs(f, e, t), 6 & d) N(t.component, n, o);
      else {
        if (128 & d) return void t.suspense.unmount(n, o);
        m && Ri(t, null, e, "beforeUnmount"), 64 & d ? t.type.remove(t, e, n, H, o) : c && !c.hasOnce && (a !==
            Xr || u > 0 && 64 & u) ? $(c, e, n, !1, !0) : (a === Xr && 384 & u || !i && 16 & d) && $(l, e, n), o &&
          D(t)
      }(g && (f = r && r.onVnodeUnmounted) || m) && Ar(() => {
        f && xs(f, e, t), m && Ri(t, null, e, "unmounted")
      }, n)
    }, D = t => {
      const {
        type: e,
        el: o,
        anchor: i,
        transition: a
      } = t;
      if (e === Xr) return void V(o, i);
      if (e === Qr) return void v(t);
      const r = () => {
        n(o), a && !a.persisted && a.afterLeave && a.afterLeave()
      };
      if (1 & t.shapeFlag && a && !a.persisted) {
        const {
          leave: e,
          delayLeave: n
        } = a, i = () => e(o, r);
        n ? n(t.el, r, i) : i()
      } else r()
    }, V = (t, e) => {
      let o;
      for (; t !== e;) o = d(t), n(t), t = o;
      n(e)
    }, N = (t, e, n) => {
      const {
        bum: o,
        scope: i,
        job: a,
        subTree: r,
        um: s,
        m: l,
        a: c
      } = t;
      _r(l), _r(c), o && un(o), i.stop(), a && (a.flags |= 8, R(r, t, e, n)), s && Ar(s, e), Ar(() => {
        t.isUnmounted = !0
      }, e)
    }, $ = (t, e, n, o = !1, i = !1, a = 0) => {
      for (let r = a; r < t.length; r++) R(t[r], e, n, o, i)
    }, z = t => {
      if (6 & t.shapeFlag) return z(t.component.subTree);
      if (128 & t.shapeFlag) return t.suspense.next();
      const e = d(t.anchor || t.el),
        n = e && e[Di];
      return n ? d(n) : e
    };
    let U = !1;
    const j = (t, e, n) => {
        null == t ? e._vnode && R(e._vnode, null, null, !0) : b(e._vnode || null, t, e, null, null, null, n), e
          ._vnode = t, U || (U = !0, Ai(), Ei(), U = !1)
      },
      H = {
        p: b,
        um: R,
        m: F,
        r: D,
        mt: E,
        mc: w,
        pc: L,
        pbc: S,
        n: z,
        o: t
      };
    let G;
    return {
      render: j,
      hydrate: G,
      createApp: cr(j)
    }
  }(t)
}

function Pr({
  type: t,
  props: e
}, n) {
  return "svg" === n && "foreignObject" === t || "mathml" === n && "annotation-xml" === t && e && e.encoding && e
    .encoding.includes("html") ? void 0 : n
}

function Or({
  effect: t,
  job: e
}, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5)
}

function Mr(t, e, n = !1) {
  const o = t.children,
    i = e.children;
  if (je(o) && je(i))
    for (let a = 0; a < o.length; a++) {
      const t = o[a];
      let e = i[a];
      1 & e.shapeFlag && !e.dynamicChildren && ((e.patchFlag <= 0 || 32 === e.patchFlag) && (e = i[a] = vs(i[a]), e.el =
          t.el), n || -2 === e.patchFlag || Mr(t, e)), e.type === Jr && -1 !== e.patchFlag && (e.el = t.el), e.type !==
        Zr || e.el || (e.el = t.el)
    }
}

function Lr(t) {
  const e = t.subTree.component;
  if (e) return e.asyncDep && !e.asyncResolved ? e : Lr(e)
}

function _r(t) {
  if (t)
    for (let e = 0; e < t.length; e++) t[e].flags |= 8
}
const Br = Symbol.for("v-scx"),
  Fr = () => ur(Br);

function Rr(t, e, n) {
  return Dr(t, e, n)
}

function Dr(t, e, n = _e) {
  const {
    immediate: o,
    deep: i,
    flush: a,
    once: r
  } = n, s = Ne({}, n), l = e && o || !e && "post" !== a;
  let c;
  if (Ms)
    if ("sync" === a) {
      const t = Fr();
      c = t.__watcherHandles || (t.__watcherHandles = [])
    } else if (!l) {
    const t = () => {};
    return t.stop = Fe, t.resume = Fe, t.pause = Fe, t
  }
  const d = Ss;
  s.call = (t, e, n) => gi(t, d, e, n);
  let u = !1;
  "post" === a ? s.scheduler = t => {
    Ar(t, d && d.suspense)
  } : "sync" !== a && (u = !0, s.scheduler = (t, e) => {
    e ? t() : Ti(t)
  }), s.augmentJob = t => {
    e && (t.flags |= 4), u && (t.flags |= 2, d && (t.id = d.uid, t.i = d))
  };
  const p = pi(t, e, s);
  return Ms && (c ? c.push(p) : l && p()), p
}

function Vr(t, e, n) {
  const o = this.proxy,
    i = We(t) ? t.includes(".") ? Nr(o, t) : () => o[t] : t.bind(o, o);
  let a;
  Ke(e) ? a = e : (a = e.handler, n = e);
  const r = Es(this),
    s = Dr(i, a.bind(o), n);
  return r(), s
}

function Nr(t, e) {
  const n = e.split(".");
  return () => {
    let e = t;
    for (let t = 0; t < n.length && e; t++) e = e[n[t]];
    return e
  }
}
const $r = (t, e) => "modelValue" === e || "model-value" === e ? t.modelModifiers : t[`${e}Modifiers`] || t[
  `${an(e)}Modifiers`] || t[`${sn(e)}Modifiers`];

function zr(t, e, ...n) {
  if (t.isUnmounted) return;
  const o = t.vnode.props || _e;
  let i = n;
  const a = e.startsWith("update:"),
    r = a && $r(o, e.slice(7));
  let s;
  r && (r.trim && (i = n.map(t => We(t) ? t.trim() : t)), r.number && (i = n.map(bn)));
  let l = o[s = cn(e)] || o[s = cn(an(e))];
  !l && a && (l = o[s = cn(sn(e))]), l && gi(l, t, 6, i);
  const c = o[s + "Once"];
  if (c) {
    if (t.emitted) {
      if (t.emitted[s]) return
    } else t.emitted = {};
    t.emitted[s] = !0, gi(c, t, 6, i)
  }
}
const Ur = new WeakMap;

function jr(t, e, n = !1) {
  const o = n ? Ur : e.emitsCache,
    i = o.get(t);
  if (void 0 !== i) return i;
  const a = t.emits;
  let r = {},
    s = !1;
  if (!Ke(t)) {
    const o = t => {
      const n = jr(t, e, !0);
      n && (s = !0, Ne(r, n))
    };
    !n && e.mixins.length && e.mixins.forEach(o), t.extends && o(t.extends), t.mixins && t.mixins.forEach(o)
  }
  return a || s ? (je(a) ? a.forEach(t => r[t] = null) : Ne(r, a), Ye(t) && o.set(t, r), r) : (Ye(t) && o.set(t, null),
    null)
}

function Hr(t, e) {
  return !(!t || !De(e)) && (e = e.slice(2).replace(/Once$/, ""), Ue(t, e[0].toLowerCase() + e.slice(1)) || Ue(t, sn(
    e)) || Ue(t, e))
}

function Gr(t) {
  const {
    type: e,
    vnode: n,
    proxy: o,
    withProxy: i,
    propsOptions: [a],
    slots: r,
    attrs: s,
    emit: l,
    render: c,
    renderCache: d,
    props: u,
    data: p,
    setupState: b,
    ctx: m,
    inheritAttrs: g
  } = t, f = _i(t);
  let h, v;
  try {
    if (4 & n.shapeFlag) {
      const t = i || o,
        e = t;
      h = hs(c.call(e, t, d, u, b, p, m)), v = s
    } else {
      const t = e;
      0, h = hs(t.length > 1 ? t(u, {
        attrs: s,
        slots: r,
        emit: l
      }) : t(u, null)), v = e.props ? s : Kr(s)
    }
  } catch (k) {
    ts.length = 0, fi(k, t, 1), h = bs(Zr)
  }
  let y = h;
  if (v && !1 !== g) {
    const t = Object.keys(v),
      {
        shapeFlag: e
      } = y;
    t.length && 7 & e && (a && t.some(Ve) && (v = Wr(v, a)), y = ms(y, v, !1, !0))
  }
  return n.dirs && (y = ms(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && sa(y, n
    .transition), h = y, _i(f), h
}
const Kr = t => {
    let e;
    for (const n in t)("class" === n || "style" === n || De(n)) && ((e || (e = {}))[n] = t[n]);
    return e
  },
  Wr = (t, e) => {
    const n = {};
    for (const o in t) Ve(o) && o.slice(9) in e || (n[o] = t[o]);
    return n
  };

function qr(t, e, n) {
  const o = Object.keys(e);
  if (o.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    if (e[a] !== t[a] && !Hr(n, a)) return !0
  }
  return !1
}
const Yr = t => t.__isSuspense;
const Xr = Symbol.for("v-fgt"),
  Jr = Symbol.for("v-txt"),
  Zr = Symbol.for("v-cmt"),
  Qr = Symbol.for("v-stc"),
  ts = [];
let es = null;

function ns(t = !1) {
  ts.push(es = t ? null : [])
}
let os = 1;

function is(t, e = !1) {
  os += t, t < 0 && es && e && (es.hasOnce = !0)
}

function as(t) {
  return t.dynamicChildren = os > 0 ? es || Be : null, ts.pop(), es = ts[ts.length - 1] || null, os > 0 && es && es
    .push(t), t
}

function rs(t, e, n, o, i, a) {
  return as(ps(t, e, n, o, i, a, !0))
}

function ss(t, e, n, o, i) {
  return as(bs(t, e, n, o, i, !0))
}

function ls(t) {
  return !!t && !0 === t.__v_isVNode
}

function cs(t, e) {
  return t.type === e.type && t.key === e.key
}
const ds = ({
    key: t
  }) => null != t ? t : null,
  us = ({
    ref: t,
    ref_key: e,
    ref_for: n
  }) => ("number" == typeof t && (t = "" + t), null != t ? We(t) || Jo(t) || Ke(t) ? {
    i: Mi,
    r: t,
    k: e,
    f: !!n
  } : t : null);

function ps(t, e = null, n = null, o = 0, i = null, a = (t === Xr ? 0 : 1), r = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && ds(e),
    ref: e && us(e),
    scopeId: Li,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: o,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Mi
  };
  return s ? (ys(l, n), 128 & a && t.normalize(l)) : n && (l.shapeFlag |= We(n) ? 8 : 16), os > 0 && !r && es && (l
    .patchFlag > 0 || 6 & a) && 32 !== l.patchFlag && es.push(l), l
}
const bs = function(t, e = null, n = null, o = 0, i = null, a = !1) {
  t && t !== Ba || (t = Zr);
  if (ls(t)) {
    const o = ms(t, e, !0);
    return n && ys(o, n), os > 0 && !a && es && (6 & o.shapeFlag ? es[es.indexOf(t)] = o : es.push(o)), o
      .patchFlag = -2, o
  }
  r = t, Ke(r) && "__vccOpts" in r && (t = t.__vccOpts);
  var r;
  if (e) {
    e = function(t) {
      return t ? Ko(t) || mr(t) ? Ne({}, t) : t : null
    }(e);
    let {
      class: t,
      style: n
    } = e;
    t && !We(t) && (e.class = xn(t)), Ye(n) && (Ko(n) && !je(n) && (n = Ne({}, n)), e.style = fn(n))
  }
  const s = We(t) ? 1 : Yr(t) ? 128 : Vi(t) ? 64 : Ye(t) ? 4 : Ke(t) ? 2 : 0;
  return ps(t, e, n, o, i, s, a, !0)
};

function ms(t, e, n = !1, o = !1) {
  const {
    props: i,
    ref: a,
    patchFlag: r,
    children: s,
    transition: l
  } = t, c = e ? ks(i || {}, e) : i, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: c,
    key: c && ds(c),
    ref: e && e.ref ? n && a ? je(a) ? a.concat(us(e)) : [a, us(e)] : us(e) : a,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: s,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== Xr ? -1 === r ? 16 : 16 | r : r,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: l,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && ms(t.ssContent),
    ssFallback: t.ssFallback && ms(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return l && o && sa(d, l.clone(d)), d
}

function gs(t = " ", e = 0) {
  return bs(Jr, null, t, e)
}

function fs(t = "", e = !1) {
  return e ? (ns(), ss(Zr, null, t)) : bs(Zr, null, t)
}

function hs(t) {
  return null == t || "boolean" == typeof t ? bs(Zr) : je(t) ? bs(Xr, null, t.slice()) : ls(t) ? vs(t) : bs(Jr, null,
    String(t))
}

function vs(t) {
  return null === t.el && -1 !== t.patchFlag || t.memo ? t : ms(t)
}

function ys(t, e) {
  let n = 0;
  const {
    shapeFlag: o
  } = t;
  if (null == e) e = null;
  else if (je(e)) n = 16;
  else if ("object" == typeof e) {
    if (65 & o) {
      const n = e.default;
      return void(n && (n._c && (n._d = !1), ys(t, n()), n._c && (n._d = !0)))
    } {
      n = 32;
      const o = e._;
      o || mr(e) ? 3 === o && Mi && (1 === Mi.slots._ ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024)) : e._ctx = Mi
    }
  } else Ke(e) ? (e = {
    default: e,
    _ctx: Mi
  }, n = 32) : (e = String(e), 64 & o ? (n = 16, e = [gs(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n
}

function ks(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    for (const t in o)
      if ("class" === t) e.class !== o.class && (e.class = xn([e.class, o.class]));
      else if ("style" === t) e.style = fn([e.style, o.style]);
    else if (De(t)) {
      const n = e[t],
        i = o[t];
      !i || n === i || je(n) && n.includes(i) || (e[t] = n ? [].concat(n, i) : i)
    } else "" !== t && (e[t] = o[t])
  }
  return e
}

function xs(t, e, n, o = null) {
  gi(t, e, 7, [n, o])
}
const ws = sr();
let Cs = 0;
let Ss = null;
const Ts = () => Ss || Mi;
let Is, As;
{
  const t = gn(),
    e = (e, n) => {
      let o;
      return (o = t[e]) || (o = t[e] = []), o.push(n), t => {
        o.length > 1 ? o.forEach(e => e(t)) : o[0](t)
      }
    };
  Is = e("__VUE_INSTANCE_SETTERS__", t => Ss = t), As = e("__VUE_SSR_SETTERS__", t => Ms = t)
}
const Es = t => {
    const e = Ss;
    return Is(t), t.scope.on(), () => {
      t.scope.off(), Is(e)
    }
  },
  Ps = () => {
    Ss && Ss.scope.off(), Is(null)
  };

function Os(t) {
  return 4 & t.vnode.shapeFlag
}
let Ms = !1;

function Ls(t, e, n) {
  Ke(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Ye(e) && (t.setupState = ii(e)), _s(t)
}

function _s(t, e, n) {
  const o = t.type;
  t.render || (t.render = o.render || Fe);
  {
    const e = Es(t);
    Yn();
    try {
      Xa(t)
    } finally {
      Xn(), e()
    }
  }
}
const Bs = {
  get: (t, e) => (ro(t, 0, ""), t[e])
};

function Fs(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(ii(qo(t.exposed)), {
    get: (e, n) => n in e ? e[n] : n in Ga ? Ga[n](t) : void 0,
    has: (t, e) => e in t || e in Ga
  })) : t.proxy
}

function Rs(t, e = !0) {
  return Ke(t) ? t.displayName || t.name : t.name || e && t.__name
}
const Ds = (t, e) => {
  const n = function(t, e, n = !1) {
    let o, i;
    return Ke(t) ? o = t : (o = t.get, i = t.set), new li(o, i, n)
  }(t, 0, Ms);
  return n
};

function Vs(t, e, n) {
  try {
    is(-1);
    const o = arguments.length;
    return 2 === o ? Ye(e) && !je(e) ? ls(e) ? bs(t, null, [e]) : bs(t, e) : bs(t, null, e) : (o > 3 ? n = Array
      .prototype.slice.call(arguments, 2) : 3 === o && ls(n) && (n = [n]), bs(t, e, n))
  } finally {
    is(1)
  }
}
const Ns = "3.5.24";
let $s;
const zs = "undefined" != typeof window && window.trustedTypes;
if (zs) try {
  $s = zs.createPolicy("vue", {
    createHTML: t => t
  })
} catch (aD) {}
const Us = $s ? t => $s.createHTML(t) : t => t,
  js = "undefined" != typeof document ? document : null,
  Hs = js && js.createElement("template"),
  Gs = {
    insert: (t, e, n) => {
      e.insertBefore(t, n || null)
    },
    remove: t => {
      const e = t.parentNode;
      e && e.removeChild(t)
    },
    createElement: (t, e, n, o) => {
      const i = "svg" === e ? js.createElementNS("http://www.w3.org/2000/svg", t) : "mathml" === e ? js
        .createElementNS("http://www.w3.org/1998/Math/MathML", t) : n ? js.createElement(t, {
          is: n
        }) : js.createElement(t);
      return "select" === t && o && null != o.multiple && i.setAttribute("multiple", o.multiple), i
    },
    createText: t => js.createTextNode(t),
    createComment: t => js.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e
    },
    setElementText: (t, e) => {
      t.textContent = e
    },
    parentNode: t => t.parentNode,
    nextSibling: t => t.nextSibling,
    querySelector: t => js.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "")
    },
    insertStaticContent(t, e, n, o, i, a) {
      const r = n ? n.previousSibling : e.lastChild;
      if (i && (i === a || i.nextSibling))
        for (; e.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
      else {
        Hs.innerHTML = Us("svg" === o ? `<svg>${t}</svg>` : "mathml" === o ? `<math>${t}</math>` : t);
        const i = Hs.content;
        if ("svg" === o || "mathml" === o) {
          const t = i.firstChild;
          for (; t.firstChild;) i.appendChild(t.firstChild);
          i.removeChild(t)
        }
        e.insertBefore(i, n)
      }
      return [r ? r.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild]
    }
  },
  Ks = "transition",
  Ws = "animation",
  qs = Symbol("_vtc"),
  Ys = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  },
  Xs = Ne({}, Qi, Ys),
  Js = (t => (t.displayName = "Transition", t.props = Xs, t))((t, {
    slots: e
  }) => Vs(na, tl(t), e)),
  Zs = (t, e = []) => {
    je(t) ? t.forEach(t => t(...e)) : t && t(...e)
  },
  Qs = t => !!t && (je(t) ? t.some(t => t.length > 1) : t.length > 1);

function tl(t) {
  const e = {};
  for (const E in t) E in Ys || (e[E] = t[E]);
  if (!1 === t.css) return e;
  const {
    name: n = "v",
    type: o,
    duration: i,
    enterFromClass: a = `${n}-enter-from`,
    enterActiveClass: r = `${n}-enter-active`,
    enterToClass: s = `${n}-enter-to`,
    appearFromClass: l = a,
    appearActiveClass: c = r,
    appearToClass: d = s,
    leaveFromClass: u = `${n}-leave-from`,
    leaveActiveClass: p = `${n}-leave-active`,
    leaveToClass: b = `${n}-leave-to`
  } = t, m = function(t) {
    if (null == t) return null;
    if (Ye(t)) return [el(t.enter), el(t.leave)];
    {
      const e = el(t);
      return [e, e]
    }
  }(i), g = m && m[0], f = m && m[1], {
    onBeforeEnter: h,
    onEnter: v,
    onEnterCancelled: y,
    onLeave: k,
    onLeaveCancelled: x,
    onBeforeAppear: w = h,
    onAppear: C = v,
    onAppearCancelled: S = y
  } = e, T = (t, e, n, o) => {
    t._enterCancelled = o, ol(t, e ? d : s), ol(t, e ? c : r), n && n()
  }, I = (t, e) => {
    t._isLeaving = !1, ol(t, u), ol(t, b), ol(t, p), e && e()
  }, A = t => (e, n) => {
    const i = t ? C : v,
      r = () => T(e, t, n);
    Zs(i, [e, r]), il(() => {
      ol(e, t ? l : a), nl(e, t ? d : s), Qs(i) || rl(e, o, g, r)
    })
  };
  return Ne(e, {
    onBeforeEnter(t) {
      Zs(h, [t]), nl(t, a), nl(t, r)
    },
    onBeforeAppear(t) {
      Zs(w, [t]), nl(t, l), nl(t, c)
    },
    onEnter: A(!1),
    onAppear: A(!0),
    onLeave(t, e) {
      t._isLeaving = !0;
      const n = () => I(t, e);
      nl(t, u), t._enterCancelled ? (nl(t, p), dl(t)) : (dl(t), nl(t, p)), il(() => {
        t._isLeaving && (ol(t, u), nl(t, b), Qs(k) || rl(t, o, f, n))
      }), Zs(k, [t, n])
    },
    onEnterCancelled(t) {
      T(t, !1, void 0, !0), Zs(y, [t])
    },
    onAppearCancelled(t) {
      T(t, !0, void 0, !0), Zs(S, [t])
    },
    onLeaveCancelled(t) {
      I(t), Zs(x, [t])
    }
  })
}

function el(t) {
  const e = (t => {
    const e = We(t) ? Number(t) : NaN;
    return isNaN(e) ? t : e
  })(t);
  return e
}

function nl(t, e) {
  e.split(/\s+/).forEach(e => e && t.classList.add(e)), (t[qs] || (t[qs] = new Set)).add(e)
}

function ol(t, e) {
  e.split(/\s+/).forEach(e => e && t.classList.remove(e));
  const n = t[qs];
  n && (n.delete(e), n.size || (t[qs] = void 0))
}

function il(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t)
  })
}
let al = 0;

function rl(t, e, n, o) {
  const i = t._endId = ++al,
    a = () => {
      i === t._endId && o()
    };
  if (null != n) return setTimeout(a, n);
  const {
    type: r,
    timeout: s,
    propCount: l
  } = sl(t, e);
  if (!r) return o();
  const c = r + "end";
  let d = 0;
  const u = () => {
      t.removeEventListener(c, p), a()
    },
    p = e => {
      e.target === t && ++d >= l && u()
    };
  setTimeout(() => {
    d < l && u()
  }, s + 1), t.addEventListener(c, p)
}

function sl(t, e) {
  const n = window.getComputedStyle(t),
    o = t => (n[t] || "").split(", "),
    i = o(`${Ks}Delay`),
    a = o(`${Ks}Duration`),
    r = ll(i, a),
    s = o(`${Ws}Delay`),
    l = o(`${Ws}Duration`),
    c = ll(s, l);
  let d = null,
    u = 0,
    p = 0;
  e === Ks ? r > 0 && (d = Ks, u = r, p = a.length) : e === Ws ? c > 0 && (d = Ws, u = c, p = l.length) : (u = Math.max(
    r, c), d = u > 0 ? r > c ? Ks : Ws : null, p = d ? d === Ks ? a.length : l.length : 0);
  return {
    type: d,
    timeout: u,
    propCount: p,
    hasTransform: d === Ks && /\b(?:transform|all)(?:,|$)/.test(o(`${Ks}Property`).toString())
  }
}

function ll(t, e) {
  for (; t.length < e.length;) t = t.concat(t);
  return Math.max(...e.map((e, n) => cl(e) + cl(t[n])))
}

function cl(t) {
  return "auto" === t ? 0 : 1e3 * Number(t.slice(0, -1).replace(",", "."))
}

function dl(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight
}
const ul = Symbol("_vod"),
  pl = Symbol("_vsh"),
  bl = {
    name: "show",
    beforeMount(t, {
      value: e
    }, {
      transition: n
    }) {
      t[ul] = "none" === t.style.display ? "" : t.style.display, n && e ? n.beforeEnter(t) : ml(t, e)
    },
    mounted(t, {
      value: e
    }, {
      transition: n
    }) {
      n && e && n.enter(t)
    },
    updated(t, {
      value: e,
      oldValue: n
    }, {
      transition: o
    }) {
      !e != !n && (o ? e ? (o.beforeEnter(t), ml(t, !0), o.enter(t)) : o.leave(t, () => {
        ml(t, !1)
      }) : ml(t, e))
    },
    beforeUnmount(t, {
      value: e
    }) {
      ml(t, e)
    }
  };

function ml(t, e) {
  t.style.display = e ? t[ul] : "none", t[pl] = !e
}
const gl = Symbol(""),
  fl = /(?:^|;)\s*display\s*:/;
const hl = /\s*!important$/;

function vl(t, e, n) {
  if (je(n)) n.forEach(n => vl(t, e, n));
  else if (null == n && (n = ""), e.startsWith("--")) t.setProperty(e, n);
  else {
    const o = function(t, e) {
      const n = kl[e];
      if (n) return n;
      let o = an(e);
      if ("filter" !== o && o in t) return kl[e] = o;
      o = ln(o);
      for (let i = 0; i < yl.length; i++) {
        const n = yl[i] + o;
        if (n in t) return kl[e] = n
      }
      return e
    }(t, e);
    hl.test(n) ? t.setProperty(sn(o), n.replace(hl, ""), "important") : t[o] = n
  }
}
const yl = ["Webkit", "Moz", "ms"],
  kl = {};
const xl = "http://www.w3.org/1999/xlink";

function wl(t, e, n, o, i, a = Cn(e)) {
  o && e.startsWith("xlink:") ? null == n ? t.removeAttributeNS(xl, e.slice(6, e.length)) : t.setAttributeNS(xl, e, n) :
    null == n || a && !Sn(n) ? t.removeAttribute(e) : t.setAttribute(e, a ? "" : qe(n) ? String(n) : n)
}

function Cl(t, e, n, o, i) {
  if ("innerHTML" === e || "textContent" === e) return void(null != n && (t[e] = "innerHTML" === e ? Us(n) : n));
  const a = t.tagName;
  if ("value" === e && "PROGRESS" !== a && !a.includes("-")) {
    const o = "OPTION" === a ? t.getAttribute("value") || "" : t.value,
      i = null == n ? "checkbox" === t.type ? "on" : "" : String(n);
    return o === i && "_value" in t || (t.value = i), null == n && t.removeAttribute(e), void(t._value = n)
  }
  let r = !1;
  if ("" === n || null == n) {
    const o = typeof t[e];
    "boolean" === o ? n = Sn(n) : null == n && "string" === o ? (n = "", r = !0) : "number" === o && (n = 0, r = !0)
  }
  try {
    t[e] = n
  } catch (aD) {}
  r && t.removeAttribute(i || e)
}
const Sl = Symbol("_vei");

function Tl(t, e, n, o, i = null) {
  const a = t[Sl] || (t[Sl] = {}),
    r = a[e];
  if (o && r) r.value = o;
  else {
    const [n, s] = function(t) {
      let e;
      if (Il.test(t)) {
        let n;
        for (e = {}; n = t.match(Il);) t = t.slice(0, t.length - n[0].length), e[n[0].toLowerCase()] = !0
      }
      const n = ":" === t[2] ? t.slice(3) : sn(t.slice(2));
      return [n, e]
    }(e);
    if (o) {
      const r = a[e] = function(t, e) {
        const n = t => {
          if (t._vts) {
            if (t._vts <= n.attached) return
          } else t._vts = Date.now();
          gi(function(t, e) {
            if (je(e)) {
              const n = t.stopImmediatePropagation;
              return t.stopImmediatePropagation = () => {
                n.call(t), t._stopped = !0
              }, e.map(t => e => !e._stopped && t && t(e))
            }
            return e
          }(t, n.value), e, 5, [t])
        };
        return n.value = t, n.attached = Pl(), n
      }(o, i);
      ! function(t, e, n, o) {
        t.addEventListener(e, n, o)
      }(t, n, r, s)
    } else r && (! function(t, e, n, o) {
      t.removeEventListener(e, n, o)
    }(t, n, r, s), a[e] = void 0)
  }
}
const Il = /(?:Once|Passive|Capture)$/;
let Al = 0;
const El = Promise.resolve(),
  Pl = () => Al || (El.then(() => Al = 0), Al = Date.now());
const Ol = t => 111 === t.charCodeAt(0) && 110 === t.charCodeAt(1) && t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123;
const Ml = new WeakMap,
  Ll = new WeakMap,
  _l = Symbol("_moveCb"),
  Bl = Symbol("_enterCb"),
  Fl = (t => (delete t.props.mode, t))({
    name: "TransitionGroup",
    props: Ne({}, Xs, {
      tag: String,
      moveClass: String
    }),
    setup(t, {
      slots: e
    }) {
      const n = Ts(),
        o = Ji();
      let i, a;
      return Ta(() => {
        if (!i.length) return;
        const e = t.moveClass || `${t.name||"v"}-move`;
        if (! function(t, e, n) {
            const o = t.cloneNode(),
              i = t[qs];
            i && i.forEach(t => {
              t.split(/\s+/).forEach(t => t && o.classList.remove(t))
            });
            n.split(/\s+/).forEach(t => t && o.classList.add(t)), o.style.display = "none";
            const a = 1 === e.nodeType ? e : e.parentNode;
            a.appendChild(o);
            const {
              hasTransform: r
            } = sl(o);
            return a.removeChild(o), r
          }(i[0].el, n.vnode.el, e)) return void(i = []);
        i.forEach(Rl), i.forEach(Dl);
        const o = i.filter(Vl);
        dl(n.vnode.el), o.forEach(t => {
          const n = t.el,
            o = n.style;
          nl(n, e), o.transform = o.webkitTransform = o.transitionDuration = "";
          const i = n[_l] = t => {
            t && t.target !== n || t && !t.propertyName.endsWith("transform") || (n.removeEventListener(
              "transitionend", i), n[_l] = null, ol(n, e))
          };
          n.addEventListener("transitionend", i)
        }), i = []
      }), () => {
        const r = Wo(t),
          s = tl(r);
        let l = r.tag || Xr;
        if (i = [], a)
          for (let t = 0; t < a.length; t++) {
            const e = a[t];
            e.el && e.el instanceof Element && (i.push(e), sa(e, ia(e, s, o, n)), Ml.set(e, {
              left: e.el.offsetLeft,
              top: e.el.offsetTop
            }))
          }
        a = e.default ? la(e.default()) : [];
        for (let t = 0; t < a.length; t++) {
          const e = a[t];
          null != e.key && sa(e, ia(e, s, o, n))
        }
        return bs(l, null, a)
      }
    }
  });

function Rl(t) {
  const e = t.el;
  e[_l] && e[_l](), e[Bl] && e[Bl]()
}

function Dl(t) {
  Ll.set(t, {
    left: t.el.offsetLeft,
    top: t.el.offsetTop
  })
}

function Vl(t) {
  const e = Ml.get(t),
    n = Ll.get(t),
    o = e.left - n.left,
    i = e.top - n.top;
  if (o || i) {
    const e = t.el.style;
    return e.transform = e.webkitTransform = `translate(${o}px,${i}px)`, e.transitionDuration = "0s", t
  }
}
const Nl = ["ctrl", "shift", "alt", "meta"],
  $l = {
    stop: t => t.stopPropagation(),
    prevent: t => t.preventDefault(),
    self: t => t.target !== t.currentTarget,
    ctrl: t => !t.ctrlKey,
    shift: t => !t.shiftKey,
    alt: t => !t.altKey,
    meta: t => !t.metaKey,
    left: t => "button" in t && 0 !== t.button,
    middle: t => "button" in t && 1 !== t.button,
    right: t => "button" in t && 2 !== t.button,
    exact: (t, e) => Nl.some(n => t[`${n}Key`] && !e.includes(n))
  },
  zl = (t, e) => {
    const n = t._withMods || (t._withMods = {}),
      o = e.join(".");
    return n[o] || (n[o] = (n, ...o) => {
      for (let t = 0; t < e.length; t++) {
        const o = $l[e[t]];
        if (o && o(n, e)) return
      }
      return t(n, ...o)
    })
  },
  Ul = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  },
  jl = (t, e) => {
    const n = t._withKeys || (t._withKeys = {}),
      o = e.join(".");
    return n[o] || (n[o] = n => {
      if (!("key" in n)) return;
      const o = sn(n.key);
      return e.some(t => t === o || Ul[t] === o) ? t(n) : void 0
    })
  },
  Hl = Ne({
    patchProp: (t, e, n, o, i, a) => {
      const r = "svg" === i;
      "class" === e ? function(t, e, n) {
        const o = t[qs];
        o && (e = (e ? [e, ...o] : [...o]).join(" ")), null == e ? t.removeAttribute("class") : n ? t
          .setAttribute("class", e) : t.className = e
      }(t, o, r) : "style" === e ? function(t, e, n) {
        const o = t.style,
          i = We(n);
        let a = !1;
        if (n && !i) {
          if (e)
            if (We(e))
              for (const t of e.split(";")) {
                const e = t.slice(0, t.indexOf(":")).trim();
                null == n[e] && vl(o, e, "")
              } else
                for (const t in e) null == n[t] && vl(o, t, "");
          for (const t in n) "display" === t && (a = !0), vl(o, t, n[t])
        } else if (i) {
          if (e !== n) {
            const t = o[gl];
            t && (n += ";" + t), o.cssText = n, a = fl.test(n)
          }
        } else e && t.removeAttribute("style");
        ul in t && (t[ul] = a ? o.display : "", t[pl] && (o.display = "none"))
      }(t, n, o) : De(e) ? Ve(e) || Tl(t, e, 0, o, a) : ("." === e[0] ? (e = e.slice(1), 1) : "^" === e[0] ? (e =
        e.slice(1), 0) : function(t, e, n, o) {
        if (o) return "innerHTML" === e || "textContent" === e || !!(e in t && Ol(e) && Ke(n));
        if ("spellcheck" === e || "draggable" === e || "translate" === e || "autocorrect" === e) return !1;
        if ("sandbox" === e && "IFRAME" === t.tagName) return !1;
        if ("form" === e) return !1;
        if ("list" === e && "INPUT" === t.tagName) return !1;
        if ("type" === e && "TEXTAREA" === t.tagName) return !1;
        if ("width" === e || "height" === e) {
          const e = t.tagName;
          if ("IMG" === e || "VIDEO" === e || "CANVAS" === e || "SOURCE" === e) return !1
        }
        if (Ol(e) && We(n)) return !1;
        return e in t
      }(t, e, o, r)) ? (Cl(t, e, o), t.tagName.includes("-") || "value" !== e && "checked" !== e && "selected" !==
        e || wl(t, e, o, r, 0, "value" !== e)) : !t._isVueCE || !/[A-Z]/.test(e) && We(o) ? ("true-value" === e ?
        t._trueValue = o : "false-value" === e && (t._falseValue = o), wl(t, e, o, r)) : Cl(t, an(e), o, 0, e)
    }
  }, Gs);
let Gl;
const Kl = 24,
  Wl = 25,
  ql = 26,
  Yl = 27,
  Xl = 28,
  Jl = 29,
  Zl = 31,
  Ql = 32;

function tc(t, ...e) {
  return K(t, null, void 0)
}
const ec = s("__translateVNode"),
  nc = s("__datetimeParts"),
  oc = s("__numberParts"),
  ic = s("__setPluralRules"),
  ac = s("__injectWithOption"),
  rc = s("__dispose");

function sc(t) {
  if (!C(t)) return t;
  if (pt(t)) return t;
  for (const e in t)
    if (v(t, e))
      if (e.includes(".")) {
        const n = e.split("."),
          o = n.length - 1;
        let i = t,
          a = !1;
        for (let t = 0; t < o; t++) {
          if ("__proto__" === n[t]) throw new Error(`unsafe key: ${n[t]}`);
          if (n[t] in i || (i[n[t]] = m()), !C(i[n[t]])) {
            a = !0;
            break
          }
          i = i[n[t]]
        }
        if (a || (pt(i) ? St.includes(n[o]) || delete t[e] : (i[n[o]] = t[e], delete t[e])), !pt(i)) {
          const t = i[n[o]];
          C(t) && sc(t)
        }
      } else C(t[e]) && sc(t[e]);
  return t
}

function lc(t, e) {
  const {
    messages: n,
    __i18n: o,
    messageResolver: i,
    flatJson: a
  } = e, r = I(n) ? n : y(o) ? m() : {
    [t]: m()
  };
  if (y(o) && o.forEach(t => {
      if ("locale" in t && "resource" in t) {
        const {
          locale: e,
          resource: n
        } = t;
        e ? (r[e] = r[e] || m(), P(n, r[e])) : P(n, r)
      } else x(t) && P(JSON.parse(t), r)
    }), null == i && a)
    for (const s in r) v(r, s) && sc(r[s]);
  return r
}

function cc(t) {
  return t.type
}

function dc(t) {
  return bs(Jr, null, t, 0)
}
const uc = () => [],
  pc = () => !1;
let bc = 0;

function mc(t) {
  return (e, n, o, i) => t(n, o, Ts() || void 0, i)
}

function gc(t = {}) {
  const {
    __root: e,
    __injectWithOption: n
  } = t, o = void 0 === e, i = t.flatJson, a = r ? Zo : Qo;
  let s = !w(t.inheritLocale) || t.inheritLocale;
  const l = a(e && s ? e.locale.value : x(t.locale) ? t.locale : Zt),
    u = a(e && s ? e.fallbackLocale.value : x(t.fallbackLocale) || y(t.fallbackLocale) || I(t.fallbackLocale) || !1 ===
      t.fallbackLocale ? t.fallbackLocale : l.value),
    b = a(lc(l.value, t)),
    m = a(I(t.datetimeFormats) ? t.datetimeFormats : {
      [l.value]: {}
    }),
    g = a(I(t.numberFormats) ? t.numberFormats : {
      [l.value]: {}
    });
  let f = e ? e.missingWarn : !w(t.missingWarn) && !d(t.missingWarn) || t.missingWarn,
    h = e ? e.fallbackWarn : !w(t.fallbackWarn) && !d(t.fallbackWarn) || t.fallbackWarn,
    S = e ? e.fallbackRoot : !w(t.fallbackRoot) || t.fallbackRoot,
    T = !!t.fallbackFormat,
    A = k(t.missing) ? t.missing : null,
    E = k(t.missing) ? mc(t.missing) : null,
    O = k(t.postTranslation) ? t.postTranslation : null,
    M = e ? e.warnHtmlMessage : !w(t.warnHtmlMessage) || t.warnHtmlMessage,
    L = !!t.escapeParameter;
  const _ = e ? e.modifiers : I(t.modifiers) ? t.modifiers : {};
  let B, F = t.pluralRules || e && e.pluralRules;
  B = (() => {
    o && ie(null);
    const e = {
      version: "11.1.12",
      locale: l.value,
      fallbackLocale: u.value,
      messages: b.value,
      modifiers: _,
      pluralRules: F,
      missing: null === E ? void 0 : E,
      missingWarn: f,
      fallbackWarn: h,
      fallbackFormat: T,
      unresolving: !0,
      postTranslation: null === O ? void 0 : O,
      warnHtmlMessage: M,
      escapeParameter: L,
      messageResolver: t.messageResolver,
      messageCompiler: t.messageCompiler,
      __meta: {
        framework: "vue"
      }
    };
    e.datetimeFormats = m.value, e.numberFormats = g.value, e.__datetimeFormatters = I(B) ? B.__datetimeFormatters :
      void 0, e.__numberFormatters = I(B) ? B.__numberFormatters : void 0;
    const n = re(e);
    return o && ie(n), n
  })(), ce(B, l.value, u.value);
  const R = Ds({
      get: () => l.value,
      set: t => {
        B.locale = t, l.value = t
      }
    }),
    D = Ds({
      get: () => u.value,
      set: t => {
        B.fallbackLocale = t, u.value = t, ce(B, l.value, t)
      }
    }),
    V = Ds(() => b.value),
    N = Ds(() => m.value),
    $ = Ds(() => g.value);
  const z = (t, n, i, a, r, s) => {
    let d;
    l.value, u.value, b.value, m.value, g.value;
    try {
      0,
      o || (B.fallbackContext = e ? oe : void 0),
      d = t(B)
    }
    finally {
      o || (B.fallbackContext = void 0)
    }
    if ("translate exists" !== i && c(d) && -1 === d || "translate exists" === i && !d) {
      const [t, o] = n();
      return e && S ? a(e) : r(t)
    }
    if (s(d)) return d;
    throw tc(Kl)
  };

  function U(...t) {
    return z(e => Reflect.apply(Ee, null, [e, ...t]), () => Me(...t), "translate", e => Reflect.apply(e.t, e, [...t]),
      t => t, t => x(t))
  }
  const j = {
    normalize: function(t) {
      return t.map(t => x(t) || c(t) || w(t) ? dc(String(t)) : t)
    },
    interpolate: t => t,
    type: "vnode"
  };

  function H(t) {
    return b.value[t] || {}
  }
  bc++, e && r && (Rr(e.locale, t => {
    s && (l.value = t, B.locale = t, ce(B, l.value, u.value))
  }), Rr(e.fallbackLocale, t => {
    s && (u.value = t, B.fallbackLocale = t, ce(B, l.value, u.value))
  }));
  const G = {
    id: bc,
    locale: R,
    fallbackLocale: D,
    get inheritLocale() {
      return s
    },
    set inheritLocale(t) {
      s = t, t && e && (l.value = e.locale.value, u.value = e.fallbackLocale.value, ce(B, l.value, u.value))
    },
    get availableLocales() {
      return Object.keys(b.value).sort()
    },
    messages: V,
    get modifiers() {
      return _
    },
    get pluralRules() {
      return F || {}
    },
    get isGlobal() {
      return o
    },
    get missingWarn() {
      return f
    },
    set missingWarn(t) {
      f = t, B.missingWarn = f
    },
    get fallbackWarn() {
      return h
    },
    set fallbackWarn(t) {
      h = t, B.fallbackWarn = h
    },
    get fallbackRoot() {
      return S
    },
    set fallbackRoot(t) {
      S = t
    },
    get fallbackFormat() {
      return T
    },
    set fallbackFormat(t) {
      T = t, B.fallbackFormat = T
    },
    get warnHtmlMessage() {
      return M
    },
    set warnHtmlMessage(t) {
      M = t, B.warnHtmlMessage = t
    },
    get escapeParameter() {
      return L
    },
    set escapeParameter(t) {
      L = t, B.escapeParameter = t
    },
    t: U,
    getLocaleMessage: H,
    setLocaleMessage: function(t, e) {
      if (i) {
        const n = {
          [t]: e
        };
        for (const t in n) v(n, t) && sc(n[t]);
        e = n[t]
      }
      b.value[t] = e, B.messages = b.value
    },
    mergeLocaleMessage: function(t, e) {
      b.value[t] = b.value[t] || {};
      const n = {
        [t]: e
      };
      if (i)
        for (const o in n) v(n, o) && sc(n[o]);
      P(e = n[t], b.value[t]), B.messages = b.value
    },
    getPostTranslationHandler: function() {
      return k(O) ? O : null
    },
    setPostTranslationHandler: function(t) {
      O = t, B.postTranslation = t
    },
    getMissingHandler: function() {
      return A
    },
    setMissingHandler: function(t) {
      null !== t && (E = mc(t)), A = t, B.missing = E
    },
    [ic]: function(t) {
      F = t, B.pluralRules = F
    }
  };
  return G.datetimeFormats = N, G.numberFormats = $, G.rt = function(...t) {
    const [e, n, o] = t;
    if (o && !C(o)) throw tc(Wl);
    return U(e, n, p({
      resolvedMessage: !0
    }, o || {}))
  }, G.te = function(t, e) {
    return z(() => {
      if (!t) return !1;
      const n = H(x(e) ? e : l.value),
        o = B.messageResolver(n, t);
      return pt(o) || Ae(o) || x(o)
    }, () => [t], "translate exists", n => Reflect.apply(n.te, n, [t, e]), pc, t => w(t))
  }, G.tm = function(t) {
    const n = function(t) {
      let e = null;
      const n = Ut(B, u.value, l.value);
      for (let o = 0; o < n.length; o++) {
        const i = b.value[n[o]] || {},
          a = B.messageResolver(i, t);
        if (null != a) {
          e = a;
          break
        }
      }
      return e
    }(t);
    return null != n ? n : e && e.tm(t) || {}
  }, G.d = function(...t) {
    return z(e => Reflect.apply(pe, null, [e, ...t]), () => me(...t), "datetime format", e => Reflect.apply(e.d, e, [
      ...t
    ]), () => "", t => x(t) || y(t))
  }, G.n = function(...t) {
    return z(e => Reflect.apply(fe, null, [e, ...t]), () => ve(...t), "number format", e => Reflect.apply(e.n, e, [...
      t
    ]), () => "", t => x(t) || y(t))
  }, G.getDateTimeFormat = function(t) {
    return m.value[t] || {}
  }, G.setDateTimeFormat = function(t, e) {
    m.value[t] = e, B.datetimeFormats = m.value, ge(B, t, e)
  }, G.mergeDateTimeFormat = function(t, e) {
    m.value[t] = p(m.value[t] || {}, e), B.datetimeFormats = m.value, ge(B, t, e)
  }, G.getNumberFormat = function(t) {
    return g.value[t] || {}
  }, G.setNumberFormat = function(t, e) {
    g.value[t] = e, B.numberFormats = g.value, ye(B, t, e)
  }, G.mergeNumberFormat = function(t, e) {
    g.value[t] = p(g.value[t] || {}, e), B.numberFormats = g.value, ye(B, t, e)
  }, G[ac] = n, G[ec] = function(...t) {
    return z(e => {
      let n;
      const o = e;
      try {
        o.processor = j, n = Reflect.apply(Ee, null, [o, ...t])
      } finally {
        o.processor = null
      }
      return n
    }, () => Me(...t), "translate", e => e[ec](...t), t => [dc(t)], t => y(t))
  }, G[nc] = function(...t) {
    return z(e => Reflect.apply(pe, null, [e, ...t]), () => me(...t), "datetime format", e => e[nc](...t), uc, t => x(
      t) || y(t))
  }, G[oc] = function(...t) {
    return z(e => Reflect.apply(fe, null, [e, ...t]), () => ve(...t), "number format", e => e[oc](...t), uc, t => x(
      t) || y(t))
  }, G
}
const fc = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: t => "parent" === t || "global" === t,
    default: "parent"
  },
  i18n: {
    type: Object
  }
};

function hc() {
  return Xr
}
const vc = ca({
  name: "i18n-t",
  props: p({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: t => c(t) || !isNaN(t)
    }
  }, fc),
  setup(t, e) {
    const {
      slots: n,
      attrs: o
    } = e, i = t.i18n || Tc({
      useScope: t.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter(t => "_" !== t[0]),
        r = m();
      t.locale && (r.locale = t.locale), void 0 !== t.plural && (r.plural = x(t.plural) ? +t.plural : t.plural);
      const s = function({
          slots: t
        }, e) {
          if (1 === e.length && "default" === e[0]) return (t.default ? t.default() : []).reduce((t, e) => [...t,
            ...e.type === Xr ? e.children : [e]
          ], []);
          return e.reduce((e, n) => {
            const o = t[n];
            return o && (e[n] = o()), e
          }, m())
        }(e, a),
        l = i[ec](t.keypath, s, r),
        c = p(m(), o);
      return Vs(x(t.tag) || C(t.tag) ? t.tag : hc(), c, l)
    }
  }
});

function yc(t, e, n, o) {
  const {
    slots: i,
    attrs: a
  } = e;
  return () => {
    const e = {
      part: !0
    };
    let r = m();
    t.locale && (e.locale = t.locale), x(t.format) ? e.key = t.format : C(t.format) && (x(t.format.key) && (e.key = t
      .format.key), r = Object.keys(t.format).reduce((e, o) => n.includes(o) ? p(m(), e, {
      [o]: t.format[o]
    }) : e, m()));
    const s = o(t.value, e, r);
    let l = [e.key];
    y(s) ? l = s.map((t, e) => {
      const n = i[t.type],
        o = n ? n({
          [t.type]: t.value,
          index: e,
          parts: s
        }) : [t.value];
      var a;
      return y(a = o) && !x(a[0]) && (o[0].key = `${t.type}-${e}`), o
    }) : x(s) && (l = [s]);
    const c = p(m(), a);
    return Vs(x(t.tag) || C(t.tag) ? t.tag : hc(), c, l)
  }
}
const kc = ca({
  name: "i18n-n",
  props: p({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, fc),
  setup(t, e) {
    const n = t.i18n || Tc({
      useScope: t.scope,
      __useComponent: !0
    });
    return yc(t, e, he, (...t) => n[oc](...t))
  }
});

function xc(t) {
  if (x(t)) return {
    path: t
  };
  if (I(t)) {
    if (!("path" in t)) throw tc(Xl);
    return t
  }
  throw tc(Jl)
}

function wc(t) {
  const {
    path: e,
    locale: n,
    args: o,
    choice: i,
    plural: a
  } = t, r = {}, s = o || {};
  return x(n) && (r.locale = n), c(i) && (r.plural = i), c(a) && (r.plural = a), [e, s, r]
}

function Cc(t, e, ...n) {
  const o = I(n[0]) ? n[0] : {};
  (!w(o.globalInstall) || o.globalInstall) && ([vc.name, "I18nT"].forEach(e => t.component(e, vc)), [kc.name, "I18nN"]
    .forEach(e => t.component(e, kc)), [Ec.name, "I18nD"].forEach(e => t.component(e, Ec))), t.directive("t", function(
    t) {
    const e = e => {
      const {
        instance: n,
        value: o
      } = e;
      if (!n || !n.$) throw tc(Ql);
      const i = function(t, e) {
          const n = t;
          if ("composition" === t.mode) return n.__getInstance(e) || t.global;
          {
            const o = n.__getInstance(e);
            return null != o ? o.__composer : t.global.__composer
          }
        }(t, n.$),
        a = xc(o);
      return [Reflect.apply(i.t, i, [...wc(a)]), i]
    };
    return {
      created: (n, o) => {
        const [i, a] = e(o);
        r && t.global === a && (n.__i18nWatcher = Rr(a.locale, () => {
          o.instance && o.instance.$forceUpdate()
        })), n.__composer = a, n.textContent = i
      },
      unmounted: t => {
        r && t.__i18nWatcher && (t.__i18nWatcher(), t.__i18nWatcher = void 0, delete t.__i18nWatcher), t
          .__composer && (t.__composer = void 0, delete t.__composer)
      },
      beforeUpdate: (t, {
        value: e
      }) => {
        if (t.__composer) {
          const n = t.__composer,
            o = xc(e);
          t.textContent = Reflect.apply(n.t, n, [...wc(o)])
        }
      },
      getSSRProps: t => {
        const [n] = e(t);
        return {
          textContent: n
        }
      }
    }
  }(e))
}
const Sc = s("global-vue-i18n");

function Tc(t = {}) {
  const e = Ts();
  if (null == e) throw tc(ql);
  if (!e.isCE && null != e.appContext.app && !e.appContext.app.__VUE_I18N_SYMBOL__) throw tc(Yl);
  const n = function(t) {
      const e = ur(t.isCE ? Sc : t.appContext.app.__VUE_I18N_SYMBOL__);
      if (!e) throw tc(t.isCE ? Zl : Ql);
      return e
    }(e),
    o = function(t) {
      return "composition" === t.mode ? t.global : t.global.__composer
    }(n),
    i = cc(e),
    a = function(t, e) {
      return u(t) ? "__i18n" in e ? "local" : "global" : t.useScope ? t.useScope : "local"
    }(t, i);
  if ("global" === a) return function(t, e, n) {
    let o = C(e.messages) ? e.messages : m();
    "__i18nGlobal" in n && (o = lc(t.locale.value, {
      messages: o,
      __i18n: n.__i18nGlobal
    }));
    const i = Object.keys(o);
    if (i.length && i.forEach(e => {
        t.mergeLocaleMessage(e, o[e])
      }), C(e.datetimeFormats)) {
      const n = Object.keys(e.datetimeFormats);
      n.length && n.forEach(n => {
        t.mergeDateTimeFormat(n, e.datetimeFormats[n])
      })
    }
    if (C(e.numberFormats)) {
      const n = Object.keys(e.numberFormats);
      n.length && n.forEach(n => {
        t.mergeNumberFormat(n, e.numberFormats[n])
      })
    }
  }(o, t, i), o;
  if ("parent" === a) {
    let i = function(t, e, n = !1) {
      let o = null;
      const i = e.root;
      let a = function(t, e = !1) {
        if (null == t) return null;
        return e && t.vnode.ctx || t.parent
      }(e, n);
      for (; null != a;) {
        const e = t;
        if ("composition" === t.mode && (o = e.__getInstance(a)), null != o) break;
        if (i === a) break;
        a = a.parent
      }
      return o
    }(n, e, t.__useComponent);
    return null == i && (i = o), i
  }
  const r = n;
  let s = r.__getInstance(e);
  if (null == s) {
    const n = p({}, t);
    "__i18n" in i && (n.__i18n = i.__i18n), o && (n.__root = o), s = gc(n), r.__composerExtend && (s[rc] = r
        .__composerExtend(s)),
      function(t, e, n) {
        Ca(() => {}, e), Aa(() => {
          const o = n;
          t.__deleteInstance(e);
          const i = o[rc];
          i && (i(), delete o[rc])
        }, e)
      }(r, e, s), r.__setInstance(e, s)
  }
  return s
}
const Ic = ["locale", "fallbackLocale", "availableLocales"],
  Ac = ["t", "rt", "d", "n", "tm", "te"];
const Ec = ca({
  name: "i18n-d",
  props: p({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, fc),
  setup(t, e) {
    const n = t.i18n || Tc({
      useScope: t.scope,
      __useComponent: !0
    });
    return yc(t, e, be, (...t) => n[nc](...t))
  }
});

function Pc(t, e) {
  const n = {
    ...t
  };
  return Object.keys(t).forEach(o => {
    const i = t[o],
      a = e?.[o];
    Mc(i) && null != a ? n[o] = Pc(i, a) : Oc(i, a) ? n[o] = a : n[o] = i
  }), n
}

function Oc(t, e) {
  return typeof e == typeof t && Array.isArray(e) == Array.isArray(t) || null === e
}

function Mc(t) {
  return null !== t && t instanceof Object && !Array.isArray(t)
}

function Lc(t, e) {
  return function(t, e, n = "sync") {
    const o = Zo(e);
    let i = !0;
    const a = Mc(e),
      r = new Promise(r => {
        chrome.storage[n].get(t, async n => {
          void 0 !== n?.[t] && (a && Mc(n[t]) ? o.value = Pc(e, n[t]) : Oc(e, n[t]) && (o.value = n[t])),
            await Si(), i = !1, r(o)
        })
      });
    return Rr(o, o => {
      i || Oc(e, o) && chrome.storage[n].set({
        [t]: Wo(o)
      })
    }, {
      deep: !0,
      flush: "post"
    }), chrome.storage[n].onChanged.addListener(async function(e) {
      if (e?.[t]) {
        i = !0;
        const {
          oldValue: n,
          newValue: a
        } = e[t];
        o.value = a, await Si(), i = !1
      }
    }), {
      data: o,
      promise: r
    }
  }(t, e, "local")
}
te = function(t, e) {
  if (x(t)) {
    !w(e.warnHtmlMessage) || e.warnHtmlMessage;
    const n = (e.onCacheKey || Pt)(t),
      o = Ot[n];
    if (o) return o;
    const {
      ast: i,
      detectError: a
    } = function(t, e = {}) {
      let n = !1;
      const o = e.onError || W;
      return e.onError = t => {
        n = !0, o(t)
      }, {
        ...ut(t, e),
        detectError: n
      }
    }(t, {
      ...e,
      location: !1,
      jit: !0
    }), r = It(i);
    return a ? r : Ot[n] = r
  } {
    const e = t.cacheKey;
    if (e) {
      const n = Ot[e];
      return n || (Ot[e] = It(t))
    }
    return It(t)
  }
}, ee = function(t, e) {
  if (!C(t)) return null;
  let n = Xt.get(e);
  if (n || (n = function(t) {
      const e = [];
      let n, o, i, a, r, s, l, c = -1,
        d = 0,
        u = 0;
      const p = [];

      function b() {
        const e = t[c + 1];
        if (5 === d && "'" === e || 6 === d && '"' === e) return c++, i = "\\" + e, p[0](), !0
      }
      for (p[0] = () => {
          void 0 === o ? o = i : o += i
        }, p[1] = () => {
          void 0 !== o && (e.push(o), o = void 0)
        }, p[2] = () => {
          p[0](), u++
        }, p[3] = () => {
          if (u > 0) u--, d = 4, p[0]();
          else {
            if (u = 0, void 0 === o) return !1;
            if (o = Yt(o), !1 === o) return !1;
            p[1]()
          }
        }; null !== d;)
        if (c++, n = t[c], "\\" !== n || !b()) {
          if (a = qt(n), l = Kt[d], r = l[a] || l.l || 8, 8 === r) return;
          if (d = r[0], void 0 !== r[1] && (s = p[r[1]], s && (i = n, !1 === s()))) return;
          if (7 === d) return e
        }
    }(e), n && Xt.set(e, n)), !n) return null;
  const o = n.length;
  let i = t,
    a = 0;
  for (; a < o;) {
    const t = n[a];
    if (St.includes(t) && pt(i)) return null;
    const e = i[t];
    if (void 0 === e) return null;
    if (k(i)) return null;
    i = e, a++
  }
  return i
}, ne = Ut;
const _c = navigator.language.split("-")[0] || "en",
  {
    data: Bc
  } = Lc("user-locale", _c),
  Fc = function(t = {}) {
    const e = !w(t.globalInjection) || t.globalInjection,
      n = new Map,
      [o, i] = function(t) {
        const e = Ln(),
          n = e.run(() => gc(t));
        if (null == n) throw tc(Ql);
        return [e, n]
      }(t),
      a = s(""),
      r = {
        get mode() {
          return "composition"
        },
        async install(t, ...n) {
          if (t.__VUE_I18N_SYMBOL__ = a, t.provide(t.__VUE_I18N_SYMBOL__, r), I(n[0])) {
            const t = n[0];
            r.__composerExtend = t.__composerExtend, r.__vueI18nExtend = t.__vueI18nExtend
          }
          let o = null;
          e && (o = function(t, e) {
            const n = Object.create(null);
            Ic.forEach(t => {
              const o = Object.getOwnPropertyDescriptor(e, t);
              if (!o) throw tc(Ql);
              const i = Jo(o.value) ? {
                get: () => o.value.value,
                set(t) {
                  o.value.value = t
                }
              } : {
                get: () => o.get && o.get()
              };
              Object.defineProperty(n, t, i)
            }), t.config.globalProperties.$i18n = n, Ac.forEach(n => {
              const o = Object.getOwnPropertyDescriptor(e, n);
              if (!o || !o.value) throw tc(Ql);
              Object.defineProperty(t.config.globalProperties, `$${n}`, o)
            });
            const o = () => {
              delete t.config.globalProperties.$i18n, Ac.forEach(e => {
                delete t.config.globalProperties[`$${e}`]
              })
            };
            return o
          }(t, r.global)), Cc(t, r, ...n);
          const i = t.unmount;
          t.unmount = () => {
            o && o(), r.dispose(), i()
          }
        },
        get global() {
          return i
        },
        dispose() {
          o.stop()
        },
        __instances: n,
        __getInstance: function(t) {
          return n.get(t) || null
        },
        __setInstance: function(t, e) {
          n.set(t, e)
        },
        __deleteInstance: function(t) {
          n.delete(t)
        }
      };
    return r
  }({
    globalInjection: !0,
    locale: Bc.value,
    fallbackLocale: ["en"],
    messages: i
  });
Rr(Bc, t => {
  t && (Fc.global.locale.value = t)
});
const Rc = Symbol();
var Dc, Vc;
(Vc = Dc || (Dc = {})).direct = "direct", Vc.patchObject = "patch object", Vc.patchFunction = "patch function";
const Nc = function() {
    const t = Ln(!0),
      e = t.run(() => Zo({}));
    let n = [],
      o = [];
    const i = qo({
      install(t) {
        i._a = t, t.provide(Rc, i), t.config.globalProperties.$pinia = i, o.forEach(t => n.push(t)), o = []
      },
      use(t) {
        return this._a ? n.push(t) : o.push(t), this
      },
      _p: n,
      _a: null,
      _e: t,
      _s: new Map,
      state: e
    });
    return i
  }(),

  $c = Zo([]),
  zc = () => ({
    generationProgress: $c,
    updateProgress: (t, e, n, o, i) => {
      const a = {
          groupId: t,
          promptIndex: e,
          percentage: n,
          status: o,
          prompt: i
        },
        r = $c.value.findIndex(n => n.groupId === t && n.promptIndex === e);
      $c.value = r >= 0 ? $c.value.map((t, e) => e === r ? a : t) : [...$c.value, a]
    },
    clearProgress: () => {
      $c.value = []
    }
  });
var Uc = Symbol();
