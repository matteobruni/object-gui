import { Utils } from "../Utils";
import { EditorInputBase } from "./EditorInputBase";

export class EditorNumberInput extends EditorInputBase {
    private _max?: number;
    private _min?: number;
    private _step?: number;
    private slider?: {
        left: number;
        width: number;
    };

    constructor(data: unknown, id: string, name: string, value?: number, autoMap = true) {
        super(
            data,
            () => document.createElement("input"),
            id,
            name,
            () => 0,
            (value: unknown) => value,
            (self: EditorInputBase) => {
                const numberSelf = self as EditorNumberInput;
                const input = numberSelf.element as HTMLInputElement;
                const value = parseFloat(input.value);

                return Utils.clamp(value, numberSelf._min ?? value, numberSelf._max ?? value);
            },
            (self: EditorInputBase, value: unknown) => {
                const numberSelf = self as EditorNumberInput;
                const input = numberSelf.element as HTMLInputElement;
                const numValue = value as number;

                input.value = Utils.clamp(
                    numValue,
                    numberSelf._min ?? numValue,
                    numberSelf._max ?? numValue
                ).toString();
            },
            value,
            autoMap
        );

        const input = this.element as HTMLInputElement;

        input.type = "number";

        this.fullDom = document.createElement("div");

        this.fullDom.append(this.element);

        input.addEventListener("change", () => {
            this.changeEventHandler();
        });
    }

    private static getDragger(slider: HTMLElement): HTMLElement | null {
        return slider.querySelector("span") as HTMLElement | null;
    }

    public step(step: number): EditorInputBase {
        (this.element as HTMLInputElement).step = step.toString(10);

        this._step = step;

        return this;
    }

    public min(min: number): EditorInputBase {
        (this.element as HTMLInputElement).min = min.toString(10);

        this._min = min;

        this.drawSlider();

        return this;
    }

    public max(max: number): EditorInputBase {
        (this.element as HTMLInputElement).max = max.toString(10);

        this._max = max;

        this.drawSlider();

        return this;
    }

    public addItem(): EditorInputBase {
        return this;
    }

    public addItemGroup(): EditorInputBase {
        return this;
    }

    public addItems(): EditorInputBase {
        return this;
    }

    public updateCollapse(collapsed: boolean): void {
        super.updateCollapse(collapsed);

        const slider = this.getSlider();

        if (!slider) {
            return;
        }

        this.updateSliderData(slider);

        const dragger = EditorNumberInput.getDragger(slider);

        if (!dragger) {
            return;
        }

        this.updateDragger(dragger);
    }

    protected changeEventHandler(): void {
        super.changeEventHandler();

        const slider = this.getSlider();

        if (!slider) {
            return;
        }

        const dragger = EditorNumberInput.getDragger(slider);

        if (!dragger) {
            return;
        }

        this.updateDragger(dragger);
    }

    private getSlider(): HTMLElement | null {
        if (this._max === undefined || this._min === undefined) {
            return null;
        }

        const parent = this.fullDom;

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

    private updateDragger(dragger: HTMLElement): void {
        if (!this.slider) {
            return;
        }

        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const value = this.value as number;
        const denom = max - min;
        const width = denom !== 0 ? value / denom : 0;

        dragger.style.width = `${width * this.slider.width}px`;
    }

    private updateDraggerEvent(e: MouseEvent, down: boolean, dragger: HTMLElement) {
        if (!this.slider || !down) {
            return;
        }

        const max = this._max ?? 0;
        const min = this._min ?? 0;
        const step = this._step ?? 0;
        const width = Utils.clamp(e.pageX - this.slider.left, 0, this.slider.width);
        let value = Utils.clamp((width / this.slider.width) * (max - min) + min, min, max);

        if (step > 0) {
            value = Math.floor(value / step) * step;
        }

        dragger.style.width = `${width}px`;

        this.onDrag(value);
    }

    private onDrag(value: number): void {
        const input = this.element as HTMLInputElement;

        input.value = value.toString(10);

        this.changeEventHandler();
    }

    private drawSlider(): void {
        if (this._max === undefined || this._min === undefined) {
            return;
        }

        const parent = this.fullDom;

        if (!parent) {
            return;
        }

        const range = parent.querySelector(".range-slider");

        if (range) {
            return;
        }

        (this.element as HTMLInputElement).classList.add("slider-input");

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
        const value = this.value as number;
        const denom = Math.abs(max) + Math.abs(min);
        const width = denom !== 0 ? value / denom : 0;

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

            this.updateDragger(dragger);
        });
    }
}
