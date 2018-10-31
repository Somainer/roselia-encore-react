import * as React from 'react';
import './App.css';
// import { Segment } from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.css'

// import logo from './logo.svg';
// import {TitledDocument} from './rhodonite/component'
import roselia from './encoreInfo/roselia'
import starlight from './encoreInfo/starlight'
import {SupportedLanguages, SiteConfig} from './rhodonite/protocols/encore'

import {NavBar} from './components/navbar'
import selfish from './rhodonite/utils/selfish';
// import {Index} from './components/index'
// import {MemberPage} from './components/member' 
import {footer} from './components/footer'
import {Route, RouteComponentProps, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {ScrollToTopRouter} from './rhodonite/component'
import {lazyComponent} from './rhodonite/lazycomponent'
import {CSSTransition} from 'react-transition-group'

// import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { NotFound } from './components/notfound';

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

  /*private setSiteConfig(sc: SiteConfig) {
    return () => this.setState({
      siteConfig: sc
    })
  }*/

  // private renderIndex() {
  //   return () => {
  //     // return import('./components/index').then(({Index}) => (<Index siteConfig={this.state.siteConfig} language={this.state.language}></Index>))
  //     return React.createElement(lazyComponent(() => import('./components/index').then(x => x.Index)), this.state)
  //     // return (<Index siteConfig={this.state.siteConfig} language={this.state.language}></Index>)
  //   }
  // }

  private renderComponent(RenderComponent: React.ComponentType<any>, eternal: any) {
    return (props: RouteComponentProps) => {
      return (<RenderComponent {...props} {...this.state} {...eternal}></RenderComponent>)
    }
  }

  public render() {
    const site = this.state.siteConfig
    const StatedRoute = ({component, ...rest}: {component: React.ComponentType, [att: string]: any}) => {
      if(rest.onRender) rest.onRender()
      return (
      <ScrollToTopRouter {...rest} render={this.renderComponent(component, rest.eternal)}></ScrollToTopRouter>
      )
    }
    const StateSetter = (siteConfig: SiteConfig) =>
      () => {
        if(this.state.siteConfig !== siteConfig) this.setState({siteConfig})
        // return <Redirect to="/"></Redirect>
      }
    
      // const LazyMemberPage = lazyComponent(() => import('./components/member').then(p => p.MemberPage))
      const LazyIndex = lazyComponent(() => import('./components/index').then(x => x.Index))
    
    return (
      <div>
        <NavBar language={this.state.language} playerUrl={site.playerUrl} favicon={site.siteFavicon} setLanguage={this.methods.setLanguage}></NavBar>
        <BrowserRouter>
          <div>
            <CSSTransition classNames="fade" timeout={300}>

              <Switch>
                <StatedRoute path="/starlight/" component={LazyIndex} onRender={StateSetter(starlight)}></StatedRoute>
                <StatedRoute path="/" component={LazyIndex} onRender={StateSetter(roselia)}></StatedRoute>
                {/* <Route exact path="/starlight" render={this.renderIndex(starlight)}></Route> */}
                {/* {site.members.map(m => {
                  const memberLink = `/member/${m.name.en.split(' ')[1]}`
                  return <StatedRoute key={memberLink} path={memberLink} component={MemberPage} eternal={{currentMember: m}}></StatedRoute>
                })} */}
                {/* <Route path="/roselia" component={StateSetter(roselia)}></Route> */}
                {/* <StatedRoute path="/starlight/member/:member" component={LazyMemberPage} eternal={{siteConfig: site}}></StatedRoute> */}
                {/* <StatedRoute path="/member/:member" component={LazyMemberPage}></StatedRoute> */}
                <Route component={NotFound}></Route>
            {/* <Route config={site} language={this.state.language}></Route> */}
              </Switch>
            </CSSTransition>
            
          </div>
        </BrowserRouter>
        {footer()}
      </div>
      
      
    );
  }
}

export default App;
