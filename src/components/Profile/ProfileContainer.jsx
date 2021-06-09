import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Profile from './Profile';
import { getUserProfileThunkCreator, getStatusThC, updateStatusThC } from '../../redux/profileReducer';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        // debugger
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // по данному адресу можно перейти, чтобы сделать редирект, но лучше делать через тег Redirect
                this.props.history.push('/login');
            };
        };
        // usersAPI.getUserProfile(userId)
        //     .then(data => {
        //         this.props.setUserProfile(data);
        //     });
        this.props.getUserProfileThunkCreator(userId);
        setTimeout(() => {
            this.props.getStatusThC(userId);
        }, 1000);
    };
    

    render () {
        console.log(this.props.profile);
        // {...this.props} таким способом передаются в презентационную компоненту сразу все props
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatusThC={this.props.updateStatusThC} />
    };
};


// применение HOC в контейнерной компоненте --- отправляет ProfileContainer в WithAuthRedirect.js, там применяется функционал и возвращается новая компонента AuthRedirectComponent
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// КОД ВЫНЕСЕН В withAuthRedirect
// //создаем отдельный state для HOC, туда прописываем нужно для его работы значение props
// let mapStateToPropsForRedirect = (state) => ({
//     isAuth: state.auth.isAuth
// });
// // создаем еще один connect для hoc, чтобы hoc при помощи коннекта получал внутрь себя isAuth: state.auth.isAuth
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);



let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);


//было так
// export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);  // здесь контейнерная компонента сама получает state, а не сразу предает его в Profile, а через return и props передает state дальще в Profile


// теперь так, // теперь сюда передаем WithUrlDataContainerComponent вместо ProfileContainer
// export default connect(mapStateToProps, { getUserProfileThunkCreator })(WithUrlDataContainerComponent);

// заменяет WithUrlDataContainerComponent и AuthRedirectComponent и WithUrlDataContainerComponent
// все эти функции передаются в обратном порядке - та, которая исполняется первой, находится в самом низу (withAuthRedirect)

export default compose(
    connect(mapStateToProps, { getUserProfileThunkCreator, getStatusThC, updateStatusThC }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);
