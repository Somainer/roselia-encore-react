import * as React from 'react'
import {Header, Container, Button, Icon} from 'semantic-ui-react'
import { TitledDocument } from 'src/rhodonite/component';
import {Link} from 'react-router-dom'

export const NotFound = () => (
    <TitledDocument title="404 Not Found">
        <div style={{
            height: "61.8vh"
        }}>
            <Container text>
                <Header
                as='h1'
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em'
                }}
                >
                    Oops! Nothing here.
                </Header>
                <Header
                as='h2'
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em'
                }}
                >
                    404 Not Found
                </Header>
                <Link to='/'>
                    <Button>
                        <Icon name="home"></Icon>
                        Go Home
                    </Button>
                </Link>
            </Container>
        </div>
    </TitledDocument>
)