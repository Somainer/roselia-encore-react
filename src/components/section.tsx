import * as React from 'react'
import {Grid, Image, Container, Card, Header, Reveal} from 'semantic-ui-react'
import './encore.css'
import {SupportedLanguages, MultiLanguageAttribute, SiteConfig, ExternalTrackList} from '../rhodonite/protocols/encore'
import {mergeLanguageAttribute, getLanguageAttribute, sameDate, makeCompareOn} from '../rhodonite/protocols/helpers'
import {Link} from 'react-router-dom'

type SemanticColumnNum = 1 | 3 | 4

interface EncoreSectionProps {
    title: string
    columns: SemanticColumnNum,
    data: SectionCard[],
    dark?: boolean
}

interface SectionCard {
    title: string,
    image: string,
    secondaryImage?: string,
    color?: string,
    link?: string,
    meta?: string,
    description?: string
    isDark?: boolean
}

const EncoreCard = (sc: SectionCard) => {
    const linkProps = (sc.link ? {
        as: Link,
        to: sc.link
    } : {})
    return (
    <Grid.Column key={sc.title}>
        <div className="thumbnail">
            <Card link {...linkProps} fluid style={{backgroundColor: sc.color}}>
                {sc.secondaryImage ? (
                    <Reveal animated='move'>
                        <Reveal.Content visible>
                            <Image src={sc.image} />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Image src={sc.secondaryImage} />
                        </Reveal.Content>
                    </Reveal>
                    ) : <Image src={sc.image}/>
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
                            
                            <EncoreCard {...sc} isDark={this.props.dark} />
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
            link: `member/${m.name.en.split(' ')[1]}/`
        })),
        dark: true
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
    return <EncoreSection {...{
        title: languageGetter({
            cn: '单曲',
            en: 'Single',
            jp: 'シングル'
        }),
        columns: 4,
        data: ti.map(t => ({
            title: `${t.title}`,
            image: getters.trackImageGetter(t),
            secondaryImage: t.hasLimitedEdition ? getters.limitedTrackImageGetter(t) : void 0,
            meta: t.displayId || `${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'}`,
            link: `single/${t.displayId || `${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'}`}`
        }))
    }}>{Plugin && <Plugin/>}</EncoreSection>
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
            link: `album/${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'}`
        }))
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
            link: `${gs.displayName.en}/` + (t.displayId ? t.displayId : `${t.id}${['st', 'nd', 'rd'][t.id - 1] || 'th'}`)
        }))
    }}/>
}