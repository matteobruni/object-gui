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

    private constructor(
        data: unknown,
        public readonly name: string,
        private readonly title: string,
        parent: HTMLElement,
        collapsed: boolean,
        themeSelect?: HTMLSelectElement
    ) {
        super(data);

        this.collapsed = collapsed;
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

        if (themeSelect) {
            const divTheme = document.createElement("div");

            divTheme.classList.add("editor-button-theme");

            divTheme.append(themeSelect);

            divTitle.append(divTheme);
        }

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

    public static createRoot(
        name: string,
        title: string,
        data: unknown,
        parent: HTMLElement,
        themeSelect: HTMLSelectElement
    ): EditorGroup {
        return new EditorGroup(data, `${this.name}_${name}`, title, parent, false, themeSelect);
    }

    public addGroup(name: string, title: string, collapsed = true): EditorGroup {
        const subGroup = new EditorGroup(this.data, `${this.name}_${name}`, title, this.childrenGroup, collapsed);

        this.children.push(subGroup);

        return subGroup;
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

        this.children.push(item);

        if (value === undefined) {
            (item.element as HTMLInputElement).value = "";
        }

        divGroup.append(item.element);

        this.childrenGroup.append(divGroup);

        return item;
    }

    public addButton(name: string, label: string, click: () => void): void {
        const button = new EditorButton(this.data, `${this.name}_${name}`, label, click);

        this.children.push(button);

        this.childrenGroup.append(button.element);
    }

    public toggleCollapse(): void {
        this.updateCollapse(!this.collapsed);
    }

    public updateCollapse(collapsed: boolean): void {
        super.updateCollapse(collapsed);

        this.setCollapse();
    }

    protected createElement(): HTMLElement {
        return document.createElement("div");
    }

    private setCollapse(): void {
        if (this.collapsed) {
            this.childrenGroup.style.display = "none";
            this.collapseButton.textContent = "Expand";
        } else {
            this.childrenGroup.style.display = "block";
            this.collapseButton.textContent = "Collapse";
        }

        for (const child of this.children) {
            child.updateCollapse(this.collapsed);
        }
    }
}
