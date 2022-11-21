export const wave = (elem, x, y, color) => {
  let waveElem = document.createElement("div");
  waveElem.className = "wave";
  waveElem.style.left = x + "px";
  waveElem.style.top = y + "px";
  waveElem.style.backgroundColor = color;
  elem.appendChild(waveElem);
  document.addEventListener(
    "mouseup",
    async () => {
      waveElem.style.opacity = 0;
      await new Promise((r) => setTimeout(r, 5000));
      elem.removeChild(waveElem);
    },
    { once: true }
  );
};

export const waveListener = (e, elem, color) => {
  let bounds = elem.getBoundingClientRect();
  wave(elem, e.clientX - bounds.left, e.clientY - bounds.top, color);
};

export const waveListenerCenter = (e, elem, color) => {
  let bounds = elem.getBoundingClientRect();
  wave(elem, bounds.width / 2, bounds.height / 2, color);
};
