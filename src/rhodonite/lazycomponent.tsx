import * as React from 'react'
import { Loader } from 'semantic-ui-react'
import * as NProgress from 'nprogress'

export function lazyComponent<T extends React.ComponentClass<any>>(comp: Promise<T> | (() => Promise<T>)) {
    return class LazyComponent extends React.Component<any, {plugin?: T}> {
        private static cachedComponent?: T = undefined
        public constructor (props: any) {
            super(props)
            this.state = {
                plugin: undefined
            }
        }
        public componentWillMount () {
            if (LazyComponent.cachedComponent) {
                this.setState({
                    plugin: LazyComponent.cachedComponent
                })
            } else {
                const promise = (typeof comp === 'function') ? comp() : comp
                NProgress.start()
                promise.then(c => {
                    LazyComponent.cachedComponent = c
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