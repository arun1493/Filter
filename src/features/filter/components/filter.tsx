import React from "react";
import Modal from "../../../lib/modal/components/modal";
import Form, {getFormFields} from '../../../lib/form/components/form';
import {ComponentNames, FormField} from "../../../lib/form/types";
import {FormikHelpers, FormikProps, FormikValues} from "formik";
import {reduce} from "ramda";
import {FieldContainer, FilterComponentContainer, FilterElementsContainer, ActionsContainer} from './atoms';

interface State {
    showFilterDialog: boolean;
    filterData: FormikValues;
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

const getFilterCount = (values: FormikValues) => {
    return reduce((acc, key) => {
        acc = values[key] && values[key].length ? acc + 1 : acc;
        return acc;
    }, 0, Object.keys(values));
};

class Filter extends React.Component<{}, State> {

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
        this.setState({
            filterData: values
        });
    }

    handleFormReset = (props: FormikProps<FormikValues>) => {
        props.resetForm({values: {}});
        this.setState({
            filterData: {}
        });
    }

    render() {
        const {showFilterDialog, filterData} = this.state;
        const filterCount = getFilterCount(filterData);
        return <FilterComponentContainer>
            <button onClick={this.handleFilterClick}>Filters {!!filterCount && `(${filterCount})`}</button>
            <Modal show={showFilterDialog} close={this.handleModalClose}>
                <Form
                    initialValues={filterData}
                    handleSubmit={this.handleFilterSubmit}
                    render={(props: FormikProps<FormikValues>) => {
                        return (
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
                                    <button type='button' onClick={() => this.handleFormReset(props)}>Clear All</button>
                                    <button type="submit">Apply Filters</button>
                                </ActionsContainer>
                            </form>
                        )
                    }}
                />
            </Modal>
        </FilterComponentContainer>
    }
}

export default Filter;