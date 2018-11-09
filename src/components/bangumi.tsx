import * as React from 'react'
import {EncoreSection, EncoreSectionProps} from './section'
import {SupportedLanguages, MultiLanguageAttribute, SiteConfig} from '../rhodonite/protocols/encore'
import {getLanguageAttribute} from '../rhodonite/protocols/helpers'

export const bangumiSection = (si: SiteConfig, language: SupportedLanguages) => {
    const ti = si.bangumiList!
    const languageGetter = (ml: MultiLanguageAttribute) => getLanguageAttribute(ml, language || 'cn')
    const sectionProps: EncoreSectionProps = {
        title: languageGetter({
            cn: '番剧',
            en: 'Anime',
            jp: 'アニメ番組'
        }),
        columns: 4 as 4,
        data: ti.map(t => ({
            title: `${t.name}`,
            image: t.coverImage,
            meta: t.meta,
            link: t.link
        })),
        lazyImageSrc: si.siteLogo
    }
    return <EncoreSection {...sectionProps}></EncoreSection>
}