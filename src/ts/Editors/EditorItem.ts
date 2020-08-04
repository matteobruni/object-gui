export abstract class EditorItem {
    public readonly element!: HTMLElement;

    protected constructor(public readonly data: unknown) {
        this.element = this.createElement();
    }

    protected abstract createElement(): HTMLElement;
}
