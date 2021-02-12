import React from 'react';

interface Props {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.SyntheticEvent) => void;
    onBlur: (e: React.SyntheticEvent) => void;
}

export const input = ({label, value, onBlur, onChange, name}: Props) => {

    return <label> {label}
        <input
            name={name}
            type='text'
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
        />
    </label>
}

export default input;