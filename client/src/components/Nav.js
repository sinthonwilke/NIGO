import { useState } from 'react';

import logo from '../assets/logo/logo.png';
import styles from '../styles/Nav.module.css';
import { } from 'react-icons'

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <head>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'></link>
            </head>

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
                    <button onClick={toggleMenu}>Menu<i className="fas fa-bars" style={{ color: '#ffffff' }}></i></button>
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
        </>
    );
}

export default Nav;