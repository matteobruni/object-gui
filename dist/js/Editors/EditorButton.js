"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorButton = void 0;
const EditorItem_1 = require("./EditorItem");
class EditorButton extends EditorItem_1.EditorItem {
    constructor(data, name, label, click) {
        super(data);
        this.name = name;
        this.label = label;
        this.element.id = `button_${name}`;
        this.element.innerText = label;
        this.element.addEventListener("click", () => click());
    }
    createElement() {
        return document.createElement("button");
    }
}
exports.EditorButton = EditorButton;
