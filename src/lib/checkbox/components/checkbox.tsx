import React from 'react'
import CheckboxGroup from 'react-checkbox-group'
import {map} from "ramda";

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
        <label> {label}
            <CheckboxGroup name={name} value={value || []} onChange={onChange}>
                {(Checkbox) => (
                    <React.Fragment>
                        {map(({label, value}) => <label key={label}> {label}
                            <Checkbox  value={value}/>
                        </label>, options)}
                    </React.Fragment>
                )}
            </CheckboxGroup>
        </label>
    )
}

export default CheckBoxGroup;