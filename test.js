import { Parser } from "./node_modules/@proxtx/html/parser.js";
import { build } from "./node_modules/@proxtx/html/builder.js";
import { insertComponents } from "./node_modules/@proxtx/ui/componentHandler.js";
import { updateHtml } from "./node_modules/@proxtx/uicomposer/main.js";

let htmlCode = await (await fetch("./main.html")).text();
let pack = await (await fetch("./components/pack.json")).json();
pack.defaultSrc = "./components/";

let updatedHtml = build(updateHtml(htmlCode, Parser, pack));

const wrap = document.getElementById("wrap");
updatedHtml.forEach((v) => wrap.appendChild(v));

insertComponents();
