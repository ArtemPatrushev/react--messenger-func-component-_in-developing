import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';
import s from './AddMessageForm.module.css';

const maxLength30 = maxLengthCreator(30);

const AddMessageForm = (props) => {
    return (
        <form 
            className={s.dialogForm} 
            onSubmit={props.handleSubmit}>
            <Field
                name='newMessageBody'
                component={Textarea}
                placeholder='Write new message'
                validate={[required, maxLength30]}
                className={s.textarea}
            />
            <button className={s.message_button}>Send</button>
        </form>
    );
};

export const DialogsReduxForm = reduxForm({
    form: 'dialogsAddMessageForm'
})(AddMessageForm);
