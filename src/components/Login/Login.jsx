import React from 'react';
import {Field, reduxForm} from 'redux-form';
import s from './Login.module.css';

const LoginForm = (props) => {
    return (
        <form 
            action="#" 
            className={s.form} 
            // handleSubmit - вызывается из LoginReduxForm, а в нем (handleSubmit) вызывается onSubmit (<LoginReduxForm onSubmit={onSubmit} />), который вызывает нашу функцию сonst onSubmit()
            onSubmit={props.handleSubmit}>
            {/* <input placeholder='Login' /> */}
            <Field component={'input'} placeholder='Login' name={'login'} />
            {/* <input placeholder='Password' /> */}
            <Field component={'input'} placeholder='Password' name={'password'} />
            {/* <input type="checkbox" /> Remember me */}
            <Field component={'input'} type="checkbox" name={'rememberMe'} /> Remember me
            <button>Login</button>
        </form>
    )
}
//<Field component={'input'} placeholder='Login' /> --- спец компонента из redux-from вместо input

const LoginReduxForm = reduxForm({
    // каждая форма должна иметь уникальное строковое имя
    form: 'login'
    // передаем форму, которую необходимо обернуть
})(LoginForm);

const Login = (props) => {
    // formData - данные из Field, которые пришли из LoginReduxForm
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;