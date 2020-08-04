export declare abstract class EditorItem {
    readonly data: unknown;
    readonly element: HTMLElement;
    protected constructor(data: unknown);
    protected abstract createElement(): HTMLElement;
}
