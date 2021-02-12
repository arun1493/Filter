import React from 'react';
import {Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import {ComponentNames, FormField} from "../types";
import Input from '../../input/components/input';
import Select from "../../select/components/select";
import TextArea from "../../text-area/components/text-area";
import CheckBoxGroup from "../../checkbox/components/checkbox";
import RadioInput from "../../radio/components/Radio";

interface Props {
    initialValues: FormikValues;
    handleSubmit: (values: FormikValues, actions: FormikHelpers<FormikValues>) => void;
    render: (props: FormikProps<FormikValues>) => React.ReactElement
}

export const getFormFields = (props: FormikProps<FormikValues>, {label, name, type, props: componentProps}: FormField) => {
    switch (type) {
        case ComponentNames.INPUT:
            return <React.Fragment key={name}>
                <Input
                    name={name}
                    label={label}
                    value={props.values[name]}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}/>
                {props.errors[name] && <div id="feedback">{props.errors[name]}</div>}
            </React.Fragment>

        case ComponentNames.SELECT:
            const searchService = componentProps && componentProps.searchService ? componentProps.searchService : async () => {
            }
            return <React.Fragment key={name}>
                <Select
                    label={label}
                    name={name}
                    value={props.values[name]}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    searchService={searchService}
                />
                {props.errors[name] && <div id="feedback">{props.errors[name]}</div>}
            </React.Fragment>

        case ComponentNames.TEXTAREA:
            return <React.Fragment key={name}>
                <TextArea
                    name={name}
                    label={label}
                    value={props.values[name]}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
            </React.Fragment>

        case ComponentNames.CHECKBOX:
            const checkboxOptions = componentProps && componentProps.options ? componentProps.options : [];
            return <React.Fragment key={name}>
                <CheckBoxGroup
                    label={label}
                    name={name}
                    value={props.values[name]}
                    options={checkboxOptions}
                    onChange={(value) => props.setFieldValue(name, value)}
                />
            </React.Fragment>

        case ComponentNames.RADIO:
            const radioOptions = componentProps && componentProps.options ? componentProps.options : [];
            return <React.Fragment key={name}>
                <RadioInput
                    label={label}
                    name={name}
                    value={props.values[name]}
                    options={radioOptions}
                    onChange={(value) => props.setFieldValue(name, value)}
                />
            </React.Fragment>

        default:
            return <React.Fragment/>
    }
}

const Form = ({initialValues, handleSubmit, render}: Props) => (
    <div>
        <h1>Filters</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {render}
        </Formik>
    </div>
);

export default Form;