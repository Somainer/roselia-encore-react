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
    // CVName can be a list if the voice actor of this character has been changed.
    CVName: MultiLanguageAttribute | MultiLanguageAttribute[] // 可怜的Roselia
    bloodType?: BloodType
    zodiac?: Zodiac
    // The main visual color of this character.
    encoreColor: string
    // Your additional texts.
    external?: ExternalText[]
    // The additional properties you wanted to add.
    // These attribute could be used via getters.
    [attrs: string]: any
}

interface LinkInfo {
    description: string
    link: string
}

interface ExternalText { // 一些私货
    title: string
    /**
     * The behavior depends on the type of content.
     * * string: Display a single text.
     * * string[]: Display a list.
     * * Select considering the language.
     */
    content: string | string[] | MultiLanguageAttribute
    hidden?: boolean
}

export type TrackType = 'single' | 'album' | 'cover' | 'ost'

export interface TrackInfo {
    id: number
    // If displayId is specified, display this instead of id.
    displayId?: string
    type?: TrackType
    title: string
    track: string[]
    releaseDate: string
    links?: LinkInfo[]
    external?: ExternalText[],
    // If this tract has limited edition, the limited picture will display on hover.
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
    foreground?: string
    gradient?: string
    blurBackground?: boolean
}

export interface SiteImageGetter {
    // Determine how to get the jacket of a track.
    trackImageGetter (t: TrackInfo): string
    // Determine how to get the jacket of the limited version of track.
    // Will only be called when `hasLimitedEdition` is true.
    limitedTrackImageGetter(t: TrackInfo): string
    // Determine how to get the image of the character.
    memberImageGetter(m: MemberInfo): string
    // Determine how to get the image of the voice actor of the character.
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
    // The title of this site.
    title: string
    // The name of the configuration of this site, use it as an identifier.
    configName: string
    playerUrl?: string
    // The logo of this site.
    siteLogo: string
    siteFavicon: string
    // Should we spin the logo like Revue Starlight.
    logoSpin?: boolean
    // Members in this band.
    members: MemberInfo[]
    // Single tracks.
    singles: TrackInfo[]
    // Albums
    albums?: TrackInfo[]
    // Cover vesion songs.
    covers?: TrackInfo[]
    // Recommand videos
    videos?: RecommandVideoAdapter[]
    themeColor: string
    bannerImage: BannerImageConfig
    getters: SiteImageGetter
    plugins: SitePlugins
    externalTrackLists?: ExternalTrackList[]
    bangumiList?: BangumiItem[]
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
