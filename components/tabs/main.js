import {
  componentSetup,
  attributeChangedCallbackGen,
} from "../lib/component.js";

export class Component {
  component = {};
  funcs = {};
  tabs = [];
  activeTab;
  options;
  shadowDom;
  attributeChangedCallback = attributeChangedCallbackGen(this.funcs);

  constructor(options) {
    this.options = options;
    this.shadowDom = options.shadowDom;
    this.tabsElem = this.shadowDom.getElementById("tabs");
    this.tabsContainer = this.shadowDom.getElementById("tabsContainer");
    this.highlighter = this.shadowDom.getElementById("highlighter");
    this.content = this.shadowDom.getElementById("content");
    componentSetup(options, this.funcs, this.component);

    this.generateTabs().then(async () => {
      let d = document.createElement("div");
      d.style.transition = this.component.style.transitionTime;
      this.shadowDom.appendChild(d);
      let duration =
        getComputedStyle(d).transitionDuration.split("s")[0] * 1000;
      this.shadowDom.removeChild(d);
      await new Promise((r) => setTimeout(r, duration));
      this.focusTab(this.tabs[0]);
    });
  }

  addTab = async (tabElem) => {
    let tab = {
      tab: tabElem,
      index: this.tabsElem.childElementCount,
    };
    let title = this.generateTitle(tabElem.component.name);
    this.tabsElem.appendChild(title);
    tab.title = title;
    await uiBuilder.ready(title);
    this.tabs.push(tab);
    this.unfocusTab(tab);
    title.addEventListener("click", () => {
      this.focusTab(tab);
    });
  };

  focusTab = (tab) => {
    let transitionTime = tab.tab.style.transition;
    tab.tab.style.transition = "0s";

    if (this.activeTab && this.activeTab != tab) {
      this.unfocusTab(this.activeTab);

      this.activeTab.tab.style.left =
        (this.activeTab.index < tab.index ? "-" : "") + "100%";
      tab.tab.style.left =
        (this.activeTab.index > tab.index ? "-" : "") + "100%";
    }

    tab.tab.style.transition = transitionTime;
    tab.tab.style.left = "0";

    this.activeTab = tab;
    tab.title.component.textElem.component.textElem.style.color =
      "var(--accentColor)";
    let computedStyle = getComputedStyle(tab.title);
    this.highlighter.style.width = computedStyle.width;
    this.highlighter.style.left = tab.title.offsetLeft + "px";
  };

  unfocusTab = (tab) => {
    tab.title.component.textElem.component.textElem.style.color =
      "var(--greyText)";
  };

  generateTitle = (name) => {
    let button = document.createElement("m-button");
    button.setAttribute("type", "text");
    button.innerText = name;
    uiBuilder.ready(button).then(() => {
      button.component.button.style.margin = "0";
      button.component.button.style.borderRadius = "0";
      button.component.button.style.height = "100%";
    });
    return button;
  };

  generateTabs = async () => {
    for (let i of this.tabsContainer.assignedElements()) {
      await uiBuilder.ready(i);
      await this.addTab(i);
    }
  };
}
