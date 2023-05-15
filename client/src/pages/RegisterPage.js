import { useState } from 'react';

import styles from '../styles/LoginPage.module.css';
import gStyles from '../styles/global.module.css';


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform login logic here

        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.container}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className={styles.formContainer}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Confirm Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className={styles.button}>
                    <button type="submit">Register</button>
                    <a href='/login' className={gStyles.black}><button type='button'>Back</button></a>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;