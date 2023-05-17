import styles from '../styles/LoginPage.module.css';
import gStyles from '../styles/global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo/logo.png';

import { useState } from 'react';
import axios from 'axios';
import { loginUrl } from '../services/apiList';

const LoginPage = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showMessageEffect, setShowMessageEffect] = useState(false);

    const handleMessageText = (msg) => {
        setMessage(msg);
        setShowMessageEffect(false);
        setTimeout(() => {
            setShowMessageEffect(true);
        }
            , 1);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = {
            email,
            password
        };

        try {
            const res = await axios.post(loginUrl, loginData);
            localStorage.setItem('token', res.data.accessToken);
            window.location.href = '/';
        } catch (error) {
            handleMessageText(error.response.data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img src={logo} alt='logo' />
            </div>
            <h2>Login</h2>
            <h5 className={`${styles.message} ${showMessageEffect ? styles.effect : ''}`}>{message}</h5>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff' }} className={styles.icon1} />
                </div>
                <div className={styles.formContainer}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        style={{ color: '#ffffff', cursor: 'pointer' }}
                        className={showPassword ? styles.icon2 : styles.icon3}
                        onClick={handleTogglePasswordVisibility}
                    />
                </div>
                <div className={styles.button}>
                    <button type='submit'>Login</button>
                    <a href='/register' className={gStyles.black}>
                        <button type='button'>Register</button>
                    </a>
                </div>
                <div className={styles.forgetPassContainer}>
                    <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' className={styles.forgetPass}>Forget Password?</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
