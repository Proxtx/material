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
        return document.documentElement.style.getPropertyValue("--" + p);
      },

      set: (target, p, value) => {
        return (
          document.documentElement.style.setProperty("--" + p, value) ||
          value ||
          true
        );
      },
    }
  );

  component.style = style;

  for (let i of options.component.attributes) {
    console.log(i);
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
