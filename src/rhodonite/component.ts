import * as React from 'react'
import selfish from './utils/selfish'
import { Route, RouteProps } from 'react-router-dom';


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

export class ScrollToTopRouter extends React.Component<RouteProps> {
    public componentDidUpdate (prevProps: RouteProps) {
        window.scrollTo(0, 0)
        if (this.props.path === this.props.location!.pathname && this.props.location!.pathname !== prevProps.location!.pathname) {
            window.scrollTo(0, 0)
        }
    }

    public render () {
        const { component: Component, ...rest } = this.props;
        
        return React.createElement(Route, {...rest, render: rest.render || ((props: any) => React.createElement(Component!, props))})
        // return <Route {...rest} render={props => (<Component {...props} />)} />;
    }
}

// export const ScrollToTopRouter = withRouter(ScrollToTop)