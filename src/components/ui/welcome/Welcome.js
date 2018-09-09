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
    background: #ffffff;
    display: ${props => props.show ? 'flex' : 'none'}
    animation: ${props => props.hide ? 'hide' : 'scale'} 0.3s;
    
    @keyframes hide {
        100% {
             transform: scale(0);
             opacity: 0;
        }
    }
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease;
`;

const Logo = styled.img`
    height: 100px;
    width: 100px;
    animation: 'slideIn' 0.5s ease;
    
    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    @media screen and (max-width: 700px) {
        height: 50px;
        width: 50px;
    }
`;

const WelcomeText = styled.h1`
    margin-left: 10px;
    color: #444444;
    font-size: 40px;
    animation: 'slideIn' 0.5s ease;
    
    @keyframes slideIn {
        0% {
            transform: translateX(50vw);
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
        }, 300);

        setTimeout(() => {
            this.setState({showText: true});
        }, 800);

        setTimeout(() => {
            this.setState({hide: true});
        }, 1700);

        setTimeout(() => {
            this.setState({showLogo: false, showText: false})
        }, 1900);

        setTimeout(() => {
            this.setState({display: false, hide: false});
        }, 2000);
    }

    render() {
        return (
            <Container show={this.state.display} hide={this.state.hide}>
                <TextContainer hide={this.state.hide}>
                    <Logo src="/images/house_logo.png" hidden={!this.state.showLogo}/>
                </TextContainer>
                <TextContainer hide={this.state.hide}>
                    <WelcomeText hidden={!this.state.showText}>ROTH FASTIGHETER AB</WelcomeText>
                </TextContainer>
            </Container>
        )
    }
}

export default Welcome;