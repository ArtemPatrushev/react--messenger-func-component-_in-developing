import { connect } from 'react-redux';
import { compose } from 'redux';
import Dialogs from './Dialogs';
import { addMessage } from '../../redux/dialogsReducer';     // импортировали actionCreater функции из state
import { withAuthRedirect } from '../../hoc/withAuthRedirect';



// для функции f1 и f2 connect берет сам из store state и перердает его в качестве аргумента (при помощи getState())
const mapStateToProps = (state) => {    // превращает часть state в props (передается нужные данные из store через state, которые прокидываются в dialogs как props)
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        // newMessageText: state.dialogsPage.newMessageText
    };
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// КОД ВЫНЕСЕН В withAuthRedirect
// let mapStateToPropsForRedirect = (state) => ({
//     isAuth: state.auth.isAuth
// })
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);


// const mapDispatchToProps = (dispatch) => { // таким же образом передает в Dialogs callback функции как props
//     return {
//         OnAddMessageClick: () => {
//             dispatch(addMessageActionCreator());
//         },
//         OnNewMessageTextChange: (newText) => {
//             dispatch(insertNewMessageTextActionCreator(newText));
//         }
//     }
// };

// const DialogsContainer = connect(mapStateToProps, {
//     addMessage,
//     insertNewMessageText
// })(AuthRedirectComponent);

// заменяет AuthRedirectComponent и DialogsContainer 
// compose(
//     connect(mapStateToProps, {
//         addMessage,
//         insertNewMessageText
//     }),
//     withAuthRedirect
// )(Dialogs)


// export default DialogsContainer;
export default compose(
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
)(Dialogs);
