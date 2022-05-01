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
    wave(button, e.clientX - 5, e.clientY - 5);
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
