import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
    
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);   // таким образом получаем постраничное деление, Math.ceil - округление до большего числа в любом случае
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={s.pagination}>
                {pages.map(p => {
                    return <span 
                        className={props.currentPage === p && s.selectedPage}
                        onClick={ (e) => {props.onPageChanged(p)} }>{p}</span>    // если выбраная страничка, то добавит стиль
                })}
            </div>
            {props.users.map(u => <div key={u.id}>
                <div className={s.usersBlock}>
                    <div className={s.userItem}>
                        <div className={s.usersPhoto}>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={s.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} alt='img' />
                            </NavLink>
                            {u.followed ?
                                <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
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

export default Users;