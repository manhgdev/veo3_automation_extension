/** SheetJS (embedded) — do not edit; import spreadsheet only */
var Hb = 1252,
  Gb = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4],
  Kb = {
    0: 1252,
    1: 65001,
    2: 65001,
    77: 1e4,
    128: 932,
    129: 949,
    130: 1361,
    134: 936,
    136: 950,
    161: 1253,
    162: 1254,
    163: 1258,
    177: 1255,
    178: 1256,
    186: 1257,
    204: 1251,
    222: 874,
    238: 1250,
    255: 1252,
    69: 6969
  },
  Wb = function(t) {
    -1 != Gb.indexOf(t) && (Hb = Kb[0] = t)
  };
var qb = function(t) {
  Wb(t)
};

function Yb() {
  qb(1200), Wb(1252)
}

function Xb(t) {
  for (var e = [], n = 0, o = t.length; n < o; ++n) e[n] = t.charCodeAt(n);
  return e
}

function Jb(t) {
  for (var e = [], n = 0; n < t.length >> 1; ++n) e[n] = String.fromCharCode(t.charCodeAt(2 * n + 1) + (t.charCodeAt(2 *
    n) << 8));
  return e.join("")
}
var Zb, Qb = function(t) {
    var e = t.charCodeAt(0),
      n = t.charCodeAt(1);
    return 255 == e && 254 == n ? function(t) {
      for (var e = [], n = 0; n < t.length >> 1; ++n) e[n] = String.fromCharCode(t.charCodeAt(2 * n) + (t.charCodeAt(
        2 * n + 1) << 8));
      return e.join("")
    }(t.slice(2)) : 254 == e && 255 == n ? Jb(t.slice(2)) : 65279 == e ? t.slice(1) : t
  },
  tm = function(t) {
    return String.fromCharCode(t)
  },
  em = function(t) {
    return String.fromCharCode(t)
  },
  nm = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function om(t) {
  for (var e = "", n = 0, o = 0, i = 0, a = 0, r = 0, s = 0, l = 0, c = 0; c < t.length;) a = (n = t.charCodeAt(c++)) >>
    2, r = (3 & n) << 4 | (o = t.charCodeAt(c++)) >> 4, s = (15 & o) << 2 | (i = t.charCodeAt(c++)) >> 6, l = 63 & i,
    isNaN(o) ? s = l = 64 : isNaN(i) && (l = 64), e += nm.charAt(a) + nm.charAt(r) + nm.charAt(s) + nm.charAt(l);
  return e
}

function im(t) {
  var e = "",
    n = 0,
    o = 0,
    i = 0,
    a = 0,
    r = 0,
    s = 0;
  t = t.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < t.length;) n = nm.indexOf(t.charAt(l++)) << 2 | (a = nm.indexOf(t.charAt(l++))) >> 4, e += String
    .fromCharCode(n), o = (15 & a) << 4 | (r = nm.indexOf(t.charAt(l++))) >> 2, 64 !== r && (e += String.fromCharCode(
      o)), i = (3 & r) << 6 | (s = nm.indexOf(t.charAt(l++))), 64 !== s && (e += String.fromCharCode(i));
  return e
}
var am = function() {
    return "undefined" != typeof Buffer && "undefined" != typeof process && void 0 !== process.versions && !!process
      .versions.node
  }(),
  rm = function() {
    if ("undefined" != typeof Buffer) {
      var t = !Buffer.from;
      if (!t) try {
        Buffer.from("foo", "utf8")
      } catch (aD) {
        t = !0
      }
      return t ? function(t, e) {
        return e ? new Buffer(t, e) : new Buffer(t)
      } : Buffer.from.bind(Buffer)
    }
    return function() {}
  }();

function sm(t) {
  return am ? Buffer.alloc ? Buffer.alloc(t) : new Buffer(t) : "undefined" != typeof Uint8Array ? new Uint8Array(t) :
    new Array(t)
}

function lm(t) {
  return am ? Buffer.allocUnsafe ? Buffer.allocUnsafe(t) : new Buffer(t) : "undefined" != typeof Uint8Array ?
    new Uint8Array(t) : new Array(t)
}
var cm = function(t) {
  return am ? rm(t, "binary") : t.split("").map(function(t) {
    return 255 & t.charCodeAt(0)
  })
};

function dm(t) {
  if (Array.isArray(t)) return t.map(function(t) {
    return String.fromCharCode(t)
  }).join("");
  for (var e = [], n = 0; n < t.length; ++n) e[n] = String.fromCharCode(t[n]);
  return e.join("")
}

function um(t) {
  if ("undefined" == typeof ArrayBuffer) throw new Error("Unsupported");
  if (t instanceof ArrayBuffer) return um(new Uint8Array(t));
  for (var e = new Array(t.length), n = 0; n < t.length; ++n) e[n] = t[n];
  return e
}
var pm = am ? function(t) {
  return Buffer.concat(t.map(function(t) {
    return Buffer.isBuffer(t) ? t : rm(t)
  }))
} : function(t) {
  if ("undefined" != typeof Uint8Array) {
    var e = 0,
      n = 0;
    for (e = 0; e < t.length; ++e) n += t[e].length;
    var o = new Uint8Array(n),
      i = 0;
    for (e = 0, n = 0; e < t.length; n += i, ++e)
      if (i = t[e].length, t[e] instanceof Uint8Array) o.set(t[e], n);
      else {
        if ("string" == typeof t[e]) throw "wtf";
        o.set(new Uint8Array(t[e]), n)
      } return o
  }
  return [].concat.apply([], t.map(function(t) {
    return Array.isArray(t) ? t : [].slice.call(t)
  }))
};
var bm = /\u0000/g,
  mm = /[\u0001-\u0006]/g;

function gm(t) {
  for (var e = "", n = t.length - 1; n >= 0;) e += t.charAt(n--);
  return e
}

function fm(t, e) {
  var n = "" + t;
  return n.length >= e ? n : Sg("0", e - n.length) + n
}

function hm(t, e) {
  var n = "" + t;
  return n.length >= e ? n : Sg(" ", e - n.length) + n
}

function vm(t, e) {
  var n = "" + t;
  return n.length >= e ? n : n + Sg(" ", e - n.length)
}
var ym = Math.pow(2, 32);

function km(t, e) {
  return t > ym || t < -ym ? function(t, e) {
    var n = "" + Math.round(t);
    return n.length >= e ? n : Sg("0", e - n.length) + n
  }(t, e) : function(t, e) {
    var n = "" + t;
    return n.length >= e ? n : Sg("0", e - n.length) + n
  }(Math.round(t), e)
}

function xm(t, e) {
  return e = e || 0, t.length >= 7 + e && 103 == (32 | t.charCodeAt(e)) && 101 == (32 | t.charCodeAt(e + 1)) && 110 == (
    32 | t.charCodeAt(e + 2)) && 101 == (32 | t.charCodeAt(e + 3)) && 114 == (32 | t.charCodeAt(e + 4)) && 97 == (32 |
    t.charCodeAt(e + 5)) && 108 == (32 | t.charCodeAt(e + 6))
}
var wm = [
    ["Sun", "Sunday"],
    ["Mon", "Monday"],
    ["Tue", "Tuesday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"]
  ],
  Cm = [
    ["J", "Jan", "January"],
    ["F", "Feb", "February"],
    ["M", "Mar", "March"],
    ["A", "Apr", "April"],
    ["M", "May", "May"],
    ["J", "Jun", "June"],
    ["J", "Jul", "July"],
    ["A", "Aug", "August"],
    ["S", "Sep", "September"],
    ["O", "Oct", "October"],
    ["N", "Nov", "November"],
    ["D", "Dec", "December"]
  ];
var Sm = {
    0: "General",
    1: "0",
    2: "0.00",
    3: "#,##0",
    4: "#,##0.00",
    9: "0%",
    10: "0.00%",
    11: "0.00E+00",
    12: "# ?/?",
    13: "# ??/??",
    14: "m/d/yy",
    15: "d-mmm-yy",
    16: "d-mmm",
    17: "mmm-yy",
    18: "h:mm AM/PM",
    19: "h:mm:ss AM/PM",
    20: "h:mm",
    21: "h:mm:ss",
    22: "m/d/yy h:mm",
    37: "#,##0 ;(#,##0)",
    38: "#,##0 ;[Red](#,##0)",
    39: "#,##0.00;(#,##0.00)",
    40: "#,##0.00;[Red](#,##0.00)",
    45: "mm:ss",
    46: "[h]:mm:ss",
    47: "mmss.0",
    48: "##0.0E+0",
    49: "@",
    56: '"\u4e0a\u5348/\u4e0b\u5348 "hh"\u6642"mm"\u5206"ss"\u79d2 "'
  },
  Tm = {
    5: 37,
    6: 38,
    7: 39,
    8: 40,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 14,
    28: 14,
    29: 14,
    30: 14,
    31: 14,
    50: 14,
    51: 14,
    52: 14,
    53: 14,
    54: 14,
    55: 14,
    56: 14,
    57: 14,
    58: 14,
    59: 1,
    60: 2,
    61: 3,
    62: 4,
    67: 9,
    68: 10,
    69: 12,
    70: 13,
    71: 14,
    72: 14,
    73: 15,
    74: 16,
    75: 17,
    76: 20,
    77: 21,
    78: 22,
    79: 45,
    80: 46,
    81: 47,
    82: 0
  },
  Im = {
    5: '"$"#,##0_);\\("$"#,##0\\)',
    63: '"$"#,##0_);\\("$"#,##0\\)',
    6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
    42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
    43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
    44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
  };

function Am(t, e, n) {
  for (var o = t < 0 ? -1 : 1, i = t * o, a = 0, r = 1, s = 0, l = 1, c = 0, d = 0, u = Math.floor(i); c < e && (s = (
      u = Math.floor(i)) * r + a, d = u * c + l, !(i - u < 5e-8));) i = 1 / (i - u), a = r, r = s, l = c, c = d;
  if (d > e && (c > e ? (d = l, s = a) : (d = c, s = r)), !n) return [0, o * s, d];
  var p = Math.floor(o * s / d);
  return [p, o * s - p * d, d]
}

function Em(t, e, n) {
  if (t > 2958465 || t < 0) return null;
  var o = 0 | t,
    i = Math.floor(86400 * (t - o)),
    a = 0,
    r = [],
    s = {
      D: o,
      T: i,
      u: 86400 * (t - o) - i,
      y: 0,
      m: 0,
      d: 0,
      H: 0,
      M: 0,
      S: 0,
      q: 0
    };
  if (Math.abs(s.u) < 1e-6 && (s.u = 0), e && e.date1904 && (o += 1462), s.u > .9999 && (s.u = 0, 86400 == ++i && (s.T =
      i = 0, ++o, ++s.D)), 60 === o) r = n ? [1317, 10, 29] : [1900, 2, 29], a = 3;
  else if (0 === o) r = n ? [1317, 8, 29] : [1900, 1, 0], a = 6;
  else {
    o > 60 && --o;
    var l = new Date(1900, 0, 1);
    l.setDate(l.getDate() + o - 1), r = [l.getFullYear(), l.getMonth() + 1, l.getDate()], a = l.getDay(), o < 60 && (a =
      (a + 6) % 7), n && (a = function(t, e) {
      e[0] -= 581;
      var n = t.getDay();
      t < 60 && (n = (n + 6) % 7);
      return n
    }(l, r))
  }
  return s.y = r[0], s.m = r[1], s.d = r[2], s.S = i % 60, i = Math.floor(i / 60), s.M = i % 60, i = Math.floor(i / 60),
    s.H = i, s.q = a, s
}
var Pm = new Date(1899, 11, 31, 0, 0, 0),
  Om = Pm.getTime(),
  Mm = new Date(1900, 2, 1, 0, 0, 0);

function Lm(t, e) {
  var n = t.getTime();
  return e ? n -= 1262304e5 : t >= Mm && (n += 864e5), (n - (Om + 6e4 * (t.getTimezoneOffset() - Pm
  .getTimezoneOffset()))) / 864e5
}

function _m(t) {
  return -1 == t.indexOf(".") ? t : t.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1")
}

function Bm(t) {
  var e, n = Math.floor(Math.log(Math.abs(t)) * Math.LOG10E);
  return e = n >= -4 && n <= -1 ? t.toPrecision(10 + n) : Math.abs(n) <= 9 ? function(t) {
    var e = t < 0 ? 12 : 11,
      n = _m(t.toFixed(12));
    return n.length <= e || (n = t.toPrecision(10)).length <= e ? n : t.toExponential(5)
  }(t) : 10 === n ? t.toFixed(10).substr(0, 12) : function(t) {
    var e = _m(t.toFixed(11));
    return e.length > (t < 0 ? 12 : 11) || "0" === e || "-0" === e ? t.toPrecision(6) : e
  }(t), _m(function(t) {
    return -1 == t.indexOf("E") ? t : t.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/,
      "$10$2")
  }(e.toUpperCase()))
}

function Fm(t, e) {
  switch (typeof t) {
    case "string":
      return t;
    case "boolean":
      return t ? "TRUE" : "FALSE";
    case "number":
      return (0 | t) === t ? t.toString(10) : Bm(t);
    case "undefined":
      return "";
    case "object":
      if (null == t) return "";
      if (t instanceof Date) return ng(14, Lm(t, e && e.date1904), e)
  }
  throw new Error("unsupported value in General format: " + t)
}

function Rm(t, e, n, o) {
  var i, a = "",
    r = 0,
    s = 0,
    l = n.y,
    c = 0;
  switch (t) {
    case 98:
      l = n.y + 543;
    case 121:
      switch (e.length) {
        case 1:
        case 2:
          i = l % 100, c = 2;
          break;
        default:
          i = l % 1e4, c = 4
      }
      break;
    case 109:
      switch (e.length) {
        case 1:
        case 2:
          i = n.m, c = e.length;
          break;
        case 3:
          return Cm[n.m - 1][1];
        case 5:
          return Cm[n.m - 1][0];
        default:
          return Cm[n.m - 1][2]
      }
      break;
    case 100:
      switch (e.length) {
        case 1:
        case 2:
          i = n.d, c = e.length;
          break;
        case 3:
          return wm[n.q][0];
        default:
          return wm[n.q][1]
      }
      break;
    case 104:
      switch (e.length) {
        case 1:
        case 2:
          i = 1 + (n.H + 11) % 12, c = e.length;
          break;
        default:
          throw "bad hour format: " + e
      }
      break;
    case 72:
      switch (e.length) {
        case 1:
        case 2:
          i = n.H, c = e.length;
          break;
        default:
          throw "bad hour format: " + e
      }
      break;
    case 77:
      switch (e.length) {
        case 1:
        case 2:
          i = n.M, c = e.length;
          break;
        default:
          throw "bad minute format: " + e
      }
      break;
    case 115:
      if ("s" != e && "ss" != e && ".0" != e && ".00" != e && ".000" != e) throw "bad second format: " + e;
      return 0 !== n.u || "s" != e && "ss" != e ? (s = o >= 2 ? 3 === o ? 1e3 : 100 : 1 === o ? 10 : 1, (r = Math.round(
        s * (n.S + n.u))) >= 60 * s && (r = 0), "s" === e ? 0 === r ? "0" : "" + r / s : (a = fm(r, 2 + o), "ss" ===
        e ? a.substr(0, 2) : "." + a.substr(2, e.length - 1))) : fm(n.S, e.length);
    case 90:
      switch (e) {
        case "[h]":
        case "[hh]":
          i = 24 * n.D + n.H;
          break;
        case "[m]":
        case "[mm]":
          i = 60 * (24 * n.D + n.H) + n.M;
          break;
        case "[s]":
        case "[ss]":
          i = 60 * (60 * (24 * n.D + n.H) + n.M) + Math.round(n.S + n.u);
          break;
        default:
          throw "bad abstime format: " + e
      }
      c = 3 === e.length ? 1 : 2;
      break;
    case 101:
      i = l, c = 1
  }
  return c > 0 ? fm(i, c) : ""
}

function Dm(t) {
  if (t.length <= 3) return t;
  for (var e = t.length % 3, n = t.substr(0, e); e != t.length; e += 3) n += (n.length > 0 ? "," : "") + t.substr(e, 3);
  return n
}
var Vm = /%/g;

function Nm(t, e) {
  var n, o = t.indexOf("E") - t.indexOf(".") - 1;
  if (t.match(/^#+0.0E\+0$/)) {
    if (0 == e) return "0.0E+0";
    if (e < 0) return "-" + Nm(t, -e);
    var i = t.indexOf("."); - 1 === i && (i = t.indexOf("E"));
    var a = Math.floor(Math.log(e) * Math.LOG10E) % i;
    if (a < 0 && (a += i), -1 === (n = (e / Math.pow(10, a)).toPrecision(o + 1 + (i + a) % i)).indexOf("e")) {
      var r = Math.floor(Math.log(e) * Math.LOG10E);
      for (-1 === n.indexOf(".") ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (r - n.length + a) : n += "E+" + (r -
        a);
        "0." === n.substr(0, 2);) n = (n = n.charAt(0) + n.substr(2, i) + "." + n.substr(2 + i)).replace(/^0+([1-9])/,
        "$1").replace(/^0+\./, "0.");
      n = n.replace(/\+-/, "-")
    }
    n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(t, e, n, o) {
      return e + n + o.substr(0, (i + a) % i) + "." + o.substr(a) + "E"
    })
  } else n = e.toExponential(o);
  return t.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), t
    .match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E")
}
var $m = /# (\?+)( ?)\/( ?)(\d+)/;
var zm = /^#*0*\.([0#]+)/,
  Um = /\).*[0#]/,
  jm = /\(###\) ###\\?-####/;

function Hm(t) {
  for (var e, n = "", o = 0; o != t.length; ++o) switch (e = t.charCodeAt(o)) {
    case 35:
      break;
    case 63:
      n += " ";
      break;
    case 48:
      n += "0";
      break;
    default:
      n += String.fromCharCode(e)
  }
  return n
}

function Gm(t, e) {
  var n = Math.pow(10, e);
  return "" + Math.round(t * n) / n
}

function Km(t, e) {
  var n = t - Math.floor(t),
    o = Math.pow(10, e);
  return e < ("" + Math.round(n * o)).length ? 0 : Math.round(n * o)
}

function Wm(t, e, n) {
  if (40 === t.charCodeAt(0) && !e.match(Um)) {
    var o = e.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return n >= 0 ? Wm("n", o, n) : "(" + Wm("n", o, -n) + ")"
  }
  if (44 === e.charCodeAt(e.length - 1)) return function(t, e, n) {
    for (var o = e.length - 1; 44 === e.charCodeAt(o - 1);) --o;
    return Xm(t, e.substr(0, o), n / Math.pow(10, 3 * (e.length - o)))
  }(t, e, n);
  if (-1 !== e.indexOf("%")) return function(t, e, n) {
    var o = e.replace(Vm, ""),
      i = e.length - o.length;
    return Xm(t, o, n * Math.pow(10, 2 * i)) + Sg("%", i)
  }(t, e, n);
  if (-1 !== e.indexOf("E")) return Nm(e, n);
  if (36 === e.charCodeAt(0)) return "$" + Wm(t, e.substr(" " == e.charAt(1) ? 2 : 1), n);
  var i, a, r, s, l = Math.abs(n),
    c = n < 0 ? "-" : "";
  if (e.match(/^00+$/)) return c + km(l, e.length);
  if (e.match(/^[#?]+$/)) return "0" === (i = km(n, 0)) && (i = ""), i.length > e.length ? i : Hm(e.substr(0, e.length -
    i.length)) + i;
  if (a = e.match($m)) return function(t, e, n) {
    var o = parseInt(t[4], 10),
      i = Math.round(e * o),
      a = Math.floor(i / o),
      r = i - a * o,
      s = o;
    return n + (0 === a ? "" : "" + a) + " " + (0 === r ? Sg(" ", t[1].length + 1 + t[4].length) : hm(r, t[1]
      .length) + t[2] + "/" + t[3] + fm(s, t[4].length))
  }(a, l, c);
  if (e.match(/^#+0+$/)) return c + km(l, e.length - e.indexOf("0"));
  if (a = e.match(zm)) return i = Gm(n, a[1].length).replace(/^([^\.]+)$/, "$1." + Hm(a[1])).replace(/\.$/, "." + Hm(a[
    1])).replace(/\.(\d*)$/, function(t, e) {
    return "." + e + Sg("0", Hm(a[1]).length - e.length)
  }), -1 !== e.indexOf("0.") ? i : i.replace(/^0\./, ".");
  if (e = e.replace(/^#+([0.])/, "$1"), a = e.match(/^(0*)\.(#*)$/)) return c + Gm(l, a[2].length).replace(
    /\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
  if (a = e.match(/^#{1,3},##0(\.?)$/)) return c + Dm(km(l, 0));
  if (a = e.match(/^#,##0\.([#0]*0)$/)) return n < 0 ? "-" + Wm(t, e, -n) : Dm("" + (Math.floor(n) + function(t, e) {
    return e < ("" + Math.round((t - Math.floor(t)) * Math.pow(10, e))).length ? 1 : 0
  }(n, a[1].length))) + "." + fm(Km(n, a[1].length), a[1].length);
  if (a = e.match(/^#,#*,#0/)) return Wm(t, e.replace(/^#,#*,/, ""), n);
  if (a = e.match(/^([0#]+)(\\?-([0#]+))+$/)) return i = gm(Wm(t, e.replace(/[\\-]/g, ""), n)), r = 0, gm(gm(e.replace(
    /\\/g, "")).replace(/[0#]/g, function(t) {
    return r < i.length ? i.charAt(r++) : "0" === t ? "0" : ""
  }));
  if (e.match(jm)) return "(" + (i = Wm(t, "##########", n)).substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
  var d = "";
  if (a = e.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return r = Math.min(a[4].length, 7), s = Am(l, Math.pow(10, r) - 1, !
      1), i = "" + c, " " == (d = Xm("n", a[1], s[1])).charAt(d.length - 1) && (d = d.substr(0, d.length - 1) + "0"),
    i += d + a[2] + "/" + a[3], (d = vm(s[2], r)).length < a[4].length && (d = Hm(a[4].substr(a[4].length - d
      .length)) + d), i += d;
  if (a = e.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return r = Math.min(Math.max(a[1].length, a[4].length), 7), c + ((
    s = Am(l, Math.pow(10, r) - 1, !0))[0] || (s[1] ? "" : "0")) + " " + (s[1] ? hm(s[1], r) + a[2] + "/" + a[3] +
    vm(s[2], r) : Sg(" ", 2 * r + 1 + a[2].length + a[3].length));
  if (a = e.match(/^[#0?]+$/)) return i = km(n, 0), e.length <= i.length ? i : Hm(e.substr(0, e.length - i.length)) + i;
  if (a = e.match(/^([#0?]+)\.([#0]+)$/)) {
    i = "" + n.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), r = i.indexOf(".");
    var u = e.indexOf(".") - r,
      p = e.length - i.length - u;
    return Hm(e.substr(0, u) + i + e.substr(e.length - p))
  }
  if (a = e.match(/^00,000\.([#0]*0)$/)) return r = Km(n, a[1].length), n < 0 ? "-" + Wm(t, e, -n) : Dm(function(t) {
    return t < 2147483647 && t > -2147483648 ? "" + (t >= 0 ? 0 | t : t - 1 | 0) : "" + Math.floor(t)
  }(n)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(t) {
    return "00," + (t.length < 3 ? fm(0, 3 - t.length) : "") + t
  }) + "." + fm(r, a[1].length);
  switch (e) {
    case "###,##0.00":
      return Wm(t, "#,##0.00", n);
    case "###,###":
    case "##,###":
    case "#,###":
      var b = Dm(km(l, 0));
      return "0" !== b ? c + b : "";
    case "###,###.00":
      return Wm(t, "###,##0.00", n).replace(/^0\./, ".");
    case "#,###.00":
      return Wm(t, "#,##0.00", n).replace(/^0\./, ".")
  }
  throw new Error("unsupported format |" + e + "|")
}

function qm(t, e) {
  var n, o = t.indexOf("E") - t.indexOf(".") - 1;
  if (t.match(/^#+0.0E\+0$/)) {
    if (0 == e) return "0.0E+0";
    if (e < 0) return "-" + qm(t, -e);
    var i = t.indexOf("."); - 1 === i && (i = t.indexOf("E"));
    var a = Math.floor(Math.log(e) * Math.LOG10E) % i;
    if (a < 0 && (a += i), !(n = (e / Math.pow(10, a)).toPrecision(o + 1 + (i + a) % i)).match(/[Ee]/)) {
      var r = Math.floor(Math.log(e) * Math.LOG10E); - 1 === n.indexOf(".") ? n = n.charAt(0) + "." + n.substr(1) +
        "E+" + (r - n.length + a) : n += "E+" + (r - a), n = n.replace(/\+-/, "-")
    }
    n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(t, e, n, o) {
      return e + n + o.substr(0, (i + a) % i) + "." + o.substr(a) + "E"
    })
  } else n = e.toExponential(o);
  return t.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), t
    .match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E")
}

function Ym(t, e, n) {
  if (40 === t.charCodeAt(0) && !e.match(Um)) {
    var o = e.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return n >= 0 ? Ym("n", o, n) : "(" + Ym("n", o, -n) + ")"
  }
  if (44 === e.charCodeAt(e.length - 1)) return function(t, e, n) {
    for (var o = e.length - 1; 44 === e.charCodeAt(o - 1);) --o;
    return Xm(t, e.substr(0, o), n / Math.pow(10, 3 * (e.length - o)))
  }(t, e, n);
  if (-1 !== e.indexOf("%")) return function(t, e, n) {
    var o = e.replace(Vm, ""),
      i = e.length - o.length;
    return Xm(t, o, n * Math.pow(10, 2 * i)) + Sg("%", i)
  }(t, e, n);
  if (-1 !== e.indexOf("E")) return qm(e, n);
  if (36 === e.charCodeAt(0)) return "$" + Ym(t, e.substr(" " == e.charAt(1) ? 2 : 1), n);
  var i, a, r, s, l = Math.abs(n),
    c = n < 0 ? "-" : "";
  if (e.match(/^00+$/)) return c + fm(l, e.length);
  if (e.match(/^[#?]+$/)) return i = "" + n, 0 === n && (i = ""), i.length > e.length ? i : Hm(e.substr(0, e.length - i
    .length)) + i;
  if (a = e.match($m)) return function(t, e, n) {
    return n + (0 === e ? "" : "" + e) + Sg(" ", t[1].length + 2 + t[4].length)
  }(a, l, c);
  if (e.match(/^#+0+$/)) return c + fm(l, e.length - e.indexOf("0"));
  if (a = e.match(zm)) return i = (i = ("" + n).replace(/^([^\.]+)$/, "$1." + Hm(a[1])).replace(/\.$/, "." + Hm(a[1])))
    .replace(/\.(\d*)$/, function(t, e) {
      return "." + e + Sg("0", Hm(a[1]).length - e.length)
    }), -1 !== e.indexOf("0.") ? i : i.replace(/^0\./, ".");
  if (e = e.replace(/^#+([0.])/, "$1"), a = e.match(/^(0*)\.(#*)$/)) return c + ("" + l).replace(/\.(\d*[1-9])0*$/,
    ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
  if (a = e.match(/^#{1,3},##0(\.?)$/)) return c + Dm("" + l);
  if (a = e.match(/^#,##0\.([#0]*0)$/)) return n < 0 ? "-" + Ym(t, e, -n) : Dm("" + n) + "." + Sg("0", a[1].length);
  if (a = e.match(/^#,#*,#0/)) return Ym(t, e.replace(/^#,#*,/, ""), n);
  if (a = e.match(/^([0#]+)(\\?-([0#]+))+$/)) return i = gm(Ym(t, e.replace(/[\\-]/g, ""), n)), r = 0, gm(gm(e.replace(
    /\\/g, "")).replace(/[0#]/g, function(t) {
    return r < i.length ? i.charAt(r++) : "0" === t ? "0" : ""
  }));
  if (e.match(jm)) return "(" + (i = Ym(t, "##########", n)).substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
  var d = "";
  if (a = e.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return r = Math.min(a[4].length, 7), s = Am(l, Math.pow(10, r) - 1, !
      1), i = "" + c, " " == (d = Xm("n", a[1], s[1])).charAt(d.length - 1) && (d = d.substr(0, d.length - 1) + "0"),
    i += d + a[2] + "/" + a[3], (d = vm(s[2], r)).length < a[4].length && (d = Hm(a[4].substr(a[4].length - d
      .length)) + d), i += d;
  if (a = e.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return r = Math.min(Math.max(a[1].length, a[4].length), 7), c + ((
    s = Am(l, Math.pow(10, r) - 1, !0))[0] || (s[1] ? "" : "0")) + " " + (s[1] ? hm(s[1], r) + a[2] + "/" + a[3] +
    vm(s[2], r) : Sg(" ", 2 * r + 1 + a[2].length + a[3].length));
  if (a = e.match(/^[#0?]+$/)) return i = "" + n, e.length <= i.length ? i : Hm(e.substr(0, e.length - i.length)) + i;
  if (a = e.match(/^([#0]+)\.([#0]+)$/)) {
    i = "" + n.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), r = i.indexOf(".");
    var u = e.indexOf(".") - r,
      p = e.length - i.length - u;
    return Hm(e.substr(0, u) + i + e.substr(e.length - p))
  }
  if (a = e.match(/^00,000\.([#0]*0)$/)) return n < 0 ? "-" + Ym(t, e, -n) : Dm("" + n).replace(/^\d,\d{3}$/, "0$&")
    .replace(/^\d*$/, function(t) {
      return "00," + (t.length < 3 ? fm(0, 3 - t.length) : "") + t
    }) + "." + fm(0, a[1].length);
  switch (e) {
    case "###,###":
    case "##,###":
    case "#,###":
      var b = Dm("" + l);
      return "0" !== b ? c + b : "";
    default:
      if (e.match(/\.[0#?]*$/)) return Ym(t, e.slice(0, e.lastIndexOf(".")), n) + Hm(e.slice(e.lastIndexOf(".")))
  }
  throw new Error("unsupported format |" + e + "|")
}

function Xm(t, e, n) {
  return (0 | n) === n ? Ym(t, e, n) : Wm(t, e, n)
}
var Jm = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;

function Zm(t) {
  for (var e = 0, n = "", o = ""; e < t.length;) switch (n = t.charAt(e)) {
    case "G":
      xm(t, e) && (e += 6), e++;
      break;
    case '"':
      for (; 34 !== t.charCodeAt(++e) && e < t.length;);
      ++e;
      break;
    case "\\":
    case "_":
      e += 2;
      break;
    case "@":
      ++e;
      break;
    case "B":
    case "b":
      if ("1" === t.charAt(e + 1) || "2" === t.charAt(e + 1)) return !0;
    case "M":
    case "D":
    case "Y":
    case "H":
    case "S":
    case "E":
    case "m":
    case "d":
    case "y":
    case "h":
    case "s":
    case "e":
    case "g":
      return !0;
    case "A":
    case "a":
    case "\u4e0a":
      if ("A/P" === t.substr(e, 3).toUpperCase()) return !0;
      if ("AM/PM" === t.substr(e, 5).toUpperCase()) return !0;
      if ("\u4e0a\u5348/\u4e0b\u5348" === t.substr(e, 5).toUpperCase()) return !0;
      ++e;
      break;
    case "[":
      for (o = n;
        "]" !== t.charAt(e++) && e < t.length;) o += t.charAt(e);
      if (o.match(Jm)) return !0;
      break;
    case ".":
    case "0":
    case "#":
      for (; e < t.length && ("0#?.,E+-%".indexOf(n = t.charAt(++e)) > -1 || "\\" == n && "-" == t.charAt(e + 1) &&
          "0#".indexOf(t.charAt(e + 2)) > -1););
      break;
    case "?":
      for (; t.charAt(++e) === n;);
      break;
    case "*":
      ++e, " " != t.charAt(e) && "*" != t.charAt(e) || ++e;
      break;
    case "(":
    case ")":
      ++e;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      for (; e < t.length && "0123456789".indexOf(t.charAt(++e)) > -1;);
      break;
    default:
      ++e
  }
  return !1
}
var Qm = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

function tg(t, e) {
  if (null == e) return !1;
  var n = parseFloat(e[2]);
  switch (e[1]) {
    case "=":
      if (t == n) return !0;
      break;
    case ">":
      if (t > n) return !0;
      break;
    case "<":
      if (t < n) return !0;
      break;
    case "<>":
      if (t != n) return !0;
      break;
    case ">=":
      if (t >= n) return !0;
      break;
    case "<=":
      if (t <= n) return !0
  }
  return !1
}

function eg(t, e) {
  var n = function(t) {
      for (var e = [], n = !1, o = 0, i = 0; o < t.length; ++o) switch (t.charCodeAt(o)) {
        case 34:
          n = !n;
          break;
        case 95:
        case 42:
        case 92:
          ++o;
          break;
        case 59:
          e[e.length] = t.substr(i, o - i), i = o + 1
      }
      if (e[e.length] = t.substr(i), !0 === n) throw new Error("Format |" + t + "| unterminated string ");
      return e
    }(t),
    o = n.length,
    i = n[o - 1].indexOf("@");
  if (o < 4 && i > -1 && --o, n.length > 4) throw new Error("cannot find right format for |" + n.join("|") + "|");
  if ("number" != typeof e) return [4, 4 === n.length || i > -1 ? n[n.length - 1] : "@"];
  switch (n.length) {
    case 1:
      n = i > -1 ? ["General", "General", "General", n[0]] : [n[0], n[0], n[0], "@"];
      break;
    case 2:
      n = i > -1 ? [n[0], n[0], n[0], n[1]] : [n[0], n[1], n[0], "@"];
      break;
    case 3:
      n = i > -1 ? [n[0], n[1], n[0], n[2]] : [n[0], n[1], n[2], "@"]
  }
  var a = e > 0 ? n[0] : e < 0 ? n[1] : n[2];
  if (-1 === n[0].indexOf("[") && -1 === n[1].indexOf("[")) return [o, a];
  if (null != n[0].match(/\[[=<>]/) || null != n[1].match(/\[[=<>]/)) {
    var r = n[0].match(Qm),
      s = n[1].match(Qm);
    return tg(e, r) ? [o, n[0]] : tg(e, s) ? [o, n[1]] : [o, n[null != r && null != s ? 2 : 1]]
  }
  return [o, a]
}

function ng(t, e, n) {
  null == n && (n = {});
  var o = "";
  switch (typeof t) {
    case "string":
      o = "m/d/yy" == t && n.dateNF ? n.dateNF : t;
      break;
    case "number":
      null == (o = 14 == t && n.dateNF ? n.dateNF : (null != n.table ? n.table : Sm)[t]) && (o = n.table && n.table[Tm[
        t]] || Sm[Tm[t]]), null == o && (o = Im[t] || "General")
  }
  if (xm(o, 0)) return Fm(e, n);
  e instanceof Date && (e = Lm(e, n.date1904));
  var i = eg(o, e);
  if (xm(i[1])) return Fm(e, n);
  if (!0 === e) e = "TRUE";
  else if (!1 === e) e = "FALSE";
  else if ("" === e || null == e) return "";
  return function(t, e, n, o) {
    for (var i, a, r, s = [], l = "", c = 0, d = "", u = "t", p = "H"; c < t.length;) switch (d = t.charAt(c)) {
      case "G":
        if (!xm(t, c)) throw new Error("unrecognized character " + d + " in " + t);
        s[s.length] = {
          t: "G",
          v: "General"
        }, c += 7;
        break;
      case '"':
        for (l = ""; 34 !== (r = t.charCodeAt(++c)) && c < t.length;) l += String.fromCharCode(r);
        s[s.length] = {
          t: "t",
          v: l
        }, ++c;
        break;
      case "\\":
        var b = t.charAt(++c),
          m = "(" === b || ")" === b ? b : "t";
        s[s.length] = {
          t: m,
          v: b
        }, ++c;
        break;
      case "_":
        s[s.length] = {
          t: "t",
          v: " "
        }, c += 2;
        break;
      case "@":
        s[s.length] = {
          t: "T",
          v: e
        }, ++c;
        break;
      case "B":
      case "b":
        if ("1" === t.charAt(c + 1) || "2" === t.charAt(c + 1)) {
          if (null == i && null == (i = Em(e, n, "2" === t.charAt(c + 1)))) return "";
          s[s.length] = {
            t: "X",
            v: t.substr(c, 2)
          }, u = d, c += 2;
          break
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        d = d.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (e < 0) return "";
        if (null == i && null == (i = Em(e, n))) return "";
        for (l = d; ++c < t.length && t.charAt(c).toLowerCase() === d;) l += d;
        "m" === d && "h" === u.toLowerCase() && (d = "M"), "h" === d && (d = p), s[s.length] = {
          t: d,
          v: l
        }, u = d;
        break;
      case "A":
      case "a":
      case "\u4e0a":
        var g = {
          t: d,
          v: d
        };
        if (null == i && (i = Em(e, n)), "A/P" === t.substr(c, 3).toUpperCase() ? (null != i && (g.v = i.H >= 12 ?
            "P" : "A"), g.t = "T", p = "h", c += 3) : "AM/PM" === t.substr(c, 5).toUpperCase() ? (null != i && (g
            .v = i.H >= 12 ? "PM" : "AM"), g.t = "T", c += 5, p = "h") : "\u4e0a\u5348/\u4e0b\u5348" === t.substr(c,
            5).toUpperCase() ? (null != i && (g.v = i.H >= 12 ? "\u4e0b\u5348" : "\u4e0a\u5348"), g.t = "T", c += 5,
            p = "h") : (g.t = "t", ++c), null == i && "T" === g.t) return "";
        s[s.length] = g, u = d;
        break;
      case "[":
        for (l = d;
          "]" !== t.charAt(c++) && c < t.length;) l += t.charAt(c);
        if ("]" !== l.slice(-1)) throw 'unterminated "[" block: |' + l + "|";
        if (l.match(Jm)) {
          if (null == i && null == (i = Em(e, n))) return "";
          s[s.length] = {
            t: "Z",
            v: l.toLowerCase()
          }, u = l.charAt(1)
        } else l.indexOf("$") > -1 && (l = (l.match(/\$([^-\[\]]*)/) || [])[1] || "$", Zm(t) || (s[s.length] = {
          t: "t",
          v: l
        }));
        break;
      case ".":
        if (null != i) {
          for (l = d; ++c < t.length && "0" === (d = t.charAt(c));) l += d;
          s[s.length] = {
            t: "s",
            v: l
          };
          break
        }
      case "0":
      case "#":
        for (l = d; ++c < t.length && "0#?.,E+-%".indexOf(d = t.charAt(c)) > -1;) l += d;
        s[s.length] = {
          t: "n",
          v: l
        };
        break;
      case "?":
        for (l = d; t.charAt(++c) === d;) l += d;
        s[s.length] = {
          t: d,
          v: l
        }, u = d;
        break;
      case "*":
        ++c, " " != t.charAt(c) && "*" != t.charAt(c) || ++c;
        break;
      case "(":
      case ")":
        s[s.length] = {
          t: 1 === o ? "t" : d,
          v: d
        }, ++c;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (l = d; c < t.length && "0123456789".indexOf(t.charAt(++c)) > -1;) l += t.charAt(c);
        s[s.length] = {
          t: "D",
          v: l
        };
        break;
      case " ":
        s[s.length] = {
          t: d,
          v: d
        }, ++c;
        break;
      case "$":
        s[s.length] = {
          t: "t",
          v: "$"
        }, ++c;
        break;
      default:
        if (-1 === ",$-+/():!^&'~{}<>=\u20acacfijklopqrtuvwxzP".indexOf(d)) throw new Error(
          "unrecognized character " + d + " in " + t);
        s[s.length] = {
          t: "t",
          v: d
        }, ++c
    }
    var f, h = 0,
      v = 0;
    for (c = s.length - 1, u = "t"; c >= 0; --c) switch (s[c].t) {
      case "h":
      case "H":
        s[c].t = p, u = "h", h < 1 && (h = 1);
        break;
      case "s":
        (f = s[c].v.match(/\.0+$/)) && (v = Math.max(v, f[0].length - 1)), h < 3 && (h = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        u = s[c].t;
        break;
      case "m":
        "s" === u && (s[c].t = "M", h < 2 && (h = 2));
        break;
      case "X":
        break;
      case "Z":
        h < 1 && s[c].v.match(/[Hh]/) && (h = 1), h < 2 && s[c].v.match(/[Mm]/) && (h = 2), h < 3 && s[c].v.match(
          /[Ss]/) && (h = 3)
    }
    switch (h) {
      case 0:
        break;
      case 1:
        i.u >= .5 && (i.u = 0, ++i.S), i.S >= 60 && (i.S = 0, ++i.M), i.M >= 60 && (i.M = 0, ++i.H);
        break;
      case 2:
        i.u >= .5 && (i.u = 0, ++i.S), i.S >= 60 && (i.S = 0, ++i.M)
    }
    var y, k = "";
    for (c = 0; c < s.length; ++c) switch (s[c].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        s[c].v = "", s[c].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        s[c].v = Rm(s[c].t.charCodeAt(0), s[c].v, i, v), s[c].t = "t";
        break;
      case "n":
      case "?":
        for (y = c + 1; null != s[y] && ("?" === (d = s[y].t) || "D" === d || (" " === d || "t" === d) && null != s[
            y + 1] && ("?" === s[y + 1].t || "t" === s[y + 1].t && "/" === s[y + 1].v) || "(" === s[c].t && (
            " " === d || "n" === d || ")" === d) || "t" === d && ("/" === s[y].v || " " === s[y].v && null != s[
            y + 1] && "?" == s[y + 1].t));) s[c].v += s[y].v, s[y] = {
          v: "",
          t: ";"
        }, ++y;
        k += s[c].v, c = y - 1;
        break;
      case "G":
        s[c].t = "t", s[c].v = Fm(e, n)
    }
    var x, w, C = "";
    if (k.length > 0) {
      40 == k.charCodeAt(0) ? (x = e < 0 && 45 === k.charCodeAt(0) ? -e : e, w = Xm("n", k, x)) : (w = Xm("n", k, x =
          e < 0 && o > 1 ? -e : e), x < 0 && s[0] && "t" == s[0].t && (w = w.substr(1), s[0].v = "-" + s[0].v)), y = w
        .length - 1;
      var S = s.length;
      for (c = 0; c < s.length; ++c)
        if (null != s[c] && "t" != s[c].t && s[c].v.indexOf(".") > -1) {
          S = c;
          break
        } var T = s.length;
      if (S === s.length && -1 === w.indexOf("E")) {
        for (c = s.length - 1; c >= 0; --c) null != s[c] && -1 !== "n?".indexOf(s[c].t) && (y >= s[c].v.length - 1 ? (
          y -= s[c].v.length, s[c].v = w.substr(y + 1, s[c].v.length)) : y < 0 ? s[c].v = "" : (s[c].v = w.substr(
          0, y + 1), y = -1), s[c].t = "t", T = c);
        y >= 0 && T < s.length && (s[T].v = w.substr(0, y + 1) + s[T].v)
      } else if (S !== s.length && -1 === w.indexOf("E")) {
        for (y = w.indexOf(".") - 1, c = S; c >= 0; --c)
          if (null != s[c] && -1 !== "n?".indexOf(s[c].t)) {
            for (a = s[c].v.indexOf(".") > -1 && c === S ? s[c].v.indexOf(".") - 1 : s[c].v.length - 1, C = s[c].v
              .substr(a + 1); a >= 0; --a) y >= 0 && ("0" === s[c].v.charAt(a) || "#" === s[c].v.charAt(a)) && (C = w
              .charAt(y--) + C);
            s[c].v = C, s[c].t = "t", T = c
          } for (y >= 0 && T < s.length && (s[T].v = w.substr(0, y + 1) + s[T].v), y = w.indexOf(".") + 1, c = S; c <
          s.length; ++c)
          if (null != s[c] && (-1 !== "n?(".indexOf(s[c].t) || c === S)) {
            for (a = s[c].v.indexOf(".") > -1 && c === S ? s[c].v.indexOf(".") + 1 : 0, C = s[c].v.substr(0, a); a <
              s[c].v.length; ++a) y < w.length && (C += w.charAt(y++));
            s[c].v = C, s[c].t = "t", T = c
          }
      }
    }
    for (c = 0; c < s.length; ++c) null != s[c] && "n?".indexOf(s[c].t) > -1 && (x = o > 1 && e < 0 && c > 0 &&
      "-" === s[c - 1].v ? -e : e, s[c].v = Xm(s[c].t, s[c].v, x), s[c].t = "t");
    var I = "";
    for (c = 0; c !== s.length; ++c) null != s[c] && (I += s[c].v);
    return I
  }(i[1], e, n, i[0])
}

function og(t, e) {
  if ("number" != typeof e) {
    e = +e || -1;
    for (var n = 0; n < 392; ++n)
      if (null != Sm[n]) {
        if (Sm[n] == t) {
          e = n;
          break
        }
      } else e < 0 && (e = n);
    e < 0 && (e = 391)
  }
  return Sm[e] = t, e
}

function ig() {
  var t;
  t || (t = {}), t[0] = "General", t[1] = "0", t[2] = "0.00", t[3] = "#,##0", t[4] = "#,##0.00", t[9] = "0%", t[10] =
    "0.00%", t[11] = "0.00E+00", t[12] = "# ?/?", t[13] = "# ??/??", t[14] = "m/d/yy", t[15] = "d-mmm-yy", t[16] =
    "d-mmm", t[17] = "mmm-yy", t[18] = "h:mm AM/PM", t[19] = "h:mm:ss AM/PM", t[20] = "h:mm", t[21] = "h:mm:ss", t[22] =
    "m/d/yy h:mm", t[37] = "#,##0 ;(#,##0)", t[38] = "#,##0 ;[Red](#,##0)", t[39] = "#,##0.00;(#,##0.00)", t[40] =
    "#,##0.00;[Red](#,##0.00)", t[45] = "mm:ss", t[46] = "[h]:mm:ss", t[47] = "mmss.0", t[48] = "##0.0E+0", t[49] = "@",
    t[56] = '"\u4e0a\u5348/\u4e0b\u5348 "hh"\u6642"mm"\u5206"ss"\u79d2 "', Sm = t
}
var ag = {
    5: '"$"#,##0_);\\("$"#,##0\\)',
    6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    23: "General",
    24: "General",
    25: "General",
    26: "General",
    27: "m/d/yy",
    28: "m/d/yy",
    29: "m/d/yy",
    30: "m/d/yy",
    31: "m/d/yy",
    32: "h:mm:ss",
    33: "h:mm:ss",
    34: "h:mm:ss",
    35: "h:mm:ss",
    36: "m/d/yy",
    41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
    42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
    43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
    44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
    50: "m/d/yy",
    51: "m/d/yy",
    52: "m/d/yy",
    53: "m/d/yy",
    54: "m/d/yy",
    55: "m/d/yy",
    56: "m/d/yy",
    57: "m/d/yy",
    58: "m/d/yy",
    59: "0",
    60: "0.00",
    61: "#,##0",
    62: "#,##0.00",
    63: '"$"#,##0_);\\("$"#,##0\\)',
    64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    67: "0%",
    68: "0.00%",
    69: "# ?/?",
    70: "# ??/??",
    71: "m/d/yy",
    72: "m/d/yy",
    73: "d-mmm-yy",
    74: "d-mmm",
    75: "mmm-yy",
    76: "h:mm",
    77: "h:mm:ss",
    78: "m/d/yy h:mm",
    79: "mm:ss",
    80: "[h]:mm:ss",
    81: "mmss.0"
  },
  rg = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
var sg = function() {
    var t = {};
    t.version = "1.2.0";
    var e = function() {
      for (var t = 0, e = new Array(256), n = 0; 256 != n; ++n) t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (t = 1 & (
            t = 1 & (t = 1 & (t = n) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -
          306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -
        306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1) ? -306674912 ^ t >>> 1 : t >>> 1, e[n] = t;
      return "undefined" != typeof Int32Array ? new Int32Array(e) : e
    }();
    var n = function(t) {
        var e = 0,
          n = 0,
          o = 0,
          i = "undefined" != typeof Int32Array ? new Int32Array(4096) : new Array(4096);
        for (o = 0; 256 != o; ++o) i[o] = t[o];
        for (o = 0; 256 != o; ++o)
          for (n = t[o], e = 256 + o; e < 4096; e += 256) n = i[e] = n >>> 8 ^ t[255 & n];
        var a = [];
        for (o = 1; 16 != o; ++o) a[o - 1] = "undefined" != typeof Int32Array ? i.subarray(256 * o, 256 * o + 256) : i
          .slice(256 * o, 256 * o + 256);
        return a
      }(e),
      o = n[0],
      i = n[1],
      a = n[2],
      r = n[3],
      s = n[4],
      l = n[5],
      c = n[6],
      d = n[7],
      u = n[8],
      p = n[9],
      b = n[10],
      m = n[11],
      g = n[12],
      f = n[13],
      h = n[14];
    return t.table = e, t.bstr = function(t, n) {
      for (var o = -1 ^ n, i = 0, a = t.length; i < a;) o = o >>> 8 ^ e[255 & (o ^ t.charCodeAt(i++))];
      return ~o
    }, t.buf = function(t, n) {
      for (var v = -1 ^ n, y = t.length - 15, k = 0; k < y;) v = h[t[k++] ^ 255 & v] ^ f[t[k++] ^ v >> 8 & 255] ^ g[t[
          k++] ^ v >> 16 & 255] ^ m[t[k++] ^ v >>> 24] ^ b[t[k++]] ^ p[t[k++]] ^ u[t[k++]] ^ d[t[k++]] ^ c[t[k++]] ^
        l[t[k++]] ^ s[t[k++]] ^ r[t[k++]] ^ a[t[k++]] ^ i[t[k++]] ^ o[t[k++]] ^ e[t[k++]];
      for (y += 15; k < y;) v = v >>> 8 ^ e[255 & (v ^ t[k++])];
      return ~v
    }, t.str = function(t, n) {
      for (var o = -1 ^ n, i = 0, a = t.length, r = 0, s = 0; i < a;)(r = t.charCodeAt(i++)) < 128 ? o = o >>> 8 ^ e[
        255 & (o ^ r)] : r < 2048 ? o = (o = o >>> 8 ^ e[255 & (o ^ (192 | r >> 6 & 31))]) >>> 8 ^ e[255 & (o ^ (
        128 | 63 & r))] : r >= 55296 && r < 57344 ? (r = 64 + (1023 & r), s = 1023 & t.charCodeAt(i++), o = (o = (
          o = (o = o >>> 8 ^ e[255 & (o ^ (240 | r >> 8 & 7))]) >>> 8 ^ e[255 & (o ^ (128 | r >> 2 & 63))]) >>>
        8 ^ e[255 & (o ^ (128 | s >> 6 & 15 | (3 & r) << 4))]) >>> 8 ^ e[255 & (o ^ (128 | 63 & s))]) : o = (o = (
        o = o >>> 8 ^ e[255 & (o ^ (224 | r >> 12 & 15))]) >>> 8 ^ e[255 & (o ^ (128 | r >> 6 & 63))]) >>> 8 ^ e[
        255 & (o ^ (128 | 63 & r))];
      return ~o
    }, t
  }(),
  lg = function() {
    var t, e = {};

    function n(t) {
      if ("/" == t.charAt(t.length - 1)) return -1 === t.slice(0, -1).indexOf("/") ? t : n(t.slice(0, -1));
      var e = t.lastIndexOf("/");
      return -1 === e ? t : t.slice(0, e + 1)
    }

    function o(t) {
      if ("/" == t.charAt(t.length - 1)) return o(t.slice(0, -1));
      var e = t.lastIndexOf("/");
      return -1 === e ? t : t.slice(e + 1)
    }

    function i(t, e) {
      "string" == typeof e && (e = new Date(e));
      var n = e.getHours();
      n = (n = n << 6 | e.getMinutes()) << 5 | e.getSeconds() >>> 1, t.write_shift(2, n);
      var o = e.getFullYear() - 1980;
      o = (o = o << 4 | e.getMonth() + 1) << 5 | e.getDate(), t.write_shift(2, o)
    }

    function a(t) {
      Qf(t, 0);
      for (var e = {}, n = 0; t.l <= t.length - 4;) {
        var o = t.read_shift(2),
          i = t.read_shift(2),
          a = t.l + i,
          r = {};
        if (21589 === o) 1 & (n = t.read_shift(1)) && (r.mtime = t.read_shift(4)), i > 5 && (2 & n && (r.atime = t
          .read_shift(4)), 4 & n && (r.ctime = t.read_shift(4))), r.mtime && (r.mt = new Date(1e3 * r.mtime));
        t.l = a, e[o] = r
      }
      return e
    }

    function r() {
      return t || (t = {})
    }

    function s(t, e) {
      if (80 == t[0] && 75 == t[1]) return ot(t, e);
      if (109 == (32 | t[0]) && 105 == (32 | t[1])) return function(t, e) {
        if ("mime-version:" != w(t.slice(0, 13)).toLowerCase()) throw new Error("Unsupported MAD header");
        var n = e && e.root || "",
          o = (am && Buffer.isBuffer(t) ? t.toString("binary") : w(t)).split("\r\n"),
          i = 0,
          a = "";
        for (i = 0; i < o.length; ++i)
          if (a = o[i], /^Content-Location:/i.test(a) && (a = a.slice(a.indexOf("file")), n || (n = a.slice(0, a
              .lastIndexOf("/") + 1)), a.slice(0, n.length) != n))
            for (; n.length > 0 && (n = (n = n.slice(0, n.length - 1)).slice(0, n.lastIndexOf("/") + 1), a.slice(0,
                n.length) != n););
        var r = (o[1] || "").match(/boundary="(.*?)"/);
        if (!r) throw new Error("MAD cannot find boundary");
        var s = "--" + (r[1] || ""),
          l = [],
          c = [],
          d = {
            FileIndex: l,
            FullPaths: c
          };
        p(d);
        var u, b = 0;
        for (i = 0; i < o.length; ++i) {
          var m = o[i];
          m !== s && m !== s + "--" || (b++ && ct(d, o.slice(u, i), n), u = i)
        }
        return d
      }(t, e);
      if (t.length < 512) throw new Error("CFB file size " + t.length + " < 512");
      var n, o, i, a, r, s, b = 512,
        m = [],
        g = t.slice(0, 512);
      Qf(g, 0);
      var f = function(t) {
        if (80 == t[t.l] && 75 == t[t.l + 1]) return [0, 0];
        t.chk(v, "Header Signature: "), t.l += 16;
        var e = t.read_shift(2, "u");
        return [t.read_shift(2, "u"), e]
      }(g);
      switch (n = f[0]) {
        case 3:
          b = 512;
          break;
        case 4:
          b = 4096;
          break;
        case 0:
          if (0 == f[1]) return ot(t, e);
        default:
          throw new Error("Major Version: Expected 3 or 4 saw " + n)
      }
      512 !== b && Qf(g = t.slice(0, b), 28);
      var y = t.slice(0, b);
      ! function(t, e) {
        var n = 9;
        switch (t.l += 2, n = t.read_shift(2)) {
          case 9:
            if (3 != e) throw new Error("Sector Shift: Expected 9 saw " + n);
            break;
          case 12:
            if (4 != e) throw new Error("Sector Shift: Expected 12 saw " + n);
            break;
          default:
            throw new Error("Sector Shift: Expected 9 or 12 saw " + n)
        }
        t.chk("0600", "Mini Sector Shift: "), t.chk("000000000000", "Reserved: ")
      }(g, n);
      var k = g.read_shift(4, "i");
      if (3 === n && 0 !== k) throw new Error("# Directory Sectors: Expected 0 saw " + k);
      g.l += 4, a = g.read_shift(4, "i"), g.l += 4, g.chk("00100000", "Mini Stream Cutoff Size: "), r = g.read_shift(4,
        "i"), o = g.read_shift(4, "i"), s = g.read_shift(4, "i"), i = g.read_shift(4, "i");
      for (var x = -1, C = 0; C < 109 && !((x = g.read_shift(4, "i")) < 0); ++C) m[C] = x;
      var S = function(t, e) {
        for (var n = Math.ceil(t.length / e) - 1, o = [], i = 1; i < n; ++i) o[i - 1] = t.slice(i * e, (i + 1) * e);
        return o[n - 1] = t.slice(n * e), o
      }(t, b);
      c(s, i, S, b, m);
      var T = function(t, e, n, o) {
        var i = t.length,
          a = [],
          r = [],
          s = [],
          l = [],
          c = o - 1,
          d = 0,
          u = 0,
          p = 0,
          b = 0;
        for (d = 0; d < i; ++d)
          if (s = [], (p = d + e) >= i && (p -= i), !r[p]) {
            l = [];
            var m = [];
            for (u = p; u >= 0;) {
              m[u] = !0, r[u] = !0, s[s.length] = u, l.push(t[u]);
              var g = n[Math.floor(4 * u / o)];
              if (o < 4 + (b = 4 * u & c)) throw new Error("FAT boundary crossed: " + u + " 4 " + o);
              if (!t[g]) break;
              if (m[u = Gf(t[g], b)]) break
            }
            a[p] = {
              nodes: s,
              data: xf([l])
            }
          } return a
      }(S, a, m, b);
      T[a].name = "!Directory", o > 0 && r !== h && (T[r].name = "!MiniFAT"), T[m[0]].name = "!FAT", T.fat_addrs = m, T
        .ssz = b;
      var I = [],
        A = [],
        E = [];
      ! function(t, e, n, o, i, a, r, s) {
        for (var c, p = 0, b = o.length ? 2 : 0, m = e[t].data, g = 0, f = 0; g < m.length; g += 128) {
          var v = m.slice(g, g + 128);
          Qf(v, 64), f = v.read_shift(2), c = Cf(v, 0, f - b), o.push(c);
          var y = {
            name: c,
            type: v.read_shift(1),
            color: v.read_shift(1),
            L: v.read_shift(4, "i"),
            R: v.read_shift(4, "i"),
            C: v.read_shift(4, "i"),
            clsid: v.read_shift(16),
            state: v.read_shift(4, "i"),
            start: 0,
            size: 0
          };
          0 !== v.read_shift(2) + v.read_shift(2) + v.read_shift(2) + v.read_shift(2) && (y.ct = u(v, v.l - 8)), 0 !== v
            .read_shift(2) + v.read_shift(2) + v.read_shift(2) + v.read_shift(2) && (y.mt = u(v, v.l - 8)), y.start = v
            .read_shift(4, "i"), y.size = v.read_shift(4, "i"), y.size < 0 && y.start < 0 && (y.size = y.type = 0, y
              .start = h, y.name = ""), 5 === y.type ? (p = y.start, i > 0 && p !== h && (e[p].name = "!StreamData")) :
            y.size >= 4096 ? (y.storage = "fat", void 0 === e[y.start] && (e[y.start] = d(n, y.start, e.fat_addrs, e
              .ssz)), e[y.start].name = y.name, y.content = e[y.start].data.slice(0, y.size)) : (y.storage = "minifat",
              y.size < 0 ? y.size = 0 : p !== h && y.start !== h && e[p] && (y.content = l(y, e[p].data, (e[s] || {})
                .data))), y.content && Qf(y.content, 0), a[c] = y, r.push(y)
        }
      }(a, T, S, I, o, {}, A, r),
      function(t, e, n) {
        for (var o = 0, i = 0, a = 0, r = 0, s = 0, l = n.length, c = [], d = []; o < l; ++o) c[o] = d[o] = o, e[o] = n[
          o];
        for (; s < d.length; ++s) i = t[o = d[s]].L, a = t[o].R, r = t[o].C, c[o] === o && (-1 !== i && c[i] !== i && (
          c[o] = c[i]), -1 !== a && c[a] !== a && (c[o] = c[a])), -1 !== r && (c[r] = o), -1 !== i && o != c[o] && (c[
          i] = c[o], d.lastIndexOf(i) < s && d.push(i)), -1 !== a && o != c[o] && (c[a] = c[o], d.lastIndexOf(a) <
          s && d.push(a));
        for (o = 1; o < l; ++o) c[o] === o && (-1 !== a && c[a] !== a ? c[o] = c[a] : -1 !== i && c[i] !== i && (c[o] =
          c[i]));
        for (o = 1; o < l; ++o)
          if (0 !== t[o].type) {
            if ((s = o) != c[s])
              do {
                s = c[s], e[o] = e[s] + "/" + e[o]
              } while (0 !== s && -1 !== c[s] && s != c[s]);
            c[o] = -1
          } for (e[0] += "/", o = 1; o < l; ++o) 2 !== t[o].type && (e[o] += "/")
      }(A, E, I), I.shift();
      var P = {
        FileIndex: A,
        FullPaths: E
      };
      return e && e.raw && (P.raw = {
        header: y,
        sectors: S
      }), P
    }

    function l(t, e, n) {
      for (var o = t.start, i = t.size, a = [], r = o; n && i > 0 && r >= 0;) a.push(e.slice(r * f, r * f + f)), i -= f,
        r = Gf(n, 4 * r);
      return 0 === a.length ? eh(0) : pm(a).slice(0, t.size)
    }

    function c(t, e, n, o, i) {
      var a = h;
      if (t === h) {
        if (0 !== e) throw new Error("DIFAT chain shorter than expected")
      } else if (-1 !== t) {
        var r = n[t],
          s = (o >>> 2) - 1;
        if (!r) return;
        for (var l = 0; l < s && (a = Gf(r, 4 * l)) !== h; ++l) i.push(a);
        c(Gf(r, o - 4), e - 1, n, o, i)
      }
    }

    function d(t, e, n, o, i) {
      var a = [],
        r = [];
      i || (i = []);
      var s = o - 1,
        l = 0,
        c = 0;
      for (l = e; l >= 0;) {
        i[l] = !0, a[a.length] = l, r.push(t[l]);
        var d = n[Math.floor(4 * l / o)];
        if (o < 4 + (c = 4 * l & s)) throw new Error("FAT boundary crossed: " + l + " 4 " + o);
        if (!t[d]) break;
        l = Gf(t[d], c)
      }
      return {
        nodes: a,
        data: xf([r])
      }
    }

    function u(t, e) {
      return new Date(1e3 * (Hf(t, e + 4) / 1e7 * Math.pow(2, 32) + Hf(t, e) / 1e7 - 11644473600))
    }

    function p(t, e) {
      var n = e || {},
        o = n.root || "Root Entry";
      if (t.FullPaths || (t.FullPaths = []), t.FileIndex || (t.FileIndex = []), t.FullPaths.length !== t.FileIndex
        .length) throw new Error("inconsistent CFB structure");
      0 === t.FullPaths.length && (t.FullPaths[0] = o + "/", t.FileIndex[0] = {
          name: o,
          type: 5
        }), n.CLSID && (t.FileIndex[0].clsid = n.CLSID),
        function(t) {
          var e = "\x01Sh33tJ5";
          if (lg.find(t, "/" + e)) return;
          var n = eh(4);
          n[0] = 55, n[1] = n[3] = 50, n[2] = 54, t.FileIndex.push({
            name: e,
            type: 2,
            content: n,
            size: 4,
            L: 69,
            R: 69,
            C: 69
          }), t.FullPaths.push(t.FullPaths[0] + e), b(t)
        }(t)
    }

    function b(t, e) {
      p(t);
      for (var i = !1, a = !1, r = t.FullPaths.length - 1; r >= 0; --r) {
        var s = t.FileIndex[r];
        switch (s.type) {
          case 0:
            a ? i = !0 : (t.FileIndex.pop(), t.FullPaths.pop());
            break;
          case 1:
          case 2:
          case 5:
            a = !0, isNaN(s.R * s.L * s.C) && (i = !0), s.R > -1 && s.L > -1 && s.R == s.L && (i = !0);
            break;
          default:
            i = !0
        }
      }
      if (i || e) {
        var l = new Date(1987, 1, 19),
          c = 0,
          d = Object.create ? Object.create(null) : {},
          u = [];
        for (r = 0; r < t.FullPaths.length; ++r) d[t.FullPaths[r]] = !0, 0 !== t.FileIndex[r].type && u.push([t
          .FullPaths[r], t.FileIndex[r]
        ]);
        for (r = 0; r < u.length; ++r) {
          var b = n(u[r][0]);
          (a = d[b]) || (u.push([b, {
            name: o(b).replace("/", ""),
            type: 1,
            clsid: k,
            ct: l,
            mt: l,
            content: null
          }]), d[b] = !0)
        }
        for (u.sort(function(t, e) {
            return function(t, e) {
              for (var n = t.split("/"), o = e.split("/"), i = 0, a = 0, r = Math.min(n.length, o.length); i < r; ++
                i) {
                if (a = n[i].length - o[i].length) return a;
                if (n[i] != o[i]) return n[i] < o[i] ? -1 : 1
              }
              return n.length - o.length
            }(t[0], e[0])
          }), t.FullPaths = [], t.FileIndex = [], r = 0; r < u.length; ++r) t.FullPaths[r] = u[r][0], t.FileIndex[r] =
          u[r][1];
        for (r = 0; r < u.length; ++r) {
          var m = t.FileIndex[r],
            g = t.FullPaths[r];
          if (m.name = o(g).replace("/", ""), m.L = m.R = m.C = -(m.color = 1), m.size = m.content ? m.content.length :
            0, m.start = 0, m.clsid = m.clsid || k, 0 === r) m.C = u.length > 1 ? 1 : -1, m.size = 0, m.type = 5;
          else if ("/" == g.slice(-1)) {
            for (c = r + 1; c < u.length && n(t.FullPaths[c]) != g; ++c);
            for (m.C = c >= u.length ? -1 : c, c = r + 1; c < u.length && n(t.FullPaths[c]) != n(g); ++c);
            m.R = c >= u.length ? -1 : c, m.type = 1
          } else n(t.FullPaths[r + 1] || "") == n(g) && (m.R = r + 1), m.type = 2
        }
      }
    }

    function m(t, e) {
      var n = e || {};
      if ("mad" == n.fileType) return function(t, e) {
        for (var n = e || {}, o = n.boundary || "SheetJS", i = ["MIME-Version: 1.0",
            'Content-Type: multipart/related; boundary="' + (o = "------=" + o).slice(2) + '"', "", "", ""
          ], a = t.FullPaths[0], r = a, s = t.FileIndex[0], l = 1; l < t.FullPaths.length; ++l)
          if (r = t.FullPaths[l].slice(a.length), (s = t.FileIndex[l]).size && s.content && "\x01Sh33tJ5" != r) {
            r = r.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(t) {
              return "_x" + t.charCodeAt(0).toString(16) + "_"
            }).replace(/[\u0080-\uFFFF]/g, function(t) {
              return "_u" + t.charCodeAt(0).toString(16) + "_"
            });
            for (var c = s.content, d = am && Buffer.isBuffer(c) ? c.toString("binary") : w(c), u = 0, p = Math.min(
                1024, d.length), b = 0, m = 0; m <= p; ++m)(b = d.charCodeAt(m)) >= 32 && b < 128 && ++u;
            var g = u >= 4 * p / 5;
            i.push(o), i.push("Content-Location: " + (n.root || "file:///C:/SheetJS/") + r), i.push(
              "Content-Transfer-Encoding: " + (g ? "quoted-printable" : "base64")), i.push("Content-Type: " + rt(
              s, r)), i.push(""), i.push(g ? lt(d) : st(d))
          } return i.push(o + "--\r\n"), i.join("\r\n")
      }(t, n);
      if (b(t), "zip" === n.fileType) return function(t, e) {
        var n = e || {},
          o = [],
          a = [],
          r = eh(1),
          s = n.compression ? 8 : 0,
          l = 0,
          c = 0,
          d = 0,
          u = 0,
          p = 0,
          b = t.FullPaths[0],
          m = b,
          g = t.FileIndex[0],
          f = [],
          h = 0;
        for (c = 1; c < t.FullPaths.length; ++c)
          if (m = t.FullPaths[c].slice(b.length), (g = t.FileIndex[c]).size && g.content && "\x01Sh33tJ5" != m) {
            var v = u,
              y = eh(m.length);
            for (d = 0; d < m.length; ++d) y.write_shift(1, 127 & m.charCodeAt(d));
            y = y.slice(0, y.l), f[p] = sg.buf(g.content, 0);
            var k = g.content;
            8 == s && (k = C(k)), (r = eh(30)).write_shift(4, 67324752), r.write_shift(2, 20), r.write_shift(2, l),
              r.write_shift(2, s), g.mt ? i(r, g.mt) : r.write_shift(4, 0), r.write_shift(-4, f[p]), r.write_shift(
                4, k.length), r.write_shift(4, g.content.length), r.write_shift(2, y.length), r.write_shift(2, 0),
              u += r.length, o.push(r), u += y.length, o.push(y), u += k.length, o.push(k), (r = eh(46))
              .write_shift(4, 33639248), r.write_shift(2, 0), r.write_shift(2, 20), r.write_shift(2, l), r
              .write_shift(2, s), r.write_shift(4, 0), r.write_shift(-4, f[p]), r.write_shift(4, k.length), r
              .write_shift(4, g.content.length), r.write_shift(2, y.length), r.write_shift(2, 0), r.write_shift(2,
                0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r.write_shift(4, v), h += r.l, a
              .push(r), h += y.length, a.push(y), ++p
          } return r = eh(22), r.write_shift(4, 101010256), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(
          2, p), r.write_shift(2, p), r.write_shift(4, h), r.write_shift(4, u), r.write_shift(2, 0), pm([pm(o),
          pm(a), r
        ])
      }(t, n);
      var o = function(t) {
          for (var e = 0, n = 0, o = 0; o < t.FileIndex.length; ++o) {
            var i = t.FileIndex[o];
            if (i.content) {
              var a = i.content.length;
              a > 0 && (a < 4096 ? e += a + 63 >> 6 : n += a + 511 >> 9)
            }
          }
          for (var r = t.FullPaths.length + 3 >> 2, s = e + 127 >> 7, l = (e + 7 >> 3) + n + r + s, c = l + 127 >> 7,
              d = c <= 109 ? 0 : Math.ceil((c - 109) / 127); l + c + d + 127 >> 7 > c;) d = ++c <= 109 ? 0 : Math.ceil((
            c - 109) / 127);
          var u = [1, d, c, s, r, n, e, 0];
          return t.FileIndex[0].size = e << 6, u[7] = (t.FileIndex[0].start = u[0] + u[1] + u[2] + u[3] + u[4] + u[5]) +
            (u[6] + 7 >> 3), u
        }(t),
        a = eh(o[7] << 9),
        r = 0,
        s = 0;
      for (r = 0; r < 8; ++r) a.write_shift(1, y[r]);
      for (r = 0; r < 8; ++r) a.write_shift(2, 0);
      for (a.write_shift(2, 62), a.write_shift(2, 3), a.write_shift(2, 65534), a.write_shift(2, 9), a.write_shift(2, 6),
        r = 0; r < 3; ++r) a.write_shift(2, 0);
      for (a.write_shift(4, 0), a.write_shift(4, o[2]), a.write_shift(4, o[0] + o[1] + o[2] + o[3] - 1), a.write_shift(
          4, 0), a.write_shift(4, 4096), a.write_shift(4, o[3] ? o[0] + o[1] + o[2] - 1 : h), a.write_shift(4, o[3]), a
        .write_shift(-4, o[1] ? o[0] - 1 : h), a.write_shift(4, o[1]), r = 0; r < 109; ++r) a.write_shift(-4, r < o[2] ?
        o[1] + r : -1);
      if (o[1])
        for (s = 0; s < o[1]; ++s) {
          for (; r < 236 + 127 * s; ++r) a.write_shift(-4, r < o[2] ? o[1] + r : -1);
          a.write_shift(-4, s === o[1] - 1 ? h : s + 1)
        }
      var l = function(t) {
        for (s += t; r < s - 1; ++r) a.write_shift(-4, r + 1);
        t && (++r, a.write_shift(-4, h))
      };
      for (s = r = 0, s += o[1]; r < s; ++r) a.write_shift(-4, x.DIFSECT);
      for (s += o[2]; r < s; ++r) a.write_shift(-4, x.FATSECT);
      l(o[3]), l(o[4]);
      for (var c = 0, d = 0, u = t.FileIndex[0]; c < t.FileIndex.length; ++c)(u = t.FileIndex[c]).content && ((d = u
        .content.length) < 4096 || (u.start = s, l(d + 511 >> 9)));
      for (l(o[6] + 7 >> 3); 511 & a.l;) a.write_shift(-4, x.ENDOFCHAIN);
      for (s = r = 0, c = 0; c < t.FileIndex.length; ++c)(u = t.FileIndex[c]).content && (!(d = u.content.length) ||
        d >= 4096 || (u.start = s, l(d + 63 >> 6)));
      for (; 511 & a.l;) a.write_shift(-4, x.ENDOFCHAIN);
      for (r = 0; r < o[4] << 2; ++r) {
        var p = t.FullPaths[r];
        if (p && 0 !== p.length) {
          u = t.FileIndex[r], 0 === r && (u.start = u.size ? u.start - 1 : h);
          var m = 0 === r && n.root || u.name;
          if (d = 2 * (m.length + 1), a.write_shift(64, m, "utf16le"), a.write_shift(2, d), a.write_shift(1, u.type), a
            .write_shift(1, u.color), a.write_shift(-4, u.L), a.write_shift(-4, u.R), a.write_shift(-4, u.C), u.clsid) a
            .write_shift(16, u.clsid, "hex");
          else
            for (c = 0; c < 4; ++c) a.write_shift(4, 0);
          a.write_shift(4, u.state || 0), a.write_shift(4, 0), a.write_shift(4, 0), a.write_shift(4, 0), a.write_shift(
            4, 0), a.write_shift(4, u.start), a.write_shift(4, u.size), a.write_shift(4, 0)
        } else {
          for (c = 0; c < 17; ++c) a.write_shift(4, 0);
          for (c = 0; c < 3; ++c) a.write_shift(4, -1);
          for (c = 0; c < 12; ++c) a.write_shift(4, 0)
        }
      }
      for (r = 1; r < t.FileIndex.length; ++r)
        if ((u = t.FileIndex[r]).size >= 4096)
          if (a.l = u.start + 1 << 9, am && Buffer.isBuffer(u.content)) u.content.copy(a, a.l, 0, u.size), a.l += u
            .size + 511 & -512;
          else {
            for (c = 0; c < u.size; ++c) a.write_shift(1, u.content[c]);
            for (; 511 & c; ++c) a.write_shift(1, 0)
          } for (r = 1; r < t.FileIndex.length; ++r)
        if ((u = t.FileIndex[r]).size > 0 && u.size < 4096)
          if (am && Buffer.isBuffer(u.content)) u.content.copy(a, a.l, 0, u.size), a.l += u.size + 63 & -64;
          else {
            for (c = 0; c < u.size; ++c) a.write_shift(1, u.content[c]);
            for (; 63 & c; ++c) a.write_shift(1, 0)
          } if (am) a.l = a.length;
      else
        for (; a.l < a.length;) a.write_shift(1, 0);
      return a
    }
    e.version = "1.2.1";
    var g, f = 64,
      h = -2,
      v = "d0cf11e0a1b11ae1",
      y = [208, 207, 17, 224, 161, 177, 26, 225],
      k = "00000000000000000000000000000000",
      x = {
        MAXREGSECT: -6,
        DIFSECT: -4,
        FATSECT: -3,
        ENDOFCHAIN: h,
        FREESECT: -1,
        HEADER_SIGNATURE: v,
        HEADER_MINOR_VERSION: "3e00",
        MAXREGSID: -6,
        NOSTREAM: -1,
        HEADER_CLSID: k,
        EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
      };

    function w(t) {
      for (var e = new Array(t.length), n = 0; n < t.length; ++n) e[n] = String.fromCharCode(t[n]);
      return e.join("")
    }

    function C(t) {
      return g ? g.deflateRawSync(t) : q(t)
    }
    var S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      T = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227,
        258
      ],
      I = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097,
        6145, 8193, 12289, 16385, 24577
      ];

    function A(t) {
      var e = 139536 & (t << 1 | t << 11) | 558144 & (t << 5 | t << 15);
      return 255 & (e >> 16 | e >> 8 | e)
    }
    for (var E = "undefined" != typeof Uint8Array, P = E ? new Uint8Array(256) : [], O = 0; O < 256; ++O) P[O] = A(O);

    function M(t, e) {
      var n = P[255 & t];
      return e <= 8 ? n >>> 8 - e : (n = n << 8 | P[t >> 8 & 255], e <= 16 ? n >>> 16 - e : (n = n << 8 | P[t >> 16 &
        255]) >>> 24 - e)
    }

    function L(t, e) {
      var n = 7 & e,
        o = e >>> 3;
      return (t[o] | (n <= 6 ? 0 : t[o + 1] << 8)) >>> n & 3
    }

    function _(t, e) {
      var n = 7 & e,
        o = e >>> 3;
      return (t[o] | (n <= 5 ? 0 : t[o + 1] << 8)) >>> n & 7
    }

    function B(t, e) {
      var n = 7 & e,
        o = e >>> 3;
      return (t[o] | (n <= 3 ? 0 : t[o + 1] << 8)) >>> n & 31
    }

    function F(t, e) {
      var n = 7 & e,
        o = e >>> 3;
      return (t[o] | (n <= 1 ? 0 : t[o + 1] << 8)) >>> n & 127
    }

    function R(t, e, n) {
      var o = 7 & e,
        i = e >>> 3,
        a = (1 << n) - 1,
        r = t[i] >>> o;
      return n < 8 - o ? r & a : (r |= t[i + 1] << 8 - o, n < 16 - o ? r & a : (r |= t[i + 2] << 16 - o, n < 24 - o ?
        r & a : (r |= t[i + 3] << 24 - o) & a))
    }

    function D(t, e, n) {
      var o = 7 & e,
        i = e >>> 3;
      return o <= 5 ? t[i] |= (7 & n) << o : (t[i] |= n << o & 255, t[i + 1] = (7 & n) >> 8 - o), e + 3
    }

    function V(t, e, n) {
      return n = (1 & n) << (7 & e), t[e >>> 3] |= n, e + 1
    }

    function N(t, e, n) {
      var o = e >>> 3;
      return n <<= 7 & e, t[o] |= 255 & n, n >>>= 8, t[o + 1] = n, e + 8
    }

    function $(t, e, n) {
      var o = e >>> 3;
      return n <<= 7 & e, t[o] |= 255 & n, n >>>= 8, t[o + 1] = 255 & n, t[o + 2] = n >>> 8, e + 16
    }

    function z(t, e) {
      var n = t.length,
        o = 2 * n > e ? 2 * n : e + 5,
        i = 0;
      if (n >= e) return t;
      if (am) {
        var a = lm(o);
        if (t.copy) t.copy(a);
        else
          for (; i < t.length; ++i) a[i] = t[i];
        return a
      }
      if (E) {
        var r = new Uint8Array(o);
        if (r.set) r.set(t);
        else
          for (; i < n; ++i) r[i] = t[i];
        return r
      }
      return t.length = o, t
    }

    function U(t) {
      for (var e = new Array(t), n = 0; n < t; ++n) e[n] = 0;
      return e
    }

    function j(t, e, n) {
      var o = 1,
        i = 0,
        a = 0,
        r = 0,
        s = 0,
        l = t.length,
        c = E ? new Uint16Array(32) : U(32);
      for (a = 0; a < 32; ++a) c[a] = 0;
      for (a = l; a < n; ++a) t[a] = 0;
      l = t.length;
      var d = E ? new Uint16Array(l) : U(l);
      for (a = 0; a < l; ++a) c[i = t[a]]++, o < i && (o = i), d[a] = 0;
      for (c[0] = 0, a = 1; a <= o; ++a) c[a + 16] = s = s + c[a - 1] << 1;
      for (a = 0; a < l; ++a) 0 != (s = t[a]) && (d[a] = c[s + 16]++);
      var u = 0;
      for (a = 0; a < l; ++a)
        if (0 != (u = t[a]))
          for (s = M(d[a], o) >> o - u, r = (1 << o + 4 - u) - 1; r >= 0; --r) e[s | r << u] = 15 & u | a << 4;
      return o
    }
    var H = E ? new Uint16Array(512) : U(512),
      G = E ? new Uint16Array(32) : U(32);
    if (!E) {
      for (var K = 0; K < 512; ++K) H[K] = 0;
      for (K = 0; K < 32; ++K) G[K] = 0
    }! function() {
      for (var t = [], e = 0; e < 32; e++) t.push(5);
      j(t, G, 32);
      var n = [];
      for (e = 0; e <= 143; e++) n.push(8);
      for (; e <= 255; e++) n.push(9);
      for (; e <= 279; e++) n.push(7);
      for (; e <= 287; e++) n.push(8);
      j(n, H, 288)
    }();
    var W = function() {
      for (var t = E ? new Uint8Array(32768) : [], e = 0, n = 0; e < I.length - 1; ++e)
        for (; n < I[e + 1]; ++n) t[n] = e;
      for (; n < 32768; ++n) t[n] = 29;
      var o = E ? new Uint8Array(259) : [];
      for (e = 0, n = 0; e < T.length - 1; ++e)
        for (; n < T[e + 1]; ++n) o[n] = e;
      return function(e, n) {
        return e.length < 8 ? function(t, e) {
          for (var n = 0; n < t.length;) {
            var o = Math.min(65535, t.length - n),
              i = n + o == t.length;
            for (e.write_shift(1, +i), e.write_shift(2, o), e.write_shift(2, 65535 & ~o); o-- > 0;) e[e.l++] = t[
              n++]
          }
          return e.l
        }(e, n) : function(e, n) {
          for (var i = 0, a = 0, r = E ? new Uint16Array(32768) : []; a < e.length;) {
            var s = Math.min(65535, e.length - a);
            if (s < 10) {
              for (7 & (i = D(n, i, +!(a + s != e.length))) && (i += 8 - (7 & i)), n.l = i / 8 | 0, n.write_shift(
                  2, s), n.write_shift(2, 65535 & ~s); s-- > 0;) n[n.l++] = e[a++];
              i = 8 * n.l
            } else {
              i = D(n, i, +!(a + s != e.length) + 2);
              for (var l = 0; s-- > 0;) {
                var c = e[a],
                  d = -1,
                  u = 0;
                if ((d = r[l = 32767 & (l << 5 ^ c)]) && ((d |= -32768 & a) > a && (d -= 32768), d < a))
                  for (; e[d + u] == e[a + u] && u < 250;) ++u;
                if (u > 2) {
                  (c = o[u]) <= 22 ? i = N(n, i, P[c + 1] >> 1) - 1 : (N(n, i, 3), N(n, i += 5, P[c - 23] >> 5),
                    i += 3);
                  var p = c < 8 ? 0 : c - 4 >> 2;
                  p > 0 && ($(n, i, u - T[c]), i += p), c = t[a - d], i = N(n, i, P[c] >> 3), i -= 3;
                  var b = c < 4 ? 0 : c - 2 >> 1;
                  b > 0 && ($(n, i, a - d - I[c]), i += b);
                  for (var m = 0; m < u; ++m) r[l] = 32767 & a, l = 32767 & (l << 5 ^ e[a]), ++a;
                  s -= u - 1
                } else c <= 143 ? c += 48 : i = V(n, i, 1), i = N(n, i, P[c]), r[l] = 32767 & a, ++a
              }
              i = N(n, i, 0) - 1
            }
          }
          return n.l = (i + 7) / 8 | 0, n.l
        }(e, n)
      }
    }();

    function q(t) {
      var e = eh(50 + Math.floor(1.1 * t.length)),
        n = W(t, e);
      return e.slice(0, n)
    }
    var Y = E ? new Uint16Array(32768) : U(32768),
      X = E ? new Uint16Array(32768) : U(32768),
      J = E ? new Uint16Array(128) : U(128),
      Z = 1,
      Q = 1;

    function tt(t, e) {
      var n = B(t, e) + 257,
        o = B(t, e += 5) + 1,
        i = function(t, e) {
          var n = 7 & e,
            o = e >>> 3;
          return (t[o] | (n <= 4 ? 0 : t[o + 1] << 8)) >>> n & 15
        }(t, e += 5) + 4;
      e += 4;
      for (var a = 0, r = E ? new Uint8Array(19) : U(19), s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          l = 1, c = E ? new Uint8Array(8) : U(8), d = E ? new Uint8Array(8) : U(8), u = r.length, p = 0; p < i; ++p) r[
        S[p]] = a = _(t, e), l < a && (l = a), c[a]++, e += 3;
      var b = 0;
      for (c[0] = 0, p = 1; p <= l; ++p) d[p] = b = b + c[p - 1] << 1;
      for (p = 0; p < u; ++p) 0 != (b = r[p]) && (s[p] = d[b]++);
      var m = 0;
      for (p = 0; p < u; ++p)
        if (0 != (m = r[p])) {
          b = P[s[p]] >> 8 - m;
          for (var g = (1 << 7 - m) - 1; g >= 0; --g) J[b | g << m] = 7 & m | p << 3
        } var f = [];
      for (l = 1; f.length < n + o;) switch (e += 7 & (b = J[F(t, e)]), b >>>= 3) {
        case 16:
          for (a = 3 + L(t, e), e += 2, b = f[f.length - 1]; a-- > 0;) f.push(b);
          break;
        case 17:
          for (a = 3 + _(t, e), e += 3; a-- > 0;) f.push(0);
          break;
        case 18:
          for (a = 11 + F(t, e), e += 7; a-- > 0;) f.push(0);
          break;
        default:
          f.push(b), l < b && (l = b)
      }
      var h = f.slice(0, n),
        v = f.slice(n);
      for (p = n; p < 286; ++p) h[p] = 0;
      for (p = o; p < 30; ++p) v[p] = 0;
      return Z = j(h, Y, 286), Q = j(v, X, 30), e
    }

    function et(t, e) {
      var n = function(t, e) {
        if (3 == t[0] && !(3 & t[1])) return [sm(e), 2];
        for (var n = 0, o = 0, i = lm(e || 1 << 18), a = 0, r = i.length >>> 0, s = 0, l = 0; !(1 & o);)
          if (o = _(t, n), n += 3, o >>> 1 != 0)
            for (o >> 1 == 1 ? (s = 9, l = 5) : (n = tt(t, n), s = Z, l = Q);;) {
              !e && r < a + 32767 && (r = (i = z(i, a + 32767)).length);
              var c = R(t, n, s),
                d = o >>> 1 == 1 ? H[c] : Y[c];
              if (n += 15 & d, (d >>>= 4) >>> 8 & 255) {
                if (256 == d) break;
                var u = (d -= 257) < 8 ? 0 : d - 4 >> 2;
                u > 5 && (u = 0);
                var p = a + T[d];
                u > 0 && (p += R(t, n, u), n += u), c = R(t, n, l), n += 15 & (d = o >>> 1 == 1 ? G[c] : X[c]);
                var b = (d >>>= 4) < 4 ? 0 : d - 2 >> 1,
                  m = I[d];
                for (b > 0 && (m += R(t, n, b), n += b), !e && r < p && (r = (i = z(i, p + 100)).length); a < p;) i[
                  a] = i[a - m], ++a
              } else i[a++] = d
            } else {
              7 & n && (n += 8 - (7 & n));
              var g = t[n >>> 3] | t[(n >>> 3) + 1] << 8;
              if (n += 32, g > 0)
                for (!e && r < a + g && (r = (i = z(i, a + g)).length); g-- > 0;) i[a++] = t[n >>> 3], n += 8
            }
        return e ? [i, n + 7 >>> 3] : [i.slice(0, a), n + 7 >>> 3]
      }(t.slice(t.l || 0), e);
      return t.l += n[1], n[0]
    }

    function nt(t, e) {
      if (!t) throw new Error(e)
    }

    function ot(t, e) {
      var n = t;
      Qf(n, 0);
      var o = {
        FileIndex: [],
        FullPaths: []
      };
      p(o, {
        root: e.root
      });
      for (var i = n.length - 4;
        (80 != n[i] || 75 != n[i + 1] || 5 != n[i + 2] || 6 != n[i + 3]) && i >= 0;) --i;
      n.l = i + 4, n.l += 4;
      var r = n.read_shift(2);
      n.l += 6;
      var s = n.read_shift(4);
      for (n.l = s, i = 0; i < r; ++i) {
        n.l += 20;
        var l = n.read_shift(4),
          c = n.read_shift(4),
          d = n.read_shift(2),
          u = n.read_shift(2),
          b = n.read_shift(2);
        n.l += 8;
        var m = n.read_shift(4),
          g = a(n.slice(n.l + d, n.l + d + u));
        n.l += d + u + b;
        var f = n.l;
        n.l = m + 4, it(n, l, c, o, g), n.l = f
      }
      return o
    }

    function it(t, e, n, o, i) {
      t.l += 2;
      var r = t.read_shift(2),
        s = t.read_shift(2),
        l = function(t) {
          var e = 65535 & t.read_shift(2),
            n = 65535 & t.read_shift(2),
            o = new Date,
            i = 31 & n,
            a = 15 & (n >>>= 5);
          n >>>= 4, o.setMilliseconds(0), o.setFullYear(n + 1980), o.setMonth(a - 1), o.setDate(i);
          var r = 31 & e,
            s = 63 & (e >>>= 5);
          return e >>>= 6, o.setHours(e), o.setMinutes(s), o.setSeconds(r << 1), o
        }(t);
      if (8257 & r) throw new Error("Unsupported ZIP encryption");
      t.read_shift(4);
      for (var c = t.read_shift(4), d = t.read_shift(4), u = t.read_shift(2), p = t.read_shift(2), b = "", m = 0; m <
        u; ++m) b += String.fromCharCode(t[t.l++]);
      if (p) {
        var f = a(t.slice(t.l, t.l + p));
        (f[21589] || {}).mt && (l = f[21589].mt), ((i || {})[21589] || {}).mt && (l = i[21589].mt)
      }
      t.l += p;
      var h = t.slice(t.l, t.l + c);
      switch (s) {
        case 8:
          h = function(t, e) {
            if (!g) return et(t, e);
            var n = new(0, g.InflateRaw),
              o = n._processChunk(t.slice(t.l), n._finishFlushFlag);
            return t.l += n.bytesRead, o
          }(t, d);
          break;
        case 0:
          break;
        default:
          throw new Error("Unsupported ZIP Compression method " + s)
      }
      var v = !1;
      8 & r && (134695760 == t.read_shift(4) && (t.read_shift(4), v = !0), c = t.read_shift(4), d = t.read_shift(4)),
        c != e && nt(v, "Bad compressed size: " + e + " != " + c), d != n && nt(v, "Bad uncompressed size: " + n +
          " != " + d), dt(o, b, h, {
          unsafe: !0,
          mt: l
        })
    }
    var at = {
      htm: "text/html",
      xml: "text/xml",
      gif: "image/gif",
      jpg: "image/jpeg",
      png: "image/png",
      mso: "application/x-mso",
      thmx: "application/vnd.ms-officetheme",
      sh33tj5: "application/octet-stream"
    };

    function rt(t, e) {
      if (t.ctype) return t.ctype;
      var n = t.name || "",
        o = n.match(/\.([^\.]+)$/);
      return o && at[o[1]] || e && (o = (n = e).match(/[\.\\]([^\.\\])+$/)) && at[o[1]] ? at[o[1]] :
        "application/octet-stream"
    }

    function st(t) {
      for (var e = om(t), n = [], o = 0; o < e.length; o += 76) n.push(e.slice(o, o + 76));
      return n.join("\r\n") + "\r\n"
    }

    function lt(t) {
      var e = t.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(t) {
        var e = t.charCodeAt(0).toString(16).toUpperCase();
        return "=" + (1 == e.length ? "0" + e : e)
      });
      "\n" == (e = e.replace(/ $/gm, "=20").replace(/\t$/gm, "=09")).charAt(0) && (e = "=0D" + e.slice(1));
      for (var n = [], o = (e = e.replace(/\r(?!\n)/gm, "=0D").replace(/\n\n/gm, "\n=0A").replace(/([^\r\n])\n/gm,
          "$1=0A")).split("\r\n"), i = 0; i < o.length; ++i) {
        var a = o[i];
        if (0 != a.length)
          for (var r = 0; r < a.length;) {
            var s = 76,
              l = a.slice(r, r + s);
            "=" == l.charAt(s - 1) ? s-- : "=" == l.charAt(s - 2) ? s -= 2 : "=" == l.charAt(s - 3) && (s -= 3), l = a
              .slice(r, r + s), (r += s) < a.length && (l += "="), n.push(l)
          } else n.push("")
      }
      return n.join("\r\n")
    }

    function ct(t, e, n) {
      for (var o, i = "", a = "", r = "", s = 0; s < 10; ++s) {
        var l = e[s];
        if (!l || l.match(/^\s*$/)) break;
        var c = l.match(/^(.*?):\s*([^\s].*)$/);
        if (c) switch (c[1].toLowerCase()) {
          case "content-location":
            i = c[2].trim();
            break;
          case "content-type":
            r = c[2].trim();
            break;
          case "content-transfer-encoding":
            a = c[2].trim()
        }
      }
      switch (++s, a.toLowerCase()) {
        case "base64":
          o = cm(im(e.slice(s).join("")));
          break;
        case "quoted-printable":
          o = function(t) {
            for (var e = [], n = 0; n < t.length; ++n) {
              for (var o = t[n]; n <= t.length && "=" == o.charAt(o.length - 1);) o = o.slice(0, o.length - 1) + t[++
                n];
              e.push(o)
            }
            for (var i = 0; i < e.length; ++i) e[i] = e[i].replace(/[=][0-9A-Fa-f]{2}/g, function(t) {
              return String.fromCharCode(parseInt(t.slice(1), 16))
            });
            return cm(e.join("\r\n"))
          }(e.slice(s));
          break;
        default:
          throw new Error("Unsupported Content-Transfer-Encoding " + a)
      }
      var d = dt(t, i.slice(n.length), o, {
        unsafe: !0
      });
      r && (d.ctype = r)
    }

    function dt(t, e, n, i) {
      var a = i && i.unsafe;
      a || p(t);
      var r = !a && lg.find(t, e);
      if (!r) {
        var s = t.FullPaths[0];
        e.slice(0, s.length) == s ? s = e : ("/" != s.slice(-1) && (s += "/"), s = (s + e).replace("//", "/")), r = {
          name: o(e),
          type: 2
        }, t.FileIndex.push(r), t.FullPaths.push(s), a || lg.utils.cfb_gc(t)
      }
      return r.content = n, r.size = n ? n.length : 0, i && (i.CLSID && (r.clsid = i.CLSID), i.mt && (r.mt = i.mt), i
        .ct && (r.ct = i.ct)), r
    }
    return e.find = function(t, e) {
      var n = t.FullPaths.map(function(t) {
          return t.toUpperCase()
        }),
        o = n.map(function(t) {
          var e = t.split("/");
          return e[e.length - ("/" == t.slice(-1) ? 2 : 1)]
        }),
        i = !1;
      47 === e.charCodeAt(0) ? (i = !0, e = n[0].slice(0, -1) + e) : i = -1 !== e.indexOf("/");
      var a = e.toUpperCase(),
        r = !0 === i ? n.indexOf(a) : o.indexOf(a);
      if (-1 !== r) return t.FileIndex[r];
      var s = !a.match(mm);
      for (a = a.replace(bm, ""), s && (a = a.replace(mm, "!")), r = 0; r < n.length; ++r) {
        if ((s ? n[r].replace(mm, "!") : n[r]).replace(bm, "") == a) return t.FileIndex[r];
        if ((s ? o[r].replace(mm, "!") : o[r]).replace(bm, "") == a) return t.FileIndex[r]
      }
      return null
    }, e.read = function(e, n) {
      var o = n && n.type;
      switch (o || am && Buffer.isBuffer(e) && (o = "buffer"), o || "base64") {
        case "file":
          return function(e, n) {
            return r(), s(t.readFileSync(e), n)
          }(e, n);
        case "base64":
          return s(cm(im(e)), n);
        case "binary":
          return s(cm(e), n)
      }
      return s(e, n)
    }, e.parse = s, e.write = function(e, n) {
      var o = m(e, n);
      switch (n && n.type || "buffer") {
        case "file":
          return r(), t.writeFileSync(n.filename, o), o;
        case "binary":
          return "string" == typeof o ? o : w(o);
        case "base64":
          return om("string" == typeof o ? o : w(o));
        case "buffer":
          if (am) return Buffer.isBuffer(o) ? o : rm(o);
        case "array":
          return "string" == typeof o ? cm(o) : o
      }
      return o
    }, e.writeFile = function(e, n, o) {
      r();
      var i = m(e, o);
      t.writeFileSync(n, i)
    }, e.utils = {
      cfb_new: function(t) {
        var e = {};
        return p(e, t), e
      },
      cfb_add: dt,
      cfb_del: function(t, e) {
        p(t);
        var n = lg.find(t, e);
        if (n)
          for (var o = 0; o < t.FileIndex.length; ++o)
            if (t.FileIndex[o] == n) return t.FileIndex.splice(o, 1), t.FullPaths.splice(o, 1), !0;
        return !1
      },
      cfb_mov: function(t, e, n) {
        p(t);
        var i = lg.find(t, e);
        if (i)
          for (var a = 0; a < t.FileIndex.length; ++a)
            if (t.FileIndex[a] == i) return t.FileIndex[a].name = o(n), t.FullPaths[a] = n, !0;
        return !1
      },
      cfb_gc: function(t) {
        b(t, !0)
      },
      ReadShift: Wf,
      CheckField: Zf,
      prep_blob: Qf,
      bconcat: pm,
      use_zlib: function(t) {
        try {
          var e = new(0, t.InflateRaw);
          if (e._processChunk(new Uint8Array([3, 0]), e._finishFlushFlag), !e.bytesRead) throw new Error(
            "zlib does not expose bytesRead");
          g = t
        } catch (aD) {}
      },
      _deflateRaw: q,
      _inflateRaw: et,
      consts: x
    }, e
  }();

function cg(t) {
  for (var e = Object.keys(t), n = [], o = 0; o < e.length; ++o) Object.prototype.hasOwnProperty.call(t, e[o]) && n
    .push(e[o]);
  return n
}

function dg(t) {
  for (var e = [], n = cg(t), o = 0; o !== n.length; ++o) e[t[n[o]]] = n[o];
  return e
}
var ug = new Date(1899, 11, 30, 0, 0, 0);

function pg(t, e) {
  return (t.getTime() - (ug.getTime() + 6e4 * (t.getTimezoneOffset() - ug.getTimezoneOffset()))) / 864e5
}
var bg = new Date,
  mg = ug.getTime() + 6e4 * (bg.getTimezoneOffset() - ug.getTimezoneOffset()),
  gg = bg.getTimezoneOffset();

function fg(t) {
  var e = new Date;
  return e.setTime(24 * t * 60 * 60 * 1e3 + mg), e.getTimezoneOffset() !== gg && e.setTime(e.getTime() + 6e4 * (e
    .getTimezoneOffset() - gg)), e
}

function hg(t) {
  var e = 0,
    n = 0,
    o = !1,
    i = t.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
  if (!i) throw new Error("|" + t + "| is not an ISO8601 Duration");
  for (var a = 1; a != i.length; ++a)
    if (i[a]) {
      switch (n = 1, a > 3 && (o = !0), i[a].slice(i[a].length - 1)) {
        case "Y":
          throw new Error("Unsupported ISO Duration Field: " + i[a].slice(i[a].length - 1));
        case "D":
          n *= 24;
        case "H":
          n *= 60;
        case "M":
          if (!o) throw new Error("Unsupported ISO Duration Field: M");
          n *= 60
      }
      e += n * parseInt(i[a], 10)
    } return e
}
var vg = new Date("2017-02-19T19:06:09.000Z"),
  yg = isNaN(vg.getFullYear()) ? new Date("2/19/17") : vg,
  kg = 2017 == yg.getFullYear();

function xg(t, e) {
  var n = new Date(t);
  if (kg) return e > 0 ? n.setTime(n.getTime() + 60 * n.getTimezoneOffset() * 1e3) : e < 0 && n.setTime(n.getTime() -
    60 * n.getTimezoneOffset() * 1e3), n;
  if (t instanceof Date) return t;
  if (1917 == yg.getFullYear() && !isNaN(n.getFullYear())) {
    var o = n.getFullYear();
    return t.indexOf("" + o) > -1 || n.setFullYear(n.getFullYear() + 100), n
  }
  var i = t.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"],
    a = new Date(+i[0], +i[1] - 1, +i[2], +i[3] || 0, +i[4] || 0, +i[5] || 0);
  return t.indexOf("Z") > -1 && (a = new Date(a.getTime() - 60 * a.getTimezoneOffset() * 1e3)), a
}

function wg(t, e) {
  if (am && Buffer.isBuffer(t)) {
    if (e) {
      if (255 == t[0] && 254 == t[1]) return sf(t.slice(2).toString("utf16le"));
      if (254 == t[1] && 255 == t[2]) return sf(Jb(t.slice(2).toString("binary")))
    }
    return t.toString("binary")
  }
  if ("undefined" != typeof TextDecoder) try {
    if (e) {
      if (255 == t[0] && 254 == t[1]) return sf(new TextDecoder("utf-16le").decode(t.slice(2)));
      if (254 == t[0] && 255 == t[1]) return sf(new TextDecoder("utf-16be").decode(t.slice(2)))
    }
    var n = {
      "\u20ac": "\x80",
      "\u201a": "\x82",
      "\u0192": "\x83",
      "\u201e": "\x84",
      "\u2026": "\x85",
      "\u2020": "\x86",
      "\u2021": "\x87",
      "\u02c6": "\x88",
      "\u2030": "\x89",
      "\u0160": "\x8a",
      "\u2039": "\x8b",
      "\u0152": "\x8c",
      "\u017d": "\x8e",
      "\u2018": "\x91",
      "\u2019": "\x92",
      "\u201c": "\x93",
      "\u201d": "\x94",
      "\u2022": "\x95",
      "\u2013": "\x96",
      "\u2014": "\x97",
      "\u02dc": "\x98",
      "\u2122": "\x99",
      "\u0161": "\x9a",
      "\u203a": "\x9b",
      "\u0153": "\x9c",
      "\u017e": "\x9e",
      "\u0178": "\x9f"
    };
    return Array.isArray(t) && (t = new Uint8Array(t)), new TextDecoder("latin1").decode(t).replace(
      /[\u20ac\u201a\u0192\u201e\u2026\u2020\u2021\u02c6\u2030\u0160\u2039\u0152\u017d\u2018\u2019\u201c\u201d\u2022\u2013\u2014\u02dc\u2122\u0161\u203a\u0153\u017e\u0178]/g,
      function(t) {
        return n[t] || t
      })
  } catch (aD) {}
  for (var o = [], i = 0; i != t.length; ++i) o.push(String.fromCharCode(t[i]));
  return o.join("")
}

function Cg(t) {
  if ("undefined" != typeof JSON && !Array.isArray(t)) return JSON.parse(JSON.stringify(t));
  if ("object" != typeof t || null == t) return t;
  if (t instanceof Date) return new Date(t.getTime());
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = Cg(t[n]));
  return e
}

function Sg(t, e) {
  for (var n = ""; n.length < e;) n += t;
  return n
}

function Tg(t) {
  var e = Number(t);
  if (!isNaN(e)) return isFinite(e) ? e : NaN;
  if (!/\d/.test(t)) return e;
  var n = 1,
    o = t.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
      return n *= 100, ""
    });
  return isNaN(e = Number(o)) ? (o = o.replace(/[(](.*)[)]/, function(t, e) {
    return n = -n, e
  }), isNaN(e = Number(o)) ? e : e / n) : e / n
}
var Ig = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november",
  "december"
];

function Ag(t) {
  var e = new Date(t),
    n = new Date(NaN),
    o = e.getYear(),
    i = e.getMonth(),
    a = e.getDate();
  if (isNaN(a)) return n;
  var r = t.toLowerCase();
  if (r.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if ((r = r.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, "")).length > 3 && -1 == Ig.indexOf(r))
      return n
  } else if (r.match(/[a-z]/)) return n;
  return o < 0 || o > 8099 ? n : (i > 0 || a > 1) && 101 != o ? e : t.match(/[^-0-9:,\/\\]/) ? n : e
}
var Eg = function() {
  var t = 5 == "abacaba".split(/(:?b)/i).length;
  return function(e, n, o) {
    if (t || "string" == typeof n) return e.split(n);
    for (var i = e.split(n), a = [i[0]], r = 1; r < i.length; ++r) a.push(o), a.push(i[r]);
    return a
  }
}();

function Pg(t) {
  return t ? t.content && t.type ? wg(t.content, !0) : t.data ? Qb(t.data) : t.asNodeBuffer && am ? Qb(t.asNodeBuffer()
    .toString("binary")) : t.asBinary ? Qb(t.asBinary()) : t._data && t._data.getContent ? Qb(wg(Array.prototype.slice
    .call(t._data.getContent(), 0))) : null : null
}

function Og(t) {
  if (!t) return null;
  if (t.data) return Xb(t.data);
  if (t.asNodeBuffer && am) return t.asNodeBuffer();
  if (t._data && t._data.getContent) {
    var e = t._data.getContent();
    return "string" == typeof e ? Xb(e) : Array.prototype.slice.call(e)
  }
  return t.content && t.type ? t.content : null
}

function Mg(t, e) {
  for (var n = t.FullPaths || cg(t.files), o = e.toLowerCase().replace(/[\/]/g, "\\"), i = o.replace(/\\/g, "/"), a =
    0; a < n.length; ++a) {
    var r = n[a].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (o == r || i == r) return t.files ? t.files[n[a]] : t.FileIndex[a]
  }
  return null
}

function Lg(t, e) {
  var n = Mg(t, e);
  if (null == n) throw new Error("Cannot find file " + e + " in zip");
  return n
}

function _g(t, e, n) {
  if (!n) return (o = Lg(t, e)) && ".bin" === o.name.slice(-4) ? Og(o) : Pg(o);
  var o;
  if (!e) return null;
  try {
    return _g(t, e)
  } catch (aD) {
    return null
  }
}

function Bg(t, e, n) {
  if (!n) return Pg(Lg(t, e));
  if (!e) return null;
  try {
    return Bg(t, e)
  } catch (aD) {
    return null
  }
}

function Fg(t) {
  for (var e = t.FullPaths || cg(t.files), n = [], o = 0; o < e.length; ++o) "/" != e[o].slice(-1) && n.push(e[o]
    .replace(/^Root Entry[\/]/, ""));
  return n.sort()
}

function Rg(t, e, n) {
  if (t.FullPaths) {
    var o;
    if ("string" == typeof n) return o = am ? rm(n) : function(t) {
      for (var e = [], n = 0, o = t.length + 250, i = sm(t.length + 255), a = 0; a < t.length; ++a) {
        var r = t.charCodeAt(a);
        if (r < 128) i[n++] = r;
        else if (r < 2048) i[n++] = 192 | r >> 6 & 31, i[n++] = 128 | 63 & r;
        else if (r >= 55296 && r < 57344) {
          r = 64 + (1023 & r);
          var s = 1023 & t.charCodeAt(++a);
          i[n++] = 240 | r >> 8 & 7, i[n++] = 128 | r >> 2 & 63, i[n++] = 128 | s >> 6 & 15 | (3 & r) << 4, i[n++] =
            128 | 63 & s
        } else i[n++] = 224 | r >> 12 & 15, i[n++] = 128 | r >> 6 & 63, i[n++] = 128 | 63 & r;
        n > o && (e.push(i.slice(0, n)), n = 0, i = sm(65535), o = 65530)
      }
      return e.push(i.slice(0, n)), pm(e)
    }(n), lg.utils.cfb_add(t, e, o);
    lg.utils.cfb_add(t, e, n)
  } else t.file(e, n)
}

function Dg(t, e) {
  switch (e.type) {
    case "base64":
      return lg.read(t, {
        type: "base64"
      });
    case "binary":
      return lg.read(t, {
        type: "binary"
      });
    case "buffer":
    case "array":
      return lg.read(t, {
        type: "buffer"
      })
  }
  throw new Error("Unrecognized type " + e.type)
}

function Vg(t, e) {
  if ("/" == t.charAt(0)) return t.slice(1);
  var n = e.split("/");
  "/" != e.slice(-1) && n.pop();
  for (var o = t.split("/"); 0 !== o.length;) {
    var i = o.shift();
    ".." === i ? n.pop() : "." !== i && n.push(i)
  }
  return n.join("/")
}
var Ng = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n',
  $g = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g,
  zg = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/gm,
  Ug = Ng.match(zg) ? zg : /<[^>]*>/g,
  jg = /<\w*:/,
  Hg = /<(\/?)\w+:/;

function Gg(t, e, n) {
  for (var o = {}, i = 0, a = 0; i !== t.length && (32 !== (a = t.charCodeAt(i)) && 10 !== a && 13 !== a); ++i);
  if (e || (o[0] = t.slice(0, i)), i === t.length) return o;
  var r = t.match($g),
    s = 0,
    l = "",
    c = 0,
    d = "",
    u = "",
    p = 1;
  if (r)
    for (c = 0; c != r.length; ++c) {
      for (u = r[c], a = 0; a != u.length && 61 !== u.charCodeAt(a); ++a);
      for (d = u.slice(0, a).trim(); 32 == u.charCodeAt(a + 1);) ++a;
      for (p = 34 == (i = u.charCodeAt(a + 1)) || 39 == i ? 1 : 0, l = u.slice(a + 1 + p, u.length - p), s = 0; s != d
        .length && 58 !== d.charCodeAt(s); ++s);
      if (s === d.length) d.indexOf("_") > 0 && (d = d.slice(0, d.indexOf("_"))), o[d] = l, o[d.toLowerCase()] = l;
      else {
        var b = (5 === s && "xmlns" === d.slice(0, 5) ? "xmlns" : "") + d.slice(s + 1);
        if (o[b] && "ext" == d.slice(s - 3, s)) continue;
        o[b] = l, o[b.toLowerCase()] = l
      }
    }
  return o
}

function Kg(t) {
  return t.replace(Hg, "<$1")
}
var Wg = {
    "&quot;": '"',
    "&apos;": "'",
    "&gt;": ">",
    "&lt;": "<",
    "&amp;": "&"
  },
  qg = dg(Wg),
  Yg = function() {
    var t = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,
      e = /_x([\da-fA-F]{4})_/gi;
    return function n(o) {
      var i = o + "",
        a = i.indexOf("<![CDATA[");
      if (-1 == a) return i.replace(t, function(t, e) {
        return Wg[t] || String.fromCharCode(parseInt(e, t.indexOf("x") > -1 ? 16 : 10)) || t
      }).replace(e, function(t, e) {
        return String.fromCharCode(parseInt(e, 16))
      });
      var r = i.indexOf("]]>");
      return n(i.slice(0, a)) + i.slice(a + 9, r) + n(i.slice(r + 3))
    }
  }(),
  Xg = /[&<>'"]/g,
  Jg = /[\u0000-\u001f]/g;

function Zg(t) {
  return (t + "").replace(Xg, function(t) {
    return qg[t]
  }).replace(/\n/g, "<br/>").replace(Jg, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";"
  })
}
var Qg = function() {
  var t = /&#(\d+);/g;

  function e(t, e) {
    return String.fromCharCode(parseInt(e, 10))
  }
  return function(n) {
    return n.replace(t, e)
  }
}();

function tf(t) {
  switch (t) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1
  }
}

function ef(t) {
  for (var e = "", n = 0, o = 0, i = 0, a = 0, r = 0, s = 0; n < t.length;)(o = t.charCodeAt(n++)) < 128 ? e += String
    .fromCharCode(o) : (i = t.charCodeAt(n++), o > 191 && o < 224 ? (r = (31 & o) << 6, r |= 63 & i, e += String
      .fromCharCode(r)) : (a = t.charCodeAt(n++), o < 240 ? e += String.fromCharCode((15 & o) << 12 | (63 & i) << 6 |
      63 & a) : (s = ((7 & o) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & (r = t.charCodeAt(n++))) - 65536, e +=
      String.fromCharCode(55296 + (s >>> 10 & 1023)), e += String.fromCharCode(56320 + (1023 & s)))));
  return e
}

function nf(t) {
  var e, n, o, i = sm(2 * t.length),
    a = 1,
    r = 0,
    s = 0;
  for (n = 0; n < t.length; n += a) a = 1, (o = t.charCodeAt(n)) < 128 ? e = o : o < 224 ? (e = 64 * (31 & o) + (63 & t
    .charCodeAt(n + 1)), a = 2) : o < 240 ? (e = 4096 * (15 & o) + 64 * (63 & t.charCodeAt(n + 1)) + (63 & t
    .charCodeAt(n + 2)), a = 3) : (a = 4, e = 262144 * (7 & o) + 4096 * (63 & t.charCodeAt(n + 1)) + 64 * (63 & t
    .charCodeAt(n + 2)) + (63 & t.charCodeAt(n + 3)), s = 55296 + ((e -= 65536) >>> 10 & 1023), e = 56320 + (1023 &
    e)), 0 !== s && (i[r++] = 255 & s, i[r++] = s >>> 8, s = 0), i[r++] = e % 256, i[r++] = e >>> 8;
  return i.slice(0, r).toString("ucs2")
}

function of(t) {
  return rm(t, "binary").toString("utf8")
}
var af = "foo bar baz\xe2\x98\x83\xf0\x9f\x8d\xa3",
  rf = am && (of(af) == ef(af) && of || nf(af) == ef(af) && nf) || ef,
  sf = am ? function(t) {
    return rm(t, "utf8").toString("binary")
  } : function(t) {
    for (var e = [], n = 0, o = 0, i = 0; n < t.length;) switch (o = t.charCodeAt(n++), !0) {
      case o < 128:
        e.push(String.fromCharCode(o));
        break;
      case o < 2048:
        e.push(String.fromCharCode(192 + (o >> 6))), e.push(String.fromCharCode(128 + (63 & o)));
        break;
      case o >= 55296 && o < 57344:
        o -= 55296, i = t.charCodeAt(n++) - 56320 + (o << 10), e.push(String.fromCharCode(240 + (i >> 18 & 7))), e
          .push(String.fromCharCode(144 + (i >> 12 & 63))), e.push(String.fromCharCode(128 + (i >> 6 & 63))), e.push(
            String.fromCharCode(128 + (63 & i)));
        break;
      default:
        e.push(String.fromCharCode(224 + (o >> 12))), e.push(String.fromCharCode(128 + (o >> 6 & 63))), e.push(String
          .fromCharCode(128 + (63 & o)))
    }
    return e.join("")
  },
  lf = function() {
    var t = {};
    return function(e, n) {
      var o = e + "|" + (n || "");
      return t[o] ? t[o] : t[o] = new RegExp("<(?:\\w+:)?" + e +
        '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + e + ">", n || "")
    }
  }(),
  cf = function() {
    var t = [
      ["nbsp", " "],
      ["middot", "\xb7"],
      ["quot", '"'],
      ["apos", "'"],
      ["gt", ">"],
      ["lt", "<"],
      ["amp", "&"]
    ].map(function(t) {
      return [new RegExp("&" + t[0] + ";", "ig"), t[1]]
    });
    return function(e) {
      for (var n = e.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<")
          .replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, ""), o = 0; o < t
        .length; ++o) n = n.replace(t[o][0], t[o][1]);
      return n
    }
  }(),
  df = function() {
    var t = {};
    return function(e) {
      return void 0 !== t[e] ? t[e] : t[e] = new RegExp("<(?:vt:)?" + e + ">([\\s\\S]*?)</(?:vt:)?" + e + ">", "g")
    }
  }(),
  uf = /<\/?(?:vt:)?variant>/g,
  pf = /<(?:vt:)([^>]*)>([\s\S]*)</;

function bf(t, e) {
  var n = Gg(t),
    o = t.match(df(n.baseType)) || [],
    i = [];
  if (o.length != n.size) {
    if (e.WTF) throw new Error("unexpected vector length " + o.length + " != " + n.size);
    return i
  }
  return o.forEach(function(t) {
    var e = t.replace(uf, "").match(pf);
    e && i.push({
      v: rf(e[2]),
      t: e[1]
    })
  }), i
}
var mf = /(^\s|\s$|\n)/;

function gf(t, e, n) {
  return "<" + t + (null != n ? function(t) {
    return cg(t).map(function(e) {
      return " " + e + '="' + t[e] + '"'
    }).join("")
  }(n) : "") + (null != e ? (e.match(mf) ? ' xml:space="preserve"' : "") + ">" + e + "</" + t : "/") + ">"
}

function ff(t) {
  if (am && Buffer.isBuffer(t)) return t.toString("utf8");
  if ("string" == typeof t) return t;
  if ("undefined" != typeof Uint8Array && t instanceof Uint8Array) return rf(dm(um(t)));
  throw new Error("Bad input format: expected Buffer or string")
}
var hf = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm,
  vf = "http://schemas.openxmlformats.org/package/2006/content-types",
  yf = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main",
    "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"
  ];
var kf = function(t) {
    for (var e = [], n = 0; n < t[0].length; ++n)
      if (t[0][n])
        for (var o = 0, i = t[0][n].length; o < i; o += 10240) e.push.apply(e, t[0][n].slice(o, o + 10240));
    return e
  },
  xf = am ? function(t) {
    return t[0].length > 0 && Buffer.isBuffer(t[0][0]) ? Buffer.concat(t[0].map(function(t) {
      return Buffer.isBuffer(t) ? t : rm(t)
    })) : kf(t)
  } : kf,
  wf = function(t, e, n) {
    for (var o = [], i = e; i < n; i += 2) o.push(String.fromCharCode(Uf(t, i)));
    return o.join("").replace(bm, "")
  },
  Cf = am ? function(t, e, n) {
    return Buffer.isBuffer(t) ? t.toString("utf16le", e, n).replace(bm, "") : wf(t, e, n)
  } : wf,
  Sf = function(t, e, n) {
    for (var o = [], i = e; i < e + n; ++i) o.push(("0" + t[i].toString(16)).slice(-2));
    return o.join("")
  },
  Tf = am ? function(t, e, n) {
    return Buffer.isBuffer(t) ? t.toString("hex", e, e + n) : Sf(t, e, n)
  } : Sf,
  If = function(t, e, n) {
    for (var o = [], i = e; i < n; i++) o.push(String.fromCharCode(zf(t, i)));
    return o.join("")
  },
  Af = am ? function(t, e, n) {
    return Buffer.isBuffer(t) ? t.toString("utf8", e, n) : If(t, e, n)
  } : If,
  Ef = function(t, e) {
    var n = Hf(t, e);
    return n > 0 ? Af(t, e + 4, e + 4 + n - 1) : ""
  },
  Pf = Ef,
  Of = function(t, e) {
    var n = Hf(t, e);
    return n > 0 ? Af(t, e + 4, e + 4 + n - 1) : ""
  },
  Mf = Of,
  Lf = function(t, e) {
    var n = 2 * Hf(t, e);
    return n > 0 ? Af(t, e + 4, e + 4 + n - 1) : ""
  },
  _f = Lf,
  Bf = function(t, e) {
    var n = Hf(t, e);
    return n > 0 ? Cf(t, e + 4, e + 4 + n) : ""
  },
  Ff = Bf,
  Rf = function(t, e) {
    var n = Hf(t, e);
    return n > 0 ? Af(t, e + 4, e + 4 + n) : ""
  },
  Df = Rf,
  Vf = function(t, e) {
    return function(t, e) {
      for (var n = 1 - 2 * (t[e + 7] >>> 7), o = ((127 & t[e + 7]) << 4) + (t[e + 6] >>> 4 & 15), i = 15 & t[e + 6],
          a = 5; a >= 0; --a) i = 256 * i + t[e + a];
      return 2047 == o ? 0 == i ? n * (1 / 0) : NaN : (0 == o ? o = -1022 : (o -= 1023, i += Math.pow(2, 52)), n *
        Math.pow(2, o - 52) * i)
    }(t, e)
  },
  Nf = Vf,
  $f = function(t) {
    return Array.isArray(t) || "undefined" != typeof Uint8Array && t instanceof Uint8Array
  };
am && (Pf = function(t, e) {
  if (!Buffer.isBuffer(t)) return Ef(t, e);
  var n = t.readUInt32LE(e);
  return n > 0 ? t.toString("utf8", e + 4, e + 4 + n - 1) : ""
}, Mf = function(t, e) {
  if (!Buffer.isBuffer(t)) return Of(t, e);
  var n = t.readUInt32LE(e);
  return n > 0 ? t.toString("utf8", e + 4, e + 4 + n - 1) : ""
}, _f = function(t, e) {
  if (!Buffer.isBuffer(t)) return Lf(t, e);
  var n = 2 * t.readUInt32LE(e);
  return t.toString("utf16le", e + 4, e + 4 + n - 1)
}, Ff = function(t, e) {
  if (!Buffer.isBuffer(t)) return Bf(t, e);
  var n = t.readUInt32LE(e);
  return t.toString("utf16le", e + 4, e + 4 + n)
}, Df = function(t, e) {
  if (!Buffer.isBuffer(t)) return Rf(t, e);
  var n = t.readUInt32LE(e);
  return t.toString("utf8", e + 4, e + 4 + n)
}, Nf = function(t, e) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(e) : Vf(t, e)
}, $f = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || "undefined" != typeof Uint8Array && t instanceof Uint8Array
});
var zf = function(t, e) {
    return t[e]
  },
  Uf = function(t, e) {
    return 256 * t[e + 1] + t[e]
  },
  jf = function(t, e) {
    var n = 256 * t[e + 1] + t[e];
    return n < 32768 ? n : -1 * (65535 - n + 1)
  },
  Hf = function(t, e) {
    return t[e + 3] * (1 << 24) + (t[e + 2] << 16) + (t[e + 1] << 8) + t[e]
  },
  Gf = function(t, e) {
    return t[e + 3] << 24 | t[e + 2] << 16 | t[e + 1] << 8 | t[e]
  },
  Kf = function(t, e) {
    return t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3]
  };

function Wf(t, e) {
  var n, o, i, a, r, s, l = "",
    c = [];
  switch (e) {
    case "dbcs":
      if (s = this.l, am && Buffer.isBuffer(this)) l = this.slice(this.l, this.l + 2 * t).toString("utf16le");
      else
        for (r = 0; r < t; ++r) l += String.fromCharCode(Uf(this, s)), s += 2;
      t *= 2;
      break;
    case "utf8":
      l = Af(this, this.l, this.l + t);
      break;
    case "utf16le":
      t *= 2, l = Cf(this, this.l, this.l + t);
      break;
    case "wstr":
      return Wf.call(this, t, "dbcs");
    case "lpstr-ansi":
      l = Pf(this, this.l), t = 4 + Hf(this, this.l);
      break;
    case "lpstr-cp":
      l = Mf(this, this.l), t = 4 + Hf(this, this.l);
      break;
    case "lpwstr":
      l = _f(this, this.l), t = 4 + 2 * Hf(this, this.l);
      break;
    case "lpp4":
      t = 4 + Hf(this, this.l), l = Ff(this, this.l), 2 & t && (t += 2);
      break;
    case "8lpp4":
      t = 4 + Hf(this, this.l), l = Df(this, this.l), 3 & t && (t += 4 - (3 & t));
      break;
    case "cstr":
      for (t = 0, l = ""; 0 !== (i = zf(this, this.l + t++));) c.push(tm(i));
      l = c.join("");
      break;
    case "_wstr":
      for (t = 0, l = ""; 0 !== (i = Uf(this, this.l + t));) c.push(tm(i)), t += 2;
      t += 2, l = c.join("");
      break;
    case "dbcs-cont":
      for (l = "", s = this.l, r = 0; r < t; ++r) {
        if (this.lens && -1 !== this.lens.indexOf(s)) return i = zf(this, s), this.l = s + 1, a = Wf.call(this, t - r,
          i ? "dbcs-cont" : "sbcs-cont"), c.join("") + a;
        c.push(tm(Uf(this, s))), s += 2
      }
      l = c.join(""), t *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (l = "", s = this.l, r = 0; r != t; ++r) {
        if (this.lens && -1 !== this.lens.indexOf(s)) return i = zf(this, s), this.l = s + 1, a = Wf.call(this, t - r,
          i ? "dbcs-cont" : "sbcs-cont"), c.join("") + a;
        c.push(tm(zf(this, s))), s += 1
      }
      l = c.join("");
      break;
    default:
      switch (t) {
        case 1:
          return n = zf(this, this.l), this.l++, n;
        case 2:
          return n = ("i" === e ? jf : Uf)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return "i" !== e && 128 & this[this.l + 3] ? (o = Hf(this, this.l), this.l += 4, o) : (n = (t > 0 ? Gf : Kf)(
            this, this.l), this.l += 4, n);
        case 8:
        case -8:
          if ("f" === e) return o = 8 == t ? Nf(this, this.l) : Nf([this[this.l + 7], this[this.l + 6], this[this.l +
            5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]
          ], 0), this.l += 8, o;
          t = 8;
        case 16:
          l = Tf(this, this.l, t)
      }
  }
  return this.l += t, l
}
var qf = function(t, e, n) {
    t[n] = 255 & e, t[n + 1] = e >>> 8 & 255, t[n + 2] = e >>> 16 & 255, t[n + 3] = e >>> 24 & 255
  },
  Yf = function(t, e, n) {
    t[n] = 255 & e, t[n + 1] = e >> 8 & 255, t[n + 2] = e >> 16 & 255, t[n + 3] = e >> 24 & 255
  },
  Xf = function(t, e, n) {
    t[n] = 255 & e, t[n + 1] = e >>> 8 & 255
  };

function Jf(t, e, n) {
  var o = 0,
    i = 0;
  if ("dbcs" === n) {
    for (i = 0; i != e.length; ++i) Xf(this, e.charCodeAt(i), this.l + 2 * i);
    o = 2 * e.length
  } else if ("sbcs" === n) {
    for (e = e.replace(/[^\x00-\x7F]/g, "_"), i = 0; i != e.length; ++i) this[this.l + i] = 255 & e.charCodeAt(i);
    o = e.length
  } else {
    if ("hex" === n) {
      for (; i < t; ++i) this[this.l++] = parseInt(e.slice(2 * i, 2 * i + 2), 16) || 0;
      return this
    }
    if ("utf16le" === n) {
      var a = Math.min(this.l + t, this.length);
      for (i = 0; i < Math.min(e.length, t); ++i) {
        var r = e.charCodeAt(i);
        this[this.l++] = 255 & r, this[this.l++] = r >> 8
      }
      for (; this.l < a;) this[this.l++] = 0;
      return this
    }
    switch (t) {
      case 1:
        o = 1, this[this.l] = 255 & e;
        break;
      case 2:
        o = 2, this[this.l] = 255 & e, e >>>= 8, this[this.l + 1] = 255 & e;
        break;
      case 3:
        o = 3, this[this.l] = 255 & e, e >>>= 8, this[this.l + 1] = 255 & e, e >>>= 8, this[this.l + 2] = 255 & e;
        break;
      case 4:
        o = 4, qf(this, e, this.l);
        break;
      case 8:
        if (o = 8, "f" === n) {
          ! function(t, e, n) {
            var o = (e < 0 || 1 / e == -1 / 0 ? 1 : 0) << 7,
              i = 0,
              a = 0,
              r = o ? -e : e;
            isFinite(r) ? 0 == r ? i = a = 0 : (i = Math.floor(Math.log(r) / Math.LN2), a = r * Math.pow(2, 52 - i),
              i <= -1023 && (!isFinite(a) || a < Math.pow(2, 52)) ? i = -1022 : (a -= Math.pow(2, 52), i += 1023)) : (
              i = 2047, a = isNaN(e) ? 26985 : 0);
            for (var s = 0; s <= 5; ++s, a /= 256) t[n + s] = 255 & a;
            t[n + 6] = (15 & i) << 4 | 15 & a, t[n + 7] = i >> 4 | o
          }(this, e, this.l);
          break
        }
      case 16:
        break;
      case -4:
        o = 4, Yf(this, e, this.l)
    }
  }
  return this.l += o, this
}

function Zf(t, e) {
  var n = Tf(this, this.l, t.length >> 1);
  if (n !== t) throw new Error(e + "Expected " + t + " saw " + n);
  this.l += t.length >> 1
}

function Qf(t, e) {
  t.l = e, t.read_shift = Wf, t.chk = Zf, t.write_shift = Jf
}

function th(t, e) {
  t.l += e
}

function eh(t) {
  var e = sm(t);
  return Qf(e, 0), e
}

function nh(t, e, n) {
  if (t) {
    var o, i, a;
    Qf(t, t.l || 0);
    for (var r = t.length, s = 0, l = 0; t.l < r;) {
      128 & (s = t.read_shift(1)) && (s = (127 & s) + ((127 & t.read_shift(1)) << 7));
      var c = cw[s] || cw[65535];
      for (a = 127 & (o = t.read_shift(1)), i = 1; i < 4 && 128 & o; ++i) a += (127 & (o = t.read_shift(1))) << 7 * i;
      l = t.l + a;
      var d = c.f && c.f(t, a, n);
      if (t.l = l, e(d, c, s)) return
    }
  }
}

function oh() {
  var t = [],
    e = am ? 256 : 2048,
    n = function(t) {
      var e = eh(t);
      return Qf(e, 0), e
    },
    o = n(e),
    i = function() {
      o && (o.length > o.l && ((o = o.slice(0, o.l)).l = o.length), o.length > 0 && t.push(o), o = null)
    },
    a = function(t) {
      return o && t < o.length - o.l ? o : (i(), o = n(Math.max(t + 1, e)))
    };
  return {
    next: a,
    push: function(t) {
      i(), null == (o = t).l && (o.l = o.length), a(e)
    },
    end: function() {
      return i(), pm(t)
    },
    _bufs: t
  }
}

function ih(t, e, n) {
  var o = Cg(t);
  if (e.s ? (o.cRel && (o.c += e.s.c), o.rRel && (o.r += e.s.r)) : (o.cRel && (o.c += e.c), o.rRel && (o.r += e.r)), !
    n || n.biff < 12) {
    for (; o.c >= 256;) o.c -= 256;
    for (; o.r >= 65536;) o.r -= 65536
  }
  return o
}

function ah(t, e, n) {
  var o = Cg(t);
  return o.s = ih(o.s, e.s, n), o.e = ih(o.e, e.s, n), o
}

function rh(t, e) {
  if (t.cRel && t.c < 0)
    for (t = Cg(t); t.c < 0;) t.c += e > 8 ? 16384 : 256;
  if (t.rRel && t.r < 0)
    for (t = Cg(t); t.r < 0;) t.r += e > 8 ? 1048576 : e > 5 ? 65536 : 16384;
  var n = bh(t);
  return t.cRel || null == t.cRel || (n = n.replace(/^([A-Z])/, "$$$1")), t.rRel || null == t.rRel || (n = function(t) {
    return t.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
  }(n)), n
}

function sh(t, e) {
  return 0 != t.s.r || t.s.rRel || t.e.r != (e.biff >= 12 ? 1048575 : e.biff >= 8 ? 65536 : 16384) || t.e.rRel ? 0 != t
    .s.c || t.s.cRel || t.e.c != (e.biff >= 12 ? 16383 : 255) || t.e.cRel ? rh(t.s, e.biff) + ":" + rh(t.e, e.biff) : (t
      .s.rRel ? "" : "$") + ch(t.s.r) + ":" + (t.e.rRel ? "" : "$") + ch(t.e.r) : (t.s.cRel ? "" : "$") + uh(t.s.c) +
    ":" + (t.e.cRel ? "" : "$") + uh(t.e.c)
}

function lh(t) {
  return parseInt(t.replace(/\$(\d+)$/, "$1"), 10) - 1
}

function ch(t) {
  return "" + (t + 1)
}

function dh(t) {
  for (var e = t.replace(/^\$([A-Z])/, "$1"), n = 0, o = 0; o !== e.length; ++o) n = 26 * n + e.charCodeAt(o) - 64;
  return n - 1
}

function uh(t) {
  if (t < 0) throw new Error("invalid column " + t);
  var e = "";
  for (++t; t; t = Math.floor((t - 1) / 26)) e = String.fromCharCode((t - 1) % 26 + 65) + e;
  return e
}

function ph(t) {
  for (var e = 0, n = 0, o = 0; o < t.length; ++o) {
    var i = t.charCodeAt(o);
    i >= 48 && i <= 57 ? e = 10 * e + (i - 48) : i >= 65 && i <= 90 && (n = 26 * n + (i - 64))
  }
  return {
    c: n - 1,
    r: e - 1
  }
}

function bh(t) {
  for (var e = t.c + 1, n = ""; e; e = (e - 1) / 26 | 0) n = String.fromCharCode((e - 1) % 26 + 65) + n;
  return n + (t.r + 1)
}

function mh(t) {
  var e = t.indexOf(":");
  return -1 == e ? {
    s: ph(t),
    e: ph(t)
  } : {
    s: ph(t.slice(0, e)),
    e: ph(t.slice(e + 1))
  }
}

function gh(t, e) {
  return void 0 === e || "number" == typeof e ? gh(t.s, t.e) : ("string" != typeof t && (t = bh(t)), "string" !=
    typeof e && (e = bh(e)), t == e ? t : t + ":" + e)
}

function fh(t) {
  var e = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: 0
      }
    },
    n = 0,
    o = 0,
    i = 0,
    a = t.length;
  for (n = 0; o < a && !((i = t.charCodeAt(o) - 64) < 1 || i > 26); ++o) n = 26 * n + i;
  for (e.s.c = --n, n = 0; o < a && !((i = t.charCodeAt(o) - 48) < 0 || i > 9); ++o) n = 10 * n + i;
  if (e.s.r = --n, o === a || 10 != i) return e.e.c = e.s.c, e.e.r = e.s.r, e;
  for (++o, n = 0; o != a && !((i = t.charCodeAt(o) - 64) < 1 || i > 26); ++o) n = 26 * n + i;
  for (e.e.c = --n, n = 0; o != a && !((i = t.charCodeAt(o) - 48) < 0 || i > 9); ++o) n = 10 * n + i;
  return e.e.r = --n, e
}

function hh(t, e) {
  var n = "d" == t.t && e instanceof Date;
  if (null != t.z) try {
    return t.w = ng(t.z, n ? pg(e) : e)
  } catch (aD) {}
  try {
    return t.w = ng((t.XF || {}).numFmtId || (n ? 14 : 0), n ? pg(e) : e)
  } catch (aD) {
    return "" + e
  }
}

function vh(t, e, n) {
  return null == t || null == t.t || "z" == t.t ? "" : void 0 !== t.w ? t.w : ("d" == t.t && !t.z && n && n.dateNF && (t
    .z = n.dateNF), "e" == t.t ? Gh[t.v] || t.v : hh(t, null == e ? t.v : e))
}

function yh(t, e) {
  var n = e && e.sheet ? e.sheet : "Sheet1",
    o = {};
  return o[n] = t, {
    SheetNames: [n],
    Sheets: o
  }
}

function kh(t, e, n) {
  var o = n || {},
    i = t ? Array.isArray(t) : o.dense,
    a = t || (i ? [] : {}),
    r = 0,
    s = 0;
  if (a && null != o.origin) {
    if ("number" == typeof o.origin) r = o.origin;
    else {
      var l = "string" == typeof o.origin ? ph(o.origin) : o.origin;
      r = l.r, s = l.c
    }
    a["!ref"] || (a["!ref"] = "A1:A1")
  }
  var c = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  };
  if (a["!ref"]) {
    var d = fh(a["!ref"]);
    c.s.c = d.s.c, c.s.r = d.s.r, c.e.c = Math.max(c.e.c, d.e.c), c.e.r = Math.max(c.e.r, d.e.r), -1 == r && (c.e.r =
      r = d.e.r + 1)
  }
  for (var u = 0; u != e.length; ++u)
    if (e[u]) {
      if (!Array.isArray(e[u])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var p = 0; p != e[u].length; ++p)
        if (void 0 !== e[u][p]) {
          var b = {
              v: e[u][p]
            },
            m = r + u,
            g = s + p;
          if (c.s.r > m && (c.s.r = m), c.s.c > g && (c.s.c = g), c.e.r < m && (c.e.r = m), c.e.c < g && (c.e.c = g), !
            e[u][p] || "object" != typeof e[u][p] || Array.isArray(e[u][p]) || e[u][p] instanceof Date)
            if (Array.isArray(b.v) && (b.f = e[u][p][1], b.v = b.v[0]), null === b.v)
              if (b.f) b.t = "n";
              else if (o.nullError) b.t = "e", b.v = 0;
          else {
            if (!o.sheetStubs) continue;
            b.t = "z"
          } else "number" == typeof b.v ? b.t = "n" : "boolean" == typeof b.v ? b.t = "b" : b.v instanceof Date ? (b.z =
            o.dateNF || Sm[14], o.cellDates ? (b.t = "d", b.w = ng(b.z, pg(b.v))) : (b.t = "n", b.v = pg(b.v), b.w =
              ng(b.z, b.v))) : b.t = "s";
          else b = e[u][p];
          if (i) a[m] || (a[m] = []), a[m][g] && a[m][g].z && (b.z = a[m][g].z), a[m][g] = b;
          else {
            var f = bh({
              c: g,
              r: m
            });
            a[f] && a[f].z && (b.z = a[f].z), a[f] = b
          }
        }
    } return c.s.c < 1e7 && (a["!ref"] = gh(c)), a
}

function xh(t, e) {
  return kh(null, t, e)
}

function wh(t) {
  var e = t.read_shift(4);
  return 0 === e ? "" : t.read_shift(e, "dbcs")
}

function Ch(t) {
  return {
    ich: t.read_shift(2),
    ifnt: t.read_shift(2)
  }
}

function Sh(t, e) {
  var n = t.l,
    o = t.read_shift(1),
    i = wh(t),
    a = [],
    r = {
      t: i,
      h: i
    };
  if (1 & o) {
    for (var s = t.read_shift(4), l = 0; l != s; ++l) a.push(Ch(t));
    r.r = a
  } else r.r = [{
    ich: 0,
    ifnt: 0
  }];
  return t.l = n + e, r
}
var Th = Sh;

function Ih(t) {
  var e = t.read_shift(4),
    n = t.read_shift(2);
  return n += t.read_shift(1) << 16, t.l++, {
    c: e,
    iStyleRef: n
  }
}

function Ah(t) {
  var e = t.read_shift(2);
  return e += t.read_shift(1) << 16, t.l++, {
    c: -1,
    iStyleRef: e
  }
}
var Eh = wh;

function Ph(t) {
  var e = t.read_shift(4);
  return 0 === e || 4294967295 === e ? "" : t.read_shift(e, "dbcs")
}
var Oh = wh,
  Mh = Ph;

function Lh(t) {
  var e = t.slice(t.l, t.l + 4),
    n = 1 & e[0],
    o = 2 & e[0];
  t.l += 4;
  var i = 0 === o ? Nf([0, 0, 0, 0, 252 & e[0], e[1], e[2], e[3]], 0) : Gf(e, 0) >> 2;
  return n ? i / 100 : i
}

function _h(t) {
  var e = {
    s: {},
    e: {}
  };
  return e.s.r = t.read_shift(4), e.e.r = t.read_shift(4), e.s.c = t.read_shift(4), e.e.c = t.read_shift(4), e
}
var Bh = _h;

function Fh(t) {
  if (t.length - t.l < 8) throw "XLS Xnum Buffer underflow";
  return t.read_shift(8, "f")
}

function Rh(t, e) {
  var n = t.read_shift(4);
  switch (n) {
    case 0:
      return "";
    case 4294967295:
    case 4294967294:
      return {
        2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE"
      } [t.read_shift(4)] || ""
  }
  if (n > 400) throw new Error("Unsupported Clipboard: " + n.toString(16));
  return t.l -= 4, t.read_shift(0, 1 == e ? "lpstr" : "lpwstr")
}
var Dh = 80,
  Vh = [Dh, 81],
  Nh = {
    1: {
      n: "CodePage",
      t: 2
    },
    2: {
      n: "Category",
      t: Dh
    },
    3: {
      n: "PresentationFormat",
      t: Dh
    },
    4: {
      n: "ByteCount",
      t: 3
    },
    5: {
      n: "LineCount",
      t: 3
    },
    6: {
      n: "ParagraphCount",
      t: 3
    },
    7: {
      n: "SlideCount",
      t: 3
    },
    8: {
      n: "NoteCount",
      t: 3
    },
    9: {
      n: "HiddenCount",
      t: 3
    },
    10: {
      n: "MultimediaClipCount",
      t: 3
    },
    11: {
      n: "ScaleCrop",
      t: 11
    },
    12: {
      n: "HeadingPairs",
      t: 4108
    },
    13: {
      n: "TitlesOfParts",
      t: 4126
    },
    14: {
      n: "Manager",
      t: Dh
    },
    15: {
      n: "Company",
      t: Dh
    },
    16: {
      n: "LinksUpToDate",
      t: 11
    },
    17: {
      n: "CharacterCount",
      t: 3
    },
    19: {
      n: "SharedDoc",
      t: 11
    },
    22: {
      n: "HyperlinksChanged",
      t: 11
    },
    23: {
      n: "AppVersion",
      t: 3,
      p: "version"
    },
    24: {
      n: "DigSig",
      t: 65
    },
    26: {
      n: "ContentType",
      t: Dh
    },
    27: {
      n: "ContentStatus",
      t: Dh
    },
    28: {
      n: "Language",
      t: Dh
    },
    29: {
      n: "Version",
      t: Dh
    },
    255: {},
    2147483648: {
      n: "Locale",
      t: 19
    },
    2147483651: {
      n: "Behavior",
      t: 19
    },
    1919054434: {}
  },
  $h = {
    1: {
      n: "CodePage",
      t: 2
    },
    2: {
      n: "Title",
      t: Dh
    },
    3: {
      n: "Subject",
      t: Dh
    },
    4: {
      n: "Author",
      t: Dh
    },
    5: {
      n: "Keywords",
      t: Dh
    },
    6: {
      n: "Comments",
      t: Dh
    },
    7: {
      n: "Template",
      t: Dh
    },
    8: {
      n: "LastAuthor",
      t: Dh
    },
    9: {
      n: "RevNumber",
      t: Dh
    },
    10: {
      n: "EditTime",
      t: 64
    },
    11: {
      n: "LastPrinted",
      t: 64
    },
    12: {
      n: "CreatedDate",
      t: 64
    },
    13: {
      n: "ModifiedDate",
      t: 64
    },
    14: {
      n: "PageCount",
      t: 3
    },
    15: {
      n: "WordCount",
      t: 3
    },
    16: {
      n: "CharCount",
      t: 3
    },
    17: {
      n: "Thumbnail",
      t: 71
    },
    18: {
      n: "Application",
      t: Dh
    },
    19: {
      n: "DocSecurity",
      t: 3
    },
    255: {},
    2147483648: {
      n: "Locale",
      t: 19
    },
    2147483651: {
      n: "Behavior",
      t: 19
    },
    1919054434: {}
  },
  zh = {
    1: "US",
    2: "CA",
    3: "",
    7: "RU",
    20: "EG",
    30: "GR",
    31: "NL",
    32: "BE",
    33: "FR",
    34: "ES",
    36: "HU",
    39: "IT",
    41: "CH",
    43: "AT",
    44: "GB",
    45: "DK",
    46: "SE",
    47: "NO",
    48: "PL",
    49: "DE",
    52: "MX",
    55: "BR",
    61: "AU",
    64: "NZ",
    66: "TH",
    81: "JP",
    82: "KR",
    84: "VN",
    86: "CN",
    90: "TR",
    105: "JS",
    213: "DZ",
    216: "MA",
    218: "LY",
    351: "PT",
    354: "IS",
    358: "FI",
    420: "CZ",
    886: "TW",
    961: "LB",
    962: "JO",
    963: "SY",
    964: "IQ",
    965: "KW",
    966: "SA",
    971: "AE",
    972: "IL",
    974: "QA",
    981: "IR",
    65535: "US"
  },
  Uh = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp",
    "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis",
    "gray125", "gray0625"
  ];

function jh(t) {
  return t.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, 255 & t]
  })
}
var Hh = Cg(jh([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255,
    16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166,
    16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896,
    255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232,
    16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545,
    3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ])),
  Gh = {
    0: "#NULL!",
    7: "#DIV/0!",
    15: "#VALUE!",
    23: "#REF!",
    29: "#NAME?",
    36: "#NUM!",
    42: "#N/A",
    43: "#GETTING_DATA",
    255: "#WTF?"
  },
  Kh = {
    "#NULL!": 0,
    "#DIV/0!": 7,
    "#VALUE!": 15,
    "#REF!": 23,
    "#NAME?": 29,
    "#NUM!": 36,
    "#N/A": 42,
    "#GETTING_DATA": 43,
    "#WTF?": 255
  },
  Wh = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
    "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
    "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
    "application/vnd.ms-excel.worksheet": "sheets",
    "application/vnd.ms-excel.binIndexWs": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
    "application/vnd.ms-excel.chartsheet": "charts",
    "application/vnd.ms-excel.macrosheet+xml": "macros",
    "application/vnd.ms-excel.macrosheet": "macros",
    "application/vnd.ms-excel.intlmacrosheet": "TODO",
    "application/vnd.ms-excel.binIndexMs": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
    "application/vnd.ms-excel.dialogsheet": "dialogs",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
    "application/vnd.ms-excel.sharedStrings": "strs",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
    "application/vnd.ms-excel.styles": "styles",
    "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
    "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
    "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
    "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
    "application/vnd.ms-excel.comments": "comments",
    "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
    "application/vnd.ms-excel.person+xml": "people",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
    "application/vnd.ms-excel.sheetMetadata": "metadata",
    "application/vnd.ms-excel.pivotTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
    "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
    "application/vnd.ms-office.chartstyle+xml": "TODO",
    "application/vnd.ms-office.chartex+xml": "TODO",
    "application/vnd.ms-excel.calcChain": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
    "application/vnd.ms-office.activeX": "TODO",
    "application/vnd.ms-office.activeX+xml": "TODO",
    "application/vnd.ms-excel.attachedToolbars": "TODO",
    "application/vnd.ms-excel.connections": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
    "application/vnd.ms-excel.externalLink": "links",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
    "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
    "application/vnd.ms-excel.pivotCacheRecords": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
    "application/vnd.ms-excel.queryTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
    "application/vnd.ms-excel.userNames": "TODO",
    "application/vnd.ms-excel.revisionHeaders": "TODO",
    "application/vnd.ms-excel.revisionLog": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
    "application/vnd.ms-excel.tableSingleCells": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
    "application/vnd.ms-excel.slicer": "TODO",
    "application/vnd.ms-excel.slicerCache": "TODO",
    "application/vnd.ms-excel.slicer+xml": "TODO",
    "application/vnd.ms-excel.slicerCache+xml": "TODO",
    "application/vnd.ms-excel.wsSortMap": "TODO",
    "application/vnd.ms-excel.table": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
    "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
    "application/vnd.ms-excel.Timeline+xml": "TODO",
    "application/vnd.ms-excel.TimelineCache+xml": "TODO",
    "application/vnd.ms-office.vbaProject": "vba",
    "application/vnd.ms-office.vbaProjectSignature": "TODO",
    "application/vnd.ms-office.volatileDependencies": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
    "application/vnd.ms-excel.controlproperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.model+data": "TODO",
    "application/vnd.ms-excel.Survey+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
    "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
    "application/vnd.openxmlformats-package.relationships+xml": "rels",
    "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
    "image/png": "TODO",
    sheet: "js"
  };
var qh = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};

function Yh(t) {
  var e = t.lastIndexOf("/");
  return t.slice(0, e + 1) + "_rels/" + t.slice(e + 1) + ".rels"
}

function Xh(t, e) {
  var n = {
    "!id": {}
  };
  if (!t) return n;
  "/" !== e.charAt(0) && (e = "/" + e);
  var o = {};
  return (t.match(Ug) || []).forEach(function(t) {
    var i = Gg(t);
    if ("<Relationship" === i[0]) {
      var a = {};
      a.Type = i.Type, a.Target = i.Target, a.Id = i.Id, i.TargetMode && (a.TargetMode = i.TargetMode);
      var r = "External" === i.TargetMode ? i.Target : Vg(i.Target, e);
      n[r] = a, o[i.Id] = a
    }
  }), n["!id"] = o, n
}
var Jh = [
    ["cp:category", "Category"],
    ["cp:contentStatus", "ContentStatus"],
    ["cp:keywords", "Keywords"],
    ["cp:lastModifiedBy", "LastAuthor"],
    ["cp:lastPrinted", "LastPrinted"],
    ["cp:revision", "RevNumber"],
    ["cp:version", "Version"],
    ["dc:creator", "Author"],
    ["dc:description", "Comments"],
    ["dc:identifier", "Identifier"],
    ["dc:language", "Language"],
    ["dc:subject", "Subject"],
    ["dc:title", "Title"],
    ["dcterms:created", "CreatedDate", "date"],
    ["dcterms:modified", "ModifiedDate", "date"]
  ],
  Zh = function() {
    for (var t = new Array(Jh.length), e = 0; e < Jh.length; ++e) {
      var n = Jh[e],
        o = "(?:" + n[0].slice(0, n[0].indexOf(":")) + ":)" + n[0].slice(n[0].indexOf(":") + 1);
      t[e] = new RegExp("<" + o + "[^>]*>([\\s\\S]*?)</" + o + ">")
    }
    return t
  }();

function Qh(t) {
  var e = {};
  t = rf(t);
  for (var n = 0; n < Jh.length; ++n) {
    var o = Jh[n],
      i = t.match(Zh[n]);
    null != i && i.length > 0 && (e[o[1]] = Yg(i[1])), "date" === o[2] && e[o[1]] && (e[o[1]] = xg(e[o[1]]))
  }
  return e
}
var tv = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
];

function ev(t, e, n, o) {
  var i = [];
  if ("string" == typeof t) i = bf(t, o);
  else
    for (var a = 0; a < t.length; ++a) i = i.concat(t[a].map(function(t) {
      return {
        v: t
      }
    }));
  var r = "string" == typeof e ? bf(e, o).map(function(t) {
      return t.v
    }) : e,
    s = 0,
    l = 0;
  if (r.length > 0)
    for (var c = 0; c !== i.length; c += 2) {
      switch (l = +i[c + 1].v, i[c].v) {
        case "Worksheets":
        case "\u5de5\u4f5c\u8868":
        case "\u041b\u0438\u0441\u0442\u044b":
        case "\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0639\u0645\u0644":
        case "\u30ef\u30fc\u30af\u30b7\u30fc\u30c8":
        case "\u05d2\u05dc\u05d9\u05d5\u05e0\u05d5\u05ea \u05e2\u05d1\u05d5\u05d3\u05d4":
        case "Arbeitsbl\xe4tter":
        case "\xc7al\u0131\u015fma Sayfalar\u0131":
        case "Feuilles de calcul":
        case "Fogli di lavoro":
        case "Folhas de c\xe1lculo":
        case "Planilhas":
        case "Regneark":
        case "Hojas de c\xe1lculo":
        case "Werkbladen":
          n.Worksheets = l, n.SheetNames = r.slice(s, s + l);
          break;
        case "Named Ranges":
        case "Rangos con nombre":
        case "\u540d\u524d\u4ed8\u304d\u4e00\u89a7":
        case "Benannte Bereiche":
        case "Navngivne omr\xe5der":
          n.NamedRanges = l, n.DefinedNames = r.slice(s, s + l);
          break;
        case "Charts":
        case "Diagramme":
          n.Chartsheets = l, n.ChartNames = r.slice(s, s + l)
      }
      s += l
    }
}
var nv = /<[^>]+>[^<]*/g;
var ov, iv = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  Category: "Category",
  Manager: "Manager",
  Company: "Company",
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  Identifier: "Identifier",
  Language: "Language"
};

function av(t, e, n) {
  ov || (ov = dg(iv)), t[e = ov[e] || e] = n
}

function rv(t) {
  var e = t.read_shift(4),
    n = t.read_shift(4);
  return new Date(1e3 * (n / 1e7 * Math.pow(2, 32) + e / 1e7 - 11644473600)).toISOString().replace(/\.000/, "")
}

function sv(t, e, n) {
  var o = t.l,
    i = t.read_shift(0, "lpstr-cp");
  if (n)
    for (; t.l - o & 3;) ++t.l;
  return i
}

function lv(t, e, n) {
  return t.read_shift(0, "lpwstr")
}

function cv(t, e, n) {
  return 31 === e ? lv(t) : sv(t, 0, n)
}

function dv(t, e, n) {
  return cv(t, e, !1 === n ? 0 : 4)
}

function uv(t) {
  var e = t.l,
    n = mv(t, 81);
  return 0 == t[t.l] && 0 == t[t.l + 1] && t.l - e & 2 && (t.l += 2), [n, mv(t, 3)]
}

function pv(t, e) {
  for (var n = t.read_shift(4), o = {}, i = 0; i != n; ++i) {
    var a = t.read_shift(4),
      r = t.read_shift(4);
    o[a] = t.read_shift(r, 1200 === e ? "utf16le" : "utf8").replace(bm, "").replace(mm, "!"), 1200 === e && r % 2 && (t
      .l += 2)
  }
  return 3 & t.l && (t.l = t.l >> 3 << 2), o
}

function bv(t) {
  var e = t.read_shift(4),
    n = t.slice(t.l, t.l + e);
  return t.l += e, (3 & e) > 0 && (t.l += 4 - (3 & e) & 3), n
}

function mv(t, e, n) {
  var o, i = t.read_shift(2),
    a = n || {};
  if (t.l += 2, 12 !== e && i !== e && -1 === Vh.indexOf(e) && (4126 != (65534 & e) || 4126 != (65534 & i)))
  throw new Error("Expected type " + e + " saw " + i);
  switch (12 === e ? i : e) {
    case 2:
      return o = t.read_shift(2, "i"), a.raw || (t.l += 2), o;
    case 3:
      return o = t.read_shift(4, "i");
    case 11:
      return 0 !== t.read_shift(4);
    case 19:
      return o = t.read_shift(4);
    case 30:
      return sv(t, 0, 4).replace(bm, "");
    case 31:
      return lv(t);
    case 64:
      return rv(t);
    case 65:
      return bv(t);
    case 71:
      return function(t) {
        var e = {};
        return e.Size = t.read_shift(4), t.l += e.Size + 3 - (e.Size - 1) % 4, e
      }(t);
    case 80:
      return dv(t, i, !a.raw).replace(bm, "");
    case 81:
      return function(t, e) {
        if (!e) throw new Error("VtUnalignedString must have positive length");
        return cv(t, e, 0)
      }(t, i).replace(bm, "");
    case 4108:
      return function(t) {
        for (var e = t.read_shift(4), n = [], o = 0; o < e / 2; ++o) n.push(uv(t));
        return n
      }(t);
    case 4126:
    case 4127:
      return 4127 == i ? function(t) {
        for (var e = t.read_shift(4), n = [], o = 0; o != e; ++o) {
          var i = t.l;
          n[o] = t.read_shift(0, "lpwstr").replace(bm, ""), t.l - i & 2 && (t.l += 2)
        }
        return n
      }(t) : function(t) {
        for (var e = t.read_shift(4), n = [], o = 0; o != e; ++o) n[o] = t.read_shift(0, "lpstr-cp").replace(bm, "");
        return n
      }(t);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + i)
  }
}

function gv(t, e) {
  var n = t.l,
    o = t.read_shift(4),
    i = t.read_shift(4),
    a = [],
    r = 0,
    s = 0,
    l = -1,
    c = {};
  for (r = 0; r != i; ++r) {
    var d = t.read_shift(4),
      u = t.read_shift(4);
    a[r] = [d, u + n]
  }
  a.sort(function(t, e) {
    return t[1] - e[1]
  });
  var p = {};
  for (r = 0; r != i; ++r) {
    if (t.l !== a[r][1]) {
      var b = !0;
      if (r > 0 && e) switch (e[a[r - 1][0]].t) {
        case 2:
          t.l + 2 === a[r][1] && (t.l += 2, b = !1);
          break;
        case 80:
        case 4108:
          t.l <= a[r][1] && (t.l = a[r][1], b = !1)
      }
      if ((!e || 0 == r) && t.l <= a[r][1] && (b = !1, t.l = a[r][1]), b) throw new Error(
        "Read Error: Expected address " + a[r][1] + " at " + t.l + " :" + r)
    }
    if (e) {
      var m = e[a[r][0]];
      if (p[m.n] = mv(t, m.t, {
          raw: !0
        }), "version" === m.p && (p[m.n] = String(p[m.n] >> 16) + "." + ("0000" + String(65535 & p[m.n])).slice(-4)),
        "CodePage" == m.n) switch (p[m.n]) {
        case 0:
          p[m.n] = 1252;
        case 874:
        case 932:
        case 936:
        case 949:
        case 950:
        case 1250:
        case 1251:
        case 1253:
        case 1254:
        case 1255:
        case 1256:
        case 1257:
        case 1258:
        case 1e4:
        case 1200:
        case 1201:
        case 1252:
        case 65e3:
        case -536:
        case 65001:
        case -535:
          qb(s = p[m.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + p[m.n])
      }
    } else if (1 === a[r][0]) {
      if (s = p.CodePage = mv(t, 2), qb(s), -1 !== l) {
        var g = t.l;
        t.l = a[l][1], c = pv(t, s), t.l = g
      }
    } else if (0 === a[r][0]) {
      if (0 === s) {
        l = r, t.l = a[r + 1][1];
        continue
      }
      c = pv(t, s)
    } else {
      var f, h = c[a[r][0]];
      switch (t[t.l]) {
        case 65:
          t.l += 4, f = bv(t);
          break;
        case 30:
        case 31:
          t.l += 4, f = dv(t, t[t.l - 4]).replace(/\u0000+$/, "");
          break;
        case 3:
          t.l += 4, f = t.read_shift(4, "i");
          break;
        case 19:
          t.l += 4, f = t.read_shift(4);
          break;
        case 5:
          t.l += 4, f = t.read_shift(8, "f");
          break;
        case 11:
          t.l += 4, f = vv(t, 4);
          break;
        case 64:
          t.l += 4, f = xg(rv(t));
          break;
        default:
          throw new Error("unparsed value: " + t[t.l])
      }
      p[h] = f
    }
  }
  return t.l = n + o, p
}

function fv(t, e, n) {
  var o = t.content;
  if (!o) return {};
  Qf(o, 0);
  var i, a, r, s, l = 0;
  o.chk("feff", "Byte Order: "), o.read_shift(2);
  var c = o.read_shift(4),
    d = o.read_shift(16);
  if (d !== lg.utils.consts.HEADER_CLSID && d !== n) throw new Error("Bad PropertySet CLSID " + d);
  if (1 !== (i = o.read_shift(4)) && 2 !== i) throw new Error("Unrecognized #Sets: " + i);
  if (a = o.read_shift(16), s = o.read_shift(4), 1 === i && s !== o.l) throw new Error("Length mismatch: " + s +
    " !== " + o.l);
  2 === i && (r = o.read_shift(16), l = o.read_shift(4));
  var u, p = gv(o, e),
    b = {
      SystemIdentifier: c
    };
  for (var m in p) b[m] = p[m];
  if (b.FMTID = a, 1 === i) return b;
  if (l - o.l == 2 && (o.l += 2), o.l !== l) throw new Error("Length mismatch 2: " + o.l + " !== " + l);
  try {
    u = gv(o, null)
  } catch (aD) {}
  for (m in u) b[m] = u[m];
  return b.FMTID = [a, r], b
}

function hv(t, e) {
  return t.read_shift(e), null
}

function vv(t, e) {
  return 1 === t.read_shift(e)
}

function yv(t) {
  return t.read_shift(2, "u")
}

function kv(t, e) {
  return function(t, e, n) {
    for (var o = [], i = t.l + e; t.l < i;) o.push(n(t, i - t.l));
    if (i !== t.l) throw new Error("Slurp error");
    return o
  }(t, e, yv)
}

function xv(t, e, n) {
  var o = t.read_shift(n && n.biff >= 12 ? 2 : 1),
    i = "sbcs-cont";
  (n && n.biff, n && 8 != n.biff) ? 12 == n.biff && (i = "wstr"): t.read_shift(1) && (i = "dbcs-cont");
  return n.biff >= 2 && n.biff <= 5 && (i = "cpstr"), o ? t.read_shift(o, i) : ""
}

function wv(t) {
  var e, n = t.read_shift(2),
    o = t.read_shift(1),
    i = 4 & o,
    a = 8 & o,
    r = 1 + (1 & o),
    s = 0,
    l = {};
  a && (s = t.read_shift(2)), i && (e = t.read_shift(4));
  var c = 2 == r ? "dbcs-cont" : "sbcs-cont",
    d = 0 === n ? "" : t.read_shift(n, c);
  return a && (t.l += 4 * s), i && (t.l += e), l.t = d, a || (l.raw = "<t>" + l.t + "</t>", l.r = l.t), l
}

function Cv(t, e, n) {
  if (n) {
    if (n.biff >= 2 && n.biff <= 5) return t.read_shift(e, "cpstr");
    if (n.biff >= 12) return t.read_shift(e, "dbcs-cont")
  }
  return 0 === t.read_shift(1) ? t.read_shift(e, "sbcs-cont") : t.read_shift(e, "dbcs-cont")
}

function Sv(t, e, n) {
  var o = t.read_shift(n && 2 == n.biff ? 1 : 2);
  return 0 === o ? (t.l++, "") : Cv(t, o, n)
}

function Tv(t, e, n) {
  if (n.biff > 5) return Sv(t, 0, n);
  var o = t.read_shift(1);
  return 0 === o ? (t.l++, "") : t.read_shift(o, n.biff <= 4 || !t.lens ? "cpstr" : "sbcs-cont")
}

function Iv(t, e) {
  var n = t.read_shift(16);
  switch (n) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return function(t) {
        var e = t.read_shift(4),
          n = t.l,
          o = !1;
        e > 24 && (t.l += e - 24, "795881f43b1d7f48af2c825dc4852763" === t.read_shift(16) && (o = !0), t.l = n);
        var i = t.read_shift((o ? e - 24 : e) >> 1, "utf16le").replace(bm, "");
        return o && (t.l += 24), i
      }(t);
    case "0303000000000000c000000000000046":
      return function(t) {
        for (var e = t.read_shift(2), n = ""; e-- > 0;) n += "../";
        var o = t.read_shift(0, "lpstr-ansi");
        if (t.l += 2, 57005 != t.read_shift(2)) throw new Error("Bad FileMoniker");
        if (0 === t.read_shift(4)) return n + o.replace(/\\/g, "/");
        var i = t.read_shift(4);
        if (3 != t.read_shift(2)) throw new Error("Bad FileMoniker");
        return n + t.read_shift(i >> 1, "utf16le").replace(bm, "")
      }(t);
    default:
      throw new Error("Unsupported Moniker " + n)
  }
}

function Av(t) {
  var e = t.read_shift(4);
  return e > 0 ? t.read_shift(e, "utf16le").replace(bm, "") : ""
}

function Ev(t) {
  return [t.read_shift(1), t.read_shift(1), t.read_shift(1), t.read_shift(1)]
}

function Pv(t, e) {
  var n = Ev(t);
  return n[3] = 0, n
}

function Ov(t) {
  return {
    r: t.read_shift(2),
    c: t.read_shift(2),
    ixfe: t.read_shift(2)
  }
}

function Mv(t, e, n) {
  var o = n.biff > 8 ? 4 : 2;
  return [t.read_shift(o), t.read_shift(o, "i"), t.read_shift(o, "i")]
}

function Lv(t) {
  return [t.read_shift(2), Lh(t)]
}

function _v(t) {
  var e = t.read_shift(2),
    n = t.read_shift(2);
  return {
    s: {
      c: t.read_shift(2),
      r: e
    },
    e: {
      c: t.read_shift(2),
      r: n
    }
  }
}

function Bv(t) {
  var e = t.read_shift(2),
    n = t.read_shift(2);
  return {
    s: {
      c: t.read_shift(1),
      r: e
    },
    e: {
      c: t.read_shift(1),
      r: n
    }
  }
}
var Fv = Bv;

function Rv(t) {
  t.l += 4;
  var e = t.read_shift(2),
    n = t.read_shift(2),
    o = t.read_shift(2);
  return t.l += 12, [n, e, o]
}

function Dv(t) {
  t.l += 2, t.l += t.read_shift(2)
}
var Vv = {
  0: Dv,
  4: Dv,
  5: Dv,
  6: Dv,
  7: function(t) {
    return t.l += 4, t.cf = t.read_shift(2), {}
  },
  8: Dv,
  9: Dv,
  10: Dv,
  11: Dv,
  12: Dv,
  13: function(t) {
    var e = {};
    return t.l += 4, t.l += 16, e.fSharedNote = t.read_shift(2), t.l += 4, e
  },
  14: Dv,
  15: Dv,
  16: Dv,
  17: Dv,
  18: Dv,
  19: Dv,
  20: Dv,
  21: Rv
};

function Nv(t, e) {
  var n = {
    BIFFVer: 0,
    dt: 0
  };
  switch (n.BIFFVer = t.read_shift(2), (e -= 2) >= 2 && (n.dt = t.read_shift(2), t.l -= 2), n.BIFFVer) {
    case 1536:
    case 1280:
    case 1024:
    case 768:
    case 512:
    case 2:
    case 7:
      break;
    default:
      if (e > 6) throw new Error("Unexpected BIFF Ver " + n.BIFFVer)
  }
  return t.read_shift(e), n
}

function $v(t, e, n) {
  var o = 0;
  n && 2 == n.biff || (o = t.read_shift(2));
  var i = t.read_shift(2);
  return n && 2 == n.biff && (o = 1 - (i >> 15), i &= 32767), [{
    Unsynced: 1 & o,
    DyZero: (2 & o) >> 1,
    ExAsc: (4 & o) >> 2,
    ExDsc: (8 & o) >> 3
  }, i]
}
var zv = Tv;

function Uv(t, e, n) {
  var o = t.l + e,
    i = 8 != n.biff && n.biff ? 2 : 4,
    a = t.read_shift(i),
    r = t.read_shift(i),
    s = t.read_shift(2),
    l = t.read_shift(2);
  return t.l = o, {
    s: {
      r: a,
      c: s
    },
    e: {
      r,
      c: l
    }
  }
}

function jv(t, e, n) {
  var o = Ov(t);
  2 != n.biff && 9 != e || ++t.l;
  var i = function(t) {
    var e = t.read_shift(1);
    return 1 === t.read_shift(1) ? e : 1 === e
  }(t);
  return o.val = i, o.t = !0 === i || !1 === i ? "b" : "e", o
}
var Hv = function(t, e, n) {
  return 0 === e ? "" : Tv(t, 0, n)
};

function Gv(t, e, n) {
  var o, i = t.read_shift(2),
    a = {
      fBuiltIn: 1 & i,
      fWantAdvise: i >>> 1 & 1,
      fWantPict: i >>> 2 & 1,
      fOle: i >>> 3 & 1,
      fOleLink: i >>> 4 & 1,
      cf: i >>> 5 & 1023,
      fIcon: i >>> 15 & 1
    };
  return 14849 === n.sbcch && (o = function(t, e, n) {
    t.l += 4, e -= 4;
    var o = t.l + e,
      i = xv(t, 0, n),
      a = t.read_shift(2);
    if (a !== (o -= t.l)) throw new Error("Malformed AddinUdf: padding = " + o + " != " + a);
    return t.l += a, i
  }(t, e - 2, n)), a.body = o || t.read_shift(e - 2), "string" == typeof o && (a.Name = o), a
}
var Kv = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database",
  "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form",
  "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"
];

function Wv(t, e, n) {
  var o = t.l + e,
    i = t.read_shift(2),
    a = t.read_shift(1),
    r = t.read_shift(1),
    s = t.read_shift(n && 2 == n.biff ? 1 : 2),
    l = 0;
  (!n || n.biff >= 5) && (5 != n.biff && (t.l += 2), l = t.read_shift(2), 5 == n.biff && (t.l += 2), t.l += 4);
  var c = Cv(t, r, n);
  32 & i && (c = Kv[c.charCodeAt(0)]);
  var d = o - t.l;
  n && 2 == n.biff && --d;
  var u = o != t.l && 0 !== s && d > 0 ? function(t, e, n, o) {
    var i, a = t.l + e,
      r = Fk(t, o, n);
    a !== t.l && (i = Bk(t, a - t.l, r, n));
    return [r, i]
  }(t, d, n, s) : [];
  return {
    chKey: a,
    Name: c,
    itab: l,
    rgce: u
  }
}

function qv(t, e, n) {
  if (n.biff < 8) return function(t, e, n) {
    3 == t[t.l + 1] && t[t.l]++;
    var o = xv(t, 0, n);
    return 3 == o.charCodeAt(0) ? o.slice(1) : o
  }(t, 0, n);
  for (var o = [], i = t.l + e, a = t.read_shift(n.biff > 8 ? 4 : 2); 0 !== a--;) o.push(Mv(t, n.biff, n));
  if (t.l != i) throw new Error("Bad ExternSheet: " + t.l + " != " + i);
  return o
}

function Yv(t, e, n) {
  var o = Fv(t);
  switch (n.biff) {
    case 2:
      t.l++, e -= 7;
      break;
    case 3:
    case 4:
      t.l += 2, e -= 8;
      break;
    default:
      t.l += 6, e -= 12
  }
  return [o, zk(t, e, n)]
}
var Xv = {
  8: function(t, e) {
    var n = t.l + e;
    t.l += 10;
    var o = t.read_shift(2);
    t.l += 4, t.l += 2, t.l += 2, t.l += 2, t.l += 4;
    var i = t.read_shift(1);
    return t.l += i, t.l = n, {
      fmt: o
    }
  }
};

function Jv(t, e, n) {
  if (!n.cellStyles) return th(t, e);
  var o = n && n.biff >= 12 ? 4 : 2,
    i = t.read_shift(o),
    a = t.read_shift(o),
    r = t.read_shift(o),
    s = t.read_shift(o),
    l = t.read_shift(2);
  2 == o && (t.l += 2);
  var c = {
    s: i,
    e: a,
    w: r,
    ixfe: s,
    flags: l
  };
  return (n.biff >= 5 || !n.biff) && (c.level = l >> 8 & 7), c
}
var Zv = Ov,
  Qv = kv,
  ty = Sv;
var ey = [2, 3, 48, 49, 131, 139, 140, 245],
  ny = function() {
    var t = {
        1: 437,
        2: 850,
        3: 1252,
        4: 1e4,
        100: 852,
        101: 866,
        102: 865,
        103: 861,
        104: 895,
        105: 620,
        106: 737,
        107: 857,
        120: 950,
        121: 949,
        122: 936,
        123: 932,
        124: 874,
        125: 1255,
        126: 1256,
        150: 10007,
        151: 10029,
        152: 10006,
        200: 1250,
        201: 1251,
        202: 1254,
        203: 1253,
        0: 20127,
        8: 865,
        9: 437,
        10: 850,
        11: 437,
        13: 437,
        14: 850,
        15: 437,
        16: 850,
        17: 437,
        18: 850,
        19: 932,
        20: 850,
        21: 437,
        22: 850,
        23: 865,
        24: 437,
        25: 437,
        26: 850,
        27: 437,
        28: 863,
        29: 850,
        31: 852,
        34: 852,
        35: 852,
        36: 860,
        37: 850,
        38: 866,
        55: 850,
        64: 852,
        77: 936,
        78: 949,
        79: 950,
        80: 874,
        87: 1252,
        88: 1252,
        89: 1252,
        108: 863,
        134: 737,
        135: 852,
        136: 857,
        204: 1257,
        255: 16969
      },
      e = dg({
        1: 437,
        2: 850,
        3: 1252,
        4: 1e4,
        100: 852,
        101: 866,
        102: 865,
        103: 861,
        104: 895,
        105: 620,
        106: 737,
        107: 857,
        120: 950,
        121: 949,
        122: 936,
        123: 932,
        124: 874,
        125: 1255,
        126: 1256,
        150: 10007,
        151: 10029,
        152: 10006,
        200: 1250,
        201: 1251,
        202: 1254,
        203: 1253,
        0: 20127
      });

    function n(e, n) {
      var o = n || {};
      o.dateNF || (o.dateNF = "yyyymmdd");
      var i = xh(function(e, n) {
        var o = [],
          i = sm(1);
        switch (n.type) {
          case "base64":
            i = cm(im(e));
            break;
          case "binary":
            i = cm(e);
            break;
          case "buffer":
          case "array":
            i = e
        }
        Qf(i, 0);
        var a = i.read_shift(1),
          r = !!(136 & a),
          s = !1,
          l = !1;
        switch (a) {
          case 2:
          case 3:
          case 131:
          case 139:
          case 245:
            break;
          case 48:
          case 49:
            s = !0, r = !0;
            break;
          case 140:
            l = !0;
            break;
          default:
            throw new Error("DBF Unsupported Version: " + a.toString(16))
        }
        var c = 0,
          d = 521;
        2 == a && (c = i.read_shift(2)), i.l += 3, 2 != a && (c = i.read_shift(4)), c > 1048576 && (c = 1e6), 2 !=
          a && (d = i.read_shift(2));
        var u = i.read_shift(2),
          p = n.codepage || 1252;
        2 != a && (i.l += 16, i.read_shift(1), 0 !== i[i.l] && (p = t[i[i.l]]), i.l += 1, i.l += 2), l && (i.l +=
          36);
        for (var b = [], m = {}, g = Math.min(i.length, 2 == a ? 521 : d - 10 - (s ? 264 : 0)), f = l ? 32 : 11; i
          .l < g && 13 != i[i.l];) switch ((m = {}).name = Zb.utils.decode(p, i.slice(i.l, i.l + f)).replace(
            /[\u0000\r\n].*$/g, ""), i.l += f, m.type = String.fromCharCode(i.read_shift(1)), 2 == a || l || (m
            .offset = i.read_shift(4)), m.len = i.read_shift(1), 2 == a && (m.offset = i.read_shift(2)), m.dec = i
          .read_shift(1), m.name.length && b.push(m), 2 != a && (i.l += l ? 13 : 14), m.type) {
          case "B":
            (!s || 8 != m.len) && n.WTF;
            break;
          case "G":
          case "P":
            n.WTF;
            break;
          case "+":
          case "0":
          case "@":
          case "C":
          case "D":
          case "F":
          case "I":
          case "L":
          case "M":
          case "N":
          case "O":
          case "T":
          case "Y":
            break;
          default:
            throw new Error("Unknown Field Type: " + m.type)
        }
        if (13 !== i[i.l] && (i.l = d - 1), 13 !== i.read_shift(1)) throw new Error("DBF Terminator not found " + i
          .l + " " + i[i.l]);
        i.l = d;
        var h = 0,
          v = 0;
        for (o[0] = [], v = 0; v != b.length; ++v) o[0][v] = b[v].name;
        for (; c-- > 0;)
          if (42 !== i[i.l])
            for (++i.l, o[++h] = [], v = 0, v = 0; v != b.length; ++v) {
              var y = i.slice(i.l, i.l + b[v].len);
              i.l += b[v].len, Qf(y, 0);
              var k = Zb.utils.decode(p, y);
              switch (b[v].type) {
                case "C":
                  k.trim().length && (o[h][v] = k.replace(/\s+$/, ""));
                  break;
                case "D":
                  8 === k.length ? o[h][v] = new Date(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8)) : o[h][
                    v] = k;
                  break;
                case "F":
                  o[h][v] = parseFloat(k.trim());
                  break;
                case "+":
                case "I":
                  o[h][v] = l ? 2147483648 ^ y.read_shift(-4, "i") : y.read_shift(4, "i");
                  break;
                case "L":
                  switch (k.trim().toUpperCase()) {
                    case "Y":
                    case "T":
                      o[h][v] = !0;
                      break;
                    case "N":
                    case "F":
                      o[h][v] = !1;
                      break;
                    case "":
                    case "?":
                      break;
                    default:
                      throw new Error("DBF Unrecognized L:|" + k + "|")
                  }
                  break;
                case "M":
                  if (!r) throw new Error("DBF Unexpected MEMO for type " + a.toString(16));
                  o[h][v] = "##MEMO##" + (l ? parseInt(k.trim(), 10) : y.read_shift(4));
                  break;
                case "N":
                  (k = k.replace(/\u0000/g, "").trim()) && "." != k && (o[h][v] = +k || 0);
                  break;
                case "@":
                  o[h][v] = new Date(y.read_shift(-8, "f") - 621356832e5);
                  break;
                case "T":
                  o[h][v] = new Date(864e5 * (y.read_shift(4) - 2440588) + y.read_shift(4));
                  break;
                case "Y":
                  o[h][v] = y.read_shift(4, "i") / 1e4 + y.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
                  break;
                case "O":
                  o[h][v] = -y.read_shift(-8, "f");
                  break;
                case "B":
                  if (s && 8 == b[v].len) {
                    o[h][v] = y.read_shift(8, "f");
                    break
                  }
                case "G":
                case "P":
                  y.l += b[v].len;
                  break;
                case "0":
                  if ("_NullFlags" === b[v].name) break;
                default:
                  throw new Error("DBF Unsupported data type " + b[v].type)
              }
            } else i.l += u;
        if (2 != a && i.l < i.length && 26 != i[i.l++]) throw new Error("DBF EOF Marker missing " + (i.l - 1) +
          " of " + i.length + " " + i[i.l - 1].toString(16));
        return n && n.sheetRows && (o = o.slice(0, n.sheetRows)), n.DBF = b, o
      }(e, o), o);
      return i["!cols"] = o.DBF.map(function(t) {
        return {
          wch: t.len,
          DBF: t
        }
      }), delete o.DBF, i
    }
    var o = {
      B: 8,
      C: 250,
      L: 1,
      D: 8,
      "?": 0,
      "": 0
    };
    return {
      to_workbook: function(t, e) {
        try {
          return yh(n(t, e), e)
        } catch (aD) {
          if (e && e.WTF) throw aD
        }
        return {
          SheetNames: [],
          Sheets: {}
        }
      },
      to_sheet: n,
      from_sheet: function(t, n) {
        var i = n || {};
        if (+i.codepage >= 0 && qb(+i.codepage), "string" == i.type) throw new Error("Cannot write DBF to JS string");
        var a = oh(),
          r = Yw(t, {
            header: 1,
            raw: !0,
            cellDates: !0
          }),
          s = r[0],
          l = r.slice(1),
          c = t["!cols"] || [],
          d = 0,
          u = 0,
          p = 0,
          b = 1;
        for (d = 0; d < s.length; ++d)
          if (((c[d] || {}).DBF || {}).name) s[d] = c[d].DBF.name, ++p;
          else if (null != s[d]) {
          if (++p, "number" == typeof s[d] && (s[d] = s[d].toString(10)), "string" != typeof s[d]) throw new Error(
            "DBF Invalid column name " + s[d] + " |" + typeof s[d] + "|");
          if (s.indexOf(s[d]) !== d)
            for (u = 0; u < 1024; ++u)
              if (-1 == s.indexOf(s[d] + "_" + u)) {
                s[d] += "_" + u;
                break
              }
        }
        var m = fh(t["!ref"]),
          g = [],
          f = [],
          h = [];
        for (d = 0; d <= m.e.c - m.s.c; ++d) {
          var v = "",
            y = "",
            k = 0,
            x = [];
          for (u = 0; u < l.length; ++u) null != l[u][d] && x.push(l[u][d]);
          if (0 != x.length && null != s[d]) {
            for (u = 0; u < x.length; ++u) {
              switch (typeof x[u]) {
                case "number":
                  y = "B";
                  break;
                case "string":
                default:
                  y = "C";
                  break;
                case "boolean":
                  y = "L";
                  break;
                case "object":
                  y = x[u] instanceof Date ? "D" : "C"
              }
              k = Math.max(k, String(x[u]).length), v = v && v != y ? "C" : y
            }
            k > 250 && (k = 250), "C" == (y = ((c[d] || {}).DBF || {}).type) && c[d].DBF.len > k && (k = c[d].DBF
              .len), "B" == v && "N" == y && (v = "N", h[d] = c[d].DBF.dec, k = c[d].DBF.len), f[d] = "C" == v ||
              "N" == y ? k : o[v] || 0, b += f[d], g[d] = v
          } else g[d] = "?"
        }
        var w = a.next(32);
        for (w.write_shift(4, 318902576), w.write_shift(4, l.length), w.write_shift(2, 296 + 32 * p), w.write_shift(2,
            b), d = 0; d < 4; ++d) w.write_shift(4, 0);
        for (w.write_shift(4, (+e[Hb] || 3) << 8), d = 0, u = 0; d < s.length; ++d)
          if (null != s[d]) {
            var C = a.next(32),
              S = (s[d].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
            C.write_shift(1, S, "sbcs"), C.write_shift(1, "?" == g[d] ? "C" : g[d], "sbcs"), C.write_shift(4, u), C
              .write_shift(1, f[d] || o[g[d]] || 0), C.write_shift(1, h[d] || 0), C.write_shift(1, 2), C.write_shift(
                4, 0), C.write_shift(1, 0), C.write_shift(4, 0), C.write_shift(4, 0), u += f[d] || o[g[d]] || 0
          } var T = a.next(264);
        for (T.write_shift(4, 13), d = 0; d < 65; ++d) T.write_shift(4, 0);
        for (d = 0; d < l.length; ++d) {
          var I = a.next(b);
          for (I.write_shift(1, 0), u = 0; u < s.length; ++u)
            if (null != s[u]) switch (g[u]) {
              case "L":
                I.write_shift(1, null == l[d][u] ? 63 : l[d][u] ? 84 : 70);
                break;
              case "B":
                I.write_shift(8, l[d][u] || 0, "f");
                break;
              case "N":
                var A = "0";
                for ("number" == typeof l[d][u] && (A = l[d][u].toFixed(h[u] || 0)), p = 0; p < f[u] - A.length; ++
                  p) I.write_shift(1, 32);
                I.write_shift(1, A, "sbcs");
                break;
              case "D":
                l[d][u] ? (I.write_shift(4, ("0000" + l[d][u].getFullYear()).slice(-4), "sbcs"), I.write_shift(2, (
                  "00" + (l[d][u].getMonth() + 1)).slice(-2), "sbcs"), I.write_shift(2, ("00" + l[d][u]
                .getDate()).slice(-2), "sbcs")) : I.write_shift(8, "00000000", "sbcs");
                break;
              case "C":
                var E = String(null != l[d][u] ? l[d][u] : "").slice(0, f[u]);
                for (I.write_shift(1, E, "sbcs"), p = 0; p < f[u] - E.length; ++p) I.write_shift(1, 32)
            }
        }
        return a.next(1).write_shift(1, 26), a.end()
      }
    }
  }(),
  oy = function() {
    var t = {
        AA: "\xc0",
        BA: "\xc1",
        CA: "\xc2",
        DA: 195,
        HA: "\xc4",
        JA: 197,
        AE: "\xc8",
        BE: "\xc9",
        CE: "\xca",
        HE: "\xcb",
        AI: "\xcc",
        BI: "\xcd",
        CI: "\xce",
        HI: "\xcf",
        AO: "\xd2",
        BO: "\xd3",
        CO: "\xd4",
        DO: 213,
        HO: "\xd6",
        AU: "\xd9",
        BU: "\xda",
        CU: "\xdb",
        HU: "\xdc",
        Aa: "\xe0",
        Ba: "\xe1",
        Ca: "\xe2",
        Da: 227,
        Ha: "\xe4",
        Ja: 229,
        Ae: "\xe8",
        Be: "\xe9",
        Ce: "\xea",
        He: "\xeb",
        Ai: "\xec",
        Bi: "\xed",
        Ci: "\xee",
        Hi: "\xef",
        Ao: "\xf2",
        Bo: "\xf3",
        Co: "\xf4",
        Do: 245,
        Ho: "\xf6",
        Au: "\xf9",
        Bu: "\xfa",
        Cu: "\xfb",
        Hu: "\xfc",
        KC: "\xc7",
        Kc: "\xe7",
        q: "\xe6",
        z: "\u0153",
        a: "\xc6",
        j: "\u0152",
        DN: 209,
        Dn: 241,
        Hy: 255,
        S: 169,
        c: 170,
        R: 174,
        "B ": 180,
        0: 176,
        1: 177,
        2: 178,
        3: 179,
        5: 181,
        6: 182,
        7: 183,
        Q: 185,
        k: 186,
        b: 208,
        i: 216,
        l: 222,
        s: 240,
        y: 248,
        "!": 161,
        '"': 162,
        "#": 163,
        "(": 164,
        "%": 165,
        "'": 167,
        "H ": 168,
        "+": 171,
        ";": 187,
        "<": 188,
        "=": 189,
        ">": 190,
        "?": 191,
        "{": 223
      },
      e = new RegExp("\x1bN(" + cg(t).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)",
      "gm"),
      n = function(e, n) {
        var o = t[n];
        return "number" == typeof o ? em(o) : o
      },
      o = function(t, e, n) {
        var o = e.charCodeAt(0) - 32 << 4 | n.charCodeAt(0) - 48;
        return 59 == o ? t : em(o)
      };

    function i(t, i) {
      var a, r = t.split(/[\n\r]+/),
        s = -1,
        l = -1,
        c = 0,
        d = 0,
        u = [],
        p = [],
        b = null,
        m = {},
        g = [],
        f = [],
        h = [],
        v = 0;
      for (+i.codepage >= 0 && qb(+i.codepage); c !== r.length; ++c) {
        v = 0;
        var y, k = r[c].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, o).replace(e, n),
          x = k.replace(/;;/g, "\0").split(";").map(function(t) {
            return t.replace(/\u0000/g, ";")
          }),
          w = x[0];
        if (k.length > 0) switch (w) {
          case "ID":
          case "E":
          case "B":
          case "O":
          case "W":
            break;
          case "P":
            "P" == x[1].charAt(0) && p.push(k.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var C = !1,
              S = !1,
              T = !1,
              I = !1,
              A = -1,
              E = -1;
            for (d = 1; d < x.length; ++d) switch (x[d].charAt(0)) {
              case "A":
              case "G":
                break;
              case "X":
                l = parseInt(x[d].slice(1)) - 1, S = !0;
                break;
              case "Y":
                for (s = parseInt(x[d].slice(1)) - 1, S || (l = 0), a = u.length; a <= s; ++a) u[a] = [];
                break;
              case "K":
                '"' === (y = x[d].slice(1)).charAt(0) ? y = y.slice(1, y.length - 1) : "TRUE" === y ? y = !0 :
                  "FALSE" === y ? y = !1 : isNaN(Tg(y)) ? isNaN(Ag(y).getDate()) || (y = xg(y)) : (y = Tg(y),
                    null !== b && Zm(b) && (y = fg(y))), C = !0;
                break;
              case "E":
                I = !0;
                var P = ck(x[d].slice(1), {
                  r: s,
                  c: l
                });
                u[s][l] = [u[s][l], P];
                break;
              case "S":
                T = !0, u[s][l] = [u[s][l], "S5S"];
                break;
              case "R":
                A = parseInt(x[d].slice(1)) - 1;
                break;
              case "C":
                E = parseInt(x[d].slice(1)) - 1;
                break;
              default:
                if (i && i.WTF) throw new Error("SYLK bad record " + k)
            }
            if (C && (u[s][l] && 2 == u[s][l].length ? u[s][l][0] = y : u[s][l] = y, b = null), T) {
              if (I) throw new Error("SYLK shared formula cannot have own formula");
              var O = A > -1 && u[A][E];
              if (!O || !O[1]) throw new Error("SYLK shared formula cannot find base");
              u[s][l][1] = pk(O[1], {
                r: s - A,
                c: l - E
              })
            }
            break;
          case "F":
            var M = 0;
            for (d = 1; d < x.length; ++d) switch (x[d].charAt(0)) {
              case "X":
                l = parseInt(x[d].slice(1)) - 1, ++M;
                break;
              case "Y":
                for (s = parseInt(x[d].slice(1)) - 1, a = u.length; a <= s; ++a) u[a] = [];
                break;
              case "M":
                v = parseInt(x[d].slice(1)) / 20;
                break;
              case "F":
              case "G":
              case "S":
              case "D":
              case "N":
                break;
              case "P":
                b = p[parseInt(x[d].slice(1))];
                break;
              case "W":
                for (h = x[d].slice(1).split(" "), a = parseInt(h[0], 10); a <= parseInt(h[1], 10); ++a) v =
                  parseInt(h[2], 10), f[a - 1] = 0 === v ? {
                    hidden: !0
                  } : {
                    wch: v
                  }, Ny(f[a - 1]);
                break;
              case "C":
                f[l = parseInt(x[d].slice(1)) - 1] || (f[l] = {});
                break;
              case "R":
                g[s = parseInt(x[d].slice(1)) - 1] || (g[s] = {}), v > 0 ? (g[s].hpt = v, g[s].hpx = Uy(v)) : 0 ===
                  v && (g[s].hidden = !0);
                break;
              default:
                if (i && i.WTF) throw new Error("SYLK bad record " + k)
            }
            M < 1 && (b = null);
            break;
          default:
            if (i && i.WTF) throw new Error("SYLK bad record " + k)
        }
      }
      return g.length > 0 && (m["!rows"] = g), f.length > 0 && (m["!cols"] = f), i && i.sheetRows && (u = u.slice(0, i
        .sheetRows)), [u, m]
    }

    function a(t, e) {
      var n = function(t, e) {
          switch (e.type) {
            case "base64":
              return i(im(t), e);
            case "binary":
              return i(t, e);
            case "buffer":
              return i(am && Buffer.isBuffer(t) ? t.toString("binary") : dm(t), e);
            case "array":
              return i(wg(t), e)
          }
          throw new Error("Unrecognized type " + e.type)
        }(t, e),
        o = n[0],
        a = n[1],
        r = xh(o, e);
      return cg(a).forEach(function(t) {
        r[t] = a[t]
      }), r
    }

    function r(t, e, n, o) {
      var i = "C;Y" + (n + 1) + ";X" + (o + 1) + ";K";
      switch (t.t) {
        case "n":
          i += t.v || 0, t.f && !t.F && (i += ";E" + uk(t.f, {
            r: n,
            c: o
          }));
          break;
        case "b":
          i += t.v ? "TRUE" : "FALSE";
          break;
        case "e":
          i += t.w || t.v;
          break;
        case "d":
          i += '"' + (t.w || t.v) + '"';
          break;
        case "s":
          i += '"' + t.v.replace(/"/g, "").replace(/;/g, ";;") + '"'
      }
      return i
    }
    return t["|"] = 254, {
      to_workbook: function(t, e) {
        return yh(a(t, e), e)
      },
      to_sheet: a,
      from_sheet: function(t, e) {
        var n, o, i = ["ID;PWXL;N;E"],
          a = [],
          s = fh(t["!ref"]),
          l = Array.isArray(t),
          c = "\r\n";
        i.push("P;PGeneral"), i.push("F;P0;DG0G8;M255"), t["!cols"] && (o = i, t["!cols"].forEach(function(t, e) {
          var n = "F;W" + (e + 1) + " " + (e + 1) + " ";
          t.hidden ? n += "0" : ("number" != typeof t.width || t.wpx || (t.wpx = By(t.width)), "number" !=
            typeof t.wpx || t.wch || (t.wch = Fy(t.wpx)), "number" == typeof t.wch && (n += Math.round(t
              .wch))), " " != n.charAt(n.length - 1) && o.push(n)
        })), t["!rows"] && function(t, e) {
          e.forEach(function(e, n) {
            var o = "F;";
            e.hidden ? o += "M0;" : e.hpt ? o += "M" + 20 * e.hpt + ";" : e.hpx && (o += "M" + 20 * zy(e
              .hpx) + ";"), o.length > 2 && t.push(o + "R" + (n + 1))
          })
        }(i, t["!rows"]), i.push("B;Y" + (s.e.r - s.s.r + 1) + ";X" + (s.e.c - s.s.c + 1) + ";D" + [s.s.c, s.s.r,
          s.e.c, s.e.r
        ].join(" "));
        for (var d = s.s.r; d <= s.e.r; ++d)
          for (var u = s.s.c; u <= s.e.c; ++u) {
            var p = bh({
              r: d,
              c: u
            });
            (n = l ? (t[d] || [])[u] : t[p]) && (null != n.v || n.f && !n.F) && a.push(r(n, 0, d, u))
          }
        return i.join(c) + c + a.join(c) + c + "E" + c
      }
    }
  }(),
  iy = function() {
    function t(t, e) {
      for (var n = t.split("\n"), o = -1, i = -1, a = 0, r = []; a !== n.length; ++a)
        if ("BOT" !== n[a].trim()) {
          if (!(o < 0)) {
            for (var s = n[a].trim().split(","), l = s[0], c = s[1], d = n[++a] || ""; 1 & (d.match(/["]/g) || [])
              .length && a < n.length - 1;) d += "\n" + n[++a];
            switch (d = d.trim(), +l) {
              case -1:
                if ("BOT" === d) {
                  r[++o] = [], i = 0;
                  continue
                }
                if ("EOD" !== d) throw new Error("Unrecognized DIF special command " + d);
                break;
              case 0:
                "TRUE" === d ? r[o][i] = !0 : "FALSE" === d ? r[o][i] = !1 : isNaN(Tg(c)) ? isNaN(Ag(c).getDate()) ? r[
                  o][i] = c : r[o][i] = xg(c) : r[o][i] = Tg(c), ++i;
                break;
              case 1:
                (d = (d = d.slice(1, d.length - 1)).replace(/""/g, '"')) && d.match(/^=".*"$/) && (d = d.slice(2, -1)),
                  r[o][i++] = "" !== d ? d : null
            }
            if ("EOD" === d) break
          }
        } else r[++o] = [], i = 0;
      return e && e.sheetRows && (r = r.slice(0, e.sheetRows)), r
    }

    function e(e, n) {
      return xh(function(e, n) {
        switch (n.type) {
          case "base64":
            return t(im(e), n);
          case "binary":
            return t(e, n);
          case "buffer":
            return t(am && Buffer.isBuffer(e) ? e.toString("binary") : dm(e), n);
          case "array":
            return t(wg(e), n)
        }
        throw new Error("Unrecognized type " + n.type)
      }(e, n), n)
    }
    return {
      to_workbook: function(t, n) {
        return yh(e(t, n), n)
      },
      to_sheet: e,
      from_sheet: function() {
        var t = function(t, e, n, o, i) {
            t.push(e), t.push(n + "," + o), t.push('"' + i.replace(/"/g, '""') + '"')
          },
          e = function(t, e, n, o) {
            t.push(e + "," + n), t.push(1 == e ? '"' + o.replace(/"/g, '""') + '"' : o)
          };
        return function(n) {
          var o, i = [],
            a = fh(n["!ref"]),
            r = Array.isArray(n);
          t(i, "TABLE", 0, 1, "sheetjs"), t(i, "VECTORS", 0, a.e.r - a.s.r + 1, ""), t(i, "TUPLES", 0, a.e.c - a.s
            .c + 1, ""), t(i, "DATA", 0, 0, "");
          for (var s = a.s.r; s <= a.e.r; ++s) {
            e(i, -1, 0, "BOT");
            for (var l = a.s.c; l <= a.e.c; ++l) {
              var c = bh({
                r: s,
                c: l
              });
              if (o = r ? (n[s] || [])[l] : n[c]) switch (o.t) {
                case "n":
                  var d = o.w;
                  d || null == o.v || (d = o.v), null == d ? o.f && !o.F ? e(i, 1, 0, "=" + o.f) : e(i, 1, 0,
                    "") : e(i, 0, d, "V");
                  break;
                case "b":
                  e(i, 0, o.v ? 1 : 0, o.v ? "TRUE" : "FALSE");
                  break;
                case "s":
                  e(i, 1, 0, isNaN(o.v) ? o.v : '="' + o.v + '"');
                  break;
                case "d":
                  o.w || (o.w = ng(o.z || Sm[14], pg(xg(o.v)))), e(i, 0, o.w, "V");
                  break;
                default:
                  e(i, 1, 0, "")
              } else e(i, 1, 0, "")
            }
          }
          e(i, -1, 0, "EOD");
          return i.join("\r\n")
        }
      }()
    }
  }(),
  ay = function() {
    function t(t) {
      return t.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n")
    }

    function e(t) {
      return t.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
    }

    function n(e, n) {
      return xh(function(e, n) {
        for (var o = e.split("\n"), i = -1, a = -1, r = 0, s = []; r !== o.length; ++r) {
          var l = o[r].trim().split(":");
          if ("cell" === l[0]) {
            var c = ph(l[1]);
            if (s.length <= c.r)
              for (i = s.length; i <= c.r; ++i) s[i] || (s[i] = []);
            switch (i = c.r, a = c.c, l[2]) {
              case "t":
                s[i][a] = t(l[3]);
                break;
              case "v":
                s[i][a] = +l[3];
                break;
              case "vtf":
                var d = l[l.length - 1];
              case "vtc":
                "nl" === l[3] ? s[i][a] = !!+l[4] : s[i][a] = +l[4], "vtf" == l[2] && (s[i][a] = [s[i][a], d])
            }
          }
        }
        return n && n.sheetRows && (s = s.slice(0, n.sheetRows)), s
      }(e, n), n)
    }
    var o = ["socialcalc:version:1.5", "MIME-Version: 1.0",
        "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
      ].join("\n"),
      i = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n",
      a = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n"),
      r = "--SocialCalcSpreadsheetControlSave--";

    function s(t) {
      if (!t || !t["!ref"]) return "";
      for (var n, o = [], i = [], a = "", r = mh(t["!ref"]), s = Array.isArray(t), l = r.s.r; l <= r.e.r; ++l)
        for (var c = r.s.c; c <= r.e.c; ++c)
          if (a = bh({
              r: l,
              c
            }), (n = s ? (t[l] || [])[c] : t[a]) && null != n.v && "z" !== n.t) {
            switch (i = ["cell", a, "t"], n.t) {
              case "s":
              case "str":
                i.push(e(n.v));
                break;
              case "n":
                n.f ? (i[2] = "vtf", i[3] = "n", i[4] = n.v, i[5] = e(n.f)) : (i[2] = "v", i[3] = n.v);
                break;
              case "b":
                i[2] = "vt" + (n.f ? "f" : "c"), i[3] = "nl", i[4] = n.v ? "1" : "0", i[5] = e(n.f || (n.v ? "TRUE" :
                  "FALSE"));
                break;
              case "d":
                var d = pg(xg(n.v));
                i[2] = "vtc", i[3] = "nd", i[4] = "" + d, i[5] = n.w || ng(n.z || Sm[14], d);
                break;
              case "e":
                continue
            }
            o.push(i.join(":"))
          } return o.push("sheet:c:" + (r.e.c - r.s.c + 1) + ":r:" + (r.e.r - r.s.r + 1) + ":tvf:1"), o.push(
        "valueformat:1:text-wiki"), o.join("\n")
    }
    return {
      to_workbook: function(t, e) {
        return yh(n(t, e), e)
      },
      to_sheet: n,
      from_sheet: function(t) {
        return [o, i, a, i, s(t), r].join("\n")
      }
    }
  }(),
  ry = function() {
    function t(t, e, n, o, i) {
      i.raw ? e[n][o] = t : "" === t || ("TRUE" === t ? e[n][o] = !0 : "FALSE" === t ? e[n][o] = !1 : isNaN(Tg(t)) ?
        isNaN(Ag(t).getDate()) ? e[n][o] = t : e[n][o] = xg(t) : e[n][o] = Tg(t))
    }
    var e = {
        44: ",",
        9: "\t",
        59: ";",
        124: "|"
      },
      n = {
        44: 3,
        9: 2,
        59: 1,
        124: 0
      };

    function o(t) {
      for (var o = {}, i = !1, a = 0, r = 0; a < t.length; ++a) 34 == (r = t.charCodeAt(a)) ? i = !i : !i && r in e && (
        o[r] = (o[r] || 0) + 1);
      for (a in r = [], o) Object.prototype.hasOwnProperty.call(o, a) && r.push([o[a], a]);
      if (!r.length)
        for (a in o = n) Object.prototype.hasOwnProperty.call(o, a) && r.push([o[a], a]);
      return r.sort(function(t, e) {
        return t[0] - e[0] || n[t[1]] - n[e[1]]
      }), e[r.pop()[1]] || 44
    }

    function i(t, e) {
      var n = e || {},
        i = "",
        a = n.dense ? [] : {},
        r = {
          s: {
            c: 0,
            r: 0
          },
          e: {
            c: 0,
            r: 0
          }
        };
      "sep=" == t.slice(0, 4) ? 13 == t.charCodeAt(5) && 10 == t.charCodeAt(6) ? (i = t.charAt(4), t = t.slice(7)) :
        13 == t.charCodeAt(5) || 10 == t.charCodeAt(5) ? (i = t.charAt(4), t = t.slice(6)) : i = o(t.slice(0, 1024)) :
        i = n && n.FS ? n.FS : o(t.slice(0, 1024));
      var s = 0,
        l = 0,
        c = 0,
        d = 0,
        u = 0,
        p = i.charCodeAt(0),
        b = !1,
        m = 0,
        g = t.charCodeAt(0);
      t = t.replace(/\r\n/gm, "\n");
      var f, h, v = null != n.dateNF ? (f = n.dateNF, h = (h = "number" == typeof f ? Sm[f] : f).replace(rg, "(\\d+)"),
        new RegExp("^" + h + "$")) : null;

      function y() {
        var e = t.slice(d, u),
          o = {};
        if ('"' == e.charAt(0) && '"' == e.charAt(e.length - 1) && (e = e.slice(1, -1).replace(/""/g, '"')), 0 === e
          .length) o.t = "z";
        else if (n.raw) o.t = "s", o.v = e;
        else if (0 === e.trim().length) o.t = "s", o.v = e;
        else if (61 == e.charCodeAt(0)) 34 == e.charCodeAt(1) && 34 == e.charCodeAt(e.length - 1) ? (o.t = "s", o.v = e
          .slice(2, -1).replace(/""/g, '"')) : 1 != e.length ? (o.t = "n", o.f = e.slice(1)) : (o.t = "s", o.v = e);
        else if ("TRUE" == e) o.t = "b", o.v = !0;
        else if ("FALSE" == e) o.t = "b", o.v = !1;
        else if (isNaN(c = Tg(e)))
          if (!isNaN(Ag(e).getDate()) || v && e.match(v)) {
            o.z = n.dateNF || Sm[14];
            var i = 0;
            v && e.match(v) && (e = function(t, e, n) {
                var o = -1,
                  i = -1,
                  a = -1,
                  r = -1,
                  s = -1,
                  l = -1;
                (e.match(rg) || []).forEach(function(t, e) {
                  var c = parseInt(n[e + 1], 10);
                  switch (t.toLowerCase().charAt(0)) {
                    case "y":
                      o = c;
                      break;
                    case "d":
                      a = c;
                      break;
                    case "h":
                      r = c;
                      break;
                    case "s":
                      l = c;
                      break;
                    case "m":
                      r >= 0 ? s = c : i = c
                  }
                }), l >= 0 && -1 == s && i >= 0 && (s = i, i = -1);
                var c = ("" + (o >= 0 ? o : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (i >= 1 ? i : 1))
                  .slice(-2) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2);
                7 == c.length && (c = "0" + c), 8 == c.length && (c = "20" + c);
                var d = ("00" + (r >= 0 ? r : 0)).slice(-2) + ":" + ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + (
                  "00" + (l >= 0 ? l : 0)).slice(-2);
                return -1 == r && -1 == s && -1 == l ? c : -1 == o && -1 == i && -1 == a ? d : c + "T" + d
              }(0, n.dateNF, e.match(v) || []), i = 1), n.cellDates ? (o.t = "d", o.v = xg(e, i)) : (o.t = "n", o.v =
                pg(xg(e, i))), !1 !== n.cellText && (o.w = ng(o.z, o.v instanceof Date ? pg(o.v) : o.v)), n.cellNF ||
              delete o.z
          } else o.t = "s", o.v = e;
        else o.t = "n", !1 !== n.cellText && (o.w = e), o.v = c;
        if ("z" == o.t || (n.dense ? (a[s] || (a[s] = []), a[s][l] = o) : a[bh({
            c: l,
            r: s
          })] = o), d = u + 1, g = t.charCodeAt(d), r.e.c < l && (r.e.c = l), r.e.r < s && (r.e.r = s), m == p) ++l;
        else if (l = 0, ++s, n.sheetRows && n.sheetRows <= s) return !0
      }
      t: for (; u < t.length; ++u) switch (m = t.charCodeAt(u)) {
        case 34:
          34 === g && (b = !b);
          break;
        case p:
        case 10:
        case 13:
          if (!b && y()) break t
      }
      return u - d > 0 && y(), a["!ref"] = gh(r), a
    }

    function a(e, n) {
      return n && n.PRN ? n.FS || "sep=" == e.slice(0, 4) || e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(
        ";") >= 0 ? i(e, n) : xh(function(e, n) {
        var o = n || {},
          i = [];
        if (!e || 0 === e.length) return i;
        for (var a = e.split(/[\r\n]/), r = a.length - 1; r >= 0 && 0 === a[r].length;) --r;
        for (var s = 10, l = 0, c = 0; c <= r; ++c) - 1 == (l = a[c].indexOf(" ")) ? l = a[c].length : l++, s = Math
          .max(s, l);
        for (c = 0; c <= r; ++c) {
          i[c] = [];
          var d = 0;
          for (t(a[c].slice(0, s).trim(), i, c, d, o), d = 1; d <= (a[c].length - s) / 10 + 1; ++d) t(a[c].slice(s +
            10 * (d - 1), s + 10 * d).trim(), i, c, d, o)
        }
        return o.sheetRows && (i = i.slice(0, o.sheetRows)), i
      }(e, n), n) : i(e, n)
    }

    function r(t, e) {
      var n = "",
        o = "string" == e.type ? [0, 0, 0, 0] : Hw(t, e);
      switch (e.type) {
        case "base64":
          n = im(t);
          break;
        case "binary":
        case "string":
          n = t;
          break;
        case "buffer":
          65001 == e.codepage ? n = t.toString("utf8") : (e.codepage, n = am && Buffer.isBuffer(t) ? t.toString(
            "binary") : dm(t));
          break;
        case "array":
          n = wg(t);
          break;
        default:
          throw new Error("Unrecognized type " + e.type)
      }
      return 239 == o[0] && 187 == o[1] && 191 == o[2] ? n = rf(n.slice(3)) : "string" != e.type && "buffer" != e
        .type && 65001 == e.codepage ? n = rf(n) : e.type, "socialcalc:version:" == n.slice(0, 19) ? ay.to_sheet(
          "string" == e.type ? n : rf(n), e) : a(n, e)
    }
    return {
      to_workbook: function(t, e) {
        return yh(r(t, e), e)
      },
      to_sheet: r,
      from_sheet: function(t) {
        for (var e, n = [], o = fh(t["!ref"]), i = Array.isArray(t), a = o.s.r; a <= o.e.r; ++a) {
          for (var r = [], s = o.s.c; s <= o.e.c; ++s) {
            var l = bh({
              r: a,
              c: s
            });
            if ((e = i ? (t[a] || [])[s] : t[l]) && null != e.v) {
              for (var c = (e.w || (vh(e), e.w) || "").slice(0, 10); c.length < 10;) c += " ";
              r.push(c + (0 === s ? " " : ""))
            } else r.push("          ")
          }
          n.push(r.join(""))
        }
        return n.join("\n")
      }
    }
  }();
var sy = function() {
  function t(t, e, n) {
    if (t) {
      Qf(t, t.l || 0);
      for (var o = n.Enum || h; t.l < t.length;) {
        var i = t.read_shift(2),
          a = o[i] || o[65535],
          r = t.read_shift(2),
          s = t.l + r,
          l = a.f && a.f(t, r, n);
        if (t.l = s, e(l, a, i)) return
      }
    }
  }

  function e(e, n) {
    if (!e) return e;
    var o = n || {},
      i = o.dense ? [] : {},
      a = "Sheet1",
      r = "",
      s = 0,
      l = {},
      c = [],
      d = [],
      u = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: 0
        }
      },
      p = o.sheetRows || 0;
    if (0 == e[2] && (8 == e[3] || 9 == e[3]) && e.length >= 16 && 5 == e[14] && 108 === e[15]) throw new Error(
      "Unsupported Works 3 for Mac file");
    if (2 == e[2]) o.Enum = h, t(e, function(t, e, n) {
      switch (n) {
        case 0:
          o.vers = t, t >= 4096 && (o.qpro = !0);
          break;
        case 6:
          u = t;
          break;
        case 204:
          t && (r = t);
          break;
        case 222:
          r = t;
          break;
        case 15:
        case 51:
          o.qpro || (t[1].v = t[1].v.slice(1));
        case 13:
        case 14:
        case 16:
          14 == n && !(112 & ~t[2]) && (15 & t[2]) > 1 && (15 & t[2]) < 15 && (t[1].z = o.dateNF || Sm[14], o
            .cellDates && (t[1].t = "d", t[1].v = fg(t[1].v))), o.qpro && t[3] > s && (i["!ref"] = gh(u), l[a] =
            i, c.push(a), i = o.dense ? [] : {}, u = {
              s: {
                r: 0,
                c: 0
              },
              e: {
                r: 0,
                c: 0
              }
            }, s = t[3], a = r || "Sheet" + (s + 1), r = "");
          var d = o.dense ? (i[t[0].r] || [])[t[0].c] : i[bh(t[0])];
          if (d) {
            d.t = t[1].t, d.v = t[1].v, null != t[1].z && (d.z = t[1].z), null != t[1].f && (d.f = t[1].f);
            break
          }
          o.dense ? (i[t[0].r] || (i[t[0].r] = []), i[t[0].r][t[0].c] = t[1]) : i[bh(t[0])] = t[1]
      }
    }, o);
    else {
      if (26 != e[2] && 14 != e[2]) throw new Error("Unrecognized LOTUS BOF " + e[2]);
      o.Enum = v, 14 == e[2] && (o.qpro = !0, e.l = 0), t(e, function(t, e, n) {
        switch (n) {
          case 204:
            a = t;
            break;
          case 22:
            t[1].v = t[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (t[3] > s && (i["!ref"] = gh(u), l[a] = i, c.push(a), i = o.dense ? [] : {}, u = {
                s: {
                  r: 0,
                  c: 0
                },
                e: {
                  r: 0,
                  c: 0
                }
              }, s = t[3], a = "Sheet" + (s + 1)), p > 0 && t[0].r >= p) break;
            o.dense ? (i[t[0].r] || (i[t[0].r] = []), i[t[0].r][t[0].c] = t[1]) : i[bh(t[0])] = t[1], u.e.c < t[0]
              .c && (u.e.c = t[0].c), u.e.r < t[0].r && (u.e.r = t[0].r);
            break;
          case 27:
            t[14e3] && (d[t[14e3][0]] = t[14e3][1]);
            break;
          case 1537:
            d[t[0]] = t[1], t[0] == s && (a = t[1])
        }
      }, o)
    }
    if (i["!ref"] = gh(u), l[r || a] = i, c.push(r || a), !d.length) return {
      SheetNames: c,
      Sheets: l
    };
    for (var b = {}, m = [], g = 0; g < d.length; ++g) l[c[g]] ? (m.push(d[g] || c[g]), b[d[g]] = l[d[g]] || l[c[
      g]]) : (m.push(d[g]), b[d[g]] = {
        "!ref": "A1"
      });
    return {
      SheetNames: m,
      Sheets: b
    }
  }

  function n(t, e, n) {
    var o = [{
      c: 0,
      r: 0
    }, {
      t: "n",
      v: 0
    }, 0, 0];
    return n.qpro && 20768 != n.vers ? (o[0].c = t.read_shift(1), o[3] = t.read_shift(1), o[0].r = t.read_shift(2), t
      .l += 2) : (o[2] = t.read_shift(1), o[0].c = t.read_shift(2), o[0].r = t.read_shift(2)), o
  }

  function o(t, e, o) {
    var i = t.l + e,
      a = n(t, 0, o);
    if (a[1].t = "s", 20768 == o.vers) {
      t.l++;
      var r = t.read_shift(1);
      return a[1].v = t.read_shift(r, "utf8"), a
    }
    return o.qpro && t.l++, a[1].v = t.read_shift(i - t.l, "cstr"), a
  }

  function i(t, e, n) {
    var o = eh(7 + n.length);
    o.write_shift(1, 255), o.write_shift(2, e), o.write_shift(2, t), o.write_shift(1, 39);
    for (var i = 0; i < o.length; ++i) {
      var a = n.charCodeAt(i);
      o.write_shift(1, a >= 128 ? 95 : a)
    }
    return o.write_shift(1, 0), o
  }

  function a(t, e, n) {
    var o = eh(7);
    return o.write_shift(1, 255), o.write_shift(2, e), o.write_shift(2, t), o.write_shift(2, n, "i"), o
  }

  function r(t, e, n) {
    var o = eh(13);
    return o.write_shift(1, 255), o.write_shift(2, e), o.write_shift(2, t), o.write_shift(8, n, "f"), o
  }

  function s(t, e, n) {
    var o = 32768 & e;
    return e = (o ? t : 0) + ((e &= -32769) >= 8192 ? e - 16384 : e), (o ? "" : "$") + (n ? uh(e) : ch(e))
  }
  var l = {
      51: ["FALSE", 0],
      52: ["TRUE", 0],
      70: ["LEN", 1],
      80: ["SUM", 69],
      81: ["AVERAGEA", 69],
      82: ["COUNTA", 69],
      83: ["MINA", 69],
      84: ["MAXA", 69],
      111: ["T", 1]
    },
    c = ["", "", "", "", "", "", "", "", "", "+", "-", "*", "/", "^", "=", "<>", "<=", ">=", "<", ">", "", "", "", "",
      "&", "", "", "", "", "", "", ""
    ];

  function d(t) {
    var e = [{
      c: 0,
      r: 0
    }, {
      t: "n",
      v: 0
    }, 0];
    return e[0].r = t.read_shift(2), e[3] = t[t.l++], e[0].c = t[t.l++], e
  }

  function u(t, e, n, o) {
    var i = eh(6 + o.length);
    i.write_shift(2, t), i.write_shift(1, n), i.write_shift(1, e), i.write_shift(1, 39);
    for (var a = 0; a < o.length; ++a) {
      var r = o.charCodeAt(a);
      i.write_shift(1, r >= 128 ? 95 : r)
    }
    return i.write_shift(1, 0), i
  }

  function p(t, e) {
    var n = d(t),
      o = t.read_shift(4),
      i = t.read_shift(4),
      a = t.read_shift(2);
    if (65535 == a) return 0 === o && 3221225472 === i ? (n[1].t = "e", n[1].v = 15) : 0 === o && 3489660928 === i ? (
      n[1].t = "e", n[1].v = 42) : n[1].v = 0, n;
    var r = 32768 & a;
    return a = (32767 & a) - 16446, n[1].v = (1 - 2 * r) * (i * Math.pow(2, a + 32) + o * Math.pow(2, a)), n
  }

  function b(t, e, n, o) {
    var i = eh(14);
    if (i.write_shift(2, t), i.write_shift(1, n), i.write_shift(1, e), 0 == o) return i.write_shift(4, 0), i
      .write_shift(4, 0), i.write_shift(2, 65535), i;
    var a, r = 0,
      s = 0,
      l = 0;
    return o < 0 && (r = 1, o = -o), s = 0 | Math.log2(o), 2147483648 & (l = (o /= Math.pow(2, s - 31)) >>> 0) || (++
      s, l = (o /= 2) >>> 0), o -= l, l |= 2147483648, l >>>= 0, a = (o *= Math.pow(2, 32)) >>> 0, i.write_shift(4,
      a), i.write_shift(4, l), s += 16383 + (r ? 32768 : 0), i.write_shift(2, s), i
  }

  function m(t, e) {
    var n = d(t),
      o = t.read_shift(8, "f");
    return n[1].v = o, n
  }

  function g(t, e) {
    return 0 == t[t.l + e - 1] ? t.read_shift(e, "cstr") : ""
  }

  function f(t, e) {
    var n = eh(5 + t.length);
    n.write_shift(2, 14e3), n.write_shift(2, e);
    for (var o = 0; o < t.length; ++o) {
      var i = t.charCodeAt(o);
      n[n.l++] = i > 127 ? 95 : i
    }
    return n[n.l++] = 0, n
  }
  var h = {
      0: {
        n: "BOF",
        f: yv
      },
      1: {
        n: "EOF"
      },
      2: {
        n: "CALCMODE"
      },
      3: {
        n: "CALCORDER"
      },
      4: {
        n: "SPLIT"
      },
      5: {
        n: "SYNC"
      },
      6: {
        n: "RANGE",
        f: function(t, e, n) {
          var o = {
            s: {
              c: 0,
              r: 0
            },
            e: {
              c: 0,
              r: 0
            }
          };
          return 8 == e && n.qpro ? (o.s.c = t.read_shift(1), t.l++, o.s.r = t.read_shift(2), o.e.c = t.read_shift(
            1), t.l++, o.e.r = t.read_shift(2), o) : (o.s.c = t.read_shift(2), o.s.r = t.read_shift(2), 12 == e &&
            n.qpro && (t.l += 2), o.e.c = t.read_shift(2), o.e.r = t.read_shift(2), 12 == e && n.qpro && (t.l +=
              2), 65535 == o.s.c && (o.s.c = o.e.c = o.s.r = o.e.r = 0), o)
        }
      },
      7: {
        n: "WINDOW1"
      },
      8: {
        n: "COLW1"
      },
      9: {
        n: "WINTWO"
      },
      10: {
        n: "COLW2"
      },
      11: {
        n: "NAME"
      },
      12: {
        n: "BLANK"
      },
      13: {
        n: "INTEGER",
        f: function(t, e, o) {
          var i = n(t, 0, o);
          return i[1].v = t.read_shift(2, "i"), i
        }
      },
      14: {
        n: "NUMBER",
        f: function(t, e, o) {
          var i = n(t, 0, o);
          return i[1].v = t.read_shift(8, "f"), i
        }
      },
      15: {
        n: "LABEL",
        f: o
      },
      16: {
        n: "FORMULA",
        f: function(t, e, o) {
          var i = t.l + e,
            a = n(t, 0, o);
          if (a[1].v = t.read_shift(8, "f"), o.qpro) t.l = i;
          else {
            var r = t.read_shift(2);
            ! function(t, e) {
              Qf(t, 0);
              var n = [],
                o = 0,
                i = "",
                a = "",
                r = "",
                d = "";
              for (; t.l < t.length;) {
                var u = t[t.l++];
                switch (u) {
                  case 0:
                    n.push(t.read_shift(8, "f"));
                    break;
                  case 1:
                    a = s(e[0].c, t.read_shift(2), !0), i = s(e[0].r, t.read_shift(2), !1), n.push(a + i);
                    break;
                  case 2:
                    var p = s(e[0].c, t.read_shift(2), !0),
                      b = s(e[0].r, t.read_shift(2), !1);
                    a = s(e[0].c, t.read_shift(2), !0), i = s(e[0].r, t.read_shift(2), !1), n.push(p + b + ":" + a +
                      i);
                    break;
                  case 3:
                    if (t.l < t.length) return;
                    break;
                  case 4:
                    n.push("(" + n.pop() + ")");
                    break;
                  case 5:
                    n.push(t.read_shift(2));
                    break;
                  case 6:
                    for (var m = ""; u = t[t.l++];) m += String.fromCharCode(u);
                    n.push('"' + m.replace(/"/g, '""') + '"');
                    break;
                  case 8:
                    n.push("-" + n.pop());
                    break;
                  case 23:
                    n.push("+" + n.pop());
                    break;
                  case 22:
                    n.push("NOT(" + n.pop() + ")");
                    break;
                  case 20:
                  case 21:
                    d = n.pop(), r = n.pop(), n.push(["AND", "OR"][u - 20] + "(" + r + "," + d + ")");
                    break;
                  default:
                    if (u < 32 && c[u]) d = n.pop(), r = n.pop(), n.push(r + c[u] + d);
                    else {
                      if (!l[u]) return;
                      if (69 == (o = l[u][1]) && (o = t[t.l++]), o > n.length) return;
                      var g = n.slice(-o);
                      n.length -= o, n.push(l[u][0] + "(" + g.join(",") + ")")
                    }
                }
              }
              1 == n.length && (e[1].f = "" + n[0])
            }(t.slice(t.l, t.l + r), a), t.l += r
          }
          return a
        }
      },
      24: {
        n: "TABLE"
      },
      25: {
        n: "ORANGE"
      },
      26: {
        n: "PRANGE"
      },
      27: {
        n: "SRANGE"
      },
      28: {
        n: "FRANGE"
      },
      29: {
        n: "KRANGE1"
      },
      32: {
        n: "HRANGE"
      },
      35: {
        n: "KRANGE2"
      },
      36: {
        n: "PROTEC"
      },
      37: {
        n: "FOOTER"
      },
      38: {
        n: "HEADER"
      },
      39: {
        n: "SETUP"
      },
      40: {
        n: "MARGINS"
      },
      41: {
        n: "LABELFMT"
      },
      42: {
        n: "TITLES"
      },
      43: {
        n: "SHEETJS"
      },
      45: {
        n: "GRAPH"
      },
      46: {
        n: "NGRAPH"
      },
      47: {
        n: "CALCCOUNT"
      },
      48: {
        n: "UNFORMATTED"
      },
      49: {
        n: "CURSORW12"
      },
      50: {
        n: "WINDOW"
      },
      51: {
        n: "STRING",
        f: o
      },
      55: {
        n: "PASSWORD"
      },
      56: {
        n: "LOCKED"
      },
      60: {
        n: "QUERY"
      },
      61: {
        n: "QUERYNAME"
      },
      62: {
        n: "PRINT"
      },
      63: {
        n: "PRINTNAME"
      },
      64: {
        n: "GRAPH2"
      },
      65: {
        n: "GRAPHNAME"
      },
      66: {
        n: "ZOOM"
      },
      67: {
        n: "SYMSPLIT"
      },
      68: {
        n: "NSROWS"
      },
      69: {
        n: "NSCOLS"
      },
      70: {
        n: "RULER"
      },
      71: {
        n: "NNAME"
      },
      72: {
        n: "ACOMM"
      },
      73: {
        n: "AMACRO"
      },
      74: {
        n: "PARSE"
      },
      102: {
        n: "PRANGES??"
      },
      103: {
        n: "RRANGES??"
      },
      104: {
        n: "FNAME??"
      },
      105: {
        n: "MRANGES??"
      },
      204: {
        n: "SHEETNAMECS",
        f: g
      },
      222: {
        n: "SHEETNAMELP",
        f: function(t, e) {
          var n = t[t.l++];
          n > e - 1 && (n = e - 1);
          for (var o = ""; o.length < n;) o += String.fromCharCode(t[t.l++]);
          return o
        }
      },
      65535: {
        n: ""
      }
    },
    v = {
      0: {
        n: "BOF"
      },
      1: {
        n: "EOF"
      },
      2: {
        n: "PASSWORD"
      },
      3: {
        n: "CALCSET"
      },
      4: {
        n: "WINDOWSET"
      },
      5: {
        n: "SHEETCELLPTR"
      },
      6: {
        n: "SHEETLAYOUT"
      },
      7: {
        n: "COLUMNWIDTH"
      },
      8: {
        n: "HIDDENCOLUMN"
      },
      9: {
        n: "USERRANGE"
      },
      10: {
        n: "SYSTEMRANGE"
      },
      11: {
        n: "ZEROFORCE"
      },
      12: {
        n: "SORTKEYDIR"
      },
      13: {
        n: "FILESEAL"
      },
      14: {
        n: "DATAFILLNUMS"
      },
      15: {
        n: "PRINTMAIN"
      },
      16: {
        n: "PRINTSTRING"
      },
      17: {
        n: "GRAPHMAIN"
      },
      18: {
        n: "GRAPHSTRING"
      },
      19: {
        n: "??"
      },
      20: {
        n: "ERRCELL"
      },
      21: {
        n: "NACELL"
      },
      22: {
        n: "LABEL16",
        f: function(t, e) {
          var n = d(t);
          return n[1].t = "s", n[1].v = t.read_shift(e - 4, "cstr"), n
        }
      },
      23: {
        n: "NUMBER17",
        f: p
      },
      24: {
        n: "NUMBER18",
        f: function(t, e) {
          var n = d(t);
          n[1].v = t.read_shift(2);
          var o = n[1].v >> 1;
          if (1 & n[1].v) switch (7 & o) {
            case 0:
              o = 5e3 * (o >> 3);
              break;
            case 1:
              o = 500 * (o >> 3);
              break;
            case 2:
              o = (o >> 3) / 20;
              break;
            case 3:
              o = (o >> 3) / 200;
              break;
            case 4:
              o = (o >> 3) / 2e3;
              break;
            case 5:
              o = (o >> 3) / 2e4;
              break;
            case 6:
              o = (o >> 3) / 16;
              break;
            case 7:
              o = (o >> 3) / 64
          }
          return n[1].v = o, n
        }
      },
      25: {
        n: "FORMULA19",
        f: function(t, e) {
          var n = p(t);
          return t.l += e - 14, n
        }
      },
      26: {
        n: "FORMULA1A"
      },
      27: {
        n: "XFORMAT",
        f: function(t, e) {
          for (var n = {}, o = t.l + e; t.l < o;) {
            var i = t.read_shift(2);
            if (14e3 == i) {
              for (n[i] = [0, ""], n[i][0] = t.read_shift(2); t[t.l];) n[i][1] += String.fromCharCode(t[t.l]), t
              .l++;
              t.l++
            }
          }
          return n
        }
      },
      28: {
        n: "DTLABELMISC"
      },
      29: {
        n: "DTLABELCELL"
      },
      30: {
        n: "GRAPHWINDOW"
      },
      31: {
        n: "CPA"
      },
      32: {
        n: "LPLAUTO"
      },
      33: {
        n: "QUERY"
      },
      34: {
        n: "HIDDENSHEET"
      },
      35: {
        n: "??"
      },
      37: {
        n: "NUMBER25",
        f: function(t, e) {
          var n = d(t),
            o = t.read_shift(4);
          return n[1].v = o >> 6, n
        }
      },
      38: {
        n: "??"
      },
      39: {
        n: "NUMBER27",
        f: m
      },
      40: {
        n: "FORMULA28",
        f: function(t, e) {
          var n = m(t);
          return t.l += e - 10, n
        }
      },
      142: {
        n: "??"
      },
      147: {
        n: "??"
      },
      150: {
        n: "??"
      },
      151: {
        n: "??"
      },
      152: {
        n: "??"
      },
      153: {
        n: "??"
      },
      154: {
        n: "??"
      },
      155: {
        n: "??"
      },
      156: {
        n: "??"
      },
      163: {
        n: "??"
      },
      174: {
        n: "??"
      },
      175: {
        n: "??"
      },
      176: {
        n: "??"
      },
      177: {
        n: "??"
      },
      184: {
        n: "??"
      },
      185: {
        n: "??"
      },
      186: {
        n: "??"
      },
      187: {
        n: "??"
      },
      188: {
        n: "??"
      },
      195: {
        n: "??"
      },
      201: {
        n: "??"
      },
      204: {
        n: "SHEETNAMECS",
        f: g
      },
      205: {
        n: "??"
      },
      206: {
        n: "??"
      },
      207: {
        n: "??"
      },
      208: {
        n: "??"
      },
      256: {
        n: "??"
      },
      259: {
        n: "??"
      },
      260: {
        n: "??"
      },
      261: {
        n: "??"
      },
      262: {
        n: "??"
      },
      263: {
        n: "??"
      },
      265: {
        n: "??"
      },
      266: {
        n: "??"
      },
      267: {
        n: "??"
      },
      268: {
        n: "??"
      },
      270: {
        n: "??"
      },
      271: {
        n: "??"
      },
      384: {
        n: "??"
      },
      389: {
        n: "??"
      },
      390: {
        n: "??"
      },
      393: {
        n: "??"
      },
      396: {
        n: "??"
      },
      512: {
        n: "??"
      },
      514: {
        n: "??"
      },
      513: {
        n: "??"
      },
      516: {
        n: "??"
      },
      517: {
        n: "??"
      },
      640: {
        n: "??"
      },
      641: {
        n: "??"
      },
      642: {
        n: "??"
      },
      643: {
        n: "??"
      },
      644: {
        n: "??"
      },
      645: {
        n: "??"
      },
      646: {
        n: "??"
      },
      647: {
        n: "??"
      },
      648: {
        n: "??"
      },
      658: {
        n: "??"
      },
      659: {
        n: "??"
      },
      660: {
        n: "??"
      },
      661: {
        n: "??"
      },
      662: {
        n: "??"
      },
      665: {
        n: "??"
      },
      666: {
        n: "??"
      },
      768: {
        n: "??"
      },
      772: {
        n: "??"
      },
      1537: {
        n: "SHEETINFOQP",
        f: function(t, e, n) {
          if (n.qpro && !(e < 21)) {
            var o = t.read_shift(1);
            return t.l += 17, t.l += 1, t.l += 2, [o, t.read_shift(e - 21, "cstr")]
          }
        }
      },
      1600: {
        n: "??"
      },
      1602: {
        n: "??"
      },
      1793: {
        n: "??"
      },
      1794: {
        n: "??"
      },
      1795: {
        n: "??"
      },
      1796: {
        n: "??"
      },
      1920: {
        n: "??"
      },
      2048: {
        n: "??"
      },
      2049: {
        n: "??"
      },
      2052: {
        n: "??"
      },
      2688: {
        n: "??"
      },
      10998: {
        n: "??"
      },
      12849: {
        n: "??"
      },
      28233: {
        n: "??"
      },
      28484: {
        n: "??"
      },
      65535: {
        n: ""
      }
    };
  return {
    sheet_to_wk1: function(t, e) {
      var n = e || {};
      if (+n.codepage >= 0 && qb(+n.codepage), "string" == n.type) throw new Error("Cannot write WK1 to JS string");
      var o, s, l = oh(),
        c = fh(t["!ref"]),
        d = Array.isArray(t),
        u = [];
      uw(l, 0, (o = 1030, (s = eh(2)).write_shift(2, o), s)), uw(l, 6, function(t) {
        var e = eh(8);
        return e.write_shift(2, t.s.c), e.write_shift(2, t.s.r), e.write_shift(2, t.e.c), e.write_shift(2, t.e
          .r), e
      }(c));
      for (var p = Math.min(c.e.r, 8191), b = c.s.r; b <= p; ++b)
        for (var m = ch(b), g = c.s.c; g <= c.e.c; ++g) {
          b === c.s.r && (u[g] = uh(g));
          var f = u[g] + m,
            h = d ? (t[b] || [])[g] : t[f];
          if (h && "z" != h.t)
            if ("n" == h.t)(0 | h.v) == h.v && h.v >= -32768 && h.v <= 32767 ? uw(l, 13, a(b, g, h.v)) : uw(l, 14,
              r(b, g, h.v));
            else uw(l, 15, i(b, g, vh(h).slice(0, 239)))
        }
      return uw(l, 1), l.end()
    },
    book_to_wk3: function(t, e) {
      var n = e || {};
      if (+n.codepage >= 0 && qb(+n.codepage), "string" == n.type) throw new Error("Cannot write WK3 to JS string");
      var o = oh();
      uw(o, 0, function(t) {
        var e = eh(26);
        e.write_shift(2, 4096), e.write_shift(2, 4), e.write_shift(4, 0);
        for (var n = 0, o = 0, i = 0, a = 0; a < t.SheetNames.length; ++a) {
          var r = t.SheetNames[a],
            s = t.Sheets[r];
          if (s && s["!ref"]) {
            ++i;
            var l = mh(s["!ref"]);
            n < l.e.r && (n = l.e.r), o < l.e.c && (o = l.e.c)
          }
        }
        n > 8191 && (n = 8191);
        return e.write_shift(2, n), e.write_shift(1, i), e.write_shift(1, o), e.write_shift(2, 0), e
          .write_shift(2, 0), e.write_shift(1, 1), e.write_shift(1, 2), e.write_shift(4, 0), e.write_shift(4,
          0), e
      }(t));
      for (var i = 0, a = 0; i < t.SheetNames.length; ++i)(t.Sheets[t.SheetNames[i]] || {})["!ref"] && uw(o, 27, f(t
        .SheetNames[i], a++));
      var r = 0;
      for (i = 0; i < t.SheetNames.length; ++i) {
        var s = t.Sheets[t.SheetNames[i]];
        if (s && s["!ref"]) {
          for (var l = fh(s["!ref"]), c = Array.isArray(s), d = [], p = Math.min(l.e.r, 8191), m = l.s.r; m <= p; ++
            m)
            for (var g = ch(m), h = l.s.c; h <= l.e.c; ++h) {
              m === l.s.r && (d[h] = uh(h));
              var v = d[h] + g,
                y = c ? (s[m] || [])[h] : s[v];
              if (y && "z" != y.t)
                if ("n" == y.t) uw(o, 23, b(m, h, r, y.v));
                else uw(o, 22, u(m, h, r, vh(y).slice(0, 239)))
            }++r
        }
      }
      return uw(o, 1), o.end()
    },
    to_workbook: function(t, n) {
      switch (n.type) {
        case "base64":
          return e(cm(im(t)), n);
        case "binary":
          return e(cm(t), n);
        case "buffer":
        case "array":
          return e(t, n)
      }
      throw "Unsupported type " + n.type
    }
  }
}();
var ly = function() {
    var t = lf("t"),
      e = lf("rPr");

    function n(n) {
      var o = n.match(t);
      if (!o) return {
        t: "s",
        v: ""
      };
      var i = {
          t: "s",
          v: Yg(o[1])
        },
        a = n.match(e);
      return a && (i.s = function(t) {
        var e = {},
          n = t.match(Ug),
          o = 0,
          i = !1;
        if (n)
          for (; o != n.length; ++o) {
            var a = Gg(n[o]);
            switch (a[0].replace(/\w*:/g, "")) {
              case "<condense":
              case "<extend":
                break;
              case "<shadow":
                if (!a.val) break;
              case "<shadow>":
              case "<shadow/>":
                e.shadow = 1;
                break;
              case "</shadow>":
                break;
              case "<charset":
                if ("1" == a.val) break;
                e.cp = Kb[parseInt(a.val, 10)];
                break;
              case "<outline":
                if (!a.val) break;
              case "<outline>":
              case "<outline/>":
                e.outline = 1;
                break;
              case "</outline>":
                break;
              case "<rFont":
                e.name = a.val;
                break;
              case "<sz":
                e.sz = a.val;
                break;
              case "<strike":
                if (!a.val) break;
              case "<strike>":
              case "<strike/>":
                e.strike = 1;
                break;
              case "</strike>":
                break;
              case "<u":
                if (!a.val) break;
                switch (a.val) {
                  case "double":
                    e.uval = "double";
                    break;
                  case "singleAccounting":
                    e.uval = "single-accounting";
                    break;
                  case "doubleAccounting":
                    e.uval = "double-accounting"
                }
              case "<u>":
              case "<u/>":
                e.u = 1;
                break;
              case "</u>":
                break;
              case "<b":
                if ("0" == a.val) break;
              case "<b>":
              case "<b/>":
                e.b = 1;
                break;
              case "</b>":
                break;
              case "<i":
                if ("0" == a.val) break;
              case "<i>":
              case "<i/>":
                e.i = 1;
                break;
              case "</i>":
                break;
              case "<color":
                a.rgb && (e.color = a.rgb.slice(2, 8));
                break;
              case "<color>":
              case "<color/>":
              case "</color>":
                break;
              case "<family":
                e.family = a.val;
                break;
              case "<family>":
              case "<family/>":
              case "</family>":
                break;
              case "<vertAlign":
                e.valign = a.val;
                break;
              case "<vertAlign>":
              case "<vertAlign/>":
              case "</vertAlign>":
              case "<scheme":
              case "<scheme>":
              case "<scheme/>":
              case "</scheme>":
              case "<extLst":
              case "<extLst>":
              case "</extLst>":
                break;
              case "<ext":
                i = !0;
                break;
              case "</ext>":
                i = !1;
                break;
              default:
                if (47 !== a[0].charCodeAt(1) && !i) throw new Error("Unrecognized rich format " + a[0])
            }
          }
        return e
      }(a[1])), i
    }
    var o = /<(?:\w+:)?r>/g,
      i = /<\/(?:\w+:)?r>/;
    return function(t) {
      return t.replace(o, "").split(i).map(n).filter(function(t) {
        return t.v
      })
    }
  }(),
  cy = function() {
    var t = /(\r\n|\n)/g;

    function e(e) {
      var n = [
        [], e.v, []
      ];
      return e.v ? (e.s && function(t, e, n) {
        var o = [];
        t.u && o.push("text-decoration: underline;"), t.uval && o.push("text-underline-style:" + t.uval + ";"), t
          .sz && o.push("font-size:" + t.sz + "pt;"), t.outline && o.push("text-effect: outline;"), t.shadow && o
          .push("text-shadow: auto;"), e.push('<span style="' + o.join("") + '">'), t.b && (e.push("<b>"), n.push(
            "</b>")), t.i && (e.push("<i>"), n.push("</i>")), t.strike && (e.push("<s>"), n.push("</s>"));
        var i = t.valign || "";
        "superscript" == i || "super" == i ? i = "sup" : "subscript" == i && (i = "sub"), "" != i && (e.push("<" +
          i + ">"), n.push("</" + i + ">")), n.push("</span>")
      }(e.s, n[0], n[2]), n[0].join("") + n[1].replace(t, "<br/>") + n[2].join("")) : ""
    }
    return function(t) {
      return t.map(e).join("")
    }
  }(),
  dy = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
  uy = /<(?:\w+:)?r>/,
  py = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

function by(t, e) {
  var n = !e || e.cellHTML,
    o = {};
  return t ? (t.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (o.t = Yg(rf(t.slice(t.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] ||
    "")), o.r = rf(t), n && (o.h = Zg(o.t))) : t.match(uy) && (o.r = rf(t), o.t = Yg(rf((t.replace(py, "").match(
    dy) || []).join("").replace(Ug, ""))), n && (o.h = cy(ly(o.r)))), o) : {
    t: ""
  }
}
var my = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/,
  gy = /<(?:\w+:)?(?:si|sstItem)>/g,
  fy = /<\/(?:\w+:)?(?:si|sstItem)>/;

function hy(t) {
  for (var e = [], n = t.split(""), o = 0; o < n.length; ++o) e[o] = n[o].charCodeAt(0);
  return e
}

function vy(t, e) {
  var n = {};
  return n.Major = t.read_shift(2), n.Minor = t.read_shift(2), e >= 4 && (t.l += e - 4), n
}

function yy(t) {
  for (var e = t.read_shift(4), n = t.l + e - 4, o = {}, i = t.read_shift(4), a = []; i-- > 0;) a.push({
    t: t.read_shift(4),
    v: t.read_shift(0, "lpp4")
  });
  if (o.name = t.read_shift(0, "lpp4"), o.comps = a, t.l != n) throw new Error("Bad DataSpaceMapEntry: " + t.l +
    " != " + n);
  return o
}

function ky(t) {
  var e = function(t) {
    var e = {};
    return t.read_shift(4), t.l += 4, e.id = t.read_shift(0, "lpp4"), e.name = t.read_shift(0, "lpp4"), e.R = vy(t,
      4), e.U = vy(t, 4), e.W = vy(t, 4), e
  }(t);
  if (e.ename = t.read_shift(0, "8lpp4"), e.blksz = t.read_shift(4), e.cmode = t.read_shift(4), 4 != t.read_shift(4))
    throw new Error("Bad !Primary record");
  return e
}

function xy(t, e) {
  var n = t.l + e,
    o = {};
  o.Flags = 63 & t.read_shift(4), t.l += 4, o.AlgID = t.read_shift(4);
  var i = !1;
  switch (o.AlgID) {
    case 26126:
    case 26127:
    case 26128:
      i = 36 == o.Flags;
      break;
    case 26625:
      i = 4 == o.Flags;
      break;
    case 0:
      i = 16 == o.Flags || 4 == o.Flags || 36 == o.Flags;
      break;
    default:
      throw "Unrecognized encryption algorithm: " + o.AlgID
  }
  if (!i) throw new Error("Encryption Flags/AlgID mismatch");
  return o.AlgIDHash = t.read_shift(4), o.KeySize = t.read_shift(4), o.ProviderType = t.read_shift(4), t.l += 8, o
    .CSPName = t.read_shift(n - t.l >> 1, "utf16le"), t.l = n, o
}

function wy(t, e) {
  var n = {},
    o = t.l + e;
  return t.l += 4, n.Salt = t.slice(t.l, t.l + 16), t.l += 16, n.Verifier = t.slice(t.l, t.l + 16), t.l += 16, t
    .read_shift(4), n.VerifierHash = t.slice(t.l, o), t.l = o, n
}

function Cy(t) {
  if (36 != (63 & t.read_shift(4))) throw new Error("EncryptionInfo mismatch");
  var e = t.read_shift(4);
  return {
    t: "Std",
    h: xy(t, e),
    v: wy(t, t.length - t.l)
  }
}

function Sy() {
  throw new Error("File is password-protected: ECMA-376 Extensible")
}

function Ty(t) {
  var e = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm",
    "saltValue"
  ];
  t.l += 4;
  var n = t.read_shift(t.length - t.l, "utf8"),
    o = {};
  return n.replace(Ug, function(t) {
    var n = Gg(t);
    switch (Kg(n[0])) {
      case "<?xml":
      case "<encryption":
      case "</encryption>":
      case "</keyEncryptors>":
      case "</keyEncryptor>":
        break;
      case "<keyData":
        e.forEach(function(t) {
          o[t] = n[t]
        });
        break;
      case "<dataIntegrity":
        o.encryptedHmacKey = n.encryptedHmacKey, o.encryptedHmacValue = n.encryptedHmacValue;
        break;
      case "<keyEncryptors>":
      case "<keyEncryptors":
        o.encs = [];
        break;
      case "<keyEncryptor":
        o.uri = n.uri;
        break;
      case "<encryptedKey":
        o.encs.push(n);
        break;
      default:
        throw n[0]
    }
  }), o
}
var Iy = function() {
    var t = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0],
      e = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163],
      n = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763,
        35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614,
        21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004,
        24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824,
        35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243,
        7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532,
        4129, 8258, 16516, 33032, 4657, 9314, 18628
      ],
      o = function(t, e) {
        return 255 & ((n = t ^ e) / 2 | 128 * n);
        var n
      };
    return function(i) {
      for (var a, r, s, l = hy(i), c = function(t) {
          for (var o = e[t.length - 1], i = 104, a = t.length - 1; a >= 0; --a)
            for (var r = t[a], s = 0; 7 != s; ++s) 64 & r && (o ^= n[i]), r *= 2, --i;
          return o
        }(l), d = l.length, u = sm(16), p = 0; 16 != p; ++p) u[p] = 0;
      for (1 & ~d || (a = c >> 8, u[d] = o(t[0], a), --d, a = 255 & c, r = l[l.length - 1], u[d] = o(r, a)); d > 0;)
        a = c >> 8, u[--d] = o(l[d], a), a = 255 & c, u[--d] = o(l[d], a);
      for (d = 15, s = 15 - l.length; s > 0;) a = c >> 8, u[d] = o(t[s], a), --s, a = 255 & c, u[--d] = o(l[d], a), --
        d, --s;
      return u
    }
  }(),
  Ay = function(t) {
    var e = 0,
      n = Iy(t);
    return function(t) {
      var o = function(t, e, n, o, i) {
        var a, r;
        for (i || (i = e), o || (o = Iy(t)), a = 0; a != e.length; ++a) r = e[a], r = 255 & ((r ^= o[n]) >> 5 | r <<
          3), i[a] = r, ++n;
        return [i, n, o]
      }("", t, e, n);
      return e = o[1], o[0]
    }
  };

function Ey(t, e, n, o) {
  var i = {
    key: yv(t),
    verificationBytes: yv(t)
  };
  return n.password && (i.verifier = function(t) {
    var e, n, o = 0,
      i = hy(t),
      a = i.length + 1;
    for ((e = sm(a))[0] = i.length, n = 1; n != a; ++n) e[n] = i[n - 1];
    for (n = a - 1; n >= 0; --n) o = ((16384 & o ? 1 : 0) | o << 1 & 32767) ^ e[n];
    return 52811 ^ o
  }(n.password)), o.valid = i.verificationBytes === i.verifier, o.valid && (o.insitu = Ay(n.password)), i
}

function Py(t, e, n) {
  var o = n || {};
  return o.Info = t.read_shift(2), t.l -= 2, 1 === o.Info ? o.Data = function(t) {
    var e = {},
      n = e.EncryptionVersionInfo = vy(t, 4);
    if (1 != n.Major || 1 != n.Minor) throw "unrecognized version code " + n.Major + " : " + n.Minor;
    return e.Salt = t.read_shift(16), e.EncryptedVerifier = t.read_shift(16), e.EncryptedVerifierHash = t.read_shift(
      16), e
  }(t) : o.Data = function(t, e) {
    var n = {},
      o = n.EncryptionVersionInfo = vy(t, 4);
    if (e -= 4, 2 != o.Minor) throw new Error("unrecognized minor version code: " + o.Minor);
    if (o.Major > 4 || o.Major < 2) throw new Error("unrecognized major version code: " + o.Major);
    n.Flags = t.read_shift(4), e -= 4;
    var i = t.read_shift(4);
    return e -= 4, n.EncryptionHeader = xy(t, i), e -= i, n.EncryptionVerifier = wy(t, e), n
  }(t, e), o
}
var Oy = function() {
  function t(t, n) {
    switch (n.type) {
      case "base64":
        return e(im(t), n);
      case "binary":
        return e(t, n);
      case "buffer":
        return e(am && Buffer.isBuffer(t) ? t.toString("binary") : dm(t), n);
      case "array":
        return e(wg(t), n)
    }
    throw new Error("Unrecognized type " + n.type)
  }

  function e(t, e) {
    var n = (e || {}).dense ? [] : {},
      o = t.match(/\\trowd.*?\\row\b/g);
    if (!o.length) throw new Error("RTF missing table");
    var i = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: o.length - 1
      }
    };
    return o.forEach(function(t, e) {
      Array.isArray(n) && (n[e] = []);
      for (var o, a = /\\\w+\b/g, r = 0, s = -1; o = a.exec(t);) {
        if ("\\cell" === o[0]) {
          var l = t.slice(r, a.lastIndex - o[0].length);
          if (" " == l[0] && (l = l.slice(1)), ++s, l.length) {
            var c = {
              v: l,
              t: "s"
            };
            Array.isArray(n) ? n[e][s] = c : n[bh({
              r: e,
              c: s
            })] = c
          }
        }
        r = a.lastIndex
      }
      s > i.e.c && (i.e.c = s)
    }), n["!ref"] = gh(i), n
  }
  return {
    to_workbook: function(e, n) {
      return yh(t(e, n), n)
    },
    to_sheet: t,
    from_sheet: function(t) {
      for (var e, n = ["{\\rtf1\\ansi"], o = fh(t["!ref"]), i = Array.isArray(t), a = o.s.r; a <= o.e.r; ++a) {
        n.push("\\trowd\\trautofit1");
        for (var r = o.s.c; r <= o.e.c; ++r) n.push("\\cellx" + (r + 1));
        for (n.push("\\pard\\intbl"), r = o.s.c; r <= o.e.c; ++r) {
          var s = bh({
            r: a,
            c: r
          });
          (e = i ? (t[a] || [])[r] : t[s]) && (null != e.v || e.f && !e.F) && (n.push(" " + (e.w || (vh(e), e.w))),
            n.push("\\cell"))
        }
        n.push("\\pard\\intbl\\row")
      }
      return n.join("") + "}"
    }
  }
}();

function My(t) {
  for (var e = 0, n = 1; 3 != e; ++e) n = 256 * n + (t[e] > 255 ? 255 : t[e] < 0 ? 0 : t[e]);
  return n.toString(16).toUpperCase().slice(1)
}

function Ly(t, e) {
  if (0 === e) return t;
  var n, o, i = function(t) {
    var e = t[0] / 255,
      n = t[1] / 255,
      o = t[2] / 255,
      i = Math.max(e, n, o),
      a = Math.min(e, n, o),
      r = i - a;
    if (0 === r) return [0, 0, e];
    var s, l = 0,
      c = i + a;
    switch (s = r / (c > 1 ? 2 - c : c), i) {
      case e:
        l = ((n - o) / r + 6) % 6;
        break;
      case n:
        l = (o - e) / r + 2;
        break;
      case o:
        l = (e - n) / r + 4
    }
    return [l / 6, s, c / 2]
  }((o = (n = t).slice("#" === n[0] ? 1 : 0).slice(0, 6), [parseInt(o.slice(0, 2), 16), parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ]));
  return i[2] = e < 0 ? i[2] * (1 + e) : 1 - (1 - i[2]) * (1 - e), My(function(t) {
    var e, n = t[0],
      o = t[1],
      i = t[2],
      a = 2 * o * (i < .5 ? i : 1 - i),
      r = i - a / 2,
      s = [r, r, r],
      l = 6 * n;
    if (0 !== o) switch (0 | l) {
      case 0:
      case 6:
        e = a * l, s[0] += a, s[1] += e;
        break;
      case 1:
        e = a * (2 - l), s[0] += e, s[1] += a;
        break;
      case 2:
        e = a * (l - 2), s[1] += a, s[2] += e;
        break;
      case 3:
        e = a * (4 - l), s[1] += e, s[2] += a;
        break;
      case 4:
        e = a * (l - 4), s[2] += a, s[0] += e;
        break;
      case 5:
        e = a * (6 - l), s[2] += e, s[0] += a
    }
    for (var c = 0; 3 != c; ++c) s[c] = Math.round(255 * s[c]);
    return s
  }(i))
}
var _y = 6;

function By(t) {
  return Math.floor((t + Math.round(128 / _y) / 256) * _y)
}

function Fy(t) {
  return Math.floor((t - 5) / _y * 100 + .5) / 100
}

function Ry(t) {
  return Math.round((t * _y + 5) / _y * 256) / 256
}

function Dy(t) {
  return Ry(Fy(By(t)))
}

function Vy(t) {
  var e = Math.abs(t - Dy(t)),
    n = _y;
  if (e > .005)
    for (_y = 1; _y < 15; ++_y) Math.abs(t - Dy(t)) <= e && (e = Math.abs(t - Dy(t)), n = _y);
  _y = n
}

function Ny(t) {
  t.width ? (t.wpx = By(t.width), t.wch = Fy(t.wpx), t.MDW = _y) : t.wpx ? (t.wch = Fy(t.wpx), t.width = Ry(t.wch), t
      .MDW = _y) : "number" == typeof t.wch && (t.width = Ry(t.wch), t.wpx = By(t.width), t.MDW = _y), t.customWidth &&
    delete t.customWidth
}
var $y = 96;

function zy(t) {
  return 96 * t / $y
}

function Uy(t) {
  return t * $y / 96
}
var jy = {
  None: "none",
  Solid: "solid",
  Gray50: "mediumGray",
  Gray75: "darkGray",
  Gray25: "lightGray",
  HorzStripe: "darkHorizontal",
  VertStripe: "darkVertical",
  ReverseDiagStripe: "darkDown",
  DiagStripe: "darkUp",
  DiagCross: "darkGrid",
  ThickDiagCross: "darkTrellis",
  ThinHorzStripe: "lightHorizontal",
  ThinVertStripe: "lightVertical",
  ThinReverseDiagStripe: "lightDown",
  ThinHorzCross: "lightGrid"
};
var Hy = ["numFmtId", "fillId", "fontId", "borderId", "xfId"],
  Gy = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection",
    "pivotButton", "quotePrefix"
  ];
var Ky = function() {
  var t = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/,
    e = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/,
    n = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/,
    o = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/,
    i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
  return function(a, r, s) {
    var l, c = {};
    return a ? ((l = (a = a.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "")).match(
      t)) && function(t, e, n) {
      e.NumberFmt = [];
      for (var o = cg(Sm), i = 0; i < o.length; ++i) e.NumberFmt[o[i]] = Sm[o[i]];
      var a = t[0].match(Ug);
      if (a)
        for (i = 0; i < a.length; ++i) {
          var r = Gg(a[i]);
          switch (Kg(r[0])) {
            case "<numFmts":
            case "</numFmts>":
            case "<numFmts/>":
            case "<numFmts>":
            case "</numFmt>":
              break;
            case "<numFmt":
              var s = Yg(rf(r.formatCode)),
                l = parseInt(r.numFmtId, 10);
              if (e.NumberFmt[l] = s, l > 0) {
                if (l > 392) {
                  for (l = 392; l > 60 && null != e.NumberFmt[l]; --l);
                  e.NumberFmt[l] = s
                }
                og(s, l)
              }
              break;
            default:
              if (n.WTF) throw new Error("unrecognized " + r[0] + " in numFmts")
          }
        }
    }(l, c, s), (l = a.match(o)) && function(t, e, n, o) {
      e.Fonts = [];
      var i = {},
        a = !1;
      (t[0].match(Ug) || []).forEach(function(t) {
        var r = Gg(t);
        switch (Kg(r[0])) {
          case "<fonts":
          case "<fonts>":
          case "</fonts>":
          case "<font":
          case "<font>":
          case "<name/>":
          case "</name>":
          case "<sz/>":
          case "</sz>":
          case "<vertAlign/>":
          case "</vertAlign>":
          case "<family/>":
          case "</family>":
          case "<scheme/>":
          case "</scheme>":
          case "<color/>":
          case "</color>":
          case "<extLst":
          case "<extLst>":
          case "</extLst>":
            break;
          case "</font>":
          case "<font/>":
            e.Fonts.push(i), i = {};
            break;
          case "<name":
            r.val && (i.name = rf(r.val));
            break;
          case "<b":
            i.bold = r.val ? tf(r.val) : 1;
            break;
          case "<b/>":
            i.bold = 1;
            break;
          case "<i":
            i.italic = r.val ? tf(r.val) : 1;
            break;
          case "<i/>":
            i.italic = 1;
            break;
          case "<u":
            switch (r.val) {
              case "none":
                i.underline = 0;
                break;
              case "single":
                i.underline = 1;
                break;
              case "double":
                i.underline = 2;
                break;
              case "singleAccounting":
                i.underline = 33;
                break;
              case "doubleAccounting":
                i.underline = 34
            }
            break;
          case "<u/>":
            i.underline = 1;
            break;
          case "<strike":
            i.strike = r.val ? tf(r.val) : 1;
            break;
          case "<strike/>":
            i.strike = 1;
            break;
          case "<outline":
            i.outline = r.val ? tf(r.val) : 1;
            break;
          case "<outline/>":
            i.outline = 1;
            break;
          case "<shadow":
            i.shadow = r.val ? tf(r.val) : 1;
            break;
          case "<shadow/>":
            i.shadow = 1;
            break;
          case "<condense":
            i.condense = r.val ? tf(r.val) : 1;
            break;
          case "<condense/>":
            i.condense = 1;
            break;
          case "<extend":
            i.extend = r.val ? tf(r.val) : 1;
            break;
          case "<extend/>":
            i.extend = 1;
            break;
          case "<sz":
            r.val && (i.sz = +r.val);
            break;
          case "<vertAlign":
            r.val && (i.vertAlign = r.val);
            break;
          case "<family":
            r.val && (i.family = parseInt(r.val, 10));
            break;
          case "<scheme":
            r.val && (i.scheme = r.val);
            break;
          case "<charset":
            if ("1" == r.val) break;
            r.codepage = Kb[parseInt(r.val, 10)];
            break;
          case "<color":
            if (i.color || (i.color = {}), r.auto && (i.color.auto = tf(r.auto)), r.rgb) i.color.rgb = r.rgb
              .slice(-6);
            else if (r.indexed) {
              i.color.index = parseInt(r.indexed, 10);
              var s = Hh[i.color.index];
              81 == i.color.index && (s = Hh[1]), s || (s = Hh[1]), i.color.rgb = s[0].toString(16) + s[1]
                .toString(16) + s[2].toString(16)
            } else r.theme && (i.color.theme = parseInt(r.theme, 10), r.tint && (i.color.tint = parseFloat(r
              .tint)), r.theme && n.themeElements && n.themeElements.clrScheme && (i.color.rgb = Ly(n
              .themeElements.clrScheme[i.color.theme].rgb, i.color.tint || 0)));
            break;
          case "<AlternateContent":
          case "<ext":
            a = !0;
            break;
          case "</AlternateContent>":
          case "</ext>":
            a = !1;
            break;
          default:
            if (o && o.WTF && !a) throw new Error("unrecognized " + r[0] + " in fonts")
        }
      })
    }(l, c, r, s), (l = a.match(n)) && function(t, e, n, o) {
      e.Fills = [];
      var i = {},
        a = !1;
      (t[0].match(Ug) || []).forEach(function(t) {
        var n = Gg(t);
        switch (Kg(n[0])) {
          case "<fills":
          case "<fills>":
          case "</fills>":
          case "</fill>":
          case "<gradientFill>":
          case "<patternFill/>":
          case "</patternFill>":
          case "<bgColor/>":
          case "</bgColor>":
          case "<fgColor/>":
          case "</fgColor>":
          case "<stop":
          case "<stop/>":
          case "</stop>":
          case "<color":
          case "<color/>":
          case "</color>":
          case "<extLst":
          case "<extLst>":
          case "</extLst>":
            break;
          case "<fill>":
          case "<fill":
          case "<fill/>":
            i = {}, e.Fills.push(i);
            break;
          case "<gradientFill":
          case "</gradientFill>":
            e.Fills.push(i), i = {};
            break;
          case "<patternFill":
          case "<patternFill>":
            n.patternType && (i.patternType = n.patternType);
            break;
          case "<bgColor":
            i.bgColor || (i.bgColor = {}), n.indexed && (i.bgColor.indexed = parseInt(n.indexed, 10)), n
              .theme && (i.bgColor.theme = parseInt(n.theme, 10)), n.tint && (i.bgColor.tint = parseFloat(n
                .tint)), n.rgb && (i.bgColor.rgb = n.rgb.slice(-6));
            break;
          case "<fgColor":
            i.fgColor || (i.fgColor = {}), n.theme && (i.fgColor.theme = parseInt(n.theme, 10)), n.tint && (
              i.fgColor.tint = parseFloat(n.tint)), null != n.rgb && (i.fgColor.rgb = n.rgb.slice(-6));
            break;
          case "<ext":
            a = !0;
            break;
          case "</ext>":
            a = !1;
            break;
          default:
            if (o && o.WTF && !a) throw new Error("unrecognized " + n[0] + " in fills")
        }
      })
    }(l, c, 0, s), (l = a.match(i)) && function(t, e, n, o) {
      e.Borders = [];
      var i = {},
        a = !1;
      (t[0].match(Ug) || []).forEach(function(t) {
        var n = Gg(t);
        switch (Kg(n[0])) {
          case "<borders":
          case "<borders>":
          case "</borders>":
          case "</border>":
          case "<left/>":
          case "<left":
          case "<left>":
          case "</left>":
          case "<right/>":
          case "<right":
          case "<right>":
          case "</right>":
          case "<top/>":
          case "<top":
          case "<top>":
          case "</top>":
          case "<bottom/>":
          case "<bottom":
          case "<bottom>":
          case "</bottom>":
          case "<diagonal":
          case "<diagonal>":
          case "<diagonal/>":
          case "</diagonal>":
          case "<horizontal":
          case "<horizontal>":
          case "<horizontal/>":
          case "</horizontal>":
          case "<vertical":
          case "<vertical>":
          case "<vertical/>":
          case "</vertical>":
          case "<start":
          case "<start>":
          case "<start/>":
          case "</start>":
          case "<end":
          case "<end>":
          case "<end/>":
          case "</end>":
          case "<color":
          case "<color>":
          case "<color/>":
          case "</color>":
          case "<extLst":
          case "<extLst>":
          case "</extLst>":
            break;
          case "<border":
          case "<border>":
          case "<border/>":
            i = {}, n.diagonalUp && (i.diagonalUp = tf(n.diagonalUp)), n.diagonalDown && (i.diagonalDown =
              tf(n.diagonalDown)), e.Borders.push(i);
            break;
          case "<ext":
            a = !0;
            break;
          case "</ext>":
            a = !1;
            break;
          default:
            if (o && o.WTF && !a) throw new Error("unrecognized " + n[0] + " in borders")
        }
      })
    }(l, c, 0, s), (l = a.match(e)) && function(t, e, n) {
      var o;
      e.CellXf = [];
      var i = !1;
      (t[0].match(Ug) || []).forEach(function(t) {
        var a = Gg(t),
          r = 0;
        switch (Kg(a[0])) {
          case "<cellXfs":
          case "<cellXfs>":
          case "<cellXfs/>":
          case "</cellXfs>":
          case "</xf>":
          case "</alignment>":
          case "<protection":
          case "</protection>":
          case "<protection/>":
          case "<extLst":
          case "<extLst>":
          case "</extLst>":
            break;
          case "<xf":
          case "<xf/>":
            for (delete(o = a)[0], r = 0; r < Hy.length; ++r) o[Hy[r]] && (o[Hy[r]] = parseInt(o[Hy[r]],
              10));
            for (r = 0; r < Gy.length; ++r) o[Gy[r]] && (o[Gy[r]] = tf(o[Gy[r]]));
            if (e.NumberFmt && o.numFmtId > 392)
              for (r = 392; r > 60; --r)
                if (e.NumberFmt[o.numFmtId] == e.NumberFmt[r]) {
                  o.numFmtId = r;
                  break
                } e.CellXf.push(o);
            break;
          case "<alignment":
          case "<alignment/>":
            var s = {};
            a.vertical && (s.vertical = a.vertical), a.horizontal && (s.horizontal = a.horizontal), null !=
              a.textRotation && (s.textRotation = a.textRotation), a.indent && (s.indent = a.indent), a
              .wrapText && (s.wrapText = tf(a.wrapText)), o.alignment = s;
            break;
          case "<AlternateContent":
          case "<ext":
            i = !0;
            break;
          case "</AlternateContent>":
          case "</ext>":
            i = !1;
            break;
          default:
            if (n && n.WTF && !i) throw new Error("unrecognized " + a[0] + " in cellXfs")
        }
      })
    }(l, c, s), c) : c
  }
}();
var Wy = th;
var qy = th;
var Yy = ["</a:lt1>", "</a:dk1>", "</a:lt2>", "</a:dk2>", "</a:accent1>", "</a:accent2>", "</a:accent3>",
  "</a:accent4>", "</a:accent5>", "</a:accent6>", "</a:hlink>", "</a:folHlink>"
];

function Xy(t, e, n) {
  e.themeElements.clrScheme = [];
  var o = {};
  (t[0].match(Ug) || []).forEach(function(t) {
    var i = Gg(t);
    switch (i[0]) {
      case "<a:clrScheme":
      case "</a:clrScheme>":
        break;
      case "<a:srgbClr":
        o.rgb = i.val;
        break;
      case "<a:sysClr":
        o.rgb = i.lastClr;
        break;
      case "<a:dk1>":
      case "</a:dk1>":
      case "<a:lt1>":
      case "</a:lt1>":
      case "<a:dk2>":
      case "</a:dk2>":
      case "<a:lt2>":
      case "</a:lt2>":
      case "<a:accent1>":
      case "</a:accent1>":
      case "<a:accent2>":
      case "</a:accent2>":
      case "<a:accent3>":
      case "</a:accent3>":
      case "<a:accent4>":
      case "</a:accent4>":
      case "<a:accent5>":
      case "</a:accent5>":
      case "<a:accent6>":
      case "</a:accent6>":
      case "<a:hlink>":
      case "</a:hlink>":
      case "<a:folHlink>":
      case "</a:folHlink>":
        "/" === i[0].charAt(1) ? (e.themeElements.clrScheme[Yy.indexOf(i[0])] = o, o = {}) : o.name = i[0].slice(3,
          i[0].length - 1);
        break;
      default:
        if (n && n.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme")
    }
  })
}

function Jy() {}

function Zy() {}
var Qy = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/,
  tk = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/,
  ek = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
var nk = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

function ok(t, e) {
  var n, o;
  t && 0 !== t.length || ((n = [Ng])[n.length] =
    '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', n[n.length] =
    "<a:themeElements>", n[n.length] = '<a:clrScheme name="Office">', n[n.length] =
    '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', n[n.length] =
    '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', n[n.length] =
    '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', n[n.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', n[n
    .length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', n[n.length] =
    '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', n[n.length] =
    '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', n[n.length] =
    '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', n[n.length] =
    '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', n[n.length] =
    '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', n[n.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>',
    n[n.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', n[n.length] = "</a:clrScheme>", n[n.length] =
    '<a:fontScheme name="Office">', n[n.length] = "<a:majorFont>", n[n.length] = '<a:latin typeface="Cambria"/>', n[n
      .length] = '<a:ea typeface=""/>', n[n.length] = '<a:cs typeface=""/>', n[n.length] =
    '<a:font script="Jpan" typeface="\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af"/>', n[n.length] =
    '<a:font script="Hang" typeface="\ub9d1\uc740 \uace0\ub515"/>', n[n.length] =
    '<a:font script="Hans" typeface="\u5b8b\u4f53"/>', n[n.length] =
    '<a:font script="Hant" typeface="\u65b0\u7d30\u660e\u9ad4"/>', n[n.length] =
    '<a:font script="Arab" typeface="Times New Roman"/>', n[n.length] =
    '<a:font script="Hebr" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Thai" typeface="Tahoma"/>',
    n[n.length] = '<a:font script="Ethi" typeface="Nyala"/>', n[n.length] =
    '<a:font script="Beng" typeface="Vrinda"/>', n[n.length] = '<a:font script="Gujr" typeface="Shruti"/>', n[n
      .length] = '<a:font script="Khmr" typeface="MoolBoran"/>', n[n.length] =
    '<a:font script="Knda" typeface="Tunga"/>', n[n.length] = '<a:font script="Guru" typeface="Raavi"/>', n[n
    .length] = '<a:font script="Cans" typeface="Euphemia"/>', n[n.length] =
    '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', n[n.length] =
    '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', n[n.length] =
    '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', n[n.length] =
    '<a:font script="Thaa" typeface="MV Boli"/>', n[n.length] = '<a:font script="Deva" typeface="Mangal"/>', n[n
      .length] = '<a:font script="Telu" typeface="Gautami"/>', n[n.length] =
    '<a:font script="Taml" typeface="Latha"/>', n[n.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>',
    n[n.length] = '<a:font script="Orya" typeface="Kalinga"/>', n[n.length] =
    '<a:font script="Mlym" typeface="Kartika"/>', n[n.length] = '<a:font script="Laoo" typeface="DokChampa"/>', n[n
      .length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', n[n.length] =
    '<a:font script="Mong" typeface="Mongolian Baiti"/>', n[n.length] =
    '<a:font script="Viet" typeface="Times New Roman"/>', n[n.length] =
    '<a:font script="Uigh" typeface="Microsoft Uighur"/>', n[n.length] = '<a:font script="Geor" typeface="Sylfaen"/>',
    n[n.length] = "</a:majorFont>", n[n.length] = "<a:minorFont>", n[n.length] = '<a:latin typeface="Calibri"/>', n[n
      .length] = '<a:ea typeface=""/>', n[n.length] = '<a:cs typeface=""/>', n[n.length] =
    '<a:font script="Jpan" typeface="\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af"/>', n[n.length] =
    '<a:font script="Hang" typeface="\ub9d1\uc740 \uace0\ub515"/>', n[n.length] =
    '<a:font script="Hans" typeface="\u5b8b\u4f53"/>', n[n.length] =
    '<a:font script="Hant" typeface="\u65b0\u7d30\u660e\u9ad4"/>', n[n.length] =
    '<a:font script="Arab" typeface="Arial"/>', n[n.length] = '<a:font script="Hebr" typeface="Arial"/>', n[n
    .length] = '<a:font script="Thai" typeface="Tahoma"/>', n[n.length] = '<a:font script="Ethi" typeface="Nyala"/>',
    n[n.length] = '<a:font script="Beng" typeface="Vrinda"/>', n[n.length] =
    '<a:font script="Gujr" typeface="Shruti"/>', n[n.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', n[n
      .length] = '<a:font script="Knda" typeface="Tunga"/>', n[n.length] = '<a:font script="Guru" typeface="Raavi"/>',
    n[n.length] = '<a:font script="Cans" typeface="Euphemia"/>', n[n.length] =
    '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', n[n.length] =
    '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', n[n.length] =
    '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', n[n.length] =
    '<a:font script="Thaa" typeface="MV Boli"/>', n[n.length] = '<a:font script="Deva" typeface="Mangal"/>', n[n
      .length] = '<a:font script="Telu" typeface="Gautami"/>', n[n.length] =
    '<a:font script="Taml" typeface="Latha"/>', n[n.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>',
    n[n.length] = '<a:font script="Orya" typeface="Kalinga"/>', n[n.length] =
    '<a:font script="Mlym" typeface="Kartika"/>', n[n.length] = '<a:font script="Laoo" typeface="DokChampa"/>', n[n
      .length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', n[n.length] =
    '<a:font script="Mong" typeface="Mongolian Baiti"/>', n[n.length] = '<a:font script="Viet" typeface="Arial"/>', n[
      n.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', n[n.length] =
    '<a:font script="Geor" typeface="Sylfaen"/>', n[n.length] = "</a:minorFont>", n[n.length] = "</a:fontScheme>", n[n
      .length] = '<a:fmtScheme name="Office">', n[n.length] = "<a:fillStyleLst>", n[n.length] =
    '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', n[n.length] = '<a:gradFill rotWithShape="1">', n[n
      .length] = "<a:gsLst>", n[n.length] =
    '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n
      .length] =
    '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>',
    n[n.length] =
    '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',
    n[n.length] = "</a:gsLst>", n[n.length] = '<a:lin ang="16200000" scaled="1"/>', n[n.length] = "</a:gradFill>", n[n
      .length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] =
    '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>',
    n[n.length] =
    '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',
    n[n.length] = "</a:gsLst>", n[n.length] = '<a:lin ang="16200000" scaled="0"/>', n[n.length] = "</a:gradFill>", n[n
      .length] = "</a:fillStyleLst>", n[n.length] = "<a:lnStyleLst>", n[n.length] =
    '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>',
    n[n.length] =
    '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>',
    n[n.length] =
    '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>',
    n[n.length] = "</a:lnStyleLst>", n[n.length] = "<a:effectStyleLst>", n[n.length] = "<a:effectStyle>", n[n
    .length] = "<a:effectLst>", n[n.length] =
    '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>',
    n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] =
    "<a:effectLst>", n[n.length] =
    '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>',
    n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] =
    "<a:effectLst>", n[n.length] =
    '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>',
    n[n.length] = "</a:effectLst>", n[n.length] =
    '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>',
    n[n.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', n[n.length] = "</a:effectStyle>", n[n.length] =
    "</a:effectStyleLst>", n[n.length] = "<a:bgFillStyleLst>", n[n.length] =
    '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', n[n.length] = '<a:gradFill rotWithShape="1">', n[n
      .length] = "<a:gsLst>", n[n.length] =
    '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n
      .length] =
    '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',
    n[n.length] =
    '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>',
    n[n.length] = "</a:gsLst>", n[n.length] =
    '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', n[n.length] =
    "</a:gradFill>", n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] =
    '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n
      .length] =
    '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>',
    n[n.length] = "</a:gsLst>", n[n.length] =
    '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', n[n.length] =
    "</a:gradFill>", n[n.length] = "</a:bgFillStyleLst>", n[n.length] = "</a:fmtScheme>", n[n.length] =
    "</a:themeElements>", n[n.length] = "<a:objectDefaults>", n[n.length] = "<a:spDef>", n[n.length] =
    '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>',
    n[n.length] = "</a:spDef>", n[n.length] = "<a:lnDef>", n[n.length] =
    '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>',
    n[n.length] = "</a:lnDef>", n[n.length] = "</a:objectDefaults>", n[n.length] = "<a:extraClrSchemeLst/>", n[n
      .length] = "</a:theme>", t = n.join(""));
  var i = {};
  if (!(o = t.match(nk))) throw new Error("themeElements not found in theme");
  return function(t, e, n) {
    var o;
    e.themeElements = {}, [
      ["clrScheme", Qy, Xy],
      ["fontScheme", tk, Jy],
      ["fmtScheme", ek, Zy]
    ].forEach(function(i) {
      if (!(o = t.match(i[1]))) throw new Error(i[0] + " not found in themeElements");
      i[2](o, e, n)
    })
  }(o[0], i, e), i.raw = t, i
}

function ik(t) {
  var e = {};
  switch (e.xclrType = t.read_shift(2), e.nTintShade = t.read_shift(2), e.xclrType) {
    case 0:
    case 4:
      t.l += 4;
      break;
    case 1:
      e.xclrValue = function(t, e) {
        return th(t, e)
      }(t, 4);
      break;
    case 2:
      e.xclrValue = Ev(t);
      break;
    case 3:
      e.xclrValue = function(t) {
        return t.read_shift(4)
      }(t)
  }
  return t.l += 8, e
}

function ak(t) {
  var e = t.read_shift(2),
    n = t.read_shift(2) - 4,
    o = [e];
  switch (e) {
    case 4:
    case 5:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
      o[1] = ik(t);
      break;
    case 6:
      o[1] = function(t, e) {
        return th(t, e)
      }(t, n);
      break;
    case 14:
    case 15:
      o[1] = t.read_shift(1 === n ? 1 : 2);
      break;
    default:
      throw new Error("Unrecognized ExtProp type: " + e + " " + n)
  }
  return o
}

function rk(t, e) {
  e.forEach(function(t) {
    t[0]
  })
}

function sk(t, e, n, o) {
  var i, a = Array.isArray(t);
  e.forEach(function(e) {
    var r = ph(e.ref);
    if (a ? (t[r.r] || (t[r.r] = []), i = t[r.r][r.c]) : i = t[e.ref], !i) {
      i = {
        t: "z"
      }, a ? t[r.r][r.c] = i : t[e.ref] = i;
      var s = fh(t["!ref"] || "BDWGO1000001:A1");
      s.s.r > r.r && (s.s.r = r.r), s.e.r < r.r && (s.e.r = r.r), s.s.c > r.c && (s.s.c = r.c), s.e.c < r.c && (s.e
        .c = r.c);
      var l = gh(s);
      l !== t["!ref"] && (t["!ref"] = l)
    }
    i.c || (i.c = []);
    var c = {
      a: e.author,
      t: e.t,
      r: e.r,
      T: n
    };
    e.h && (c.h = e.h);
    for (var d = i.c.length - 1; d >= 0; --d) {
      if (!n && i.c[d].T) return;
      n && !i.c[d].T && i.c.splice(d, 1)
    }
    if (n && o)
      for (d = 0; d < o.length; ++d)
        if (c.a == o[d].id) {
          c.a = o[d].name || c.a;
          break
        } i.c.push(c)
  })
}
var lk = wh;
var ck = function() {
    var t = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,
      e = {
        r: 0,
        c: 0
      };

    function n(t, n, o, i) {
      var a = !1,
        r = !1;
      0 == o.length ? r = !0 : "[" == o.charAt(0) && (r = !0, o = o.slice(1, -1)), 0 == i.length ? a = !0 : "[" == i
        .charAt(0) && (a = !0, i = i.slice(1, -1));
      var s = o.length > 0 ? 0 | parseInt(o, 10) : 0,
        l = i.length > 0 ? 0 | parseInt(i, 10) : 0;
      return a ? l += e.c : --l, r ? s += e.r : --s, n + (a ? "" : "$") + uh(l) + (r ? "" : "$") + ch(s)
    }
    return function(o, i) {
      return e = i, o.replace(t, n)
    }
  }(),
  dk =
  /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g,
  uk = function() {
    return function(t, e) {
      return t.replace(dk, function(t, n, o, i, a, r) {
        var s = dh(i) - (o ? 0 : e.c),
          l = lh(r) - (a ? 0 : e.r);
        return n + "R" + (0 == l ? "" : a ? l + 1 : "[" + l + "]") + "C" + (0 == s ? "" : o ? s + 1 : "[" + s +
          "]")
      })
    }
  }();

function pk(t, e) {
  return t.replace(dk, function(t, n, o, i, a, r) {
    return n + ("$" == o ? o + i : uh(dh(i) + e.c)) + ("$" == a ? a + r : ch(lh(r) + e.r))
  })
}

function bk(t, e, n) {
  var o = mh(e).s,
    i = ph(n);
  return pk(t, {
    r: i.r - o.r,
    c: i.c - o.c
  })
}

function mk(t) {
  return t.replace(/_xlfn\./g, "")
}

function gk(t) {
  t.l += 1
}

function fk(t, e) {
  var n = t.read_shift(2);
  return [16383 & n, n >> 14 & 1, n >> 15 & 1]
}

function hk(t, e, n) {
  var o = 2;
  if (n) {
    if (n.biff >= 2 && n.biff <= 5) return vk(t);
    12 == n.biff && (o = 4)
  }
  var i = t.read_shift(o),
    a = t.read_shift(o),
    r = fk(t),
    s = fk(t);
  return {
    s: {
      r: i,
      c: r[0],
      cRel: r[1],
      rRel: r[2]
    },
    e: {
      r: a,
      c: s[0],
      cRel: s[1],
      rRel: s[2]
    }
  }
}

function vk(t) {
  var e = fk(t),
    n = fk(t),
    o = t.read_shift(1),
    i = t.read_shift(1);
  return {
    s: {
      r: e[0],
      c: o,
      cRel: e[1],
      rRel: e[2]
    },
    e: {
      r: n[0],
      c: i,
      cRel: n[1],
      rRel: n[2]
    }
  }
}

function yk(t, e, n) {
  if (n && n.biff >= 2 && n.biff <= 5) return function(t) {
    var e = fk(t),
      n = t.read_shift(1);
    return {
      r: e[0],
      c: n,
      cRel: e[1],
      rRel: e[2]
    }
  }(t);
  var o = t.read_shift(n && 12 == n.biff ? 4 : 2),
    i = fk(t);
  return {
    r: o,
    c: i[0],
    cRel: i[1],
    rRel: i[2]
  }
}

function kk(t) {
  var e = t.read_shift(2),
    n = t.read_shift(2);
  return {
    r: e,
    c: 255 & n,
    fQuoted: !!(16384 & n),
    cRel: n >> 15,
    rRel: n >> 15
  }
}

function xk(t) {
  var e = 1 & t[t.l + 1];
  return t.l += 4, [e, 1]
}

function wk(t) {
  return [t.read_shift(1), t.read_shift(1)]
}

function Ck(t, e) {
  var n = [t.read_shift(1)];
  if (12 == e) switch (n[0]) {
    case 2:
      n[0] = 4;
      break;
    case 4:
      n[0] = 16;
      break;
    case 0:
      n[0] = 1;
      break;
    case 1:
      n[0] = 2
  }
  switch (n[0]) {
    case 4:
      n[1] = vv(t, 1) ? "TRUE" : "FALSE", 12 != e && (t.l += 7);
      break;
    case 37:
    case 16:
      n[1] = Gh[t[t.l]], t.l += 12 == e ? 4 : 8;
      break;
    case 0:
      t.l += 8;
      break;
    case 1:
      n[1] = Fh(t);
      break;
    case 2:
      n[1] = Tv(t, 0, {
        biff: e > 0 && e < 8 ? 2 : e
      });
      break;
    default:
      throw new Error("Bad SerAr: " + n[0])
  }
  return n
}

function Sk(t, e, n) {
  for (var o = t.read_shift(12 == n.biff ? 4 : 2), i = [], a = 0; a != o; ++a) i.push((12 == n.biff ? Bh : _v)(t));
  return i
}

function Tk(t, e, n) {
  var o = 0,
    i = 0;
  12 == n.biff ? (o = t.read_shift(4), i = t.read_shift(4)) : (i = 1 + t.read_shift(1), o = 1 + t.read_shift(2)), n
    .biff >= 2 && n.biff < 8 && (--o, 0 == --i && (i = 256));
  for (var a = 0, r = []; a != o && (r[a] = []); ++a)
    for (var s = 0; s != i; ++s) r[a][s] = Ck(t, n.biff);
  return r
}

function Ik(t, e, n) {
  return t.l += 2, [kk(t)]
}

function Ak(t) {
  return t.l += 6, []
}

function Ek(t) {
  return t.l += 2, [yv(t), 1 & t.read_shift(2)]
}
var Pk = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??",
  "?DataTotals", "??", "??", "??", "?Current"
];
var Ok = {
    1: {
      n: "PtgExp",
      f: function(t, e, n) {
        return t.l++, n && 12 == n.biff ? [t.read_shift(4, "i"), 0] : [t.read_shift(2), t.read_shift(n && 2 == n
          .biff ? 1 : 2)]
      }
    },
    2: {
      n: "PtgTbl",
      f: th
    },
    3: {
      n: "PtgAdd",
      f: gk
    },
    4: {
      n: "PtgSub",
      f: gk
    },
    5: {
      n: "PtgMul",
      f: gk
    },
    6: {
      n: "PtgDiv",
      f: gk
    },
    7: {
      n: "PtgPower",
      f: gk
    },
    8: {
      n: "PtgConcat",
      f: gk
    },
    9: {
      n: "PtgLt",
      f: gk
    },
    10: {
      n: "PtgLe",
      f: gk
    },
    11: {
      n: "PtgEq",
      f: gk
    },
    12: {
      n: "PtgGe",
      f: gk
    },
    13: {
      n: "PtgGt",
      f: gk
    },
    14: {
      n: "PtgNe",
      f: gk
    },
    15: {
      n: "PtgIsect",
      f: gk
    },
    16: {
      n: "PtgUnion",
      f: gk
    },
    17: {
      n: "PtgRange",
      f: gk
    },
    18: {
      n: "PtgUplus",
      f: gk
    },
    19: {
      n: "PtgUminus",
      f: gk
    },
    20: {
      n: "PtgPercent",
      f: gk
    },
    21: {
      n: "PtgParen",
      f: gk
    },
    22: {
      n: "PtgMissArg",
      f: gk
    },
    23: {
      n: "PtgStr",
      f: function(t, e, n) {
        return t.l++, xv(t, 0, n)
      }
    },
    26: {
      n: "PtgSheet",
      f: function(t, e, n) {
        return t.l += 5, t.l += 2, t.l += 2 == n.biff ? 1 : 4, ["PTGSHEET"]
      }
    },
    27: {
      n: "PtgEndSheet",
      f: function(t, e, n) {
        return t.l += 2 == n.biff ? 4 : 5, ["PTGENDSHEET"]
      }
    },
    28: {
      n: "PtgErr",
      f: function(t) {
        return t.l++, Gh[t.read_shift(1)]
      }
    },
    29: {
      n: "PtgBool",
      f: function(t) {
        return t.l++, 0 !== t.read_shift(1)
      }
    },
    30: {
      n: "PtgInt",
      f: function(t) {
        return t.l++, t.read_shift(2)
      }
    },
    31: {
      n: "PtgNum",
      f: function(t) {
        return t.l++, Fh(t)
      }
    },
    32: {
      n: "PtgArray",
      f: function(t, e, n) {
        var o = (96 & t[t.l++]) >> 5;
        return t.l += 2 == n.biff ? 6 : 12 == n.biff ? 14 : 7, [o]
      }
    },
    33: {
      n: "PtgFunc",
      f: function(t, e, n) {
        var o = (96 & t[t.l]) >> 5;
        t.l += 1;
        var i = t.read_shift(n && n.biff <= 3 ? 1 : 2);
        return [Jk[i], Xk[i], o]
      }
    },
    34: {
      n: "PtgFuncVar",
      f: function(t, e, n) {
        var o = t[t.l++],
          i = t.read_shift(1),
          a = n && n.biff <= 3 ? [88 == o ? -1 : 0, t.read_shift(1)] : function(t) {
            return [t[t.l + 1] >> 7, 32767 & t.read_shift(2)]
          }(t);
        return [i, (0 === a[0] ? Xk : Yk)[a[1]]]
      }
    },
    35: {
      n: "PtgName",
      f: function(t, e, n) {
        var o = t.read_shift(1) >>> 5 & 3,
          i = !n || n.biff >= 8 ? 4 : 2,
          a = t.read_shift(i);
        switch (n.biff) {
          case 2:
            t.l += 5;
            break;
          case 3:
          case 4:
            t.l += 8;
            break;
          case 5:
            t.l += 12
        }
        return [o, 0, a]
      }
    },
    36: {
      n: "PtgRef",
      f: function(t, e, n) {
        var o = (96 & t[t.l]) >> 5;
        return t.l += 1, [o, yk(t, 0, n)]
      }
    },
    37: {
      n: "PtgArea",
      f: function(t, e, n) {
        return [(96 & t[t.l++]) >> 5, hk(t, n.biff >= 2 && n.biff, n)]
      }
    },
    38: {
      n: "PtgMemArea",
      f: function(t, e, n) {
        var o = t.read_shift(1) >>> 5 & 3;
        return t.l += n && 2 == n.biff ? 3 : 4, [o, t.read_shift(n && 2 == n.biff ? 1 : 2)]
      }
    },
    39: {
      n: "PtgMemErr",
      f: th
    },
    40: {
      n: "PtgMemNoMem",
      f: th
    },
    41: {
      n: "PtgMemFunc",
      f: function(t, e, n) {
        return [t.read_shift(1) >>> 5 & 3, t.read_shift(n && 2 == n.biff ? 1 : 2)]
      }
    },
    42: {
      n: "PtgRefErr",
      f: function(t, e, n) {
        var o = t.read_shift(1) >>> 5 & 3;
        return t.l += 4, n.biff < 8 && t.l--, 12 == n.biff && (t.l += 2), [o]
      }
    },
    43: {
      n: "PtgAreaErr",
      f: function(t, e, n) {
        var o = (96 & t[t.l++]) >> 5;
        return t.l += n && n.biff > 8 ? 12 : n.biff < 8 ? 6 : 8, [o]
      }
    },
    44: {
      n: "PtgRefN",
      f: function(t, e, n) {
        var o = (96 & t[t.l]) >> 5;
        t.l += 1;
        var i = function(t, e, n) {
          var o = n && n.biff ? n.biff : 8;
          if (o >= 2 && o <= 5) return function(t) {
            var e = t.read_shift(2),
              n = t.read_shift(1),
              o = (32768 & e) >> 15,
              i = (16384 & e) >> 14;
            return e &= 16383, 1 == o && e >= 8192 && (e -= 16384), 1 == i && n >= 128 && (n -= 256), {
              r: e,
              c: n,
              cRel: i,
              rRel: o
            }
          }(t);
          var i = t.read_shift(o >= 12 ? 4 : 2),
            a = t.read_shift(2),
            r = (16384 & a) >> 14,
            s = (32768 & a) >> 15;
          if (a &= 16383, 1 == s)
            for (; i > 524287;) i -= 1048576;
          if (1 == r)
            for (; a > 8191;) a -= 16384;
          return {
            r: i,
            c: a,
            cRel: r,
            rRel: s
          }
        }(t, 0, n);
        return [o, i]
      }
    },
    45: {
      n: "PtgAreaN",
      f: function(t, e, n) {
        var o = (96 & t[t.l++]) >> 5,
          i = function(t, e, n) {
            if (n.biff < 8) return vk(t);
            var o = t.read_shift(12 == n.biff ? 4 : 2),
              i = t.read_shift(12 == n.biff ? 4 : 2),
              a = fk(t),
              r = fk(t);
            return {
              s: {
                r: o,
                c: a[0],
                cRel: a[1],
                rRel: a[2]
              },
              e: {
                r: i,
                c: r[0],
                cRel: r[1],
                rRel: r[2]
              }
            }
          }(t, 0, n);
        return [o, i]
      }
    },
    46: {
      n: "PtgMemAreaN",
      f: function(t) {
        return [t.read_shift(1) >>> 5 & 3, t.read_shift(2)]
      }
    },
    47: {
      n: "PtgMemNoMemN",
      f: function(t) {
        return [t.read_shift(1) >>> 5 & 3, t.read_shift(2)]
      }
    },
    57: {
      n: "PtgNameX",
      f: function(t, e, n) {
        return 5 == n.biff ? function(t) {
          var e = t.read_shift(1) >>> 5 & 3,
            n = t.read_shift(2, "i");
          t.l += 8;
          var o = t.read_shift(2);
          return t.l += 12, [e, n, o]
        }(t) : [t.read_shift(1) >>> 5 & 3, t.read_shift(2), t.read_shift(4)]
      }
    },
    58: {
      n: "PtgRef3d",
      f: function(t, e, n) {
        var o = (96 & t[t.l]) >> 5;
        t.l += 1;
        var i = t.read_shift(2);
        return n && 5 == n.biff && (t.l += 12), [o, i, yk(t, 0, n)]
      }
    },
    59: {
      n: "PtgArea3d",
      f: function(t, e, n) {
        var o = (96 & t[t.l++]) >> 5,
          i = t.read_shift(2, "i");
        if (n) switch (n.biff) {
          case 5:
            t.l += 12;
            break;
          case 12:
            0
        }
        return [o, i, hk(t, 0, n)]
      }
    },
    60: {
      n: "PtgRefErr3d",
      f: function(t, e, n) {
        var o = (96 & t[t.l++]) >> 5,
          i = t.read_shift(2),
          a = 4;
        if (n) switch (n.biff) {
          case 5:
            a = 15;
            break;
          case 12:
            a = 6
        }
        return t.l += a, [o, i]
      }
    },
    61: {
      n: "PtgAreaErr3d",
      f: function(t, e, n) {
        var o = (96 & t[t.l++]) >> 5,
          i = t.read_shift(2),
          a = 8;
        if (n) switch (n.biff) {
          case 5:
            t.l += 12, a = 6;
            break;
          case 12:
            a = 12
        }
        return t.l += a, [o, i]
      }
    },
    255: {}
  },
  Mk = {
    64: 32,
    96: 32,
    65: 33,
    97: 33,
    66: 34,
    98: 34,
    67: 35,
    99: 35,
    68: 36,
    100: 36,
    69: 37,
    101: 37,
    70: 38,
    102: 38,
    71: 39,
    103: 39,
    72: 40,
    104: 40,
    73: 41,
    105: 41,
    74: 42,
    106: 42,
    75: 43,
    107: 43,
    76: 44,
    108: 44,
    77: 45,
    109: 45,
    78: 46,
    110: 46,
    79: 47,
    111: 47,
    88: 34,
    120: 34,
    89: 57,
    121: 57,
    90: 58,
    122: 58,
    91: 59,
    123: 59,
    92: 60,
    124: 60,
    93: 61,
    125: 61
  },
  Lk = {
    1: {
      n: "PtgElfLel",
      f: Ek
    },
    2: {
      n: "PtgElfRw",
      f: Ik
    },
    3: {
      n: "PtgElfCol",
      f: Ik
    },
    6: {
      n: "PtgElfRwV",
      f: Ik
    },
    7: {
      n: "PtgElfColV",
      f: Ik
    },
    10: {
      n: "PtgElfRadical",
      f: Ik
    },
    11: {
      n: "PtgElfRadicalS",
      f: Ak
    },
    13: {
      n: "PtgElfColS",
      f: Ak
    },
    15: {
      n: "PtgElfColSV",
      f: Ak
    },
    16: {
      n: "PtgElfRadicalLel",
      f: Ek
    },
    25: {
      n: "PtgList",
      f: function(t) {
        t.l += 2;
        var e = t.read_shift(2),
          n = t.read_shift(2),
          o = t.read_shift(4),
          i = t.read_shift(2),
          a = t.read_shift(2);
        return {
          ixti: e,
          coltype: 3 & n,
          rt: Pk[n >> 2 & 31],
          idx: o,
          c: i,
          C: a
        }
      }
    },
    29: {
      n: "PtgSxName",
      f: function(t) {
        return t.l += 2, [t.read_shift(4)]
      }
    },
    255: {}
  },
  _k = {
    0: {
      n: "PtgAttrNoop",
      f: function(t) {
        return t.l += 4, [0, 0]
      }
    },
    1: {
      n: "PtgAttrSemi",
      f: function(t, e, n) {
        var o = 255 & t[t.l + 1] ? 1 : 0;
        return t.l += n && 2 == n.biff ? 3 : 4, [o]
      }
    },
    2: {
      n: "PtgAttrIf",
      f: function(t, e, n) {
        var o = 255 & t[t.l + 1] ? 1 : 0;
        return t.l += 2, [o, t.read_shift(n && 2 == n.biff ? 1 : 2)]
      }
    },
    4: {
      n: "PtgAttrChoose",
      f: function(t, e, n) {
        t.l += 2;
        for (var o = t.read_shift(n && 2 == n.biff ? 1 : 2), i = [], a = 0; a <= o; ++a) i.push(t.read_shift(n && 2 ==
          n.biff ? 1 : 2));
        return i
      }
    },
    8: {
      n: "PtgAttrGoto",
      f: function(t, e, n) {
        var o = 255 & t[t.l + 1] ? 1 : 0;
        return t.l += 2, [o, t.read_shift(n && 2 == n.biff ? 1 : 2)]
      }
    },
    16: {
      n: "PtgAttrSum",
      f: function(t, e, n) {
        t.l += n && 2 == n.biff ? 3 : 4
      }
    },
    32: {
      n: "PtgAttrBaxcel",
      f: xk
    },
    33: {
      n: "PtgAttrBaxcel",
      f: xk
    },
    64: {
      n: "PtgAttrSpace",
      f: function(t) {
        return t.read_shift(2), wk(t)
      }
    },
    65: {
      n: "PtgAttrSpaceSemi",
      f: function(t) {
        return t.read_shift(2), wk(t)
      }
    },
    128: {
      n: "PtgAttrIfError",
      f: function(t) {
        var e = 255 & t[t.l + 1] ? 1 : 0;
        return t.l += 2, [e, t.read_shift(2)]
      }
    },
    255: {}
  };

function Bk(t, e, n, o) {
  if (o.biff < 8) return th(t, e);
  for (var i = t.l + e, a = [], r = 0; r !== n.length; ++r) switch (n[r][0]) {
    case "PtgArray":
      n[r][1] = Tk(t, 0, o), a.push(n[r][1]);
      break;
    case "PtgMemArea":
      n[r][2] = Sk(t, n[r][1], o), a.push(n[r][2]);
      break;
    case "PtgExp":
      o && 12 == o.biff && (n[r][1][1] = t.read_shift(4), a.push(n[r][1]));
      break;
    case "PtgList":
    case "PtgElfRadicalS":
    case "PtgElfColS":
    case "PtgElfColSV":
      throw "Unsupported " + n[r][0]
  }
  return 0 !== (e = i - t.l) && a.push(th(t, e)), a
}

function Fk(t, e, n) {
  for (var o, i, a = t.l + e, r = []; a != t.l;) e = a - t.l, i = t[t.l], o = Ok[i] || Ok[Mk[i]], 24 !== i && 25 !==
    i || (o = (24 === i ? Lk : _k)[t[t.l + 1]]), o && o.f ? r.push([o.n, o.f(t, e, n)]) : th(t, e);
  return r
}

function Rk(t) {
  for (var e = [], n = 0; n < t.length; ++n) {
    for (var o = t[n], i = [], a = 0; a < o.length; ++a) {
      var r = o[a];
      if (r)
        if (2 === r[0]) i.push('"' + r[1].replace(/"/g, '""') + '"');
        else i.push(r[1]);
      else i.push("")
    }
    e.push(i.join(","))
  }
  return e.join(";")
}
var Dk = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};

function Vk(t, e, n) {
  if (!t) return "SH33TJSERR0";
  if (n.biff > 8 && (!t.XTI || !t.XTI[e])) return t.SheetNames[e];
  if (!t.XTI) return "SH33TJSERR6";
  var o = t.XTI[e];
  if (n.biff < 8) return e > 1e4 && (e -= 65536), e < 0 && (e = -e), 0 == e ? "" : t.XTI[e - 1];
  if (!o) return "SH33TJSERR1";
  var i = "";
  if (n.biff > 8) switch (t[o[0]][0]) {
    case 357:
      return i = -1 == o[1] ? "#REF" : t.SheetNames[o[1]], o[1] == o[2] ? i : i + ":" + t.SheetNames[o[2]];
    case 358:
      return null != n.SID ? t.SheetNames[n.SID] : "SH33TJSSAME" + t[o[0]][0];
    default:
      return "SH33TJSSRC" + t[o[0]][0]
  }
  switch (t[o[0]][0][0]) {
    case 1025:
      return i = -1 == o[1] ? "#REF" : t.SheetNames[o[1]] || "SH33TJSERR3", o[1] == o[2] ? i : i + ":" + t.SheetNames[o[
        2]];
    case 14849:
      return t[o[0]].slice(1).map(function(t) {
        return t.Name
      }).join(";;");
    default:
      return t[o[0]][0][3] ? (i = -1 == o[1] ? "#REF" : t[o[0]][0][3][o[1]] || "SH33TJSERR4", o[1] == o[2] ? i : i +
        ":" + t[o[0]][0][3][o[2]]) : "SH33TJSERR2"
  }
}

function Nk(t, e, n) {
  var o = Vk(t, e, n);
  return "#REF" == o ? o : function(t, e) {
    if (!(t || e && e.biff <= 5 && e.biff >= 2)) throw new Error("empty sheet name");
    return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(t) ? "'" + t + "'" : t
  }(o, n)
}

function $k(t, e, n, o, i) {
  var a, r, s, l, c = i && i.biff || 8,
    d = {
      s: {
        c: 0,
        r: 0
      }
    },
    u = [],
    p = 0,
    b = 0,
    m = "";
  if (!t[0] || !t[0][0]) return "";
  for (var g = -1, f = "", h = 0, v = t[0].length; h < v; ++h) {
    var y = t[0][h];
    switch (y[0]) {
      case "PtgUminus":
        u.push("-" + u.pop());
        break;
      case "PtgUplus":
        u.push("+" + u.pop());
        break;
      case "PtgPercent":
        u.push(u.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (a = u.pop(), r = u.pop(), g >= 0) {
          switch (t[0][g][1][0]) {
            case 0:
              f = Sg(" ", t[0][g][1][1]);
              break;
            case 1:
              f = Sg("\r", t[0][g][1][1]);
              break;
            default:
              if (f = "", i.WTF) throw new Error("Unexpected PtgAttrSpaceType " + t[0][g][1][0])
          }
          r += f, g = -1
        }
        u.push(r + Dk[y[0]] + a);
        break;
      case "PtgIsect":
        a = u.pop(), r = u.pop(), u.push(r + " " + a);
        break;
      case "PtgUnion":
        a = u.pop(), r = u.pop(), u.push(r + "," + a);
        break;
      case "PtgRange":
        a = u.pop(), r = u.pop(), u.push(r + ":" + a);
        break;
      case "PtgAttrChoose":
      case "PtgAttrGoto":
      case "PtgAttrIf":
      case "PtgAttrIfError":
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
      case "PtgMemArea":
      case "PtgTbl":
      case "PtgMemErr":
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
      case "PtgMemFunc":
      case "PtgMemNoMem":
        break;
      case "PtgRef":
        s = ih(y[1][1], d, i), u.push(rh(s, c));
        break;
      case "PtgRefN":
        s = n ? ih(y[1][1], n, i) : y[1][1], u.push(rh(s, c));
        break;
      case "PtgRef3d":
        p = y[1][1], s = ih(y[1][2], d, i), m = Nk(o, p, i), u.push(m + "!" + rh(s, c));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var k = y[1][0],
          x = y[1][1];
        k || (k = 0);
        var w = 0 == (k &= 127) ? [] : u.slice(-k);
        u.length -= k, "User" === x && (x = w.shift()), u.push(x + "(" + w.join(",") + ")");
        break;
      case "PtgBool":
        u.push(y[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
      case "PtgErr":
        u.push(y[1]);
        break;
      case "PtgNum":
        u.push(String(y[1]));
        break;
      case "PtgStr":
        u.push('"' + y[1].replace(/"/g, '""') + '"');
        break;
      case "PtgAreaN":
        l = ah(y[1][1], n ? {
          s: n
        } : d, i), u.push(sh(l, i));
        break;
      case "PtgArea":
        l = ah(y[1][1], d, i), u.push(sh(l, i));
        break;
      case "PtgArea3d":
        p = y[1][1], l = y[1][2], m = Nk(o, p, i), u.push(m + "!" + sh(l, i));
        break;
      case "PtgAttrSum":
        u.push("SUM(" + u.pop() + ")");
        break;
      case "PtgName":
        b = y[1][2];
        var C = (o.names || [])[b - 1] || (o[0] || [])[b],
          S = C ? C.Name : "SH33TJSNAME" + String(b);
        S && "_xlfn." == S.slice(0, 6) && !i.xlfn && (S = S.slice(6)), u.push(S);
        break;
      case "PtgNameX":
        var T, I = y[1][1];
        if (b = y[1][2], !(i.biff <= 5)) {
          var A = "";
          if (14849 == ((o[I] || [])[0] || [])[0] || (1025 == ((o[I] || [])[0] || [])[0] ? o[I][b] && o[I][b].itab >
              0 && (A = o.SheetNames[o[I][b].itab - 1] + "!") : A = o.SheetNames[b - 1] + "!"), o[I] && o[I][b]) A += o[
            I][b].Name;
          else if (o[0] && o[0][b]) A += o[0][b].Name;
          else {
            var E = (Vk(o, I, i) || "").split(";;");
            E[b - 1] ? A = E[b - 1] : A += "SH33TJSERRX"
          }
          u.push(A);
          break
        }
        I < 0 && (I = -I), o[I] && (T = o[I][b]), T || (T = {
          Name: "SH33TJSERRY"
        }), u.push(T.Name);
        break;
      case "PtgParen":
        var P = "(",
          O = ")";
        if (g >= 0) {
          switch (f = "", t[0][g][1][0]) {
            case 2:
              P = Sg(" ", t[0][g][1][1]) + P;
              break;
            case 3:
              P = Sg("\r", t[0][g][1][1]) + P;
              break;
            case 4:
              O = Sg(" ", t[0][g][1][1]) + O;
              break;
            case 5:
              O = Sg("\r", t[0][g][1][1]) + O;
              break;
            default:
              if (i.WTF) throw new Error("Unexpected PtgAttrSpaceType " + t[0][g][1][0])
          }
          g = -1
        }
        u.push(P + u.pop() + O);
        break;
      case "PtgRefErr":
      case "PtgRefErr3d":
      case "PtgAreaErr":
      case "PtgAreaErr3d":
        u.push("#REF!");
        break;
      case "PtgExp":
        s = {
          c: y[1][1],
          r: y[1][0]
        };
        var M = {
          c: n.c,
          r: n.r
        };
        if (o.sharedf[bh(s)]) {
          var L = o.sharedf[bh(s)];
          u.push($k(L, d, M, o, i))
        } else {
          var _ = !1;
          for (a = 0; a != o.arrayf.length; ++a)
            if (r = o.arrayf[a], !(s.c < r[0].s.c || s.c > r[0].e.c || s.r < r[0].s.r || s.r > r[0].e.r)) {
              u.push($k(r[1], d, M, o, i)), _ = !0;
              break
            } _ || u.push(y[1])
        }
        break;
      case "PtgArray":
        u.push("{" + Rk(y[1]) + "}");
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        g = h;
        break;
      case "PtgMissArg":
        u.push("");
        break;
      case "PtgList":
        u.push("Table" + y[1].idx + "[#" + y[1].rt + "]");
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      default:
        throw new Error("Unrecognized Formula Token: " + String(y))
    }
    if (3 != i.biff && g >= 0 && -1 == ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"].indexOf(t[0][h][0])) {
      var B = !0;
      switch ((y = t[0][g])[1][0]) {
        case 4:
          B = !1;
        case 0:
          f = Sg(" ", y[1][1]);
          break;
        case 5:
          B = !1;
        case 1:
          f = Sg("\r", y[1][1]);
          break;
        default:
          if (f = "", i.WTF) throw new Error("Unexpected PtgAttrSpaceType " + y[1][0])
      }
      u.push((B ? f : "") + u.pop() + (B ? "" : f)), g = -1
    }
  }
  if (u.length > 1 && i.WTF) throw new Error("bad formula stack");
  return u[0]
}

function zk(t, e, n) {
  var o, i = t.l + e,
    a = 2 == n.biff ? 1 : 2,
    r = t.read_shift(a);
  if (65535 == r) return [
    [], th(t, e - 2)
  ];
  var s = Fk(t, r, n);
  return e !== r + a && (o = Bk(t, e - r - a, s, n)), t.l = i, [s, o]
}

function Uk(t, e, n) {
  var o, i = t.l + e,
    a = t.read_shift(2),
    r = Fk(t, a, n);
  return 65535 == a ? [
    [], th(t, e - 2)
  ] : (e !== a + 2 && (o = Bk(t, i - a - 2, r, n)), [r, o])
}

function jk(t, e, n) {
  var o = t.l + e,
    i = Ov(t);
  2 == n.biff && ++t.l;
  var a = function(t) {
      var e;
      if (65535 !== Uf(t, t.l + 6)) return [Fh(t), "n"];
      switch (t[t.l]) {
        case 0:
          return t.l += 8, ["String", "s"];
        case 1:
          return e = 1 === t[t.l + 2], t.l += 8, [e, "b"];
        case 2:
          return e = t[t.l + 2], t.l += 8, [e, "e"];
        case 3:
          return t.l += 8, ["", "s"]
      }
      return []
    }(t),
    r = t.read_shift(1);
  2 != n.biff && (t.read_shift(1), n.biff >= 5 && t.read_shift(4));
  var s = function(t, e, n) {
    var o, i = t.l + e,
      a = 2 == n.biff ? 1 : 2,
      r = t.read_shift(a);
    if (65535 == r) return [
      [], th(t, e - 2)
    ];
    var s = Fk(t, r, n);
    return e !== r + a && (o = Bk(t, e - r - a, s, n)), t.l = i, [s, o]
  }(t, o - t.l, n);
  return {
    cell: i,
    val: a[0],
    formula: s,
    shared: r >> 3 & 1,
    tt: a[1]
  }
}

function Hk(t, e, n) {
  var o = t.read_shift(4),
    i = Fk(t, o, n),
    a = t.read_shift(4);
  return [i, a > 0 ? Bk(t, a, i, n) : null]
}
var Gk = Hk,
  Kk = Hk,
  Wk = Hk,
  qk = Hk,
  Yk = {
    0: "BEEP",
    1: "OPEN",
    2: "OPEN.LINKS",
    3: "CLOSE.ALL",
    4: "SAVE",
    5: "SAVE.AS",
    6: "FILE.DELETE",
    7: "PAGE.SETUP",
    8: "PRINT",
    9: "PRINTER.SETUP",
    10: "QUIT",
    11: "NEW.WINDOW",
    12: "ARRANGE.ALL",
    13: "WINDOW.SIZE",
    14: "WINDOW.MOVE",
    15: "FULL",
    16: "CLOSE",
    17: "RUN",
    22: "SET.PRINT.AREA",
    23: "SET.PRINT.TITLES",
    24: "SET.PAGE.BREAK",
    25: "REMOVE.PAGE.BREAK",
    26: "FONT",
    27: "DISPLAY",
    28: "PROTECT.DOCUMENT",
    29: "PRECISION",
    30: "A1.R1C1",
    31: "CALCULATE.NOW",
    32: "CALCULATION",
    34: "DATA.FIND",
    35: "EXTRACT",
    36: "DATA.DELETE",
    37: "SET.DATABASE",
    38: "SET.CRITERIA",
    39: "SORT",
    40: "DATA.SERIES",
    41: "TABLE",
    42: "FORMAT.NUMBER",
    43: "ALIGNMENT",
    44: "STYLE",
    45: "BORDER",
    46: "CELL.PROTECTION",
    47: "COLUMN.WIDTH",
    48: "UNDO",
    49: "CUT",
    50: "COPY",
    51: "PASTE",
    52: "CLEAR",
    53: "PASTE.SPECIAL",
    54: "EDIT.DELETE",
    55: "INSERT",
    56: "FILL.RIGHT",
    57: "FILL.DOWN",
    61: "DEFINE.NAME",
    62: "CREATE.NAMES",
    63: "FORMULA.GOTO",
    64: "FORMULA.FIND",
    65: "SELECT.LAST.CELL",
    66: "SHOW.ACTIVE.CELL",
    67: "GALLERY.AREA",
    68: "GALLERY.BAR",
    69: "GALLERY.COLUMN",
    70: "GALLERY.LINE",
    71: "GALLERY.PIE",
    72: "GALLERY.SCATTER",
    73: "COMBINATION",
    74: "PREFERRED",
    75: "ADD.OVERLAY",
    76: "GRIDLINES",
    77: "SET.PREFERRED",
    78: "AXES",
    79: "LEGEND",
    80: "ATTACH.TEXT",
    81: "ADD.ARROW",
    82: "SELECT.CHART",
    83: "SELECT.PLOT.AREA",
    84: "PATTERNS",
    85: "MAIN.CHART",
    86: "OVERLAY",
    87: "SCALE",
    88: "FORMAT.LEGEND",
    89: "FORMAT.TEXT",
    90: "EDIT.REPEAT",
    91: "PARSE",
    92: "JUSTIFY",
    93: "HIDE",
    94: "UNHIDE",
    95: "WORKSPACE",
    96: "FORMULA",
    97: "FORMULA.FILL",
    98: "FORMULA.ARRAY",
    99: "DATA.FIND.NEXT",
    100: "DATA.FIND.PREV",
    101: "FORMULA.FIND.NEXT",
    102: "FORMULA.FIND.PREV",
    103: "ACTIVATE",
    104: "ACTIVATE.NEXT",
    105: "ACTIVATE.PREV",
    106: "UNLOCKED.NEXT",
    107: "UNLOCKED.PREV",
    108: "COPY.PICTURE",
    109: "SELECT",
    110: "DELETE.NAME",
    111: "DELETE.FORMAT",
    112: "VLINE",
    113: "HLINE",
    114: "VPAGE",
    115: "HPAGE",
    116: "VSCROLL",
    117: "HSCROLL",
    118: "ALERT",
    119: "NEW",
    120: "CANCEL.COPY",
    121: "SHOW.CLIPBOARD",
    122: "MESSAGE",
    124: "PASTE.LINK",
    125: "APP.ACTIVATE",
    126: "DELETE.ARROW",
    127: "ROW.HEIGHT",
    128: "FORMAT.MOVE",
    129: "FORMAT.SIZE",
    130: "FORMULA.REPLACE",
    131: "SEND.KEYS",
    132: "SELECT.SPECIAL",
    133: "APPLY.NAMES",
    134: "REPLACE.FONT",
    135: "FREEZE.PANES",
    136: "SHOW.INFO",
    137: "SPLIT",
    138: "ON.WINDOW",
    139: "ON.DATA",
    140: "DISABLE.INPUT",
    142: "OUTLINE",
    143: "LIST.NAMES",
    144: "FILE.CLOSE",
    145: "SAVE.WORKBOOK",
    146: "DATA.FORM",
    147: "COPY.CHART",
    148: "ON.TIME",
    149: "WAIT",
    150: "FORMAT.FONT",
    151: "FILL.UP",
    152: "FILL.LEFT",
    153: "DELETE.OVERLAY",
    155: "SHORT.MENUS",
    159: "SET.UPDATE.STATUS",
    161: "COLOR.PALETTE",
    162: "DELETE.STYLE",
    163: "WINDOW.RESTORE",
    164: "WINDOW.MAXIMIZE",
    166: "CHANGE.LINK",
    167: "CALCULATE.DOCUMENT",
    168: "ON.KEY",
    169: "APP.RESTORE",
    170: "APP.MOVE",
    171: "APP.SIZE",
    172: "APP.MINIMIZE",
    173: "APP.MAXIMIZE",
    174: "BRING.TO.FRONT",
    175: "SEND.TO.BACK",
    185: "MAIN.CHART.TYPE",
    186: "OVERLAY.CHART.TYPE",
    187: "SELECT.END",
    188: "OPEN.MAIL",
    189: "SEND.MAIL",
    190: "STANDARD.FONT",
    191: "CONSOLIDATE",
    192: "SORT.SPECIAL",
    193: "GALLERY.3D.AREA",
    194: "GALLERY.3D.COLUMN",
    195: "GALLERY.3D.LINE",
    196: "GALLERY.3D.PIE",
    197: "VIEW.3D",
    198: "GOAL.SEEK",
    199: "WORKGROUP",
    200: "FILL.GROUP",
    201: "UPDATE.LINK",
    202: "PROMOTE",
    203: "DEMOTE",
    204: "SHOW.DETAIL",
    206: "UNGROUP",
    207: "OBJECT.PROPERTIES",
    208: "SAVE.NEW.OBJECT",
    209: "SHARE",
    210: "SHARE.NAME",
    211: "DUPLICATE",
    212: "APPLY.STYLE",
    213: "ASSIGN.TO.OBJECT",
    214: "OBJECT.PROTECTION",
    215: "HIDE.OBJECT",
    216: "SET.EXTRACT",
    217: "CREATE.PUBLISHER",
    218: "SUBSCRIBE.TO",
    219: "ATTRIBUTES",
    220: "SHOW.TOOLBAR",
    222: "PRINT.PREVIEW",
    223: "EDIT.COLOR",
    224: "SHOW.LEVELS",
    225: "FORMAT.MAIN",
    226: "FORMAT.OVERLAY",
    227: "ON.RECALC",
    228: "EDIT.SERIES",
    229: "DEFINE.STYLE",
    240: "LINE.PRINT",
    243: "ENTER.DATA",
    249: "GALLERY.RADAR",
    250: "MERGE.STYLES",
    251: "EDITION.OPTIONS",
    252: "PASTE.PICTURE",
    253: "PASTE.PICTURE.LINK",
    254: "SPELLING",
    256: "ZOOM",
    259: "INSERT.OBJECT",
    260: "WINDOW.MINIMIZE",
    265: "SOUND.NOTE",
    266: "SOUND.PLAY",
    267: "FORMAT.SHAPE",
    268: "EXTEND.POLYGON",
    269: "FORMAT.AUTO",
    272: "GALLERY.3D.BAR",
    273: "GALLERY.3D.SURFACE",
    274: "FILL.AUTO",
    276: "CUSTOMIZE.TOOLBAR",
    277: "ADD.TOOL",
    278: "EDIT.OBJECT",
    279: "ON.DOUBLECLICK",
    280: "ON.ENTRY",
    281: "WORKBOOK.ADD",
    282: "WORKBOOK.MOVE",
    283: "WORKBOOK.COPY",
    284: "WORKBOOK.OPTIONS",
    285: "SAVE.WORKSPACE",
    288: "CHART.WIZARD",
    289: "DELETE.TOOL",
    290: "MOVE.TOOL",
    291: "WORKBOOK.SELECT",
    292: "WORKBOOK.ACTIVATE",
    293: "ASSIGN.TO.TOOL",
    295: "COPY.TOOL",
    296: "RESET.TOOL",
    297: "CONSTRAIN.NUMERIC",
    298: "PASTE.TOOL",
    302: "WORKBOOK.NEW",
    305: "SCENARIO.CELLS",
    306: "SCENARIO.DELETE",
    307: "SCENARIO.ADD",
    308: "SCENARIO.EDIT",
    309: "SCENARIO.SHOW",
    310: "SCENARIO.SHOW.NEXT",
    311: "SCENARIO.SUMMARY",
    312: "PIVOT.TABLE.WIZARD",
    313: "PIVOT.FIELD.PROPERTIES",
    314: "PIVOT.FIELD",
    315: "PIVOT.ITEM",
    316: "PIVOT.ADD.FIELDS",
    318: "OPTIONS.CALCULATION",
    319: "OPTIONS.EDIT",
    320: "OPTIONS.VIEW",
    321: "ADDIN.MANAGER",
    322: "MENU.EDITOR",
    323: "ATTACH.TOOLBARS",
    324: "VBAActivate",
    325: "OPTIONS.CHART",
    328: "VBA.INSERT.FILE",
    330: "VBA.PROCEDURE.DEFINITION",
    336: "ROUTING.SLIP",
    338: "ROUTE.DOCUMENT",
    339: "MAIL.LOGON",
    342: "INSERT.PICTURE",
    343: "EDIT.TOOL",
    344: "GALLERY.DOUGHNUT",
    350: "CHART.TREND",
    352: "PIVOT.ITEM.PROPERTIES",
    354: "WORKBOOK.INSERT",
    355: "OPTIONS.TRANSITION",
    356: "OPTIONS.GENERAL",
    370: "FILTER.ADVANCED",
    373: "MAIL.ADD.MAILER",
    374: "MAIL.DELETE.MAILER",
    375: "MAIL.REPLY",
    376: "MAIL.REPLY.ALL",
    377: "MAIL.FORWARD",
    378: "MAIL.NEXT.LETTER",
    379: "DATA.LABEL",
    380: "INSERT.TITLE",
    381: "FONT.PROPERTIES",
    382: "MACRO.OPTIONS",
    383: "WORKBOOK.HIDE",
    384: "WORKBOOK.UNHIDE",
    385: "WORKBOOK.DELETE",
    386: "WORKBOOK.NAME",
    388: "GALLERY.CUSTOM",
    390: "ADD.CHART.AUTOFORMAT",
    391: "DELETE.CHART.AUTOFORMAT",
    392: "CHART.ADD.DATA",
    393: "AUTO.OUTLINE",
    394: "TAB.ORDER",
    395: "SHOW.DIALOG",
    396: "SELECT.ALL",
    397: "UNGROUP.SHEETS",
    398: "SUBTOTAL.CREATE",
    399: "SUBTOTAL.REMOVE",
    400: "RENAME.OBJECT",
    412: "WORKBOOK.SCROLL",
    413: "WORKBOOK.NEXT",
    414: "WORKBOOK.PREV",
    415: "WORKBOOK.TAB.SPLIT",
    416: "FULL.SCREEN",
    417: "WORKBOOK.PROTECT",
    420: "SCROLLBAR.PROPERTIES",
    421: "PIVOT.SHOW.PAGES",
    422: "TEXT.TO.COLUMNS",
    423: "FORMAT.CHARTTYPE",
    424: "LINK.FORMAT",
    425: "TRACER.DISPLAY",
    430: "TRACER.NAVIGATE",
    431: "TRACER.CLEAR",
    432: "TRACER.ERROR",
    433: "PIVOT.FIELD.GROUP",
    434: "PIVOT.FIELD.UNGROUP",
    435: "CHECKBOX.PROPERTIES",
    436: "LABEL.PROPERTIES",
    437: "LISTBOX.PROPERTIES",
    438: "EDITBOX.PROPERTIES",
    439: "PIVOT.REFRESH",
    440: "LINK.COMBO",
    441: "OPEN.TEXT",
    442: "HIDE.DIALOG",
    443: "SET.DIALOG.FOCUS",
    444: "ENABLE.OBJECT",
    445: "PUSHBUTTON.PROPERTIES",
    446: "SET.DIALOG.DEFAULT",
    447: "FILTER",
    448: "FILTER.SHOW.ALL",
    449: "CLEAR.OUTLINE",
    450: "FUNCTION.WIZARD",
    451: "ADD.LIST.ITEM",
    452: "SET.LIST.ITEM",
    453: "REMOVE.LIST.ITEM",
    454: "SELECT.LIST.ITEM",
    455: "SET.CONTROL.VALUE",
    456: "SAVE.COPY.AS",
    458: "OPTIONS.LISTS.ADD",
    459: "OPTIONS.LISTS.DELETE",
    460: "SERIES.AXES",
    461: "SERIES.X",
    462: "SERIES.Y",
    463: "ERRORBAR.X",
    464: "ERRORBAR.Y",
    465: "FORMAT.CHART",
    466: "SERIES.ORDER",
    467: "MAIL.LOGOFF",
    468: "CLEAR.ROUTING.SLIP",
    469: "APP.ACTIVATE.MICROSOFT",
    470: "MAIL.EDIT.MAILER",
    471: "ON.SHEET",
    472: "STANDARD.WIDTH",
    473: "SCENARIO.MERGE",
    474: "SUMMARY.INFO",
    475: "FIND.FILE",
    476: "ACTIVE.CELL.FONT",
    477: "ENABLE.TIPWIZARD",
    478: "VBA.MAKE.ADDIN",
    480: "INSERTDATATABLE",
    481: "WORKGROUP.OPTIONS",
    482: "MAIL.SEND.MAILER",
    485: "AUTOCORRECT",
    489: "POST.DOCUMENT",
    491: "PICKLIST",
    493: "VIEW.SHOW",
    494: "VIEW.DEFINE",
    495: "VIEW.DELETE",
    509: "SHEET.BACKGROUND",
    510: "INSERT.MAP.OBJECT",
    511: "OPTIONS.MENONO",
    517: "MSOCHECKS",
    518: "NORMAL",
    519: "LAYOUT",
    520: "RM.PRINT.AREA",
    521: "CLEAR.PRINT.AREA",
    522: "ADD.PRINT.AREA",
    523: "MOVE.BRK",
    545: "HIDECURR.NOTE",
    546: "HIDEALL.NOTES",
    547: "DELETE.NOTE",
    548: "TRAVERSE.NOTES",
    549: "ACTIVATE.NOTES",
    620: "PROTECT.REVISIONS",
    621: "UNPROTECT.REVISIONS",
    647: "OPTIONS.ME",
    653: "WEB.PUBLISH",
    667: "NEWWEBQUERY",
    673: "PIVOT.TABLE.CHART",
    753: "OPTIONS.SAVE",
    755: "OPTIONS.SPELL",
    808: "HIDEALL.INKANNOTS"
  },
  Xk = {
    0: "COUNT",
    1: "IF",
    2: "ISNA",
    3: "ISERROR",
    4: "SUM",
    5: "AVERAGE",
    6: "MIN",
    7: "MAX",
    8: "ROW",
    9: "COLUMN",
    10: "NA",
    11: "NPV",
    12: "STDEV",
    13: "DOLLAR",
    14: "FIXED",
    15: "SIN",
    16: "COS",
    17: "TAN",
    18: "ATAN",
    19: "PI",
    20: "SQRT",
    21: "EXP",
    22: "LN",
    23: "LOG10",
    24: "ABS",
    25: "INT",
    26: "SIGN",
    27: "ROUND",
    28: "LOOKUP",
    29: "INDEX",
    30: "REPT",
    31: "MID",
    32: "LEN",
    33: "VALUE",
    34: "TRUE",
    35: "FALSE",
    36: "AND",
    37: "OR",
    38: "NOT",
    39: "MOD",
    40: "DCOUNT",
    41: "DSUM",
    42: "DAVERAGE",
    43: "DMIN",
    44: "DMAX",
    45: "DSTDEV",
    46: "VAR",
    47: "DVAR",
    48: "TEXT",
    49: "LINEST",
    50: "TREND",
    51: "LOGEST",
    52: "GROWTH",
    53: "GOTO",
    54: "HALT",
    55: "RETURN",
    56: "PV",
    57: "FV",
    58: "NPER",
    59: "PMT",
    60: "RATE",
    61: "MIRR",
    62: "IRR",
    63: "RAND",
    64: "MATCH",
    65: "DATE",
    66: "TIME",
    67: "DAY",
    68: "MONTH",
    69: "YEAR",
    70: "WEEKDAY",
    71: "HOUR",
    72: "MINUTE",
    73: "SECOND",
    74: "NOW",
    75: "AREAS",
    76: "ROWS",
    77: "COLUMNS",
    78: "OFFSET",
    79: "ABSREF",
    80: "RELREF",
    81: "ARGUMENT",
    82: "SEARCH",
    83: "TRANSPOSE",
    84: "ERROR",
    85: "STEP",
    86: "TYPE",
    87: "ECHO",
    88: "SET.NAME",
    89: "CALLER",
    90: "DEREF",
    91: "WINDOWS",
    92: "SERIES",
    93: "DOCUMENTS",
    94: "ACTIVE.CELL",
    95: "SELECTION",
    96: "RESULT",
    97: "ATAN2",
    98: "ASIN",
    99: "ACOS",
    100: "CHOOSE",
    101: "HLOOKUP",
    102: "VLOOKUP",
    103: "LINKS",
    104: "INPUT",
    105: "ISREF",
    106: "GET.FORMULA",
    107: "GET.NAME",
    108: "SET.VALUE",
    109: "LOG",
    110: "EXEC",
    111: "CHAR",
    112: "LOWER",
    113: "UPPER",
    114: "PROPER",
    115: "LEFT",
    116: "RIGHT",
    117: "EXACT",
    118: "TRIM",
    119: "REPLACE",
    120: "SUBSTITUTE",
    121: "CODE",
    122: "NAMES",
    123: "DIRECTORY",
    124: "FIND",
    125: "CELL",
    126: "ISERR",
    127: "ISTEXT",
    128: "ISNUMBER",
    129: "ISBLANK",
    130: "T",
    131: "N",
    132: "FOPEN",
    133: "FCLOSE",
    134: "FSIZE",
    135: "FREADLN",
    136: "FREAD",
    137: "FWRITELN",
    138: "FWRITE",
    139: "FPOS",
    140: "DATEVALUE",
    141: "TIMEVALUE",
    142: "SLN",
    143: "SYD",
    144: "DDB",
    145: "GET.DEF",
    146: "REFTEXT",
    147: "TEXTREF",
    148: "INDIRECT",
    149: "REGISTER",
    150: "CALL",
    151: "ADD.BAR",
    152: "ADD.MENU",
    153: "ADD.COMMAND",
    154: "ENABLE.COMMAND",
    155: "CHECK.COMMAND",
    156: "RENAME.COMMAND",
    157: "SHOW.BAR",
    158: "DELETE.MENU",
    159: "DELETE.COMMAND",
    160: "GET.CHART.ITEM",
    161: "DIALOG.BOX",
    162: "CLEAN",
    163: "MDETERM",
    164: "MINVERSE",
    165: "MMULT",
    166: "FILES",
    167: "IPMT",
    168: "PPMT",
    169: "COUNTA",
    170: "CANCEL.KEY",
    171: "FOR",
    172: "WHILE",
    173: "BREAK",
    174: "NEXT",
    175: "INITIATE",
    176: "REQUEST",
    177: "POKE",
    178: "EXECUTE",
    179: "TERMINATE",
    180: "RESTART",
    181: "HELP",
    182: "GET.BAR",
    183: "PRODUCT",
    184: "FACT",
    185: "GET.CELL",
    186: "GET.WORKSPACE",
    187: "GET.WINDOW",
    188: "GET.DOCUMENT",
    189: "DPRODUCT",
    190: "ISNONTEXT",
    191: "GET.NOTE",
    192: "NOTE",
    193: "STDEVP",
    194: "VARP",
    195: "DSTDEVP",
    196: "DVARP",
    197: "TRUNC",
    198: "ISLOGICAL",
    199: "DCOUNTA",
    200: "DELETE.BAR",
    201: "UNREGISTER",
    204: "USDOLLAR",
    205: "FINDB",
    206: "SEARCHB",
    207: "REPLACEB",
    208: "LEFTB",
    209: "RIGHTB",
    210: "MIDB",
    211: "LENB",
    212: "ROUNDUP",
    213: "ROUNDDOWN",
    214: "ASC",
    215: "DBCS",
    216: "RANK",
    219: "ADDRESS",
    220: "DAYS360",
    221: "TODAY",
    222: "VDB",
    223: "ELSE",
    224: "ELSE.IF",
    225: "END.IF",
    226: "FOR.CELL",
    227: "MEDIAN",
    228: "SUMPRODUCT",
    229: "SINH",
    230: "COSH",
    231: "TANH",
    232: "ASINH",
    233: "ACOSH",
    234: "ATANH",
    235: "DGET",
    236: "CREATE.OBJECT",
    237: "VOLATILE",
    238: "LAST.ERROR",
    239: "CUSTOM.UNDO",
    240: "CUSTOM.REPEAT",
    241: "FORMULA.CONVERT",
    242: "GET.LINK.INFO",
    243: "TEXT.BOX",
    244: "INFO",
    245: "GROUP",
    246: "GET.OBJECT",
    247: "DB",
    248: "PAUSE",
    251: "RESUME",
    252: "FREQUENCY",
    253: "ADD.TOOLBAR",
    254: "DELETE.TOOLBAR",
    255: "User",
    256: "RESET.TOOLBAR",
    257: "EVALUATE",
    258: "GET.TOOLBAR",
    259: "GET.TOOL",
    260: "SPELLING.CHECK",
    261: "ERROR.TYPE",
    262: "APP.TITLE",
    263: "WINDOW.TITLE",
    264: "SAVE.TOOLBAR",
    265: "ENABLE.TOOL",
    266: "PRESS.TOOL",
    267: "REGISTER.ID",
    268: "GET.WORKBOOK",
    269: "AVEDEV",
    270: "BETADIST",
    271: "GAMMALN",
    272: "BETAINV",
    273: "BINOMDIST",
    274: "CHIDIST",
    275: "CHIINV",
    276: "COMBIN",
    277: "CONFIDENCE",
    278: "CRITBINOM",
    279: "EVEN",
    280: "EXPONDIST",
    281: "FDIST",
    282: "FINV",
    283: "FISHER",
    284: "FISHERINV",
    285: "FLOOR",
    286: "GAMMADIST",
    287: "GAMMAINV",
    288: "CEILING",
    289: "HYPGEOMDIST",
    290: "LOGNORMDIST",
    291: "LOGINV",
    292: "NEGBINOMDIST",
    293: "NORMDIST",
    294: "NORMSDIST",
    295: "NORMINV",
    296: "NORMSINV",
    297: "STANDARDIZE",
    298: "ODD",
    299: "PERMUT",
    300: "POISSON",
    301: "TDIST",
    302: "WEIBULL",
    303: "SUMXMY2",
    304: "SUMX2MY2",
    305: "SUMX2PY2",
    306: "CHITEST",
    307: "CORREL",
    308: "COVAR",
    309: "FORECAST",
    310: "FTEST",
    311: "INTERCEPT",
    312: "PEARSON",
    313: "RSQ",
    314: "STEYX",
    315: "SLOPE",
    316: "TTEST",
    317: "PROB",
    318: "DEVSQ",
    319: "GEOMEAN",
    320: "HARMEAN",
    321: "SUMSQ",
    322: "KURT",
    323: "SKEW",
    324: "ZTEST",
    325: "LARGE",
    326: "SMALL",
    327: "QUARTILE",
    328: "PERCENTILE",
    329: "PERCENTRANK",
    330: "MODE",
    331: "TRIMMEAN",
    332: "TINV",
    334: "MOVIE.COMMAND",
    335: "GET.MOVIE",
    336: "CONCATENATE",
    337: "POWER",
    338: "PIVOT.ADD.DATA",
    339: "GET.PIVOT.TABLE",
    340: "GET.PIVOT.FIELD",
    341: "GET.PIVOT.ITEM",
    342: "RADIANS",
    343: "DEGREES",
    344: "SUBTOTAL",
    345: "SUMIF",
    346: "COUNTIF",
    347: "COUNTBLANK",
    348: "SCENARIO.GET",
    349: "OPTIONS.LISTS.GET",
    350: "ISPMT",
    351: "DATEDIF",
    352: "DATESTRING",
    353: "NUMBERSTRING",
    354: "ROMAN",
    355: "OPEN.DIALOG",
    356: "SAVE.DIALOG",
    357: "VIEW.GET",
    358: "GETPIVOTDATA",
    359: "HYPERLINK",
    360: "PHONETIC",
    361: "AVERAGEA",
    362: "MAXA",
    363: "MINA",
    364: "STDEVPA",
    365: "VARPA",
    366: "STDEVA",
    367: "VARA",
    368: "BAHTTEXT",
    369: "THAIDAYOFWEEK",
    370: "THAIDIGIT",
    371: "THAIMONTHOFYEAR",
    372: "THAINUMSOUND",
    373: "THAINUMSTRING",
    374: "THAISTRINGLENGTH",
    375: "ISTHAIDIGIT",
    376: "ROUNDBAHTDOWN",
    377: "ROUNDBAHTUP",
    378: "THAIYEAR",
    379: "RTD",
    380: "CUBEVALUE",
    381: "CUBEMEMBER",
    382: "CUBEMEMBERPROPERTY",
    383: "CUBERANKEDMEMBER",
    384: "HEX2BIN",
    385: "HEX2DEC",
    386: "HEX2OCT",
    387: "DEC2BIN",
    388: "DEC2HEX",
    389: "DEC2OCT",
    390: "OCT2BIN",
    391: "OCT2HEX",
    392: "OCT2DEC",
    393: "BIN2DEC",
    394: "BIN2OCT",
    395: "BIN2HEX",
    396: "IMSUB",
    397: "IMDIV",
    398: "IMPOWER",
    399: "IMABS",
    400: "IMSQRT",
    401: "IMLN",
    402: "IMLOG2",
    403: "IMLOG10",
    404: "IMSIN",
    405: "IMCOS",
    406: "IMEXP",
    407: "IMARGUMENT",
    408: "IMCONJUGATE",
    409: "IMAGINARY",
    410: "IMREAL",
    411: "COMPLEX",
    412: "IMSUM",
    413: "IMPRODUCT",
    414: "SERIESSUM",
    415: "FACTDOUBLE",
    416: "SQRTPI",
    417: "QUOTIENT",
    418: "DELTA",
    419: "GESTEP",
    420: "ISEVEN",
    421: "ISODD",
    422: "MROUND",
    423: "ERF",
    424: "ERFC",
    425: "BESSELJ",
    426: "BESSELK",
    427: "BESSELY",
    428: "BESSELI",
    429: "XIRR",
    430: "XNPV",
    431: "PRICEMAT",
    432: "YIELDMAT",
    433: "INTRATE",
    434: "RECEIVED",
    435: "DISC",
    436: "PRICEDISC",
    437: "YIELDDISC",
    438: "TBILLEQ",
    439: "TBILLPRICE",
    440: "TBILLYIELD",
    441: "PRICE",
    442: "YIELD",
    443: "DOLLARDE",
    444: "DOLLARFR",
    445: "NOMINAL",
    446: "EFFECT",
    447: "CUMPRINC",
    448: "CUMIPMT",
    449: "EDATE",
    450: "EOMONTH",
    451: "YEARFRAC",
    452: "COUPDAYBS",
    453: "COUPDAYS",
    454: "COUPDAYSNC",
    455: "COUPNCD",
    456: "COUPNUM",
    457: "COUPPCD",
    458: "DURATION",
    459: "MDURATION",
    460: "ODDLPRICE",
    461: "ODDLYIELD",
    462: "ODDFPRICE",
    463: "ODDFYIELD",
    464: "RANDBETWEEN",
    465: "WEEKNUM",
    466: "AMORDEGRC",
    467: "AMORLINC",
    468: "CONVERT",
    724: "SHEETJS",
    469: "ACCRINT",
    470: "ACCRINTM",
    471: "WORKDAY",
    472: "NETWORKDAYS",
    473: "GCD",
    474: "MULTINOMIAL",
    475: "LCM",
    476: "FVSCHEDULE",
    477: "CUBEKPIMEMBER",
    478: "CUBESET",
    479: "CUBESETCOUNT",
    480: "IFERROR",
    481: "COUNTIFS",
    482: "SUMIFS",
    483: "AVERAGEIF",
    484: "AVERAGEIFS"
  },
  Jk = {
    2: 1,
    3: 1,
    10: 0,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 0,
    20: 1,
    21: 1,
    22: 1,
    23: 1,
    24: 1,
    25: 1,
    26: 1,
    27: 2,
    30: 2,
    31: 3,
    32: 1,
    33: 1,
    34: 0,
    35: 0,
    38: 1,
    39: 2,
    40: 3,
    41: 3,
    42: 3,
    43: 3,
    44: 3,
    45: 3,
    47: 3,
    48: 2,
    53: 1,
    61: 3,
    63: 0,
    65: 3,
    66: 3,
    67: 1,
    68: 1,
    69: 1,
    70: 1,
    71: 1,
    72: 1,
    73: 1,
    74: 0,
    75: 1,
    76: 1,
    77: 1,
    79: 2,
    80: 2,
    83: 1,
    85: 0,
    86: 1,
    89: 0,
    90: 1,
    94: 0,
    95: 0,
    97: 2,
    98: 1,
    99: 1,
    101: 3,
    102: 3,
    105: 1,
    106: 1,
    108: 2,
    111: 1,
    112: 1,
    113: 1,
    114: 1,
    117: 2,
    118: 1,
    119: 4,
    121: 1,
    126: 1,
    127: 1,
    128: 1,
    129: 1,
    130: 1,
    131: 1,
    133: 1,
    134: 1,
    135: 1,
    136: 2,
    137: 2,
    138: 2,
    140: 1,
    141: 1,
    142: 3,
    143: 4,
    144: 4,
    161: 1,
    162: 1,
    163: 1,
    164: 1,
    165: 2,
    172: 1,
    175: 2,
    176: 2,
    177: 3,
    178: 2,
    179: 1,
    184: 1,
    186: 1,
    189: 3,
    190: 1,
    195: 3,
    196: 3,
    197: 1,
    198: 1,
    199: 3,
    201: 1,
    207: 4,
    210: 3,
    211: 1,
    212: 2,
    213: 2,
    214: 1,
    215: 1,
    225: 0,
    229: 1,
    230: 1,
    231: 1,
    232: 1,
    233: 1,
    234: 1,
    235: 3,
    244: 1,
    247: 4,
    252: 2,
    257: 1,
    261: 1,
    271: 1,
    273: 4,
    274: 2,
    275: 2,
    276: 2,
    277: 3,
    278: 3,
    279: 1,
    280: 3,
    281: 3,
    282: 3,
    283: 1,
    284: 1,
    285: 2,
    286: 4,
    287: 3,
    288: 2,
    289: 4,
    290: 3,
    291: 3,
    292: 3,
    293: 4,
    294: 1,
    295: 3,
    296: 1,
    297: 3,
    298: 1,
    299: 2,
    300: 3,
    301: 3,
    302: 4,
    303: 2,
    304: 2,
    305: 2,
    306: 2,
    307: 2,
    308: 2,
    309: 3,
    310: 2,
    311: 2,
    312: 2,
    313: 2,
    314: 2,
    315: 2,
    316: 4,
    325: 2,
    326: 2,
    327: 2,
    328: 2,
    331: 2,
    332: 2,
    337: 2,
    342: 1,
    343: 1,
    346: 2,
    347: 1,
    350: 4,
    351: 3,
    352: 1,
    353: 2,
    360: 1,
    368: 1,
    369: 1,
    370: 1,
    371: 1,
    372: 1,
    373: 1,
    374: 1,
    375: 1,
    376: 1,
    377: 1,
    378: 1,
    382: 3,
    385: 1,
    392: 1,
    393: 1,
    396: 2,
    397: 2,
    398: 2,
    399: 1,
    400: 1,
    401: 1,
    402: 1,
    403: 1,
    404: 1,
    405: 1,
    406: 1,
    407: 1,
    408: 1,
    409: 1,
    410: 1,
    414: 4,
    415: 1,
    416: 1,
    417: 2,
    420: 1,
    421: 1,
    422: 2,
    424: 1,
    425: 2,
    426: 2,
    427: 2,
    428: 2,
    430: 3,
    438: 3,
    439: 3,
    440: 3,
    443: 2,
    444: 2,
    445: 2,
    446: 2,
    447: 6,
    448: 6,
    449: 2,
    450: 2,
    464: 2,
    468: 3,
    476: 2,
    479: 1,
    480: 2,
    65535: 0
  };

function Zk(t) {
  return "of:" == t.slice(0, 3) && (t = t.slice(3)), 61 == t.charCodeAt(0) && 61 == (t = t.slice(1)).charCodeAt(0) && (
    t = t.slice(1)), (t = (t = (t = t.replace(/COM\.MICROSOFT\./g, "")).replace(
    /\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g,
    function(t, e) {
      return e.replace(/\./g, "")
    })).replace(/\[.(#[A-Z]*[?!])\]/g, "$1")).replace(/[;~]/g, ",").replace(/\|/g, ";")
}

function Qk(t) {
  var e = t.split(":");
  return [e[0].split(".")[0], e[0].split(".")[1] + (e.length > 1 ? ":" + (e[1].split(".")[1] || e[1].split(".")[0]) :
    "")]
}
var tx = {},
  ex = {};

function nx(t, e) {
  if (t) {
    var n = [.7, .7, .75, .75, .3, .3];
    "xlml" == e && (n = [1, 1, 1, 1, .5, .5]), null == t.left && (t.left = n[0]), null == t.right && (t.right = n[1]),
      null == t.top && (t.top = n[2]), null == t.bottom && (t.bottom = n[3]), null == t.header && (t.header = n[4]),
      null == t.footer && (t.footer = n[5])
  }
}

function ox(t, e, n, o, i, a) {
  try {
    o.cellNF && (t.z = Sm[e])
  } catch (aD) {
    if (o.WTF) throw aD
  }
  if ("z" !== t.t || o.cellStyles) {
    if ("d" === t.t && "string" == typeof t.v && (t.v = xg(t.v)), (!o || !1 !== o.cellText) && "z" !== t.t) try {
      if (null == Sm[e] && og(ag[e] || "General", e), "e" === t.t) t.w = t.w || Gh[t.v];
      else if (0 === e)
        if ("n" === t.t)(0 | t.v) === t.v ? t.w = t.v.toString(10) : t.w = Bm(t.v);
        else if ("d" === t.t) {
        var r = pg(t.v);
        t.w = (0 | r) === r ? r.toString(10) : Bm(r)
      } else {
        if (void 0 === t.v) return "";
        t.w = Fm(t.v, ex)
      } else "d" === t.t ? t.w = ng(e, pg(t.v), ex) : t.w = ng(e, t.v, ex)
    } catch (aD) {
      if (o.WTF) throw aD
    }
    if (o.cellStyles && null != n) try {
      t.s = a.Fills[n], t.s.fgColor && t.s.fgColor.theme && !t.s.fgColor.rgb && (t.s.fgColor.rgb = Ly(i.themeElements
        .clrScheme[t.s.fgColor.theme].rgb, t.s.fgColor.tint || 0), o.WTF && (t.s.fgColor.raw_rgb = i.themeElements
        .clrScheme[t.s.fgColor.theme].rgb)), t.s.bgColor && t.s.bgColor.theme && (t.s.bgColor.rgb = Ly(i
        .themeElements.clrScheme[t.s.bgColor.theme].rgb, t.s.bgColor.tint || 0), o.WTF && (t.s.bgColor.raw_rgb = i
        .themeElements.clrScheme[t.s.bgColor.theme].rgb))
    } catch (aD) {
      if (o.WTF && a.Fills) throw aD
    }
  }
}
var ix = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g,
  ax = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/,
  rx = /<(?:\w:)?hyperlink [^>]*>/gm,
  sx = /"(\w*:\w*)"/,
  lx = /<(?:\w:)?col\b[^>]*[\/]?>/g,
  cx = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g,
  dx = /<(?:\w:)?pageMargins[^>]*\/>/g,
  ux = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/,
  px = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/,
  bx = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

function mx(t, e, n, o, i, a, r) {
  if (!t) return t;
  o || (o = {
    "!id": {}
  });
  var s = e.dense ? [] : {},
    l = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    },
    c = "",
    d = "",
    u = t.match(ax);
  u ? (c = t.slice(0, u.index), d = t.slice(u.index + u[0].length)) : c = d = t;
  var p = c.match(ux);
  p ? gx(p[0], s, i, n) : (p = c.match(px)) && function(t, e, n, o, i) {
    gx(t.slice(0, t.indexOf(">")), n, o, i)
  }(p[0], p[1], s, i, n);
  var b = (c.match(/<(?:\w*:)?dimension/) || {
    index: -1
  }).index;
  if (b > 0) {
    var m = c.slice(b, b + 50).match(sx);
    m && function(t, e) {
      var n = fh(e);
      n.s.r <= n.e.r && n.s.c <= n.e.c && n.s.r >= 0 && n.s.c >= 0 && (t["!ref"] = gh(n))
    }(s, m[1])
  }
  var g = c.match(bx);
  g && g[1] && function(t, e) {
    e.Views || (e.Views = [{}]);
    (t.match(fx) || []).forEach(function(t, n) {
      var o = Gg(t);
      e.Views[n] || (e.Views[n] = {}), +o.zoomScale && (e.Views[n].zoom = +o.zoomScale), tf(o.rightToLeft) && (e
        .Views[n].RTL = !0)
    })
  }(g[1], i);
  var f = [];
  if (e.cellStyles) {
    var h = c.match(lx);
    h && function(t, e) {
      for (var n = !1, o = 0; o != e.length; ++o) {
        var i = Gg(e[o], !0);
        i.hidden && (i.hidden = tf(i.hidden));
        var a = parseInt(i.min, 10) - 1,
          r = parseInt(i.max, 10) - 1;
        for (i.outlineLevel && (i.level = +i.outlineLevel || 0), delete i.min, delete i.max, i.width = +i.width, !n &&
          i.width && (n = !0, Vy(i.width)), Ny(i); a <= r;) t[a++] = Cg(i)
      }
    }(f, h)
  }
  u && hx(u[1], s, e, l, a, r);
  var v = d.match(cx);
  v && (s["!autofilter"] = function(t) {
    var e = {
      ref: (t.match(/ref="([^"]*)"/) || [])[1]
    };
    return e
  }(v[0]));
  var y = [],
    k = d.match(ix);
  if (k)
    for (b = 0; b != k.length; ++b) y[b] = fh(k[b].slice(k[b].indexOf('"') + 1));
  var x = d.match(rx);
  x && function(t, e, n) {
    for (var o = Array.isArray(t), i = 0; i != e.length; ++i) {
      var a = Gg(rf(e[i]), !0);
      if (!a.ref) return;
      var r = ((n || {})["!id"] || [])[a.id];
      r ? (a.Target = r.Target, a.location && (a.Target += "#" + Yg(a.location))) : (a.Target = "#" + Yg(a.location),
        r = {
          Target: a.Target,
          TargetMode: "Internal"
        }), a.Rel = r, a.tooltip && (a.Tooltip = a.tooltip, delete a.tooltip);
      for (var s = fh(a.ref), l = s.s.r; l <= s.e.r; ++l)
        for (var c = s.s.c; c <= s.e.c; ++c) {
          var d = bh({
            c,
            r: l
          });
          o ? (t[l] || (t[l] = []), t[l][c] || (t[l][c] = {
            t: "z",
            v: void 0
          }), t[l][c].l = a) : (t[d] || (t[d] = {
            t: "z",
            v: void 0
          }), t[d].l = a)
        }
    }
  }(s, x, o);
  var w, C, S = d.match(dx);
  if (S && (s["!margins"] = (w = Gg(S[0]), C = {}, ["left", "right", "top", "bottom", "header", "footer"].forEach(
      function(t) {
        w[t] && (C[t] = parseFloat(w[t]))
      }), C)), !s["!ref"] && l.e.c >= l.s.c && l.e.r >= l.s.r && (s["!ref"] = gh(l)), e.sheetRows > 0 && s["!ref"]) {
    var T = fh(s["!ref"]);
    e.sheetRows <= +T.e.r && (T.e.r = e.sheetRows - 1, T.e.r > l.e.r && (T.e.r = l.e.r), T.e.r < T.s.r && (T.s.r = T.e
        .r), T.e.c > l.e.c && (T.e.c = l.e.c), T.e.c < T.s.c && (T.s.c = T.e.c), s["!fullref"] = s["!ref"], s[
      "!ref"] = gh(T))
  }
  return f.length > 0 && (s["!cols"] = f), y.length > 0 && (s["!merges"] = y), s
}

function gx(t, e, n, o) {
  var i = Gg(t);
  n.Sheets[o] || (n.Sheets[o] = {}), i.codeName && (n.Sheets[o].CodeName = Yg(rf(i.codeName)))
}
var fx = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;
var hx = function() {
  var t = /<(?:\w+:)?c[ \/>]/,
    e = /<\/(?:\w+:)?row>/,
    n = /r=["']([^"']*)["']/,
    o = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/,
    i = /ref=["']([^"']*)["']/,
    a = lf("v"),
    r = lf("f");
  return function(s, l, c, d, u, p) {
    for (var b, m, g, f, h, v = 0, y = "", k = [], x = [], w = 0, C = 0, S = 0, T = "", I = 0, A = 0, E = 0, P = 0,
        O = Array.isArray(p.CellXf), M = [], L = [], _ = Array.isArray(l), B = [], F = {}, R = !1, D = !!c
        .sheetStubs, V = s.split(e), N = 0, $ = V.length; N != $; ++N) {
      var z = (y = V[N].trim()).length;
      if (0 !== z) {
        var U = 0;
        t: for (v = 0; v < z; ++v) switch (y[v]) {
          case ">":
            if ("/" != y[v - 1]) {
              ++v;
              break t
            }
            if (c && c.cellStyles) {
              if (I = null != (m = Gg(y.slice(U, v), !0)).r ? parseInt(m.r, 10) : I + 1, A = -1, c.sheetRows &&
                c.sheetRows < I) continue;
              F = {}, R = !1, m.ht && (R = !0, F.hpt = parseFloat(m.ht), F.hpx = Uy(F.hpt)), "1" == m.hidden &&
                (R = !0, F.hidden = !0), null != m.outlineLevel && (R = !0, F.level = +m.outlineLevel), R && (B[
                  I - 1] = F)
            }
            break;
          case "<":
            U = v
        }
        if (U >= v) break;
        if (I = null != (m = Gg(y.slice(U, v), !0)).r ? parseInt(m.r, 10) : I + 1, A = -1, !(c.sheetRows && c
            .sheetRows < I)) {
          d.s.r > I - 1 && (d.s.r = I - 1), d.e.r < I - 1 && (d.e.r = I - 1), c && c.cellStyles && (F = {}, R = !1,
              m.ht && (R = !0, F.hpt = parseFloat(m.ht), F.hpx = Uy(F.hpt)), "1" == m.hidden && (R = !0, F
                .hidden = !0), null != m.outlineLevel && (R = !0, F.level = +m.outlineLevel), R && (B[I - 1] = F)),
            k = y.slice(v).split(t);
          for (var j = 0; j != k.length && "<" == k[j].trim().charAt(0); ++j);
          for (k = k.slice(j), v = 0; v != k.length; ++v)
            if (0 !== (y = k[v].trim()).length) {
              if (x = y.match(n), w = v, C = 0, S = 0, y = "<c " + ("<" == y.slice(0, 1) ? ">" : "") + y, null !=
                x && 2 === x.length) {
                for (w = 0, T = x[1], C = 0; C != T.length && !((S = T.charCodeAt(C) - 64) < 1 || S > 26); ++C) w =
                  26 * w + S;
                A = --w
              } else ++A;
              for (C = 0; C != y.length && 62 !== y.charCodeAt(C); ++C);
              if (++C, (m = Gg(y.slice(0, C), !0)).r || (m.r = bh({
                  r: I - 1,
                  c: A
                })), b = {
                  t: ""
                }, null != (x = (T = y.slice(C)).match(a)) && "" !== x[1] && (b.v = Yg(x[1])), c.cellFormula) {
                if (null != (x = T.match(r)) && "" !== x[1]) {
                  if (b.f = Yg(rf(x[1])).replace(/\r\n/g, "\n"), c.xlfn || (b.f = mk(b.f)), x[0].indexOf(
                      't="array"') > -1) b.F = (T.match(i) || [])[1], b.F.indexOf(":") > -1 && M.push([fh(b.F), b
                    .F]);
                  else if (x[0].indexOf('t="shared"') > -1) {
                    f = Gg(x[0]);
                    var H = Yg(rf(x[1]));
                    c.xlfn || (H = mk(H)), L[parseInt(f.si, 10)] = [f, H, m.r]
                  }
                } else(x = T.match(/<f[^>]*\/>/)) && L[(f = Gg(x[0])).si] && (b.f = bk(L[f.si][1], L[f.si][2], m
                .r));
                var G = ph(m.r);
                for (C = 0; C < M.length; ++C) G.r >= M[C][0].s.r && G.r <= M[C][0].e.r && G.c >= M[C][0].s.c && G
                  .c <= M[C][0].e.c && (b.F = M[C][1])
              }
              if (null == m.t && void 0 === b.v)
                if (b.f || b.F) b.v = 0, b.t = "n";
                else {
                  if (!D) continue;
                  b.t = "z"
                }
              else b.t = m.t || "n";
              switch (d.s.c > A && (d.s.c = A), d.e.c < A && (d.e.c = A), b.t) {
                case "n":
                  if ("" == b.v || null == b.v) {
                    if (!D) continue;
                    b.t = "z"
                  } else b.v = parseFloat(b.v);
                  break;
                case "s":
                  if (void 0 === b.v) {
                    if (!D) continue;
                    b.t = "z"
                  } else g = tx[parseInt(b.v, 10)], b.v = g.t, b.r = g.r, c.cellHTML && (b.h = g.h);
                  break;
                case "str":
                  b.t = "s", b.v = null != b.v ? rf(b.v) : "", c.cellHTML && (b.h = Zg(b.v));
                  break;
                case "inlineStr":
                  x = T.match(o), b.t = "s", null != x && (g = by(x[1])) ? (b.v = g.t, c.cellHTML && (b.h = g.h)) :
                    b.v = "";
                  break;
                case "b":
                  b.v = tf(b.v);
                  break;
                case "d":
                  c.cellDates ? b.v = xg(b.v, 1) : (b.v = pg(xg(b.v, 1)), b.t = "n");
                  break;
                case "e":
                  c && !1 === c.cellText || (b.w = b.v), b.v = Kh[b.v]
              }
              if (E = P = 0, h = null, O && void 0 !== m.s && null != (h = p.CellXf[m.s]) && (null != h.numFmtId &&
                  (E = h.numFmtId), c.cellStyles && null != h.fillId && (P = h.fillId)), ox(b, E, P, c, u, p), c
                .cellDates && O && "n" == b.t && Zm(Sm[E]) && (b.t = "d", b.v = fg(b.v)), m.cm && c.xlmeta) {
                var K = (c.xlmeta.Cell || [])[+m.cm - 1];
                K && "XLDAPR" == K.type && (b.D = !0)
              }
              if (_) {
                var W = ph(m.r);
                l[W.r] || (l[W.r] = []), l[W.r][W.c] = b
              } else l[m.r] = b
            }
        }
      }
    }
    B.length > 0 && (l["!rows"] = B)
  }
}();
var vx = Bh;

function yx(t) {
  return [Ah(t), Fh(t), "n"]
}
var kx = Bh;
var xx = ["left", "right", "top", "bottom", "header", "footer"];

function wx(t, e, n, o, i, a) {
  var r = a || {
    "!type": "chart"
  };
  if (!t) return a;
  var s = 0,
    l = 0,
    c = "A",
    d = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    };
  return (t.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(t) {
    var e = function(t) {
      var e, n = [],
        o = t.match(/^<c:numCache>/);
      (t.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function(t) {
        var e = t.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
        e && (n[+e[1]] = o ? +e[2] : e[2])
      });
      var i = Yg((t.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
      return (t.match(/<c:f>(.*?)<\/c:f>/gm) || []).forEach(function(t) {
        e = t.replace(/<.*?>/g, "")
      }), [n, i, e]
    }(t);
    d.s.r = d.s.c = 0, d.e.c = s, c = uh(s), e[0].forEach(function(t, n) {
      r[c + ch(n)] = {
        t: "n",
        v: t,
        z: e[1]
      }, l = n
    }), d.e.r < l && (d.e.r = l), ++s
  }), s > 0 && (r["!ref"] = gh(d)), r
}
var Cx = [
    ["allowRefreshQuery", !1, "bool"],
    ["autoCompressPictures", !0, "bool"],
    ["backupFile", !1, "bool"],
    ["checkCompatibility", !1, "bool"],
    ["CodeName", ""],
    ["date1904", !1, "bool"],
    ["defaultThemeVersion", 0, "int"],
    ["filterPrivacy", !1, "bool"],
    ["hidePivotFieldList", !1, "bool"],
    ["promptedSolutions", !1, "bool"],
    ["publishItems", !1, "bool"],
    ["refreshAllConnections", !1, "bool"],
    ["saveExternalLinkValues", !0, "bool"],
    ["showBorderUnselectedTables", !0, "bool"],
    ["showInkAnnotation", !0, "bool"],
    ["showObjects", "all"],
    ["showPivotChartFilter", !1, "bool"],
    ["updateLinks", "userSet"]
  ],
  Sx = [
    ["activeTab", 0, "int"],
    ["autoFilterDateGrouping", !0, "bool"],
    ["firstSheet", 0, "int"],
    ["minimized", !1, "bool"],
    ["showHorizontalScroll", !0, "bool"],
    ["showSheetTabs", !0, "bool"],
    ["showVerticalScroll", !0, "bool"],
    ["tabRatio", 600, "int"],
    ["visibility", "visible"]
  ],
  Tx = [],
  Ix = [
    ["calcCompleted", "true"],
    ["calcMode", "auto"],
    ["calcOnSave", "true"],
    ["concurrentCalc", "true"],
    ["fullCalcOnLoad", "false"],
    ["fullPrecision", "true"],
    ["iterate", "false"],
    ["iterateCount", "100"],
    ["iterateDelta", "0.001"],
    ["refMode", "A1"]
  ];

function Ax(t, e) {
  for (var n = 0; n != t.length; ++n)
    for (var o = t[n], i = 0; i != e.length; ++i) {
      var a = e[i];
      if (null == o[a[0]]) o[a[0]] = a[1];
      else switch (a[2]) {
        case "bool":
          "string" == typeof o[a[0]] && (o[a[0]] = tf(o[a[0]]));
          break;
        case "int":
          "string" == typeof o[a[0]] && (o[a[0]] = parseInt(o[a[0]], 10))
      }
    }
}

function Ex(t, e) {
  for (var n = 0; n != e.length; ++n) {
    var o = e[n];
    if (null == t[o[0]]) t[o[0]] = o[1];
    else switch (o[2]) {
      case "bool":
        "string" == typeof t[o[0]] && (t[o[0]] = tf(t[o[0]]));
        break;
      case "int":
        "string" == typeof t[o[0]] && (t[o[0]] = parseInt(t[o[0]], 10))
    }
  }
}

function Px(t) {
  Ex(t.WBProps, Cx), Ex(t.CalcPr, Ix), Ax(t.WBView, Sx), Ax(t.Sheets, Tx), ex.date1904 = tf(t.WBProps.date1904)
}
var Ox = "][*?/\\".split("");
var Mx = /<\w+:workbook/;

function Lx(t, e) {
  var n = {};
  return t.read_shift(4), n.ArchID = t.read_shift(4), t.l += e - 8, n
}

function _x(t, e, n) {
  return ".bin" === e.slice(-4) ? function(t, e) {
    var n = {
        AppVersion: {},
        WBProps: {},
        WBView: [],
        Sheets: [],
        CalcPr: {},
        xmlns: ""
      },
      o = [],
      i = !1;
    e || (e = {}), e.biff = 12;
    var a = [],
      r = [
        []
      ];
    return r.SheetNames = [], r.XTI = [], cw[16] = {
      n: "BrtFRTArchID$",
      f: Lx
    }, nh(t, function(t, s, l) {
      switch (l) {
        case 156:
          r.SheetNames.push(t.name), n.Sheets.push(t);
          break;
        case 153:
          n.WBProps = t;
          break;
        case 39:
          null != t.Sheet && (e.SID = t.Sheet), t.Ref = $k(t.Ptg, 0, null, r, e), delete e.SID, delete t.Ptg, a
            .push(t);
          break;
        case 1036:
        case 361:
        case 2071:
        case 158:
        case 143:
        case 664:
        case 353:
        case 3072:
        case 3073:
        case 534:
        case 677:
        case 157:
        case 610:
        case 2050:
        case 155:
        case 548:
        case 676:
        case 128:
        case 665:
        case 2128:
        case 2125:
        case 549:
        case 2053:
        case 596:
        case 2076:
        case 2075:
        case 2082:
        case 397:
        case 154:
        case 1117:
        case 553:
        case 2091:
        case 16:
          break;
        case 357:
        case 358:
        case 355:
        case 667:
          r[0].length ? r.push([l, t]) : r[0] = [l, t], r[r.length - 1].XTI = [];
          break;
        case 362:
          0 === r.length && (r[0] = [], r[0].XTI = []), r[r.length - 1].XTI = r[r.length - 1].XTI.concat(t), r
            .XTI = r.XTI.concat(t);
          break;
        case 35:
        case 37:
          o.push(l), i = !0;
          break;
        case 36:
        case 38:
          o.pop(), i = !1;
          break;
        default:
          if (s.T);
          else if (!i || e.WTF && 37 != o[o.length - 1] && 35 != o[o.length - 1]) throw new Error(
            "Unexpected record 0x" + l.toString(16))
      }
    }, e), Px(n), n.Names = a, n.supbooks = r, n
  }(t, n) : function(t, e) {
    if (!t) throw new Error("Could not find file");
    var n = {
        AppVersion: {},
        WBProps: {},
        WBView: [],
        Sheets: [],
        CalcPr: {},
        Names: [],
        xmlns: ""
      },
      o = !1,
      i = "xmlns",
      a = {},
      r = 0;
    if (t.replace(Ug, function(s, l) {
        var c = Gg(s);
        switch (Kg(c[0])) {
          case "<?xml":
          case "</workbook>":
          case "<fileVersion/>":
          case "</fileVersion>":
          case "<fileSharing":
          case "<fileSharing/>":
          case "</workbookPr>":
          case "<workbookProtection":
          case "<workbookProtection/>":
          case "<bookViews":
          case "<bookViews>":
          case "</bookViews>":
          case "</workbookView>":
          case "<sheets":
          case "<sheets>":
          case "</sheets>":
          case "</sheet>":
          case "<functionGroups":
          case "<functionGroups/>":
          case "<functionGroup":
          case "<externalReferences":
          case "</externalReferences>":
          case "<externalReferences>":
          case "<externalReference":
          case "<definedNames/>":
          case "<definedName/>":
          case "</calcPr>":
          case "<oleSize":
          case "<customWorkbookViews>":
          case "</customWorkbookViews>":
          case "<customWorkbookViews":
          case "<customWorkbookView":
          case "</customWorkbookView>":
          case "<pivotCaches>":
          case "</pivotCaches>":
          case "<pivotCaches":
          case "<pivotCache":
          case "<smartTagPr":
          case "<smartTagPr/>":
          case "<smartTagTypes":
          case "<smartTagTypes>":
          case "</smartTagTypes>":
          case "<smartTagType":
          case "<webPublishing":
          case "<webPublishing/>":
          case "<fileRecoveryPr":
          case "<fileRecoveryPr/>":
          case "<webPublishObjects>":
          case "<webPublishObjects":
          case "</webPublishObjects>":
          case "<webPublishObject":
          case "<extLst":
          case "<extLst>":
          case "</extLst>":
          case "<extLst/>":
          case "<ArchID":
          case "<revisionPtr":
            break;
          case "<workbook":
            s.match(Mx) && (i = "xmlns" + s.match(/<(\w+):/)[1]), n.xmlns = c[i];
            break;
          case "<fileVersion":
            delete c[0], n.AppVersion = c;
            break;
          case "<workbookPr":
          case "<workbookPr/>":
            Cx.forEach(function(t) {
              if (null != c[t[0]]) switch (t[2]) {
                case "bool":
                  n.WBProps[t[0]] = tf(c[t[0]]);
                  break;
                case "int":
                  n.WBProps[t[0]] = parseInt(c[t[0]], 10);
                  break;
                default:
                  n.WBProps[t[0]] = c[t[0]]
              }
            }), c.codeName && (n.WBProps.CodeName = rf(c.codeName));
            break;
          case "<workbookView":
          case "<workbookView/>":
            delete c[0], n.WBView.push(c);
            break;
          case "<sheet":
            switch (c.state) {
              case "hidden":
                c.Hidden = 1;
                break;
              case "veryHidden":
                c.Hidden = 2;
                break;
              default:
                c.Hidden = 0
            }
            delete c.state, c.name = Yg(rf(c.name)), delete c[0], n.Sheets.push(c);
            break;
          case "<definedNames>":
          case "<definedNames":
          case "<ext":
          case "<AlternateContent":
          case "<AlternateContent>":
            o = !0;
            break;
          case "</definedNames>":
          case "</ext>":
          case "</AlternateContent>":
            o = !1;
            break;
          case "<definedName":
            (a = {}).Name = rf(c.name), c.comment && (a.Comment = c.comment), c.localSheetId && (a.Sheet = +c
              .localSheetId), tf(c.hidden || "0") && (a.Hidden = !0), r = l + s.length;
            break;
          case "</definedName>":
            a.Ref = Yg(rf(t.slice(r, l))), n.Names.push(a);
            break;
          case "<calcPr":
          case "<calcPr/>":
            delete c[0], n.CalcPr = c;
            break;
          default:
            if (!o && e.WTF) throw new Error("unrecognized " + c[0] + " in workbook")
        }
        return s
      }), -1 === yf.indexOf(n.xmlns)) throw new Error("Unknown Namespace: " + n.xmlns);
    return Px(n), n
  }(t, n)
}

function Bx(t, e, n, o, i, a, r, s) {
  return ".bin" === e.slice(-4) ? function(t, e, n, o, i, a, r) {
    if (!t) return t;
    var s = e || {};
    o || (o = {
      "!id": {}
    });
    var l, c, d, u, p, b, m, g, f, h, v = s.dense ? [] : {},
      y = {
        s: {
          r: 2e6,
          c: 2e6
        },
        e: {
          r: 0,
          c: 0
        }
      },
      k = !1,
      x = !1,
      w = [];
    s.biff = 12, s["!row"] = 0;
    var C = 0,
      S = !1,
      T = [],
      I = {},
      A = s.supbooks || i.supbooks || [
        []
      ];
    if (A.sharedf = I, A.arrayf = T, A.SheetNames = i.SheetNames || i.Sheets.map(function(t) {
        return t.name
      }), !s.supbooks && (s.supbooks = A, i.Names))
      for (var E = 0; E < i.Names.length; ++E) A[0][E + 1] = i.Names[E];
    var P, O = [],
      M = [],
      L = !1;
    if (cw[16] = {
        n: "BrtShortReal",
        f: yx
      }, nh(t, function(t, e, E) {
        if (!x) switch (E) {
          case 148:
            l = t;
            break;
          case 0:
            c = t, s.sheetRows && s.sheetRows <= c.r && (x = !0), f = ch(p = c.r), s["!row"] = c.r, (t.hidden || t
              .hpt || null != t.level) && (t.hpt && (t.hpx = Uy(t.hpt)), M[t.r] = t);
            break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 62:
            switch (d = {
                t: t[2]
              }, t[2]) {
              case "n":
                d.v = t[1];
                break;
              case "s":
                g = tx[t[1]], d.v = g.t, d.r = g.r;
                break;
              case "b":
                d.v = !!t[1];
                break;
              case "e":
                d.v = t[1], !1 !== s.cellText && (d.w = Gh[d.v]);
                break;
              case "str":
                d.t = "s", d.v = t[1];
                break;
              case "is":
                d.t = "s", d.v = t[1].t
            }
            if ((u = r.CellXf[t[0].iStyleRef]) && ox(d, u.numFmtId, null, s, a, r), b = -1 == t[0].c ? b + 1 : t[
                0].c, s.dense ? (v[p] || (v[p] = []), v[p][b] = d) : v[uh(b) + f] = d, s.cellFormula) {
              for (S = !1, C = 0; C < T.length; ++C) {
                var _ = T[C];
                c.r >= _[0].s.r && c.r <= _[0].e.r && b >= _[0].s.c && b <= _[0].e.c && (d.F = gh(_[0]), S = !0)
              }!S && t.length > 3 && (d.f = t[3])
            }
            if (y.s.r > c.r && (y.s.r = c.r), y.s.c > b && (y.s.c = b), y.e.r < c.r && (y.e.r = c.r), y.e.c < b &&
              (y.e.c = b), s.cellDates && u && "n" == d.t && Zm(Sm[u.numFmtId])) {
              var B = Em(d.v);
              B && (d.t = "d", d.v = new Date(B.y, B.m - 1, B.d, B.H, B.M, B.S, B.u))
            }
            P && ("XLDAPR" == P.type && (d.D = !0), P = void 0);
            break;
          case 1:
          case 12:
            if (!s.sheetStubs || k) break;
            d = {
                t: "z",
                v: void 0
              }, b = -1 == t[0].c ? b + 1 : t[0].c, s.dense ? (v[p] || (v[p] = []), v[p][b] = d) : v[uh(b) + f] =
              d, y.s.r > c.r && (y.s.r = c.r), y.s.c > b && (y.s.c = b), y.e.r < c.r && (y.e.r = c.r), y.e.c <
              b && (y.e.c = b), P && ("XLDAPR" == P.type && (d.D = !0), P = void 0);
            break;
          case 176:
            w.push(t);
            break;
          case 49:
            P = ((s.xlmeta || {}).Cell || [])[t - 1];
            break;
          case 494:
            var F = o["!id"][t.relId];
            for (F ? (t.Target = F.Target, t.loc && (t.Target += "#" + t.loc), t.Rel = F) : "" == t.relId && (t
                .Target = "#" + t.loc), p = t.rfx.s.r; p <= t.rfx.e.r; ++p)
              for (b = t.rfx.s.c; b <= t.rfx.e.c; ++b) s.dense ? (v[p] || (v[p] = []), v[p][b] || (v[p][b] = {
                t: "z",
                v: void 0
              }), v[p][b].l = t) : (m = bh({
                c: b,
                r: p
              }), v[m] || (v[m] = {
                t: "z",
                v: void 0
              }), v[m].l = t);
            break;
          case 426:
            if (!s.cellFormula) break;
            T.push(t), (h = s.dense ? v[p][b] : v[uh(b) + f]).f = $k(t[1], 0, {
              r: c.r,
              c: b
            }, A, s), h.F = gh(t[0]);
            break;
          case 427:
            if (!s.cellFormula) break;
            I[bh(t[0].s)] = t[1], (h = s.dense ? v[p][b] : v[uh(b) + f]).f = $k(t[1], 0, {
              r: c.r,
              c: b
            }, A, s);
            break;
          case 60:
            if (!s.cellStyles) break;
            for (; t.e >= t.s;) O[t.e--] = {
              width: t.w / 256,
              hidden: !!(1 & t.flags),
              level: t.level
            }, L || (L = !0, Vy(t.w / 256)), Ny(O[t.e + 1]);
            break;
          case 161:
            v["!autofilter"] = {
              ref: gh(t)
            };
            break;
          case 476:
            v["!margins"] = t;
            break;
          case 147:
            i.Sheets[n] || (i.Sheets[n] = {}), t.name && (i.Sheets[n].CodeName = t.name), (t.above || t.left) && (
              v["!outline"] = {
                above: t.above,
                left: t.left
              });
            break;
          case 137:
            i.Views || (i.Views = [{}]), i.Views[0] || (i.Views[0] = {}), t.RTL && (i.Views[0].RTL = !0);
            break;
          case 485:
          case 64:
          case 1053:
          case 151:
          case 152:
          case 175:
          case 644:
          case 625:
          case 562:
          case 396:
          case 1112:
          case 1146:
          case 471:
          case 1050:
          case 649:
          case 1105:
          case 589:
          case 607:
          case 564:
          case 1055:
          case 168:
          case 174:
          case 1180:
          case 499:
          case 507:
          case 550:
          case 171:
          case 167:
          case 1177:
          case 169:
          case 1181:
          case 551:
          case 552:
          case 661:
          case 639:
          case 478:
          case 537:
          case 477:
          case 536:
          case 1103:
          case 680:
          case 1104:
          case 1024:
          case 663:
          case 535:
          case 678:
          case 504:
          case 1043:
          case 428:
          case 170:
          case 3072:
          case 50:
          case 2070:
          case 1045:
            break;
          case 35:
          case 37:
            k = !0;
            break;
          case 36:
          case 38:
            k = !1;
            break;
          default:
            if (e.T);
            else if (!k || s.WTF) throw new Error("Unexpected record 0x" + E.toString(16))
        }
      }, s), delete s.supbooks, delete s["!row"], !v["!ref"] && (y.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s
        .r > 0 || l.s.c > 0)) && (v["!ref"] = gh(l || y)), s.sheetRows && v["!ref"]) {
      var _ = fh(v["!ref"]);
      s.sheetRows <= +_.e.r && (_.e.r = s.sheetRows - 1, _.e.r > y.e.r && (_.e.r = y.e.r), _.e.r < _.s.r && (_.s.r = _
        .e.r), _.e.c > y.e.c && (_.e.c = y.e.c), _.e.c < _.s.c && (_.s.c = _.e.c), v["!fullref"] = v["!ref"], v[
        "!ref"] = gh(_))
    }
    return w.length > 0 && (v["!merges"] = w), O.length > 0 && (v["!cols"] = O), M.length > 0 && (v["!rows"] = M), v
  }(t, o, n, i, a, r, s) : mx(t, o, n, i, a, r, s)
}

function Fx(t, e, n, o, i, a, r, s) {
  return ".bin" === e.slice(-4) ? function(t, e, n, o, i) {
    if (!t) return t;
    o || (o = {
      "!id": {}
    });
    var a = {
        "!type": "chart",
        "!drawel": null,
        "!rel": ""
      },
      r = !1;
    return nh(t, function(t, o, s) {
      switch (s) {
        case 550:
          a["!rel"] = t;
          break;
        case 651:
          i.Sheets[n] || (i.Sheets[n] = {}), t.name && (i.Sheets[n].CodeName = t.name);
          break;
        case 562:
        case 652:
        case 669:
        case 679:
        case 551:
        case 552:
        case 476:
        case 3072:
        case 37:
        case 38:
          break;
        case 35:
          r = !0;
          break;
        case 36:
          r = !1;
          break;
        default:
          if (o.T > 0);
          else if (o.T < 0);
          else if (!r || e.WTF) throw new Error("Unexpected record 0x" + s.toString(16))
      }
    }, e), o["!id"][a["!rel"]] && (a["!drawel"] = o["!id"][a["!rel"]]), a
  }(t, o, n, i, a) : function(t, e, n, o, i) {
    if (!t) return t;
    o || (o = {
      "!id": {}
    });
    var a, r = {
        "!type": "chart",
        "!drawel": null,
        "!rel": ""
      },
      s = t.match(ux);
    return s && gx(s[0], 0, i, n), (a = t.match(/drawing r:id="(.*?)"/)) && (r["!rel"] = a[1]), o["!id"][r["!rel"]] &&
      (r["!drawel"] = o["!id"][r["!rel"]]), r
  }(t, 0, n, i, a)
}

function Rx(t, e, n, o) {
  return ".bin" === e.slice(-4) ? function(t, e, n) {
    var o = {
      NumberFmt: []
    };
    for (var i in Sm) o.NumberFmt[i] = Sm[i];
    o.CellXf = [], o.Fonts = [];
    var a = [],
      r = !1;
    return nh(t, function(t, i, s) {
      switch (s) {
        case 44:
          o.NumberFmt[t[0]] = t[1], og(t[1], t[0]);
          break;
        case 43:
          o.Fonts.push(t), null != t.color.theme && e && e.themeElements && e.themeElements.clrScheme && (t.color
            .rgb = Ly(e.themeElements.clrScheme[t.color.theme].rgb, t.color.tint || 0));
          break;
        case 1025:
        case 45:
        case 46:
        case 48:
        case 507:
        case 572:
        case 475:
        case 1171:
        case 2102:
        case 1130:
        case 512:
        case 2095:
        case 3072:
          break;
        case 47:
          617 == a[a.length - 1] && o.CellXf.push(t);
          break;
        case 35:
          r = !0;
          break;
        case 36:
          r = !1;
          break;
        case 37:
          a.push(s), r = !0;
          break;
        case 38:
          a.pop(), r = !1;
          break;
        default:
          if (i.T > 0) a.push(s);
          else if (i.T < 0) a.pop();
          else if (!r || n.WTF && 37 != a[a.length - 1]) throw new Error("Unexpected record 0x" + s.toString(16))
      }
    }), o
  }(t, n, o) : Ky(t, n, o)
}

function Dx(t, e, n) {
  return ".bin" === e.slice(-4) ? function(t, e) {
    var n = [],
      o = !1;
    return nh(t, function(t, i, a) {
      switch (a) {
        case 159:
          n.Count = t[0], n.Unique = t[1];
          break;
        case 19:
          n.push(t);
          break;
        case 160:
          return !0;
        case 35:
          o = !0;
          break;
        case 36:
          o = !1;
          break;
        default:
          if (i.T, !o || e.WTF) throw new Error("Unexpected record 0x" + a.toString(16))
      }
    }), n
  }(t, n) : function(t, e) {
    var n = [],
      o = "";
    if (!t) return n;
    var i = t.match(my);
    if (i) {
      o = i[2].replace(gy, "").split(fy);
      for (var a = 0; a != o.length; ++a) {
        var r = by(o[a].trim(), e);
        null != r && (n[n.length] = r)
      }
      i = Gg(i[1]), n.Count = i.count, n.Unique = i.uniqueCount
    }
    return n
  }(t, n)
}

function Vx(t, e, n) {
  return ".bin" === e.slice(-4) ? function(t, e) {
    var n = [],
      o = [],
      i = {},
      a = !1;
    return nh(t, function(t, r, s) {
      switch (s) {
        case 632:
          o.push(t);
          break;
        case 635:
          i = t;
          break;
        case 637:
          i.t = t.t, i.h = t.h, i.r = t.r;
          break;
        case 636:
          if (i.author = o[i.iauthor], delete i.iauthor, e.sheetRows && i.rfx && e.sheetRows <= i.rfx.r) break;
          i.t || (i.t = ""), delete i.rfx, n.push(i);
          break;
        case 3072:
        case 37:
        case 38:
          break;
        case 35:
          a = !0;
          break;
        case 36:
          a = !1;
          break;
        default:
          if (r.T);
          else if (!a || e.WTF) throw new Error("Unexpected record 0x" + s.toString(16))
      }
    }), n
  }(t, n) : function(t, e) {
    if (t.match(/<(?:\w+:)?comments *\/>/)) return [];
    var n = [],
      o = [],
      i = t.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
    i && i[1] && i[1].split(/<\/\w*:?author>/).forEach(function(t) {
      if ("" !== t && "" !== t.trim()) {
        var e = t.match(/<(?:\w+:)?author[^>]*>(.*)/);
        e && n.push(e[1])
      }
    });
    var a = t.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
    return a && a[1] && a[1].split(/<\/\w*:?comment>/).forEach(function(t) {
      if ("" !== t && "" !== t.trim()) {
        var i = t.match(/<(?:\w+:)?comment[^>]*>/);
        if (i) {
          var a = Gg(i[0]),
            r = {
              author: a.authorId && n[a.authorId] || "sheetjsghost",
              ref: a.ref,
              guid: a.guid
            },
            s = ph(a.ref);
          if (!(e.sheetRows && e.sheetRows <= s.r)) {
            var l = t.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/),
              c = !!l && !!l[1] && by(l[1]) || {
                r: "",
                t: "",
                h: ""
              };
            r.r = c.r, "<t></t>" == c.r && (c.t = c.h = ""), r.t = (c.t || "").replace(/\r\n/g, "\n").replace(
              /\r/g, "\n"), e.cellHTML && (r.h = c.h), o.push(r)
          }
        }
      }
    }), o
  }(t, n)
}

function Nx(t, e, n) {
  return ".bin" === e.slice(-4) ? function(t) {
    var e = [];
    return nh(t, function(t, n, o) {
      if (63 === o) e.push(t);
      else if (!n.T) throw new Error("Unexpected record 0x" + o.toString(16))
    }), e
  }(t) : function(t) {
    var e = [];
    if (!t) return e;
    var n = 1;
    return (t.match(Ug) || []).forEach(function(t) {
      var o = Gg(t);
      switch (o[0]) {
        case "<?xml":
        case "<calcChain":
        case "<calcChain>":
        case "</calcChain>":
          break;
        case "<c":
          delete o[0], o.i ? n = o.i : o.i = n, e.push(o)
      }
    }), e
  }(t)
}

function $x(t, e, n, o) {
  if (".bin" === n.slice(-4)) return function(t, e, n, o) {
    if (!t) return t;
    var i = o || {},
      a = !1;
    nh(t, function(t, e, n) {
      switch (n) {
        case 359:
        case 363:
        case 364:
        case 366:
        case 367:
        case 368:
        case 369:
        case 370:
        case 371:
        case 472:
        case 577:
        case 578:
        case 579:
        case 580:
        case 581:
        case 582:
        case 583:
        case 584:
        case 585:
        case 586:
        case 587:
          break;
        case 35:
          a = !0;
          break;
        case 36:
          a = !1;
          break;
        default:
          if (e.T);
          else if (!a || i.WTF) throw new Error("Unexpected record 0x" + n.toString(16))
      }
    }, i)
  }(t, 0, 0, o)
}

function zx(t, e, n) {
  return ".bin" === e.slice(-4) ? function(t, e, n) {
    var o = {
        Types: [],
        Cell: [],
        Value: []
      },
      i = n || {},
      a = [],
      r = !1,
      s = 2;
    return nh(t, function(t, e, n) {
      switch (n) {
        case 335:
          o.Types.push({
            name: t.name
          });
          break;
        case 51:
          t.forEach(function(t) {
            1 == s ? o.Cell.push({
              type: o.Types[t[0] - 1].name,
              index: t[1]
            }) : 0 == s && o.Value.push({
              type: o.Types[t[0] - 1].name,
              index: t[1]
            })
          });
          break;
        case 337:
          s = t ? 1 : 0;
          break;
        case 338:
          s = 2;
          break;
        case 35:
          a.push(n), r = !0;
          break;
        case 36:
          a.pop(), r = !1;
          break;
        default:
          if (e.T);
          else if (!r || i.WTF && 35 != a[a.length - 1]) throw new Error("Unexpected record 0x" + n.toString(16))
      }
    }), o
  }(t, 0, n) : function(t, e, n) {
    var o = {
      Types: [],
      Cell: [],
      Value: []
    };
    if (!t) return o;
    var i, a = !1,
      r = 2;
    return t.replace(Ug, function(t) {
      var e = Gg(t);
      switch (Kg(e[0])) {
        case "<?xml":
        case "<metadata":
        case "</metadata>":
        case "<metadataTypes":
        case "</metadataTypes>":
        case "</metadataType>":
        case "</futureMetadata>":
        case "<bk>":
        case "</bk>":
        case "</rc>":
        case "<extLst":
        case "<extLst>":
        case "</extLst>":
        case "<extLst/>":
          break;
        case "<metadataType":
          o.Types.push({
            name: e.name
          });
          break;
        case "<futureMetadata":
          for (var s = 0; s < o.Types.length; ++s) o.Types[s].name == e.name && (i = o.Types[s]);
          break;
        case "<rc":
          1 == r ? o.Cell.push({
            type: o.Types[e.t - 1].name,
            index: +e.v
          }) : 0 == r && o.Value.push({
            type: o.Types[e.t - 1].name,
            index: +e.v
          });
          break;
        case "<cellMetadata":
          r = 1;
          break;
        case "</cellMetadata>":
        case "</valueMetadata>":
          r = 2;
          break;
        case "<valueMetadata":
          r = 0;
          break;
        case "<ext":
          a = !0;
          break;
        case "</ext>":
          a = !1;
          break;
        case "<rvb":
          if (!i) break;
          i.offsets || (i.offsets = []), i.offsets.push(+e.i);
          break;
        default:
          if (!a && n.WTF) throw new Error("unrecognized " + e[0] + " in metadata")
      }
      return t
    }), o
  }(t, 0, n)
}
var Ux, jx = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g,
  Hx = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;

function Gx(t, e) {
  var n = t.split(/\s+/),
    o = [];
  if (o[0] = n[0], 1 === n.length) return o;
  var i, a, r, s = t.match(jx);
  if (s)
    for (r = 0; r != s.length; ++r) - 1 === (a = (i = s[r].match(Hx))[1].indexOf(":")) ? o[i[1]] = i[2].slice(1, i[2]
      .length - 1) : o["xmlns:" === i[1].slice(0, 6) ? "xmlns" + i[1].slice(6) : i[1].slice(a + 1)] = i[2].slice(1, i[
      2].length - 1);
  return o
}

function Kx(t) {
  var e = {};
  if (1 === t.split(/\s+/).length) return e;
  var n, o, i, a = t.match(jx);
  if (a)
    for (i = 0; i != a.length; ++i) - 1 === (o = (n = a[i].match(Hx))[1].indexOf(":")) ? e[n[1]] = n[2].slice(1, n[2]
      .length - 1) : e["xmlns:" === n[1].slice(0, 6) ? "xmlns" + n[1].slice(6) : n[1].slice(o + 1)] = n[2].slice(1, n[
      2].length - 1);
  return e
}

function Wx(t, e, n, o) {
  var i = o;
  switch ((n[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      i = tf(o);
      break;
    case "i2":
    case "int":
      i = parseInt(o, 10);
      break;
    case "r4":
    case "float":
      i = parseFloat(o);
      break;
    case "date":
    case "dateTime.tz":
      i = xg(o);
      break;
    case "i8":
    case "string":
    case "fixed":
    case "uuid":
    case "bin.base64":
      break;
    default:
      throw new Error("bad custprop:" + n[0])
  }
  t[Yg(e)] = i
}

function qx(t, e, n) {
  if ("z" !== t.t) {
    if (!n || !1 !== n.cellText) try {
      "e" === t.t ? t.w = t.w || Gh[t.v] : "General" === e ? "n" === t.t ? (0 | t.v) === t.v ? t.w = t.v.toString(
        10) : t.w = Bm(t.v) : t.w = Fm(t.v) : t.w = (o = e || "General", i = t.v, "General" === (a = Ux[o] || Yg(o)) ?
          Fm(i) : ng(a, i))
    } catch (aD) {
      if (n.WTF) throw aD
    }
    var o, i, a;
    try {
      var r = Ux[e] || e || "General";
      if (n.cellNF && (t.z = r), n.cellDates && "n" == t.t && Zm(r)) {
        var s = Em(t.v);
        s && (t.t = "d", t.v = new Date(s.y, s.m - 1, s.d, s.H, s.M, s.S, s.u))
      }
    } catch (aD) {
      if (n.WTF) throw aD
    }
  }
}

function Yx(t, e, n) {
  if (n.cellStyles && e.Interior) {
    var o = e.Interior;
    o.Pattern && (o.patternType = jy[o.Pattern] || o.Pattern)
  }
  t[e.ID] = e
}

function Xx(t, e, n, o, i, a, r, s, l, c) {
  var d = "General",
    u = o.StyleID,
    p = {};
  c = c || {};
  var b = [],
    m = 0;
  for (void 0 === u && s && (u = s.StyleID), void 0 === u && r && (u = r.StyleID); void 0 !== a[u] && (a[u].nf && (d =
      a[u].nf), a[u].Interior && b.push(a[u].Interior), a[u].Parent);) u = a[u].Parent;
  switch (n.Type) {
    case "Boolean":
      o.t = "b", o.v = tf(t);
      break;
    case "String":
      o.t = "s", o.r = Qg(Yg(t)), o.v = t.indexOf("<") > -1 ? Yg(e || t).replace(/<.*?>/g, "") : o.r;
      break;
    case "DateTime":
      "Z" != t.slice(-1) && (t += "Z"), o.v = (xg(t) - new Date(Date.UTC(1899, 11, 30))) / 864e5, o.v != o.v ? o.v = Yg(
        t) : o.v < 60 && (o.v = o.v - 1), d && "General" != d || (d = "yyyy-mm-dd");
    case "Number":
      void 0 === o.v && (o.v = +t), o.t || (o.t = "n");
      break;
    case "Error":
      o.t = "e", o.v = Kh[t], !1 !== c.cellText && (o.w = t);
      break;
    default:
      "" == t && "" == e ? o.t = "z" : (o.t = "s", o.v = Qg(e || t))
  }
  if (qx(o, d, c), !1 !== c.cellFormula)
    if (o.Formula) {
      var g = Yg(o.Formula);
      61 == g.charCodeAt(0) && (g = g.slice(1)), o.f = ck(g, i), delete o.Formula, "RC" == o.ArrayRange ? o.F = ck(
        "RC:RC", i) : o.ArrayRange && (o.F = ck(o.ArrayRange, i), l.push([fh(o.F), o.F]))
    } else
      for (m = 0; m < l.length; ++m) i.r >= l[m][0].s.r && i.r <= l[m][0].e.r && i.c >= l[m][0].s.c && i.c <= l[m][0].e
        .c && (o.F = l[m][1]);
  c.cellStyles && (b.forEach(function(t) {
    !p.patternType && t.patternType && (p.patternType = t.patternType)
  }), o.s = p), void 0 !== o.StyleID && (o.ixfe = o.StyleID)
}

function Jx(t) {
  t.t = t.v || "", t.t = t.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), t.v = t.w = t.ixfe = void 0
}

function Zx(t, e) {
  var n = e || {};
  ig();
  var o = Qb(ff(t));
  "binary" != n.type && "array" != n.type && "base64" != n.type || (o = rf(o));
  var i, a = o.slice(0, 1024).toLowerCase(),
    r = !1;
  if ((1023 & (a = a.replace(/".*?"/g, "")).indexOf(">")) > Math.min(1023 & a.indexOf(","), 1023 & a.indexOf(";"))) {
    var s = Cg(n);
    return s.type = "string", ry.to_workbook(o, s)
  }
  if (-1 == a.indexOf("<?xml") && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(t) {
      a.indexOf("<" + t) >= 0 && (r = !0)
    }), r) return function(t, e) {
    var n = t.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
    if (!n || 0 == n.length) throw new Error("Invalid HTML: could not find <table>");
    if (1 == n.length) return yh(pw(n[0], e), e);
    var o = {
      SheetNames: [],
      Sheets: {}
    };
    return n.forEach(function(t, n) {
      nC(o, pw(t, e), "Sheet" + (n + 1))
    }), o
  }(o, n);
  Ux = {
    "General Number": "General",
    "General Date": Sm[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": Sm[15],
    "Short Date": Sm[14],
    "Long Time": Sm[19],
    "Medium Time": Sm[18],
    "Short Time": Sm[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: Sm[2],
    Standard: Sm[4],
    Percent: Sm[10],
    Scientific: Sm[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var l, c, d = [],
    u = {},
    p = [],
    b = n.dense ? [] : {},
    m = "",
    g = {},
    f = {},
    h = Gx('<Data ss:Type="String">'),
    v = 0,
    y = 0,
    k = 0,
    x = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    },
    w = {},
    C = {},
    S = "",
    T = 0,
    I = [],
    A = {},
    E = {},
    P = 0,
    O = [],
    M = [],
    L = {},
    _ = [],
    B = !1,
    F = [],
    R = [],
    D = {},
    V = 0,
    N = 0,
    $ = {
      Sheets: [],
      WBProps: {
        date1904: !1
      }
    },
    z = {};
  hf.lastIndex = 0, o = o.replace(/<!--([\s\S]*?)-->/gm, "");
  for (var U = ""; i = hf.exec(o);) switch (i[3] = (U = i[3]).toLowerCase()) {
    case "data":
      if ("data" == U) {
        if ("/" === i[1]) {
          if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"))
        } else "/" !== i[0].charAt(i[0].length - 2) && d.push([i[3], !0]);
        break
      }
      if (d[d.length - 1][1]) break;
      "/" === i[1] ? Xx(o.slice(v, i.index), S, h, "comment" == d[d.length - 1][0] ? L : g, {
        c: y,
        r: k
      }, w, _[y], f, F, n) : (S = "", h = Gx(i[0]), v = i.index + i[0].length);
      break;
    case "cell":
      if ("/" === i[1])
        if (M.length > 0 && (g.c = M), (!n.sheetRows || n.sheetRows > k) && void 0 !== g.v && (n.dense ? (b[k] || (b[
            k] = []), b[k][y] = g) : b[uh(y) + ch(k)] = g), g.HRef && (g.l = {
            Target: Yg(g.HRef)
          }, g.HRefScreenTip && (g.l.Tooltip = g.HRefScreenTip), delete g.HRef, delete g.HRefScreenTip), (g
            .MergeAcross || g.MergeDown) && (V = y + (0 | parseInt(g.MergeAcross, 10)), N = k + (0 | parseInt(g
            .MergeDown, 10)), I.push({
            s: {
              c: y,
              r: k
            },
            e: {
              c: V,
              r: N
            }
          })), n.sheetStubs)
          if (g.MergeAcross || g.MergeDown) {
            for (var j = y; j <= V; ++j)
              for (var H = k; H <= N; ++H)(j > y || H > k) && (n.dense ? (b[H] || (b[H] = []), b[H][j] = {
                t: "z"
              }) : b[uh(j) + ch(H)] = {
                t: "z"
              });
            y = V + 1
          } else ++y;
      else g.MergeAcross ? y = V + 1 : ++y;
      else(g = Kx(i[0])).Index && (y = +g.Index - 1), y < x.s.c && (x.s.c = y), y > x.e.c && (x.e.c = y), "/>" === i[
        0].slice(-2) && ++y, M = [];
      break;
    case "row":
      "/" === i[1] || "/>" === i[0].slice(-2) ? (k < x.s.r && (x.s.r = k), k > x.e.r && (x.e.r = k), "/>" === i[0]
        .slice(-2) && (f = Gx(i[0])).Index && (k = +f.Index - 1), y = 0, ++k) : ((f = Gx(i[0])).Index && (k = +f
        .Index - 1), D = {}, ("0" == f.AutoFitHeight || f.Height) && (D.hpx = parseInt(f.Height, 10), D.hpt = zy(D
        .hpx), R[k] = D), "1" == f.Hidden && (D.hidden = !0, R[k] = D));
      break;
    case "worksheet":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"));
        p.push(m), x.s.r <= x.e.r && x.s.c <= x.e.c && (b["!ref"] = gh(x), n.sheetRows && n.sheetRows <= x.e.r && (b[
            "!fullref"] = b["!ref"], x.e.r = n.sheetRows - 1, b["!ref"] = gh(x))), I.length && (b["!merges"] = I), _
          .length > 0 && (b["!cols"] = _), R.length > 0 && (b["!rows"] = R), u[m] = b
      } else x = {
          s: {
            r: 2e6,
            c: 2e6
          },
          e: {
            r: 0,
            c: 0
          }
        }, k = y = 0, d.push([i[3], !1]), l = Gx(i[0]), m = Yg(l.Name), b = n.dense ? [] : {}, I = [], F = [], R = [],
        z = {
          name: m,
          Hidden: 0
        }, $.Sheets.push(z);
      break;
    case "table":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"))
      } else {
        if ("/>" == i[0].slice(-2)) break;
        d.push([i[3], !1]), _ = [], B = !1
      }
      break;
    case "style":
      "/" === i[1] ? Yx(w, C, n) : C = Gx(i[0]);
      break;
    case "numberformat":
      C.nf = Yg(Gx(i[0]).Format || "General"), Ux[C.nf] && (C.nf = Ux[C.nf]);
      for (var G = 0; 392 != G && Sm[G] != C.nf; ++G);
      if (392 == G)
        for (G = 57; 392 != G; ++G)
          if (null == Sm[G]) {
            og(C.nf, G);
            break
          } break;
    case "column":
      if ("table" !== d[d.length - 1][0]) break;
      if ((c = Gx(i[0])).Hidden && (c.hidden = !0, delete c.Hidden), c.Width && (c.wpx = parseInt(c.Width, 10)), !B &&
        c.wpx > 10) {
        B = !0, _y = 6;
        for (var K = 0; K < _.length; ++K) _[K] && Ny(_[K])
      }
      B && Ny(c), _[c.Index - 1 || _.length] = c;
      for (var W = 0; W < +c.Span; ++W) _[_.length] = Cg(c);
      break;
    case "namedrange":
      if ("/" === i[1]) break;
      $.Names || ($.Names = []);
      var q = Gg(i[0]),
        Y = {
          Name: q.Name,
          Ref: ck(q.RefersTo.slice(1), {
            r: 0,
            c: 0
          })
        };
      $.Sheets.length > 0 && (Y.Sheet = $.Sheets.length - 1), $.Names.push(Y);
      break;
    case "namedcell":
    case "b":
    case "i":
    case "u":
    case "s":
    case "em":
    case "h2":
    case "h3":
    case "sub":
    case "sup":
    case "span":
    case "alignment":
    case "borders":
    case "border":
    case "protection":
    case "paragraphs":
    case "name":
    case "pixelsperinch":
    case "null":
      break;
    case "font":
      if ("/>" === i[0].slice(-2)) break;
      "/" === i[1] ? S += o.slice(T, i.index) : T = i.index + i[0].length;
      break;
    case "interior":
      if (!n.cellStyles) break;
      C.Interior = Gx(i[0]);
      break;
    case "author":
    case "title":
    case "description":
    case "created":
    case "keywords":
    case "subject":
    case "category":
    case "company":
    case "lastauthor":
    case "lastsaved":
    case "lastprinted":
    case "version":
    case "revision":
    case "totaltime":
    case "hyperlinkbase":
    case "manager":
    case "contentstatus":
    case "identifier":
    case "language":
    case "appname":
      if ("/>" === i[0].slice(-2)) break;
      "/" === i[1] ? av(A, U, o.slice(P, i.index)) : P = i.index + i[0].length;
      break;
    case "styles":
    case "workbook":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"))
      } else d.push([i[3], !1]);
      break;
    case "comment":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"));
        Jx(L), M.push(L)
      } else d.push([i[3], !1]), L = {
        a: (l = Gx(i[0])).Author
      };
      break;
    case "autofilter":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"))
      } else if ("/" !== i[0].charAt(i[0].length - 2)) {
        var X = Gx(i[0]);
        b["!autofilter"] = {
          ref: ck(X.Range).replace(/\$/g, "")
        }, d.push([i[3], !0])
      }
      break;
    case "datavalidation":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"))
      } else "/" !== i[0].charAt(i[0].length - 2) && d.push([i[3], !0]);
      break;
    case "componentoptions":
    case "documentproperties":
    case "customdocumentproperties":
    case "officedocumentsettings":
    case "pivottable":
    case "pivotcache":
    case "names":
    case "mapinfo":
    case "pagebreaks":
    case "querytable":
    case "sorting":
    case "schema":
    case "conditionalformatting":
    case "smarttagtype":
    case "smarttags":
    case "excelworkbook":
    case "workbookoptions":
    case "worksheetoptions":
      if ("/" === i[1]) {
        if ((l = d.pop())[0] !== i[3]) throw new Error("Bad state: " + l.join("|"))
      } else "/" !== i[0].charAt(i[0].length - 2) && d.push([i[3], !0]);
      break;
    default:
      if (0 == d.length && "document" == i[3]) return xw(o, n);
      if (0 == d.length && "uof" == i[3]) return xw(o, n);
      var J = !0;
      switch (d[d.length - 1][0]) {
        case "officedocumentsettings":
          switch (i[3]) {
            case "allowpng":
            case "removepersonalinformation":
            case "downloadcomponents":
            case "locationofcomponents":
            case "colors":
            case "color":
            case "index":
            case "rgb":
            case "targetscreensize":
            case "readonlyrecommended":
              break;
            default:
              J = !1
          }
          break;
        case "componentoptions":
          switch (i[3]) {
            case "toolbar":
            case "hideofficelogo":
            case "spreadsheetautofit":
            case "label":
            case "caption":
            case "maxheight":
            case "maxwidth":
            case "nextsheetnumber":
              break;
            default:
              J = !1
          }
          break;
        case "excelworkbook":
          switch (i[3]) {
            case "date1904":
              $.WBProps.date1904 = !0;
              break;
            case "windowheight":
            case "windowwidth":
            case "windowtopx":
            case "windowtopy":
            case "tabratio":
            case "protectstructure":
            case "protectwindow":
            case "protectwindows":
            case "activesheet":
            case "displayinknotes":
            case "firstvisiblesheet":
            case "supbook":
            case "sheetname":
            case "sheetindex":
            case "sheetindexfirst":
            case "sheetindexlast":
            case "dll":
            case "acceptlabelsinformulas":
            case "donotsavelinkvalues":
            case "iteration":
            case "maxiterations":
            case "maxchange":
            case "path":
            case "xct":
            case "count":
            case "selectedsheets":
            case "calculation":
            case "uncalced":
            case "startupprompt":
            case "crn":
            case "externname":
            case "formula":
            case "colfirst":
            case "collast":
            case "wantadvise":
            case "boolean":
            case "error":
            case "text":
            case "ole":
            case "noautorecover":
            case "publishobjects":
            case "donotcalculatebeforesave":
            case "number":
            case "refmoder1c1":
            case "embedsavesmarttags":
              break;
            default:
              J = !1
          }
          break;
        case "workbookoptions":
          switch (i[3]) {
            case "owcversion":
            case "height":
            case "width":
              break;
            default:
              J = !1
          }
          break;
        case "worksheetoptions":
          switch (i[3]) {
            case "visible":
              if ("/>" === i[0].slice(-2));
              else if ("/" === i[1]) switch (o.slice(P, i.index)) {
                case "SheetHidden":
                  z.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  z.Hidden = 2
              } else P = i.index + i[0].length;
              break;
            case "header":
              b["!margins"] || nx(b["!margins"] = {}, "xlml"), isNaN(+Gg(i[0]).Margin) || (b["!margins"].header = +Gg(
                i[0]).Margin);
              break;
            case "footer":
              b["!margins"] || nx(b["!margins"] = {}, "xlml"), isNaN(+Gg(i[0]).Margin) || (b["!margins"].footer = +Gg(
                i[0]).Margin);
              break;
            case "pagemargins":
              var Z = Gg(i[0]);
              b["!margins"] || nx(b["!margins"] = {}, "xlml"), isNaN(+Z.Top) || (b["!margins"].top = +Z.Top), isNaN(+Z
                  .Left) || (b["!margins"].left = +Z.Left), isNaN(+Z.Right) || (b["!margins"].right = +Z.Right),
                isNaN(+Z.Bottom) || (b["!margins"].bottom = +Z.Bottom);
              break;
            case "displayrighttoleft":
              $.Views || ($.Views = []), $.Views[0] || ($.Views[0] = {}), $.Views[0].RTL = !0;
              break;
            case "freezepanes":
            case "frozennosplit":
            case "splithorizontal":
            case "splitvertical":
            case "donotdisplaygridlines":
            case "activerow":
            case "activecol":
            case "toprowbottompane":
            case "leftcolumnrightpane":
            case "unsynced":
            case "print":
            case "printerrors":
            case "panes":
            case "scale":
            case "pane":
            case "number":
            case "layout":
            case "pagesetup":
            case "selected":
            case "protectobjects":
            case "enableselection":
            case "protectscenarios":
            case "validprinterinfo":
            case "horizontalresolution":
            case "verticalresolution":
            case "numberofcopies":
            case "activepane":
            case "toprowvisible":
            case "leftcolumnvisible":
            case "fittopage":
            case "rangeselection":
            case "papersizeindex":
            case "pagelayoutzoom":
            case "pagebreakzoom":
            case "filteron":
            case "fitwidth":
            case "fitheight":
            case "commentslayout":
            case "zoom":
            case "lefttoright":
            case "gridlines":
            case "allowsort":
            case "allowfilter":
            case "allowinsertrows":
            case "allowdeleterows":
            case "allowinsertcols":
            case "allowdeletecols":
            case "allowinserthyperlinks":
            case "allowformatcells":
            case "allowsizecols":
            case "allowsizerows":
            case "tabcolorindex":
            case "donotdisplayheadings":
            case "showpagelayoutzoom":
            case "blackandwhite":
            case "donotdisplayzeros":
            case "displaypagebreak":
            case "rowcolheadings":
            case "donotdisplayoutline":
            case "noorientation":
            case "allowusepivottables":
            case "zeroheight":
            case "viewablerange":
            case "selection":
            case "protectcontents":
              break;
            case "nosummaryrowsbelowdetail":
              b["!outline"] || (b["!outline"] = {}), b["!outline"].above = !0;
              break;
            case "nosummarycolumnsrightdetail":
              b["!outline"] || (b["!outline"] = {}), b["!outline"].left = !0;
              break;
            default:
              J = !1
          }
          break;
        case "pivottable":
        case "pivotcache":
          switch (i[3]) {
            case "immediateitemsondrop":
            case "showpagemultipleitemlabel":
            case "compactrowindent":
            case "location":
            case "pivotfield":
            case "orientation":
            case "layoutform":
            case "layoutsubtotallocation":
            case "layoutcompactrow":
            case "position":
            case "pivotitem":
            case "datatype":
            case "datafield":
            case "sourcename":
            case "parentfield":
            case "ptlineitems":
            case "ptlineitem":
            case "countofsameitems":
            case "item":
            case "itemtype":
            case "ptsource":
            case "cacheindex":
            case "consolidationreference":
            case "filename":
            case "reference":
            case "nocolumngrand":
            case "norowgrand":
            case "blanklineafteritems":
            case "hidden":
            case "subtotal":
            case "basefield":
            case "mapchilditems":
            case "function":
            case "refreshonfileopen":
            case "printsettitles":
            case "mergelabels":
            case "defaultversion":
            case "refreshname":
            case "refreshdate":
            case "refreshdatecopy":
            case "versionlastrefresh":
            case "versionlastupdate":
            case "versionupdateablemin":
            case "versionrefreshablemin":
            case "calculation":
              break;
            default:
              J = !1
          }
          break;
        case "pagebreaks":
          switch (i[3]) {
            case "colbreaks":
            case "colbreak":
            case "rowbreaks":
            case "rowbreak":
            case "colstart":
            case "colend":
            case "rowend":
              break;
            default:
              J = !1
          }
          break;
        case "autofilter":
          switch (i[3]) {
            case "autofiltercolumn":
            case "autofiltercondition":
            case "autofilterand":
            case "autofilteror":
              break;
            default:
              J = !1
          }
          break;
        case "querytable":
          switch (i[3]) {
            case "id":
            case "autoformatfont":
            case "autoformatpattern":
            case "querysource":
            case "querytype":
            case "enableredirections":
            case "refreshedinxl9":
            case "urlstring":
            case "htmltables":
            case "connection":
            case "commandtext":
            case "refreshinfo":
            case "notitles":
            case "nextid":
            case "columninfo":
            case "overwritecells":
            case "donotpromptforfile":
            case "textwizardsettings":
            case "source":
            case "number":
            case "decimal":
            case "thousandseparator":
            case "trailingminusnumbers":
            case "formatsettings":
            case "fieldtype":
            case "delimiters":
            case "tab":
            case "comma":
            case "autoformatname":
            case "versionlastedit":
            case "versionlastrefresh":
              break;
            default:
              J = !1
          }
          break;
        case "datavalidation":
          switch (i[3]) {
            case "range":
            case "type":
            case "min":
            case "max":
            case "sort":
            case "descending":
            case "order":
            case "casesensitive":
            case "value":
            case "errorstyle":
            case "errormessage":
            case "errortitle":
            case "inputmessage":
            case "inputtitle":
            case "combohide":
            case "inputhide":
            case "condition":
            case "qualifier":
            case "useblank":
            case "value1":
            case "value2":
            case "format":
            case "cellrangelist":
              break;
            default:
              J = !1
          }
          break;
        case "sorting":
        case "conditionalformatting":
          switch (i[3]) {
            case "range":
            case "type":
            case "min":
            case "max":
            case "sort":
            case "descending":
            case "order":
            case "casesensitive":
            case "value":
            case "errorstyle":
            case "errormessage":
            case "errortitle":
            case "cellrangelist":
            case "inputmessage":
            case "inputtitle":
            case "combohide":
            case "inputhide":
            case "condition":
            case "qualifier":
            case "useblank":
            case "value1":
            case "value2":
            case "format":
              break;
            default:
              J = !1
          }
          break;
        case "mapinfo":
        case "schema":
        case "data":
          switch (i[3]) {
            case "map":
            case "entry":
            case "range":
            case "xpath":
            case "field":
            case "xsdtype":
            case "filteron":
            case "aggregate":
            case "elementtype":
            case "attributetype":
            case "schema":
            case "element":
            case "complextype":
            case "datatype":
            case "all":
            case "attribute":
            case "extends":
            case "row":
              break;
            default:
              J = !1
          }
          break;
        case "smarttags":
          break;
        default:
          J = !1
      }
      if (J) break;
      if (i[3].match(/!\[CDATA/)) break;
      if (!d[d.length - 1][1]) throw "Unrecognized tag: " + i[3] + "|" + d.join("|");
      if ("customdocumentproperties" === d[d.length - 1][0]) {
        if ("/>" === i[0].slice(-2)) break;
        "/" === i[1] ? Wx(E, U, O, o.slice(P, i.index)) : (O = i, P = i.index + i[0].length);
        break
      }
      if (n.WTF) throw "Unrecognized tag: " + i[3] + "|" + d.join("|")
  }
  var Q = {};
  return n.bookSheets || n.bookProps || (Q.Sheets = u), Q.SheetNames = p, Q.Workbook = $, Q.SSF = Cg(Sm), Q.Props = A, Q
    .Custprops = E, Q
}

function Qx(t, e) {
  switch (Nw(e = e || {}), e.type || "base64") {
    case "base64":
      return Zx(im(t), e);
    case "binary":
    case "buffer":
    case "file":
      return Zx(t, e);
    case "array":
      return Zx(dm(t), e)
  }
}

function tw(t) {
  var e = {},
    n = t.content;
  if (n.l = 28, e.AnsiUserType = n.read_shift(0, "lpstr-ansi"), e.AnsiClipboardFormat = function(t) {
      return Rh(t, 1)
    }(n), n.length - n.l <= 4) return e;
  var o = n.read_shift(4);
  return 0 == o || o > 40 ? e : (n.l -= 4, e.Reserved1 = n.read_shift(0, "lpstr-ansi"), n.length - n.l <= 4 ||
    1907505652 !== (o = n.read_shift(4)) ? e : (e.UnicodeClipboardFormat = function(t) {
      return Rh(t, 2)
    }(n), 0 == (o = n.read_shift(4)) || o > 40 ? e : (n.l -= 4, void(e.Reserved2 = n.read_shift(0, "lpwstr")))))
}
var ew = [60, 1084, 2066, 2165, 2175];

function nw(t, e, n, o, i) {
  var a = o,
    r = [],
    s = n.slice(n.l, n.l + a);
  if (i && i.enc && i.enc.insitu && s.length > 0) switch (t) {
    case 9:
    case 521:
    case 1033:
    case 2057:
    case 47:
    case 405:
    case 225:
    case 406:
    case 312:
    case 404:
    case 10:
    case 133:
      break;
    default:
      i.enc.insitu(s)
  }
  r.push(s), n.l += a;
  for (var l = Uf(n, n.l), c = dw[l], d = 0; null != c && ew.indexOf(l) > -1;) a = Uf(n, n.l + 2), d = n.l + 4, 2066 ==
    l ? d += 4 : 2165 != l && 2175 != l || (d += 12), s = n.slice(d, n.l + 4 + a), r.push(s), n.l += 4 + a, c = dw[l =
      Uf(n, n.l)];
  var u = pm(r);
  Qf(u, 0);
  var p = 0;
  u.lens = [];
  for (var b = 0; b < r.length; ++b) u.lens.push(p), p += r[b].length;
  if (u.length < o) throw "XLS Record 0x" + t.toString(16) + " Truncated: " + u.length + " < " + o;
  return e.f(u, u.length, i)
}

function ow(t, e, n) {
  if ("z" !== t.t && t.XF) {
    var o = 0;
    try {
      o = t.z || t.XF.numFmtId || 0, e.cellNF && (t.z = Sm[o])
    } catch (aD) {
      if (e.WTF) throw aD
    }
    if (!e || !1 !== e.cellText) try {
      "e" === t.t ? t.w = t.w || Gh[t.v] : 0 === o || "General" == o ? "n" === t.t ? (0 | t.v) === t.v ? t.w = t.v
        .toString(10) : t.w = Bm(t.v) : t.w = Fm(t.v) : t.w = ng(o, t.v, {
          date1904: !!n,
          dateNF: e && e.dateNF
        })
    } catch (aD) {
      if (e.WTF) throw aD
    }
    if (e.cellDates && o && "n" == t.t && Zm(Sm[o] || String(o))) {
      var i = Em(t.v);
      i && (t.t = "d", t.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u))
    }
  }
}

function iw(t, e, n) {
  return {
    v: t,
    ixfe: e,
    t: n
  }
}

function aw(t, e) {
  var n, o, i, a, r, s, l, c, d = {
      opts: {}
    },
    u = {},
    p = e.dense ? [] : {},
    b = {},
    m = {},
    g = null,
    f = [],
    h = "",
    v = {},
    y = "",
    k = {},
    x = [],
    w = [],
    C = [],
    S = {
      Sheets: [],
      WBProps: {
        date1904: !1
      },
      Views: [{}]
    },
    T = {},
    I = function(t) {
      return t < 8 ? Hh[t] : t < 64 && C[t - 8] || Hh[t]
    },
    A = function(t, e, o) {
      if (!(D > 1 || o.sheetRows && t.r >= o.sheetRows)) {
        if (o.cellStyles && e.XF && e.XF.data && function(t, e, n) {
            var o, i = e.XF.data;
            i && i.patternType && n && n.cellStyles && (e.s = {}, e.s.patternType = i.patternType, (o = My(I(i
              .icvFore))) && (e.s.fgColor = {
              rgb: o
            }), (o = My(I(i.icvBack))) && (e.s.bgColor = {
              rgb: o
            }))
          }(0, e, o), delete e.ixfe, delete e.XF, n = t, y = bh(t), m && m.s && m.e || (m = {
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: 0,
              c: 0
            }
          }), t.r < m.s.r && (m.s.r = t.r), t.c < m.s.c && (m.s.c = t.c), t.r + 1 > m.e.r && (m.e.r = t.r + 1), t.c +
          1 > m.e.c && (m.e.c = t.c + 1), o.cellFormula && e.f)
          for (var i = 0; i < x.length; ++i)
            if (!(x[i][0].s.c > t.c || x[i][0].s.r > t.r || x[i][0].e.c < t.c || x[i][0].e.r < t.r)) {
              e.F = gh(x[i][0]), x[i][0].s.c == t.c && x[i][0].s.r == t.r || delete e.f, e.f && (e.f = "" + $k(x[i][1],
                0, t, B, E));
              break
            } o.dense ? (p[t.r] || (p[t.r] = []), p[t.r][t.c] = e) : p[y] = e
      }
    },
    E = {
      enc: !1,
      sbcch: 0,
      snames: [],
      sharedf: k,
      arrayf: x,
      rrtabid: [],
      lastuser: "",
      biff: 8,
      codepage: 0,
      winlocked: 0,
      cellStyles: !!e && !!e.cellStyles,
      WTF: !!e && !!e.wtf
    };
  e.password && (E.password = e.password);
  var P = [],
    O = [],
    M = [],
    L = [],
    _ = !1,
    B = [];
  B.SheetNames = E.snames, B.sharedf = E.sharedf, B.arrayf = E.arrayf, B.names = [], B.XTI = [];
  var F, R = 0,
    D = 0,
    V = 0,
    N = [],
    $ = [];
  E.codepage = 1200, qb(1200);
  for (var z = !1; t.l < t.length - 1;) {
    var U = t.l,
      j = t.read_shift(2);
    if (0 === j && 10 === R) break;
    var H = t.l === t.length ? 0 : t.read_shift(2),
      G = dw[j];
    if (G && G.f) {
      if (e.bookSheets && 133 === R && 133 !== j) break;
      if (R = j, 2 === G.r || 12 == G.r) {
        var K = t.read_shift(2);
        if (H -= 2, !E.enc && K !== j && ((255 & K) << 8 | K >> 8) !== j) throw new Error("rt mismatch: " + K + "!=" +
          j);
        12 == G.r && (t.l += 10, H -= 10)
      }
      var W = {};
      if (W = 10 === j ? G.f(t, H, E) : nw(j, G, t, H, E), 0 == D && -1 === [9, 521, 1033, 2057].indexOf(R)) continue;
      switch (j) {
        case 34:
          d.opts.Date1904 = S.WBProps.date1904 = W;
          break;
        case 134:
          d.opts.WriteProtect = !0;
          break;
        case 47:
          if (E.enc || (t.l = 0), E.enc = W, !e.password) throw new Error("File is password-protected");
          if (null == W.valid) throw new Error("Encryption scheme unsupported");
          if (!W.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          E.lastuser = W;
          break;
        case 66:
          var q = Number(W);
          switch (q) {
            case 21010:
              q = 1200;
              break;
            case 32768:
              q = 1e4;
              break;
            case 32769:
              q = 1252
          }
          qb(E.codepage = q), z = !0;
          break;
        case 317:
          E.rrtabid = W;
          break;
        case 25:
          E.winlocked = W;
          break;
        case 439:
          d.opts.RefreshAll = W;
          break;
        case 12:
          d.opts.CalcCount = W;
          break;
        case 16:
          d.opts.CalcDelta = W;
          break;
        case 17:
          d.opts.CalcIter = W;
          break;
        case 13:
          d.opts.CalcMode = W;
          break;
        case 14:
          d.opts.CalcPrecision = W;
          break;
        case 95:
          d.opts.CalcSaveRecalc = W;
          break;
        case 15:
          E.CalcRefMode = W;
          break;
        case 2211:
          d.opts.FullCalc = W;
          break;
        case 129:
          W.fDialog && (p["!type"] = "dialog"), W.fBelow || ((p["!outline"] || (p["!outline"] = {})).above = !0), W
            .fRight || ((p["!outline"] || (p["!outline"] = {})).left = !0);
          break;
        case 224:
          w.push(W);
          break;
        case 430:
          B.push([W]), B[B.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          B[B.length - 1].push(W);
          break;
        case 24:
        case 536:
          F = {
              Name: W.Name,
              Ref: $k(W.rgce, 0, null, B, E)
            }, W.itab > 0 && (F.Sheet = W.itab - 1), B.names.push(F), B[0] || (B[0] = [], B[0].XTI = []), B[B.length -
              1].push(W), "_xlnm._FilterDatabase" == W.Name && W.itab > 0 && W.rgce && W.rgce[0] && W.rgce[0][0] &&
            "PtgArea3d" == W.rgce[0][0][0] && ($[W.itab - 1] = {
              ref: gh(W.rgce[0][0][1][2])
            });
          break;
        case 22:
          E.ExternCount = W;
          break;
        case 23:
          0 == B.length && (B[0] = [], B[0].XTI = []), B[B.length - 1].XTI = B[B.length - 1].XTI.concat(W), B.XTI = B
            .XTI.concat(W);
          break;
        case 2196:
          if (E.biff < 8) break;
          null != F && (F.Comment = W[1]);
          break;
        case 18:
          p["!protect"] = W;
          break;
        case 19:
          0 !== W && E.WTF;
          break;
        case 133:
          b[W.pos] = W, E.snames.push(W.name);
          break;
        case 10:
          if (--D) break;
          if (m.e) {
            if (m.e.r > 0 && m.e.c > 0) {
              if (m.e.r--, m.e.c--, p["!ref"] = gh(m), e.sheetRows && e.sheetRows <= m.e.r) {
                var Y = m.e.r;
                m.e.r = e.sheetRows - 1, p["!fullref"] = p["!ref"], p["!ref"] = gh(m), m.e.r = Y
              }
              m.e.r++, m.e.c++
            }
            P.length > 0 && (p["!merges"] = P), O.length > 0 && (p["!objects"] = O), M.length > 0 && (p["!cols"] = M), L
              .length > 0 && (p["!rows"] = L), S.Sheets.push(T)
          }
          "" === h ? v = p : u[h] = p, p = e.dense ? [] : {};
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          if (8 === E.biff && (E.biff = {
              9: 2,
              521: 3,
              1033: 4
            } [j] || {
              512: 2,
              768: 3,
              1024: 4,
              1280: 5,
              1536: 8,
              2: 2,
              7: 2
            } [W.BIFFVer] || 8), E.biffguess = 0 == W.BIFFVer, 0 == W.BIFFVer && 4096 == W.dt && (E.biff = 5, z = !0,
              qb(E.codepage = 28591)), 8 == E.biff && 0 == W.BIFFVer && 16 == W.dt && (E.biff = 2), D++) break;
          if (p = e.dense ? [] : {}, E.biff < 8 && !z && (z = !0, qb(E.codepage = e.codepage || 1252)), E.biff < 5 ||
            0 == W.BIFFVer && 4096 == W.dt) {
            "" === h && (h = "Sheet1"), m = {
              s: {
                r: 0,
                c: 0
              },
              e: {
                r: 0,
                c: 0
              }
            };
            var X = {
              pos: t.l - H,
              name: h
            };
            b[X.pos] = X, E.snames.push(h)
          } else h = (b[U] || {
            name: ""
          }).name;
          32 == W.dt && (p["!type"] = "chart"), 64 == W.dt && (p["!type"] = "macro"), P = [], O = [], E.arrayf = x = [],
            M = [], L = [], _ = !1, T = {
              Hidden: (b[U] || {
                hs: 0
              }).hs,
              name: h
            };
          break;
        case 515:
        case 3:
        case 2:
          "chart" == p["!type"] && (e.dense ? (p[W.r] || [])[W.c] : p[bh({
            c: W.c,
            r: W.r
          })]) && ++W.c, s = {
            ixfe: W.ixfe,
            XF: w[W.ixfe] || {},
            v: W.val,
            t: "n"
          }, V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
            c: W.c,
            r: W.r
          }, s, e);
          break;
        case 5:
        case 517:
          s = {
            ixfe: W.ixfe,
            XF: w[W.ixfe],
            v: W.val,
            t: W.t
          }, V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
            c: W.c,
            r: W.r
          }, s, e);
          break;
        case 638:
          s = {
            ixfe: W.ixfe,
            XF: w[W.ixfe],
            v: W.rknum,
            t: "n"
          }, V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
            c: W.c,
            r: W.r
          }, s, e);
          break;
        case 189:
          for (var J = W.c; J <= W.C; ++J) {
            var Z = W.rkrec[J - W.c][0];
            s = {
              ixfe: Z,
              XF: w[Z],
              v: W.rkrec[J - W.c][1],
              t: "n"
            }, V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
              c: J,
              r: W.r
            }, s, e)
          }
          break;
        case 6:
        case 518:
        case 1030:
          if ("String" == W.val) {
            g = W;
            break
          }
          if ((s = iw(W.val, W.cell.ixfe, W.tt)).XF = w[s.ixfe], e.cellFormula) {
            var Q = W.formula;
            if (Q && Q[0] && Q[0][0] && "PtgExp" == Q[0][0][0]) {
              var tt = Q[0][0][1][0],
                et = Q[0][0][1][1],
                nt = bh({
                  r: tt,
                  c: et
                });
              k[nt] ? s.f = "" + $k(W.formula, 0, W.cell, B, E) : s.F = ((e.dense ? (p[tt] || [])[et] : p[nt]) || {}).F
            } else s.f = "" + $k(W.formula, 0, W.cell, B, E)
          }
          V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A(W.cell, s, e), g = W;
          break;
        case 7:
        case 519:
          if (!g) throw new Error("String record expects Formula");
          g.val = W, (s = iw(W, g.cell.ixfe, "s")).XF = w[s.ixfe], e.cellFormula && (s.f = "" + $k(g.formula, 0, g.cell,
            B, E)), V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A(g.cell, s, e), g = null;
          break;
        case 33:
        case 545:
          x.push(W);
          var ot = bh(W[0].s);
          if (o = e.dense ? (p[W[0].s.r] || [])[W[0].s.c] : p[ot], e.cellFormula && o) {
            if (!g) break;
            if (!ot || !o) break;
            o.f = "" + $k(W[1], 0, W[0], B, E), o.F = gh(W[0])
          }
          break;
        case 1212:
          if (!e.cellFormula) break;
          if (y) {
            if (!g) break;
            k[bh(g.cell)] = W[0], ((o = e.dense ? (p[g.cell.r] || [])[g.cell.c] : p[bh(g.cell)]) || {}).f = "" + $k(W[
              0], 0, n, B, E)
          }
          break;
        case 253:
          s = iw(f[W.isst].t, W.ixfe, "s"), f[W.isst].h && (s.h = f[W.isst].h), s.XF = w[s.ixfe], V > 0 && (s.z = N[s
            .ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
            c: W.c,
            r: W.r
          }, s, e);
          break;
        case 513:
          e.sheetStubs && (s = {
            ixfe: W.ixfe,
            XF: w[W.ixfe],
            t: "z"
          }, V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
            c: W.c,
            r: W.r
          }, s, e));
          break;
        case 190:
          if (e.sheetStubs)
            for (var it = W.c; it <= W.C; ++it) {
              var at = W.ixfe[it - W.c];
              s = {
                ixfe: at,
                XF: w[at],
                t: "z"
              }, V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904), A({
                c: it,
                r: W.r
              }, s, e)
            }
          break;
        case 214:
        case 516:
        case 4:
          (s = iw(W.val, W.ixfe, "s")).XF = w[s.ixfe], V > 0 && (s.z = N[s.ixfe >> 8 & 63]), ow(s, e, d.opts.Date1904),
            A({
              c: W.c,
              r: W.r
            }, s, e);
          break;
        case 0:
        case 512:
          1 === D && (m = W);
          break;
        case 252:
          f = W;
          break;
        case 1054:
          if (4 == E.biff) {
            N[V++] = W[1];
            for (var rt = 0; rt < V + 163 && Sm[rt] != W[1]; ++rt);
            rt >= 163 && og(W[1], V + 163)
          } else og(W[1], W[0]);
          break;
        case 30:
          N[V++] = W;
          for (var st = 0; st < V + 163 && Sm[st] != W; ++st);
          st >= 163 && og(W, V + 163);
          break;
        case 229:
          P = P.concat(W);
          break;
        case 93:
          O[W.cmo[0]] = E.lastobj = W;
          break;
        case 438:
          E.lastobj.TxO = W;
          break;
        case 127:
          E.lastobj.ImData = W;
          break;
        case 440:
          for (r = W[0].s.r; r <= W[0].e.r; ++r)
            for (a = W[0].s.c; a <= W[0].e.c; ++a)(o = e.dense ? (p[r] || [])[a] : p[bh({
              c: a,
              r
            })]) && (o.l = W[1]);
          break;
        case 2048:
          for (r = W[0].s.r; r <= W[0].e.r; ++r)
            for (a = W[0].s.c; a <= W[0].e.c; ++a)(o = e.dense ? (p[r] || [])[a] : p[bh({
              c: a,
              r
            })]) && o.l && (o.l.Tooltip = W[1]);
          break;
        case 28:
          if (E.biff <= 5 && E.biff >= 2) break;
          o = e.dense ? (p[W[0].r] || [])[W[0].c] : p[bh(W[0])];
          var lt = O[W[2]];
          o || (e.dense ? (p[W[0].r] || (p[W[0].r] = []), o = p[W[0].r][W[0].c] = {
              t: "z"
            }) : o = p[bh(W[0])] = {
              t: "z"
            }, m.e.r = Math.max(m.e.r, W[0].r), m.s.r = Math.min(m.s.r, W[0].r), m.e.c = Math.max(m.e.c, W[0].c), m.s
            .c = Math.min(m.s.c, W[0].c)), o.c || (o.c = []), i = {
            a: W[1],
            t: lt.TxO.t
          }, o.c.push(i);
          break;
        case 2173:
          rk(w[W.ixfe], W.ext);
          break;
        case 125:
          if (!E.cellStyles) break;
          for (; W.e >= W.s;) M[W.e--] = {
            width: W.w / 256,
            level: W.level || 0,
            hidden: !!(1 & W.flags)
          }, _ || (_ = !0, Vy(W.w / 256)), Ny(M[W.e + 1]);
          break;
        case 520:
          var ct = {};
          null != W.level && (L[W.r] = ct, ct.level = W.level), W.hidden && (L[W.r] = ct, ct.hidden = !0), W.hpt && (L[W
            .r] = ct, ct.hpt = W.hpt, ct.hpx = Uy(W.hpt));
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          p["!margins"] || nx(p["!margins"] = {}), p["!margins"][{
            38: "left",
            39: "right",
            40: "top",
            41: "bottom"
          } [j]] = W;
          break;
        case 161:
          p["!margins"] || nx(p["!margins"] = {}), p["!margins"].header = W.header, p["!margins"].footer = W.footer;
          break;
        case 574:
          W.RTL && (S.Views[0].RTL = !0);
          break;
        case 146:
          C = W;
          break;
        case 2198:
          c = W;
          break;
        case 140:
          l = W;
          break;
        case 442:
          h ? T.CodeName = W || T.name : S.WBProps.CodeName = W || "ThisWorkbook"
      }
    } else t.l += H
  }
  return d.SheetNames = cg(b).sort(function(t, e) {
      return Number(t) - Number(e)
    }).map(function(t) {
      return b[t].name
    }), e.bookSheets || (d.Sheets = u), !d.SheetNames.length && v["!ref"] ? (d.SheetNames.push("Sheet1"), d.Sheets && (d
      .Sheets.Sheet1 = v)) : d.Preamble = v, d.Sheets && $.forEach(function(t, e) {
      d.Sheets[d.SheetNames[e]]["!autofilter"] = t
    }), d.Strings = f, d.SSF = Cg(Sm), E.enc && (d.Encryption = E.enc), c && (d.Themes = c), d.Metadata = {}, void 0 !==
    l && (d.Metadata.Country = l), B.names.length > 0 && (S.Names = B.names), d.Workbook = S, d
}
var rw = "e0859ff2f94f6810ab9108002b27b3d9",
  sw = "02d5cdd59c2e1b10939708002b2cf9ae";

function lw(t, e) {
  var n, o, i, a;
  if (e || (e = {}), Nw(e), Yb(), e.codepage && Wb(e.codepage), t.FullPaths) {
    if (lg.find(t, "/encryption")) throw new Error("File is password-protected");
    n = lg.find(t, "!CompObj"), o = lg.find(t, "/Workbook") || lg.find(t, "/Book")
  } else {
    switch (e.type) {
      case "base64":
        t = cm(im(t));
        break;
      case "binary":
        t = cm(t);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(t) || (t = Array.prototype.slice.call(t))
    }
    Qf(t, 0), o = {
      content: t
    }
  }
  if (n && tw(n), e.bookProps && !e.bookSheets) i = {};
  else {
    var r = am ? "buffer" : "array";
    if (o && o.content) i = aw(o.content, e);
    else if ((a = lg.find(t, "PerfectOffice_MAIN")) && a.content) i = sy.to_workbook(a.content, (e.type = r, e));
    else {
      if (!(a = lg.find(t, "NativeContent_MAIN")) || !a.content) throw (a = lg.find(t, "MN0")) && a.content ? new Error(
        "Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
      i = sy.to_workbook(a.content, (e.type = r, e))
    }
    e.bookVBA && t.FullPaths && lg.find(t, "/_VBA_PROJECT_CUR/VBA/dir") && (i.vbaraw = function(t) {
      var e = lg.utils.cfb_new({
        root: "R"
      });
      return t.FullPaths.forEach(function(n, o) {
        if ("/" !== n.slice(-1) && n.match(/_VBA_PROJECT_CUR/)) {
          var i = n.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
          lg.utils.cfb_add(e, i, t.FileIndex[o].content)
        }
      }), lg.write(e)
    }(t))
  }
  var s = {};
  return t.FullPaths && function(t, e, n) {
    var o = lg.find(t, "/!DocumentSummaryInformation");
    if (o && o.size > 0) try {
      var i = fv(o, Nh, sw);
      for (var a in i) e[a] = i[a]
    } catch (aD) {
      if (n.WTF) throw aD
    }
    var r = lg.find(t, "/!SummaryInformation");
    if (r && r.size > 0) try {
      var s = fv(r, $h, rw);
      for (var l in s) null == e[l] && (e[l] = s[l])
    } catch (aD) {
      if (n.WTF) throw aD
    }
    e.HeadingPairs && e.TitlesOfParts && (ev(e.HeadingPairs, e.TitlesOfParts, e, n), delete e.HeadingPairs, delete e
      .TitlesOfParts)
  }(t, s, e), i.Props = i.Custprops = s, e.bookFiles && (i.cfb = t), i
}
var cw = {
    0: {
      f: function(t, e) {
        var n = {},
          o = t.l + e;
        n.r = t.read_shift(4), t.l += 4;
        var i = t.read_shift(2);
        t.l += 1;
        var a = t.read_shift(1);
        return t.l = o, 7 & a && (n.level = 7 & a), 16 & a && (n.hidden = !0), 32 & a && (n.hpt = i / 20), n
      }
    },
    1: {
      f: function(t) {
        return [Ih(t)]
      }
    },
    2: {
      f: function(t) {
        return [Ih(t), Lh(t), "n"]
      }
    },
    3: {
      f: function(t) {
        return [Ih(t), t.read_shift(1), "e"]
      }
    },
    4: {
      f: function(t) {
        return [Ih(t), t.read_shift(1), "b"]
      }
    },
    5: {
      f: function(t) {
        return [Ih(t), Fh(t), "n"]
      }
    },
    6: {
      f: function(t) {
        return [Ih(t), wh(t), "str"]
      }
    },
    7: {
      f: function(t) {
        return [Ih(t), t.read_shift(4), "s"]
      }
    },
    8: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = Ih(t);
        i.r = n["!row"];
        var a = [i, wh(t), "str"];
        if (n.cellFormula) {
          t.l += 2;
          var r = Kk(t, o - t.l, n);
          a[3] = $k(r, 0, i, n.supbooks, n)
        } else t.l = o;
        return a
      }
    },
    9: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = Ih(t);
        i.r = n["!row"];
        var a = [i, Fh(t), "n"];
        if (n.cellFormula) {
          t.l += 2;
          var r = Kk(t, o - t.l, n);
          a[3] = $k(r, 0, i, n.supbooks, n)
        } else t.l = o;
        return a
      }
    },
    10: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = Ih(t);
        i.r = n["!row"];
        var a = [i, t.read_shift(1), "b"];
        if (n.cellFormula) {
          t.l += 2;
          var r = Kk(t, o - t.l, n);
          a[3] = $k(r, 0, i, n.supbooks, n)
        } else t.l = o;
        return a
      }
    },
    11: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = Ih(t);
        i.r = n["!row"];
        var a = [i, t.read_shift(1), "e"];
        if (n.cellFormula) {
          t.l += 2;
          var r = Kk(t, o - t.l, n);
          a[3] = $k(r, 0, i, n.supbooks, n)
        } else t.l = o;
        return a
      }
    },
    12: {
      f: function(t) {
        return [Ah(t)]
      }
    },
    13: {
      f: function(t) {
        return [Ah(t), Lh(t), "n"]
      }
    },
    14: {
      f: function(t) {
        return [Ah(t), t.read_shift(1), "e"]
      }
    },
    15: {
      f: function(t) {
        return [Ah(t), t.read_shift(1), "b"]
      }
    },
    16: {
      f: yx
    },
    17: {
      f: function(t) {
        return [Ah(t), wh(t), "str"]
      }
    },
    18: {
      f: function(t) {
        return [Ah(t), t.read_shift(4), "s"]
      }
    },
    19: {
      f: Sh
    },
    20: {},
    21: {},
    22: {},
    23: {},
    24: {},
    25: {},
    26: {},
    27: {},
    28: {},
    29: {},
    30: {},
    31: {},
    32: {},
    33: {},
    34: {},
    35: {
      T: 1
    },
    36: {
      T: -1
    },
    37: {
      T: 1
    },
    38: {
      T: -1
    },
    39: {
      f: function(t, e, n) {
        var o = t.l + e;
        t.l += 4, t.l += 1;
        var i = t.read_shift(4),
          a = Oh(t),
          r = Wk(t, 0, n),
          s = Ph(t);
        t.l = o;
        var l = {
          Name: a,
          Ptg: r
        };
        return i < 268435455 && (l.Sheet = i), s && (l.Comment = s), l
      }
    },
    40: {},
    42: {},
    43: {
      f: function(t, e, n) {
        var o = {};
        o.sz = t.read_shift(2) / 20;
        var i = function(t) {
          var e = t.read_shift(1);
          return t.l++, {
            fBold: 1 & e,
            fItalic: 2 & e,
            fUnderline: 4 & e,
            fStrikeout: 8 & e,
            fOutline: 16 & e,
            fShadow: 32 & e,
            fCondense: 64 & e,
            fExtend: 128 & e
          }
        }(t);
        switch (i.fItalic && (o.italic = 1), i.fCondense && (o.condense = 1), i.fExtend && (o.extend = 1), i
          .fShadow && (o.shadow = 1), i.fOutline && (o.outline = 1), i.fStrikeout && (o.strike = 1), 700 === t
          .read_shift(2) && (o.bold = 1), t.read_shift(2)) {
          case 1:
            o.vertAlign = "superscript";
            break;
          case 2:
            o.vertAlign = "subscript"
        }
        var a = t.read_shift(1);
        0 != a && (o.underline = a);
        var r = t.read_shift(1);
        r > 0 && (o.family = r);
        var s = t.read_shift(1);
        switch (s > 0 && (o.charset = s), t.l++, o.color = function(t) {
            var e = {},
              n = t.read_shift(1) >>> 1,
              o = t.read_shift(1),
              i = t.read_shift(2, "i"),
              a = t.read_shift(1),
              r = t.read_shift(1),
              s = t.read_shift(1);
            switch (t.l++, n) {
              case 0:
                e.auto = 1;
                break;
              case 1:
                e.index = o;
                var l = Hh[o];
                l && (e.rgb = My(l));
                break;
              case 2:
                e.rgb = My([a, r, s]);
                break;
              case 3:
                e.theme = o
            }
            return 0 != i && (e.tint = i > 0 ? i / 32767 : i / 32768), e
          }(t), t.read_shift(1)) {
          case 1:
            o.scheme = "major";
            break;
          case 2:
            o.scheme = "minor"
        }
        return o.name = wh(t), o
      }
    },
    44: {
      f: function(t, e) {
        return [t.read_shift(2), wh(t)]
      }
    },
    45: {
      f: Wy
    },
    46: {
      f: qy
    },
    47: {
      f: function(t, e) {
        var n = t.l + e,
          o = t.read_shift(2),
          i = t.read_shift(2);
        return t.l = n, {
          ixfe: o,
          numFmtId: i
        }
      }
    },
    48: {},
    49: {
      f: function(t) {
        return t.read_shift(4, "i")
      }
    },
    50: {},
    51: {
      f: function(t) {
        for (var e = [], n = t.read_shift(4); n-- > 0;) e.push([t.read_shift(4), t.read_shift(4)]);
        return e
      }
    },
    52: {
      T: 1
    },
    53: {
      T: -1
    },
    54: {
      T: 1
    },
    55: {
      T: -1
    },
    56: {
      T: 1
    },
    57: {
      T: -1
    },
    58: {},
    59: {},
    60: {
      f: Jv
    },
    62: {
      f: function(t) {
        return [Ih(t), Sh(t), "is"]
      }
    },
    63: {
      f: function(t) {
        var e = {};
        e.i = t.read_shift(4);
        var n = {};
        n.r = t.read_shift(4), n.c = t.read_shift(4), e.r = bh(n);
        var o = t.read_shift(1);
        return 2 & o && (e.l = "1"), 8 & o && (e.a = "1"), e
      }
    },
    64: {
      f: function() {}
    },
    65: {},
    66: {},
    67: {},
    68: {},
    69: {},
    70: {},
    128: {},
    129: {
      T: 1
    },
    130: {
      T: -1
    },
    131: {
      T: 1,
      f: th,
      p: 0
    },
    132: {
      T: -1
    },
    133: {
      T: 1
    },
    134: {
      T: -1
    },
    135: {
      T: 1
    },
    136: {
      T: -1
    },
    137: {
      T: 1,
      f: function(t) {
        var e = t.read_shift(2);
        return t.l += 28, {
          RTL: 32 & e
        }
      }
    },
    138: {
      T: -1
    },
    139: {
      T: 1
    },
    140: {
      T: -1
    },
    141: {
      T: 1
    },
    142: {
      T: -1
    },
    143: {
      T: 1
    },
    144: {
      T: -1
    },
    145: {
      T: 1
    },
    146: {
      T: -1
    },
    147: {
      f: function(t, e) {
        var n = {},
          o = t[t.l];
        return ++t.l, n.above = !(64 & o), n.left = !(128 & o), t.l += 18, n.name = Eh(t), n
      }
    },
    148: {
      f: vx,
      p: 16
    },
    151: {
      f: function() {}
    },
    152: {},
    153: {
      f: function(t, e) {
        var n = {},
          o = t.read_shift(4);
        n.defaultThemeVersion = t.read_shift(4);
        var i = e > 8 ? wh(t) : "";
        return i.length > 0 && (n.CodeName = i), n.autoCompressPictures = !!(65536 & o), n.backupFile = !!(64 & o), n
          .checkCompatibility = !!(4096 & o), n.date1904 = !!(1 & o), n.filterPrivacy = !!(8 & o), n
          .hidePivotFieldList = !!(1024 & o), n.promptedSolutions = !!(16 & o), n.publishItems = !!(2048 & o), n
          .refreshAllConnections = !!(262144 & o), n.saveExternalLinkValues = !!(128 & o), n
          .showBorderUnselectedTables = !!(4 & o), n.showInkAnnotation = !!(32 & o), n.showObjects = ["all",
            "placeholders", "none"
          ][o >> 13 & 3], n.showPivotChartFilter = !!(32768 & o), n.updateLinks = ["userSet", "never", "always"][o >>
            8 & 3
          ], n
      }
    },
    154: {},
    155: {},
    156: {
      f: function(t, e) {
        var n = {};
        return n.Hidden = t.read_shift(4), n.iTabID = t.read_shift(4), n.strRelID = Mh(t), n.name = wh(t), n
      }
    },
    157: {},
    158: {},
    159: {
      T: 1,
      f: function(t) {
        return [t.read_shift(4), t.read_shift(4)]
      }
    },
    160: {
      T: -1
    },
    161: {
      T: 1,
      f: Bh
    },
    162: {
      T: -1
    },
    163: {
      T: 1
    },
    164: {
      T: -1
    },
    165: {
      T: 1
    },
    166: {
      T: -1
    },
    167: {},
    168: {},
    169: {},
    170: {},
    171: {},
    172: {
      T: 1
    },
    173: {
      T: -1
    },
    174: {},
    175: {},
    176: {
      f: kx
    },
    177: {
      T: 1
    },
    178: {
      T: -1
    },
    179: {
      T: 1
    },
    180: {
      T: -1
    },
    181: {
      T: 1
    },
    182: {
      T: -1
    },
    183: {
      T: 1
    },
    184: {
      T: -1
    },
    185: {
      T: 1
    },
    186: {
      T: -1
    },
    187: {
      T: 1
    },
    188: {
      T: -1
    },
    189: {
      T: 1
    },
    190: {
      T: -1
    },
    191: {
      T: 1
    },
    192: {
      T: -1
    },
    193: {
      T: 1
    },
    194: {
      T: -1
    },
    195: {
      T: 1
    },
    196: {
      T: -1
    },
    197: {
      T: 1
    },
    198: {
      T: -1
    },
    199: {
      T: 1
    },
    200: {
      T: -1
    },
    201: {
      T: 1
    },
    202: {
      T: -1
    },
    203: {
      T: 1
    },
    204: {
      T: -1
    },
    205: {
      T: 1
    },
    206: {
      T: -1
    },
    207: {
      T: 1
    },
    208: {
      T: -1
    },
    209: {
      T: 1
    },
    210: {
      T: -1
    },
    211: {
      T: 1
    },
    212: {
      T: -1
    },
    213: {
      T: 1
    },
    214: {
      T: -1
    },
    215: {
      T: 1
    },
    216: {
      T: -1
    },
    217: {
      T: 1
    },
    218: {
      T: -1
    },
    219: {
      T: 1
    },
    220: {
      T: -1
    },
    221: {
      T: 1
    },
    222: {
      T: -1
    },
    223: {
      T: 1
    },
    224: {
      T: -1
    },
    225: {
      T: 1
    },
    226: {
      T: -1
    },
    227: {
      T: 1
    },
    228: {
      T: -1
    },
    229: {
      T: 1
    },
    230: {
      T: -1
    },
    231: {
      T: 1
    },
    232: {
      T: -1
    },
    233: {
      T: 1
    },
    234: {
      T: -1
    },
    235: {
      T: 1
    },
    236: {
      T: -1
    },
    237: {
      T: 1
    },
    238: {
      T: -1
    },
    239: {
      T: 1
    },
    240: {
      T: -1
    },
    241: {
      T: 1
    },
    242: {
      T: -1
    },
    243: {
      T: 1
    },
    244: {
      T: -1
    },
    245: {
      T: 1
    },
    246: {
      T: -1
    },
    247: {
      T: 1
    },
    248: {
      T: -1
    },
    249: {
      T: 1
    },
    250: {
      T: -1
    },
    251: {
      T: 1
    },
    252: {
      T: -1
    },
    253: {
      T: 1
    },
    254: {
      T: -1
    },
    255: {
      T: 1
    },
    256: {
      T: -1
    },
    257: {
      T: 1
    },
    258: {
      T: -1
    },
    259: {
      T: 1
    },
    260: {
      T: -1
    },
    261: {
      T: 1
    },
    262: {
      T: -1
    },
    263: {
      T: 1
    },
    264: {
      T: -1
    },
    265: {
      T: 1
    },
    266: {
      T: -1
    },
    267: {
      T: 1
    },
    268: {
      T: -1
    },
    269: {
      T: 1
    },
    270: {
      T: -1
    },
    271: {
      T: 1
    },
    272: {
      T: -1
    },
    273: {
      T: 1
    },
    274: {
      T: -1
    },
    275: {
      T: 1
    },
    276: {
      T: -1
    },
    277: {},
    278: {
      T: 1
    },
    279: {
      T: -1
    },
    280: {
      T: 1
    },
    281: {
      T: -1
    },
    282: {
      T: 1
    },
    283: {
      T: 1
    },
    284: {
      T: -1
    },
    285: {
      T: 1
    },
    286: {
      T: -1
    },
    287: {
      T: 1
    },
    288: {
      T: -1
    },
    289: {
      T: 1
    },
    290: {
      T: -1
    },
    291: {
      T: 1
    },
    292: {
      T: -1
    },
    293: {
      T: 1
    },
    294: {
      T: -1
    },
    295: {
      T: 1
    },
    296: {
      T: -1
    },
    297: {
      T: 1
    },
    298: {
      T: -1
    },
    299: {
      T: 1
    },
    300: {
      T: -1
    },
    301: {
      T: 1
    },
    302: {
      T: -1
    },
    303: {
      T: 1
    },
    304: {
      T: -1
    },
    305: {
      T: 1
    },
    306: {
      T: -1
    },
    307: {
      T: 1
    },
    308: {
      T: -1
    },
    309: {
      T: 1
    },
    310: {
      T: -1
    },
    311: {
      T: 1
    },
    312: {
      T: -1
    },
    313: {
      T: -1
    },
    314: {
      T: 1
    },
    315: {
      T: -1
    },
    316: {
      T: 1
    },
    317: {
      T: -1
    },
    318: {
      T: 1
    },
    319: {
      T: -1
    },
    320: {
      T: 1
    },
    321: {
      T: -1
    },
    322: {
      T: 1
    },
    323: {
      T: -1
    },
    324: {
      T: 1
    },
    325: {
      T: -1
    },
    326: {
      T: 1
    },
    327: {
      T: -1
    },
    328: {
      T: 1
    },
    329: {
      T: -1
    },
    330: {
      T: 1
    },
    331: {
      T: -1
    },
    332: {
      T: 1
    },
    333: {
      T: -1
    },
    334: {
      T: 1
    },
    335: {
      f: function(t, e) {
        return {
          flags: t.read_shift(4),
          version: t.read_shift(4),
          name: wh(t)
        }
      }
    },
    336: {
      T: -1
    },
    337: {
      f: function(t) {
        return t.l += 4, 0 != t.read_shift(4)
      },
      T: 1
    },
    338: {
      T: -1
    },
    339: {
      T: 1
    },
    340: {
      T: -1
    },
    341: {
      T: 1
    },
    342: {
      T: -1
    },
    343: {
      T: 1
    },
    344: {
      T: -1
    },
    345: {
      T: 1
    },
    346: {
      T: -1
    },
    347: {
      T: 1
    },
    348: {
      T: -1
    },
    349: {
      T: 1
    },
    350: {
      T: -1
    },
    351: {},
    352: {},
    353: {
      T: 1
    },
    354: {
      T: -1
    },
    355: {
      f: Mh
    },
    357: {},
    358: {},
    359: {},
    360: {
      T: 1
    },
    361: {},
    362: {
      f: qv
    },
    363: {},
    364: {},
    366: {},
    367: {},
    368: {},
    369: {},
    370: {},
    371: {},
    372: {
      T: 1
    },
    373: {
      T: -1
    },
    374: {
      T: 1
    },
    375: {
      T: -1
    },
    376: {
      T: 1
    },
    377: {
      T: -1
    },
    378: {
      T: 1
    },
    379: {
      T: -1
    },
    380: {
      T: 1
    },
    381: {
      T: -1
    },
    382: {
      T: 1
    },
    383: {
      T: -1
    },
    384: {
      T: 1
    },
    385: {
      T: -1
    },
    386: {
      T: 1
    },
    387: {
      T: -1
    },
    388: {
      T: 1
    },
    389: {
      T: -1
    },
    390: {
      T: 1
    },
    391: {
      T: -1
    },
    392: {
      T: 1
    },
    393: {
      T: -1
    },
    394: {
      T: 1
    },
    395: {
      T: -1
    },
    396: {},
    397: {},
    398: {},
    399: {},
    400: {},
    401: {
      T: 1
    },
    403: {},
    404: {},
    405: {},
    406: {},
    407: {},
    408: {},
    409: {},
    410: {},
    411: {},
    412: {},
    413: {},
    414: {},
    415: {},
    416: {},
    417: {},
    418: {},
    419: {},
    420: {},
    421: {},
    422: {
      T: 1
    },
    423: {
      T: 1
    },
    424: {
      T: -1
    },
    425: {
      T: -1
    },
    426: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = _h(t),
          a = t.read_shift(1),
          r = [i];
        if (r[2] = a, n.cellFormula) {
          var s = Gk(t, o - t.l, n);
          r[1] = s
        } else t.l = o;
        return r
      }
    },
    427: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = [Bh(t)];
        if (n.cellFormula) {
          var a = qk(t, o - t.l, n);
          i[1] = a, t.l = o
        } else t.l = o;
        return i
      }
    },
    428: {},
    429: {
      T: 1
    },
    430: {
      T: -1
    },
    431: {
      T: 1
    },
    432: {
      T: -1
    },
    433: {
      T: 1
    },
    434: {
      T: -1
    },
    435: {
      T: 1
    },
    436: {
      T: -1
    },
    437: {
      T: 1
    },
    438: {
      T: -1
    },
    439: {
      T: 1
    },
    440: {
      T: -1
    },
    441: {
      T: 1
    },
    442: {
      T: -1
    },
    443: {
      T: 1
    },
    444: {
      T: -1
    },
    445: {
      T: 1
    },
    446: {
      T: -1
    },
    447: {
      T: 1
    },
    448: {
      T: -1
    },
    449: {
      T: 1
    },
    450: {
      T: -1
    },
    451: {
      T: 1
    },
    452: {
      T: -1
    },
    453: {
      T: 1
    },
    454: {
      T: -1
    },
    455: {
      T: 1
    },
    456: {
      T: -1
    },
    457: {
      T: 1
    },
    458: {
      T: -1
    },
    459: {
      T: 1
    },
    460: {
      T: -1
    },
    461: {
      T: 1
    },
    462: {
      T: -1
    },
    463: {
      T: 1
    },
    464: {
      T: -1
    },
    465: {
      T: 1
    },
    466: {
      T: -1
    },
    467: {
      T: 1
    },
    468: {
      T: -1
    },
    469: {
      T: 1
    },
    470: {
      T: -1
    },
    471: {},
    472: {},
    473: {
      T: 1
    },
    474: {
      T: -1
    },
    475: {},
    476: {
      f: function(t) {
        var e = {};
        return xx.forEach(function(n) {
          e[n] = Fh(t)
        }), e
      }
    },
    477: {},
    478: {},
    479: {
      T: 1
    },
    480: {
      T: -1
    },
    481: {
      T: 1
    },
    482: {
      T: -1
    },
    483: {
      T: 1
    },
    484: {
      T: -1
    },
    485: {
      f: function() {}
    },
    486: {
      T: 1
    },
    487: {
      T: -1
    },
    488: {
      T: 1
    },
    489: {
      T: -1
    },
    490: {
      T: 1
    },
    491: {
      T: -1
    },
    492: {
      T: 1
    },
    493: {
      T: -1
    },
    494: {
      f: function(t, e) {
        var n = t.l + e,
          o = Bh(t),
          i = Ph(t),
          a = wh(t),
          r = wh(t),
          s = wh(t);
        t.l = n;
        var l = {
          rfx: o,
          relId: i,
          loc: a,
          display: s
        };
        return r && (l.Tooltip = r), l
      }
    },
    495: {
      T: 1
    },
    496: {
      T: -1
    },
    497: {
      T: 1
    },
    498: {
      T: -1
    },
    499: {},
    500: {
      T: 1
    },
    501: {
      T: -1
    },
    502: {
      T: 1
    },
    503: {
      T: -1
    },
    504: {},
    505: {
      T: 1
    },
    506: {
      T: -1
    },
    507: {},
    508: {
      T: 1
    },
    509: {
      T: -1
    },
    510: {
      T: 1
    },
    511: {
      T: -1
    },
    512: {},
    513: {},
    514: {
      T: 1
    },
    515: {
      T: -1
    },
    516: {
      T: 1
    },
    517: {
      T: -1
    },
    518: {
      T: 1
    },
    519: {
      T: -1
    },
    520: {
      T: 1
    },
    521: {
      T: -1
    },
    522: {},
    523: {},
    524: {},
    525: {},
    526: {},
    527: {},
    528: {
      T: 1
    },
    529: {
      T: -1
    },
    530: {
      T: 1
    },
    531: {
      T: -1
    },
    532: {
      T: 1
    },
    533: {
      T: -1
    },
    534: {},
    535: {},
    536: {},
    537: {},
    538: {
      T: 1
    },
    539: {
      T: -1
    },
    540: {
      T: 1
    },
    541: {
      T: -1
    },
    542: {
      T: 1
    },
    548: {},
    549: {},
    550: {
      f: Mh
    },
    551: {},
    552: {},
    553: {},
    554: {
      T: 1
    },
    555: {
      T: -1
    },
    556: {
      T: 1
    },
    557: {
      T: -1
    },
    558: {
      T: 1
    },
    559: {
      T: -1
    },
    560: {
      T: 1
    },
    561: {
      T: -1
    },
    562: {},
    564: {},
    565: {
      T: 1
    },
    566: {
      T: -1
    },
    569: {
      T: 1
    },
    570: {
      T: -1
    },
    572: {},
    573: {
      T: 1
    },
    574: {
      T: -1
    },
    577: {},
    578: {},
    579: {},
    580: {},
    581: {},
    582: {},
    583: {},
    584: {},
    585: {},
    586: {},
    587: {},
    588: {
      T: -1
    },
    589: {},
    590: {
      T: 1
    },
    591: {
      T: -1
    },
    592: {
      T: 1
    },
    593: {
      T: -1
    },
    594: {
      T: 1
    },
    595: {
      T: -1
    },
    596: {},
    597: {
      T: 1
    },
    598: {
      T: -1
    },
    599: {
      T: 1
    },
    600: {
      T: -1
    },
    601: {
      T: 1
    },
    602: {
      T: -1
    },
    603: {
      T: 1
    },
    604: {
      T: -1
    },
    605: {
      T: 1
    },
    606: {
      T: -1
    },
    607: {},
    608: {
      T: 1
    },
    609: {
      T: -1
    },
    610: {},
    611: {
      T: 1
    },
    612: {
      T: -1
    },
    613: {
      T: 1
    },
    614: {
      T: -1
    },
    615: {
      T: 1
    },
    616: {
      T: -1
    },
    617: {
      T: 1
    },
    618: {
      T: -1
    },
    619: {
      T: 1
    },
    620: {
      T: -1
    },
    625: {},
    626: {
      T: 1
    },
    627: {
      T: -1
    },
    628: {
      T: 1
    },
    629: {
      T: -1
    },
    630: {
      T: 1
    },
    631: {
      T: -1
    },
    632: {
      f: lk
    },
    633: {
      T: 1
    },
    634: {
      T: -1
    },
    635: {
      T: 1,
      f: function(t) {
        var e = {};
        e.iauthor = t.read_shift(4);
        var n = Bh(t);
        return e.rfx = n.s, e.ref = bh(n.s), t.l += 16, e
      }
    },
    636: {
      T: -1
    },
    637: {
      f: Th
    },
    638: {
      T: 1
    },
    639: {},
    640: {
      T: -1
    },
    641: {
      T: 1
    },
    642: {
      T: -1
    },
    643: {
      T: 1
    },
    644: {},
    645: {
      T: -1
    },
    646: {
      T: 1
    },
    648: {
      T: 1
    },
    649: {},
    650: {
      T: -1
    },
    651: {
      f: function(t, e) {
        return t.l += 10, {
          name: wh(t)
        }
      }
    },
    652: {},
    653: {
      T: 1
    },
    654: {
      T: -1
    },
    655: {
      T: 1
    },
    656: {
      T: -1
    },
    657: {
      T: 1
    },
    658: {
      T: -1
    },
    659: {},
    660: {
      T: 1
    },
    661: {},
    662: {
      T: -1
    },
    663: {},
    664: {
      T: 1
    },
    665: {},
    666: {
      T: -1
    },
    667: {},
    668: {},
    669: {},
    671: {
      T: 1
    },
    672: {
      T: -1
    },
    673: {
      T: 1
    },
    674: {
      T: -1
    },
    675: {},
    676: {},
    677: {},
    678: {},
    679: {},
    680: {},
    681: {},
    1024: {},
    1025: {},
    1026: {
      T: 1
    },
    1027: {
      T: -1
    },
    1028: {
      T: 1
    },
    1029: {
      T: -1
    },
    1030: {},
    1031: {
      T: 1
    },
    1032: {
      T: -1
    },
    1033: {
      T: 1
    },
    1034: {
      T: -1
    },
    1035: {},
    1036: {},
    1037: {},
    1038: {
      T: 1
    },
    1039: {
      T: -1
    },
    1040: {},
    1041: {
      T: 1
    },
    1042: {
      T: -1
    },
    1043: {},
    1044: {},
    1045: {},
    1046: {
      T: 1
    },
    1047: {
      T: -1
    },
    1048: {
      T: 1
    },
    1049: {
      T: -1
    },
    1050: {},
    1051: {
      T: 1
    },
    1052: {
      T: 1
    },
    1053: {
      f: function() {}
    },
    1054: {
      T: 1
    },
    1055: {},
    1056: {
      T: 1
    },
    1057: {
      T: -1
    },
    1058: {
      T: 1
    },
    1059: {
      T: -1
    },
    1061: {},
    1062: {
      T: 1
    },
    1063: {
      T: -1
    },
    1064: {
      T: 1
    },
    1065: {
      T: -1
    },
    1066: {
      T: 1
    },
    1067: {
      T: -1
    },
    1068: {
      T: 1
    },
    1069: {
      T: -1
    },
    1070: {
      T: 1
    },
    1071: {
      T: -1
    },
    1072: {
      T: 1
    },
    1073: {
      T: -1
    },
    1075: {
      T: 1
    },
    1076: {
      T: -1
    },
    1077: {
      T: 1
    },
    1078: {
      T: -1
    },
    1079: {
      T: 1
    },
    1080: {
      T: -1
    },
    1081: {
      T: 1
    },
    1082: {
      T: -1
    },
    1083: {
      T: 1
    },
    1084: {
      T: -1
    },
    1085: {},
    1086: {
      T: 1
    },
    1087: {
      T: -1
    },
    1088: {
      T: 1
    },
    1089: {
      T: -1
    },
    1090: {
      T: 1
    },
    1091: {
      T: -1
    },
    1092: {
      T: 1
    },
    1093: {
      T: -1
    },
    1094: {
      T: 1
    },
    1095: {
      T: -1
    },
    1096: {},
    1097: {
      T: 1
    },
    1098: {},
    1099: {
      T: -1
    },
    1100: {
      T: 1
    },
    1101: {
      T: -1
    },
    1102: {},
    1103: {},
    1104: {},
    1105: {},
    1111: {},
    1112: {},
    1113: {
      T: 1
    },
    1114: {
      T: -1
    },
    1115: {
      T: 1
    },
    1116: {
      T: -1
    },
    1117: {},
    1118: {
      T: 1
    },
    1119: {
      T: -1
    },
    1120: {
      T: 1
    },
    1121: {
      T: -1
    },
    1122: {
      T: 1
    },
    1123: {
      T: -1
    },
    1124: {
      T: 1
    },
    1125: {
      T: -1
    },
    1126: {},
    1128: {
      T: 1
    },
    1129: {
      T: -1
    },
    1130: {},
    1131: {
      T: 1
    },
    1132: {
      T: -1
    },
    1133: {
      T: 1
    },
    1134: {
      T: -1
    },
    1135: {
      T: 1
    },
    1136: {
      T: -1
    },
    1137: {
      T: 1
    },
    1138: {
      T: -1
    },
    1139: {
      T: 1
    },
    1140: {
      T: -1
    },
    1141: {},
    1142: {
      T: 1
    },
    1143: {
      T: -1
    },
    1144: {
      T: 1
    },
    1145: {
      T: -1
    },
    1146: {},
    1147: {
      T: 1
    },
    1148: {
      T: -1
    },
    1149: {
      T: 1
    },
    1150: {
      T: -1
    },
    1152: {
      T: 1
    },
    1153: {
      T: -1
    },
    1154: {
      T: -1
    },
    1155: {
      T: -1
    },
    1156: {
      T: -1
    },
    1157: {
      T: 1
    },
    1158: {
      T: -1
    },
    1159: {
      T: 1
    },
    1160: {
      T: -1
    },
    1161: {
      T: 1
    },
    1162: {
      T: -1
    },
    1163: {
      T: 1
    },
    1164: {
      T: -1
    },
    1165: {
      T: 1
    },
    1166: {
      T: -1
    },
    1167: {
      T: 1
    },
    1168: {
      T: -1
    },
    1169: {
      T: 1
    },
    1170: {
      T: -1
    },
    1171: {},
    1172: {
      T: 1
    },
    1173: {
      T: -1
    },
    1177: {},
    1178: {
      T: 1
    },
    1180: {},
    1181: {},
    1182: {},
    2048: {
      T: 1
    },
    2049: {
      T: -1
    },
    2050: {},
    2051: {
      T: 1
    },
    2052: {
      T: -1
    },
    2053: {},
    2054: {},
    2055: {
      T: 1
    },
    2056: {
      T: -1
    },
    2057: {
      T: 1
    },
    2058: {
      T: -1
    },
    2060: {},
    2067: {},
    2068: {
      T: 1
    },
    2069: {
      T: -1
    },
    2070: {},
    2071: {},
    2072: {
      T: 1
    },
    2073: {
      T: -1
    },
    2075: {},
    2076: {},
    2077: {
      T: 1
    },
    2078: {
      T: -1
    },
    2079: {},
    2080: {
      T: 1
    },
    2081: {
      T: -1
    },
    2082: {},
    2083: {
      T: 1
    },
    2084: {
      T: -1
    },
    2085: {
      T: 1
    },
    2086: {
      T: -1
    },
    2087: {
      T: 1
    },
    2088: {
      T: -1
    },
    2089: {
      T: 1
    },
    2090: {
      T: -1
    },
    2091: {},
    2092: {},
    2093: {
      T: 1
    },
    2094: {
      T: -1
    },
    2095: {},
    2096: {
      T: 1
    },
    2097: {
      T: -1
    },
    2098: {
      T: 1
    },
    2099: {
      T: -1
    },
    2100: {
      T: 1
    },
    2101: {
      T: -1
    },
    2102: {},
    2103: {
      T: 1
    },
    2104: {
      T: -1
    },
    2105: {},
    2106: {
      T: 1
    },
    2107: {
      T: -1
    },
    2108: {},
    2109: {
      T: 1
    },
    2110: {
      T: -1
    },
    2111: {
      T: 1
    },
    2112: {
      T: -1
    },
    2113: {
      T: 1
    },
    2114: {
      T: -1
    },
    2115: {},
    2116: {},
    2117: {},
    2118: {
      T: 1
    },
    2119: {
      T: -1
    },
    2120: {},
    2121: {
      T: 1
    },
    2122: {
      T: -1
    },
    2123: {
      T: 1
    },
    2124: {
      T: -1
    },
    2125: {},
    2126: {
      T: 1
    },
    2127: {
      T: -1
    },
    2128: {},
    2129: {
      T: 1
    },
    2130: {
      T: -1
    },
    2131: {
      T: 1
    },
    2132: {
      T: -1
    },
    2133: {
      T: 1
    },
    2134: {},
    2135: {},
    2136: {},
    2137: {
      T: 1
    },
    2138: {
      T: -1
    },
    2139: {
      T: 1
    },
    2140: {
      T: -1
    },
    2141: {},
    3072: {},
    3073: {},
    4096: {
      T: 1
    },
    4097: {
      T: -1
    },
    5002: {
      T: 1
    },
    5003: {
      T: -1
    },
    5081: {
      T: 1
    },
    5082: {
      T: -1
    },
    5083: {},
    5084: {
      T: 1
    },
    5085: {
      T: -1
    },
    5086: {
      T: 1
    },
    5087: {
      T: -1
    },
    5088: {},
    5089: {},
    5090: {},
    5092: {
      T: 1
    },
    5093: {
      T: -1
    },
    5094: {},
    5095: {
      T: 1
    },
    5096: {
      T: -1
    },
    5097: {},
    5099: {},
    65535: {
      n: ""
    }
  },
  dw = {
    6: {
      f: jk
    },
    10: {
      f: hv
    },
    12: {
      f: yv
    },
    13: {
      f: yv
    },
    14: {
      f: vv
    },
    15: {
      f: vv
    },
    16: {
      f: Fh
    },
    17: {
      f: vv
    },
    18: {
      f: vv
    },
    19: {
      f: yv
    },
    20: {
      f: Hv
    },
    21: {
      f: Hv
    },
    23: {
      f: qv
    },
    24: {
      f: Wv
    },
    25: {
      f: vv
    },
    26: {},
    27: {},
    28: {
      f: function(t, e, n) {
        return function(t, e, n) {
          if (!(n.biff < 8)) {
            var o = t.read_shift(2),
              i = t.read_shift(2),
              a = t.read_shift(2),
              r = t.read_shift(2),
              s = Tv(t, 0, n);
            return n.biff < 8 && t.read_shift(1), [{
              r: o,
              c: i
            }, s, r, a]
          }
        }(t, 0, n)
      }
    },
    29: {},
    34: {
      f: vv
    },
    35: {
      f: Gv
    },
    38: {
      f: Fh
    },
    39: {
      f: Fh
    },
    40: {
      f: Fh
    },
    41: {
      f: Fh
    },
    42: {
      f: vv
    },
    43: {
      f: vv
    },
    47: {
      f: function(t, e, n) {
        var o = {
          Type: n.biff >= 8 ? t.read_shift(2) : 0
        };
        return o.Type ? Py(t, e - 2, o) : Ey(t, n.biff, n, o), o
      }
    },
    49: {
      f: function(t, e, n) {
        var o = {
          dyHeight: t.read_shift(2),
          fl: t.read_shift(2)
        };
        switch (n && n.biff || 8) {
          case 2:
            break;
          case 3:
          case 4:
            t.l += 2;
            break;
          default:
            t.l += 10
        }
        return o.name = xv(t, 0, n), o
      }
    },
    51: {
      f: yv
    },
    60: {},
    61: {
      f: function(t) {
        return {
          Pos: [t.read_shift(2), t.read_shift(2)],
          Dim: [t.read_shift(2), t.read_shift(2)],
          Flags: t.read_shift(2),
          CurTab: t.read_shift(2),
          FirstTab: t.read_shift(2),
          Selected: t.read_shift(2),
          TabRatio: t.read_shift(2)
        }
      }
    },
    64: {
      f: vv
    },
    65: {
      f: function() {}
    },
    66: {
      f: yv
    },
    77: {},
    80: {},
    81: {},
    82: {},
    85: {
      f: yv
    },
    89: {},
    90: {},
    91: {},
    92: {
      f: function(t, e, n) {
        if (n.enc) return t.l += e, "";
        var o = t.l,
          i = Tv(t, 0, n);
        return t.read_shift(e + o - t.l), i
      }
    },
    93: {
      f: function(t, e, n) {
        if (n && n.biff < 8) return function(t, e, n) {
          t.l += 4;
          var o = t.read_shift(2),
            i = t.read_shift(2),
            a = t.read_shift(2);
          t.l += 2, t.l += 2, t.l += 2, t.l += 2, t.l += 2, t.l += 2, t.l += 2, t.l += 2, t.l += 2, t.l += 6, e -=
            36;
          var r = [];
          return r.push((Xv[o] || th)(t, e, n)), {
            cmo: [i, o, a],
            ft: r
          }
        }(t, e, n);
        var o = Rv(t),
          i = function(t, e) {
            for (var n = t.l + e, o = []; t.l < n;) {
              var i = t.read_shift(2);
              t.l -= 2;
              try {
                o.push(Vv[i](t, n - t.l))
              } catch (aD) {
                return t.l = n, o
              }
            }
            return t.l != n && (t.l = n), o
          }(t, e - 22, o[1]);
        return {
          cmo: o,
          ft: i
        }
      }
    },
    94: {},
    95: {
      f: vv
    },
    96: {},
    97: {},
    99: {
      f: vv
    },
    125: {
      f: Jv
    },
    128: {
      f: function(t) {
        t.l += 4;
        var e = [t.read_shift(2), t.read_shift(2)];
        if (0 !== e[0] && e[0]--, 0 !== e[1] && e[1]--, e[0] > 7 || e[1] > 7) throw new Error("Bad Gutters: " + e
          .join("|"));
        return e
      }
    },
    129: {
      f: function(t, e, n) {
        var o = n && 8 == n.biff || 2 == e ? t.read_shift(2) : (t.l += e, 0);
        return {
          fDialog: 16 & o,
          fBelow: 64 & o,
          fRight: 128 & o
        }
      }
    },
    130: {
      f: yv
    },
    131: {
      f: vv
    },
    132: {
      f: vv
    },
    133: {
      f: function(t, e, n) {
        var o = t.read_shift(4),
          i = 3 & t.read_shift(1),
          a = t.read_shift(1);
        switch (a) {
          case 0:
            a = "Worksheet";
            break;
          case 1:
            a = "Macrosheet";
            break;
          case 2:
            a = "Chartsheet";
            break;
          case 6:
            a = "VBAModule"
        }
        var r = xv(t, 0, n);
        return 0 === r.length && (r = "Sheet1"), {
          pos: o,
          hs: i,
          dt: a,
          name: r
        }
      }
    },
    134: {},
    140: {
      f: function(t) {
        var e, n = [0, 0];
        return e = t.read_shift(2), n[0] = zh[e] || e, e = t.read_shift(2), n[1] = zh[e] || e, n
      }
    },
    141: {
      f: yv
    },
    144: {},
    146: {
      f: function(t) {
        for (var e = t.read_shift(2), n = []; e-- > 0;) n.push(Pv(t));
        return n
      }
    },
    151: {},
    152: {},
    153: {},
    154: {},
    155: {},
    156: {
      f: yv
    },
    157: {},
    158: {},
    160: {
      f: Qv
    },
    161: {
      f: function(t, e) {
        var n = {};
        return e < 32 || (t.l += 16, n.header = Fh(t), n.footer = Fh(t), t.l += 2), n
      }
    },
    174: {},
    175: {},
    176: {},
    177: {},
    178: {},
    180: {},
    181: {},
    182: {},
    184: {},
    185: {},
    189: {
      f: function(t, e) {
        for (var n = t.l + e - 2, o = t.read_shift(2), i = t.read_shift(2), a = []; t.l < n;) a.push(Lv(t));
        if (t.l !== n) throw new Error("MulRK read error");
        var r = t.read_shift(2);
        if (a.length != r - i + 1) throw new Error("MulRK length mismatch");
        return {
          r: o,
          c: i,
          C: r,
          rkrec: a
        }
      }
    },
    190: {
      f: function(t, e) {
        for (var n = t.l + e - 2, o = t.read_shift(2), i = t.read_shift(2), a = []; t.l < n;) a.push(t.read_shift(2));
        if (t.l !== n) throw new Error("MulBlank read error");
        var r = t.read_shift(2);
        if (a.length != r - i + 1) throw new Error("MulBlank length mismatch");
        return {
          r: o,
          c: i,
          C: r,
          ixfe: a
        }
      }
    },
    193: {
      f: hv
    },
    197: {},
    198: {},
    199: {},
    200: {},
    201: {},
    202: {
      f: vv
    },
    203: {},
    204: {},
    205: {},
    206: {},
    207: {},
    208: {},
    209: {},
    210: {},
    211: {},
    213: {},
    215: {},
    216: {},
    217: {},
    218: {
      f: yv
    },
    220: {},
    221: {
      f: vv
    },
    222: {},
    224: {
      f: function(t, e, n) {
        var o = {};
        return o.ifnt = t.read_shift(2), o.numFmtId = t.read_shift(2), o.flags = t.read_shift(2), o.fStyle = o
          .flags >> 2 & 1, o.data = function(t, e, n, o) {
            var i = {},
              a = t.read_shift(4),
              r = t.read_shift(4),
              s = t.read_shift(4),
              l = t.read_shift(2);
            return i.patternType = Uh[s >> 26], o.cellStyles ? (i.alc = 7 & a, i.fWrap = a >> 3 & 1, i.alcV = a >> 4 &
              7, i.fJustLast = a >> 7 & 1, i.trot = a >> 8 & 255, i.cIndent = a >> 16 & 15, i.fShrinkToFit = a >>
              20 & 1, i.iReadOrder = a >> 22 & 2, i.fAtrNum = a >> 26 & 1, i.fAtrFnt = a >> 27 & 1, i.fAtrAlc = a >>
              28 & 1, i.fAtrBdr = a >> 29 & 1, i.fAtrPat = a >> 30 & 1, i.fAtrProt = a >> 31 & 1, i.dgLeft = 15 & r,
              i.dgRight = r >> 4 & 15, i.dgTop = r >> 8 & 15, i.dgBottom = r >> 12 & 15, i.icvLeft = r >> 16 & 127,
              i.icvRight = r >> 23 & 127, i.grbitDiag = r >> 30 & 3, i.icvTop = 127 & s, i.icvBottom = s >> 7 & 127,
              i.icvDiag = s >> 14 & 127, i.dgDiag = s >> 21 & 15, i.icvFore = 127 & l, i.icvBack = l >> 7 & 127, i
              .fsxButton = l >> 14 & 1, i) : i
          }(t, 0, o.fStyle, n), o
      }
    },
    225: {
      f: function(t, e) {
        return 0 === e || t.read_shift(2), 1200
      }
    },
    226: {
      f: hv
    },
    227: {},
    229: {
      f: function(t, e) {
        for (var n = [], o = t.read_shift(2); o--;) n.push(_v(t));
        return n
      }
    },
    233: {},
    235: {},
    236: {},
    237: {},
    239: {},
    240: {},
    241: {},
    242: {},
    244: {},
    245: {},
    246: {},
    247: {},
    248: {},
    249: {},
    251: {},
    252: {
      f: function(t, e) {
        for (var n = t.l + e, o = t.read_shift(4), i = t.read_shift(4), a = [], r = 0; r != i && t.l < n; ++r) a.push(
          wv(t));
        return a.Count = o, a.Unique = i, a
      }
    },
    253: {
      f: function(t) {
        var e = Ov(t);
        return e.isst = t.read_shift(4), e
      }
    },
    255: {
      f: function(t, e) {
        var n = {};
        return n.dsst = t.read_shift(2), t.l += e - 2, n
      }
    },
    256: {},
    259: {},
    290: {},
    311: {},
    312: {},
    315: {},
    317: {
      f: kv
    },
    318: {},
    319: {},
    320: {},
    330: {},
    331: {},
    333: {},
    334: {},
    335: {},
    336: {},
    337: {},
    338: {},
    339: {},
    340: {},
    351: {},
    352: {
      f: vv
    },
    353: {
      f: hv
    },
    401: {},
    402: {},
    403: {},
    404: {},
    405: {},
    406: {},
    407: {},
    408: {},
    425: {},
    426: {},
    427: {},
    428: {},
    429: {},
    430: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = t.read_shift(2),
          a = t.read_shift(2);
        if (n.sbcch = a, 1025 == a || 14849 == a) return [a, i];
        if (a < 1 || a > 255) throw new Error("Unexpected SupBook type: " + a);
        for (var r = Cv(t, a), s = []; o > t.l;) s.push(Sv(t));
        return [a, i, r, s]
      }
    },
    431: {
      f: vv
    },
    432: {},
    433: {},
    434: {},
    437: {},
    438: {
      f: function(t, e, n) {
        var o = t.l,
          i = "";
        try {
          t.l += 4;
          var a = (n.lastobj || {
            cmo: [0, 0]
          }).cmo[1]; - 1 == [0, 5, 7, 11, 12, 14].indexOf(a) ? t.l += 6 : function(t) {
            var e = t.read_shift(1);
            t.l++;
            var n = t.read_shift(2);
            return t.l += 2, [e, n]
          }(t);
          var r = t.read_shift(2);
          t.read_shift(2), yv(t);
          var s = t.read_shift(2);
          t.l += s;
          for (var l = 1; l < t.lens.length - 1; ++l) {
            if (t.l - o != t.lens[l]) throw new Error("TxO: bad continue record");
            var c = t[t.l];
            if ((i += Cv(t, t.lens[l + 1] - t.lens[l] - 1)).length >= (c ? r : 2 * r)) break
          }
          if (i.length !== r && i.length !== 2 * r) throw new Error("cchText: " + r + " != " + i.length);
          return t.l = o + e, {
            t: i
          }
        } catch (aD) {
          return t.l = o + e, {
            t: i
          }
        }
      }
    },
    439: {
      f: vv
    },
    440: {
      f: function(t, e) {
        var n = _v(t);
        t.l += 16;
        var o = function(t, e) {
          var n = t.l + e,
            o = t.read_shift(4);
          if (2 !== o) throw new Error("Unrecognized streamVersion: " + o);
          var i = t.read_shift(2);
          t.l += 2;
          var a, r, s, l, c, d, u = "";
          16 & i && (a = Av(t, t.l)), 128 & i && (r = Av(t, t.l)), 257 & ~i || (s = Av(t, t.l)), 1 == (257 & i) && (
              l = Iv(t, t.l)), 8 & i && (u = Av(t, t.l)), 32 & i && (c = t.read_shift(16)), 64 & i && (d = rv(t)), t
            .l = n;
          var p = r || s || l || "";
          p && u && (p += "#" + u), p || (p = "#" + u), 2 & i && "/" == p.charAt(0) && "/" != p.charAt(1) && (p =
            "file://" + p);
          var b = {
            Target: p
          };
          return c && (b.guid = c), d && (b.time = d), a && (b.Tooltip = a), b
        }(t, e - 24);
        return [n, o]
      }
    },
    441: {},
    442: {
      f: Sv
    },
    443: {},
    444: {
      f: yv
    },
    445: {},
    446: {},
    448: {
      f: hv
    },
    449: {
      f: function(t) {
        return t.read_shift(2), t.read_shift(4)
      },
      r: 2
    },
    450: {
      f: hv
    },
    512: {
      f: Uv
    },
    513: {
      f: Zv
    },
    515: {
      f: function(t, e, n) {
        n.biffguess && 2 == n.biff && (n.biff = 5);
        var o = Ov(t),
          i = Fh(t);
        return o.val = i, o
      }
    },
    516: {
      f: function(t, e, n) {
        n.biffguess && 2 == n.biff && (n.biff = 5), t.l;
        var o = Ov(t);
        2 == n.biff && t.l++;
        var i = Sv(t, t.l, n);
        return o.val = i, o
      }
    },
    517: {
      f: jv
    },
    519: {
      f: ty
    },
    520: {
      f: function(t) {
        var e = {};
        e.r = t.read_shift(2), e.c = t.read_shift(2), e.cnt = t.read_shift(2) - e.c;
        var n = t.read_shift(2);
        t.l += 4;
        var o = t.read_shift(1);
        return t.l += 3, 7 & o && (e.level = 7 & o), 32 & o && (e.hidden = !0), 64 & o && (e.hpt = n / 20), e
      }
    },
    523: {},
    545: {
      f: Yv
    },
    549: {
      f: $v
    },
    566: {},
    574: {
      f: function(t, e, n) {
        return n && n.biff >= 2 && n.biff < 5 ? {} : {
          RTL: 64 & t.read_shift(2)
        }
      }
    },
    638: {
      f: function(t) {
        var e = t.read_shift(2),
          n = t.read_shift(2),
          o = Lv(t);
        return {
          r: e,
          c: n,
          ixfe: o[0],
          rknum: o[1]
        }
      }
    },
    659: {},
    1048: {},
    1054: {
      f: function(t, e, n) {
        return [t.read_shift(2), Tv(t, 0, n)]
      }
    },
    1084: {},
    1212: {
      f: function(t, e, n) {
        var o = Bv(t);
        t.l++;
        var i = t.read_shift(1);
        return [Uk(t, e -= 8, n), i, o]
      }
    },
    2048: {
      f: function(t, e) {
        t.read_shift(2);
        var n = _v(t),
          o = t.read_shift((e - 10) / 2, "dbcs-cont");
        return [n, o = o.replace(bm, "")]
      }
    },
    2049: {},
    2050: {},
    2051: {},
    2052: {},
    2053: {},
    2054: {},
    2055: {},
    2056: {},
    2057: {
      f: Nv
    },
    2058: {},
    2059: {},
    2060: {},
    2061: {},
    2062: {},
    2063: {},
    2064: {},
    2066: {},
    2067: {},
    2128: {},
    2129: {},
    2130: {},
    2131: {},
    2132: {},
    2133: {},
    2134: {},
    2135: {},
    2136: {},
    2137: {},
    2138: {},
    2146: {},
    2147: {
      r: 12
    },
    2148: {},
    2149: {},
    2150: {},
    2151: {
      f: hv
    },
    2152: {},
    2154: {},
    2155: {},
    2156: {},
    2161: {},
    2162: {},
    2164: {},
    2165: {},
    2166: {},
    2167: {},
    2168: {},
    2169: {},
    2170: {},
    2171: {},
    2172: {
      f: function(t) {
        t.l += 2;
        var e = {
          cxfs: 0,
          crc: 0
        };
        return e.cxfs = t.read_shift(2), e.crc = t.read_shift(4), e
      },
      r: 12
    },
    2173: {
      f: function(t, e) {
        t.l, t.l += 2;
        var n = t.read_shift(2);
        t.l += 2;
        for (var o = t.read_shift(2), i = []; o-- > 0;) i.push(ak(t, t.l));
        return {
          ixfe: n,
          ext: i
        }
      },
      r: 12
    },
    2174: {},
    2175: {},
    2180: {},
    2181: {},
    2182: {},
    2183: {},
    2184: {},
    2185: {},
    2186: {},
    2187: {},
    2188: {
      f: vv,
      r: 12
    },
    2189: {},
    2190: {
      r: 12
    },
    2191: {},
    2192: {},
    2194: {},
    2195: {},
    2196: {
      f: function(t, e, n) {
        if (!(n.biff < 8)) {
          var o = t.read_shift(2),
            i = t.read_shift(2);
          return [Cv(t, o, n), Cv(t, i, n)]
        }
        t.l += e
      },
      r: 12
    },
    2197: {},
    2198: {
      f: function(t, e, n) {
        var o = t.l + e;
        if (124226 !== t.read_shift(4))
          if (n.cellStyles) {
            var i, a = t.slice(t.l);
            t.l = o;
            try {
              i = Dg(a, {
                type: "array"
              })
            } catch (aD) {
              return
            }
            var r = Bg(i, "theme/theme/theme1.xml", !0);
            if (r) return ok(r, n)
          } else t.l = o
      },
      r: 12
    },
    2199: {},
    2200: {},
    2201: {},
    2202: {
      f: function(t) {
        return [0 !== t.read_shift(4), 0 !== t.read_shift(4), t.read_shift(4)]
      },
      r: 12
    },
    2203: {
      f: hv
    },
    2204: {},
    2205: {},
    2206: {},
    2207: {},
    2211: {
      f: function(t) {
        var e = function(t) {
          var e = t.read_shift(2),
            n = t.read_shift(2);
          return t.l += 8, {
            type: e,
            flags: n
          }
        }(t);
        if (2211 != e.type) throw new Error("Invalid Future Record " + e.type);
        return 0 !== t.read_shift(4)
      }
    },
    2212: {},
    2213: {},
    2214: {},
    2215: {},
    4097: {},
    4098: {},
    4099: {},
    4102: {},
    4103: {},
    4105: {},
    4106: {},
    4107: {},
    4108: {},
    4109: {},
    4116: {},
    4117: {},
    4118: {},
    4119: {},
    4120: {},
    4121: {},
    4122: {},
    4123: {},
    4124: {},
    4125: {},
    4126: {},
    4127: {},
    4128: {},
    4129: {},
    4130: {},
    4132: {},
    4133: {},
    4134: {
      f: yv
    },
    4135: {},
    4146: {},
    4147: {},
    4148: {},
    4149: {},
    4154: {},
    4156: {},
    4157: {},
    4158: {},
    4159: {},
    4160: {},
    4161: {},
    4163: {},
    4164: {
      f: function(t, e, n) {
        var o = {
          area: !1
        };
        if (5 != n.biff) return t.l += e, o;
        var i = t.read_shift(1);
        return t.l += 3, 16 & i && (o.area = !0), o
      }
    },
    4165: {},
    4166: {},
    4168: {},
    4170: {},
    4171: {},
    4174: {},
    4175: {},
    4176: {},
    4177: {},
    4187: {},
    4188: {
      f: function(t) {
        for (var e = t.read_shift(2), n = []; e-- > 0;) n.push(Pv(t));
        return n
      }
    },
    4189: {},
    4191: {},
    4192: {},
    4193: {},
    4194: {},
    4195: {},
    4196: {},
    4197: {},
    4198: {},
    4199: {},
    4200: {},
    0: {
      f: Uv
    },
    1: {},
    2: {
      f: function(t) {
        var e = Ov(t);
        ++t.l;
        var n = t.read_shift(2);
        return e.t = "n", e.val = n, e
      }
    },
    3: {
      f: function(t) {
        var e = Ov(t);
        ++t.l;
        var n = Fh(t);
        return e.t = "n", e.val = n, e
      }
    },
    4: {
      f: function(t, e, n) {
        n.biffguess && 5 == n.biff && (n.biff = 2);
        var o = Ov(t);
        ++t.l;
        var i = Tv(t, 0, n);
        return o.t = "str", o.val = i, o
      }
    },
    5: {
      f: jv
    },
    7: {
      f: function(t) {
        var e = t.read_shift(1);
        return 0 === e ? (t.l++, "") : t.read_shift(e, "sbcs-cont")
      }
    },
    8: {},
    9: {
      f: Nv
    },
    11: {},
    22: {
      f: yv
    },
    30: {
      f: zv
    },
    31: {},
    32: {},
    33: {
      f: Yv
    },
    36: {},
    37: {
      f: $v
    },
    50: {
      f: function(t, e) {
        t.l += 6, t.l += 2, t.l += 1, t.l += 3, t.l += 1, t.l += e - 13
      }
    },
    62: {},
    52: {},
    67: {},
    68: {
      f: yv
    },
    69: {},
    86: {},
    126: {},
    127: {
      f: function(t) {
        var e = t.read_shift(2),
          n = t.read_shift(2),
          o = t.read_shift(4),
          i = {
            fmt: e,
            env: n,
            len: o,
            data: t.slice(t.l, t.l + o)
          };
        return t.l += o, i
      }
    },
    135: {},
    136: {},
    137: {},
    145: {},
    148: {},
    149: {},
    150: {},
    169: {},
    171: {},
    188: {},
    191: {},
    192: {},
    194: {},
    195: {},
    214: {
      f: function(t, e, n) {
        var o = t.l + e,
          i = Ov(t),
          a = t.read_shift(2),
          r = Cv(t, a, n);
        return t.l = o, i.t = "str", i.val = r, i
      }
    },
    223: {},
    234: {},
    354: {},
    421: {},
    518: {
      f: jk
    },
    521: {
      f: Nv
    },
    536: {
      f: Wv
    },
    547: {
      f: Gv
    },
    561: {},
    579: {},
    1030: {
      f: jk
    },
    1033: {
      f: Nv
    },
    1091: {},
    2157: {},
    2163: {},
    2177: {},
    2240: {},
    2241: {},
    2242: {},
    2243: {},
    2244: {},
    2245: {},
    2246: {},
    2247: {},
    2248: {},
    2249: {},
    2250: {},
    2251: {},
    2262: {
      r: 12
    },
    29282: {}
  };

function uw(t, e, n, o) {
  var i = e;
  if (!isNaN(i)) {
    var a = (n || []).length || 0,
      r = t.next(4);
    r.write_shift(2, i), r.write_shift(2, a), a > 0 && $f(n) && t.push(n)
  }
}

function pw(t, e) {
  var n = e || {},
    o = n.dense ? [] : {},
    i = (t = t.replace(/<!--.*?-->/g, "")).match(/<table/i);
  if (!i) throw new Error("Invalid HTML: could not find <table>");
  var a = t.match(/<\/table/i),
    r = i.index,
    s = a && a.index || t.length,
    l = Eg(t.slice(r, s), /(:?<tr[^>]*>)/i, "<tr>"),
    c = -1,
    d = 0,
    u = 0,
    p = 0,
    b = {
      s: {
        r: 1e7,
        c: 1e7
      },
      e: {
        r: 0,
        c: 0
      }
    },
    m = [];
  for (r = 0; r < l.length; ++r) {
    var g = l[r].trim(),
      f = g.slice(0, 3).toLowerCase();
    if ("<tr" != f) {
      if ("<td" == f || "<th" == f) {
        var h = g.split(/<\/t[dh]>/i);
        for (s = 0; s < h.length; ++s) {
          var v = h[s].trim();
          if (v.match(/<t[dh]/i)) {
            for (var y = v, k = 0;
              "<" == y.charAt(0) && (k = y.indexOf(">")) > -1;) y = y.slice(k + 1);
            for (var x = 0; x < m.length; ++x) {
              var w = m[x];
              w.s.c == d && w.s.r < c && c <= w.e.r && (d = w.e.c + 1, x = -1)
            }
            var C = Gg(v.slice(0, v.indexOf(">")));
            p = C.colspan ? +C.colspan : 1, ((u = +C.rowspan) > 1 || p > 1) && m.push({
              s: {
                r: c,
                c: d
              },
              e: {
                r: c + (u || 1) - 1,
                c: d + p - 1
              }
            });
            var S = C.t || C["data-t"] || "";
            if (y.length)
              if (y = cf(y), b.s.r > c && (b.s.r = c), b.e.r < c && (b.e.r = c), b.s.c > d && (b.s.c = d), b.e.c < d &&
                (b.e.c = d), y.length) {
                var T = {
                  t: "s",
                  v: y
                };
                n.raw || !y.trim().length || "s" == S || ("TRUE" === y ? T = {
                  t: "b",
                  v: !0
                } : "FALSE" === y ? T = {
                  t: "b",
                  v: !1
                } : isNaN(Tg(y)) ? isNaN(Ag(y).getDate()) || (T = {
                  t: "d",
                  v: xg(y)
                }, n.cellDates || (T = {
                  t: "n",
                  v: pg(T.v)
                }), T.z = n.dateNF || Sm[14]) : T = {
                  t: "n",
                  v: Tg(y)
                }), n.dense ? (o[c] || (o[c] = []), o[c][d] = T) : o[bh({
                  r: c,
                  c: d
                })] = T, d += p
              } else d += p;
            else d += p
          }
        }
      }
    } else {
      if (++c, n.sheetRows && n.sheetRows <= c) {
        --c;
        break
      }
      d = 0
    }
  }
  return o["!ref"] = gh(b), m.length && (o["!merges"] = m), o
}

function bw(t, e, n, o) {
  for (var i = t["!merges"] || [], a = [], r = e.s.c; r <= e.e.c; ++r) {
    for (var s = 0, l = 0, c = 0; c < i.length; ++c)
      if (!(i[c].s.r > n || i[c].s.c > r || i[c].e.r < n || i[c].e.c < r)) {
        if (i[c].s.r < n || i[c].s.c < r) {
          s = -1;
          break
        }
        s = i[c].e.r - i[c].s.r + 1, l = i[c].e.c - i[c].s.c + 1;
        break
      } if (!(s < 0)) {
      var d = bh({
          r: n,
          c: r
        }),
        u = o.dense ? (t[n] || [])[r] : t[d],
        p = u && null != u.v && (u.h || Zg(u.w || (vh(u), u.w) || "")) || "",
        b = {};
      s > 1 && (b.rowspan = s), l > 1 && (b.colspan = l), o.editable ? p = '<span contenteditable="true">' + p +
        "</span>" : u && (b["data-t"] = u && u.t || "z", null != u.v && (b["data-v"] = u.v), null != u.z && (b[
          "data-z"] = u.z), u.l && "#" != (u.l.Target || "#").charAt(0) && (p = '<a href="' + u.l.Target + '">' + p +
          "</a>")), b.id = (o.id || "sjs") + "-" + d, a.push(gf("td", p, b))
    }
  }
  return "<tr>" + a.join("") + "</tr>"
}

function mw(t, e, n) {
  var o = n || {},
    i = 0,
    a = 0;
  if (null != o.origin)
    if ("number" == typeof o.origin) i = o.origin;
    else {
      var r = "string" == typeof o.origin ? ph(o.origin) : o.origin;
      i = r.r, a = r.c
    } var s = e.getElementsByTagName("tr"),
    l = Math.min(o.sheetRows || 1e7, s.length),
    c = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: i,
        c: a
      }
    };
  if (t["!ref"]) {
    var d = mh(t["!ref"]);
    c.s.r = Math.min(c.s.r, d.s.r), c.s.c = Math.min(c.s.c, d.s.c), c.e.r = Math.max(c.e.r, d.e.r), c.e.c = Math.max(c.e
      .c, d.e.c), -1 == i && (c.e.r = i = d.e.r + 1)
  }
  var u = [],
    p = 0,
    b = t["!rows"] || (t["!rows"] = []),
    m = 0,
    g = 0,
    f = 0,
    h = 0,
    v = 0,
    y = 0;
  for (t["!cols"] || (t["!cols"] = []); m < s.length && g < l; ++m) {
    var k = s[m];
    if (fw(k)) {
      if (o.display) continue;
      b[g] = {
        hidden: !0
      }
    }
    var x = k.children;
    for (f = h = 0; f < x.length; ++f) {
      var w = x[f];
      if (!o.display || !fw(w)) {
        var C = w.hasAttribute("data-v") ? w.getAttribute("data-v") : w.hasAttribute("v") ? w.getAttribute("v") : cf(w
            .innerHTML),
          S = w.getAttribute("data-z") || w.getAttribute("z");
        for (p = 0; p < u.length; ++p) {
          var T = u[p];
          T.s.c == h + a && T.s.r < g + i && g + i <= T.e.r && (h = T.e.c + 1 - a, p = -1)
        }
        y = +w.getAttribute("colspan") || 1, ((v = +w.getAttribute("rowspan") || 1) > 1 || y > 1) && u.push({
          s: {
            r: g + i,
            c: h + a
          },
          e: {
            r: g + i + (v || 1) - 1,
            c: h + a + (y || 1) - 1
          }
        });
        var I = {
            t: "s",
            v: C
          },
          A = w.getAttribute("data-t") || w.getAttribute("t") || "";
        null != C && (0 == C.length ? I.t = A || "z" : o.raw || 0 == C.trim().length || "s" == A || ("TRUE" === C ?
        I = {
          t: "b",
          v: !0
        } : "FALSE" === C ? I = {
          t: "b",
          v: !1
        } : isNaN(Tg(C)) ? isNaN(Ag(C).getDate()) || (I = {
          t: "d",
          v: xg(C)
        }, o.cellDates || (I = {
          t: "n",
          v: pg(I.v)
        }), I.z = o.dateNF || Sm[14]) : I = {
          t: "n",
          v: Tg(C)
        })), void 0 === I.z && null != S && (I.z = S);
        var E = "",
          P = w.getElementsByTagName("A");
        if (P && P.length)
          for (var O = 0; O < P.length && (!P[O].hasAttribute("href") || "#" == (E = P[O].getAttribute("href")).charAt(
              0)); ++O);
        E && "#" != E.charAt(0) && (I.l = {
          Target: E
        }), o.dense ? (t[g + i] || (t[g + i] = []), t[g + i][h + a] = I) : t[bh({
          c: h + a,
          r: g + i
        })] = I, c.e.c < h + a && (c.e.c = h + a), h += y
      }
    }++g
  }
  return u.length && (t["!merges"] = (t["!merges"] || []).concat(u)), c.e.r = Math.max(c.e.r, g - 1 + i), t["!ref"] =
    gh(c), g >= l && (t["!fullref"] = gh((c.e.r = s.length - m + g - 1 + i, c))), t
}

function gw(t, e) {
  return mw((e || {}).dense ? [] : {}, t, e)
}

function fw(t) {
  var e = "",
    n = function(t) {
      return t.ownerDocument.defaultView && "function" == typeof t.ownerDocument.defaultView.getComputedStyle ? t
        .ownerDocument.defaultView.getComputedStyle : "function" == typeof getComputedStyle ? getComputedStyle : null
    }(t);
  return n && (e = n(t).getPropertyValue("display")), e || (e = t.style && t.style.display), "none" === e
}

function hw(t) {
  var e = t.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(
    /<text:s text:c="(\d+)"\/>/g,
    function(t, e) {
      return Array(parseInt(e, 10) + 1).join(" ")
    }).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n");
  return [Yg(e.replace(/<[^>]*>/g, ""))]
}
var vw = {
  day: ["d", "dd"],
  month: ["m", "mm"],
  year: ["y", "yy"],
  hours: ["h", "hh"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  "am-pm": ["A/P", "AM/PM"],
  "day-of-week": ["ddd", "dddd"],
  era: ["e", "ee"],
  quarter: ["\\Qm", 'm\\"th quarter"']
};

function yw(t, e) {
  var n, o, i, a, r, s, l = e || {},
    c = ff(t),
    d = [],
    u = {
      name: ""
    },
    p = "",
    b = 0,
    m = {},
    g = [],
    f = l.dense ? [] : {},
    h = {
      value: ""
    },
    v = "",
    y = 0,
    k = [],
    x = -1,
    w = -1,
    C = {
      s: {
        r: 1e6,
        c: 1e7
      },
      e: {
        r: 0,
        c: 0
      }
    },
    S = 0,
    T = {},
    I = [],
    A = {},
    E = [],
    P = 1,
    O = 1,
    M = [],
    L = {
      Names: []
    },
    _ = {},
    B = ["", ""],
    F = [],
    R = {},
    D = "",
    V = 0,
    N = !1,
    $ = !1,
    z = 0;
  for (hf.lastIndex = 0, c = c.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); r = hf
    .exec(c);) switch (r[3] = r[3].replace(/_.*$/, "")) {
    case "table":
    case "\u5de5\u4f5c\u8868":
      "/" === r[1] ? (C.e.c >= C.s.c && C.e.r >= C.s.r ? f["!ref"] = gh(C) : f["!ref"] = "A1:A1", l.sheetRows > 0 && l
        .sheetRows <= C.e.r && (f["!fullref"] = f["!ref"], C.e.r = l.sheetRows - 1, f["!ref"] = gh(C)), I.length &&
        (f["!merges"] = I), E.length && (f["!rows"] = E), i.name = i["\u540d\u79f0"] || i.name, "undefined" !=
        typeof JSON && JSON.stringify(i), g.push(i.name), m[i.name] = f, $ = !1) : "/" !== r[0].charAt(r[0].length -
        2) && (i = Gg(r[0], !1), x = w = -1, C.s.r = C.s.c = 1e7, C.e.r = C.e.c = 0, f = l.dense ? [] : {}, I = [],
        E = [], $ = !0);
      break;
    case "table-row-group":
      "/" === r[1] ? --S : ++S;
      break;
    case "table-row":
    case "\u884c":
      if ("/" === r[1]) {
        x += P, P = 1;
        break
      }
      if ((a = Gg(r[0], !1))["\u884c\u53f7"] ? x = a["\u884c\u53f7"] - 1 : -1 == x && (x = 0), (P = +a[
          "number-rows-repeated"] || 1) < 10)
        for (z = 0; z < P; ++z) S > 0 && (E[x + z] = {
          level: S
        });
      w = -1;
      break;
    case "covered-table-cell":
      "/" !== r[1] && ++w, l.sheetStubs && (l.dense ? (f[x] || (f[x] = []), f[x][w] = {
        t: "z"
      }) : f[bh({
        r: x,
        c: w
      })] = {
        t: "z"
      }), v = "", k = [];
      break;
    case "table-cell":
    case "\u6570\u636e":
      if ("/" === r[0].charAt(r[0].length - 2)) ++w, h = Gg(r[0], !1), O = parseInt(h["number-columns-repeated"] ||
        "1", 10), s = {
        t: "z",
        v: null
      }, h.formula && 0 != l.cellFormula && (s.f = Zk(Yg(h.formula))), "string" == (h["\u6570\u636e\u7c7b\u578b"] ||
        h["value-type"]) && (s.t = "s", s.v = Yg(h["string-value"] || ""), l.dense ? (f[x] || (f[x] = []), f[x][w] =
        s) : f[bh({
        r: x,
        c: w
      })] = s), w += O - 1;
      else if ("/" !== r[1]) {
        v = "", y = 0, k = [], O = 1;
        var U = P ? x + P - 1 : x;
        if (++w > C.e.c && (C.e.c = w), w < C.s.c && (C.s.c = w), x < C.s.r && (C.s.r = x), U > C.e.r && (C.e.r = U),
          F = [], R = {}, s = {
            t: (h = Gg(r[0], !1))["\u6570\u636e\u7c7b\u578b"] || h["value-type"],
            v: null
          }, l.cellFormula)
          if (h.formula && (h.formula = Yg(h.formula)), h["number-matrix-columns-spanned"] && h[
              "number-matrix-rows-spanned"] && (A = {
              s: {
                r: x,
                c: w
              },
              e: {
                r: x + (parseInt(h["number-matrix-rows-spanned"], 10) || 0) - 1,
                c: w + (parseInt(h["number-matrix-columns-spanned"], 10) || 0) - 1
              }
            }, s.F = gh(A), M.push([A, s.F])), h.formula) s.f = Zk(h.formula);
          else
            for (z = 0; z < M.length; ++z) x >= M[z][0].s.r && x <= M[z][0].e.r && w >= M[z][0].s.c && w <= M[z][0].e
              .c && (s.F = M[z][1]);
        switch ((h["number-columns-spanned"] || h["number-rows-spanned"]) && (A = {
            s: {
              r: x,
              c: w
            },
            e: {
              r: x + (parseInt(h["number-rows-spanned"], 10) || 0) - 1,
              c: w + (parseInt(h["number-columns-spanned"], 10) || 0) - 1
            }
          }, I.push(A)), h["number-columns-repeated"] && (O = parseInt(h["number-columns-repeated"], 10)), s.t) {
          case "boolean":
            s.t = "b", s.v = tf(h["boolean-value"]);
            break;
          case "float":
          case "percentage":
          case "currency":
            s.t = "n", s.v = parseFloat(h.value);
            break;
          case "date":
            s.t = "d", s.v = xg(h["date-value"]), l.cellDates || (s.t = "n", s.v = pg(s.v)), s.z = "m/d/yy";
            break;
          case "time":
            s.t = "n", s.v = hg(h["time-value"]) / 86400, l.cellDates && (s.t = "d", s.v = fg(s.v)), s.z = "HH:MM:SS";
            break;
          case "number":
            s.t = "n", s.v = parseFloat(h["\u6570\u636e\u6570\u503c"]);
            break;
          default:
            if ("string" !== s.t && "text" !== s.t && s.t) throw new Error("Unsupported value type " + s.t);
            s.t = "s", null != h["string-value"] && (v = Yg(h["string-value"]), k = [])
        }
      } else {
        if (N = !1, "s" === s.t && (s.v = v || "", k.length && (s.R = k), N = 0 == y), _.Target && (s.l = _), F
          .length > 0 && (s.c = F, F = []), v && !1 !== l.cellText && (s.w = v), N && (s.t = "z", delete s.v), (!N ||
            l.sheetStubs) && !(l.sheetRows && l.sheetRows <= x))
          for (var j = 0; j < P; ++j) {
            if (O = parseInt(h["number-columns-repeated"] || "1", 10), l.dense)
              for (f[x + j] || (f[x + j] = []), f[x + j][w] = 0 == j ? s : Cg(s); --O > 0;) f[x + j][w + O] = Cg(s);
            else
              for (f[bh({
                  r: x + j,
                  c: w
                })] = s; --O > 0;) f[bh({
                r: x + j,
                c: w + O
              })] = Cg(s);
            C.e.c <= w && (C.e.c = w)
          }
        w += (O = parseInt(h["number-columns-repeated"] || "1", 10)) - 1, O = 0, s = {}, v = "", k = []
      }
      _ = {};
      break;
    case "document":
    case "document-content":
    case "\u7535\u5b50\u8868\u683c\u6587\u6863":
    case "spreadsheet":
    case "\u4e3b\u4f53":
    case "scripts":
    case "styles":
    case "font-face-decls":
    case "master-styles":
      if ("/" === r[1]) {
        if ((n = d.pop())[0] !== r[3]) throw "Bad state: " + n
      } else "/" !== r[0].charAt(r[0].length - 2) && d.push([r[3], !0]);
      break;
    case "annotation":
      if ("/" === r[1]) {
        if ((n = d.pop())[0] !== r[3]) throw "Bad state: " + n;
        R.t = v, k.length && (R.R = k), R.a = D, F.push(R)
      } else "/" !== r[0].charAt(r[0].length - 2) && d.push([r[3], !1]);
      D = "", V = 0, v = "", y = 0, k = [];
      break;
    case "creator":
      "/" === r[1] ? D = c.slice(V, r.index) : V = r.index + r[0].length;
      break;
    case "meta":
    case "\u5143\u6570\u636e":
    case "settings":
    case "config-item-set":
    case "config-item-map-indexed":
    case "config-item-map-entry":
    case "config-item-map-named":
    case "shapes":
    case "frame":
    case "text-box":
    case "image":
    case "data-pilot-tables":
    case "list-style":
    case "form":
    case "dde-links":
    case "event-listeners":
    case "chart":
      if ("/" === r[1]) {
        if ((n = d.pop())[0] !== r[3]) throw "Bad state: " + n
      } else "/" !== r[0].charAt(r[0].length - 2) && d.push([r[3], !1]);
      v = "", y = 0, k = [];
      break;
    case "scientific-number":
    case "currency-symbol":
    case "currency-style":
    case "script":
    case "libraries":
    case "automatic-styles":
    case "default-style":
    case "page-layout":
    case "style":
    case "map":
    case "font-face":
    case "paragraph-properties":
    case "table-properties":
    case "table-column-properties":
    case "table-row-properties":
    case "table-cell-properties":
    case "fraction":
    case "boolean-style":
    case "boolean":
    case "text-style":
    case "text-content":
    case "text-properties":
    case "embedded-text":
    case "body":
    case "\u7535\u5b50\u8868\u683c":
    case "forms":
    case "table-column":
    case "table-header-rows":
    case "table-rows":
    case "table-column-group":
    case "table-header-columns":
    case "table-columns":
    case "null-date":
    case "graphic-properties":
    case "calculation-settings":
    case "named-expressions":
    case "label-range":
    case "label-ranges":
    case "named-expression":
    case "sort":
    case "sort-by":
    case "sort-groups":
    case "tab":
    case "line-break":
    case "span":
    case "s":
    case "date":
    case "object":
    case "title":
    case "\u6807\u9898":
    case "desc":
    case "binary-data":
    case "table-source":
    case "scenario":
    case "iteration":
    case "content-validations":
    case "content-validation":
    case "help-message":
    case "error-message":
    case "database-ranges":
    case "filter":
    case "filter-and":
    case "filter-or":
    case "filter-condition":
    case "list-level-style-bullet":
    case "list-level-style-number":
    case "list-level-properties":
    case "sender-firstname":
    case "sender-lastname":
    case "sender-initials":
    case "sender-title":
    case "sender-position":
    case "sender-email":
    case "sender-phone-private":
    case "sender-fax":
    case "sender-company":
    case "sender-phone-work":
    case "sender-street":
    case "sender-city":
    case "sender-postal-code":
    case "sender-country":
    case "sender-state-or-province":
    case "author-name":
    case "author-initials":
    case "chapter":
    case "file-name":
    case "template-name":
    case "sheet-name":
    case "event-listener":
    case "initial-creator":
    case "creation-date":
    case "print-date":
    case "generator":
    case "document-statistic":
    case "user-defined":
    case "editing-duration":
    case "editing-cycles":
    case "config-item":
    case "page-number":
    case "page-count":
    case "time":
    case "cell-range-source":
    case "detective":
    case "operation":
    case "highlighted-range":
    case "data-pilot-table":
    case "source-cell-range":
    case "source-service":
    case "data-pilot-field":
    case "data-pilot-level":
    case "data-pilot-subtotals":
    case "data-pilot-subtotal":
    case "data-pilot-members":
    case "data-pilot-member":
    case "data-pilot-display-info":
    case "data-pilot-sort-info":
    case "data-pilot-layout-info":
    case "data-pilot-field-reference":
    case "data-pilot-groups":
    case "data-pilot-group":
    case "data-pilot-group-member":
    case "rect":
    case "dde-connection-decls":
    case "dde-connection-decl":
    case "dde-link":
    case "dde-source":
    case "properties":
    case "property":
    case "table-protection":
    case "data-pilot-grand-total":
    case "office-document-common-attrs":
      break;
    case "number-style":
    case "percentage-style":
    case "date-style":
    case "time-style":
      if ("/" === r[1]) {
        if (T[u.name] = p, (n = d.pop())[0] !== r[3]) throw "Bad state: " + n
      } else "/" !== r[0].charAt(r[0].length - 2) && (p = "", u = Gg(r[0], !1), d.push([r[3], !0]));
      break;
    case "number":
    case "day":
    case "month":
    case "year":
    case "era":
    case "day-of-week":
    case "week-of-year":
    case "quarter":
    case "hours":
    case "minutes":
    case "seconds":
    case "am-pm":
      switch (d[d.length - 1][0]) {
        case "time-style":
        case "date-style":
          o = Gg(r[0], !1), p += vw[r[3]]["long" === o.style ? 1 : 0]
      }
      break;
    case "text":
      if ("/>" === r[0].slice(-2)) break;
      if ("/" === r[1]) switch (d[d.length - 1][0]) {
        case "number-style":
        case "date-style":
        case "time-style":
          p += c.slice(b, r.index)
      } else b = r.index + r[0].length;
      break;
    case "named-range":
      B = Qk((o = Gg(r[0], !1))["cell-range-address"]);
      var H = {
        Name: o.name,
        Ref: B[0] + "!" + B[1]
      };
      $ && (H.Sheet = g.length), L.Names.push(H);
      break;
    case "p":
    case "\u6587\u672c\u4e32":
      if (["master-styles"].indexOf(d[d.length - 1][0]) > -1) break;
      if ("/" !== r[1] || h && h["string-value"]) Gg(r[0], !1), y = r.index + r[0].length;
      else {
        var G = hw(c.slice(y, r.index));
        v = (v.length > 0 ? v + "\n" : "") + G[0]
      }
      break;
    case "database-range":
      if ("/" === r[1]) break;
      try {
        m[(B = Qk(Gg(r[0])["target-range-address"]))[0]]["!autofilter"] = {
          ref: B[1]
        }
      } catch (aD) {}
      break;
    case "a":
      if ("/" !== r[1]) {
        if (!(_ = Gg(r[0], !1)).href) break;
        _.Target = Yg(_.href), delete _.href, "#" == _.Target.charAt(0) && _.Target.indexOf(".") > -1 ? (B = Qk(_
          .Target.slice(1)), _.Target = "#" + B[0] + "!" + B[1]) : _.Target.match(/^\.\.[\\\/]/) && (_.Target = _
          .Target.slice(3))
      }
      break;
    default:
      switch (r[2]) {
        case "dc:":
        case "calcext:":
        case "loext:":
        case "ooo:":
        case "chartooo:":
        case "draw:":
        case "style:":
        case "chart:":
        case "form:":
        case "uof:":
        case "\u8868:":
        case "\u5b57:":
          break;
        default:
          if (l.WTF) throw new Error(r)
      }
  }
  var K = {
    Sheets: m,
    SheetNames: g,
    Workbook: L
  };
  return l.bookSheets && delete K.Sheets, K
}

function kw(t, e) {
  e = e || {}, Mg(t, "META-INF/manifest.xml") && function(t, e) {
    for (var n, o, i = ff(t); n = hf.exec(i);) switch (n[3]) {
      case "manifest":
        break;
      case "file-entry":
        if ("/" == (o = Gg(n[0], !1)).path && "application/vnd.oasis.opendocument.spreadsheet" !== o.type)
        throw new Error("This OpenDocument is not a spreadsheet");
        break;
      case "encryption-data":
      case "algorithm":
      case "start-key-generation":
      case "key-derivation":
        throw new Error("Unsupported ODS Encryption");
      default:
        if (e && e.WTF) throw n
    }
  }(_g(t, "META-INF/manifest.xml"), e);
  var n = Bg(t, "content.xml");
  if (!n) throw new Error("Missing content.xml in ODS / UOF file");
  var o = yw(rf(n), e);
  return Mg(t, "meta.xml") && (o.Props = Qh(_g(t, "meta.xml"))), o
}

function xw(t, e) {
  return yw(t, e)
}

function ww(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength)
}

function Cw(t) {
  return "undefined" != typeof TextDecoder ? (new TextDecoder).decode(t) : rf(dm(t))
}

function Sw(t) {
  var e = t.reduce(function(t, e) {
      return t + e.length
    }, 0),
    n = new Uint8Array(e),
    o = 0;
  return t.forEach(function(t) {
    n.set(t, o), o += t.length
  }), n
}

function Tw(t) {
  return 16843009 * ((t = (858993459 & (t -= t >> 1 & 1431655765)) + (t >> 2 & 858993459)) + (t >> 4) & 252645135) >>>
    24
}

function Iw(t, e) {
  var n = e ? e[0] : 0,
    o = 127 & t[n];
  t: if (t[n++] >= 128) {
    if (o |= (127 & t[n]) << 7, t[n++] < 128) break t;
    if (o |= (127 & t[n]) << 14, t[n++] < 128) break t;
    if (o |= (127 & t[n]) << 21, t[n++] < 128) break t;
    if (o += (127 & t[n]) * Math.pow(2, 28), ++n, t[n++] < 128) break t;
    if (o += (127 & t[n]) * Math.pow(2, 35), ++n, t[n++] < 128) break t;
    if (o += (127 & t[n]) * Math.pow(2, 42), ++n, t[n++] < 128) break t
  }
  return e && (e[0] = n), o
}

function Aw(t) {
  var e = 0,
    n = 127 & t[e];
  t: if (t[e++] >= 128) {
    if (n |= (127 & t[e]) << 7, t[e++] < 128) break t;
    if (n |= (127 & t[e]) << 14, t[e++] < 128) break t;
    if (n |= (127 & t[e]) << 21, t[e++] < 128) break t;
    n |= (127 & t[e]) << 28
  }
  return n
}

function Ew(t) {
  for (var e = [], n = [0]; n[0] < t.length;) {
    var o, i = n[0],
      a = Iw(t, n),
      r = 7 & a,
      s = 0;
    if (0 == (a = Math.floor(a / 8))) break;
    switch (r) {
      case 0:
        for (var l = n[0]; t[n[0]++] >= 128;);
        o = t.slice(l, n[0]);
        break;
      case 5:
        s = 4, o = t.slice(n[0], n[0] + s), n[0] += s;
        break;
      case 1:
        s = 8, o = t.slice(n[0], n[0] + s), n[0] += s;
        break;
      case 2:
        s = Iw(t, n), o = t.slice(n[0], n[0] + s), n[0] += s;
        break;
      default:
        throw new Error("PB Type ".concat(r, " for Field ").concat(a, " at offset ").concat(i))
    }
    var c = {
      data: o,
      type: r
    };
    null == e[a] ? e[a] = [c] : e[a].push(c)
  }
  return e
}

function Pw(t, e) {
  return (null == t ? void 0 : t.map(function(t) {
    return e(t.data)
  })) || []
}

function Ow(t, e) {
  if (0 != t) throw new Error("Unexpected Snappy chunk type ".concat(t));
  for (var n = [0], o = Iw(e, n), i = []; n[0] < e.length;) {
    var a = 3 & e[n[0]];
    if (0 != a) {
      var r = 0,
        s = 0;
      if (1 == a ? (s = 4 + (e[n[0]] >> 2 & 7), r = (224 & e[n[0]++]) << 3, r |= e[n[0]++]) : (s = 1 + (e[n[0]++] >> 2),
          2 == a ? (r = e[n[0]] | e[n[0] + 1] << 8, n[0] += 2) : (r = (e[n[0]] | e[n[0] + 1] << 8 | e[n[0] + 2] << 16 |
            e[n[0] + 3] << 24) >>> 0, n[0] += 4)), i = [Sw(i)], 0 == r) throw new Error("Invalid offset 0");
      if (r > i[0].length) throw new Error("Invalid offset beyond length");
      if (s >= r)
        for (i.push(i[0].slice(-r)), s -= r; s >= i[i.length - 1].length;) i.push(i[i.length - 1]), s -= i[i.length - 1]
          .length;
      i.push(i[0].slice(-r, -r + s))
    } else {
      var l = e[n[0]++] >> 2;
      if (l < 60) ++l;
      else {
        var c = l - 59;
        l = e[n[0]], c > 1 && (l |= e[n[0] + 1] << 8), c > 2 && (l |= e[n[0] + 2] << 16), c > 3 && (l |= e[n[0] + 3] <<
          24), l >>>= 0, l++, n[0] += c
      }
      i.push(e.slice(n[0], n[0] + l)), n[0] += l
    }
  }
  var d = Sw(i);
  if (d.length != o) throw new Error("Unexpected length: ".concat(d.length, " != ").concat(o));
  return d
}

function Mw(t, e, n) {
  var o, i = ww(t),
    a = i.getUint32(8, !0),
    r = 12,
    s = -1,
    l = -1,
    c = NaN,
    d = NaN,
    u = new Date(2001, 0, 1);
  switch (1 & a && (c = function(t, e) {
      for (var n = (127 & t[e + 15]) << 7 | t[e + 14] >> 1, o = 1 & t[e + 14], i = e + 13; i >= e; --i) o = 256 * o +
        t[i];
      return (128 & t[e + 15] ? -o : o) * Math.pow(10, n - 6176)
    }(t, r), r += 16), 2 & a && (d = i.getFloat64(r, !0), r += 8), 4 & a && (u.setTime(u.getTime() + 1e3 * i.getFloat64(
      r, !0)), r += 8), 8 & a && (l = i.getUint32(r, !0), r += 4), 16 & a && (s = i.getUint32(r, !0), r += 4), t[1]) {
    case 0:
      break;
    case 2:
    case 10:
      o = {
        t: "n",
        v: c
      };
      break;
    case 3:
      o = {
        t: "s",
        v: e[l]
      };
      break;
    case 5:
      o = {
        t: "d",
        v: u
      };
      break;
    case 6:
      o = {
        t: "b",
        v: d > 0
      };
      break;
    case 7:
      o = {
        t: "n",
        v: d / 86400
      };
      break;
    case 8:
      o = {
        t: "e",
        v: 0
      };
      break;
    case 9:
      if (!(s > -1)) throw new Error("Unsupported cell type ".concat(t[1], " : ").concat(31 & a, " : ").concat(t.slice(
        0, 4)));
      o = {
        t: "s",
        v: n[s]
      };
      break;
    default:
      throw new Error("Unsupported cell type ".concat(t[1], " : ").concat(31 & a, " : ").concat(t.slice(0, 4)))
  }
  return o
}

function Lw(t, e, n) {
  switch (t[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
      return function(t, e, n, o) {
        var i, a = ww(t),
          r = a.getUint32(4, !0),
          s = (o > 1 ? 12 : 8) + 4 * Tw(r & (o > 1 ? 3470 : 398)),
          l = -1,
          c = -1,
          d = NaN,
          u = new Date(2001, 0, 1);
        switch (512 & r && (l = a.getUint32(s, !0), s += 4), s += 4 * Tw(r & (o > 1 ? 12288 : 4096)), 16 & r && (c = a
            .getUint32(s, !0), s += 4), 32 & r && (d = a.getFloat64(s, !0), s += 8), 64 & r && (u.setTime(u
          .getTime() + 1e3 * a.getFloat64(s, !0)), s += 8), t[2]) {
          case 0:
            break;
          case 2:
            i = {
              t: "n",
              v: d
            };
            break;
          case 3:
            i = {
              t: "s",
              v: e[c]
            };
            break;
          case 5:
            i = {
              t: "d",
              v: u
            };
            break;
          case 6:
            i = {
              t: "b",
              v: d > 0
            };
            break;
          case 7:
            i = {
              t: "n",
              v: d / 86400
            };
            break;
          case 8:
            i = {
              t: "e",
              v: 0
            };
            break;
          case 9:
            if (l > -1) i = {
              t: "s",
              v: n[l]
            };
            else if (c > -1) i = {
              t: "s",
              v: e[c]
            };
            else {
              if (isNaN(d)) throw new Error("Unsupported cell type ".concat(t.slice(0, 4)));
              i = {
                t: "n",
                v: d
              }
            }
            break;
          default:
            throw new Error("Unsupported cell type ".concat(t.slice(0, 4)))
        }
        return i
      }(t, e, n, t[0]);
    case 5:
      return Mw(t, e, n);
    default:
      throw new Error("Unsupported payload version ".concat(t[0]))
  }
}

function _w(t) {
  return Iw(Ew(t)[1][0].data)
}

function Bw(t, e) {
  var n = Ew(e.data),
    o = Aw(n[1][0].data),
    i = n[3],
    a = [];
  return (i || []).forEach(function(e) {
    var n = Ew(e.data),
      i = Aw(n[1][0].data) >>> 0;
    switch (o) {
      case 1:
        a[i] = Cw(n[3][0].data);
        break;
      case 8:
        var r = Ew(t[_w(n[9][0].data)][0].data),
          s = t[_w(r[1][0].data)][0],
          l = Aw(s.meta[1][0].data);
        if (2001 != l) throw new Error("2000 unexpected reference to ".concat(l));
        var c = Ew(s.data);
        a[i] = c[3].map(function(t) {
          return Cw(t.data)
        }).join("")
    }
  }), a
}

function Fw(t, e) {
  var n, o = Ew(e.data),
    i = (null == (n = null == o ? void 0 : o[7]) ? void 0 : n[0]) ? Aw(o[7][0].data) >>> 0 > 0 ? 1 : 0 : -1,
    a = Pw(o[5], function(t) {
      return function(t, e) {
        var n, o, i, a, r, s, l, c, d, u, p, b, m, g, f, h, v = Ew(t),
          y = Aw(v[1][0].data) >>> 0,
          k = Aw(v[2][0].data) >>> 0,
          x = (null == (o = null == (n = v[8]) ? void 0 : n[0]) ? void 0 : o.data) && Aw(v[8][0].data) > 0 || !1;
        if ((null == (a = null == (i = v[7]) ? void 0 : i[0]) ? void 0 : a.data) && 0 != e) f = null == (s = null ==
            (r = v[7]) ? void 0 : r[0]) ? void 0 : s.data, h = null == (c = null == (l = v[6]) ? void 0 : l[0]) ?
          void 0 : c.data;
        else {
          if (!(null == (u = null == (d = v[4]) ? void 0 : d[0]) ? void 0 : u.data) || 1 == e)
          throw "NUMBERS Tile missing ".concat(e, " cell storage");
          f = null == (b = null == (p = v[4]) ? void 0 : p[0]) ? void 0 : b.data, h = null == (g = null == (m = v[
            3]) ? void 0 : m[0]) ? void 0 : g.data
        }
        for (var w = x ? 4 : 1, C = ww(f), S = [], T = 0; T < f.length / 2; ++T) {
          var I = C.getUint16(2 * T, !0);
          I < 65535 && S.push([T, I])
        }
        if (S.length != k) throw "Expected ".concat(k, " cells, found ").concat(S.length);
        var A = [];
        for (T = 0; T < S.length - 1; ++T) A[S[T][0]] = h.subarray(S[T][1] * w, S[T + 1][1] * w);
        return S.length >= 1 && (A[S[S.length - 1][0]] = h.subarray(S[S.length - 1][1] * w)), {
          R: y,
          cells: A
        }
      }(t, i)
    });
  return {
    nrows: Aw(o[4][0].data) >>> 0,
    data: a.reduce(function(t, e) {
      return t[e.R] || (t[e.R] = []), e.cells.forEach(function(n, o) {
        if (t[e.R][o]) throw new Error("Duplicate cell r=".concat(e.R, " c=").concat(o));
        t[e.R][o] = n
      }), t
    }, [])
  }
}

function Rw(t, e) {
  var n = {
      "!ref": "A1"
    },
    o = t[_w(Ew(e.data)[2][0].data)],
    i = Aw(o[0].meta[1][0].data);
  if (6001 != i) throw new Error("6000 unexpected reference to ".concat(i));
  return function(t, e, n) {
    var o, i = Ew(e.data),
      a = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: 0
        }
      };
    if (a.e.r = (Aw(i[6][0].data) >>> 0) - 1, a.e.r < 0) throw new Error("Invalid row varint ".concat(i[6][0].data));
    if (a.e.c = (Aw(i[7][0].data) >>> 0) - 1, a.e.c < 0) throw new Error("Invalid col varint ".concat(i[7][0].data));
    n["!ref"] = gh(a);
    var r = Ew(i[4][0].data),
      s = Bw(t, t[_w(r[4][0].data)][0]),
      l = (null == (o = r[17]) ? void 0 : o[0]) ? Bw(t, t[_w(r[17][0].data)][0]) : [],
      c = Ew(r[3][0].data),
      d = 0;
    c[1].forEach(function(e) {
      var o = Ew(e.data),
        i = t[_w(o[2][0].data)][0],
        a = Aw(i.meta[1][0].data);
      if (6002 != a) throw new Error("6001 unexpected reference to ".concat(a));
      var r = Fw(0, i);
      r.data.forEach(function(t, e) {
        t.forEach(function(t, o) {
          var i = bh({
              r: d + e,
              c: o
            }),
            a = Lw(t, s, l);
          a && (n[i] = a)
        })
      }), d += r.nrows
    })
  }(t, o[0], n), n
}

function Dw(t, e) {
  var n = {
    SheetNames: [],
    Sheets: {}
  };
  if (Pw(Ew(e.data)[1], _w).forEach(function(e) {
      t[e].forEach(function(e) {
        if (2 == Aw(e.meta[1][0].data)) {
          var o = function(t, e) {
            var n, o = Ew(e.data),
              i = {
                name: (null == (n = o[1]) ? void 0 : n[0]) ? Cw(o[1][0].data) : "",
                sheets: []
              };
            return Pw(o[2], _w).forEach(function(e) {
              t[e].forEach(function(e) {
                6e3 == Aw(e.meta[1][0].data) && i.sheets.push(Rw(t, e))
              })
            }), i
          }(t, e);
          o.sheets.forEach(function(t, e) {
            nC(n, t, 0 == e ? o.name : o.name + "_" + e, !0)
          })
        }
      })
    }), 0 == n.SheetNames.length) throw new Error("Empty NUMBERS file");
  return n
}

function Vw(t) {
  var e, n, o, i, a = {},
    r = [];
  if (t.FullPaths.forEach(function(t) {
      if (t.match(/\.iwpv2/)) throw new Error("Unsupported password protection")
    }), t.FileIndex.forEach(function(t) {
      if (t.name.match(/\.iwa$/)) {
        var e, n;
        try {
          e = function(t) {
            for (var e = [], n = 0; n < t.length;) {
              var o = t[n++],
                i = t[n] | t[n + 1] << 8 | t[n + 2] << 16;
              n += 3, e.push(Ow(o, t.slice(n, n + i))), n += i
            }
            if (n !== t.length) throw new Error("data is not a valid framed stream!");
            return Sw(e)
          }(t.content)
        } catch (aD) {
          return
        }
        try {
          n = function(t) {
            for (var e, n = [], o = [0]; o[0] < t.length;) {
              var i = Iw(t, o),
                a = Ew(t.slice(o[0], o[0] + i));
              o[0] += i;
              var r = {
                id: Aw(a[1][0].data),
                messages: []
              };
              a[2].forEach(function(e) {
                var n = Ew(e.data),
                  i = Aw(n[3][0].data);
                r.messages.push({
                  meta: n,
                  data: t.slice(o[0], o[0] + i)
                }), o[0] += i
              }), (null == (e = a[3]) ? void 0 : e[0]) && (r.merge = Aw(a[3][0].data) >>> 0 > 0), n.push(r)
            }
            return n
          }(e)
        } catch (aD) {
          return
        }
        n.forEach(function(t) {
          a[t.id] = t.messages, r.push(t.id)
        })
      }
    }), !r.length) throw new Error("File has no messages");
  var s = (null == (i = null == (o = null == (n = null == (e = null == a ? void 0 : a[1]) ? void 0 : e[0]) ? void 0 : n
    .meta) ? void 0 : o[1]) ? void 0 : i[0].data) && 1 == Aw(a[1][0].meta[1][0].data) && a[1][0];
  if (s || r.forEach(function(t) {
      a[t].forEach(function(t) {
        if (1 == Aw(t.meta[1][0].data) >>> 0) {
          if (s) throw new Error("Document has multiple roots");
          s = t
        }
      })
    }), !s) throw new Error("Cannot find Document root");
  return Dw(a, s)
}

function Nw(t) {
  var e;
  (e = [
    ["cellNF", !1],
    ["cellHTML", !0],
    ["cellFormula", !0],
    ["cellStyles", !1],
    ["cellText", !0],
    ["cellDates", !1],
    ["sheetStubs", !1],
    ["sheetRows", 0, "n"],
    ["bookDeps", !1],
    ["bookSheets", !1],
    ["bookProps", !1],
    ["bookFiles", !1],
    ["bookVBA", !1],
    ["password", ""],
    ["WTF", !1]
  ], function(t) {
    for (var n = 0; n != e.length; ++n) {
      var o = e[n];
      void 0 === t[o[0]] && (t[o[0]] = o[1]), "n" === o[2] && (t[o[0]] = Number(t[o[0]]))
    }
  })(t)
}

function $w(t, e, n, o, i, a, r, s, l, c, d, u) {
  try {
    a[o] = Xh(Bg(t, n, !0), e);
    var p, b = _g(t, e);
    switch (s) {
      case "sheet":
        p = Bx(b, e, i, l, a[o], c, d, u);
        break;
      case "chart":
        if (!(p = Fx(b, e, i, l, a[o], c)) || !p["!drawel"]) break;
        var m = Vg(p["!drawel"].Target, e),
          g = Yh(m),
          f = function(t, e) {
            if (!t) return "??";
            var n = (t.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
            return e["!id"][n].Target
          }(Bg(t, m, !0), Xh(Bg(t, g, !0), m)),
          h = Vg(f, m),
          v = Yh(h);
        p = wx(Bg(t, h, !0), 0, 0, Xh(Bg(t, v, !0), h), 0, p);
        break;
      case "macro":
        k = e, a[o], k.slice(-4), p = {
          "!type": "macro"
        };
        break;
      case "dialog":
        p = function(t, e) {
          return e.slice(-4), {
            "!type": "dialog"
          }
        }(0, e, 0, 0, a[o]);
        break;
      default:
        throw new Error("Unrecognized sheet type " + s)
    }
    r[o] = p;
    var y = [];
    a && a[o] && cg(a[o]).forEach(function(n) {
      var i = "";
      if (a[o][n].Type == qh.CMNT) {
        i = Vg(a[o][n].Target, e);
        var r = Vx(_g(t, i, !0), i, l);
        if (!r || !r.length) return;
        sk(p, r, !1)
      }
      a[o][n].Type == qh.TCMNT && (i = Vg(a[o][n].Target, e), y = y.concat(function(t, e) {
        var n = [],
          o = !1,
          i = {},
          a = 0;
        return t.replace(Ug, function(r, s) {
          var l = Gg(r);
          switch (Kg(l[0])) {
            case "<?xml":
            case "<ThreadedComments":
            case "</ThreadedComments>":
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
            case "<extLst/>":
              break;
            case "<threadedComment":
              i = {
                author: l.personId,
                guid: l.id,
                ref: l.ref,
                T: 1
              };
              break;
            case "</threadedComment>":
              null != i.t && n.push(i);
              break;
            case "<text>":
            case "<text":
              a = s + r.length;
              break;
            case "</text>":
              i.t = t.slice(a, s).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
              break;
            case "<mentions":
            case "<mentions>":
            case "<ext":
              o = !0;
              break;
            case "</mentions>":
            case "</ext>":
              o = !1;
              break;
            default:
              if (!o && e.WTF) throw new Error("unrecognized " + l[0] + " in threaded comments")
          }
          return r
        }), n
      }(_g(t, i, !0), l)))
    }), y && y.length && sk(p, y, !0, l.people || [])
  } catch (aD) {
    if (l.WTF) throw aD
  }
  var k
}

function zw(t) {
  return "/" == t.charAt(0) ? t.slice(1) : t
}

function Uw(t, e) {
  if (ig(), Nw(e = e || {}), Mg(t, "META-INF/manifest.xml")) return kw(t, e);
  if (Mg(t, "objectdata.xml")) return kw(t, e);
  if (Mg(t, "Index/Document.iwa")) {
    if ("undefined" == typeof Uint8Array) throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (void 0 !== Vw) {
      if (t.FileIndex) return Vw(t);
      var n = lg.utils.cfb_new();
      return Fg(t).forEach(function(e) {
        Rg(n, e, function(t, e) {
          return Og(Lg(t, e))
        }(t, e))
      }), Vw(n)
    }
    throw new Error("Unsupported NUMBERS file")
  }
  if (!Mg(t, "[Content_Types].xml")) {
    if (Mg(t, "index.xml.gz")) throw new Error("Unsupported NUMBERS 08 file");
    if (Mg(t, "index.xml")) throw new Error("Unsupported NUMBERS 09 file");
    throw new Error("Unsupported ZIP file")
  }
  var o, i, a = Fg(t),
    r = function(t) {
      var e = {
        workbooks: [],
        sheets: [],
        charts: [],
        dialogs: [],
        macros: [],
        rels: [],
        strs: [],
        comments: [],
        threadedcomments: [],
        links: [],
        coreprops: [],
        extprops: [],
        custprops: [],
        themes: [],
        styles: [],
        calcchains: [],
        vba: [],
        drawings: [],
        metadata: [],
        people: [],
        TODO: [],
        xmlns: ""
      };
      if (!t || !t.match) return e;
      var n = {};
      if ((t.match(Ug) || []).forEach(function(t) {
          var o = Gg(t);
          switch (o[0].replace(jg, "<")) {
            case "<?xml":
              break;
            case "<Types":
              e.xmlns = o["xmlns" + (o[0].match(/<(\w+):/) || ["", ""])[1]];
              break;
            case "<Default":
              n[o.Extension] = o.ContentType;
              break;
            case "<Override":
              void 0 !== e[Wh[o.ContentType]] && e[Wh[o.ContentType]].push(o.PartName)
          }
        }), e.xmlns !== vf) throw new Error("Unknown Namespace: " + e.xmlns);
      return e.calcchain = e.calcchains.length > 0 ? e.calcchains[0] : "", e.sst = e.strs.length > 0 ? e.strs[0] : "", e
        .style = e.styles.length > 0 ? e.styles[0] : "", e.defaults = n, delete e.calcchains, e
    }(Bg(t, "[Content_Types].xml")),
    s = !1;
  if (0 === r.workbooks.length && _g(t, i = "xl/workbook.xml", !0) && r.workbooks.push(i), 0 === r.workbooks.length) {
    if (!_g(t, i = "xl/workbook.bin", !0)) throw new Error("Could not find workbook");
    r.workbooks.push(i), s = !0
  }
  "bin" == r.workbooks[0].slice(-3) && (s = !0);
  var l = {},
    c = {};
  if (!e.bookSheets && !e.bookProps) {
    if (tx = [], r.sst) try {
      tx = Dx(_g(t, zw(r.sst)), r.sst, e)
    } catch (aD) {
      if (e.WTF) throw aD
    }
    e.cellStyles && r.themes.length && (l = function(t, e, n) {
      return ok(t, n)
    }(Bg(t, r.themes[0].replace(/^\//, ""), !0) || "", r.themes[0], e)), r.style && (c = Rx(_g(t, zw(r.style)), r
      .style, l, e))
  }
  r.links.map(function(n) {
    try {
      Xh(Bg(t, Yh(zw(n))), n);
      return $x(_g(t, zw(n)), 0, n, e)
    } catch (aD) {}
  });
  var d = _x(_g(t, zw(r.workbooks[0])), r.workbooks[0], e),
    u = {},
    p = "";
  r.coreprops.length && ((p = _g(t, zw(r.coreprops[0]), !0)) && (u = Qh(p)), 0 !== r.extprops.length && (p = _g(t, zw(r
    .extprops[0]), !0)) && function(t, e, n) {
    var o = {};
    e || (e = {}), t = rf(t), tv.forEach(function(n) {
      var i = (t.match(lf(n[0])) || [])[1];
      switch (n[2]) {
        case "string":
          i && (e[n[1]] = Yg(i));
          break;
        case "bool":
          e[n[1]] = "true" === i;
          break;
        case "raw":
          var a = t.match(new RegExp("<" + n[0] + "[^>]*>([\\s\\S]*?)</" + n[0] + ">"));
          a && a.length > 0 && (o[n[1]] = a[1])
      }
    }), o.HeadingPairs && o.TitlesOfParts && ev(o.HeadingPairs, o.TitlesOfParts, e, n)
  }(p, u, e));
  var b = {};
  e.bookSheets && !e.bookProps || 0 !== r.custprops.length && (p = Bg(t, zw(r.custprops[0]), !0)) && (b = function(t,
  e) {
    var n = {},
      o = "",
      i = t.match(nv);
    if (i)
      for (var a = 0; a != i.length; ++a) {
        var r = i[a],
          s = Gg(r);
        switch (s[0]) {
          case "<?xml":
          case "<Properties":
            break;
          case "<property":
            o = Yg(s.name);
            break;
          case "</property>":
            o = null;
            break;
          default:
            if (0 === r.indexOf("<vt:")) {
              var l = r.split(">"),
                c = l[0].slice(4),
                d = l[1];
              switch (c) {
                case "lpstr":
                case "bstr":
                case "lpwstr":
                case "cy":
                case "error":
                  n[o] = Yg(d);
                  break;
                case "bool":
                  n[o] = tf(d);
                  break;
                case "i1":
                case "i2":
                case "i4":
                case "i8":
                case "int":
                case "uint":
                  n[o] = parseInt(d, 10);
                  break;
                case "r4":
                case "r8":
                case "decimal":
                  n[o] = parseFloat(d);
                  break;
                case "filetime":
                case "date":
                  n[o] = xg(d);
                  break;
                default:
                  if ("/" == c.slice(-1)) break;
                  e.WTF
              }
            } else if ("</" === r.slice(0, 2));
            else if (e.WTF) throw new Error(r)
        }
      }
    return n
  }(p, e));
  var m = {};
  if ((e.bookSheets || e.bookProps) && (d.Sheets ? o = d.Sheets.map(function(t) {
        return t.name
      }) : u.Worksheets && u.SheetNames.length > 0 && (o = u.SheetNames), e.bookProps && (m.Props = u, m.Custprops = b),
      e.bookSheets && void 0 !== o && (m.SheetNames = o), e.bookSheets ? m.SheetNames : e.bookProps)) return m;
  o = {};
  var g = {};
  e.bookDeps && r.calcchain && (g = Nx(_g(t, zw(r.calcchain)), r.calcchain));
  var f, h, v = 0,
    y = {},
    k = d.Sheets;
  u.Worksheets = k.length, u.SheetNames = [];
  for (var x = 0; x != k.length; ++x) u.SheetNames[x] = k[x].name;
  var w = s ? "bin" : "xml",
    C = r.workbooks[0].lastIndexOf("/"),
    S = (r.workbooks[0].slice(0, C + 1) + "_rels/" + r.workbooks[0].slice(C + 1) + ".rels").replace(/^\//, "");
  Mg(t, S) || (S = "xl/_rels/workbook." + w + ".rels");
  var T = Xh(Bg(t, S, !0), S.replace(/_rels.*/, "s5s"));
  (r.metadata || []).length >= 1 && (e.xlmeta = zx(_g(t, zw(r.metadata[0])), r.metadata[0], e)), (r.people || [])
    .length >= 1 && (e.people = function(t, e) {
      var n = [],
        o = !1;
      return t.replace(Ug, function(t) {
        var i = Gg(t);
        switch (Kg(i[0])) {
          case "<?xml":
          case "<personList":
          case "</personList>":
          case "</person>":
          case "<extLst":
          case "<extLst>":
          case "</extLst>":
          case "<extLst/>":
            break;
          case "<person":
            n.push({
              name: i.displayname,
              id: i.id
            });
            break;
          case "<ext":
            o = !0;
            break;
          case "</ext>":
            o = !1;
            break;
          default:
            if (!o && e.WTF) throw new Error("unrecognized " + i[0] + " in threaded comments")
        }
        return t
      }), n
    }(_g(t, zw(r.people[0])), e)), T && (T = function(t, e) {
      if (!t) return 0;
      try {
        t = e.map(function(e) {
          return e.id || (e.id = e.strRelID), [e.name, t["!id"][e.id].Target, (n = t["!id"][e.id].Type, qh.WS
            .indexOf(n) > -1 ? "sheet" : n == qh.CS ? "chart" : n == qh.DS ? "dialog" : n == qh.MS ? "macro" :
            n && n.length ? n : "sheet")];
          var n
        })
      } catch (aD) {
        return null
      }
      return t && 0 !== t.length ? t : null
    }(T, d.Sheets));
  var I = _g(t, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  t: for (v = 0; v != u.Worksheets; ++v) {
    var A = "sheet";
    if (T && T[v] ? (f = "xl/" + T[v][1].replace(/[\/]?xl\//, ""), Mg(t, f) || (f = T[v][1]), Mg(t, f) || (f = S
        .replace(/_rels\/.*$/, "") + T[v][1]), A = T[v][2]) : f = (f = "xl/worksheets/sheet" + (v + 1 - I) + "." + w)
      .replace(/sheet0\./, "sheet."), h = f.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), e && null != e.sheets)
      switch (typeof e.sheets) {
        case "number":
          if (v != e.sheets) continue t;
          break;
        case "string":
          if (u.SheetNames[v].toLowerCase() != e.sheets.toLowerCase()) continue t;
          break;
        default:
          if (Array.isArray && Array.isArray(e.sheets)) {
            for (var E = !1, P = 0; P != e.sheets.length; ++P) "number" == typeof e.sheets[P] && e.sheets[P] == v && (
                E = 1), "string" == typeof e.sheets[P] && e.sheets[P].toLowerCase() == u.SheetNames[v]
            .toLowerCase() && (E = 1);
            if (!E) continue t
          }
      }
    $w(t, f, h, u.SheetNames[v], v, y, o, A, e, d, l, c)
  }
  return m = {
    Directory: r,
    Workbook: d,
    Props: u,
    Custprops: b,
    Deps: g,
    Sheets: o,
    SheetNames: u.SheetNames,
    Strings: tx,
    Styles: c,
    Themes: l,
    SSF: Cg(Sm)
  }, e && e.bookFiles && (t.files ? (m.keys = a, m.files = t.files) : (m.keys = [], m.files = {}, t.FullPaths.forEach(
    function(e, n) {
      e = e.replace(/^Root Entry[\/]/, ""), m.keys.push(e), m.files[e] = t.FileIndex[n]
    }))), e && e.bookVBA && (r.vba.length > 0 ? m.vbaraw = _g(t, zw(r.vba[0]), !0) : r.defaults &&
    "application/vnd.ms-office.vbaProject" === r.defaults.bin && (m.vbaraw = _g(t, "xl/vbaProject.bin", !0))), m
}

function jw(t, e) {
  var n, o, i = e || {},
    a = "Workbook",
    r = lg.find(t, a);
  try {
    if (a = "/!DataSpaces/Version", !(r = lg.find(t, a)) || !r.content) throw new Error(
      "ECMA-376 Encrypted file missing " + a);
    if (n = r.content, (o = {}).id = n.read_shift(0, "lpp4"), o.R = vy(n, 4), o.U = vy(n, 4), o.W = vy(n, 4), a =
      "/!DataSpaces/DataSpaceMap", !(r = lg.find(t, a)) || !r.content) throw new Error(
      "ECMA-376 Encrypted file missing " + a);
    var s = function(t) {
      var e = [];
      t.l += 4;
      for (var n = t.read_shift(4); n-- > 0;) e.push(yy(t));
      return e
    }(r.content);
    if (1 !== s.length || 1 !== s[0].comps.length || 0 !== s[0].comps[0].t || "StrongEncryptionDataSpace" !== s[0]
      .name || "EncryptedPackage" !== s[0].comps[0].v) throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", !(r = lg.find(t, a)) || !r.content) throw new Error(
      "ECMA-376 Encrypted file missing " + a);
    var l = function(t) {
      var e = [];
      t.l += 4;
      for (var n = t.read_shift(4); n-- > 0;) e.push(t.read_shift(0, "lpp4"));
      return e
    }(r.content);
    if (1 != l.length || "StrongEncryptionTransform" != l[0]) throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", !(r = lg.find(t, a)) || !r.content)
    throw new Error("ECMA-376 Encrypted file missing " + a);
    ky(r.content)
  } catch (aD) {}
  if (a = "/EncryptionInfo", !(r = lg.find(t, a)) || !r.content) throw new Error("ECMA-376 Encrypted file missing " +
  a);
  var c = function(t) {
    var e = vy(t);
    switch (e.Minor) {
      case 2:
        return [e.Minor, Cy(t)];
      case 3:
        return [e.Minor, Sy()];
      case 4:
        return [e.Minor, Ty(t)]
    }
    throw new Error("ECMA-376 Encrypted file unrecognized Version: " + e.Minor)
  }(r.content);
  if (a = "/EncryptedPackage", !(r = lg.find(t, a)) || !r.content) throw new Error("ECMA-376 Encrypted file missing " +
    a);
  if (4 == c[0] && "undefined" != typeof decrypt_agile) return decrypt_agile(c[1], r.content, i.password || "", i);
  if (2 == c[0] && "undefined" != typeof decrypt_std76) return decrypt_std76(c[1], r.content, i.password || "", i);
  throw new Error("File is password-protected")
}

function Hw(t, e) {
  var n = "";
  switch ((e || {}).type || "base64") {
    case "buffer":
    case "array":
      return [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]];
    case "base64":
      n = im(t.slice(0, 12));
      break;
    case "binary":
      n = t;
      break;
    default:
      throw new Error("Unrecognized type " + (e && e.type || "undefined"))
  }
  return [n.charCodeAt(0), n.charCodeAt(1), n.charCodeAt(2), n.charCodeAt(3), n.charCodeAt(4), n.charCodeAt(5), n
    .charCodeAt(6), n.charCodeAt(7)
  ]
}

function Gw(t, e) {
  var n = 0;
  t: for (; n < t.length;) switch (t.charCodeAt(n)) {
    case 10:
    case 13:
    case 32:
      ++n;
      break;
    case 60:
      return Qx(t.slice(n), e);
    default:
      break t
  }
  return ry.to_workbook(t, e)
}

function Kw(t, e, n, o) {
  return o ? (n.type = "string", ry.to_workbook(t, n)) : ry.to_workbook(e, n)
}

function Ww(t, e) {
  Yb();
  var n = e || {};
  if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer) return Ww(new Uint8Array(t), ((n = Cg(n)).type =
    "array", n));
  "undefined" != typeof Uint8Array && t instanceof Uint8Array && !n.type && (n.type = "undefined" != typeof Deno ?
    "buffer" : "array");
  var o, i = t,
    a = !1;
  if (n.cellStyles && (n.cellNF = !0, n.sheetStubs = !0), ex = {}, n.dateNF && (ex.dateNF = n.dateNF), n.type || (n
      .type = am && Buffer.isBuffer(t) ? "buffer" : "base64"), "file" == n.type && (n.type = am ? "buffer" : "binary",
      i = function(t) {
        if ("undefined" != typeof Deno) return Deno.readFileSync(t);
        if ("undefined" != typeof $ && "undefined" != typeof File && "undefined" != typeof Folder) try {
          var e = File(t);
          e.open("r"), e.encoding = "binary";
          var n = e.read();
          return e.close(), n
        } catch (aD) {
          if (!aD.message || !aD.message.match(/onstruct/)) throw aD
        }
        throw new Error("Cannot access file " + t)
      }(t), "undefined" == typeof Uint8Array || am || (n.type = "array")), "string" == n.type && (a = !0, n.type =
      "binary", n.codepage = 65001, i = function(t) {
        return t.match(/[^\x00-\x7F]/) ? sf(t) : t
      }(t)), "array" == n.type && "undefined" != typeof Uint8Array && t instanceof Uint8Array && "undefined" !=
    typeof ArrayBuffer) {
    var r = new ArrayBuffer(3),
      s = new Uint8Array(r);
    if (s.foo = "bar", !s.foo) return (n = Cg(n)).type = "array", Ww(um(i), n)
  }
  switch ((o = Hw(i, n))[0]) {
    case 208:
      if (207 === o[1] && 17 === o[2] && 224 === o[3] && 161 === o[4] && 177 === o[5] && 26 === o[6] && 225 === o[7])
        return function(t, e) {
          return lg.find(t, "EncryptedPackage") ? jw(t, e) : lw(t, e)
        }(lg.read(i, n), n);
      break;
    case 9:
      if (o[1] <= 8) return lw(i, n);
      break;
    case 60:
      return Qx(i, n);
    case 73:
      if (73 === o[1] && 42 === o[2] && 0 === o[3]) throw new Error("TIFF Image File is not a spreadsheet");
      if (68 === o[1]) return function(t, e) {
        var n = e || {},
          o = !!n.WTF;
        n.WTF = !0;
        try {
          var i = oy.to_workbook(t, n);
          return n.WTF = o, i
        } catch (aD) {
          if (n.WTF = o, !aD.message.match(/SYLK bad record ID/) && o) throw aD;
          return ry.to_workbook(t, e)
        }
      }(i, n);
      break;
    case 84:
      if (65 === o[1] && 66 === o[2] && 76 === o[3]) return iy.to_workbook(i, n);
      break;
    case 80:
      return 75 === o[1] && o[2] < 9 && o[3] < 9 ? function(t, e) {
        var n = t,
          o = e || {};
        return o.type || (o.type = am && Buffer.isBuffer(t) ? "buffer" : "base64"), Uw(Dg(n, o), o)
      }(i, n) : Kw(t, i, n, a);
    case 239:
      return 60 === o[3] ? Qx(i, n) : Kw(t, i, n, a);
    case 255:
      if (254 === o[1]) return function(t, e) {
        var n = t;
        return "base64" == e.type && (n = im(n)), n = Zb.utils.decode(1200, n.slice(2), "str"), e.type = "binary",
          Gw(n, e)
      }(i, n);
      if (0 === o[1] && 2 === o[2] && 0 === o[3]) return sy.to_workbook(i, n);
      break;
    case 0:
      if (0 === o[1]) {
        if (o[2] >= 2 && 0 === o[3]) return sy.to_workbook(i, n);
        if (0 === o[2] && (8 === o[3] || 9 === o[3])) return sy.to_workbook(i, n)
      }
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return ny.to_workbook(i, n);
    case 123:
      if (92 === o[1] && 114 === o[2] && 116 === o[3]) return Oy.to_workbook(i, n);
      break;
    case 10:
    case 13:
    case 32:
      return function(t, e) {
        var n = "",
          o = Hw(t, e);
        switch (e.type) {
          case "base64":
            n = im(t);
            break;
          case "binary":
            n = t;
            break;
          case "buffer":
            n = t.toString("binary");
            break;
          case "array":
            n = wg(t);
            break;
          default:
            throw new Error("Unrecognized type " + e.type)
        }
        return 239 == o[0] && 187 == o[1] && 191 == o[2] && (n = rf(n)), e.type = "binary", Gw(n, e)
      }(i, n);
    case 137:
      if (80 === o[1] && 78 === o[2] && 71 === o[3]) throw new Error("PNG Image File is not a spreadsheet")
  }
  return ey.indexOf(o[0]) > -1 && o[2] <= 12 && o[3] <= 31 ? ny.to_workbook(i, n) : Kw(t, i, n, a)
}

function qw(t, e, n, o, i, a, r, s) {
  var l = ch(n),
    c = s.defval,
    d = s.raw || !Object.prototype.hasOwnProperty.call(s, "raw"),
    u = !0,
    p = 1 === i ? [] : {};
  if (1 !== i)
    if (Object.defineProperty) try {
      Object.defineProperty(p, "__rowNum__", {
        value: n,
        enumerable: !1
      })
    } catch (aD) {
      p.__rowNum__ = n
    } else p.__rowNum__ = n;
  if (!r || t[n])
    for (var b = e.s.c; b <= e.e.c; ++b) {
      var m = r ? t[n][b] : t[o[b] + l];
      if (void 0 !== m && void 0 !== m.t) {
        var g = m.v;
        switch (m.t) {
          case "z":
            if (null == g) break;
            continue;
          case "e":
            g = 0 == g ? null : void 0;
            break;
          case "s":
          case "d":
          case "b":
          case "n":
            break;
          default:
            throw new Error("unrecognized type " + m.t)
        }
        if (null != a[b]) {
          if (null == g)
            if ("e" == m.t && null === g) p[a[b]] = null;
            else if (void 0 !== c) p[a[b]] = c;
          else {
            if (!d || null !== g) continue;
            p[a[b]] = null
          } else p[a[b]] = d && ("n" !== m.t || "n" === m.t && !1 !== s.rawNumbers) ? g : vh(m, g, s);
          null != g && (u = !1)
        }
      } else {
        if (void 0 === c) continue;
        null != a[b] && (p[a[b]] = c)
      }
    }
  return {
    row: p,
    isempty: u
  }
}

function Yw(t, e) {
  if (null == t || null == t["!ref"]) return [];
  var n = {
      t: "n",
      v: 0
    },
    o = 0,
    i = 1,
    a = [],
    r = 0,
    s = "",
    l = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 0
      }
    },
    c = e || {},
    d = null != c.range ? c.range : t["!ref"];
  switch (1 === c.header ? o = 1 : "A" === c.header ? o = 2 : Array.isArray(c.header) ? o = 3 : null == c.header && (o =
      0), typeof d) {
    case "string":
      l = fh(d);
      break;
    case "number":
      (l = fh(t["!ref"])).s.r = d;
      break;
    default:
      l = d
  }
  o > 0 && (i = 0);
  var u = ch(l.s.r),
    p = [],
    b = [],
    m = 0,
    g = 0,
    f = Array.isArray(t),
    h = l.s.r,
    v = 0,
    y = {};
  f && !t[h] && (t[h] = []);
  var k = c.skipHidden && t["!cols"] || [],
    x = c.skipHidden && t["!rows"] || [];
  for (v = l.s.c; v <= l.e.c; ++v)
    if (!(k[v] || {}).hidden) switch (p[v] = uh(v), n = f ? t[h][v] : t[p[v] + u], o) {
      case 1:
        a[v] = v - l.s.c;
        break;
      case 2:
        a[v] = p[v];
        break;
      case 3:
        a[v] = c.header[v - l.s.c];
        break;
      default:
        if (null == n && (n = {
            w: "__EMPTY",
            t: "s"
          }), s = r = vh(n, null, c), g = y[r] || 0) {
          do {
            s = r + "_" + g++
          } while (y[s]);
          y[r] = g, y[s] = 1
        } else y[r] = 1;
        a[v] = s
    }
  for (h = l.s.r + i; h <= l.e.r; ++h)
    if (!(x[h] || {}).hidden) {
      var w = qw(t, l, h, p, o, a, f, c);
      (!1 === w.isempty || (1 === o ? !1 !== c.blankrows : c.blankrows)) && (b[m++] = w.row)
    } return b.length = m, b
}
var Xw = /"/g;

function Jw(t, e, n, o, i, a, r, s) {
  for (var l = !0, c = [], d = "", u = ch(n), p = e.s.c; p <= e.e.c; ++p)
    if (o[p]) {
      var b = s.dense ? (t[n] || [])[p] : t[o[p] + u];
      if (null == b) d = "";
      else if (null != b.v) {
        l = !1, d = "" + (s.rawNumbers && "n" == b.t ? b.v : vh(b, null, s));
        for (var m = 0, g = 0; m !== d.length; ++m)
          if ((g = d.charCodeAt(m)) === i || g === a || 34 === g || s.forceQuotes) {
            d = '"' + d.replace(Xw, '""') + '"';
            break
          }
        "ID" == d && (d = '"ID"')
      } else null == b.f || b.F ? d = "" : (l = !1, (d = "=" + b.f).indexOf(",") >= 0 && (d = '"' + d.replace(Xw,
        '""') + '"'));
      c.push(d)
    } return !1 === s.blankrows && l ? null : c.join(r)
}

function Zw(t, e) {
  var n = [],
    o = null == e ? {} : e;
  if (null == t || null == t["!ref"]) return "";
  var i = fh(t["!ref"]),
    a = void 0 !== o.FS ? o.FS : ",",
    r = a.charCodeAt(0),
    s = void 0 !== o.RS ? o.RS : "\n",
    l = s.charCodeAt(0),
    c = new RegExp(("|" == a ? "\\|" : a) + "+$"),
    d = "",
    u = [];
  o.dense = Array.isArray(t);
  for (var p = o.skipHidden && t["!cols"] || [], b = o.skipHidden && t["!rows"] || [], m = i.s.c; m <= i.e.c; ++m)(p[
    m] || {}).hidden || (u[m] = uh(m));
  for (var g = 0, f = i.s.r; f <= i.e.r; ++f)(b[f] || {}).hidden || null != (d = Jw(t, i, f, u, r, l, a, o)) && (o
    .strip && (d = d.replace(c, "")), (d || !1 !== o.blankrows) && n.push((g++ ? s : "") + d));
  return delete o.dense, n.join("")
}

function Qw(t, e, n) {
  var o, i = n || {},
    a = +!i.skipHeader,
    r = t || {},
    s = 0,
    l = 0;
  if (r && null != i.origin)
    if ("number" == typeof i.origin) s = i.origin;
    else {
      var c = "string" == typeof i.origin ? ph(i.origin) : i.origin;
      s = c.r, l = c.c
    } var d = {
    s: {
      c: 0,
      r: 0
    },
    e: {
      c: l,
      r: s + e.length - 1 + a
    }
  };
  if (r["!ref"]) {
    var u = fh(r["!ref"]);
    d.e.c = Math.max(d.e.c, u.e.c), d.e.r = Math.max(d.e.r, u.e.r), -1 == s && (s = u.e.r + 1, d.e.r = s + e.length -
      1 + a)
  } else - 1 == s && (s = 0, d.e.r = e.length - 1 + a);
  var p = i.header || [],
    b = 0;
  e.forEach(function(t, e) {
    cg(t).forEach(function(n) {
      -1 == (b = p.indexOf(n)) && (p[b = p.length] = n);
      var c = t[n],
        d = "z",
        u = "",
        m = bh({
          c: l + b,
          r: s + e + a
        });
      o = tC(r, m), !c || "object" != typeof c || c instanceof Date ? ("number" == typeof c ? d = "n" :
        "boolean" == typeof c ? d = "b" : "string" == typeof c ? d = "s" : c instanceof Date ? (d = "d", i
          .cellDates || (d = "n", c = pg(c)), u = i.dateNF || Sm[14]) : null === c && i.nullError && (d = "e",
          c = 0), o ? (o.t = d, o.v = c, delete o.w, delete o.R, u && (o.z = u)) : r[m] = o = {
          t: d,
          v: c
        }, u && (o.z = u)) : r[m] = c
    })
  }), d.e.c = Math.max(d.e.c, l + p.length - 1);
  var m = ch(s);
  if (a)
    for (b = 0; b < p.length; ++b) r[uh(b + l) + m] = {
      t: "s",
      v: p[b]
    };
  return r["!ref"] = gh(d), r
}

function tC(t, e, n) {
  if ("string" == typeof e) {
    if (Array.isArray(t)) {
      var o = ph(e);
      return t[o.r] || (t[o.r] = []), t[o.r][o.c] || (t[o.r][o.c] = {
        t: "z"
      })
    }
    return t[e] || (t[e] = {
      t: "z"
    })
  }
  return tC(t, bh("number" != typeof e ? e : {
    r: e,
    c: n || 0
  }))
}

function eC() {
  return {
    SheetNames: [],
    Sheets: {}
  }
}

function nC(t, e, n, o) {
  var i = 1;
  if (!n)
    for (; i <= 65535 && -1 != t.SheetNames.indexOf(n = "Sheet" + i); ++i, n = void 0);
  if (!n || t.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (o && t.SheetNames.indexOf(n) >= 0) {
    var a = n.match(/(^.*?)(\d+)$/);
    i = a && +a[2] || 0;
    var r = a && a[1] || n;
    for (++i; i <= 65535 && -1 != t.SheetNames.indexOf(n = r + i); ++i);
  }
  if (function(t) {
      if (t.length > 31) throw new Error("Sheet names cannot exceed 31 chars");
      Ox.forEach(function(e) {
        if (-1 != t.indexOf(e)) throw new Error("Sheet name cannot contain : \\ / ? * [ ]")
      })
    }(n), t.SheetNames.indexOf(n) >= 0) throw new Error("Worksheet with name |" + n + "| already exists!");
  return t.SheetNames.push(n), t.Sheets[n] = e, n
}

function oC(t, e, n) {
  return e ? (t.l = {
    Target: e
  }, n && (t.l.Tooltip = n)) : delete t.l, t
}
var iC = {
  encode_col: uh,
  encode_row: ch,
  encode_cell: bh,
  encode_range: gh,
  decode_col: dh,
  decode_row: lh,
  split_cell: function(t) {
    return t.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
  },
  decode_cell: ph,
  decode_range: mh,
  format_cell: vh,
  sheet_add_aoa: kh,
  sheet_add_json: Qw,
  sheet_add_dom: mw,
  aoa_to_sheet: xh,
  json_to_sheet: function(t, e) {
    return Qw(null, t, e)
  },
  table_to_sheet: gw,
  table_to_book: function(t, e) {
    return yh(gw(t, e), e)
  },
  sheet_to_csv: Zw,
  sheet_to_txt: function(t, e) {
    return e || (e = {}), e.FS = "\t", e.RS = "\n", Zw(t, e)
  },
  sheet_to_json: Yw,
  sheet_to_html: function(t, e) {
    var n = e || {},
      o = null != n.header ? n.header :
      '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>',
      i = null != n.footer ? n.footer : "</body></html>",
      a = [o],
      r = mh(t["!ref"]);
    n.dense = Array.isArray(t), a.push(function(t, e, n) {
      return [].join("") + "<table" + (n && n.id ? ' id="' + n.id + '"' : "") + ">"
    }(0, 0, n));
    for (var s = r.s.r; s <= r.e.r; ++s) a.push(bw(t, r, s, n));
    return a.push("</table>" + i), a.join("")
  },
  sheet_to_formulae: function(t) {
    var e, n = "",
      o = "";
    if (null == t || null == t["!ref"]) return [];
    var i, a = fh(t["!ref"]),
      r = "",
      s = [],
      l = [],
      c = Array.isArray(t);
    for (i = a.s.c; i <= a.e.c; ++i) s[i] = uh(i);
    for (var d = a.s.r; d <= a.e.r; ++d)
      for (r = ch(d), i = a.s.c; i <= a.e.c; ++i)
        if (n = s[i] + r, o = "", void 0 !== (e = c ? (t[d] || [])[i] : t[n])) {
          if (null != e.F) {
            if (n = e.F, !e.f) continue;
            o = e.f, -1 == n.indexOf(":") && (n = n + ":" + n)
          }
          if (null != e.f) o = e.f;
          else {
            if ("z" == e.t) continue;
            if ("n" == e.t && null != e.v) o = "" + e.v;
            else if ("b" == e.t) o = e.v ? "TRUE" : "FALSE";
            else if (void 0 !== e.w) o = "'" + e.w;
            else {
              if (void 0 === e.v) continue;
              o = "s" == e.t ? "'" + e.v : "" + e.v
            }
          }
          l[l.length] = n + "=" + o
        } return l
  },
  sheet_to_row_object_array: Yw,
  sheet_get_cell: tC,
  book_new: eC,
  book_append_sheet: nC,
  book_set_sheet_visibility: function(t, e, n) {
    t.Workbook || (t.Workbook = {}), t.Workbook.Sheets || (t.Workbook.Sheets = []);
    var o = function(t, e) {
      if ("number" == typeof e) {
        if (e >= 0 && t.SheetNames.length > e) return e;
        throw new Error("Cannot find sheet # " + e)
      }
      if ("string" == typeof e) {
        var n = t.SheetNames.indexOf(e);
        if (n > -1) return n;
        throw new Error("Cannot find sheet name |" + e + "|")
      }
      throw new Error("Cannot find sheet |" + e + "|")
    }(t, e);
    switch (t.Workbook.Sheets[o] || (t.Workbook.Sheets[o] = {}), n) {
      case 0:
      case 1:
      case 2:
        break;
      default:
        throw new Error("Bad sheet visibility setting " + n)
    }
    t.Workbook.Sheets[o].Hidden = n
  },
  cell_set_number_format: function(t, e) {
    return t.z = e, t
  },
  cell_set_hyperlink: oC,
  cell_set_internal_link: function(t, e, n) {
    return oC(t, "#" + e, n)
  },
  cell_add_comment: function(t, e, n) {
    t.c || (t.c = []), t.c.push({
      t: e,
      a: n || "SheetJS"
    })
  },
  sheet_set_array_formula: function(t, e, n, o) {
    for (var i = "string" != typeof e ? e : fh(e), a = "string" == typeof e ? e : gh(e), r = i.s.r; r <= i.e.r; ++r)
      for (var s = i.s.c; s <= i.e.c; ++s) {
        var l = tC(t, r, s);
        l.t = "n", l.F = a, delete l.v, r == i.s.r && s == i.s.c && (l.f = n, o && (l.D = !0))
      }
    return t
  },
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const aC = {
    class: "flex items-center gap-2 text-slate-700 dark:text-slate-200"
  },
  rC = {
    class: "font-semibold text-sm"
  },
  sC = {
    class: "space-y-5 text-xs px-1 py-2"
  },
  lC = {
    class: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/40 text-muted-foreground"
  },
  cC = ["title"],
  dC = {
    class: "space-y-2"
  },
  uC = {
    class: "block text-xs font-semibold text-foreground tracking-wide uppercase"
  },
  pC = {
    key: 0,
    class: "space-y-2"
  },
  bC = {
    class: "block text-xs font-semibold text-foreground tracking-wide uppercase"
  },
  mC = {
    key: 1,
    class: "space-y-2"
  },
  gC = {
    class: "flex items-center justify-between"
  },
  fC = {
    class: "text-xs font-semibold text-foreground tracking-wide uppercase"
  },
  hC = {
    class: "text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full"
  },
  vC = {
    class: "rounded-lg border border-border/50 bg-background divide-y divide-border/30 max-h-40 overflow-y-auto shadow-inner"
  },
  yC = ["title"],
  kC = {
    class: "text-muted-foreground mr-2 select-none"
  },
  xC = {
    key: 0,
    class: "px-3 py-2 text-xs text-muted-foreground italic text-center"
  },
  wC = {
    key: 2,
    class: "px-3 py-4 text-center text-muted-foreground italic rounded-lg border border-dashed border-border/40"
  },
  CC = {
    class: "flex justify-end gap-2"
  },
