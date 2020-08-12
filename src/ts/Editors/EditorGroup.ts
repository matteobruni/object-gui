import { EditorItem } from "./EditorItem";
import { EditorButton } from "./EditorButton";
import { EditorStringInput } from "./EditorStringInput";
import { EditorNumberInput } from "./EditorNumberInput";
import { EditorCheckboxInput } from "./EditorCheckboxInput";
import { EditorSelectInput } from "./EditorSelectInput";
import { EditorColorInput } from "./EditorColorInput";
import { SingleOrMultiple } from "../Types";
import { EditorInputBase } from "./EditorInputBase";
import { EditorType } from "../Enums";

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
        super(data, () => document.createElement("div"));

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

    public addGroup(name: string, title: string, collapsed = true, customData?: unknown): EditorGroup {
        let data = customData ?? this.data;

        if (!customData) {
            data = (data as Record<string, unknown>)[name];
        }

        const subGroup = new EditorGroup(data, `${this.name}_${name}`, title, this.childrenGroup, collapsed);

        this.children.push(subGroup);

        return subGroup;
    }

    public addProperty<T>(
        name: string,
        label: string,
        type: EditorType,
        value?: SingleOrMultiple<number | string | boolean | undefined | null>,
        autoMap = true
    ): EditorInputBase {
        const divGroup = document.createElement("div");

        divGroup.classList.add("editor-element");

        const htmlLabel = document.createElement("label");

        htmlLabel.textContent = label;

        divGroup.append(htmlLabel);

        let item: EditorInputBase;
        const inputName = `${this.name}_${name}`;

        switch (type) {
            case EditorType.number:
                item = new EditorNumberInput(this.data, inputName, name, value as number | undefined, autoMap);
                break;
            case EditorType.boolean:
                item = new EditorCheckboxInput(this.data, inputName, name, value as boolean | undefined, autoMap);
                break;
            case EditorType.color:
                item = new EditorColorInput(this.data, inputName, name, value as string | undefined, autoMap);
                break;
            case EditorType.select:
                item = new EditorSelectInput(this.data, inputName, name, value as string | undefined, autoMap);
                break;
            default:
                item = new EditorStringInput(this.data, inputName, name, value as string | undefined, autoMap);
        }

        this.children.push(item);

        divGroup.append(item.element);

        this.childrenGroup.append(divGroup);

        return item;
    }

    public addButton(name: string, label: string, autoMap = true): EditorButton {
        const button = new EditorButton(this.data, `${this.name}_${name}`, name, label, autoMap);

        this.children.push(button);

        this.childrenGroup.append(button.element);

        return button;
    }

    public toggleCollapse(): void {
        this.updateCollapse(!this.collapsed);
    }

    public updateCollapse(collapsed: boolean): void {
        super.updateCollapse(collapsed);

        this.setCollapse();
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
            if ((!(child instanceof EditorGroup) && !this.collapsed) || this.collapsed) {
                child.updateCollapse(this.collapsed);
            }
        }
    }
}
