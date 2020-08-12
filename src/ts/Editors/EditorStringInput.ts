import { EditorInputBase } from "./EditorInputBase";

export class EditorStringInput extends EditorInputBase {
    constructor(data: unknown, id: string, name: string, value?: string, autoMap = true) {
        super(
            data,
            () => document.createElement("input"),
            id,
            name,
            () => "",
            (self: EditorInputBase) => {
                const input = self.element as HTMLInputElement;

                return input.value;
            },
            (self: EditorInputBase, value: unknown) => {
                const input = self.element as HTMLInputElement;

                input.value = value as string;
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
}
