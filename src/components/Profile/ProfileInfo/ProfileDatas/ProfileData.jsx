import s from './ProfileData.module.css';

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
                {/* <div className={s.user_info_text_label}>
                    <p>Date of birth:</p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>City:</p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>Education:</p>
                </div> */}
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

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.user_info_text_label}>
            <p>{contactTitle}: <span>{contactValue}</span></p>
        </div>
    );
};

export default ProfileData;
