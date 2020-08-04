import { IRgb } from "../Interfaces/IRgb";
import { IRgba } from "../Interfaces/IRgba";
import { IHsla } from "../Interfaces/IHsla";
import { IHsl } from "../Interfaces/IHsl";
export declare class ColorUtils {
    static stringToRgb(input: string): IRgb | undefined;
    static hslaToRgba(hsla: IHsla): IRgba;
    static hslToRgb(hsl: IHsl): IRgb;
    private static stringToRgba;
    private static hue2rgb;
}
