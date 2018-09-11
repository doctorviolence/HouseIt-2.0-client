import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 700px) {
        width: 70vw;
        flex-direction: column;
    }
`;

export const TextContainer = styled.div`
    width: 60vw;
    display: flex;
    text-align: left;
    font-size: 24px;
    margin-bottom: 5px;
    border-bottom: 1px solid #bdbebf;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 16px;
    }
`;

export const ArrowContainer = styled.div`
    font-size: 30px;
    color: #bdbebf;
`;

export const ButtonContainer = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 3px;
    align-items: right;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        width: 100vw;
    }
`;

export const Button = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 12px;
        width: 100px;
    }
`;