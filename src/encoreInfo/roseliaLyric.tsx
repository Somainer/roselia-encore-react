import * as React from 'react'
import {TrackType} from '../rhodonite/protocols/encore'
import {Item, Button, Segment} from 'semantic-ui-react'
import * as NProgress from 'nprogress'

interface RandomLyric {
    album: string
    at: string
    id: number
    cnLyric: string
    jpLyric: string
    lyric: string
    name: string
    type: TrackType,
    link: string
    picUrl: string
}

export class RoseliaLyrics extends React.Component<{}, RandomLyric> {
    constructor (props: object) {
        super(props)
        this.state = {
            album: '', 
            at: '', 
            id: 1, 
            lyric: '', 
            name: '', 
            cnLyric: '',
            jpLyric: '',
            type: 'album',
            link: '',
            picUrl: ''
        }
    }

    private getLyric = async () => {
        NProgress.start()
        const j = await fetch('https://roselia.moe/blog/api/roselia/lyric/random');
        const data = await j.json();
        NProgress.done()
        this.setState(data);
    }
    public componentDidMount () {
        this.getLyric()
    }

    public render() {
        const lyric = this.state
        return (
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="small" src={lyric.picUrl} />
                        <Item.Content verticalAlign="middle">
                            <Item.Meta>
                                <p><span>{lyric.jpLyric}</span></p>
                                <p><span>{lyric.cnLyric}</span></p>
                            </Item.Meta>
                            <Item.Description>{lyric.name}@{lyric.at}</Item.Description>
                            <Item.Extra>
                                <Button size="small" icon="refresh" onClick={this.getLyric}></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}