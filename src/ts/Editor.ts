import { EditorGroup } from "./Editors";

export class Editor {
    public readonly root: EditorGroup;

    constructor(id: string, name: string, data: unknown) {
        this.root = new EditorGroup(data, `${id}_editor`, `${name} Editor`, false, document.body);

        this.root.element.classList.add("editor-root");

        this.customize();
    }

    public top(): Editor {
        this.root.element.classList.add("editor-top");

        return this;
    }

    public bottom(): Editor {
        this.root.element.classList.add("editor-bottom");

        return this;
    }

    public left(): Editor {
        this.root.element.classList.add("editor-left");

        return this;
    }

    public right(): Editor {
        this.root.element.classList.add("editor-right");

        return this;
    }

    public theme(theme: string): void {
        this.root.element.classList.add(`editor-${theme}`);
    }

    protected customize(): void {
        // override this method to add properties
    }
}
