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
                                    props.unfollowThunkCreator(props.user.id);

                                }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
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
