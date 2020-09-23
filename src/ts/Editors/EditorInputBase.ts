import { EditorItem } from "./EditorItem";

export abstract class EditorInputBase extends EditorItem {
    public fullDom?: HTMLElement;
    protected value: unknown;
    private changeHandler?: (value: unknown) => void;

    protected constructor(
        data: unknown,
        createElement: () => HTMLElement,
        protected readonly id: string,
        protected readonly name: string,
        protected getDefaultValue: () => unknown,
        protected transformValue: (value: unknown) => unknown,
        protected getValueFromInput: (self: EditorInputBase) => unknown,
        protected setValueToInput: (self: EditorInputBase, value: unknown) => void,
        value?: unknown,
        protected readonly autoMap = true
    ) {
        super(data, createElement);

        const input = this.element;
        const obj = this.data as Record<string, unknown>;

        input.id = `input_${this.id}`;

        this.value = transformValue(value ?? (this.autoMap ? obj[this.name] : this.getDefaultValue()));

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

    public abstract step(step: number): EditorInputBase;

    public abstract min(min: number): EditorInputBase;

    public abstract max(max: number): EditorInputBase;

    public abstract addItem(value: string, text?: string, group?: string): EditorInputBase;

    public abstract addItems(values: { value: string; text?: string; group?: string }[]): EditorInputBase;

    public abstract addItemGroup(name: string): EditorInputBase;
}
