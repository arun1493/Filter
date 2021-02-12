import React from 'react'
import CheckboxGroup from 'react-checkbox-group'
import {map} from "ramda";
import {InputContainer} from "../../atoms";

type Option = {
    label: string;
    value: string;
}

interface Props {
    name: string;
    value: Array<string>;
    options: Array<Option>;
    onChange: (values: Array<string>) => void;
    label: string;
}

const CheckBoxGroup = (props: Props) => {

    const {name, value, onChange, options, label} = props;

    return (
        <InputContainer>
            <label>{label}</label>
            <CheckboxGroup name={name} value={value || []} onChange={onChange}>
                {(Checkbox) => (
                    <React.Fragment>
                        {map(({label, value}) => <React.Fragment key={label}> <Checkbox value={value}/> {label}
                        </React.Fragment>, options)}
                    </React.Fragment>
                )}
            </CheckboxGroup>
        </InputContainer>
    )
}

export default CheckBoxGroup;