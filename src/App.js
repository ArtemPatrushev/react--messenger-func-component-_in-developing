import React, { Suspense } from 'react';
import { Route, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import store from './redux/reduxStore';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
// import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp} from './redux/appReducer';
import Preloader from './components/Common/Preloader/Preloader';
import './App.css';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
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
              render={() => {
                  return <Suspense fallback={<div>...loading</div>}>
                    <DialogsContainer />
                  </Suspense>
                }
              } />
            <Route path='/profile/:userId?'          // знак ? в записи :userId? - означает, что данный параметр не обязателен (опционален) --- если его не будет, перейдем на страницу profile
              render={() => {
                return <Suspense fallback={<div>...loading</div>}>
                  <ProfileContainer store={this.props.store} />
                </Suspense>
                }
              } />
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

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer store={store} />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJSApp;
