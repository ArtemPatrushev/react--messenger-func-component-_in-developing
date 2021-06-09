import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';

const Users = (props) => {

    return (
        <div>
            <Paginator 
                totalUsersCount={props.totalUsersCount} 
                pageSize={props.pageSize} 
                onPageChanged={props.onPageChanged} 
                currentPage={props.currentPage}
            />
            {props.users.map(u => <User key={u.id} 
                                        user={u} 
                                        followingInProgress={props.followingInProgress} 
                                        unfollowThunkCreator={props.unfollowThunkCreator}
                                        followThunkCreator={props.followThunkCreator}
            />)};
        </div>
    );
};

export default Users;
