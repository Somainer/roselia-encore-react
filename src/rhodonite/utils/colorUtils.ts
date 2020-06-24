const splitRGB = (color: string) => color.match(/\d+/g)!.map(n => parseInt(n, 10))

export const isBright = (color: string) => {
    const luminance = ComputableColor.ofOptional(color)?.luminance
    return luminance && luminance >= 128
}

export function selectByLuminance<T>(color: string, onBright: T, onDark: T, defaultValue: T) {
    const result = isBright(color)
    if (typeof result === 'undefined') return defaultValue
    return result ? onBright : onDark
}

interface RGBColor {
    red: number
    green: number
    blue: number
}

interface HSVColor {
    hue: number
    saturation: number
    value: number
}

interface HSLColor {
    hue: number
    saturation: number
    lightness: number
}

const isRGB = (obj: any): obj is RGBColor =>
    (typeof obj === 'object') && (typeof obj.red === "number") &&
    (typeof obj.green === 'number') && (typeof obj.blue === 'number')

const isHSV = (obj: any): obj is HSVColor =>
    (typeof obj === 'object') && (typeof obj.hue === "number") &&
    (typeof obj.saturation === 'number') && (typeof obj.value === 'number')

const isHSL = (obj: any): obj is HSLColor =>
    (typeof obj === 'object') && (typeof obj.hue === "number") &&
    (typeof obj.saturation === 'number') && (typeof obj.lightness === 'number')

const normalizedRGB = (rgb: RGBColor): RGBColor => {
    const {red, green, blue} = rgb;
    const normalize = (x: number) => x > 1 ? x / 255 : x;
    return {
        red: normalize(red),
        green: normalize(green),
        blue: normalize(blue)
    }
}

const RGBToHSV = (rgb: RGBColor): HSVColor => {
    const {red, green, blue} = normalizedRGB(rgb);
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)

    const hue = (() => {
        if (max === min) return 0;
        if (max === red) {
            const computedHue = 60 * (green - blue) / (max - min)
            if (green >= blue) return computedHue;
            else return computedHue + 360;
        }
        if (max === green) {
            return 60 * (blue - red) / (max - min) + 120;
        }
        return 60 * (red - green) / (max - min) + 240;
    })();
    const saturation = max === 0 ? 0 : 1 - (min / max);
    const value = max;

    return {
        hue,
        saturation,
        value
    }
}

const HSVToRGB = (hsv: HSVColor): RGBColor => {
    const {hue, saturation, value} = hsv;
    const h = Math.floor(hue / 60) % 6;
    const f = hue / 60 - h;

    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);

    const [red, green, blue] = (() => {
        switch(h) {
            case 0:
                return [value, t, p];
            case 1:
                return [q, value, p];
            case 2:
                return [p, value, t];
            case 3:
                return [p, q, value];
            case 4:
                return [t, p, value];
            default:
                return [value, p, q];
        }
    })().map(x => x * 255).map(x => x | 0);

    return {
        red,
        green,
        blue
    }
}

const RGBToHSL = (rgb: RGBColor): HSLColor => {
    const {red, green, blue} = normalizedRGB(rgb);
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const hue = RGBToHSV(rgb).hue
    const lightness = (max + min) / 2;
    const saturation = (() => {
        if (max === min || max === -min) {
            return 0;
        }
        if (lightness <= 0.5) {
            return (max - min) / lightness / 2;
        }
        return (max - min) / (1 - lightness) / 2;
    })();

    return {
        hue,
        saturation,
        lightness
    }
}

