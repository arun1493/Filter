import React from 'react';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {map} from "ramda";
import {ComponentNames, FormField} from "../types";
import Input from '../../input/components/input';
import Select from "../../select/components/select";
import TextArea from "../../text-area/components/text-area";

interface Props {
    initialValues: FormikValues;
    handleSubmit: (values: FormikValues, actions: FormikHelpers<FormikValues>) => void;
    fields: Array<FormField>;
}

const Form = ({initialValues, handleSubmit, fields}: Props) => (
    <div>
        <h1>Filters</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    {map(({label, name, type, props: componentProps}) => {
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
                            default:
                                return <React.Fragment/>
                        }
                    }, fields)}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    </div>
);

export default Form;