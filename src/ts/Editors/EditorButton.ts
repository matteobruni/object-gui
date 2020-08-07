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
                if (Object.prototype.hasOwnProperty.call(data, name)) {
                    const func = (data as Record<string, unknown>)[name];

                    if (typeof func === "function") {
                        func();
                    }
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
