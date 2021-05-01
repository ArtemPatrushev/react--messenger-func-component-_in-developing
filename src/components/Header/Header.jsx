import s from './Header.module.css';

const Header = () => {
    return <header className={s.header}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/600px-DC_Comics_logo.png' alt='img' />
    </header>;
}

export default Header;