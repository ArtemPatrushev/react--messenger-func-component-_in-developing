import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {getAuthUserDataInfoThunkCreator} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {

    componentDidMount() {
        // usersAPI.setAuthUserDataInfo()         // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
        //     .then(data => {
        //         if (data.resultCode === 0) {     // в response придет ответ с API, проверяем response.data.resultCode === 0 (из документации API samurai значит, что авторизован) --- вызываем setAuthUserData (данные пользователя)
        //             let { id, email, login } = data.data;    //  response.data.data.login (две data) --- тк у axios стандартно данные в data и бэкэнд разработчик в API тоже упаковал данные в data
        //             this.props.setAuthUserData(id, email, login);       // здесь важна последовательность переменных
        //             usersAPI.getProfilePhoto()
        //                 .then(photo => {
        //                     this.props.setUserPhoto(photo);
        //                 })   
        //         }
        //     });
        this.props.getAuthUserDataInfoThunkCreator();
    }

    render() {
        return <Header {...this.props} />    // пробрасываем все пропсы
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // photo: state.auth.photo
    // profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { getAuthUserDataInfoThunkCreator })(HeaderContainer);