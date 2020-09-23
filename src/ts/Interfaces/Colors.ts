export interface IAlphaColor {
    a: number;
}

export interface IHsl {
    h: number;
    s: number;
    l: number;
}

export interface IHsla extends IHsl, IAlphaColor {}

export interface IHsv {
    h: number;
    s: number;
    v: number;
}

export interface IHsva extends IHsv, IAlphaColor {}

export interface IRgb {
    r: number;
    g: number;
    b: number;
}

export interface IRgba extends IRgb, IAlphaColor {}

export interface IValueColor {
    rgb?: IRgb;
    hsl?: IHsl;
    hsv?: IHsv;
}
