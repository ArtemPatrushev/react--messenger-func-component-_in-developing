import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/600px-DC_Comics_logo.png' alt='img' />
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>;
}

// тут у нас приходит isAuth --- если он не false, показываем логин пользователя, если false - ссылку на страницу с регистрацией
{/* <div className={s.loginBlock}>
    {props.isAuth ? props.login
        : <NavLink to={'/login'}>Login</NavLink>}
</div> */}

export default Header;