import React from 'react';
import { Field } from 'redux-form';

import s from './FormsControls.module.css';

const FormControl = ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div className={s.textField}>
                {props.children}
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    );
};

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea className={s.form} {...input} {...restProps} /></FormControl>
};

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input className={s.form} {...input} {...restProps} /></FormControl>
};

export const createField = (placeholder, name, validators, component, props={}, text='') => {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            /> {text}
        </div>
    );
};
