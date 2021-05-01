import s from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={s.user_message}>
            {props.message}
        </div>
    );
}

export default Message;