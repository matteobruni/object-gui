import { ColorUtils } from "../Utils";
import { EditorInputBase } from "./EditorInputBase";

export class EditorColorInput extends EditorInputBase {
    private readonly colorInput: HTMLInputElement;

    constructor(data: unknown, id: string, name: string, value?: string, autoMap = true) {
        super(
            data,
            () => document.createElement("input"),
            id,
            name,
            () => "",
            (self: EditorInputBase) => {
                const input = self.element as HTMLInputElement;

                return input.value;
            },
            (self: EditorInputBase, value: unknown) => {
                const input = self.element as HTMLInputElement;

                input.value = value as string;
            },
            value,
            autoMap
        );

        this.fullDom = document.createElement("div");

        this.colorInput = document.createElement("input");

        this.colorInput.type = "color";

        this.colorInput.value = this.value as string;

        this.fullDom.append(this.colorInput);

        const input = this.element as HTMLInputElement;

        input.type = "text";

        this.fullDom.append(this.element);

        this.updateStyle(input.value);

        input.addEventListener("change", () => {
            const colorInput = this.element as HTMLInputElement;

            this.colorInput.value = colorInput.value;

            this.changeEventHandler();
        });

        this.colorInput.addEventListener("change", () => {
            const colorInput = this.element as HTMLInputElement;

            colorInput.value = this.colorInput.value;

            this.changeEventHandler();
        });
    }

    private static textColor(value: string | undefined): string | undefined {
        if (value === undefined) {
            return undefined;
        }

        const rgb = ColorUtils.stringToRgb(value);

        if (!rgb) {
            return undefined;
        }

        const color = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

        return color > 125 ? "#000" : "#fff";
    }

    public step(): EditorInputBase {
        return this;
    }

    public min(): EditorInputBase {
        return this;
    }

    public max(): EditorInputBase {
        return this;
    }

    public addItem(): EditorInputBase {
        return this;
    }

    public addItems(): EditorInputBase {
        return this;
    }

    public addItemGroup(): EditorInputBase {
        return this;
    }

    protected changeEventHandler(): void {
        super.changeEventHandler();

        this.updateStyle(this.value as string);
    }

    private updateStyle(bgColor: string) {
        const rgb = ColorUtils.stringToRgb(bgColor);

        if (!rgb) {
            this.element.style.backgroundColor = "";
            this.colorInput.style.backgroundColor = "";
        } else {
            this.element.style.backgroundColor = bgColor;
            this.colorInput.style.backgroundColor = bgColor;
        }

        const textColor = EditorColorInput.textColor(bgColor);

        if (textColor !== undefined) {
            this.element.style.color = textColor;
            this.colorInput.style.color = textColor;
        } else {
            this.element.style.color = "";
            this.colorInput.style.color = "";
        }
    }
}
