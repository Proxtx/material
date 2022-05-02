import { componentSetup } from "../lib/component.js";
import { wave } from "../lib/effects.js";

let document;
let mainDoc;

export const handler = async (options) => {
  document = options.shadowDom;
  mainDoc = options.document;
  await init();
  componentSetup(options, funcs, component);
  textComponent.run.styleSet("button");
};

let textElem;
let button;
let textComponent;

const init = async () => {
  button = document.getElementById("button");
  textElem = document.getElementById("text");
  await uiBuilder.ready(textElem);
  textComponent = textElem.component.component;

  button.addEventListener("click", (e) => {
    let computedStyle = window.getComputedStyle(button);
    wave(
      button,
      e.clientX - computedStyle.marginLeft.split("px")[0],
      e.clientY - computedStyle.marginTop.split("px")[0]
    );
  });
};

export let component = {};

let funcs = {
  text: (text) => {
    textComponent.values.text = text;
  },
  element: async (element) => {
    funcs.text(element.innerText);
  },
};
