import * as React from 'react'
import selfish from './utils/selfish'


class SelfishComponent<P extends object = {}, S extends object = {}> extends React.Component<P, S> {
    protected methods = this;
    public constructor (props: P) {
        super(props)
        this.methods = selfish(this)
    }
    public getMethods<G extends SelfishComponent<P, S>>(g: G): G {
        return selfish(g)
    }
}

export {SelfishComponent}
