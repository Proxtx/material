import {
  componentSetup,
  attributeChangedCallbackGen,
} from "../lib/component.js";

export class Component {
  component = {};
  funcs = {
    name: (name) => {
      this.name = name;
    },
  };
  options;
  shadowDom;
  name;
  tab;
  attributeChangedCallback = attributeChangedCallbackGen(this.funcs);

  constructor(options) {
    this.options = options;
    this.shadowDom = options.shadowDom;
    this.tab = this.shadowDom.getElementById("tab");
    componentSetup(options, this.funcs, this.component);
  }
}
