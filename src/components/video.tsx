import * as React from 'react'
import {Modal, Grid, Header, Divider} from 'semantic-ui-react'
import * as Protocol from '../rhodonite/protocols/encore'
import {/*RouteComponentProps,*/ Route} from 'react-router'
import {EncoreSection, EncoreSectionProps, EncoreCard} from './section'

export interface RouterParams {
    recommandId: string
}

interface VideoSectionProps {
    siteConfig: Protocol.SiteConfig
    videos: Protocol.RecommandVideoAdapter[]
    indexPage: string
}

export interface VideoModalProps /*extends RouteComponentProps<RouterParams>*/ {
    visible: boolean
    videoLib: Protocol.RecommandVideoAdapter[]
    forceVideo?: Protocol.RecommandVideoAdapter
    onClose?: () => void
}

interface VideoSectionState {
    isVisible: boolean
    currentVideo?: Protocol.RecommandVideoAdapter
}

class VideoModal extends React.Component<VideoModalProps> {
    
    private getVideoAdapter(): Protocol.RecommandVideoAdapter | undefined {
        const props = this.props
        if(props.forceVideo) return props.forceVideo
        return undefined
        // const idx = parseInt(props.match.params.recommandId, 10)
        // if (isNaN(idx)) return undefined
        // return props.videoLib[idx]
    }
    private get videoAdapter() {
        return this.getVideoAdapter()!
    }

    private renderModal() {
        const adapter = this.videoAdapter
        const video = adapter && adapter.videos
        if (!video) return null
        const videos = video.videos
        return (
            <Modal dimmer="blurring" open={this.props.visible} onClose={this.props.onClose}>
                <Modal.Header>{video.name}</Modal.Header>
                <Modal.Content>
                    {video.authors.length === 1 && 
                    (<div>
                        <Modal.Description>
                            <Header>{video.authors[0]}</Header>
                        </Modal.Description>
                        <Divider/>
                    </div>)
                    }
                    <Grid stackable>
                        <Grid.Row columns={4}>
                            {videos.map(v => (
                                <EncoreCard key={v.title} {...{
                                    title: v.title,
                                    image: v.coverImage,
                                    link: adapter.getLink(v.aid),
                                    meta: video.authors.length === 1 ? undefined : v.author
                                }}></EncoreCard>
                            ))}
                        </Grid.Row>
                    </Grid>
                    
                </Modal.Content>
            </Modal>
        )
    }
    public render() {
        return this.renderModal()
    }
}

export class VideoSection extends React.Component<VideoSectionProps, VideoSectionState> {
    public constructor(props: VideoSectionProps) {
        super(props)
        this.state = {
            isVisible: false,
            currentVideo: undefined
        }
    }

    private section = () => {
        const sectionProps: EncoreSectionProps = {
            title: '更多资源……',
            columns: 4,
            data: (this.props.videos).map(v => {
                const video = v.videos!
                return ({
                    title: video.name,
                    image: video.videos![0].coverImage,
                    meta: video.authors.length === 1 ? video.authors[0] : undefined,
                    link: video.videos.length === 1 ? video.getLink(video.videos[0].aid) : undefined,
                    onClick: () => {
                        this.setState({
                            currentVideo: v,
                            isVisible: true
                        })
                    }
                })
            })
        }
        return <EncoreSection {...sectionProps}></EncoreSection>
    }

    public closeModal = () => this.setState({
        isVisible: false
    })

    // public renderModal = (props: RouteComponentProps<RouterParams>) => (
    //     <VideoModal videoLib={this.props.videos} visible={true} {...props}></VideoModal>
    // )

    public render() {
        return (<div>
            <Route path={this.props.indexPage} render={this.section}></Route>
            <VideoModal videoLib={this.props.videos} visible={this.state.isVisible} forceVideo={this.state.currentVideo} onClose={this.closeModal}></VideoModal>
            {/* <Route path={this.props.indexPage + '/recommand/:recommandId/'} render={this.renderModal}></Route> */}
        </div>)
    }

}