"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContainer = void 0;
const EditorItem_1 = require("./EditorItem");
const EditorButton_1 = require("./EditorButton");
const EditorStringInput_1 = require("./EditorStringInput");
const EditorNumberInput_1 = require("./EditorNumberInput");
const EditorCheckboxInput_1 = require("./EditorCheckboxInput");
const EditorSelectInput_1 = require("./EditorSelectInput");
const EditorColorInput_1 = require("./EditorColorInput");
class EditorContainer extends EditorItem_1.EditorItem {
    constructor(data, name, title, collapsed, parent) {
        super(data);
        this.name = name;
        this.title = title;
        this.collapsed = collapsed;
        this.children = [];
        this.element.id = name;
        this.element.classList.add("editor", "container");
        const divTitle = document.createElement("div");
        divTitle.classList.add("title");
        const divName = document.createElement("div");
        divName.classList.add("name");
        const b = document.createElement("b");
        b.textContent = title;
        divName.append(b);
        divTitle.append(divName);
        const divCollapse = document.createElement("div");
        divCollapse.classList.add("collapse");
        this.collapseButton = document.createElement("button");
        this.collapseButton.type = "button";
        this.collapseButton.addEventListener("click", () => {
            this.toggleCollapse();
        });
        divCollapse.append(this.collapseButton);
        divTitle.append(divCollapse);
        this.element.append(divTitle);
        this.childrenContainer = document.createElement("div");
        this.childrenContainer.classList.add("container-content");
        this.element.append(this.childrenContainer);
        parent.append(this.element);
        this.setCollapse();
    }
    createElement() {
        return document.createElement("div");
    }
    addContainer(name, title, collapsed = true) {
        return new EditorContainer(this.data, `${this.name}_${name}`, title, collapsed, this.childrenContainer);
    }
    addProperty(name, label, value, type, change) {
        const divContainer = document.createElement("div");
        divContainer.classList.add("element");
        const htmlLabel = document.createElement("label");
        htmlLabel.textContent = label;
        divContainer.append(htmlLabel);
        let item;
        const inputName = `${this.name}_${name}`;
        switch (type) {
            case "number":
                item = new EditorNumberInput_1.EditorNumberInput(this.data, inputName, label, value, change);
                break;
            case "boolean":
                item = new EditorCheckboxInput_1.EditorCheckboxInput(this.data, inputName, label, value, change);
                break;
            case "color":
                item = new EditorColorInput_1.EditorColorInput(this.data, inputName, label, value, change);
                break;
            case "select":
                item = new EditorSelectInput_1.EditorSelectInput(this.data, inputName, label, value, change);
                break;
            default:
                item = new EditorStringInput_1.EditorStringInput(this.data, inputName, label, value, change);
        }
        if (value === undefined) {
            item.element.value = "";
        }
        divContainer.append(item.element);
        this.childrenContainer.append(divContainer);
        return item;
    }
    addButton(name, label, click) {
        const button = new EditorButton_1.EditorButton(this.data, `${this.name}_${name}`, label, click);
        this.childrenContainer.append(button.element);
    }
    setCollapse() {
        if (this.collapsed) {
            this.childrenContainer.style.display = "none";
        }
        else {
            this.childrenContainer.style.display = "block";
        }
        if (this.collapsed) {
            this.collapseButton.textContent = "Expand";
        }
        else {
            this.collapseButton.textContent = "Collapse";
        }
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.setCollapse();
    }
}
exports.EditorContainer = EditorContainer;
