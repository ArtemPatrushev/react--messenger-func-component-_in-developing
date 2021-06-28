import NavbarFriends from './NavbarFriends/NavbarFriends';
import NavbarItem from './NavbarItem/NavbarItem';

import s from './Navbar.module.css';

const Navbar = (props) => {
    let newState = props.store.getState();

    let navbarElements = newState.sidebar.sidebarMenu.map((n) => {
        return <NavbarItem key={n.id} path={n.path} name={n.name} />
    });

    let navbarFriends = newState.sidebar.sidebarFriends.map((f) => {
        return <NavbarFriends key={f.id} photo={f.photo} name={f.name} />
    });

    return (
        <nav className={s.nav}>
            <div className={s.menu}>
                {navbarElements}
            </div>
            <div className={s.friendsList}>
                {navbarFriends}
            </div>
        </nav>
    );
};

export default Navbar;
