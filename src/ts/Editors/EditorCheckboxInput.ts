import { EditorItem } from "./EditorItem";

export class EditorCheckboxInput extends EditorItem {
    constructor(
        data: unknown,
        private readonly id: string,
        private readonly name: string,
        private value: boolean,
        private readonly change: (value: boolean) => void,
        autoSet = true
    ) {
        super(data);

        const input = this.element as HTMLInputElement;

        input.id = `input_${this.id}`;
        input.checked = this.value;
        input.type = "checkbox";

        input.addEventListener("change", () => {
            this.value = (this.element as HTMLInputElement).checked;

            if (autoSet) {
                const obj = data as Record<string, boolean>;

                if (Object.prototype.hasOwnProperty.call(obj, name)) {
                    obj[name] = this.value;
                }
            }

            this.change(this.value);
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("input");
    }
}
