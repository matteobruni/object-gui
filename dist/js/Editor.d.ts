import { EditorContainer } from "./Editors/EditorContainer";
export declare class Editor {
    readonly container: EditorContainer;
    constructor(id: string, name: string, data: unknown);
    top(): Editor;
    bottom(): Editor;
    left(): Editor;
    right(): Editor;
    theme(theme: string): void;
    protected customize(): void;
}
