import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';
const SET_USER_PHOTO = 'samurai-network/auth/SET-USER-PHOTO';

// объявляем стейт по умолчанию --- передаем его в profileReducer

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    photo: null
    // isFetching: false
};

// при помощи функции reducer мы получили state и action произвели преобразования, описанные в action над stat-ом и вернули преобразованный state

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                    // копируется state, потом копируются данные из action, записываются как объект в data (придет id, login, email, isFetching) и перезаписывают старый state
                // isAuth: true
            };
        // case SET_USER_PHOTO:
        //     return {
        //         ...state,
        //         photo: action.photo
        //     }
        default:
            return state;
    };
};

export const setAuthUserData = (id, email, login, isAuth) => {    // actionCreator - отсюда берем data для работы userReducer
    // в return сам action
    console.log(id, email, login);
    return {
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth}
    };
};

// export const setUserPhoto = (photo) => {
//     return {
//         type: SET_USER_PHOTO,
//         photo
//     }
// }

export const getAuthUserDataInfoThunkCreator = (userId) => {
    return (dispatch) => {
        // return здесь нужен, чтобы then вернул promise, который используется в appReducer
        return authAPI.getMe()         // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
            .then(data => {
                if (data.resultCode === 0) {     // в response придет ответ с API, проверяем response.data.resultCode === 0 (из документации API samurai значит, что авторизован) --- вызываем setAuthUserData (данные пользователя)
                    let { id, email, login, photo } = data.data;    //  response.data.data.login (две data) --- тк у axios стандартно данные в data и бэкэнд разработчик в API тоже упаковал данные в data
                    dispatch(setAuthUserData(id, email, login, true));       // здесь важна последовательность переменных
                    // authAPI.getProfilePhoto(userId)
                    //     .then(photo => {
                    //         dispatch(setUserPhoto(photo));
                    //     })
                    console.log(id, email, login);
                    debugger;
                };
            });
    };
};

// пример работы с async await
export const loginThC = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        // если зарегестрирован(лся) --- вызываем getAuthUserDataInfoThunkCreator, чтобы получить данные пользователя
        dispatch(getAuthUserDataInfoThunkCreator())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        // специальный action из redux-form, который поможет отобразить ошибку, которая приходит из сервера
        // в него передается название формы, которую нужно остановить, а вторым параметром - проблемное поле (в двнном случаем создаем свое свойство для общих ошибок)
        dispatch(stopSubmit('login', { _error: message }));
    };
};

export const logoutThC = () => async (dispatch) => {
        let data = await authAPI.logout();
        if (data.resultCode === 0) {
            // если зарегестрирован(лся) --- вызываем getAuthUserDataInfoThunkCreator, чтобы получить данные пользователя
            dispatch(setAuthUserData(null, null, null, false)); 
        };
};

export default authReducer;
