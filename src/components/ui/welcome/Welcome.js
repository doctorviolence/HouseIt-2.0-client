import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    display: ${props => props.show ? 'block' : 'none'};
    animation: ${props => props.hide ? 'fadeOut' : null} 0.5s;

    @keyframes fadeOut {
        100% {
            opacity: 0;
        }
    }
`;

const TextContainer = styled.div``;

const WelcomeText = styled.h1`
    margin-top: 30%;
    color: #0f0f12;
    font-size: 40px;
    animation: ${'fadeIn'} 0.5s ease;
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
    }
`;

const Subtitles = styled.h1`
    color: #50505B;
    font-size: 14px;
    animation: ${'fadeIn'} 0.5s ease;
    
        @keyframes fadeIn {
        0% {
            opacity: 0;
        }
    }
`;

class Welcome extends Component {
    state = {
        display: true,
        hide: false,
        showText: false,
        showSubtitles: false
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({showText: true});
        }, 500);

        setTimeout(() => {
            this.setState({showSubtitles: true});
        }, 1200);

        setTimeout(() => {
            this.setState({showText: false, showSubtitles: false, hide: true});
        }, 1800);

        setTimeout(() => {
            this.setState({display: false, hide: false});
        }, 2000);
    }

    render() {
        return (
            <Container show={this.state.display} hide={this.state.hide}>
                <TextContainer>
                    <WelcomeText hidden={!this.state.showText}>Roth Management</WelcomeText>
                </TextContainer>
                <TextContainer>
                    <Subtitles hidden={!this.state.showSubtitles}>BETA VERSION 1.0.0</Subtitles>
                </TextContainer>
            </Container>
        )
    }
}

export default Welcome;