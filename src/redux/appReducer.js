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

export const initializedSuccess = () => {
    return {
        type: SET_INITIALIZED_SUCCESS
    };
};

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataInfoThunkCreator());
    
    promise.then(() => {
        dispatch(initializedSuccess());
    });
};

export default appReducer;
