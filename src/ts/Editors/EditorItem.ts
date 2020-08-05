export abstract class EditorItem {
    public readonly element!: HTMLElement;
    protected collapsed: boolean;

    protected constructor(public readonly data: unknown) {
        this.element = this.createElement();
        this.collapsed = true;
    }

    protected abstract createElement(): HTMLElement;

    public updateCollapse(collapsed: boolean): void {
        this.collapsed = collapsed;
    }
}
