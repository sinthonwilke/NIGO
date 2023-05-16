import { useState } from 'react';
import styles from '../styles/LoginPage.module.css';
import gStyles from '../styles/global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo/logo.png';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
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

    const handleSubmit = (event) => {
        event.preventDefault();

        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img src={logo} alt="logo" />
            </div>
            <h2>Register</h2>
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
                        type="text"
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
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div className={styles.button}>
                    <button type="submit">Register</button>
                    <a href="/login" className={gStyles.black}>
                        <button type="button">Back</button>
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
