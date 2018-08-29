import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    margin: 24px auto;
    padding: 24px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
`;

export const TextContainer = styled.div`
    width: 70%;
    height: 100%;
    margin: auto;
    display: flex;
    text-align: left;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    
    &:hover {
        font-size: 16px;
    }
`;

export const ButtonContainer = styled.div`
    width: 20%;
    height: 100%;
    align-items: right;
    justify-content: space-between;
    display: flex;
`;

export const Button = styled.button`
    height: 100%;
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 10px;
    }
    
    &:hover {
        font-size: 16px;
    }
`;