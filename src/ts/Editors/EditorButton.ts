import { EditorItem } from "./EditorItem";

export class EditorButton extends EditorItem {
    constructor(
        data: unknown,
        private readonly id: string,
        private readonly name: string,
        private readonly label: string,
        private readonly click?: () => void,
        private readonly autoCall = true
    ) {
        super(data);

        this.element.id = `button_${id}`;
        this.element.innerText = label;
        this.element.addEventListener("click", () => {
            if (autoCall) {
                const obj = data as Record<string, unknown>;
                const func = obj[name];

                if (typeof func === "function") {
                    func.bind(obj)();
                }
            }

            if (click) {
                click();
            }
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("button");
    }
}
