import { componentSetup } from "../lib/component.js";
import { wave, waveListener } from "../lib/effects.js";

export class Component {
  shadowDom;
  textElem;
  button;
  textComponent;
  type = "contained";
  colors;
  component = {};

  funcs = {
    text: (text) => {
      this.textComponent.values.text = text;
    },
    type: (newType) => {
      this.type = newType;
      this.applyType(this.type, this.button, this.typeClasses);
    },
  };

  typeClasses = {
    contained: ["contained", "hoverShadow", "overwrite"],
    text: ["text", "overwrite"],
    outlined: ["text", "outlined", "overwrite"],
  };

  constructor(options) {
    return (async () => {
      this.shadowDom = options.shadowDom;

      this.button = this.shadowDom.getElementById("button");
      this.textElem = this.shadowDom.getElementById("text");

      await uiBuilder.ready(this.textElem);

      this.textComponent = this.textElem.component.component;
      this.textComponent.run.styleSet("button");

      this.button.addEventListener("click", (e) =>
        waveListener(e, this.button, this.colors.wave[this.type])
      );
      this.applyType(this.type, this.button, this.typeClasses);

      componentSetup(options, this.funcs, this.component);

      this.updateColors();

      return this;
    })();
  }

  applyType = () => {
    let classes = this.typeClasses[this.type];
    this.button.className = classes.join(" ");
  };

  updateColors = () => {
    this.colors = {
      wave: {
        text: this.component.style.accentColor,
        contained: this.component.style.backgroundColor,
        outlined: this.component.style.accentColor,
      },
    };
  };
}
