// stats.js r5 - http://github.com/mrdoob/stats.js
var Stats = function () {
  var j = 0,
    u = 2,
    r,
    C = 0,
    E = new Date().getTime(),
    w = E,
    f = E,
    m = 0,
    e = 1000,
    i = 0,
    F,
    q,
    c,
    d,
    B,
    k = 0,
    G = 1000,
    a = 0,
    A,
    t,
    p,
    D,
    l,
    v = 0,
    o = 1000,
    s = 0,
    h,
    n,
    z,
    g,
    b,
    y = {
      fps: { bg: { r: 16, g: 16, b: 48 }, fg: { r: 0, g: 255, b: 255 } },
      ms: { bg: { r: 16, g: 48, b: 16 }, fg: { r: 0, g: 255, b: 0 } },
      mem: { bg: { r: 48, g: 16, b: 26 }, fg: { r: 255, g: 0, b: 128 } },
    };
  r = document.createElement("div");
  r.style.fontFamily = "Helvetica, Arial, sans-serif";
  r.style.textAlign = "left";
  r.style.fontSize = "9px";
  r.style.opacity = "0.9";
  r.style.width = "80px";
  r.style.cursor = "pointer";
  r.addEventListener("click", H, false);
  F = document.createElement("div");
  F.style.backgroundColor =
    "rgb(" +
    Math.floor(y.fps.bg.r / 2) +
    "," +
    Math.floor(y.fps.bg.g / 2) +
    "," +
    Math.floor(y.fps.bg.b / 2) +
    ")";
  F.style.padding = "2px 0px 3px 0px";
  r.appendChild(F);
  q = document.createElement("div");
  q.innerHTML = "<strong>FPS</strong>";
  q.style.color =
    "rgb(" + y.fps.fg.r + "," + y.fps.fg.g + "," + y.fps.fg.b + ")";
  q.style.margin = "0px 0px 1px 3px";
  F.appendChild(q);
  c = document.createElement("canvas");
  c.width = 74;
  c.height = 30;
  c.style.display = "block";
  c.style.marginLeft = "3px";
  F.appendChild(c);
  d = c.getContext("2d");
  d.fillStyle = "rgb(" + y.fps.bg.r + "," + y.fps.bg.g + "," + y.fps.bg.b + ")";
  d.fillRect(0, 0, c.width, c.height);
  B = d.getImageData(0, 0, c.width, c.height);
  A = document.createElement("div");
  A.style.backgroundColor =
    "rgb(" +
    Math.floor(y.ms.bg.r / 2) +
    "," +
    Math.floor(y.ms.bg.g / 2) +
    "," +
    Math.floor(y.ms.bg.b / 2) +
    ")";
  A.style.padding = "2px 0px 3px 0px";
  A.style.display = "none";
  r.appendChild(A);
  t = document.createElement("div");
  t.innerHTML = "<strong>MS</strong>";
  t.style.color = "rgb(" + y.ms.fg.r + "," + y.ms.fg.g + "," + y.ms.fg.b + ")";
  t.style.margin = "0px 0px 1px 3px";
  A.appendChild(t);
  p = document.createElement("canvas");
  p.width = 74;
  p.height = 30;
  p.style.display = "block";
  p.style.marginLeft = "3px";
  A.appendChild(p);
  D = p.getContext("2d");
  D.fillStyle = "rgb(" + y.ms.bg.r + "," + y.ms.bg.g + "," + y.ms.bg.b + ")";
  D.fillRect(0, 0, p.width, p.height);
  l = D.getImageData(0, 0, p.width, p.height);
  try {
    if (webkitPerformance && webkitPerformance.memory.totalJSHeapSize) {
      u = 3;
    }
  } catch (x) {}
  h = document.createElement("div");
  h.style.backgroundColor =
    "rgb(" +
    Math.floor(y.mem.bg.r / 2) +
    "," +
    Math.floor(y.mem.bg.g / 2) +
    "," +
    Math.floor(y.mem.bg.b / 2) +
    ")";
  h.style.padding = "2px 0px 3px 0px";
  h.style.display = "none";
  r.appendChild(h);
  n = document.createElement("div");
  n.innerHTML = "<strong>MEM</strong>";
  n.style.color =
    "rgb(" + y.mem.fg.r + "," + y.mem.fg.g + "," + y.mem.fg.b + ")";
  n.style.margin = "0px 0px 1px 3px";
  h.appendChild(n);
  z = document.createElement("canvas");
  z.width = 74;
  z.height = 30;
  z.style.display = "block";
  z.style.marginLeft = "3px";
  h.appendChild(z);
  g = z.getContext("2d");
  g.fillStyle = "#301010";
  g.fillRect(0, 0, z.width, z.height);
  b = g.getImageData(0, 0, z.width, z.height);
  function I(N, M, K) {
    var J, O, L;
    for (O = 0; O < 30; O++) {
      for (J = 0; J < 73; J++) {
        L = (J + O * 74) * 4;
        N[L] = N[L + 4];
        N[L + 1] = N[L + 5];
        N[L + 2] = N[L + 6];
      }
    }
    for (O = 0; O < 30; O++) {
      L = (73 + O * 74) * 4;
      if (O < M) {
        N[L] = y[K].bg.r;
        N[L + 1] = y[K].bg.g;
        N[L + 2] = y[K].bg.b;
      } else {
        N[L] = y[K].fg.r;
        N[L + 1] = y[K].fg.g;
        N[L + 2] = y[K].fg.b;
      }
    }
  }
  function H() {
    j++;
    j == u ? (j = 0) : j;
    F.style.display = "none";
    A.style.display = "none";
    h.style.display = "none";
    switch (j) {
      case 0:
        F.style.display = "block";
        break;
      case 1:
        A.style.display = "block";
        break;
      case 2:
        h.style.display = "block";
        break;
    }
  }
  return {
    domElement: r,
    update: function () {
      C++;
      E = new Date().getTime();
      k = E - w;
      G = Math.min(G, k);
      a = Math.max(a, k);
      I(l.data, Math.min(30, 30 - (k / 200) * 30), "ms");
      t.innerHTML = "<strong>" + k + " MS</strong> (" + G + "-" + a + ")";
      D.putImageData(l, 0, 0);
      w = E;
      if (E > f + 1000) {
        m = Math.round((C * 1000) / (E - f));
        e = Math.min(e, m);
        i = Math.max(i, m);
        I(B.data, Math.min(30, 30 - (m / 100) * 30), "fps");
        q.innerHTML = "<strong>" + m + " FPS</strong> (" + e + "-" + i + ")";
        d.putImageData(B, 0, 0);
        if (u == 3) {
          v = webkitPerformance.memory.usedJSHeapSize * 9.54e-7;
          o = Math.min(o, v);
          s = Math.max(s, v);
          I(b.data, Math.min(30, 30 - v / 2), "mem");
          n.innerHTML =
            "<strong>" +
            Math.round(v) +
            " MEM</strong> (" +
            Math.round(o) +
            "-" +
            Math.round(s) +
            ")";
          g.putImageData(b, 0, 0);
        }
        f = E;
        C = 0;
      }
    },
  };
};
