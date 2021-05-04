import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile } from '../../redux/profileReducer';
import { withRouter } from 'react-router';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        // this.props.toggleIsFetching(true);            // включает картинку загрузки
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)  // в get запрос на API на получение пользователей добавляем параметры - страница по умолчанию, количество пользователей, отобрадаемых за раз
            .then(response => {
                // this.props.toggleIsFetching(false);
                this.props.setUserProfile(response.data);
            });
    }

    render () {
        return <Profile {...this.props} profile={this.props.profile} />  // {...this.props} таким способом передаются в презентационную компоненту сразу все props
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);


//было так
// export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);  // здесь контейнерная компонента сама получает state, а не сразу предает его в Profile, а через return и props передает state дальще в Profile


// теперь так
export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);   // теперь сюда передаем WithUrlDataContainerComponent вместо ProfileContainer