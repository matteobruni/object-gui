export abstract class EditorItem {
    public readonly element!: HTMLElement;
    protected collapsed: boolean;

    protected constructor(public readonly data: unknown, protected createElement: () => HTMLElement) {
        this.element = this.createElement();
        this.collapsed = true;
    }

    public updateCollapse(collapsed: boolean): void {
        this.collapsed = collapsed;
    }
}
