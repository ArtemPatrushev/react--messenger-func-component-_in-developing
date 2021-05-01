import s from './Navbar.module.css';
import NavbarFriends from './NavbarFriends/NavbarFriends';
import NavbarItem from './NavbarItem/NavbarItem';

const Navbar = (props) => {
    let newState = props.store.getState();

    let navbarElements = newState.sidebar.sidebarMenu.map((n) => {
        return <NavbarItem path={n.path} name={n.name} />
    });

    let navbarFriends = newState.sidebar.sidebarFriends.map((f) => {
        return <NavbarFriends photo={f.photo} name={f.name} />
    })

    return (
        <nav className={s.nav}>
            <div className={s.menu}>
                {navbarElements}
            </div>
            <div className={s.friendsList}>
                {navbarFriends}
                {/* <div className={s.friendItem}>
                    <div className={s.friendPhoto}></div>
                    <p>Andrew</p>
                </div>
                <div className={s.friendItem}>
                    <div className={s.friendPhoto}></div>
                    <p>Sveta</p>
                </div>
                <div className={s.friendItem}>
                    <div className={s.friendPhoto}></div>
                    <p>Sasha</p>
                </div> */}
            </div>
        </nav>
    )
}

export default Navbar;