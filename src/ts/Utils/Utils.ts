export class Utils {
    public static clamp(value: number, min: number, max: number): number {
        const realMin = Math.min(min, max);
        const realMax = Math.max(min, max);

        return Math.min(Math.max(realMin, value), realMax);
    }
}
