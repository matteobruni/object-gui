import { EditorItem } from "./EditorItem";

export class EditorSelectInput extends EditorItem {
    constructor(
        data: unknown,
        private readonly id: string,
        private readonly name: string,
        private value: string,
        private readonly change?: (value: string) => void,
        private readonly autoSet = true
    ) {
        super(data);

        const select = this.element as HTMLSelectElement;

        select.id = `input_${this.id}`;

        select.addEventListener("change", () => {
            this.value = (this.element as HTMLInputElement).value;

            if (autoSet) {
                const obj = data as Record<string, string>;

                if (Object.prototype.hasOwnProperty.call(obj, name)) {
                    obj[name] = this.value;
                }
            }

            if (change) {
                change(this.value);
            }
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("select");
    }

    public addItem(value: string, text?: string, group?: string): void {
        const select = this.element as HTMLSelectElement;
        const item = document.createElement("option");
        const groupElement = select.querySelector(`[label=${group}]`);

        item.value = value;
        item.text = text ?? value;
        item.selected = this.value === value;

        (groupElement ?? select).append(item);
    }

    public addItemGroup(name: string): void {
        const select = this.element as HTMLSelectElement;
        const group = document.createElement("optgroup");

        group.label = name;

        select.append(group);
    }
}
