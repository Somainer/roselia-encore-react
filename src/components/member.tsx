import * as React from 'react'
import * as Protocol from '../rhodonite/protocols/encore'
import * as Helpers from '../rhodonite/protocols/helpers'
import {Container, Header, Segment, Grid, Divider, Label, Popup} from 'semantic-ui-react'
import {RouteComponentProps} from 'react-router'
import { getLanguageAttribute } from 'src/rhodonite/protocols/helpers'
import { TitledDocument } from 'src/rhodonite/component';
// import {BannerImage} from './banner'
import selfish from '../rhodonite/utils/selfish'
import { NotFound } from './notfound';
import {lazyImageOf} from '../rhodonite/lazyimage'
import { TargetLink } from 'src/rhodonite/smartLink';
import { NaiveRoseliaiCal } from 'src/rhodonite/utils/naiveical';

const notFoundMember: Protocol.MemberInfo = {
    name: {
        cn: '你是谁',
        jp: '誰か',
        en: 'Who are you?'
    },
    CVName: {
        en: '',
        cn: '',
        jp: ''
    },
    role: 'NotFound',
    birthday: '',
    horoscope: '',
    encoreColor: '',
}

interface MemberPageLocationParams {
    member: string
}

interface MemberPageProps extends RouteComponentProps<MemberPageLocationParams> {
    language: Protocol.SupportedLanguages,
    siteConfig: Protocol.SiteConfig,
    currentMember: Protocol.MemberInfo
}

export function iterAttribute(attr: Protocol.MultiLanguageAttribute | Protocol.MultiLanguageAttribute[]) {
    if (attr instanceof Array) return attr
    return [attr]
}

export function optionalBoolean (f?: boolean) {
    return typeof f === 'undefined' || f
}

export const IndentText = ({indent, children} :{indent?: boolean, children?: any}) => <p style={{textIndent: optionalBoolean(indent) ? '2em' : 'inherit', fontSize: '1.33em'}}>{children}</p>
export const HiddenText = ({hidden = true, children}: {hidden?: boolean, children?: any}) => <span className={hidden ? "heimu" : ""}>{children}</span>

export class MemberPage extends React.PureComponent<MemberPageProps> {
    private methods = selfish(this)
    public componentWillMount () {
        // tslint:disable-next-line:no-console
        // console.log(this.props)
    }
    public componentDidMount() {
        // tslint:disable-next-line:no-console
        window.scroll(0, 0)
    }
    private getCurrentMember() {
        return this.props.currentMember || this.props.siteConfig.members.filter(x => x.name.en.split(' ')[1].toLowerCase() === this.props.match.params.member.toLowerCase())[0]
    }
    private getContextText(ctx: Protocol.MultiLanguageAttribute | string) {
        return getLanguageAttribute(ctx, this.props.language)
    }
    private get member () {
        return this.getCurrentMember() || notFoundMember
    }
    private get memberFound () {
        return !!this.getCurrentMember()
    }
    private get isInBirthday() {
        return Helpers.dummySameDate(new Date, this.member.birthday)
    }
    private downloadICal = () => {
        const ical = new NaiveRoseliaiCal()
        ical.addMemberBirthday(this.member, this.props.language, location.href)
        ical.dummyDownload(`${this.getContextText(this.member.name)}.ics`)
    }
    private memberLayout = () => {
        const member = this.member
        return (
            <div>
                <Header
                as='h1'
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                    color: member.encoreColor
                }}
                >
                    {member.role}.{this.getContextText(member.name)}
                </Header>
                <Header
                as='h2'
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                    color: member.encoreColor
                }}
                >
                    {this.getContextText(Helpers.mergeLanguageAttribute(member.CVName))}
                </Header>
                {this.isInBirthday && <Label size="huge" icon="birthday cake" content={this.getContextText({
                    cn: '生日快乐',
                    en: 'Happy Birthday',
                    jp: 'お誕生日おめでとう'
                })}/>}
                <Popup trigger={
                        <Label as="a" size="large" icon="calendar plus outline" content={this.getContextText({
                            en: 'Remind me when birthday',
                            cn: '生日的时候提醒我',
                            jp: '誕生日を知らせる'
                        })}
                        onClick={this.downloadICal}></Label>
                    } content={this.getContextText({
                        en: 'Add to system calendar',
                        cn: '添加到系统日历',
                        jp: 'システムカレンダーに追加'
                    })} />
            </div>
        )
    }
    public render() {
        if (!this.memberFound) return <NotFound></NotFound>
        const member = this.member
        const IntroLayout = this.methods.introLayout
        // const getters = this.props.siteConfig.getters
        return (
            <TitledDocument title={this.getContextText(member.name)}>
                <div style={{
                    height: "61.8vh"
                }}>
                    <Container text>
                    <div>
                        {this.memberLayout()}
                    </div>
                    
                    </Container>
                </div>
                
                <IntroLayout></IntroLayout>
            </TitledDocument>
            
        )
    }
    private introLayout () {
        const getters = this.props.siteConfig.getters
        const member = this.member
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
        const WikiLink = (wikiName: string, generator: (s: string) => string) => ({wiki, as}: {wiki: string, as?: any}) => (
            React.createElement(as||'p', null, <TargetLink link={generator(wiki)}>{wiki}({wikiName})</TargetLink>)
        )
        const MoegirlLink = WikiLink('萌娘百科', s => `https://zh.moegirl.org/${s}`)
        const LazyImage = lazyImageOf(this.props.siteConfig.siteLogo)
        return (
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                    <Grid.Column width={8}>
                        <AttrWithTitle header={{cn: "生日", jp:"誕生日", en: "Birthday"}}>
                            {member.birthday}
                        </AttrWithTitle>
                        <AttrWithTitle when={!!member.bloodType} header={{cn: "血型", jp:"血液型", en: "Blood Type"}}>
                            {member.bloodType}
                        </AttrWithTitle>
                        <AttrWithTitle indent={false} header={{cn: "链接", jp:"リンク", en: "Links"}}>
                            <ul>
                                <MoegirlLink as="li" wiki={member.name.cn}></MoegirlLink>
                                {iterAttribute(member.CVName).map(mlt => (
                                <MoegirlLink as="li" wiki={mlt.cn} key={mlt.en}></MoegirlLink>
                            ))}
                            </ul>
                            
                            
                        </AttrWithTitle> 
                        <AttrWithTitle when={!!member.external} header="P.S.">
                            {member.external && member.external.map(ex => (
                                <AttrWithTitle header={ex.title}>
                                    {(ex.content instanceof Array) ? (
                                        <ul>
                                            {ex.content.map((e, idx) => (
                                                <li key={idx}><HiddenText hidden={ex.hidden}>{this.getContextText(e)}</HiddenText></li>
                                            ))}
                                        </ul>
                            ) : (<HiddenText hidden={ex.hidden}>{this.getContextText(ex.content)}</HiddenText>)}
                                </AttrWithTitle>
                            ))}
                        </AttrWithTitle>
                    </Grid.Column>
                    <Grid.Column floated='right' width={8}>
                        <LazyImage fluid bordered rounded size='massive' src={getters.memberImageGetter(member)} />
                        <Divider hidden />
                        <LazyImage fluid bordered rounded size='massive' src={getters.cvImageGetter(member)} />
                    </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
            </Segment>
        )
    }
}
