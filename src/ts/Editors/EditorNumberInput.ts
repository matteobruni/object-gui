import { EditorItem } from "./EditorItem";

export class EditorNumberInput extends EditorItem {
    private _max?: number;
    private _min?: number;
    private _step?: number;

    constructor(
        data: unknown,
        private readonly name: string,
        private readonly label: string,
        private value: number,
        private readonly change: (value: number) => void
    ) {
        super(data);

        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.value = value?.toString();
        input.type = "number";

        input.addEventListener("change", () => {
            this.value = parseFloat((this.element as HTMLInputElement).value);

            this.change(this.value);
        });
    }

    protected createElement(): HTMLElement {
        return document.createElement("input");
    }

    public step(step: number): EditorNumberInput {
        (this.element as HTMLInputElement).step = step.toString(10);

        this._step = step;

        return this;
    }

    public min(min: number): EditorNumberInput {
        (this.element as HTMLInputElement).min = min.toString(10);

        this._min = min;

        this.drawSlider();

        return this;
    }

    public max(max: number): EditorNumberInput {
        (this.element as HTMLInputElement).max = max.toString(10);

        this._max = max;

        this.drawSlider();

        return this;
    }

    private updateDragger(e: MouseEvent, down: boolean, rangeLeft: number, rangeWidth: number, dragger: HTMLElement) {
        if (down && e.pageX >= rangeLeft && e.pageX <= rangeLeft + rangeWidth) {
            const max = this._max ?? 0;
            const min = this._min ?? 0;
            const width = e.pageX - rangeLeft;
            const value = (width / rangeWidth) * (max - min) + min;

            dragger.style.width = `${width}px`;

            this.onDrag(value);
        }
    }

    private onDrag(value: number): void {
        const input = this.element as HTMLInputElement;

        input.value = value.toString(10);

        this.value = value;

        this.change(this.value);
    }

    private drawSlider(): void {
        if (this._max === undefined || this._min === undefined) {
            return;
        }

        const parent = this.element.parentElement;

        if (!parent) {
            return;
        }

        const range = parent.querySelector(".range-slider");

        if (range) {
            return;
        }

        const slider = document.createElement("div");

        slider.classList.add("range-slider");

        slider.appendChild(document.createElement("span"));

        parent.insertBefore(slider, this.element);

        const dragger = slider.children[0] as HTMLElement;

        let down = false;
        let rangeWidth: number;
        let rangeLeft: number;

        dragger.style.width = `${this.value}px`;
        dragger.style.left = "0px";
        dragger.style.marginLeft = "0px";

        slider.addEventListener("mousedown", (e: Event) => {
            if (!e.target) {
                return;
            }

            const elem = e.target as HTMLElement;
            const rect = elem.getBoundingClientRect();

            rangeLeft = rect.left;
            rangeWidth = elem.offsetWidth;
            down = true;

            this.updateDragger(e as MouseEvent, down, rangeLeft, rangeWidth, dragger);

            return false;
        });

        document.addEventListener("mousemove", (e) => {
            this.updateDragger(e, down, rangeLeft, rangeWidth, dragger);
        });

        document.addEventListener("mouseup", () => {
            down = false;
        });
    }
}
