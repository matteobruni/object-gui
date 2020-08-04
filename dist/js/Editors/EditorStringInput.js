"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorStringInput = void 0;
const EditorItem_1 = require("./EditorItem");
class EditorStringInput extends EditorItem_1.EditorItem {
    constructor(data, name, label, value, change) {
        super(data);
        this.name = name;
        this.label = label;
        this.value = value;
        this.change = change;
        const input = this.element;
        input.id = `input_${this.name}`;
        input.value = this.value;
        input.addEventListener("change", () => {
            this.value = this.element.value;
            this.change(this.value);
        });
    }
    createElement() {
        const element = document.createElement("input");
        element.setAttribute("type", "text");
        return element;
    }
}
exports.EditorStringInput = EditorStringInput;
