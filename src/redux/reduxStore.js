import { applyMiddleware, combineReducers, createStore } from "redux"; 
import { reducer as formReducer } from 'redux-form'       // для работы с формами (login)
import thunkMiddleWare from 'redux-thunk';    // импортировани промежуточный уровень middleware, который позволит передавать не action, а функцию (в connect?) 
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
    form: formReducer,   // для работы с формами (login)
    app: appReducer
});


// store принимает не только redusers но и middleWare (для работы с thunk, где необходимо dispatch не action, а функцию)
let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;
