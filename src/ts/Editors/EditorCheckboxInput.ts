import { EditorInputBase } from "./EditorInputBase";

export class EditorCheckboxInput extends EditorInputBase {
    constructor(data: unknown, id: string, name: string, value?: boolean, autoMap = true) {
        super(
            data,
            () => document.createElement("input"),
            id,
            name,
            () => false,
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
    }
}
