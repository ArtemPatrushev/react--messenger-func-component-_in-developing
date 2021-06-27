import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Profile from './Profile';
import { getUserProfileThunkCreator, getStatusThC, updateStatusThC, savePhotoThC, saveProfileThC } from '../../redux/profileReducer';


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            };
        };
        this.props.getUserProfileThunkCreator(userId);
        this.props.getStatusThC(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps, prevState, snapShot) {
        // если настоящий userId не равен предыдущему, то вызывается метод refreshProfile() - без такого условия получится бесконечный цикл
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }
    

    render () {
        console.log(this.props.profile);
        return <Profile 
                    {...this.props} 
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile} 
                    status={this.props.status} 
                    updateStatusThC={this.props.updateStatusThC} 
                    savePhotoThC={this.props.savePhotoThC} />
    };
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { getUserProfileThunkCreator, getStatusThC, updateStatusThC, savePhotoThC, saveProfileThC }),
    withRouter,
)(ProfileContainer);
