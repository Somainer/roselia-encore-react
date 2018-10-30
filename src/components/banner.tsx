import * as React from 'react'
import './encore.css'
// import {Image} from 'semantic-ui-react'
import {BannerImageConfig} from '../rhodonite/protocols/encore'

export class BannerImage extends React.Component<BannerImageConfig> {
    get gradient () {
        if (typeof this.props.gradient === 'undefined') return "linear-gradient(45deg, rgba(20, 9, 49, 0.7) 0%, rgba(23, 0, 35, 0.68) 16%, rgba(1, 63, 145, 0.6) 78%, rgba(1, 64, 147, 0.57) 79%, rgba(1, 64, 147, 0.19) 93%, rgba(114, 197, 241, 0) 100%)"
        return this.props.gradient
    }
    private fillHeight: React.CSSProperties = {
        height: '100vh',
        width: '100%',
    }
    private get backGroundStyle(): React.CSSProperties {
        return {
            ...this.fillHeight,
            backgroundImage: this.gradient ? `${this.gradient}, url('${this.props.background}')` : `url('${this.props.background}')`,
            backgroundSize: 'cover',
            ...(this.props.foreground ? {
                filter: 'blur(25px) saturate(120%)',
                animation: 'blur-clear 1s ease-in-out',
                animationDelay: '1s',
                animationFillMode: 'backwards',
            } : {}),
            
            position: 'absolute',
            zIndex: 1
        }
    }
    private bannerImageStyle: React.CSSProperties = {
        ...this.fillHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        zIndex: 2
    }

    private imageStyle: React.CSSProperties = {
        width: '61.8vw',
        filter: 'contrast(130%)',
        animation: 'blur-clear 1s ease-in-out reverse',
        animationDelay: '2s',
        animationFillMode: 'backwards'
    }

    public render() {
        return (
            <div>
                <div className="hidden-xs banner" style={{height: '108vh'}}>
                    <div style={this.backGroundStyle}></div>
                    
                    <div style={this.bannerImageStyle}>
                        <div style={{height: 'inherit'}}>{this.props.children}</div>
                        {this.props.foreground &&<img src={this.props.foreground} style={this.imageStyle}></img>}
                    </div>
                    
                </div>
                {/* <div className="visible-xs">
                    <Image src="img/logo.png"></Image>
                </div> */}
            </div>
            
        )
    }
}
