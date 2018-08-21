import styled from "styled-components";

export const FormContainer = styled.div`
    position: fixed;
    align-items: center;
    justify-content: space-between;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #ffffff;
`;

export const Title = styled.h2`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Button = styled.button`
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
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;
    font-size: 14px;
    
    label {
        font-weight: bold;
        color: #000000;
    }
    
    input {
        outline: none;
        padding: 7px;
        border: 1px solid #f2f2f2;
        background: transparent;
        margin-bottom: 10px;
        
        &:focus {
            background: #f2f2f2;
        }
        &:hover {
            background: #f2f2f2;
        }
    } 
    
    @media screen and (max-width: 700px) {
        max-width: 80%;
    }
`;