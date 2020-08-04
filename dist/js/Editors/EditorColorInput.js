"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorColorInput = void 0;
const EditorItem_1 = require("./EditorItem");
const ColorUtils_1 = require("../Utils/ColorUtils");
class EditorColorInput extends EditorItem_1.EditorItem {
    constructor(data, name, label, value, change) {
        super(data);
        this.name = name;
        this.label = label;
        this.value = value;
        this.change = change;
        const input = this.element;
        input.id = `input_${this.name}`;
        input.value = this.value;
        this.updateStyle(input.value);
        input.addEventListener("change", () => {
            this.value = this.element.value;
            this.change(this.value);
            this.updateStyle(this.value);
        });
    }
    createElement() {
        const element = document.createElement("input");
        element.setAttribute("type", "text");
        return element;
    }
    updateStyle(bgColor) {
        this.element.style.backgroundColor = bgColor;
        const textColor = this.textColor(bgColor);
        if (textColor !== undefined) {
            this.element.style.color = textColor;
        }
    }
    textColor(value) {
        if (value === undefined) {
            return undefined;
        }
        const rgb = ColorUtils_1.ColorUtils.stringToRgb(value);
        if (!rgb) {
            return undefined;
        }
        const color = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
        return color > 125 ? "#000" : "#fff";
    }
}
exports.EditorColorInput = EditorColorInput;
