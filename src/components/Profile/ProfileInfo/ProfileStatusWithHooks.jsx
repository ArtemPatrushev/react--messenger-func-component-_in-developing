import React, { useEffect, useState } from 'react';

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
        <div>
            {editMode
                ? <input 
                    type="text"
                    autoFocus
                    value={status}
                    onBlur={deActivateEditMode}
                    onChange={onStatusChange} />
                : <span onDoubleClick={activateEditMode}>{props.status || 'Enter your status'}</span>}
        </div>
    );
};

export default ProfileStatusWithHooks;
