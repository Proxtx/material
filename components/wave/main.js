import { componentSetup } from "../lib/component.js";
import { waveListener } from "../lib/effects.js";

export class Component {
  funcs = {};
  component = {};

  constructor(options) {
    this.options = options;
    componentSetup(options, this.funcs, this.component);
    this.div = this.options.shadowDom.getElementById("mainDiv");

    this.options.component.parentNode.addEventListener("mousedown", (e) => {
      waveListener(
        e,
        this.div,
        this.options.component.getAttribute("color")
          ? this.options.component.getAttribute("color")
          : this.component.style.accentColor
      );
    });
  }
}
