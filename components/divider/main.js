import {
  componentSetup,
  attributeChangedCallbackGen,
  applyType,
} from "../lib/component.js";

export class Component {
  component = {};
  funcs = {
    type: (type) => {
      this.type = type;
      this.applyType();
    },
  };
  type = "horizontal";
  typeClasses = {
    vertical: {
      vertical: true,
    },
    horizontal: {
      horizontal: true,
    },
  };
  options;
  shadowDom;
  attributeChangedCallback = attributeChangedCallbackGen(this.funcs);

  constructor(options) {
    this.options = options;
    this.shadowDom = options.shadowDom;
    this.divider = this.shadowDom.getElementById("divider");
    componentSetup(options, this.funcs, this.component);
    this.applyType();
  }

  applyType = () => {
    applyType(this.type, this.divider, this.typeClasses);
  };
}
