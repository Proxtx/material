export const componentSetup = (options, funcs, componentExport) => {
  let component = componentExport;
  Object.assign(component, { run: funcs, document: options.shadowDom });
  let values = new Proxy(options, {
    get: (target, p) => {
      return target[p];
    },

    set: (target, p, value) => {
      target[p] = value;
      component.run[p](value);
      return value || true;
    },
  });

  component.values = values;

  let style = new Proxy(
    {},
    {
      get: (target, p) => {
        let targetStyle = findHostStyle(options.shadowDom);
        return targetStyle.getPropertyValue("--" + p);
      },

      set: (target, p, value) => {
        let targetStyle = findHostStyle(options.shadowDom);
        console.log("style set");
        return targetStyle.setProperty("--" + p, value) || value || true;
      },
    }
  );

  component.style = style;

  for (let i of options.component.attributes) {
    try {
      component.run[i.name] && component.run[i.name](i.value);
    } catch (e) {
      console.log(e);
    }
  }
};

export const applyStyleSet = (styleSet, component) => {
  for (let i of Object.keys(styleSet)) {
    component.style[i] = styleSet[i];
  }
};

const findHostStyle = (shadowDom) => {
  let targetStyle;
  for (let t of shadowDom.styleSheets) {
    for (let i of t.cssRules) {
      if (i.selectorText == ":host") targetStyle = i.style;
    }
  }

  return targetStyle;
};
