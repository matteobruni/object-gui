import { EditorGroup } from "./Editors";

export class Editor {
    public readonly root: EditorGroup;
    private readonly themeSelect: HTMLSelectElement;
    private currentTheme?: string;
    private _themes: string[];

    constructor(id: string, name: string, data: unknown) {
        this.themeSelect = document.createElement("select");

        this.themeSelect.addEventListener("change", () => {
            this.theme(this.themeSelect.value);
        });

        this._themes = [];

        this.addTheme("blue");
        this.addTheme("dark");
        this.addTheme("green");
        this.addTheme("light");
        this.addTheme("neu-dark");
        this.addTheme("neu-light");
        this.addTheme("red");

        this.root = EditorGroup.createRoot(`${id}_editor`, name, data, document.body, this.themeSelect);

        this.root.element.classList.add("editor-root");

        this.customize();

        this.top().right().theme("light");
    }

    public top(): Editor {
        this.root.element.classList.remove("editor-bottom");
        this.root.element.classList.add("editor-top");

        return this;
    }

    public bottom(): Editor {
        this.root.element.classList.remove("editor-top");
        this.root.element.classList.add("editor-bottom");

        return this;
    }

    public left(): Editor {
        this.root.element.classList.remove("editor-right");
        this.root.element.classList.add("editor-left");

        return this;
    }

    public right(): Editor {
        this.root.element.classList.remove("editor-left");
        this.root.element.classList.add("editor-right");

        return this;
    }

    public theme(theme: string): void {
        if (theme === this.currentTheme) {
            return;
        }

        this.root.element.classList.forEach((t) => {
            if (t.startsWith("editor-theme-")) {
                this.root.element.classList.remove(t);
            }
        });

        this.themeSelect.value = theme;

        for (let i = 0; i < this.themeSelect.options.length; i++) {
            const option = this.themeSelect.options.item(i);

            if (option) {
                option.selected = option.value === this.themeSelect.value;
            }
        }

        this.root.element.classList.add(`editor-theme-${theme}`);

        this.currentTheme = theme;
    }

    public addTheme(theme: string): void {
        const option = document.createElement("option");

        option.value = theme;
        option.text = theme;
        option.selected = theme === this.themeSelect.value;

        this.themeSelect.options.add(option);
    }

    public themes(): Iterable<string> {
        return this._themes;
    }

    protected customize(): void {
        // override this method to add properties
    }
}
