import * as React from 'react'
import {Container} from 'semantic-ui-react'

const gradientStyle: React.CSSProperties = {
    background: 'linear-gradient(45deg, rgb(114, 82, 201) 15%, #9CD4EA 85%)'
}

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#fff',
    padding: '20px 0',
    fontWeight: 300
}

class A<T> extends React.PureComponent<T> {
    public render() {
        return <a {...this.props} style={{color: '#fff'}}>{this.props.children}</a>
    }
}

export const footer = () => (
    <footer style={gradientStyle}>
        <Container style={footerStyle}>
            <p>Made with love♡ by <A href="https://roselia.moe/blog/" target="_blank">Somainer</A>.</p>
            <A href="https://github.com/Somainer/roselia-encore-react/">GitHub</A>
        </Container>
    </footer>
)