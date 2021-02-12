import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group'
import {map} from "ramda";

type Option = {
    label: string;
    value: string;
}

interface Props {
    name: string;
    value: string;
    options: Array<Option>;
    onChange: (value: string) => void;
    label: string;
}

const RadioInput = (props: Props) => {
    const {name, value, onChange, options, label} = props;
    return <label> {label} <RadioGroup name={name} selectedValue={value || ''} onChange={onChange}>
        {map(({label, value}) => <React.Fragment key={label}><Radio value={value}/>{label}</React.Fragment>, options)}
    </RadioGroup>
    </label>
}

export default RadioInput;