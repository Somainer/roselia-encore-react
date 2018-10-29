import * as React from 'react'
import {Card, Icon} from 'semantic-ui-react'

export class Kirin extends React.Component {
    public render () {
        return (
            <div className="thumbnail">
                    <Card fluid style={{backgroundColor: 'black'}}>
                        <Card.Content>
                            <Card.Header className="white-text">
                                キリン
                            </Card.Header>
                            <Card.Meta className="white-text">CV: 津田健次郎</Card.Meta>
                            <Card.Description className="white-text">
                                <p>分かります</p>
                                <p>我day到啦</p>
                                <p>I see</p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra className="white-text">
                            <Icon name="user"></Icon>
                            就是屏幕前的你
                        </Card.Content>
                    </Card>
                </div>
        )
    }
}