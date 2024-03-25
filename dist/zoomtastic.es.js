let l = !1, r = !1, a, c, t;
const n = { config: {} };
n.mount = function(i = {}) {
  const e = document.getElementById("zoomtastic-container");
  e && e.remove(), n.config.size = i.size || "95%", n.config.easing = i.easing || "ease", n.config.duration = i.duration || 300, n.config.background = i.background || "rgba(0, 0, 0, 0.9)", n.config.filter = i.filter || "drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))", n.config.animation = i.animation || "slide", a = f("zoomtastic-container", {
    top: "0",
    left: "0",
    width: "100%",
    height: "100dvh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "100dvh",
    cursor: "zoom-out",
    zIndex: "16777271",
    visibility: "hidden"
  }), c = f("zoomtastic-background", {
    width: "100%",
    height: "100%",
    zIndex: "0",
    opacity: "0",
    userSelect: "none",
    position: "absolute",
    background: n.config.background,
    transitionProperty: "opacity",
    transitionTimingFunction: n.config.easing,
    transitionDuration: parseInt(n.config.duration * 0.75) + "ms"
  }), t = f("zoomtastic-image", {
    width: n.config.size,
    height: n.config.size,
    opacity: "0",
    zIndex: "16777271",
    userSelect: "none",
    pointerEvents: "none",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transitionProperty: "all",
    transitionTimingFunction: n.config.easing,
    transitionDuration: parseInt(n.config.duration) + "ms",
    transform: "translateY(0) scale(1)",
    filter: n.config.filter
  }), n.config.animation === "slide" && (t.style.transform = "translateY(5%) scale(1)"), n.config.animation === "zoom" && (t.style.transform = "scale(0.95)"), n.config.animation === "drop" && (t.style.transform = "scale(1.1)"), a.addEventListener("click", () => {
    r || (r = !0, n.hide());
  }), a.appendChild(t), a.appendChild(c), document.body.appendChild(a), r = !1, l = !0;
};
n.listen = function(i = "[zoomtastic]", e = "src") {
  if (l || n.mount(), typeof i == "string" && (i = document.querySelectorAll(i)), i instanceof HTMLElement && (i = [i]), !!i)
    for (let o = 0; o < i.length; o++) {
      const s = i[o];
      s.style.cursor = "zoom-in", s.addEventListener("click", (m) => {
        m.preventDefault();
        const d = s.getAttribute(e);
        d && n.show(d);
      });
    }
};
n.show = function(i) {
  if (!i)
    throw new TypeError("URL is not specified");
  l || n.mount(), t.style.backgroundImage = `url("${encodeURI(i)}")`, a.style.visibility = "visible", setTimeout(() => {
    n.config.animation === "slide" && (t.style.transform = "translateY(0) scale(1)"), (n.config.animation === "zoom" || n.config.animation === "drop") && (t.style.transform = "translateY(0) scale(1)"), t.style.opacity = "1", c.style.opacity = "1", r = !1;
  });
};
n.hide = function() {
  l || n.mount(), setTimeout(() => {
    n.config.animation === "slide" && (t.style.transform = "translateY(5%) scale(1)"), n.config.animation === "zoom" && (t.style.transform = "translateY(0) scale(0.95)"), n.config.animation === "drop" && (t.style.transform = "translateY(0) scale(1.1)"), t.style.opacity = "0", c.style.opacity = "0";
  }), setTimeout(() => {
    t.style.backgroundImage = "none", a.style.visibility = "hidden", r = !1;
  }, parseInt(n.config.duration));
};
function f(i, e = {}) {
  const o = document.createElement("div");
  for (const s in e)
    o.style[s] = e[s];
  return o.id = i, o;
}
export {
  n as default
};
//# sourceMappingURL=zoomtastic.es.js.map
