import React from 'react';
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Description = styled.label` 
    font-weight: bold;
    color: #000000;
    text-align: left;
    margin-left: 5px;
    margin-top: 5px;
`;

const Input = styled.input`
    outline: none;
    padding: 7px;
    font-size: 14px;
    background: #f8f8f8;
    border: 1px solid #f2f2f2;
    margin-bottom: 10px;
    
    &:focus {
        background: #f2f2f2;
        border: ${props => props.valid ? '1px solid #009900' : '1px solid #fd5c63'};
    }
    
    &:focus:hover {
        background: #f2f2f2;
        border: ${props => props.valid ? '1px solid #009900' : '1px solid #fd5c63'};
    }
    
    &:hover {
        background: #f2f2f2;
    }
`;

const TextArea = styled.textarea`
    outline: none;
    padding: 7px;
    margin-bottom: 10px;
    
    &:focus {
        background: #f2f2f2;
        border: ${props => props.valid ? '1px solid #00878C' : '1px solid #fd5c63'};
    }
    
    &:focus:hover {
        background: #f2f2f2;
        border: ${props => props.valid ? '1px solid #00878C' : '1px solid #fd5c63'};
    }
    
    &:hover {
        background: #f2f2f2;
    }
`;

const forms = (props) => {
    let formInput = null;

    switch (props.formType) {
        case('input'):
            formInput = <Input {...props.formConfig} valid={props.valid} value={props.value} onChange={props.changed}/>;
            break;
        case ('number'):
            formInput = <Input {...props.formConfig} valid={props.valid} value={props.value} onChange={props.changed}/>;
            break;
        case ('date'):
            formInput = <Input {...props.formConfig} valid={props.valid} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            formInput = <TextArea {...props.formConfig} valid={props.valid} value={props.value} onChange={props.changed}/>;
            break;
        case ('file'):
            formInput = <Input {...props.formConfig} valid={props.valid} value={props.value} onChange={props.changed}/>;
            break;
        default:
            formInput = <Input {...props.formConfig} valid={props.valid} value={props.value} onChange={props.changed}/>;
    }

    return (
        <InputContainer>
            <Description>{props.description}</Description>
            {formInput}
        </InputContainer>
    )
};

export default forms;