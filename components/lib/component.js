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
        return getComputedStyle(options.component).getPropertyValue("--" + p);
      },

      set: (target, p, value) => {
        return (
          options.component.style.setProperty("--" + p, value) || value || true
        );
      },
    }
  );

  component.style = style;
  component.findAndApplyCascadingVars = () => {
    component.cascadeVars = [];

    for (let i = 0; i < options.component.style.length; i++) {
      let attribute = options.component.style[i];
      component.cascadeVars.push(attribute);
      let children = getAllChildren(options.shadowDom);
      for (let child of children) {
        if (customElements.get(child.tagName.toLowerCase())) {
          child.style.setProperty(attribute, style[attribute.substring(2)]);

          if (child.component?.findAndApplyCascadingVars) {
            child.component.findAndApplyCascadingVars();
          }
        }
      }
    }

    for (let sheet of options.component.ownerDocument.styleSheets) {
      for (let rule of sheet.cssRules) {
        if (
          rule.selectorText != ":host" &&
          rule.selectorText != ":root" &&
          options.component.matches(rule.selectorText)
        ) {
          for (let styleChange of rule.style) {
            if (
              styleChange.substring(0, 2) == "--" &&
              style[styleChange.substring(2)] ==
                rule.style.getPropertyValue(styleChange)
            ) {
              component.cascadeVars.push(styleChange);

              let children = getAllChildren(options.shadowDom);

              if (rule.style.getPropertyValue(styleChange) == " red")
                console.log(children);

              for (let child of children) {
                if (customElements.get(child.tagName.toLowerCase())) {
                  child.style.setProperty(
                    styleChange,
                    style[styleChange.substring(2)]
                  );

                  if (child.component?.findAndApplyCascadingVars) {
                    child.component.findAndApplyCascadingVars();
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  component.findAndApplyCascadingVars();

  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutationRecord) => {
      component.findAndApplyCascadingVars();
    });
  });

  observer.observe(options.component, {
    attributes: true,
    attributeFilter: ["style"],
  });

  for (let i of options.component.attributes) {
    try {
      component.run[i.name]?.(genAttributeFromString(i.value));
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

export const attributeChangedCallbackGen = (funcs) => {
  return (name, oldValue, newValue) => {
    newValue = genAttributeFromString(newValue);
    funcs[name]?.(newValue);
  };
};

const genAttributeFromString = (string) => {
  try {
    string = JSON.parse(string);
  } catch {}
  return string;
};

export const addCustomEventManager = (targetElement, source, listenFor) => {
  for (let i of listenFor) {
    source.addEventListener(i, (e) => {
      let E = new e.constructor(e.type, e);
      targetElement.dispatchEvent(E);
    });
  }
};

export const applyType = (type, elem, typeClasses) => {
  let classes = typeClasses[type];
  elem.className = objectKeysToArray({
    ...classes,
    ...typeClasses.global,
  }).join(" ");
};

const objectKeysToArray = (obj) => {
  let arr = [];
  for (let i of Object.keys(obj)) {
    if (obj[i]) arr.push(i);
  }
  return arr;
};

export const getAllChildren = (elem) => {
  if (!elem.children) return [];
  let children = [];
  for (let child of elem.children) {
    children.push(child);
    children = children.concat(getAllChildren(child));
  }
  if (elem.assignedElements)
    for (let child of elem.assignedElements()) {
      children.push(child);
      children = children.concat(getAllChildren(child));
    }

  return children;
};
