import { EditorItem } from "./EditorItem";
import { Utils } from "../Utils";

export class EditorNumberInput extends EditorItem {
    private _max?: number;
    private _min?: number;
    private _step?: number;
    private slider?: {
        left: number;
        width: number;
    };

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
            const value = parseFloat((this.element as HTMLInputElement).value);

            this.value = Utils.clamp(value, this._min ?? value, this._max ?? value);

            if (value !== this.value) {
                (this.element as HTMLInputElement).value = this.value.toString(10);
            }

            this.change(this.value);

            const slider = this.getSlider();

            if (!slider) {
                return;
            }

            const dragger = this.getDragger(slider);

            if (!dragger) {
                return;
            }

            this.updateDragger(dragger);
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

        const slider = this.getSlider();

        if (!slider) {
            return;
        }

        this.updateSliderData(slider);

        const dragger = this.getDragger(slider);

        if (!dragger) {
            return;
        }

        this.updateDragger(dragger);
    }

    private getSlider(): HTMLElement | null {
        if (this._max === undefined || this._min === undefined) {
            return null;
        }

        const parent = this.element.parentElement;

        if (!parent) {
            return null;
        }

        return parent.querySelector(".range-slider") as HTMLElement | null;
    }

    private updateSliderData(slider: HTMLElement): void {
        const rect = slider.getBoundingClientRect();

        this.slider = {
            left: rect.left,
            width: rect.width,
        };
    }

    private getDragger(slider: HTMLElement): HTMLElement | null {
        return slider.querySelector("span") as HTMLElement | null;
    }

    private updateDragger(dragger: HTMLElement): void {
        if (!this.slider) {
            return;
        }

        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const denom = Math.abs(max) + Math.abs(min);
        const width = denom !== 0 ? this.value / denom : 0;

        dragger.style.width = `${width * this.slider.width}px`;
    }

    private updateDraggerEvent(e: MouseEvent, down: boolean, dragger: HTMLElement) {
        if (!this.slider || !down) {
            return;
        }

        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const width = Utils.clamp(e.pageX - this.slider.left, 0, this.slider.width);
        const value = Utils.clamp((width / this.slider.width) * (max - min) + min, min, max);

        dragger.style.width = `${width}px`;

        this.onDrag(value);
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

        const rect = slider.getBoundingClientRect();

        this.slider = {
            left: rect.left,
            width: rect.width,
        };

        const dragger = slider.children[0] as HTMLElement;

        let down = false;
        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const denom = Math.abs(max) + Math.abs(min);
        const width = denom !== 0 ? this.value / denom : 0;

        dragger.style.width = `${width * this.slider.width}px`;
        dragger.style.left = "0px";
        dragger.style.marginLeft = "0px";

        slider.addEventListener("mousedown", (e: Event) => {
            if (!e.target) {
                return;
            }

            down = true;

            this.updateDraggerEvent(e as MouseEvent, down, dragger);

            return false;
        });

        document.addEventListener("mousemove", (e) => {
            this.updateDraggerEvent(e, down, dragger);
        });

        document.addEventListener("mouseup", () => {
            down = false;
        });

        window.addEventListener("resize", () => {
            const rect = slider.getBoundingClientRect();

            this.slider = {
                left: rect.left,
                width: rect.width,
            };

            dragger.style.width = `${width * this.slider.width}px`;
            dragger.style.left = "0px";
            dragger.style.marginLeft = "0px";
        });
    }
}
