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
    transition: all 0.5s;
    display: ${props => props.hide ? 'none' : 'flex'};
    animation: ${props => props.show ? 'fadeIn' : 'fadeOut'};
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        100% {
            opacity: 0;
        }
    }
`;

const TextContainer = styled.div`
    transition: all 0.5s;
    animation: ${props => props.hide ? 'fadeOut' : 'fadeIn'} 0.3s ease;
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        100% {
            opacity: 0;
        }
    }
`;

const Logo = styled.h1`
    position: relative;
    color: #9BB42C;
    font-size: 100px;
    animation: ${'scale'} 0.3s ease;
    
    @keyframes scale {
        0% {
            transform: scale(0)
        }
    }
`;

const WelcomeText = styled.h1`
    position: relative;
    margin-top: 60px;
    margin-left: 10px;
    color: #9BB42C;
    font-size: 40px;
    animation: ${'fadeIn'} 0.3s ease;
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
    }
    
    @media screen and (max-width: 700px) {
        margin-top: 30px;
        font-size: 20px;
    }
`;

class Welcome extends Component {
    state = {
        display: true,
        hide: false,
        showLogo: false,
        showText: false
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({showLogo: true});
        }, 0);

        setTimeout(() => {
            this.setState({showText: true});
        }, 700);

        setTimeout(() => {
            this.setState({showLogo: false, showText: false});
        }, 1500);

        setTimeout(() => {
            this.setState({hide: true});
        }, 2000);
    }

    render() {
        return (
            <Container show={this.state.display} hide={this.state.hide}>
                <Logo hidden={!this.state.showLogo}>⌂</Logo>
                <TextContainer show={this.state.display} hide={!this.state.display}>
                    <WelcomeText hidden={!this.state.showText}>ROTH FASTIGHETER</WelcomeText>
                </TextContainer>
            </Container>
        )
    }
}

export default Welcome;