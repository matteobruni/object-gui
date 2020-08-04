import { EditorItem } from "./EditorItem";
export declare class EditorButton extends EditorItem {
    private readonly name;
    private readonly label;
    constructor(data: unknown, name: string, label: string, click: () => void);
    protected createElement(): HTMLElement;
}
