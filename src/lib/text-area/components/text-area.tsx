import React from 'react';

interface Props {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.SyntheticEvent) => void;
    onBlur: (e: React.SyntheticEvent) => void;
}

export const TextArea = ({label, value, onBlur, onChange, name}: Props) => {

    return <label> {label}
        <textarea
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ''}
        />
    </label>
}

export default TextArea;