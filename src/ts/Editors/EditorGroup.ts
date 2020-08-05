import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";
import { EditorStringInput } from "./EditorStringInput";
import { EditorNumberInput } from "./EditorNumberInput";
import { EditorCheckboxInput } from "./EditorCheckboxInput";
import { EditorSelectInput } from "./EditorSelectInput";
import { EditorColorInput } from "./EditorColorInput";
import { SingleOrMultiple } from "../Types/SingleOrMultiple";

export class EditorGroup extends EditorItem {
    public readonly children: EditorItem[];
    private readonly childrenGroup: HTMLElement;
    private readonly collapseButton: HTMLButtonElement;

    constructor(
        data: unknown,
        public readonly name: string,
        private readonly title: string,
        private collapsed: boolean,
        parent: HTMLElement
    ) {
        super(data);

        this.children = [];

        this.element.id = name;

        this.element.classList.add("editor", "editor-group");

        const divTitle = document.createElement("div");

        divTitle.classList.add("editor-item-title");

        const divName = document.createElement("div");

        divName.classList.add("editor-item-name");

        const b = document.createElement("b");

        b.textContent = title;

        divName.append(b);
        divTitle.append(divName);

        const divCollapse = document.createElement("div");

        divCollapse.classList.add("editor-button-collapse");

        this.collapseButton = document.createElement("button");

        this.collapseButton.type = "button";

        this.collapseButton.addEventListener("click", () => {
            this.toggleCollapse();
        });

        divCollapse.append(this.collapseButton);
        divTitle.append(divCollapse);

        this.element.append(divTitle);

        this.childrenGroup = document.createElement("div");

        this.childrenGroup.classList.add("group-content");

        this.element.append(this.childrenGroup);

        parent.append(this.element);

        this.setCollapse();
    }

    protected createElement(): HTMLElement {
        return document.createElement("div");
    }

    public addGroup(name: string, title: string, collapsed = true): EditorGroup {
        return new EditorGroup(this.data, `${this.name}_${name}`, title, collapsed, this.childrenGroup);
    }

    public addProperty(
        name: string,
        label: string,
        value: SingleOrMultiple<number | string | boolean | undefined | null>,
        type: string,
        change: (value: number | string | boolean) => void
    ): EditorItem {
        const divGroup = document.createElement("div");

        divGroup.classList.add("editor-element");

        const htmlLabel = document.createElement("label");

        htmlLabel.textContent = label;

        divGroup.append(htmlLabel);

        let item: EditorItem;
        const inputName = `${this.name}_${name}`;

        switch (type) {
            case "number":
                item = new EditorNumberInput(this.data, inputName, label, value as number, change);
                break;
            case "boolean":
                item = new EditorCheckboxInput(this.data, inputName, label, value as boolean, change);
                break;
            case "color":
                item = new EditorColorInput(this.data, inputName, label, value as string, change);
                break;
            // case "range":
            //    break;
            case "select":
                item = new EditorSelectInput(this.data, inputName, label, value as string, change);
                break;
            default:
                item = new EditorStringInput(this.data, inputName, label, value as string, change);
        }

        if (value === undefined) {
            (item.element as HTMLInputElement).value = "";
        }

        divGroup.append(item.element);

        this.childrenGroup.append(divGroup);

        return item;
    }

    public addButton(name: string, label: string, click: () => void): void {
        const button = new EditorButton(this.data, `${this.name}_${name}`, label, click);

        this.childrenGroup.append(button.element);
    }

    private setCollapse(): void {
        if (this.collapsed) {
            this.childrenGroup.style.display = "none";
        } else {
            this.childrenGroup.style.display = "block";
        }

        if (this.collapsed) {
            this.collapseButton.textContent = "Expand";
        } else {
            this.collapseButton.textContent = "Collapse";
        }
    }

    public toggleCollapse(): void {
        this.collapsed = !this.collapsed;

        this.setCollapse();
    }
}
