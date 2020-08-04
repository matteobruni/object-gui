"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorNumberInput = void 0;
const EditorItem_1 = require("./EditorItem");
class EditorNumberInput extends EditorItem_1.EditorItem {
    constructor(data, name, label, value, change) {
        super(data);
        this.name = name;
        this.label = label;
        this.value = value;
        this.change = change;
        const input = this.element;
        input.id = `input_${this.name}`;
        input.value = value === null || value === void 0 ? void 0 : value.toString();
        input.addEventListener("change", () => {
            this.value = parseFloat(this.element.value);
            this.change(this.value);
        });
    }
    createElement() {
        const element = document.createElement("input");
        element.setAttribute("type", "number");
        return element;
    }
    step(step) {
        this.element.step = step.toString(10);
        return this;
    }
    min(min) {
        this.element.min = min.toString(10);
        return this;
    }
    max(max) {
        this.element.max = max.toString(10);
        return this;
    }
}
exports.EditorNumberInput = EditorNumberInput;
