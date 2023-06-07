import styles from '../styles/LoginPage.module.css';
import gStyles from '../styles/global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo/logo.png';

import { useState } from 'react';
import axios from 'axios';
import { registerUrl, loginUrl } from '../services/apiList';

const LoginPage = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showMessageEffect, setShowMessageEffect] = useState(false);

    const handleMessageText = (msg) => {
        setMessage(msg);
        setShowMessageEffect(false);
        setTimeout(() => {
            setShowMessageEffect(true);
        }
            , 3);
        setShowMessageEffect(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            handleMessageText('Passwords do not match');
            return;
        }

        const registerData = {
            username,
            email,
            password
        };

        try {
            const registerRes = await axios.post(registerUrl, registerData);
            if (registerRes.status === 201) {
                const loginRes = await axios.post(loginUrl, { email, password });
                localStorage.setItem('token', loginRes.data.accessToken);
                window.location.href = '/';
            }
            else {
                handleMessageText(registerRes.data.message);
            }
        } catch (error) {
            handleMessageText(error.response.data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img src={logo} alt="logo" />
            </div>
            <h2>Register</h2>
            <h5 className={`${styles.message} ${showMessageEffect ? styles.effect : ''}`}>{message}</h5>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className={styles.formContainer}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className={styles.formContainer}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Password"
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
                <div className={styles.formContainer}>
                    <input
                        type='password'
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div className={styles.button}>
                    <button type="submit">Register</button>
                </div>
                <div className={styles.alreadyUser}>
                    <a href='/login' className={styles.forgetPass}>Already a user? Login.</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
