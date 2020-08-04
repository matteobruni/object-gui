import { EditorContainer } from "./Editors";

export class Editor {
    public readonly container: EditorContainer;

    constructor(id: string, name: string, data: unknown) {
        this.container = new EditorContainer(data, `${id}_editor`, `${name} Editor`, false, document.body);

        this.container.element.classList.add("editor-root");

        this.customize();
    }

    public top(): Editor {
        this.container.element.classList.add("top");

        return this;
    }

    public bottom(): Editor {
        this.container.element.classList.add("bottom");

        return this;
    }

    public left(): Editor {
        this.container.element.classList.add("left");

        return this;
    }

    public right(): Editor {
        this.container.element.classList.add("right");

        return this;
    }

    public theme(theme: string) {
        this.container.element.classList.add(`editor-${theme}`);
    }

    protected customize() {
        // override this method to add properties
    }
}
