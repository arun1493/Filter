import React from "react";
import Modal from "../../../lib/modal/components/modal";
import Form, {getFormFields} from '../../../lib/form/components/form';
import {ComponentNames, FormField} from "../../../lib/form/types";
import {FormikHelpers, FormikProps, FormikValues} from "formik";
import styled from "styled-components";

interface State {
    showFilterDialog: boolean;
    filterData: object;
}

const FilterComponentContainer = styled.div`
  position: relative;
  top: 180px;
  left: 330px
`;

const FilterElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const FieldContainer = styled.div`
  padding: 8px;
`;

const ActionsContainer = styled.div`
  margin-left: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

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
        label: 'Vehicle',
        name: 'vehicle',
        type: ComponentNames.CHECKBOX,
        props: {
            options: [
                {label: 'Two Wheeler', value: 'two wheeler'},
                {label: 'Four Wheeler', value: 'four wheeler'},
            ]
        }
    },
    {
        label: 'Age',
        name: 'age',
        type: ComponentNames.RADIO,
        props: {
            options: [
                {label: 'Below 40', value: 'below 40'},
                {label: 'Above 40', value: 'above 40'},
            ]
        }
    },
];

const [name, gender, hobbies, vehicle, age] = fields;


class Home extends React.Component<{}, State> {

    state = {
        showFilterDialog: false,
        filterData: {}
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

    handleFilterSubmit = (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        actions.setSubmitting(false);
        this.setState({
            filterData: values
        });
    }

    handleFormReset = (props: FormikProps<FormikValues>) => {
        props.resetForm();
        this.setState({
            filterData: {}
        });
    }

    render() {
        const {showFilterDialog, filterData} = this.state;
        const filterCount = Object.keys(filterData).length;
        return <FilterComponentContainer>
            <button onClick={this.handleFilterClick}>Filters {!!filterCount && `(${filterCount})`}</button>
            <Modal show={showFilterDialog} close={this.handleModalClose}>
                <Form
                    initialValues={filterData}
                    handleSubmit={this.handleFilterSubmit}
                    render={(props: FormikProps<FormikValues>) => (
                        <form onSubmit={props.handleSubmit}>
                            <FilterElementsContainer>
                                <FieldContainer>
                                    {getFormFields(props, name)}
                                </FieldContainer>
                                <FieldContainer>
                                    {getFormFields(props, gender)}
                                </FieldContainer>
                                <FieldContainer>
                                    {getFormFields(props, hobbies)}
                                </FieldContainer>
                                <FieldContainer>
                                    {getFormFields(props, vehicle)}
                                </FieldContainer>
                                <FieldContainer>
                                    {getFormFields(props, age)}
                                </FieldContainer>
                            </FilterElementsContainer>
                            <ActionsContainer>
                            <button onClick={() => this.handleFormReset(props) }>Clear All</button>
                            <button type="submit">Apply Filters</button>
                            </ActionsContainer>
                        </form>
                    )}
                />
            </Modal>
        </FilterComponentContainer>
    }
}

export default Home;