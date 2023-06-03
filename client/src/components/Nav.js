import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import logo from '../assets/logo/logo.png';
import { BiMenu } from 'react-icons/bi';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const savedSearchValue = localStorage.getItem('searchValue');
        if (savedSearchValue) {
            setSearchValue(savedSearchValue);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('searchValue', searchValue);
    }, [searchValue]);

    useEffect(() => {
    }, [location]);

    return (
        <nav className={styles.nav}>
            <div className={styles.navLeft}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Link to="/game">Games</Link>
                <Link to="/wishlist">Wish List</Link>
                <Link to="/favorite">Favorite</Link>
            </div>

            <div className={styles.navMid}>
                <form>
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                </form>
            </div>

            <div className={styles.navRight}>
                <button onClick={toggleMenu}>
                    Menu<BiMenu className={styles.ico} />
                </button>
            </div>

            <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
                <ul className={styles.menuList}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/game">Games</Link>
                    </li>
                    <li>
                        <Link to="/wishlist">Wish List</Link>
                    </li>
                    <li>
                        <Link to="/favorite">Favorite</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
