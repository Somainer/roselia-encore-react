import * as React from 'react'
// @ts-ignore
import APlayer from 'aplayer'

interface Audio {
    name: string
    artist?: string
    url: string
    cover?: string
    lrc?: string
    theme?: string
    type?: 'auto' | 'hls' | 'normal' | string
}

interface APlayerOptions {
    fixed: boolean,
    mini: boolean,
    autoplay: boolean,
    theme: string,
    loop: 'all' | 'one' | 'none',
    order: 'list' | 'random',
    preload: 'auto' | 'metadata' | 'none'
    volume: number
    audio: Audio | Audio[],
    mutex: boolean
    lrcType: number
    listFolded: boolean
    listMaxHeight: number
    storageName: string
}

interface APlayerState {
    instance: APlayer
}

export class RSAplayer extends React.Component<APlayerOptions, APlayerState> {
    // @ts-ignore
    private node: HTMLElement | null
    public constructor(props: APlayerOptions) {
        super(props)
        this.state = {
            instance: null
        }
    }
    public render() {
        const createInstance = React.useCallback(node => {
            if (node) {
                const player = new APlayer({
                    container: node,
                    ...this.props
                })
                this.setState({
                    instance: player
                })
                this.node = node;
            }
        }, [])
        return <div ref={createInstance}/>
    }
}