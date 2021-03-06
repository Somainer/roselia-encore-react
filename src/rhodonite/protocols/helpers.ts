import {
    RecommandVideoAdapter,
    MemberInfo,
    TrackInfo,
    RecommandVideo,
    SiteConfig,
    TrackType,
    MultiLanguageAttribute,
    ExternalTrackList
} from './encore'

export class BilibiliVideoAdapter implements RecommandVideoAdapter {
    public videos: RecommandVideo
    public constructor(videos: RecommandVideo) {
        this.videos = videos
    }
    public source = 'Bilibili'
    public getLink (aid: string) {
        return `https://www.bilibili.com/video/av${aid}`
    }
}

export function identity<T>(t: T): T {
    return t
}

function makeHelpers<T>() {
    return (t: T[]) => t
}

function makeHelper<T>() {
    return (t: T) => t
}

const makeMembers = makeHelpers<MemberInfo>()
const makeTracks = makeHelpers<TrackInfo>()
const makeRecommandVideo = makeHelper<RecommandVideo>()
const makeSiteConfig = makeHelper<SiteConfig>()
const makeTrackOf = (trackType: TrackType) => 
    (t: TrackInfo[]) => t.map(x => ({
        ...x,
        type: trackType
    }))

function getLanguageAttribute(m: MultiLanguageAttribute | string, k: keyof MultiLanguageAttribute) {
    if(typeof m === 'string') return m;
    return m[k]
}

function mergeLanguageAttribute (m: MultiLanguageAttribute | MultiLanguageAttribute[]): MultiLanguageAttribute {
    if (m instanceof Array) {
        const n = m.reduce((pv, v) => ({cn: pv.cn.concat(v.cn), en: pv.en.concat(v.en), jp: pv.jp.concat(v.jp)}), {cn: [] as string[], jp: [] as string[], en: [] as string[]})
        return {
            cn: n.cn.join(' → '),
            en: n.en.join(' → '),
            jp: n.jp.join(' → ')
        }
    }
    return m
}

function getLastLanguageAttribute (m: MultiLanguageAttribute | MultiLanguageAttribute[]): MultiLanguageAttribute {
    if (m instanceof Array) return m[m.length - 1]
    return m
}

function capatialize(s: string) {
    return s.replace(/(^|\s)\S/g, l => l.toUpperCase())
}

export function sameDate (originDate?: Date, exact: boolean=false) {
    const cmpDate = originDate || new Date()
    
    return (date: Date | string) => {
        date = new Date(date)
        return date.getDate() === cmpDate.getDate() && date.getMonth() === cmpDate.getMonth() && (!exact || date.getFullYear() === cmpDate.getFullYear())
    }
}

export function tryParseDateWithoutYear(date: Date | string) {
    if (date instanceof Date) {
        return date
    }
    
    // If date matches mm-dd or mm/dd.
    const parts = date.match(/(\d+)[\/\-](\d+)/)
    if (parts) {
        const month = parseInt(parts[1], 10)
        const day = parseInt(parts[2], 10)
        const dummyDate = new Date()

        // January starts from 0, so substract one.
        dummyDate.setMonth(month - 1)
        dummyDate.setDate(day)
        return dummyDate
    }

    return new Date(date)
}

export function formatDateWithoutYear(date: Date, locale?: string) {
    return date.toLocaleString(locale, {
        month: 'long',
        day: 'numeric'
    })
}

export function dummySameDate(origin: Date|string, target: string | Date, exact: boolean=false) {
    try {
        return sameDate(new Date(origin), exact)(tryParseDateWithoutYear(target))
    } catch {
        return false
    }
}

export function makeCompareOn<T, U> (key: (t: T) => U, comparer: (u: U) => boolean) {
    return (t: T) => comparer(key(t))
}
export function makeExternalTrackList (etl: ExternalTrackList): ExternalTrackList
export function makeExternalTrackList (etl: ExternalTrackList[]): ExternalTrackList[]
export function makeExternalTrackList (etl: ExternalTrackList | ExternalTrackList[]): ExternalTrackList | ExternalTrackList[] {
    if (etl instanceof Array) {
        return etl.map(l => makeExternalTrackList(l))
    }
    return {
        ...etl,
        trackList: etl.trackList.map(x => ({
            ...x,
            type: etl.trackType
        }))
    }
}

export function compose<T, U, V>(a: (t: T) => U, b: (u: U) => V) {
    return (t: T) => b(a(t))
}

/**  Generate random number from [from, to) 
 * randomGenerate(to) => randomGenerate(0, to)
 * @returns Number in [from, to)
 * 
 */
// export function randomGenerate(to: number): number
// export function randomGenerate(from: number,to: number): number
export function randomGenerate(from: number, to?: number): number { 
    if (typeof to === 'undefined') return randomGenerate(0, from)
    return Math.floor(Math.random() * (to - from)) + from
}

export function randomPickFrom<T>(fromArray: T[]) {
    return fromArray[randomGenerate(fromArray.length)]
}

export function getPositionByNum (x: number) {
    if (x > 10 && x < 20) return 'th'
    return ['st', 'nd', 'rd'][(x % 10) - 1] || 'th'
}

export function getLast<T>(ts: T[]): T {
    return ts[ts.length - 1]
}

export {
    makeMembers,
    makeTracks,
    makeRecommandVideo,
    makeSiteConfig,
    SiteConfig,
    makeTrackOf,
    getLanguageAttribute,
    mergeLanguageAttribute,
    getLastLanguageAttribute,
    capatialize
}
