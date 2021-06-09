import React from 'react';
import { Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp} from './redux/appReducer';
import Preloader from './components/Common/Preloader/Preloader';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    // usersAPI.setAuthUserDataInfo()         // вместо API запроса напрямую, вызываем метод, в котором лежит запрос из api.js
    //     .then(data => {
    //         if (data.resultCode === 0) {     // в response придет ответ с API, проверяем response.data.resultCode === 0 (из документации API samurai значит, что авторизован) --- вызываем setAuthUserData (данные пользователя)
    //             let { id, email, login } = data.data;    //  response.data.data.login (две data) --- тк у axios стандартно данные в data и бэкэнд разработчик в API тоже упаковал данные в data
    //             this.props.setAuthUserData(id, email, login);       // здесь важна последовательность переменных
    //             usersAPI.getProfilePhoto()
    //                 .then(photo => {
    //                     this.props.setUserPhoto(photo);
    //                 })   
    //         }
    //     });
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar store={this.props.store} />
          <div className='app_wrapper_content'>
            <Route path='/dialogs'
              render={() => <DialogsContainer />} />
            <Route path='/profile/:userId?'          // знак ? в записи :userId? - означает, что данный параметр не обязателен (опционален) --- если его не будет, перейдем на страницу profile
              render={() => <ProfileContainer store={this.props.store} />} />
            <Route path='/users'
              render={() => <UsersContainer />} />
            <Route path='/login'
              render={() => <Login />} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
