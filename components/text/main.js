import { componentSetup, applyStyleSet } from "../lib/component.js";

let document;

export const handler = (args) => {
  document = args.shadowDom;
  textElem = document.getElementById("text");
  componentSetup(args, funcs, component);
  component.run.styleSet("default");
};

let textElem;

export const component = {};

const funcs = {
  text: (text) => {
    textElem.innerText = text;
  },
  element: (element) => {
    if (element.innerText) funcs.text(element.innerText);
  },
  styleSet: (name) => {
    applyStyleSet(styleSets[name], component);
  },
};

const styleSets = {
  button: {
    letterSpacing: "1px",
    fontWeight: "600",
    textTransform: "uppercase",
    userSelect: "none",
    fontSize: "0.875rem",
    lineHeight: "1.75",
  },

  default: {
    letterSpacing: "unset",
    fontWeight: "unset",
    textTransform: "unset",
    userSelect: "unset",
    fontSize: "unset",
    lineHeight: "unset",
  },
};
