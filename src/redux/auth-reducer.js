import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';
// const SET_USER_PHOTO = 'samurai-network/auth/SET-USER-PHOTO';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    photo: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    };
};

export const setAuthUserData = (id, email, login, isAuth) => {
    console.log(id, email, login);
    return {
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth}
    };
};

export const getAuthUserDataInfoThunkCreator = (userId) => {
    return (dispatch) => {
        return authAPI.getMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                    console.log(id, email, login);
                };
            });
    };
};

export const loginThC = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(getAuthUserDataInfoThunkCreator())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    };
};

export const logoutThC = () => async (dispatch) => {
        let data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false)); 
        };
};

export default authReducer;
