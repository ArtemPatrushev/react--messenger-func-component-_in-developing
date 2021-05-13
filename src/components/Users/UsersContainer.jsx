import { connect } from 'react-redux';
import { followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, getUsersThunkCreator, followThunkCreator, unfollowThunkCreator} from '../../redux/userReducer';    // импортировали actionCreater функции из state
import React from 'react';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class UsersContainer extends React.Component {

    // реализация через componentDidMount (жизненный цикл класса) --- вызывается один раз после монтирования объекта в DOM --- пользователи отрисуются один раз --- не надо условий if
    componentDidMount() {

        //так было - обращение из компоненты к API (к уровню DAL) без thunk
        // this.props.toggleIsFetching(true);            // включает картинку загрузки

        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)          // раньше тут был сам api запрос (теперь он в папке api)
        //     .then(data => {                                            // тк в api.js вернули из response именно data
        //         this.props.toggleIsFetching(false);                    // ответ пришел - отключаем картинку загрузки
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //     });

        //так с thunk (логика прописана в userReducer)
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize); 
    }

    // теперь реализовано через собственный метод, тк нужно периодически обнавлять при смене страницы, а didMount обновляется только один раз после рендера
    onPageChanged = (pageNumber) => {

        //было так без thunk
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);

        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {                                     // тк в api.js вернули из response именно data
        //         this.props.toggleIsFetching(false);             // ответ пришел - отключаем картинку загрузки
        //         this.props.setUsers(data.items);
        //     });

        // теперь так с thunk (логика прописана в userReducer)
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        return (
        <>
                {this.props.isFetching 
                    ? <Preloader />
                    : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.followThunkCreator}
                unfollowThunkCreator={this.props.unfollowThunkCreator} />
        </>
        )
    }
}


// для функции f1 и f2 connect берет сам из store state и перердает его в качестве аргумента (при помощи getState())
const mapStateToProps = (state) => {    // превращает часть state в props (передается нужные данные из store через state, которые прокидываются в dialogs как props)
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};

// let AuthRedirectComponent = withAuthRedirect(UsersContainer)

// было так
// const mapDispatchToProps = (dispatch) => { // таким же образом передает в Dialogs callback функции как props
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         }
//     }
// };

// и было так
//  в данном случау все данные из store приходят в UsersContainer, а уже из него мы руками передаем необходимые пропсы в Users
// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// теперь так
// export default connect(mapStateToProps, {
//     follow: followAC,
//     unfollow: unfollowAC,
//     setUsers: setUsersAC,
//     setCurrentPage: setCurrentPageAC,
//     setTotalUsersCount: setTotalUsersCountAC,
//     toggleIsFetching: toggleIsFetchingAC
// })(UsersContainer);


// и теперь так передаются action creators
// export default connect(mapStateToProps, {
//     followSuccess,
//     unfollowSuccess,
//     setCurrentPage,
//     getUsersThunkCreator,
//     followThunkCreator,
//     unfollowThunkCreator
// })(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setCurrentPage,
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator
    }),
    withAuthRedirect
)(UsersContainer);