import React from 'react';
import { Route } from 'react-router';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {
  return (
    <>
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar store={props.store} />
        <div className='app_wrapper_content'>
          <Route path='/dialogs' 
            render={() => <DialogsContainer />} />
          <Route path='/profile/:userId?'          // знак ? в записи :userId? - означает, что данный параметр не обязателен (опционален) --- если его не будет, перейдем на страницу profile
            render={() => <ProfileContainer store={props.store} />} />
          <Route path='/users' 
            render={() => <UsersContainer /> } />
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

export default App;
