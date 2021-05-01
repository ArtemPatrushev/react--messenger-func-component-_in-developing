import { combineReducers, createStore } from "redux";
import sidebarReducer from './sidebarReducer';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import userReducer from "./userReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer
});

let store = createStore(reducers);

window.store = store;

export default store;