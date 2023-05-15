import { useState } from 'react';

import logo from '../assets/logo/logo.png';
import '../styles/Nav.css';


function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="nav">
            <div className="nav-left">
                <a href="http://"><img src={logo} alt="logo" /></a>
                <a href="http://">Games</a>
                <a href="http://">Wish List</a>
            </div>

            <div className="nav-mid">
                <form><input type="text" placeholder="Search games..." /></form>
            </div>

            <div className="nav-right">
                <button>Account<i className="fa-solid fa-user"></i></button>
                <button onClick={toggleMenu}>Menu<i className="fas fa-bars"></i></button>
            </div>

            <div className={`menu ${menuOpen ? "open" : ""}`}>
                <ul className="menu-list">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Games</a></li>
                    <li><a href="#">Wish List</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;