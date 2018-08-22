import React from 'react';
import styled from "styled-components";
import Forms from "../ui/forms/Forms";

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

const Button = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
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

const edit = (props) => {
    const editFormInputs = [];
    for (let key in props.editForm) {
        editFormInputs.push({
            id: key,
            config: props.editForm[key]
        });
    }

    let form = (
        <Form>
            {editFormInputs.map(input => (
                <Forms
                    key={input.id}
                    formType={input.config.formType}
                    formConfig={input.config.formConfig}
                    value={input.config.value}
                    invalid={!input.invalid}
                    description={input.config.description}
                    changed={props.editFormChanged}/>
            ))}
        </Form>
    );

    if (props.display) {
        return (
            <FormContainer>
                <ButtonContainer>
                    <Button onClick={props.toggleEdit}> ‹ Cancel</Button>
                    <Button onClick={props.submitData}> Done</Button>
                </ButtonContainer>
                <Title>{props.title}</Title>
                {form}
            </FormContainer>
        );
    }

    return <Button onClick={props.toggleEdit}>Edit</Button>;
};

export default edit;