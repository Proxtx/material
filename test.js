import { loadPack } from "/node_modules/@proxtx/uibuilder/main.js";

loadPack("/components/pack.json");

/*document.body.addEventListener("mousemove", (e) => {
  let d = document.createElement("div");
  d.style.width = "5px";
  d.style.height = "5px";
  d.style.backgroundColor = "red";
  d.style.position = "absolute";
  d.style.left = e.clientX + "px";
  d.style.top = e.clientY + "px";
  document.body.appendChild(d);
  setTimeout(() => {
    document.body.removeChild(d);
  }, 200);
  //wave(button, e.clientX, e.clientY);
});*/
