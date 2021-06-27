import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logoutThC } from '../../redux/auth-reducer';
// import { getUserProfileThunkCreator } from '../../redux/profileReducer';

class HeaderContainer extends React.Component {

    // componentDidMount() {
    //     debugger
    //     let userId = this.props.authorizedUserId;
    //     this.props.getUserProfileThunkCreator(userId);
    // };

    render() {
        return <Header 
                    {...this.props}
                    /* profile={this.props.profile}*/ />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // profile: state.profilePage.profile,
    // authorizedUserId: state.auth.id,
});

export default connect(mapStateToProps, { logoutThC, /*getUserProfileThunkCreator*/ })(HeaderContainer);
