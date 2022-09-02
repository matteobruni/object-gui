import { EditorItem } from "./EditorItem";

export class EditorButton extends EditorItem {
    private clickHandler?: () => void;

    constructor(
        data: () => unknown,
        private readonly id: string,
        private readonly name: string,
        private readonly label: string,
        private readonly autoMap = true
    ) {
        super(data, () => document.createElement("button"));

        this.element.id = `button_${this.id}`;
        this.element.innerText = this.label;
        this.element.addEventListener("click", () => {
            if (this.autoMap) {
                const obj = this.data() as Record<string, unknown>;
                const func = obj[this.name];

                if (typeof func === "function") {
                    func.bind(obj)();
                }
            }

            if (this.clickHandler) {
                this.clickHandler();
            }
        });
    }

    public click(clickHandler?: () => void): EditorButton {
        this.clickHandler = clickHandler;

        return this;
    }
}
