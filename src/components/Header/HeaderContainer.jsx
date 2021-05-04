import React from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import {setAuthUserData} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })  // withCredentials --- значит, что передаем запрос на API со своими параметрами пользователя
            .then(response => {
                if (response.data.resultCode === 0) {     // в response придет ответ с API, проверяем response.data.resultCode === 0 (из документации API samurai значит, что авторизован) --- вызываем setAuthUserData (данные пользователя)
                    let { id, email, login } = response.data.data;    //  response.data.data.login (две data) --- тк у axios стандартно данные в data и бэкэнд разработчик в API тоже упаковал данные в data
                    this.props.setAuthUserData(id, email, login);    // здесь важна последовательность переменных
                    
                }
            });
    }

    render() {
        return <Header {...this.props} />    // пробрасываем все пропсы
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);