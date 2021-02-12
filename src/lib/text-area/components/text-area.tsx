import React from 'react';
import {InputContainer} from '../../atoms';

interface Props {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.SyntheticEvent) => void;
    onBlur: (e: React.SyntheticEvent) => void;
}

export const TextArea = ({label, value, onBlur, onChange, name}: Props) => {

    return <InputContainer>
        <label> {label}     </label>
        <textarea
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
        />
    </InputContainer>
}

export default TextArea;