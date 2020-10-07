import { EditorInputBase } from "./EditorInputBase";

export class EditorStringInput extends EditorInputBase {
    constructor(data: unknown, id: string, name: string, value?: string, autoMap = true) {
        super(
            data,
            () => document.createElement("input"),
            id,
            name,
            () => "",
            (v: unknown) => v,
            (self: EditorInputBase) => {
                const inputEl = self.element as HTMLInputElement;

                return inputEl.value;
            },
            (self: EditorInputBase, v: unknown) => {
                const inputEl = self.element as HTMLInputElement;

                inputEl.value = v as string;
            },
            value,
            autoMap
        );

        const input = this.element as HTMLInputElement;

        input.type = "text";

        input.addEventListener("change", () => {
            this.changeEventHandler();
        });
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
