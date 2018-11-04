import * as React from 'react'
import { Loader } from 'semantic-ui-react'
import * as NProgress from 'nprogress'

export function asyncComponent<T extends React.ComponentClass<any>>(comp: Promise<T> | (() => Promise<T>)) {
    return class AsyncComponent extends React.Component<any, {plugin?: T}> {
        private static cachedComponent?: T = undefined
        public constructor (props: any) {
            super(props)
            this.state = {
                plugin: undefined
            }
        }
        public componentWillMount () {
            if (AsyncComponent.cachedComponent) {
                this.setState({
                    plugin: AsyncComponent.cachedComponent
                })
            } else {
                const promise = (typeof comp === 'function') ? comp() : comp
                NProgress.start()
                promise.then(c => {
                    AsyncComponent.cachedComponent = c
                    this.setState({
                        plugin: c
                    })
                }).then(() => NProgress.done())
            }
        }
        public render () {
            const Plugin: undefined | React.ComponentClass<any> = this.state.plugin
            return Plugin ? (<Plugin {...this.props}></Plugin>) : (
                <Loader active inline='centered' />
            )
        }
    }
}