import React from 'react';
import styled from "styled-components";
import Forms from '../ui/forms/Forms';

const FormContainer = styled.div`
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
    animation: ${props => (props.show ? 'slideOut' : 'slideIn')} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    
    @keyframes slideOut {
      0% {
         transform: translateY(100vw);
      }
   }
   
    @keyframes slideIn {
      100% {
         transform: translateY(100vw);
      }
    }
`;

const Title = styled.h2`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CancelButton = styled.button`
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

const SubmitButton = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    display: ${props => props.formValid ? 'flex' : 'none'};
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;
    font-size: 14px;
    
    @media screen and (max-width: 700px) {
        max-width: 80%;
    }
`;

const add = (props) => {
    const addFormInputs = [];
    for (let key in props.addForm) {
        addFormInputs.push({
            id: key,
            config: props.addForm[key]
        });
    }

    let form = (
        <Form>
            {addFormInputs.map(input => (
                <Forms
                    key={input.id}
                    formType={input.config.formType}
                    formConfig={input.config.formConfig}
                    value={input.config.value}
                    valid={input.config.valid}
                    description={input.config.description}
                    changed={props.addFormChanged}/>
            ))}
        </Form>
    );

    return (
        <FormContainer show={props.display}>
            <ButtonContainer>
                <CancelButton onClick={props.toggleAdd}> ‹ Cancel</CancelButton>
                <SubmitButton formValid={props.formValid} onClick={props.submitData}> Done</SubmitButton>
            </ButtonContainer>
            <Title>{props.title}</Title>
            {form}
        </FormContainer>
    );
};

export default add;