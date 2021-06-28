import React, { useState } from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDatas/ProfileDataForm';
import ProfileData from './ProfileDatas/ProfileData';
import userPhoto from '../../../assets/images/user.png';

import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    };

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhotoThC(e.target.files[0]);
        };
    };

    const onSubmit = (formData) => {
        props.saveProfileThC(formData).then(() => {
            // после обновления информации выключаем режим редактирования + если нет ошибки
            setEditMode(false);
        });
    };

    return (
        <div>
            <div className={s.user}>
                <div className={s.userPhotoBlock}>
                    <img className={s.user_photo} src={props.profile.photos.large || userPhoto} alt="img" />
                    {props.isOwner && <input type='file' onChange={onMainPhotoSelected} />}
                    <ProfileStatusWithHooks
                        status={props.status}
                        updateStatusThC={props.updateStatusThC} />
                </div>
                {editMode
                    ? <ProfileDataForm
                        initialValues={props.profile}
                        profile={props.profile}
                        onSubmit={onSubmit} />
                    : <ProfileData
                        profile={props.profile}
                        isOwner={props.isOwner}
                        goToEditMode={() => setEditMode(true)} />}
            </div>
        </div>
    );
};

// initialValues={props.profile} - при использовании redux-from это позволяет заполнять открытые для редактирования инпуты тему значениями, которые в них уж сохранены

export default ProfileInfo;
