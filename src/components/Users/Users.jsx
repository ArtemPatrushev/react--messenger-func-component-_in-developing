import axios from 'axios';
import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';

class Users extends React.Component {

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
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)  // в get запрос на API на получение пользователей добавляем параметры - страница по умолчанию, количество пользователей, отобрадаемых за раз
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    // теперь реализовано через собственный метод, тк нужно периодически обнавлять при смене страницы, а didMount обновляется только один раз после рендера
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)  // в get запрос на API на получение пользователей добавляем параметры - страница по умолчанию, количество пользователей, отобрадаемых за раз
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);   // таким образом получаем постраничное деление, Math.ceil - округление до большего числа в любом случае
        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div>
                <div className={s.pagination}>
                    {pages.map(p => {
                        return <span 
                            className={this.props.currentPage === p && s.selectedPage}
                            onClick={ (e) => {this.onPageChanged(p)} }>{p}</span>    // если выбраная страничка, то добавит стиль
                    })}
                </div>
                <button onClick={this.getUsers}>Get users</button>
                {this.props.users.map(u => <div key={u.id}>
                    <div className={s.usersBlock}>
                        <div className={s.userItem}>
                            <div className={s.usersPhoto}>
                                <img className={s.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} alt='img' />
                                {u.followed ?
                                    <button onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                    : <button onClick={() => { this.props.follow(u.id) }}>Follow</button>}
                            </div>
                            <div className={s.userInfo}>
                                <div className={s.aboutUser}>
                                    <p className={s.userName}>{u.name}</p>
                                    <div className={s.userLocation}>
                                        <p>{/*u.location.country*/}</p>
                                        <p>{/*u.location.city*/}</p>
                                    </div>
                                </div>
                                <div className={s.userStatus}>
                                    <p>{u.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        )
    }
}

export default Users;