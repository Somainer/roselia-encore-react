import * as React from 'react'
import {Image, Visibility, Placeholder} from 'semantic-ui-react'

export interface LazyImageProps {
    src: string,
    lazySrc?: string,
    [external: string]: any
}

export class LazyImage extends React.Component<LazyImageProps, {loaded: boolean, visible: boolean}> {
    public constructor(props: LazyImageProps) {
        super(props)
        this.state = {
            loaded: false,
            visible: false
        }
    }

    public setVisible = () => {
        this.setState({
            visible: true
        })
    }

    public setLoaded = () => {
        this.setState({
            loaded: true
        })
    }

    public shouldComponentUpdate() {
        return this.state.visible
    }

    private placeHolderImage (withImage: boolean) {
        const {src, lazySrc, ...rest} = this.props
        return (<div>
            {this.props.lazySrc ? (
                <Image src={lazySrc} {...rest}></Image>
            ) : (
                <Placeholder>
                    <Placeholder.Image></Placeholder.Image>
                </Placeholder>
            )}
            {withImage && <Image src={src} hidden onLoad={this.setLoaded}></Image>}
        </div>)
    }
    
    private imageContent() {
        const {src, lazySrc, ...rest} = this.props
        return this.state.visible ? (
            this.state.loaded ? <Image src={src} {...rest}></Image>
            : this.placeHolderImage(true)
        ) : (
            <div>
                <Visibility once onTopVisible={this.setVisible} onBottomVisible={this.setVisible}></Visibility>
                {this.placeHolderImage(false)}
            </div>
        )

    }

    public render() {
        return (
            <div>
                {this.props.src && this.imageContent()}
            </div>
        )
    }
}

export function lazyImageOf(lazySrc?: string) {
    return ({src, ...props}: {src: string, [k: string]: any}) => <LazyImage src={src} lazySrc={lazySrc} {...props}></LazyImage>
}