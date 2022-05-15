export const wave = (elem, x, y, color) => {
  let waveElem = document.createElement("div");
  waveElem.className = "wave";
  waveElem.style.left = x + "px";
  waveElem.style.top = y + "px";
  waveElem.style.backgroundColor = color;
  elem.appendChild(waveElem);
  setTimeout(() => {
    elem.removeChild(waveElem);
  }, 3000);
};
