import * as React from 'react'
import {Grid, Image, Container, Card, Header, Reveal} from 'semantic-ui-react'
import './encore.css'
import {SupportedLanguages, MultiLanguageAttribute, SiteConfig, ExternalTrackList, ExternalLinks} from '../rhodonite/protocols/encore'
import {mergeLanguageAttribute, getLanguageAttribute, sameDate, makeCompareOn, getLast} from '../rhodonite/protocols/helpers'
import {getPositionByNum} from '../rhodonite/protocols/helpers'
import {lazyImageOf} from '../rhodonite/lazyimage'
import {LazyComonent} from '../rhodonite/lazycomponent'
import {TargetLink} from '../rhodonite/smartLink'
import { selectByLuminance } from 'src/rhodonite/utils/colorUtils';

type SemanticColumnNum = 1 | 3 | 4

export interface EncoreSectionProps {
    title: string
    columns: SemanticColumnNum,
    data: SectionCard[],
    dark?: boolean,
    lazyImageSrc?: string
}

interface SectionCard {
    title: string,
    image: string,
    secondaryImage?: string,
    color?: string,
    link?: string,
    meta?: string,
    description?: string
    isDark?: boolean,
    lazyImageSrc?: string,
    isOuterLink?: boolean
    onClick?: () => void
}

function positionWithNumByNum (num: number) {
    return `${num}${getPositionByNum(num)}`
}

export const EncoreCard = (sc: SectionCard) => {
    const linkProps = (new TargetLink(sc)).semanticProps
    const LazyImage = lazyImageOf(sc.lazyImageSrc)
    return (
    <Grid.Column key={sc.title}>
        <div className="thumbnail">
            <Card link {...linkProps} fluid style={{background: sc.color}} onClick={sc.onClick}>
                {sc.secondaryImage ? (
                    <Reveal animated='move'>
                        <Reveal.Content visible>
                            {/* <Image src={sc.image} /> */}
                            <LazyImage src={sc.image} />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            {/* <Image src={sc.secondaryImage} /> */}
                            <LazyImage src={sc.secondaryImage} />
                        </Reveal.Content>
                    </Reveal>
                    ) : <LazyImage src={sc.image}/>
                }
                <Card.Content>
                    <Card.Header className={sc.isDark && " white-text" || ""}>
                        {sc.title}
                    </Card.Header>
                    {sc.meta && <Card.Meta style={{color: sc.isDark && "rgba(255, 255, 255, 0.618)"}}>{sc.meta}</Card.Meta>}
                    {sc.description && <Card.Description className={sc.isDark && " white-text" || ""}>{sc.description}</Card.Description>}
                </Card.Content>
            </Card>
        </div>
    </Grid.Column>
)}

