import styles from '../styles/Nav.module.css';
import logo from '../assets/logo/logo.png';
import { BiMenu } from 'react-icons/bi'

import { useState } from 'react';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navLeft}>
                <a href="/"><img src={logo} alt="logo" /></a>
                <a href="/game">Games</a>
                <a href="/wishlist">Wish List</a>
                <a href="/favorite">Favorite</a>
            </div>

            <div className={styles.navMid}>
                <form><input type="text" placeholder="Search games..." /></form>
            </div>

            <div className={styles.navRight}>
                <button onClick={toggleMenu}>Menu<BiMenu className={styles.ico} /></button>
            </div>


            <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
                <ul className={styles.menuList}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/game">Games</a></li>
                    <li><a href="/wishlist">Wish List</a></li>
                    <li><a href="/favorite">Favorite</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        </nav >
    );
}

export default Nav;