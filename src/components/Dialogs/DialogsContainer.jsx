import { connect } from 'react-redux';
import { compose } from 'redux';
import Dialogs from './Dialogs';
import { addMessage } from '../../redux/dialogsReducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    };
};

export default compose(
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
)(Dialogs);
