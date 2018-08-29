import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    animation: 'fadeIn' 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    
    @keyframes fadeIn {
      0% {
         opacity: 0;
      }
   }
    
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

export const DetailsContainer = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 48px;
    left: 0;
    margin-right: 20px;
    bottom: 0;
    border-right: 1px solid #f2f2f2;
    background: #ffffff;
    width: 300px;
    height: 100%;
    
    @media screen and (max-width: 700px) {
        position: relative;
        width: 100%;
        height: 20%;
        margin-right: 0;
    }
`;

export const DetailsTitle = styled.h2`
    color: #444444;
    font-size: 30px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

export const DetailsText = styled.div`
    color: #444444;
    font-size: 14px;
    text-align: left;
    margin-left: 32px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const PageContainer = styled.div`
    margin-bottom: 16px;
    margin-left: 320px;
    display: flex;
    flex-direction: column;
    width: 100%;
    
    @media screen and (max-width: 700px) {
        width: 100%;
        margin-bottom: 48px;
    }
`;

export const Menu = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    left: 10px;
    right: 0;
    text-align: left;
    background: #ffffff;
    color: #CC0033;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    
    @media screen and (max-width: 700px) {
        position: fixed;
        font-size: 20px;
        top: 0;
    }
    
     &:hover {
        font-size: 25px;
     }
`;

export const Title = styled.h2`
    color: #CC0033;
    font-size: 25px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        display: none;
    }
`;

export const AddButton = styled.button`
    margin: auto;
    width: 30px;
    height: 100%;
    justify-content: center;
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
    
    &:hover {
        font-size: 30px;
    }
`;