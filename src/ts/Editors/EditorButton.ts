import { EditorItem } from "./EditorItem";

export class EditorButton extends EditorItem {
    constructor(
        data: unknown,
        private readonly id: string,
        private readonly name: string,
        private readonly label: string,
        click: () => void
    ) {
        super(data);

        this.element.id = `button_${id}`;
        this.element.innerText = label;
        this.element.addEventListener("click", () => click());
    }

    protected createElement(): HTMLElement {
        return document.createElement("button");
    }
}
