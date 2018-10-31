import * as React from 'react'
import {Menu, Modal, Dropdown, Visibility} from 'semantic-ui-react'
import {LanguageNames, SupportedLanguages} from '../rhodonite/protocols/encore'
import { getLanguageAttribute } from 'src/rhodonite/protocols/helpers';

import {throttle} from '../rhodonite/utils/throttle'
import { Link } from 'react-router-dom';

interface NavBarConfig {
  playerUrl?: string,
  setLanguage(lang: SupportedLanguages): void,
  favicon: string
  language: SupportedLanguages
  indexPath?: string
}

class PlayerFrame extends React.Component<{link:string}> {
  constructor(link: string) {
    super({link})
  }
  public render() {
    return <iframe src={this.props.link} frameBorder="no" marginWidth={0} marginHeight={0} width={330} height={110}></iframe>
  }
  public shouldComponentUpdate() {
    return false
  }
}


export class NavBar extends React.Component<NavBarConfig, {opened: boolean, menuFixed: boolean}> {
  constructor (props: NavBarConfig) {
    super(props)
    this.state = {
      opened: false,
      menuFixed: false
    }

  }

  private handleClick = () => {
    this.setState({
      opened: true
    })
  }

  private handleClose = () => {
    this.setState({
      opened: false
    })
  }

  private languageSetter(lang: SupportedLanguages) {
    return () => {
      this.props.setLanguage(lang)
    }
  }

  private fixedSetter(b: boolean) {
    return throttle(() => this.setState({menuFixed: b}), 1000)
  }

  private menuStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease'
  }

  private fixedMenuStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  }

  public render() {
    return (
      <div>
        <Visibility
          onBottomPassed={this.fixedSetter(true)}
          onBottomVisible={this.fixedSetter(false)}
          once={false}
        />
        <Menu
         borderless
         size="massive"
         fixed={this.state.menuFixed ? 'top' : void 0}
         style={this.state.menuFixed ? this.fixedMenuStyle : this.menuStyle}
        >
          <Menu.Item name='logo' as={Link} to={this.props.indexPath || "/"}>
            <img src={this.props.favicon} />
          </Menu.Item>
        
          
          <Menu.Menu position='right'>
            {this.props.playerUrl &&
              <Menu.Item active={this.state.opened} name='player' onClick={this.handleClick}>
                Player
              </Menu.Item>
            }

            <Dropdown item text={getLanguageAttribute({
              cn: "语言",
              jp: "言語",
              en: "Language"
            }, this.props.language)}>
                <Dropdown.Menu>
                  {Object.keys(LanguageNames).map(name => (
                    <Dropdown.Item key={name} onClick={this.languageSetter(name as SupportedLanguages)}>{LanguageNames[name]}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        {this.props.playerUrl &&
        <Modal dimmer="blurring" open={this.state.opened} onClose={this.handleClose}>
          <Modal.Header>Music Player</Modal.Header>
          <Modal.Content>
            <PlayerFrame link={this.props.playerUrl}></PlayerFrame>
          </Modal.Content>
        </Modal>
        }
      </div>
    )
  }
}