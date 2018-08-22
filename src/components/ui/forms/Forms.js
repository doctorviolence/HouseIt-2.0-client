import React from 'react';
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Description = styled.label` 
    font-weight: bold;
    color: #000000;
`;

const Input = styled.input`
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

`;

const TextArea = styled.textarea`
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

`;

const forms = (props) => {
    let formInput = null;

    switch (props.formType) {
        case('input'):
            formInput = <Input {...props.formConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('number'):
            formInput = <Input {...props.formConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('date'):
            formInput = <Input {...props.formConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            formInput = <TextArea {...props.formConfig} value={props.value} onChange={props.changed}/>;
            break;
        default:
            formInput = <Input {...props.formConfig} value={props.value} onChange={props.changed}/>;
    }

    return (
        <InputContainer>
            <Description>{props.description}</Description>
            {formInput}
        </InputContainer>
    )
};

export default forms;