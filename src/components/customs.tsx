import * as React from 'react'

export class Heimu extends React.PureComponent {
    public render () {
        return (
            <span className="heimu">{this.props.children}</span>
        )
    }
}