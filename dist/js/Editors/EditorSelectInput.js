"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorSelectInput = void 0;
const EditorItem_1 = require("./EditorItem");
class EditorSelectInput extends EditorItem_1.EditorItem {
    constructor(data, name, label, value, change) {
        super(data);
        this.name = name;
        this.label = label;
        this.value = value;
        this.change = change;
        const select = this.element;
        select.id = `input_${this.name}`;
        select.addEventListener("change", () => {
            this.value = this.element.value;
            this.change(this.value);
        });
    }
    createElement() {
        return document.createElement("select");
    }
    addItem(value, text, group) {
        const select = this.element;
        const item = document.createElement("option");
        const groupElement = select.querySelector(`[label=${group}]`);
        item.value = value;
        item.text = text !== null && text !== void 0 ? text : value;
        item.selected = this.value === value;
        (groupElement !== null && groupElement !== void 0 ? groupElement : select).append(item);
    }
    addItemGroup(name) {
        const select = this.element;
        const group = document.createElement("optgroup");
        group.label = name;
        select.append(group);
    }
}
exports.EditorSelectInput = EditorSelectInput;
