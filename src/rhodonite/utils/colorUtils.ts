export const getLuminance = (red: number, green: number, blue: number) => (
    red * 299 + green * 587 + blue * 114
) / 1000

const splitRGB = (color: string) => color.match(/\d+/g)!.map(n => parseInt(n, 10))

export const isBright = (color: string) => {
    if (! color) return 
    const lowerColor = color.toLowerCase()
    let luminance: number
    if (lowerColor.startsWith('rgb')) {
        const rgb = splitRGB(lowerColor)
        luminance = getLuminance(rgb[0], rgb[1], rgb[2])
    } else {
        let hexColor = lowerColor.substring(1)
        if (hexColor.length === 3) hexColor = hexColor.split('').map(s => s + s).join('')
        if (hexColor.length !== 6) return undefined
        const rgb = hexColor.replace(/(..)(?=.)/g, "$1-").split('-').map(s => parseInt(s, 16))
        luminance = getLuminance(rgb[0], rgb[1], rgb[2])
    }
    return luminance >= 128
}

export function selectByLuminance<T>(color: string, onBright: T, onDark: T, defaultValue: T) {
    const result = isBright(color)
    if (typeof result === 'undefined') return defaultValue
    return result ? onBright : onDark
}