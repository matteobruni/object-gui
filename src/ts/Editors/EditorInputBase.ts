import { EditorItem } from "./EditorItem";

export abstract class EditorInputBase extends EditorItem {
    protected value: unknown;
    private changeHandler?: (value: unknown) => void;

    protected constructor(
        data: unknown,
        createElement: () => HTMLElement,
        protected readonly id: string,
        protected readonly name: string,
        protected getDefaultValue: () => unknown,
        protected getValueFromInput: (self: EditorInputBase) => unknown,
        protected setValueToInput: (self: EditorInputBase, value: unknown) => void,
        value?: unknown,
        protected readonly autoMap = true
    ) {
        super(data, createElement);

        const input = this.element;
        const obj = this.data as Record<string, unknown>;

        input.id = `input_${this.id}`;

        this.value = value ?? (this.autoMap ? obj[this.name] : this.getDefaultValue());

        this.setValueToInput(this, this.value);
    }

    public change(changeHandler: (value: unknown) => void): EditorInputBase {
        this.changeHandler = changeHandler;

        return this;
    }

    protected changeEventHandler(): void {
        this.value = this.getValueFromInput(this);

        if (this.autoMap) {
            const obj = this.data as Record<string, unknown>;

            obj[this.name] = this.value;
        }

        if (this.changeHandler) {
            this.changeHandler(this.value);
        }
    }
}
