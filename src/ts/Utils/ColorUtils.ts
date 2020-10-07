import type { IRgb, IRgba, IHsl, IHsla, IHsv } from "../Interfaces";

export class ColorUtils {
    public static stringToRgb(input: string): IRgb | undefined {
        return ColorUtils.stringToRgba(input);
    }

    public static hslToRgb(hsl: IHsl): IRgb {
        const result: IRgb = { b: 0, g: 0, r: 0 };
        const hslPercent: IHsl = {
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };

        if (hslPercent.s === 0) {
            result.b = hslPercent.l; // achromatic
            result.g = hslPercent.l;
            result.r = hslPercent.l;
        } else {
            const q =
                hslPercent.l < 0.5
                    ? hslPercent.l * (1 + hslPercent.s)
                    : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
            const p = 2 * hslPercent.l - q;

            result.r = ColorUtils.hue2rgb(p, q, hslPercent.h + 1 / 3);
            result.g = ColorUtils.hue2rgb(p, q, hslPercent.h);
            result.b = ColorUtils.hue2rgb(p, q, hslPercent.h - 1 / 3);
        }

        result.r = Math.floor(result.r * 255);
        result.g = Math.floor(result.g * 255);
        result.b = Math.floor(result.b * 255);

        return result;
    }

    public static hslaToRgba(hsla: IHsla): IRgba {
        const rgbResult = ColorUtils.hslToRgb(hsla);

        return {
            a: hsla.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }

    public static hsvToRgb(hsv: IHsv): IRgb {
        const result: IRgb = { b: 0, g: 0, r: 0 };
        const hsvPercent = {
            h: hsv.h / 60,
            s: hsv.s / 100,
            v: hsv.v / 100,
        };

        const c = hsvPercent.v * hsvPercent.s,
            x = c * (1 - Math.abs((hsvPercent.h % 2) - 1));

        let tempRgb: IRgb | undefined;

        if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
            tempRgb = {
                r: c,
                g: x,
                b: 0,
            };
        } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
            tempRgb = {
                r: x,
                g: c,
                b: 0,
            };
        } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
            tempRgb = {
                r: 0,
                g: c,
                b: x,
            };
        } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
            tempRgb = {
                r: 0,
                g: x,
                b: c,
            };
        } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
            tempRgb = {
                r: x,
                g: 0,
                b: c,
            };
        } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
            tempRgb = {
                r: c,
                g: 0,
                b: x,
            };
        }

        if (tempRgb) {
            const m = hsvPercent.v - c;

            result.r = Math.floor((tempRgb.r + m) * 255);
            result.g = Math.floor((tempRgb.g + m) * 255);
            result.b = Math.floor((tempRgb.b + m) * 255);
        }

        return result;
    }

    public static mix(color1: IRgb | IHsl, color2: IRgb | IHsl, size1: number, size2: number): IRgb {
        const mix = (comp1: number, comp2: number, weight1: number, weight2: number) =>
            Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
        let rgb1 = color1 as IRgb;
        let rgb2 = color2 as IRgb;

        if (rgb1.r === undefined) {
            rgb1 = ColorUtils.hslToRgb(color1 as IHsl);
        }

        if (rgb2.r === undefined) {
            rgb2 = ColorUtils.hslToRgb(color2 as IHsl);
        }

        return {
            b: mix(rgb1.b, rgb2.b, size1, size2),
            g: mix(rgb1.g, rgb2.g, size1, size2),
            r: mix(rgb1.r, rgb2.r, size1, size2),
        };
    }

    private static hue2rgb(p: number, q: number, t: number): number {
        let tCalc = t;

        if (tCalc < 0) {
            tCalc += 1;
        }

        if (tCalc > 1) {
            tCalc -= 1;
        }

        if (tCalc < 1 / 6) {
            return p + (q - p) * 6 * tCalc;
        }

        if (tCalc < 1 / 2) {
            return q;
        }

        if (tCalc < 2 / 3) {
            return p + (q - p) * (2 / 3 - tCalc) * 6;
        }

        return p;
    }

    private static stringToRgba(input: string): IRgba | undefined {
        if (input.startsWith("rgb")) {
            const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result
                ? {
                      a: result.length > 4 ? parseFloat(result[5]) : 1,
                      b: parseInt(result[3], 10),
                      g: parseInt(result[2], 10),
                      r: parseInt(result[1], 10),
                  }
                : undefined;
        } else if (input.startsWith("hsl")) {
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result
                ? ColorUtils.hslaToRgba({
                      a: result.length > 4 ? parseFloat(result[5]) : 1,
                      h: parseInt(result[1], 10),
                      l: parseInt(result[3], 10),
                      s: parseInt(result[2], 10),
                  })
                : undefined;
        } else {
            // By Tim Down - http://stackoverflow.com/a/5624139/3493650
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
            const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
                return r + r + g + g + b + b + (a !== undefined ? a + a : "");
            });
            const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const result = regex.exec(hexFixed);

            return result
                ? {
                      a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                      b: parseInt(result[3], 16),
                      g: parseInt(result[2], 16),
                      r: parseInt(result[1], 16),
                  }
                : undefined;
        }
    }
}
