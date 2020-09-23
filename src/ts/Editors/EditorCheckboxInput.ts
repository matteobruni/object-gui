import { EditorInputBase } from "./EditorInputBase";

export class EditorCheckboxInput extends EditorInputBase {
    constructor(data: unknown, id: string, name: string, value?: boolean, autoMap = true) {
        super(
            data,
            () => document.createElement("input"),
            id,
            name,
            () => false,
            (value: unknown) => value,
            (self: EditorInputBase) => {
                const input = self.element as HTMLInputElement;

                return input.checked;
            },
            (self: EditorInputBase, value: unknown) => {
                const input = self.element as HTMLInputElement;

                input.checked = value as boolean;
            },
            value,
            autoMap
        );

        const input = this.element as HTMLInputElement;

        input.type = "checkbox";

        input.addEventListener("change", () => {
            this.changeEventHandler();
        });

        this.fullDom = document.createElement("div");

        this.fullDom.append(this.element);

        const spacer = document.createElement("div");

        spacer.classList.add("editor-spacer");

        this.fullDom.append(spacer);
    }

    public addItem(): EditorInputBase {
        return this;
    }

    public addItemGroup(): EditorInputBase {
        return this;
    }

    public addItems(): EditorInputBase {
        return this;
    }

    public max(): EditorInputBase {
        return this;
    }

    public min(): EditorInputBase {
        return this;
    }

    public step(): EditorInputBase {
        return this;
    }
}
