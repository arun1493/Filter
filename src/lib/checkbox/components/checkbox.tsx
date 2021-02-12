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
}

const CheckBoxGroup = (props: Props) => {

    const {name, value, onChange, options} = props;

    return (
        <label>
            <CheckboxGroup name={name} value={value || []} onChange={onChange}>
                {(Checkbox) => (
                    <React.Fragment key={name}>
                        {map(({label, value}) => <label> {label}
                            <Checkbox value={value}/>
                        </label>, options)}
                    </React.Fragment>
                )}
            </CheckboxGroup>
        </label>
    )
}

export default CheckBoxGroup;