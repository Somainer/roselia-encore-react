import * as React from 'react'
import {Placeholder, Visibility} from 'semantic-ui-react'
import './lazycomponent.css'


interface LazyComonentState {
    visible: boolean
}


interface LazyComonentProps {
    placeHolder?: (() => JSX.Element | React.ReactNode) | JSX.Element | React.ReactNode
    onVisible?: () => void
    [ext: string]: any
}


export class LazyComonent extends React.Component<LazyComonentProps, LazyComonentState> {
    public constructor(props: LazyComonentProps) {
        super(props)
        this.state = {
            visible: false
        }
    }
    private setVisible = () => {
        if(this.props.onVisible) this.props.onVisible()
        this.setState({
            visible: true
        })
    }
    public shouldComponentUpdate () {
        return this.state.visible
    }
    private getPlaceHolder () {
        const {placeHolder} = this.props
        if (placeHolder) {
            if(placeHolder instanceof Function) {
                return placeHolder()
            }
            return placeHolder
        }
        return (
            <Placeholder>
                <Placeholder.Paragraph></Placeholder.Paragraph>
            </Placeholder>
        )
    }
    private listener () {
        return (
            <Visibility once onTopVisible={this.setVisible} onBottomVisible={this.setVisible}></Visibility>
        )
    }
    public render() {
        return this.state.visible ? this.props.children : (
            <div>
                {this.listener()}
                {this.getPlaceHolder()}
            </div>
        )
    }

}