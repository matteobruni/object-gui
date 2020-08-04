import { EditorItem } from "./EditorItem";
export declare class EditorCheckboxInput extends EditorItem {
    private readonly name;
    private readonly label;
    private value;
    private readonly change;
    constructor(data: unknown, name: string, label: string, value: boolean, change: (value: boolean) => void);
    protected createElement(): HTMLElement;
}
