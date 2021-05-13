import { Field, reduxForm } from 'redux-form';
import s from './Dialogs.module.css';
import DialogItem from './DialogsItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
// import { Redirect } from 'react-router';

const AddMessageForm = (props) => {
    return (
        <form className={s.dialogForm} onSubmit={props.handleSubmit}>
            <Field 
                name='newMessageBody' 
                component='textarea' 
                placeholder='Write new message'
            />
            <button>Send</button>
        </form>
    )
}

const DialogsReduxForm = reduxForm({
    // каждая форма должна иметь уникальное строковое имя
    form: 'dialogsAddMessageForm'
    // передаем форму, которую необходимо обернуть
})(AddMessageForm);

const Dialogs = (props) => {
    
    let dialogsElements = props.dialogs.map ((d) => {
        return <DialogItem id={d.id} name={d.name} key={d.id} />
    });
    
    let messagesElements = props.messages.map ((m) => {
        return <Message id={m.id} message={m.message} key={m.id} />
    });

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageBody);
    }
    
    // let newDialogMessage = React.createRef();

    // let OnAddMessageClick = () => {
    //     props.addMessage();
    // }

    // let OnNewMessageTextChange = () => {
    //     let newText = newDialogMessage.current.value;
    //     props.insertNewMessageText(newText);
    // };

    // if (!props.isAuth) {
    //     return <Redirect to={'/login'} />    // если не авторизован, то перекинет на страницу login
    // };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_users}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <DialogsReduxForm onSubmit={addNewMessage} />
                {/* <form className={s.dialogForm}>
                    <textarea cols="30" rows="2"
                    placeholder='Write new message'
                    ref={newDialogMessage}
                    value={props.newMessageText}
                    onChange={OnNewMessageTextChange} />
                    <button onClick={OnAddMessageClick}>Send</button>
                </form> */}
            </div>
        </div>
    );
}

export default Dialogs;