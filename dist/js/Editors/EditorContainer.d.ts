import { EditorItem } from "./EditorItem";
import { SingleOrMultiple } from "../Types/SingleOrMultiple";
export declare class EditorContainer extends EditorItem {
    readonly name: string;
    private readonly title;
    private collapsed;
    readonly children: EditorItem[];
    private readonly childrenContainer;
    private readonly collapseButton;
    constructor(data: unknown, name: string, title: string, collapsed: boolean, parent: HTMLElement);
    protected createElement(): HTMLElement;
    addContainer(name: string, title: string, collapsed?: boolean): EditorContainer;
    addProperty(name: string, label: string, value: SingleOrMultiple<number | string | boolean | undefined | null>, type: string, change: (value: number | string | boolean) => void): EditorItem;
    addButton(name: string, label: string, click: () => void): void;
    private setCollapse;
    toggleCollapse(): void;
}
