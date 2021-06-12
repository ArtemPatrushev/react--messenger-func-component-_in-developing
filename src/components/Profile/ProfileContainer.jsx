import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Profile from './Profile';
import { getUserProfileThunkCreator, getStatusThC, updateStatusThC } from '../../redux/profileReducer';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            };
        };
        this.props.getUserProfileThunkCreator(userId);
        setTimeout(() => {
            this.props.getStatusThC(userId);
        }, 1000);
    };
    

    render () {
        console.log(this.props.profile);
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatusThC={this.props.updateStatusThC} />
    };
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { getUserProfileThunkCreator, getStatusThC, updateStatusThC }),
    withRouter,
)(ProfileContainer);
