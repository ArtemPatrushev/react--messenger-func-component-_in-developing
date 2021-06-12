import { applyMiddleware, combineReducers, createStore } from "redux"; 
import { reducer as formReducer } from 'redux-form';
import thunkMiddleWare from 'redux-thunk';
import sidebarReducer from './sidebarReducer';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import userReducer from "./userReducer";
import authReducer from "./auth-reducer";
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;
