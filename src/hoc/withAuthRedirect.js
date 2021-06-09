import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

// HOC - принимает передаваемую в качестве аргумента компоненту, выполняет нужный функционал и возвращает новую компоненту
export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if (!props.isAuth) {
            return <Redirect to={'/login'} />       // если не авторизован, то перекинет на страницу login
        };
        return <Component {...props} />             // {...props} - таким образом перекидываем все пропсы, которые есть
    };
    
    // обораиваем RedirectComponent еще одним контейнером, через который передаем - isAuth: state.auth.isAuth
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
};
