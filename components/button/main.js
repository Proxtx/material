import { componentSetup } from "../lib/component.js";
import { wave } from "../lib/effects.js";

export class Component {
  shadowDom;
  textElem;
  button;
  textComponent;
  type = "contained";
  colors;

  constructor(options) {
    return new Promise(async (r) => {
      this.shadowDom = options.shadowDom;

      this.button = this.shadowDom.getElementById("button");
      this.textElem = this.shadowDom.getElementById("text");

      await uiBuilder.ready(this.textElem);

      this.textComponent = this.textElem.component.component;
      this.textComponent.run.styleSet("button");

      this.button.addEventListener("click", this.waveListener);
      this.applyType(this.type, this.button, this.typeClasses);

      componentSetup(options, this.funcs, this.component);

      this.updateColors();

      r();
    });
  }

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
    contained: ["contained", "hoverShadow"],
    text: ["text"],
  };

  applyType = () => {
    let classes = this.typeClasses[this.type];
    this.button.className = classes.join(" ");
  };

  updateColors = () => {
    this.colors = {
      wave: {
        text: this.component.style.accentColor,
        contained: this.component.style.backgroundColor,
      },
    };
  };

  waveListener = (e) => {
    let bounds = this.button.getBoundingClientRect();
    wave(
      this.button,
      e.clientX - bounds.left,
      e.clientY - bounds.top,
      this.colors.wave[this.type]
    );
  };
}
