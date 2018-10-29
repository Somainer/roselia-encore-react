import * as React from 'react';
import './App.css';
import { Segment, Image, Button } from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.css'

// import logo from './logo.svg';
// import {SelfishComponent} from './rhodonite/component'
import roselia from './encoreInfo/roselia'
import starlight from './encoreInfo/starlight'
import {SupportedLanguages, SiteConfig} from './rhodonite/protocols/encore'

import {NavBar} from './components/navbar'
import {BannerImage} from './components/banner'
import {memberSection, singleSection, albumSection, generalSection} from './components/section'
import selfish from './rhodonite/utils/selfish';

// import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class App extends React.Component<{}, {language: SupportedLanguages, siteConfig: SiteConfig}> {
  private methods: App = this
  constructor (props: object) {
    super(props)
    this.state = {
      language: 'cn',
      siteConfig: roselia
    }
    this.methods = selfish(this)
  }

  private setLanguage(language: SupportedLanguages) {
    this.setState({
      language
    })
  }

  private setEncore (obj: SiteConfig) {
    return () => this.setState({
      siteConfig: obj
    })
  }

  public render() {
    const site = this.state.siteConfig
    return (
      <Segment>
        <div className="App">
          <NavBar playerUrl={site.playerUrl} favicon={site.siteFavicon} setLanguage={this.methods.setLanguage}></NavBar>
          <BannerImage {...site.bannerImage}></BannerImage>
          <header className="App-header" style={{textAlign: 'center'}}>
            <Image centered src={site.siteLogo} className={site.logoSpin ? "App-logo" : ""} />
            {/* <img src={logo} className="App-logo"></img> */}
            <h1 className="App-title">Roselia Encore</h1>
            <p className="App-intro">
              <p>Made with love by Somainer</p>
              {/* To get started, edit <code>src/App.tsx</code> and save to reload. */}
            </p>
            <Button.Group>
              <Button onClick={this.setEncore(roselia)}>Roselia</Button>
              <Button.Or />
              <Button onClick={this.setEncore(starlight)}>Revue Starlight</Button>
            </Button.Group>
          </header>
          {memberSection(site, this.state.language)}
          {singleSection(site, this.state.language)}
          {site.albums && albumSection(site, this.state.language)}
          {site.externalTrackLists && site.externalTrackLists.map(et => generalSection(et, site, this.state.language))}

        </div>
      </Segment>
      
    );
  }
}

export default App;
