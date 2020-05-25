import {ComponentClass} from 'react'

export interface MultiLanguageAttribute {
    jp: string,
    cn: string,
    en: string
}

export type SupportedLanguages = keyof MultiLanguageAttribute

export const LanguageNames: MultiLanguageAttribute = {
    jp: '日本語',
    cn: '中文',
    en: 'English'
}

type BloodType = 'A' | 'B' | 'AB' | 'O'

export interface MemberInfo {
    name: MultiLanguageAttribute
    birthday: string
    role?: string
    CVName: MultiLanguageAttribute | MultiLanguageAttribute[] // 可怜的Roselia
    bloodType?: BloodType
    zodiac?: Zodiac
    encoreColor: string
    external?: ExternalText[]
    [attrs: string]: any
}

interface LinkInfo {
    description: string
    link: string
}

interface ExternalText { // 一些私货
    title: string
    content: string | string[] | MultiLanguageAttribute
    hidden?: boolean
}

export type TrackType = 'single' | 'album' | 'cover' | 'ost'

export interface TrackInfo {
    id: number
    displayId?: string
    type?: TrackType
    title: string
    track: string[]
    releaseDate: string
    links?: LinkInfo[]
    external?: ExternalText[],
    hasLimitedEdition?: boolean
    [attrs: string]: any
}

export type ExternalLinks = LinkInfo[]

export interface RecommandVideoAdapter {
    source: string,
    videos?: RecommandVideo
    getLink(s: string): string
}

export interface RecommandVideo {
    name: string
    videos: VideoDetail[]
    authors: string[]
    [attr: string]: any
}

interface VideoDetail {
    title: string
    author: string
    coverImage: string
    aid: string
}

export interface BannerImageConfig {
    background?: string
    foreground?: string,
    gradient?: string
    blurBackground?: boolean
}

export interface SiteImageGetter {
    trackImageGetter (t: TrackInfo): string
    limitedTrackImageGetter (t: TrackInfo): string
    memberImageGetter (m: MemberInfo): string
    cvImageGetter (m: MemberInfo): string
}

export interface SitePlugins {
    [attribute: string]: ComponentClass
}

export interface ExternalTrackList {
    displayName: MultiLanguageAttribute,
    trackType: TrackType,
    trackList: TrackInfo[]
}

export interface BangumiItem {
    name: string
    link: string
    coverImage: string
    releaseDate: string
    meta?: string
}

export interface SiteConfig {
    title: string,
    configName: string
    playerUrl?: string
    siteLogo: string
    siteFavicon: string
    logoSpin?: boolean
    members: MemberInfo[]
    singles: TrackInfo[]
    albums?: TrackInfo[]
    covers?: TrackInfo[]
    videos?: RecommandVideoAdapter[]
    themeColor: string
    bannerImage: BannerImageConfig,
    getters: SiteImageGetter,
    plugins: SitePlugins,
    externalTrackLists?: ExternalTrackList[]
    bangumiList?: BangumiItem[],
    externalLinks?: ExternalLinks
    [attr: string]: any
}

export interface SiteOverallConfig {
    encoreSites: {
        site: SiteConfig,
        path: string
    }[],
    defaultSite: SiteConfig
}


export const ZodiacDict = {
    'aries': { 'cn': '白羊座', 'en': 'Aries', 'jp': '牡羊座' },
    'taurus': { 'cn': '金牛座', 'en': 'Taurus', 'jp': '牡牛座' },
    'gemini': { 'cn': '双子座', 'en': 'Gemini', 'jp': '双子座' },
    'cancer': { 'cn': '巨蟹座', 'en': 'Cancer', 'jp': '蟹座' },
    'leo': { 'cn': '狮子座', 'en': 'Leo', 'jp': '狮子座' },
    'virgo': { 'cn': '处女座', 'en': 'Virgo', 'jp': '乙女座' },
    'libra': { 'cn': '天秤座', 'en': 'Libra', 'jp': '天秤座' },
    'scorpio': { 'cn': '天蝎座', 'en': 'Scorpio', 'jp': '蝎座' },
    'sagittarius': { 'cn': '射手座', 'en': 'Sagittarius', 'jp': '射手座' },
    'capricorn': { 'cn': '摩羯座', 'en': 'Capricorn', 'jp': '山羊座' },
    'aquarius': { 'cn': '水平座', 'en': 'Aquarius', 'jp': '水瓶座' },
    'pisces': { 'cn': '双鱼座', 'en': 'Pisces', 'jp': '鱼座' }
}

export type Zodiac = keyof typeof ZodiacDict
