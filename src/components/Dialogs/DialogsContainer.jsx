import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { insertNewMessageTextActionCreator, addMessageActionCreator } from '../../redux/dialogsReducer';     // импортировали actionCreater функции из state


// для функции f1 и f2 connect берет сам из store state и перердает его в качестве аргумента (при помощи getState())
const mapStateToProps = (state) => {    // превращает часть state в props (передается нужные данные из store через state, которые прокидываются в dialogs как props)
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
};

const mapDispatchToProps = (dispatch) => { // таким же образом передает в Dialogs callback функции как props
    return {
        OnAddMessageClick: () => {
            dispatch(addMessageActionCreator());
        },
        OnNewMessageTextChange: (newText) => {
            dispatch(insertNewMessageTextActionCreator(newText));
        }
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;