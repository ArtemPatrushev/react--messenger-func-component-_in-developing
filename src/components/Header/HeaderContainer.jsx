import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logoutThC} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />    // пробрасываем все пропсы
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // photo: state.auth.photo
    // profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { logoutThC })(HeaderContainer);