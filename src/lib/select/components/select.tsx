import React from "react";
import {map} from 'ramda';
import {InputContainer} from '../../atoms';

type Option = {
    label: string;
    value: string;
}

interface Props {
    searchService: () => Promise<Array<Option>>;
    name: string;
    onChange: (e: React.SyntheticEvent) => void;
    onBlur: (e: React.SyntheticEvent) => void;
    value: string;
    label: string
}

interface State {
    options: Array<Option>
}

class Select extends React.Component<Props, State> {

    state = {
        options: []
    }

    async componentDidMount() {
        const {searchService} = this.props;
        try {
            const options = await searchService();
            this.setState({
                options
            })
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const {options} = this.state;
        const {onChange, onBlur, value, name, label} = this.props;
        return (
            <InputContainer>
            <label> {label}             </label>

        <select name={name} onChange={(e) => onChange(e)} onBlur={onBlur} value={value || ''}>
                    {map(({label, value}: Option) => <option key={label} value={value}>{label}</option>, options)}
                </select>
            </InputContainer>
        );
    }
}

export default Select;