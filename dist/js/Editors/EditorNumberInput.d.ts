import { EditorItem } from "./EditorItem";
export declare class EditorNumberInput extends EditorItem {
    private readonly name;
    private readonly label;
    private value;
    private readonly change;
    constructor(data: unknown, name: string, label: string, value: number, change: (value: number) => void);
    protected createElement(): HTMLElement;
    step(step: number): EditorNumberInput;
    min(min: number): EditorNumberInput;
    max(max: number): EditorNumberInput;
}
