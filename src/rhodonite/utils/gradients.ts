import { ComputableColor } from './colorUtils'

export type GradientDirection = string | {
    degree: number
}

const makeGradientString = (direction: GradientDirection, colorStop1: ComputableColor, colorStop2: ComputableColor) => {
    const dir = typeof direction === 'string' ? direction : `${direction.degree}deg`
    return `linear-gradient(${dir}, ${colorStop1.hexString}, ${colorStop2.hexString})`
}

export const gradientSingleColor = (color: string, direction: GradientDirection, darkFirst?: boolean) => {
    const computableColor = ComputableColor.ofOptional(color)
    if (!computableColor) return color;
    const colorTo = computableColor.mapHSL(({ hue, lightness }) => {
        return {
            hue: (hue + 20) % 360,
            lightness: lightness > 0.5 ? lightness - 0.2 : lightness + 0.2
        }
    })

    // High luminance first.
    const colorList: [ComputableColor, ComputableColor] =
        computableColor.luminance > colorTo.luminance ? [computableColor, colorTo] : [colorTo, computableColor]

    return (typeof darkFirst === 'undefined') ?
        makeGradientString(direction, computableColor, colorTo) : makeGradientString(direction, colorList[+!darkFirst], colorList[+!!darkFirst])
}
