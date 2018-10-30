import * as React from 'react'
import selfish from './utils/selfish'


export class SelfishComponent<P extends object = {}, S extends object = {}> extends React.Component<P, S> {
    protected methods = this;
    public constructor (props: P) {
        super(props)
        this.methods = selfish(this)
    }
    public getMethods<G extends SelfishComponent<P, S>>(g: G): G {
        return selfish(g)
    }
}

export class TitledDocument extends React.Component<{title: string}, {title: string}> {
    public constructor (p: {title: string}) {
        super(p)
        this.state = {
            title: document.title
        }
    }
    private setTitle (){
        document.title = this.props.title
    }
    public componentDidMount  () {
        this.setState({
            title: document.title
        })
        this.setTitle()
    }

    public componentDidUpdate () {
        this.setTitle()
    }
    public componentWillUnmount () {
        if(document) document.title = this.state.title
    }
    public render() {
        return (this.props.children)
    }
}
