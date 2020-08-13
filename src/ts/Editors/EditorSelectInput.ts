import { EditorInputBase } from "./EditorInputBase";

export class EditorSelectInput extends EditorInputBase {
    constructor(data: unknown, id: string, name: string, value?: string, autoMap = true) {
        super(
            data,
            () => document.createElement("select"),
            id,
            name,
            () => "",
            (self: EditorInputBase) => {
                const select = self.element as HTMLSelectElement;

                return select.value;
            },
            (self: EditorInputBase, value: unknown) => {
                const select = self.element as HTMLSelectElement;

                select.value = value as string;
            },
            value,
            autoMap
        );

        const select = this.element as HTMLSelectElement;

        select.addEventListener("change", () => {
            this.changeEventHandler();
        });
    }

    public addItem(value: string, text?: string, group?: string): EditorInputBase {
        const select = this.element as HTMLSelectElement;
        const item = document.createElement("option");
        const groupElement = select.querySelector(`[label=${group}]`);

        item.value = value;
        item.text = text ?? value;
        item.selected = this.value === value;

        (groupElement ?? select).append(item);

        return this;
    }

    public addItems(values: { value: string; text?: string; group?: string }[]): EditorInputBase {
        for (const value of values) {
            this.addItem(value.value, value.text, value.group);
        }

        return this;
    }

    public addItemGroup(name: string): EditorInputBase {
        const select = this.element as HTMLSelectElement;
        const group = document.createElement("optgroup");

        group.label = name;

        select.append(group);

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
