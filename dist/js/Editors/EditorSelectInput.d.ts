import { EditorItem } from "./EditorItem";
export declare class EditorSelectInput extends EditorItem {
    private readonly name;
    private readonly label;
    private value;
    private readonly change;
    constructor(data: unknown, name: string, label: string, value: string, change: (value: string) => void);
    protected createElement(): HTMLElement;
    addItem(value: string, text?: string, group?: string): void;
    addItemGroup(name: string): void;
}
