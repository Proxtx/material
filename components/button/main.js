import { componentSetup } from "../lib/component.js";
import { wave } from "../lib/effects.js";

let document;
let mainDoc;

export const handler = async (options) => {
  document = options.shadowDom;
  mainDoc = options.document;
  await init();
  componentSetup(options, funcs, component);
  colors = {
    wave: {
      text: component.style.accentColor,
      contained: component.style.backgroundColor,
    },
  };
  console.log(component);
  textComponent.run.styleSet("button");
};

let textElem;
let button;
let textComponent;
let type;
let colors;

const init = async () => {
  button = document.getElementById("button");
  textElem = document.getElementById("text");
  await uiBuilder.ready(textElem);
  textComponent = textElem.component.component;
  type = button.class;

  button.addEventListener("click", (e) => {
    let computedStyle = window.getComputedStyle(button);
    wave(
      button,
      e.clientX - computedStyle.marginLeft.split("px")[0],
      e.clientY - computedStyle.marginTop.split("px")[0],
      colors.wave[type]
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
