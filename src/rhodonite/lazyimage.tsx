import * as React from 'react'
import {Image, Placeholder} from 'semantic-ui-react'
import {LazyComonent} from './lazycomponent'

export interface LazyImageProps {
    src: string,
    lazySrc?: string,
    [external: string]: any
}

export class LazyImage extends React.Component<LazyImageProps, {loaded: boolean}> {
    public constructor(props: LazyImageProps) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    public setLoaded = () => {
        this.setState({
            loaded: true
        })
    }

    private placeHolderImage (withImage: boolean) {
        const {src, lazySrc, ...rest} = this.props
        return (<div>
            {this.props.lazySrc ? (
                <Image className="rhodonite-fade-out" src={lazySrc} {...rest}></Image>
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
        return (
            <LazyComonent placeHolder={this.placeHolderImage(false)}>
                {this.state.loaded ? <Image className="rhodonite-fade-in" src={src} {...rest}></Image>
                : this.placeHolderImage(true)}
            </LazyComonent>
        )
        // return this.state.visible ? (
        //     this.state.loaded ? <Image src={src} {...rest}></Image>
        //     : this.placeHolderImage(true)
        // ) : (
        //     <div>
        //         <Visibility once onTopVisible={this.setVisible} onBottomVisible={this.setVisible}></Visibility>
        //         {this.placeHolderImage(false)}
        //     </div>
        // )

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