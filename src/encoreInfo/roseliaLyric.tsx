import * as React from 'react'
import {TrackType} from '../rhodonite/protocols/encore'
import {Item, Button, Segment, Dimmer, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {getPositionByNum} from '../rhodonite/protocols/helpers'

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

export class RoseliaLyrics extends React.Component<{}, {lyric: RandomLyric, loading: boolean}> {
    constructor (props: object) {
        super(props)
        this.state = {
            lyric: {
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
            },
            loading: false
        }
    }

    private getLyric = async () => {
        this.setState({
            loading: true
        })
        try{
            const j = await fetch('https://roselia.moe/blog/api/roselia/lyric/random');
            const data = await j.json();
            this.setState({
                loading: false,
                lyric: data
            });
        } catch {
            this.setState({
                loading: false
            })
        }
    }
    public componentDidMount () {
        this.getLyric()
    }

    private get currentLink () {
        const lyric = this.state.lyric
        return `${lyric.type}/${lyric.id}${getPositionByNum(lyric.id)}`
    }

    public render() {
        const lyric = this.state.lyric
        return (
            <Dimmer.Dimmable as={Segment} blurring dimmed={this.state.loading}>
                <Item.Group>
                    <Item>
                        <Item.Image size="small" src={lyric.picUrl} />
                        <Item.Content verticalAlign="middle">
                            <Item.Header>
                                <p><span>{lyric.jpLyric}</span></p>
                                <p><span>{lyric.cnLyric}</span></p>
                            </Item.Header>
                            <Item.Description>{lyric.name}</Item.Description>
                            <Item.Extra>
                                <Label as={Link} to={this.currentLink} content={lyric.album} />
                                <Label icon='time' content={lyric.at}/>
                            </Item.Extra>
                            <Item.Extra>
                                <Button disabled={this.state.loading} size="small" icon="refresh" onClick={this.getLyric}></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Dimmer.Dimmable>
        )
    }
}