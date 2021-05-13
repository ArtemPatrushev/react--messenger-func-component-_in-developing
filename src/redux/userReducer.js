import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

// объявляем стейт по умолчанию --- передаем его в profileReducer

let initialState = {
    users: [],                // массив пользователей
    pageSize: 5,               // сколько пользователей отобрадается на раз
    totalUsersCount: 0,        // сколько вообще пользователей на сервере
    currentPage: 1,            // выбранная страница (1 по умолчанию)
    isFetching: false,          // нужно для отображения loader, пока приходят данные
    followingInProgress: []
};

// при помощи функции reducer мы получили state и action произвели преобразования, описанные в action над stat-ом и вернули преобразованный state

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return { ...state, users: action.users }  // добавление юзеров с API. Копируем state, берем у него users, копируем старых юзеров и склеиваем массив старых с пришедшим из action массивом новых юзеров
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };  // копируем state, берем у него currentPage и записываем туда значение, которое пришло в action.currentPage
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { 
                ...state, 
                // тернарное выражение: если isFetching true(для какого-то пользователя), то копируем из state массив followingInProgress и дописываем туда id пользоваетля, у которого нажали кнопку (id попадет в массив followingInProgress --- кнопка станет disable)
                // если isFetching false(для каких-то пользователей), то при помощи метода filter(), отбираем по id - если id из action !== id пользователя в списке пользоваетелей (на самой странице), то его кнопке не надо ставить disable
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]  
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => {    // actionCreator - отсюда берем userId для работы userReducer
    // в return сам action
    return {
        type: FOLLOW,
        userId
    }
}

export const unfollowSuccess = (userId) => {    // actionCreator
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage) => {    // здесь принимается currentPage, потому что в case SET_CURRENT_PAGE работа идет именно  c currentPage
    return {
        type: SET_CURRENT_PAGE,
        // currentPage: currentPage  --- вообще пишется так, но тк свойство объекта и название совпадают, то можно записать так, как ниже
        currentPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}


// thunk creator --- его кто-то вызывает и дает ему нужные параметры
export const getUsersThunkCreator = (currentPage, pageSize) => {
    // thunk-функция
    return (dispatch) => {
        dispatch(toggleIsFetching(true));            // задиспатчил action creator toggleIsFetching
        dispatch(setCurrentPage(currentPage))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));                       // задиспатчил action creator
                dispatch(setUsers(data.items));                         // задиспатчил action creator
                dispatch(setTotalUsersCount(data.totalCount));           // задиспатчил action creator
            });
    }
}

export const followThunkCreator = (userId) => {
    // thunk-функция
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));            // задиспатчил action creator toggleIsFetching

        usersAPI.followUser(userId)          // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
            .then(resultCode => {
                if (resultCode === 0) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export const unfollowThunkCreator = (userId) => {
    // thunk-функция
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));            // задиспатчил action creator toggleIsFetching

        usersAPI.unfollowUser(userId)          // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
            .then(resultCode => {
                if (resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export default usersReducer;