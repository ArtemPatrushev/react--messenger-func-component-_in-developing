const SET_USER_DATA = 'SET_USER_DATA';

// объявляем стейт по умолчанию --- передаем его в profileReducer

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
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
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login) => {    // actionCreator - отсюда берем data для работы userReducer
    // в return сам action
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    }
}

export default authReducer;