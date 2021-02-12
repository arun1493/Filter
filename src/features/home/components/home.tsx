import React from "react";
import Modal from "../../../lib/modal/components/modal";
import Form from '../../../lib/form/components/form';
import {ComponentNames, FormField} from "../../../lib/form/types";

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
    }
];


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
                    fields={fields}
                />
            </Modal>
        </div>
    }
}

export default Home;