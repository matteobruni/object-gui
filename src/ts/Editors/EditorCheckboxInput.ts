import { EditorItem } from "./EditorItem";

export class EditorCheckboxInput extends EditorItem {
    constructor(
        data: unknown,
        private readonly name: string,
        private readonly label: string,
        private value: boolean,
        private readonly change: (value: boolean) => void
    ) {
        super(data);

        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.checked = this.value;
        input.type = "checkbox";

        input.addEventListener("change", () => {
            this.value = (this.element as HTMLInputElement).checked;

            this.change(this.value);
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("input");
    }
}
