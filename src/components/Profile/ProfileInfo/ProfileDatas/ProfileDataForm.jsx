import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../../Common/FormsControls/FormsControls';
import s from './ProfileData.module.css';

const ProfileDataForm = (props) => {
    return (
        <form
            className={s.user_info}
            onSubmit={props.handleSubmit}>
            <div className={s.userLogin}>
                Name:
                {createField('Full name', 'fullName', [], Input)}
            </div>
            <button className={s.form_button}>Save</button>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div className={s.user_info_text}>
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
                    <p>About me: <span>{createField('About me', 'aboutMe', [], Textarea)}</span></p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>Looking for a job: <span>{createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}</span></p>
                </div>
                <div className={s.user_info_text_label}>
                    <p>My professional skills: <span>{createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}</span></p>
                </div>
                <p>Contacts: {Object.keys(props.profile.contacts).map(key => {
                    return (
                        <div
                            key={key}
                            className={s.user_info_text_label}>
                            <p>{key}: <span>{createField(key, 'contacts.' + key, [], Input)}</span></p>
                        </div>
                    )
                })}</p>
            </div>
        </form>
    );
};

// createField - специальная функция-шаблон для форм, которую создали в FromsControlls

const ProfileDataFormReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
