import { useState } from 'react';
import styles from '../styles/LoginPage.module.css';
import gStyles from '../styles/global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo/logo.png';

import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password
        };

        const res = axios.post('http://localhost:3000/api/user/login', loginData);
        console.log(res);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img src={logo} alt='logo' />
            </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <input
                        type='text'
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
