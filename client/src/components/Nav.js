import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
import logo from '../assets/logo/logo.png';
import { BiMenu } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { RiAccountCircleFill, RiGamepadFill } from 'react-icons/ri';
import { IoMdListBox } from 'react-icons/io';
import { AiFillHeart } from 'react-icons/ai';
import { CgLogOut } from 'react-icons/cg';
import axios from 'axios';
import { userUrl, url } from '../services/apiList';
import authConfig from '../services/authConfig';
import { VscFeedback } from 'react-icons/vsc';
import isRoleAdmin from '../services/isRoleAdmin';
import { GrUserAdmin } from 'react-icons/gr';
import { FaUserShield } from 'react-icons/fa';


function Nav() {

    const isAdmin = isRoleAdmin();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [userName, setUserName] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(userUrl, authConfig);
                const userDetail = userRes.data;

                const imgRes = await axios.get(url + userDetail.profilePicture, { responseType: 'blob' });
                const imageURL = URL.createObjectURL(imgRes.data);

                setUserName(userDetail.username);
                setImageSrc(imageURL);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = `/game?search=${searchValue}`;
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
        <>
            <div className={styles.nav}>
                <div className={styles.navLeft}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link to="/game">Games</Link>
                    <Link to="/wishlist">Wish List</Link>
                    <Link to="/favorite">Favorite</Link>
                </div>

                <div className={styles.navMid}>
                    <form onSubmit={handleSubmit}>
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
                        <Link to="/profile" className={styles.profileContainer}>
                            <img src={imageSrc} alt="profile" className={styles.profileImg} />
                            <p className={styles.profileName}>{userName}</p>
                        </Link>
                        <br />
                        <li>
                            <RiAccountCircleFill />
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <FaHome />
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <RiGamepadFill />
                            <Link to="/game">Games</Link>
                        </li>
                        <li>
                            <IoMdListBox />
                            <Link to="/wishlist">Wish List</Link>
                        </li>
                        <li>
                            <AiFillHeart />
                            <Link to="/favorite">Favorite</Link>
                        </li>
                        <br />
                        <li>
                            <VscFeedback />
                            <Link to="/feedback">Feedback</Link>
                        </li>

                        {isAdmin ? (
                            <>
                                <br />
                                <li>
                                    <FaUserShield />
                                    <Link to="/admin">Admin</Link>
                                </li>
                            </>
                        ) : (null)}

                        <br />
                        <li>
                            <CgLogOut />
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div style={{ marginBottom: '120px' }}></div>
        </>
    );
}


export default Nav;
