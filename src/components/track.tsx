import * as React from 'react'
import * as Protocol from '../rhodonite/protocols/encore'
import * as Helpers from '../rhodonite/protocols/helpers'
import {RouteComponentProps} from 'react-router'
import {HiddenText, IndentText, optionalBoolean} from './member'
import {Header, Container, Segment, Divider, Grid, Label, Popup} from 'semantic-ui-react'
import { NotFound } from './notfound';
import { TitledDocument } from 'src/rhodonite/component';
import {lazyImageOf} from '../rhodonite/lazyimage'
import { TargetLink } from 'src/rhodonite/smartLink';
import { NaiveRoseliaiCal } from 'src/rhodonite/utils/naiveical';
// import {cached} from '../rhodonite/utils/property'

interface TrackLocationProps {
    trackType: Protocol.TrackType
    trackId: string
}
interface TrackPageProps extends RouteComponentProps<TrackLocationProps> {
    language: Protocol.SupportedLanguages
    siteConfig: Protocol.SiteConfig
}

const {getPositionByNum} = Helpers

abstract class TrackPage extends React.Component<TrackPageProps> {
    private cachedTrack: Protocol.TrackInfo | undefined = undefined
    protected abstract getCurrentTrack (): Protocol.TrackInfo | undefined
    public componentDidMount () {
        window.scrollTo(0, 0)
    }

    // @cached
    protected findIn (ls: Protocol.TrackInfo[]) {
        const regex = /(\d+)(\w+)/
        const matchRes = regex.exec(this.props.match.params.trackId)
        if (matchRes) {
            const [_, idx, pos] = matchRes
            const intIdx = parseInt(idx, 10)
            if (getPositionByNum(intIdx) === pos.toLowerCase()) return ls.find(x => x.id === intIdx)
            return void 0
        }
        return ls.find(x => x.displayId === this.props.match.params.trackId)
    }

    private get track () {
        if (this.cachedTrack) return this.cachedTrack
        return this.cachedTrack = this.getCurrentTrack()!
    }
    private hasValidTrack () {
        return !!this.track
    }
    private getContextText(ctx: Protocol.MultiLanguageAttribute | string) {
        return Helpers.getLanguageAttribute(ctx, this.props.language)
    }

    private get calendarIconClass() {
        const released = this.trackReleaseState
        if (typeof released === 'undefined') return 'calendar outline'
        if (released > 0) return 'calendar check outline'
        if (released < 0) return 'calendar plus outline'
        return 'calendar alternate outline'
    }

    private get trackReleaseState() {
        try {
            const date = new Date(this.track.releaseDate)
            const today = new Date
            if (Helpers.sameDate(today, true)(date)) return 0
            if (date > today) return -1
            return 1
        } catch {
            return undefined
        }
    }

    private downloadICal = () => {
        const rCal = new NaiveRoseliaiCal()
        rCal.addTrackRelease(this.track, this.props.language, location.href)
        rCal.downloadCalendar(`${this.track.title}.ics`)
    }

    private get localReleaseDate () {
        try {
            return (new Date(this.track.releaseDate)).toLocaleDateString()
        } catch {
            return this.track.releaseDate
        }
    }
    
    private introLayout () {
        const track = this.track
        return (
            <div>
                <Header
                as='h1'
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em'
                }}
                >
                    {track.title}
                </Header>
                <Header
                as='h2'
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em'
                }}
                >
                    {track.displayId ? track.displayId : `${track.id}${getPositionByNum(track.id)} ${Helpers.capatialize(track.type||'')}`}
                </Header>
                {(this.trackReleaseState && this.trackReleaseState < 0) ? (
                    <Popup trigger={
                        <Label as="a" color="violet" size="large" icon={this.calendarIconClass} content={this.localReleaseDate}
                        onClick={this.downloadICal}></Label>
                    } content={this.getContextText({
                        en: 'Add to system calendar',
                        cn: '添加到系统日历',
                        jp: 'システムカレンダーに追加'
                    })} />
                ) : <Label color="green" size="large" icon={this.calendarIconClass} content={this.localReleaseDate}></Label>}
                {/* {JSON.stringify(this.props.match)} */}
            </div>
        )
    }
    private infoLayout () {
        const getters = this.props.siteConfig.getters
        const track = this.track
        const AttrWithTitle = (p: {header: string | Protocol.MultiLanguageAttribute, children?:any, when?: boolean, indent?: boolean}) => optionalBoolean(p.when) ? (
            <div>
                <Header as='h4' style={{ fontSize: '2em' }}>
                    {this.getContextText(p.header)}
                </Header>
                <IndentText indent={p.indent}>{p.children}</IndentText>
                {/* <IndentText>
                    {p.children}
                </IndentText> */}
                <Divider hidden></Divider>
            </div>
            
        ) : (<div></div>)
        const LazyImage = lazyImageOf(this.props.siteConfig.siteLogo)
        
        return (
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                    <Grid.Column width={8}>
                        <AttrWithTitle indent={false} header={{cn: "音轨", jp:"収録内容", en:"Track"}}>
                            <ol>
                                {track.track.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ol>
                        </AttrWithTitle>
                        <AttrWithTitle when={!!track.links} indent={false} header={{cn: "链接", jp:"リンク", en: "Links"}}>
                            <ul>
                                {track.links && track.links.map((l, i) => (
                                    <li key={i}>
                                        <TargetLink link={l.link}>{l.description}</TargetLink>
                                    </li>
                                ))}
                            </ul>
                            
                            
                        </AttrWithTitle> 
                        {track.external && track.external.map(ex => (
                            <AttrWithTitle key={ex.title} header={ex.title}>
                                {(ex.content instanceof Array) ? (
                                    <ul>
                                        {ex.content.map((e, idx) => (
                                            <li key={idx}><HiddenText hidden={ex.hidden}>{this.getContextText(e)}</HiddenText></li>
                                        ))}
                                    </ul>
                        ) : (<HiddenText hidden={ex.hidden}>{this.getContextText(ex.content)}</HiddenText>)}
                            </AttrWithTitle>
                        ))}
                    </Grid.Column>
                    <Grid.Column floated='right' width={8}>
                        <LazyImage fluid bordered rounded size='massive' src={getters.trackImageGetter(track)} />
                        <Divider hidden />
                        {track.hasLimitedEdition && (
                        <LazyImage fluid bordered rounded size='massive' src={getters.limitedTrackImageGetter(track)} />)}
                    </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
            </Segment>
        )
    }
    public render() {
        const track = this.track
        if (!this.hasValidTrack()) {
            return <NotFound></NotFound>
        }
        return (
            <TitledDocument title={track.title}>
                <div style={{
                    height: "61.8vh"
                }}>
                    <Container text>
                    <div>
                        {this.introLayout()}
                    </div>
                    
                    </Container>
                </div>
                {this.infoLayout()}
                {/* <IntroLayout></IntroLayout> */}
            </TitledDocument>
        )
    }
}

export class SingleTrackPage extends TrackPage {
    protected getCurrentTrack () {
        return this.findIn(this.props.siteConfig.singles)
    }
}

export class AlbumTrackPage extends TrackPage {
    protected getCurrentTrack() {
        return this.findIn(this.props.siteConfig.albums!)
    }
}

export function customTrackPage(tp: Protocol.ExternalTrackList) {
    return class extends TrackPage {
        protected getCurrentTrack () {
            return this.findIn(tp.trackList)
        }
    }
}