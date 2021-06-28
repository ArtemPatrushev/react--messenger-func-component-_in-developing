import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { Redirect } from 'react-router';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { Input } from '../Common/FormsControls/FormsControls';
import { loginThC, logoutThC } from '../../redux/auth-reducer';

import s from './Login.module.css';

const maxLength40 = maxLengthCreator(40);

const LoginForm = (props) => {
    return (
        <form 
            action="#" 
            className={s.form} 
            // handleSubmit - вызывается из LoginReduxForm, а в нем (handleSubmit) вызывается onSubmit (<LoginReduxForm onSubmit={onSubmit} />), который вызывает нашу функцию сonst onSubmit()
            onSubmit={props.handleSubmit}>
            {/* <input placeholder='Login' /> */}
            <Field 
                component={Input} 
                validate={[required, maxLength40]}
                placeholder='Email' 
                name={'email'} />
            {/* <input placeholder='Password' /> */}
            <Field 
                component={Input} 
                validate={[required, maxLength40]}
                placeholder='Password' 
                name={'password'}
                type={'password'} />
            {/* <input type="checkbox" /> Remember me */}
            <Field 
                component={Input}
                type="checkbox" 
                name={'rememberMe'} 
                /> Remember me
            {/* если есть ошибка, показываем div */}
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <button>Login</button>
        </form>
    )
}
//<Field component={'input'} placeholder='Login' /> --- спец компонента из redux-from вместо input

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        let { email, password, rememberMe } = formData;
        props.loginThC(email, password, rememberMe);
    };

    if (props.isAuth) {
        return <Redirect to='/profile' />
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { loginThC, logoutThC })(Login);
