import React from "react";
import Modal from "../../../lib/modal/components/modal";
import Form, {getFormFields} from '../../../lib/form/components/form';
import {ComponentNames, FormField} from "../../../lib/form/types";
import {FormikProps, FormikValues} from "formik";

interface State {
    showFilterDialog: boolean
}

const fields: Array<FormField> = [
    {
        label: 'Name',
        name: 'name',
        type: ComponentNames.INPUT
    },
    {
        label: 'Gender',
        name: 'gender',
        type: ComponentNames.SELECT,
        props: {
            searchService: () => Promise.resolve([
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'}
            ])
        }
    },
    {
        label: 'Hobbies',
        name: 'hobbies',
        type: ComponentNames.TEXTAREA
    },
    {
        label: 'Age',
        name: 'age',
        type: ComponentNames.CHECKBOX,
        props: {
            options: [
                {label: 'Below 40', value: 'below 40'},
                {label: 'Above 40', value: 'above 40'},
            ]
        }
    }
];

const [name, gender, hobbies, Age] = fields;


class Home extends React.Component<{}, State> {

    state = {
        showFilterDialog: false
    }

    handleFilterClick = () => {
        this.setState({
            showFilterDialog: true
        });
    }

    handleModalClose = () => {
        this.setState({
            showFilterDialog: false
        });
    }

    render() {
        const {showFilterDialog} = this.state;
        return <div>
            <button onClick={this.handleFilterClick}>clickMe</button>
            <Modal show={showFilterDialog} close={this.handleModalClose}>
                <Form
                    initialValues={{}}
                    handleSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    render={(props: FormikProps<FormikValues>) => (
                        <form onSubmit={props.handleSubmit}>
                            <>
                                {getFormFields(props, name)}
                            </>
                            <>
                                {getFormFields(props, gender)}
                            </>
                            <>
                                {getFormFields(props, hobbies)}
                            </>
                            <>
                                {getFormFields(props, Age)}
                            </>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                />
            </Modal>
        </div>
    }
}

export default Home;