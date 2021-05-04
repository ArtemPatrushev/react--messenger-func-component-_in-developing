import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching} from '../../redux/userReducer';    // импортировали actionCreater функции из state
import axios from 'axios';
import React from 'react';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';


class UsersContainer extends React.Component {

    // запрос был через данный метод по клику на кнопку (отображение пользователей) с проверкой if (это еще от функциональной компоненты), т.к. она постоянно перерисовывалсь
    // getUsers = () => {
    //     if (this.props.users.length === 0) {
    //         axios.get('https://social-network.samuraijs.com/api/1.0/users')
    //             .then(response => {
    //                 this.props.setUsers(response.data.items);
    //             });
    //         // запрос на server API через axios, чтобы получить пользователей из БД

    //     };
    // }

    // теперь реализация через componentDidMount (жизненный цикл класса) --- вызывается один раз после монтирования объекта в DOM --- пользователи отрисуются один раз --- не надо условий if
    componentDidMount() {
        this.props.toggleIsFetching(true);            // включает картинку загрузки
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)  // в get запрос на API на получение пользователей добавляем параметры - страница по умолчанию, количество пользователей, отобрадаемых за раз
            .then(response => {
                this.props.toggleIsFetching(false);                           // ответ пришел - отключаем картинку загрузки
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    // теперь реализовано через собственный метод, тк нужно периодически обнавлять при смене страницы, а didMount обновляется только один раз после рендера
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);              // включает картинку загрузки
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)  // в get запрос на API на получение пользователей добавляем параметры - страница по умолчанию, количество пользователей, отобрадаемых за раз
            .then(response => {
                this.props.toggleIsFetching(false);             // ответ пришел - отключаем картинку загрузки
                this.props.setUsers(response.data.items);
            });
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
                unfollow={this.props.unfollow} />
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
        isFetching: state.usersPage.isFetching
    }
};


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
export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer);