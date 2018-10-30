import * as React from 'react'

// import starlight from '../encoreInfo/starlight'
// import roselia from '../encoreInfo/roselia'

import {BannerImage} from '../components/banner'
import {memberSection, singleSection, albumSection, generalSection} from '../components/section'
import { SiteConfig, SupportedLanguages } from 'src/rhodonite/protocols/encore';
import { Image, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

interface IndexProps {
    siteConfig: SiteConfig
    language: SupportedLanguages
}
export class Index extends React.Component<IndexProps, {}> {

    /*private setEncore (obj: SiteConfig) {
        return () => this.setState({
            siteConfig: obj
        })
    }*/

    public render () {
        const site = this.props.siteConfig
        return (
            <div className="App">
                <BannerImage {...site.bannerImage}></BannerImage>
                <header className="App-header" style={{textAlign: 'center'}}>
                    <Image centered src={site.siteLogo} className={site.logoSpin ? "App-logo" : ""} />
                    {/* <img src={logo} className="App-logo"></img> */}
                    <h1 className="App-title">Roselia Encore</h1>
                    <p>Current config: {site.configName}</p>
                    <p className="App-intro">
                    <p>Made with love by Somainer</p>
                    {/* To get started, edit <code>src/App.tsx</code> and save to reload. */}
                    </p>
                    <Button.Group>
                    <Link to="/roselia"><Button>Roselia</Button></Link>
                    <Button.Or />
                    <Link to="/starlight"><Button>Revue Starlight</Button></Link>
                    </Button.Group>
                </header>
                {memberSection(site, this.props.language)}
                {singleSection(site, this.props.language)}
                {site.albums && albumSection(site, this.props.language)}
                {site.externalTrackLists && site.externalTrackLists.map(et => generalSection(et, site, this.props.language))}
            </div>
        )
    }
}