import {
  componentSetup,
  attributeChangedCallbackGen,
} from "../lib/component.js";
import { waveListener } from "../lib/effects.js";

export class Component {
  component = {};
  funcs = {
    wave: (enabled) => {
      this.wave = enabled;
    },
    padding: (padding) => {
      this.component.style.padding =
        padding === true || padding === false ? (padding ? 1 : 0) : padding;
    },
  };
  options;
  shadowDom;
  card;
  wave = false;
  attributeChangedCallback = attributeChangedCallbackGen(this.funcs);

  constructor(options) {
    this.options = options;
    this.shadowDom = options.shadowDom;
    componentSetup(options, this.funcs, this.component);
    this.card = this.shadowDom.getElementById("card");
    this.card.addEventListener("mousedown", (e) => {
      this.wave && waveListener(e, this.card, this.component.style.accentColor);
    });
  }
}
