import styled from "styled-components";

export const Container = styled.div`
    height: 70vh;
    width: 80%;
    margin-left: auto;
    margin-top: 20vh;
    margin-right: auto;
    display: flex;
    transform: ${props => props.newFrame ? 'slideOut' : null} 0.3s ease-in-out;
    animation: ${props => props.newFrame ? 'slideIn' : 'slideOut'} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    overflow: auto;
   
    @keyframes slideOut {
        0% {
            opacity: 0;
            transform: translateX(-20vw);
        }
    }
   
    @keyframes slideIn {
        100% {
             opacity: 0;        
             transform: translateX(100vw);
        }  
    }  
    
    @media screen and (max-width: 700px) {
        width: 100%;
        flex-direction: column;
    }
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    @media screen and (max-width: 700px) {
        margin-bottom: 48px;
    }
`;

export const Menu = styled.div`
    position: fixed;
    height: 100px;
    top: 0;
    left: 0;
    right: 0;
    text-align: left;
    background: #ffffff;
`;

export const MenuButton = styled.div`
    height: 40px;
    text-align: left;
    margin-top: 10px;
    margin-left: 16px;
    font-size: 24px;
    cursor: pointer;
    color: #CC0033;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }
`;

export const Title = styled.h2`
    color: #333333;
    font-size: 36px;
    margin-left: 32px;
    cursor: default;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 24px;
    }
`;

export const AddButton = styled.button`
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: left;
    color: #CC0033;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;