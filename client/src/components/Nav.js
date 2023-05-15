import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo/logo.png';
import styles from '../styles/Nav.css';

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

            <nav className="nav">
                <div className="nav-left">
                    <a href="/"><img src={logo} alt="logo" /></a>
                    <a href="/game">Games</a>
                    <a href="/wishlist">Wish List</a>
                </div>

                <div className="nav-mid">
                    <form><input type="text" placeholder="Search games..." /></form>
                </div>

                <div className="nav-right">
                    <button>Account<i className="fa-solid fa-user" style={{ color: '#ffffff' }}></i></button>
                    <button onClick={toggleMenu}>Menu<i className="fas fa-bars" style={{ color: '#ffffff' }}></i></button>
                </div>

                <div className={`menu ${menuOpen ? "open" : ""}`}>
                    <ul className="menu-list">
                        <li><a href="/">Home</a></li>
                        <li><a href="/game">Games</a></li>
                        <li><a href="/collection">Wish List</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </nav >
        </>
    );
}

export default Nav;