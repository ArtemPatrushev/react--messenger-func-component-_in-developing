import { authAPI } from '../api/api';

const SET_USER_DATA = 'SET-USER-DATA';
const SET_USER_PHOTO = 'SET-USER-PHOTO';

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
                ...action.data,
                    // копируется state, потом копируются данные из action, записываются как объект в data (придет id, login, email, isFetching) и перезаписывают старый state
                isAuth: true
            }
        // case SET_USER_PHOTO:
        //     return {
        //         ...state,
        //         photo: action.photo
        //     }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login) => {    // actionCreator - отсюда берем data для работы userReducer
    // в return сам action
    console.log(id, email, login);
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    }
}

// export const setUserPhoto = (photo) => {
//     return {
//         type: SET_USER_PHOTO,
//         photo
//     }
// }



export const getAuthUserDataInfoThunkCreator = (userId) => {
    return (dispatch) => {
        authAPI.getMe()         // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
            .then(data => {
                if (data.resultCode === 0) {     // в response придет ответ с API, проверяем response.data.resultCode === 0 (из документации API samurai значит, что авторизован) --- вызываем setAuthUserData (данные пользователя)
                    let { id, email, login, photo } = data.data;    //  response.data.data.login (две data) --- тк у axios стандартно данные в data и бэкэнд разработчик в API тоже упаковал данные в data
                    dispatch(setAuthUserData(id, email, login));       // здесь важна последовательность переменных
                    // authAPI.getProfilePhoto(userId)
                    //     .then(photo => {
                    //         dispatch(setUserPhoto(photo));
                    //     })
                    console.log(id, email, login);
                }
            });
    }
}

export default authReducer;