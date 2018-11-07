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

export function dummySameDate(origin: Date|string, target: string | Date, exact: boolean=false) {
    try {
        return sameDate(new Date(origin), exact)(target)
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

export function getPositionByNum (x: number) {
    if (x > 10 && x < 20) return 'th'
    return ['st', 'nd', 'rd'][(x % 10) - 1] || 'th'
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
