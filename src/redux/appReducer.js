import { getAuthUserDataInfoThunkCreator} from './auth-reducer';

const SET_INITIALIZED_SUCCESS = 'SET-INITIALIZED';

let initialState = {
    initialized: false
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    };
};

// action
export const initializedSuccess = () => {
    return {
        type: SET_INITIALIZED_SUCCESS
    };
};

//thunc creator
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataInfoThunkCreator());
    
    // когда promise зарезолвится, тогда делаем dispatch
    promise.then(() => {
        dispatch(initializedSuccess());
    });

    // так делается в случаем, когда много промисов
    // Promise.all([promise])
    //     .then(() => {
    //         // тут много dispatch можно вызвать
    //         dispatch(initializedSuccess());
    //     })
};

export default appReducer;
