import { EditorType } from "./Enums";
import { EditorButton, EditorGroup } from "./Editors";
import { EditorInputBase } from "./Editors/EditorInputBase";
import { SingleOrMultiple } from "./Types";

export class Editor {
    private readonly root;
    private readonly themeSelect: HTMLSelectElement;
    private currentTheme?: string;
    private readonly _themes: string[];

    public get data(): () => unknown {
        return this.root.data;
    }

    constructor(id: string, name: string, data: () => unknown) {
        if (data === null || data === undefined) {
            throw new Error("No valid data argument");
        }

        this.themeSelect = document.createElement("select");

        this.themeSelect.addEventListener("change", () => {
            this.theme(this.themeSelect.value);
        });

        this._themes = [];

        this.addTheme("ashgrey");
        this.addTheme("blue");
        this.addTheme("brown");
        this.addTheme("cyan");
        this.addTheme("dark");
        this.addTheme("darkgreen");
        this.addTheme("fedex");
        this.addTheme("gameboy");
        this.addTheme("gold");
        this.addTheme("green");
        this.addTheme("grey");
        this.addTheme("greyorange");
        this.addTheme("light");
        this.addTheme("magenta");
        this.addTheme("moonlight");
        this.addTheme("nautilus");
        this.addTheme("night-sky");
        this.addTheme("one-dark");
        this.addTheme("orange");
        this.addTheme("peach");
        this.addTheme("pink");
        this.addTheme("purple");
        this.addTheme("rebeccapurple");
        this.addTheme("red");
        this.addTheme("russian-violet");
        this.addTheme("starbell");
        this.addTheme("sunlight");
        this.addTheme("trafficlights");
        this.addTheme("tuftsblue");
        this.addTheme("yellow");

        this.addTheme("neu-blue");
        this.addTheme("neu-caribbean");
        this.addTheme("neu-crystalgrape");
        this.addTheme("neu-dark");
        this.addTheme("neu-ecofriendly");
        this.addTheme("neu-expedia");
        this.addTheme("neu-gold");
        this.addTheme("neu-greysun");
        this.addTheme("neu-light");
        this.addTheme("neu-metalic");
        this.addTheme("neu-moon");
        this.addTheme("neu-orange");
        this.addTheme("neu-pink");
        this.addTheme("neu-silver");

        this.root = EditorGroup.createRoot(`${id}_editor`, name, data, document.body, this.themeSelect);

        const rootTitle = this.root.element.querySelector(".editor-item-title") as HTMLElement;
        const rootName = rootTitle?.querySelector(".editor-item-name") as HTMLElement;
        const rootNameB = rootTitle?.querySelector("b") as HTMLElement;

        let initialX = 0,
            initialY = 0,
            currentX = 0,
            currentY = 0,
            offsetX = 0,
            offsetY = 0;

        rootTitle?.addEventListener("mousedown", (downEvent) => {
            if (downEvent.target !== rootName && downEvent.target !== rootTitle && downEvent.target !== rootNameB) {
                return;
            }

            downEvent.preventDefault();

            initialX = downEvent.clientX - offsetX;
            initialY = downEvent.clientY - offsetY;

            rootTitle.classList.add("dragging");

            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
                initialX = currentX;
                initialY = currentY;

                rootTitle.classList.remove("dragging");
            };

            document.onmousemove = (moveEvent) => {
                moveEvent.preventDefault();

                currentX = moveEvent.clientX - initialX;
                currentY = moveEvent.clientY - initialY;

                offsetX = currentX;
                offsetY = currentY;

                this.root.element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            };
        });

        this.root.element.classList.add("editor-root");

        this.customize();

        this.top().right().theme("light");
    }

    public addButton(name: string, label: string, autoMap = true): EditorButton {
        return this.root.addButton(name, label, autoMap);
    }

    public addGroup(name: string, title: string, collapsed = true, customParent?: () => unknown): EditorGroup {
        return this.root.addGroup(name, title, collapsed, customParent);
    }

    public addProperty(
        name: string,
        label: string,
        type: EditorType,
        value?: SingleOrMultiple<unknown>,
        autoMap = true
    ): EditorInputBase {
        return this.root.addProperty(name, label, type, value, autoMap);
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
