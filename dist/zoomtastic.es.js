let mounted = false;
let locked = false;
let container;
let background;
let image;
const Zoomtastic = { config: {} };
Zoomtastic.mount = function(config = {}) {
  const existingContainer = document.getElementById("zoomtastic-container");
  if (existingContainer)
    existingContainer.remove();
  Zoomtastic.config.size = config.size || "95%";
  Zoomtastic.config.easing = config.easing || "ease";
  Zoomtastic.config.duration = config.duration || 300;
  Zoomtastic.config.background = config.background || "rgba(0, 0, 0, 0.9)";
  Zoomtastic.config.filter = config.filter || "drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))";
  Zoomtastic.config.animation = config.animation || "slide";
  container = createElement("zoomtastic-container", {
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
  });
  background = createElement("zoomtastic-background", {
    width: "100%",
    height: "100%",
    zIndex: "0",
    opacity: "0",
    userSelect: "none",
    position: "absolute",
    background: Zoomtastic.config.background,
    transitionProperty: "opacity",
    transitionTimingFunction: Zoomtastic.config.easing,
    transitionDuration: parseInt(Zoomtastic.config.duration * 0.75) + "ms"
  });
  image = createElement("zoomtastic-image", {
    width: Zoomtastic.config.size,
    height: Zoomtastic.config.size,
    opacity: "0",
    zIndex: "16777271",
    userSelect: "none",
    pointerEvents: "none",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transitionProperty: "all",
    transitionTimingFunction: Zoomtastic.config.easing,
    transitionDuration: parseInt(Zoomtastic.config.duration) + "ms",
    transform: "translateY(0) scale(1)",
    filter: Zoomtastic.config.filter
  });
  if (Zoomtastic.config.animation === "slide")
    image.style.transform = "translateY(5%) scale(1)";
  if (Zoomtastic.config.animation === "zoom")
    image.style.transform = "scale(0.95)";
  if (Zoomtastic.config.animation === "drop")
    image.style.transform = "scale(1.1)";
  container.addEventListener("click", () => {
    if (locked)
      return;
    locked = true;
    Zoomtastic.hide();
  });
  container.appendChild(image);
  container.appendChild(background);
  document.body.appendChild(container);
  locked = false;
  mounted = true;
};
Zoomtastic.listen = function(target = "[zoomtastic]", source = "src") {
  if (!mounted)
    Zoomtastic.mount();
  if (typeof target === "string")
    target = document.querySelectorAll(target);
  if (target instanceof HTMLElement)
    target = [target];
  if (!target)
    return;
  for (let i = 0; i < target.length; i++) {
    const element = target[i];
    element.style.cursor = "zoom-in";
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const url = element.getAttribute(source);
      if (url)
        Zoomtastic.show(url);
    });
  }
};
Zoomtastic.show = function(url) {
  if (!url)
    throw new TypeError("URL is not specified");
  if (!mounted)
    Zoomtastic.mount();
  image.style.backgroundImage = `url("${encodeURI(url)}")`;
  container.style.visibility = "visible";
  setTimeout(() => {
    if (Zoomtastic.config.animation === "slide")
      image.style.transform = "translateY(0) scale(1)";
    if (Zoomtastic.config.animation === "zoom" || Zoomtastic.config.animation === "drop")
      image.style.transform = "translateY(0) scale(1)";
    image.style.opacity = "1";
    background.style.opacity = "1";
    locked = false;
  });
};
Zoomtastic.hide = function() {
  if (!mounted)
    Zoomtastic.mount();
  setTimeout(() => {
    if (Zoomtastic.config.animation === "slide")
      image.style.transform = "translateY(5%) scale(1)";
    if (Zoomtastic.config.animation === "zoom")
      image.style.transform = "translateY(0) scale(0.95)";
    if (Zoomtastic.config.animation === "drop")
      image.style.transform = "translateY(0) scale(1.1)";
    image.style.opacity = "0";
    background.style.opacity = "0";
  });
  setTimeout(() => {
    image.style.backgroundImage = "none";
    container.style.visibility = "hidden";
    locked = false;
  }, parseInt(Zoomtastic.config.duration));
};
function createElement(id, styles = {}) {
  const element = document.createElement("div");
  for (const key in styles)
    element.style[key] = styles[key];
  element.id = id;
  return element;
}
export { Zoomtastic as default };
//# sourceMappingURL=zoomtastic.es.js.map
