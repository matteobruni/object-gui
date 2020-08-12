import { ColorUtils } from "../Utils";
import { EditorInputBase } from "./EditorInputBase";

export class EditorColorInput extends EditorInputBase {
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

        const input = this.element as HTMLInputElement;

        input.type = "color";

        this.updateStyle(input.value);

        input.addEventListener("change", () => {
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

    protected changeEventHandler(): void {
        super.changeEventHandler();

        this.updateStyle(this.value as string);
    }

    private updateStyle(bgColor: string) {
        this.element.style.backgroundColor = bgColor;

        const textColor = EditorColorInput.textColor(bgColor);

        if (textColor !== undefined) {
            this.element.style.color = textColor;
        }
    }
}
