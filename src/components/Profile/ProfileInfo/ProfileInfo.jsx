import React, { useState } from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
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

// Object.keys для объекта - как map для массива - ключами станут названия классов объекта

const ProfileData = (props) => {
    //{props.isOwner && <button>edit</button>} - если owner, тогда можно редактировать, только тогда отобрадается button
    return (
        <div className={s.user_info}>
            <div className={s.userLogin}>
                Name: {props.profile.fullName}
            </div>
            {props.isOwner && <button onClick={props.goToEditMode} className={s.form_button}>edit</button>}
            <div className={s.user_info_text}>
                About me:
                <div className={s.user_info_text_label}>
                    <p>Date of birth:</p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>City:</p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>Education:</p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>Looking for a job: <span>{props.profile.lookingForAJob ? 'Yes' : 'No'}</span></p>
                </div>
                {props.profile.lookingForAJob &&
                    <div className={s.user_info_text_label}>
                        <p>My professional skills: <span>{props.profile.lookingForAJobDescription}</span></p>
                    </div>
                }
                <div className={s.contacts_block}>
                    Contacts: {Object.keys(props.profile.contacts).map(key => {
                    return <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={props.profile.contacts[key]} />
                })}</div>
            </div>
        </div>
    );
};

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.user_info_text_label}>
            <p>{contactTitle}: <span>{contactValue}</span></p>
        </div>
    )
};

export default ProfileInfo;
