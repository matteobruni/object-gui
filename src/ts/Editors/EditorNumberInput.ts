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

    public updateCollapse(collapsed: boolean): void {
        super.updateCollapse(collapsed);

        if (this._max === undefined || this._min === undefined) {
            return;
        }

        const parent = this.element.parentElement;

        if (!parent) {
            return;
        }

        const range = parent.querySelector(".range-slider") as HTMLElement;

        if (!range) {
            return;
        }

        const dragger = range.querySelector("span") as HTMLElement;

        if (!dragger) {
            return;
        }

        const rangeWidth = range.offsetWidth;
        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const denom = Math.abs(max) + Math.abs(min);
        const width = denom !== 0 ? this.value / denom : 0;

        dragger.style.width = `${width * rangeWidth}px`;
        dragger.style.left = "0px";
        dragger.style.marginLeft = "0px";
    }

    private updateDragger(e: MouseEvent, down: boolean, dragger: HTMLElement) {
        const elem = e.target as HTMLElement;
        const rect = elem.getBoundingClientRect();
        const rangeLeft = rect.left;
        const rangeWidth = elem.offsetWidth;

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
        const rangeWidth = slider.offsetWidth;
        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const denom = Math.abs(max) + Math.abs(min);
        const width = denom !== 0 ? this.value / denom : 0;

        dragger.style.width = `${width * rangeWidth}px`;
        dragger.style.left = "0px";
        dragger.style.marginLeft = "0px";

        slider.addEventListener("mousedown", (e: Event) => {
            if (!e.target) {
                return;
            }

            down = true;

            this.updateDragger(e as MouseEvent, down, dragger);

            return false;
        });

        document.addEventListener("mousemove", (e) => {
            this.updateDragger(e, down, dragger);
        });

        document.addEventListener("mouseup", () => {
            down = false;
        });

        window.addEventListener("resize", () => {
            const rangeWidth = slider.offsetWidth;
            const max = this._max ?? 0;
            const min = this._min ?? 0;
            const denom = Math.abs(max) + Math.abs(min);
            const width = denom !== 0 ? this.value / denom : 0;

            dragger.style.width = `${width * rangeWidth}px`;
            dragger.style.left = "0px";
            dragger.style.marginLeft = "0px";
        });
    }
}
