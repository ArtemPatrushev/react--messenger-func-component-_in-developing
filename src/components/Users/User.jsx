import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/user.png';
import s from './Users.module.css';

const User = (props) => {
    return (
        <div>
            <div className={s.usersBlock}>
                <div className={s.userItem}>
                    <div className={s.usersPhoto}>
                        <NavLink to={'/profile/' + props.user.id}>
                            <img className={s.userPhoto} src={props.user.photos.small != null ? props.user.photos.small : userPhoto} alt='img' />
                        </NavLink>
                        {props.user.followed 
                            ?   <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                                    // если disabled={props.toggleFollowingProgress} будет true, то кнопка disable
                                    // props.followingInProgress.some(id => id === u.id) --- followingInProgress это массив (массив - это псевдоистина, поэтому надо при помощи some() проверить совпадения id, и если хоть один id равен id пользователя, то кнопку disable)
                                    // props.toggleFollowingProgress(true, u.id)
                                    // usersAPI.unfollowUser(u.id)      // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
                                    //     .then(resultCode => {
                                    //         if (resultCode === 0) {
                                    //             props.unfollow(u.id);
                                    //         }
                                    //         props.toggleFollowingProgress(false, u.id)
                                    //     });

                                    //теперь так с thunk
                                    props.unfollowThunkCreator(props.user.id);

                                }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {         // если disabled={props.toggleFollowingProgress} будет true, то кнопка disable
                                // props.toggleFollowingProgress(true, u.id)
                                // usersAPI.followUser(u.id)          // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
                                //     .then(resultCode => {
                                //         if (resultCode === 0) {
                                //             props.follow(u.id);
                                //         }
                                //         props.toggleFollowingProgress(false, u.id)
                                //     });

                                //теперь так с thunk
                                props.followThunkCreator(props.user.id);

                                }}>Follow</button>}
                    </div>
                    <div className={s.userInfo}>
                        <div className={s.aboutUser}>
                            <p className={s.userName}>{props.user.name}</p>
                            <div className={s.userLocation}>
                                <p>{/*u.location.country*/}</p>
                                <p>{/*u.location.city*/}</p>
                            </div>
                        </div>
                        <div className={s.userStatus}>
                            <p>{props.user.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
