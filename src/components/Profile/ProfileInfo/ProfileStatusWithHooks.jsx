import React, { useEffect, useState } from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatusThC(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div className={s.statusWrapper}>
            <p className={s.status_header}>Status:</p>
            {editMode
                ? <input 
                    className={s.userInput}
                    type="text"
                    autoFocus
                    value={status}
                    onBlur={deActivateEditMode}
                    onChange={onStatusChange} />
                : <span className={s.userStatus} onDoubleClick={activateEditMode}>{props.status || 'Enter your status'}</span>}
            <p className={s.inputSubtitle}>Double click to change your status</p>
        </div>
    );
};

export default ProfileStatusWithHooks;
