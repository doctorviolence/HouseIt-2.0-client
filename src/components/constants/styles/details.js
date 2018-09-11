import styled from "styled-components";

export const Container = styled.div`
    margin-left: 20vw;
    margin-right: 20vw;
    
    @media screen and (max-width: 700px) {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`;

export const DetailsContainer = styled.div`
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    right: 0;
    top: 0;
    width: 30vw;
    height: 100vh;
    animation: 'slideIn' 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    
    @keyframes slideIn {
      0% {
         transform: translateX(100vw);
      }
   }
    
    @media screen and (max-width: 700px) {
        width: 100vw;
        height: 100vh;
    }
`;

export const DetailsClose = styled.div`
    width: 100%;
    height: 20%;
    margin-bottom: 10px;
    top: 0;
    left: 0;
    text-align: left;
`;

export const CloseButton = styled.div`
    width: 10px;
    height: 10px;
    margin-left: 10px;
    color: #999999;
    font-size: 30px;
    cursor: pointer;
    user-select: none;
    
    &:hover {
        color: #333333;
    }
`;

export const DetailsTitle = styled.h2`
    width: 100%;
    color: #333333;
    text-align: center;
    font-size: 30px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

export const DetailsText = styled.div`
    color: #333333;
    font-size: 14px;
    text-align: left;
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        top: 0; 
        bottom: 0;
        left: 0;
        right: 0;
        width: 80%;
        height: 100%;
        margin-left: 10px;
        margin-right: 10px;
    }
`;

export const Label = styled.label`
    font-weight: bold;
`;

export const Text = styled.p`
    border-bottom: 1px solid #f2f2f2;
`;

export const Backdrop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #333333;
    opacity: 0.3;    
    
    @media screen and (max-width: 700px) {
        display: none;
    }
`;