import * as React from 'react'
import {Link} from 'react-router-dom'

const linkRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/


interface TargetLinkProps {
    link?: string
    isOuterLink?: boolean,
    [attr: string]: any
}

export class TargetLink extends React.PureComponent<TargetLinkProps> {
    private get isOuterLink() {
        return !!((typeof this.props.isOuterLink === 'undefined') ? (this.props.link && linkRegex.test(this.props.link)) : this.props.isOuterLink)
    }

    public get componentType() {
        return [Link, 'a'][+this.isOuterLink]
    }

    public get propsSlot() {
        return ['to', 'href'][+this.isOuterLink]
    }

    public get target() {
        return [undefined, '_blank'][+this.isOuterLink]
    }

    private get extraProps() {
        const {link, isOuterLink, children, ...prop} = this.props
        return prop
    }

    private renderLink() {
        return (
            <Link to={this.props.link!} {...this.extraProps}>{this.props.children}</Link>
        )
    }

    private renderHref() {
        return (
            <a href={this.props.link!} target={this.target} {...this.extraProps}>{this.props.children}</a>
        )
    }

    public get semanticProps() {
        return this.props.link ? {
            as: this.componentType,
            [this.propsSlot]: this.props.link,
            target: this.target
        } : {}
    }

    public render() {
        return this.isOuterLink ? this.renderHref() : this.renderLink()
    }
}