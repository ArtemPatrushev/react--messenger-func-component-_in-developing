import React from 'react';
import { DialogsReduxForm} from './AddMessageForm/AddMessageForm';
import DialogItem from './DialogsItem/DialogItem';
import Message from './Message/Message';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    
    let dialogsElements = props.dialogs.map ((d) => {
        return <DialogItem id={d.id} name={d.name} key={d.id} />
    });
    
    let messagesElements = props.messages.map ((m) => {
        return <Message id={m.id} message={m.message} key={m.id} />
    });

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageBody);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_users}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <DialogsReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

export default Dialogs;
