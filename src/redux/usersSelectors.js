import { createSelector } from "reselect";

// РАБОТА SELECTOR
// Ппримитивная функция (используется как зависимомть в selector)
const getUsersSelector = (state) => {
    return state.usersPage.users;
};
// сам selector
// передается примитив getUsers (как зависимоть), users берется именно из него
// могу передаваться много зависимостей и их результаты
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
});



export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
};
