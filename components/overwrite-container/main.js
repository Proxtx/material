import { componentSetup } from "../lib/component.js";

export class Component {
  funcs = {};
  component = {};

  constructor(options) {
    this.options = options;
    componentSetup(options, this.funcs, this.component);
  }
}
