export enum ComponentNames {
    INPUT = 'INPUT',
    SELECT = 'SELECT',
    TEXTAREA = 'TEXTAREA',
    CHECKBOX = 'CHECKBOX',
    RADIO = "RADIO"
}

export interface FormField {
    label: string,
    name: string,
    type: ComponentNames,
    props?: {
        [field: string]: any;
    }
}