import s from './Dialogs.module.css';
import DialogItem from './DialogsItem/DialogItem';
import Message from './Message/Message';
import React from 'react';

const Dialogs = (props) => {
    
    let dialogsElements = props.dialogs.map ((d) => {
        return <DialogItem id={d.id} name={d.name} key={d.id} />
    });
    
    let messagesElements = props.messages.map ((m) => {
        return <Message id={m.id} message={m.message} key={m.id} />
    });
    
    let newDialogMessage = React.createRef();

    let OnAddMessageClick = () => {
        props.OnAddMessageClick();
    }

    let OnNewMessageTextChange = () => {
        let newText = newDialogMessage.current.value;
        props.OnNewMessageTextChange(newText);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_users}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.dialogForm}>
                    <textarea cols="30" rows="2"
                    placeholder='Write new message'
                    ref={newDialogMessage}
                    value={props.newMessageText}
                    onChange={OnNewMessageTextChange} />
                    <button onClick={OnAddMessageClick}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;