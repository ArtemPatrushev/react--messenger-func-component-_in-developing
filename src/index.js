import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';   // Provider нужен, чтобы работала связа react-redux

// в теге App есть пропсы(атрибуты), в которых присутствует bind(store) - это используется, т.к. передаваемые в пропсах методы принадлежат объекту (store) и у них есть контекст this. Чтобы этот контекст не потерять в процессе передачи метода через пропс, мы привязываем при помощи bind данные метод к его объекту store. Теперь this всегда будет именно store и метод будет работать корректно
// контекст this теряется при передаче через пропсы, потому что в конечном итоге передаваемый метод объекта вызывается как callback функция (вызывается от пропса)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App store={store} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
