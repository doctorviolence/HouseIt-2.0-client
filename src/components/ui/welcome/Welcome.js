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
    transition: all 0.3s ease-in-out;
    display: ${props => props.show ? 'flex' : 'none'}
    animation: ${props => props.show ? null : 'hide'};

    @keyframes hide {
        100% {
             transform: scale(0);
             opacity: 0;
        }
    }
`;

const TextContainer = styled.div`
    transition: all 0.3s ease-in-out;
`;

const Logo = styled.h1`
    position: relative;
    color: #444444;
    font-size: 100px;
    transition: all 0.3s ease-in-out;
    animation: 'slideIn' 0.3s ease;
    
    @keyframes slideIn {
        0% {
            transform: translateX(50vw);
        }
    }
`;

const WelcomeText = styled.h1`
    position: relative;
    margin-top: 60px;
    margin-left: 10px;
    color: #444444;
    font-size: 40px;
    transition: all 0.3s ease-in-out;
    animation: 'slideIn' 0.3s ease;
    
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
            this.setState({display: false});
        }, 1800);
    }

    render() {
        return (
            <Container show={this.state.display}>
                <Logo hidden={!this.state.showLogo}>⌂</Logo>
                <TextContainer>
                    <WelcomeText hidden={!this.state.showText}>ROTH FASTIGHETER AB</WelcomeText>
                </TextContainer>
            </Container>
        )
    }
}

export default Welcome;