export class EncoreSection extends React.Component<EncoreSectionProps> {
    public render() {
        return (
            <Container className="part">
                <Grid stackable>
                    <Header as="h1">{this.props.title}</Header>
                    <Grid.Row centered columns={2}>
                        <Grid.Column>
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={this.props.columns}>
                        {this.props.data.map(sc => (
                            <LazyComonent key={sc.title}>
                                <EncoreCard isDark={this.props.dark} {...sc} lazyImageSrc={this.props.lazyImageSrc} />
                            </LazyComonent>
                        ))}
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export const memberSection = (si: SiteConfig, language: SupportedLanguages) => {
    const mi = si.members
    const {getters} = si
    const languageGetter = (ml: MultiLanguageAttribute) => getLanguageAttribute(ml, language || 'cn')
    const configs = {
        title: languageGetter({
            cn: '成员',
            en: 'Members',
            jp: 'メンバー'
        }),
        columns: 3 as SemanticColumnNum,
        data: mi.map(m => ({
            title: `${languageGetter(m.name)}`,
            image: getters.memberImageGetter(m),
            secondaryImage: getters.cvImageGetter(m),
            color: m.encoreColor,
            meta: m.role,
            description: `CV:${languageGetter(mergeLanguageAttribute(m.CVName))}`,
            link: `member/${getLast(m.name.en.split(' '))}/`,
            isDark: selectByLuminance(m.encoreColor, false, true, true)
        })),
        dark: true,
        lazyImageSrc: si.siteLogo
    }
    const birthdayMembers = mi.filter(makeCompareOn(x => x.birthday, sameDate()))
    const Plugin = si.plugins.member

    return (
        <EncoreSection {...configs}>
            {Plugin && <Plugin></Plugin>}
            {birthdayMembers.map(bm => (
                <div className="thumbnail" key={bm.name.en}>
                    <Card link fluid style={{backgroundColor: bm.encoreColor}}>
                        <Image src={getters.memberImageGetter(bm)}/>
                        <Card.Content>
                            <Card.Header className="white-text">
                                {languageGetter(bm.name)}
                            </Card.Header>
                            <Card.Description className="white-text">{languageGetter({
                                cn: '生日快乐',
                                en: 'Happy birthday',
                                jp: 'お誕生日おめでとう'
                            })}, {languageGetter(bm.name)}!</Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            ))}
            
        </EncoreSection>
    )
}

export const singleSection = (si: SiteConfig, language: SupportedLanguages) => {
    const ti = si.singles
    const {getters} = si
    const languageGetter = (ml: MultiLanguageAttribute) => getLanguageAttribute(ml, language || 'cn')
    const Plugin = si.plugins.single
    const sectionProps: EncoreSectionProps = {
        title: languageGetter({
            cn: '单曲',
            en: 'Single',
            jp: 'シングル'
        }),
        columns: 4 as 4,
        data: ti.map(t => ({
            title: `${t.title}`,
            image: getters.trackImageGetter(t),
            secondaryImage: t.hasLimitedEdition ? getters.limitedTrackImageGetter(t) : void 0,
            meta: t.displayId || `${t.id}${getPositionByNum(t.id)}`,
            link: `single/${t.displayId || positionWithNumByNum(t.id)}/`
        })),
        lazyImageSrc: si.siteLogo
    }
    return <EncoreSection {...sectionProps}>{Plugin && <LazyComonent><Plugin/></LazyComonent>}</EncoreSection>
}

export const albumSection = (si: SiteConfig, language: SupportedLanguages) => {
    const ti = si.albums!
    const {getters} = si
    const languageGetter = (ml: MultiLanguageAttribute) => getLanguageAttribute(ml, language || 'cn')
    return (new EncoreSection({
        title: languageGetter({
            cn: '专辑',
            en: 'Album',
            jp: 'アルバム'
        }),
        columns: 4,
        data: ti.map(t => ({
            title: `${t.title}`,
            image: getters.trackImageGetter(t),
            secondaryImage: t.hasLimitedEdition ? getters.limitedTrackImageGetter(t) : void 0,
            meta: `${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'} album`,
            link: `album/${t.id}${getPositionByNum(t.id)}/`
        })),
        lazyImageSrc: si.siteLogo
    })).render()
}

export const generalSection = (gs: ExternalTrackList, si: SiteConfig, language: SupportedLanguages) => {
    const {getters} = si
    const languageGetter = (ml: MultiLanguageAttribute) => getLanguageAttribute(ml, language || 'cn')
    return <EncoreSection {...{
        title: languageGetter(gs.displayName),
        columns: 4,
        data: gs.trackList.map(t => ({
            title: `${t.title}`,
            image: getters.trackImageGetter(t),
            secondaryImage: t.hasLimitedEdition ? getters.limitedTrackImageGetter(t) : void 0,
            meta: t.displayId ? t.displayId : `${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'} ${gs.trackType}`,
            link: `${gs.displayName.en}/` + (t.displayId ? t.displayId : `${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'}/`)
        })),
        lazyImageSrc: si.siteLogo
    }}/>
}

export const linkSection = (gs: ExternalLinks, language: SupportedLanguages) => (
    <EncoreSection {...{
        title: getLanguageAttribute({
            cn: '相关链接',
            en: 'Links',
            jp: 'リンク'
        }, language),
        columns: 4,
        data: [{
            title: '+我想要友链',
            link: 'mailto:yukina@roselia.moe',
            image: '',
            color: 'linear-gradient(135deg, rgb(114, 82, 201) 15%, #9CD4EA 85%)',
            isDark: true
        }].concat(gs.map(t => ({
            title: t.description,
            link: t.link,
            image: '',
            color: '',
            isDark: false
        })))
    }}></EncoreSection>
)