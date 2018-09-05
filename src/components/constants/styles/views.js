import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    animation: 'fadeIn' 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    
    @keyframes fadeIn {
      0% {
         opacity: 0;
      }
   }
    
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

export const PageContainer = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    width: 100vw;
    
    @media screen and (max-width: 700px) {
        margin-bottom: 48px;
    }
`;

export const Menu = styled.div`
    position: fixed;
    width: 100vw;
    height: 42px;
    top: 0;
    left: 0;
    right: 0;
    text-align: left;
    background: #ffffff;
    user-select: none;
`;

export const MenuButton = styled.div`
    height: 42px;
    width: 150px;
    text-align: left;
    margin-top: 10px;
    margin-left: 16px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #CC0033;
    user-select: none;
`;

export const Title = styled.h2`
    color: #333333;
    font-size: 24px;
    text-align: left;
    margin-left: 32px;
    margin-bottom: 32px;
    cursor: default;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }
`;

export const AddButton = styled.button`
    margin: auto;
    width: 30px;
    height: 100%;
    justify-content: center;
    color: #CC0033;
    background: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
    
    &:hover {
        background: #f2f2f2;
    }
`;