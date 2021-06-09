import React, { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {

    //hook
    //вызываем useState - локальный state, со значением default false
    // возвращает массив из двух объектов: первый - значение false, второй - функция, которая будет изменять первое значение
    // let stateWithSetState = useState(false);
    // let editMode = stateWithSetState[0];
    // let setEditMode = stateWithSetState[1];
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    // hook useEffect - срабатывает после отрисовки страницы и вызывает вложенную функцию, в массиве [props.status] - его зависимость (если менятеся, то работает)
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
