import React from 'react';
import {InputContainer} from '../../atoms';

interface Props {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.SyntheticEvent) => void;
    onBlur: (e: React.SyntheticEvent) => void;
}

export const input = ({label, value, onBlur, onChange, name}: Props) => {

    return <InputContainer>
    <label> {label}     </label>

    <input
            name={name}
            type='text'
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
        />
    </InputContainer>
}

export default input;