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
    horoscope: string
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

export interface SiteConfig {
    configName: string
    playerUrl?: string
    siteLogo: string
    siteFavicon: string
    logoSpin?: boolean
    members: MemberInfo[]
    singles: TrackInfo[]
    albums?: TrackInfo[]
    covers?: TrackInfo[]
    videos?: RecommandVideoAdapter | RecommandVideoAdapter[]
    themeColor: string
    bannerImage: BannerImageConfig,
    getters: SiteImageGetter,
    plugins: SitePlugins,
    externalTrackLists?: ExternalTrackList[]
    [attr: string]: any
}
