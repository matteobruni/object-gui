"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const EditorContainer_1 = require("./Editors/EditorContainer");
class Editor {
    constructor(id, name, data) {
        this.container = new EditorContainer_1.EditorContainer(data, `${id}_editor`, `${name} Editor`, false, document.body);
        this.container.element.classList.add("editor-root");
        this.customize();
    }
    top() {
        this.container.element.classList.add("top");
        return this;
    }
    bottom() {
        this.container.element.classList.add("bottom");
        return this;
    }
    left() {
        this.container.element.classList.add("left");
        return this;
    }
    right() {
        this.container.element.classList.add("right");
        return this;
    }
    theme(theme) {
        this.container.element.classList.add(`editor-${theme}`);
    }
    customize() {
    }
}
exports.Editor = Editor;
