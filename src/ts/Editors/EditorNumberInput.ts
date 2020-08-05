import { EditorItem } from "./EditorItem";

export class EditorNumberInput extends EditorItem {
    constructor(
        data: unknown,
        private readonly name: string,
        private readonly label: string,
        private value: number,
        private readonly change: (value: number) => void
    ) {
        super(data);

        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.value = value?.toString();

        input.setAttribute("type", "number");

        input.addEventListener("change", () => {
            this.value = parseFloat((this.element as HTMLInputElement).value);

            this.change(this.value);
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("input");
    }

    public step(step: number): EditorNumberInput {
        (this.element as HTMLInputElement).step = step.toString(10);

        return this;
    }

    public min(min: number): EditorNumberInput {
        (this.element as HTMLInputElement).min = min.toString(10);

        return this;
    }

    public max(max: number): EditorNumberInput {
        (this.element as HTMLInputElement).max = max.toString(10);

        return this;
    }
}
