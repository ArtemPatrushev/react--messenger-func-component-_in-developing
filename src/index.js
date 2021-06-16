import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore';
import SamuraiJSApp from './App';
import './index.css';

ReactDOM.render(
    <SamuraiJSApp />,
    document.getElementById('root')
);

reportWebVitals();
