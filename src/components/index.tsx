import * as React from 'react'

// import starlight from '../encoreInfo/starlight'
// import roselia from '../encoreInfo/roselia'

import {BannerImage} from '../components/banner'
import {memberSection, singleSection, albumSection, generalSection, linkSection} from '../components/section'
import { SiteConfig, SupportedLanguages } from 'src/rhodonite/protocols/encore';
import { Image, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import {asyncComponent} from '../rhodonite/asynccomponent'
import {ScrollToTopRouter} from '../rhodonite/component'
import {RouteComponentProps} from 'react-router'
import { NotFound } from './notfound';
import { SingleTrackPage, AlbumTrackPage, customTrackPage } from './track'
import {VideoSection} from './video'
import {bangumiSection} from './bangumi'
import {LazyComonent} from '../rhodonite/lazycomponent'

interface IndexProps extends RouteComponentProps<{}> {
    siteConfig: SiteConfig
    language: SupportedLanguages
}

export class Index extends React.Component<IndexProps, {}> {

    /*private setEncore (obj: SiteConfig) {
        return () => this.setState({
            siteConfig: obj
        })
    }*/
    private get strictProps () {
        return {
            siteConfig: this.props.siteConfig,
            language: this.props.language
        }
    }
    private renderComponent(RenderComponent: React.ComponentType<any>, eternal: any) {
        return (props: object) => {
            return (<RenderComponent {...props} {...this.strictProps} {...eternal}></RenderComponent>)
        }
    }

    public componentDidMount() {
        document.title = this.props.siteConfig.title
    }

    private index() {
        const site = this.props.siteConfig
        return (
            <div className="App">
                <BannerImage {...site.bannerImage}></BannerImage>
                <header className="App-header" style={{textAlign: 'center'}}>
                    <Image centered src={site.siteLogo} className={site.logoSpin ? "App-logo" : ""} />
                    {/* <img src={logo} className="App-logo"></img> */}
                    <h1 className="App-title">{site.title}</h1>
                    {/* <p>Current config: {site.configName}</p> */}
                    <p className="App-intro">
                    <p>Made with love by Somainer</p>
                    </p>
                    {/* <p>为了演示可扩展性，目前这里有三个预制配置，阁下（DD）想要看哪一个？</p> */}
                    <Button.Group>
                    <Link to="/"><Button color={site.configName === 'roselia' ? 'violet' : undefined}>Roselia</Button></Link>
                    <Button.Or />
                    <Link to="/starlight/"><Button color={site.configName === 'starlight' ? 'black' : undefined}>Revue Starlight</Button></Link>
                        <Button.Or />
                        <Link to="/raise-a-suilen/"><Button color={site.configName === 'suilen' ? 'purple' : undefined}> Raise a Suilen </Button></Link>
                    </Button.Group>
                </header>
                <LazyComonent>
                    {memberSection(site, this.props.language)}
                </LazyComonent>
                <LazyComonent>
                    {singleSection(site, this.props.language)}
                    {site.albums && albumSection(site, this.props.language)}
                    {site.externalTrackLists && site.externalTrackLists.map(et => generalSection(et, site, this.props.language))}
                </LazyComonent>
                <LazyComonent>
                    {site.bangumiList && bangumiSection(site, this.props.language)}
                    {site.videos ? <VideoSection siteConfig={site} videos={site.videos} indexPage={this.props.match.path}></VideoSection> : null}
                </LazyComonent>
                {site.externalLinks && (
                    <LazyComonent>
                        {linkSection(site.externalLinks, this.props.language)}
                    </LazyComonent>
                )}
            </div>
        )
    }

    public render () {
        const StatedRoute = ({component, ...rest}: {component: React.ComponentType, [att: string]: any}) => (
            <ScrollToTopRouter {...rest} render={this.renderComponent(component, rest.eternal)}></ScrollToTopRouter>
          )
        const AsyncMemberPage = asyncComponent(() => import('../components/member').then(p => p.MemberPage))
        const parentPath = this.props.match.path
        return (<div>
            <Switch>
                <Route exact path={parentPath}>{this.index()}</Route>
                {/* <Route path="member/:member"></Route> */}
                <StatedRoute path={parentPath + "member/:member/"} component={AsyncMemberPage}></StatedRoute>
                <StatedRoute path={parentPath + "single/:trackId/"} component={SingleTrackPage}></StatedRoute>
                {this.props.siteConfig.albums && (
                    <StatedRoute path={parentPath + "album/:trackId/"} component={AlbumTrackPage}></StatedRoute>
                )}
                {this.props.siteConfig.externalTrackLists && this.props.siteConfig.externalTrackLists.map(etl => (
                    <StatedRoute path={parentPath + `${etl.displayName.en}/:trackId/`} component={customTrackPage(etl)}></StatedRoute>
                ))}
                <Route component={NotFound}></Route>
            </Switch>
            
        </div>)
    }
}