const HSLToRGB = (hsl: HSLColor): RGBColor => {
    const {hue, saturation, lightness} = hsl;
    if (saturation === 0) {
        return {
            red: lightness,
            green: lightness,
            blue: lightness
        }
    }
    
    const q = lightness < 0.5 ? (lightness * (1 + saturation)) : (lightness + saturation - (lightness * saturation));
    const p = 2 * lightness - q;
    const h = hue / 360;

    const [red, green, blue] = [h + 1 / 3, h, h - 1 / 3].map(x => x < 0 ? x + 1 : x).map(x => x > 1 ? x - 1 : x).map(x => {
        if (x < 1 / 6) return p + ((q - p) * 6 * x);
        if (x < 1 / 2) return q;
        if (x < 2 / 3) return p + ((q - p) * 6 * (2 / 3 - x));
        return p;
    }).map(x => x * 255).map(x => x | 0);

    return {
        red,
        green,
        blue
    }
}

export class ComputableColor {
    private readonly color: RGBColor | HSVColor | HSLColor;
    constructor(color: string | RGBColor | HSVColor | HSLColor) {
        if (typeof color === "string") {
            const lowerColor = color.toLowerCase();
            if (lowerColor.startsWith('rgb')) {
                const rgb = splitRGB(lowerColor)
                const [red, green, blue] = rgb
                this.color = {
                    red, green, blue
                }
            } else {
                const hexColor = (colorString => {
                    if (colorString.length === 3) return colorString.split('').map(s => s + s).join('')
                    if (colorString.length === 6) return colorString
                    throw new Error ("Invalid Length");
                })(color.substring(1));
                const rgb = hexColor.replace(/(..)(?=.)/g, "$1-").split('-').map(s => parseInt(s, 16));
                const [red, green, blue] = rgb
                this.color = {
                    red, green, blue
                }
            }
            
        } else this.color = {
            ...color
        }
    }

    public static of(color: string | RGBColor | HSVColor | HSLColor) {
        return new this(color);
    }

    public static ofOptional(color: string | RGBColor | HSLColor | HSVColor): ComputableColor | undefined {
        if (!color) return;
        try {
            return this.of(color)
        } catch(e) {
            return undefined;
        }
    }

    public static random() {
        return this.of(randomHexColor())
    }

    public get rgb() {
        if (isRGB(this.color)) return this.color;
        if (isHSL(this.color)) return HSLToRGB(this.color);
        return HSVToRGB(this.color);
    }

    public get hsv() {
        if (isHSV(this.color)) return this.color;
        return RGBToHSV(this.rgb);
    }

    public get hsl() {
        if (isHSL(this.color)) return this.color;
        return RGBToHSL(this.rgb);
    }

    public get hexString() {
        const {red, green, blue} = this.rgb;
        const fixLength = (s: string) => ('00' + s).slice(-2)
        return `#${[red, green, blue].map(x => x.toString(16)).map(fixLength).join('')}`;
    }

    public withHSV(hsv: Partial<HSVColor>) {
        return ComputableColor.of({
            ...this.hsv,
            ...hsv
        })
    }

    public mapHSV(fn: (hsv: HSVColor) => Partial<HSVColor>) {
        return this.withHSV(fn(this.hsv))
    }

    public withHSL(hsl: Partial<HSLColor>) {
        return ComputableColor.of({
            ...this.hsl,
            ...hsl
        })
    }

    public mapHSL(fn: (hsl: HSLColor) => Partial<HSLColor>) {
        return this.withHSL(fn(this.hsl))
    }

    public withRGB(rgb: Partial<RGBColor>) {
        return ComputableColor.of({
            ...this.rgb,
            ...rgb
        })
    }

    public mapRGB(fn: (rgb: RGBColor) => Partial<RGBColor>) {
        return this.withRGB(fn(this.rgb))
    }

    public toString() {
        return this.hexString;
    }

    public get luminance() {
        const {red, green, blue} = this.rgb;
        return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }

    public projectedRGB() {
        return ComputableColor.of(this.rgb)
    }

    public projectedHSL() {
        return ComputableColor.of(this.hsl)
    }

    public projectedHSV() {
        return ComputableColor.of(this.hsv)
    }
}


export const randomHexColor = () => {
    const hexStr = (Math.random() * 0xffffff | 0).toString(16);
    return '#' + hexStr + '000000'.substring(hexStr.length);
}
