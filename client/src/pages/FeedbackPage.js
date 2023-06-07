import gStyles from '../styles/global.module.css';
import styles from '../styles/FeedbackPage.module.css';
import { useState } from 'react';
import axios from 'axios';
import { feedbackUrl } from '../services/apiList';
import authConfig from '../services/authConfig';

function FeedbackPage() {
    const [message, setMessage] = useState('');
    const [showMessageEffect, setShowMessageEffect] = useState(false);
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [link, setLink] = useState('');

    const handleMessageText = (msg) => {
        setMessage(msg);
        setShowMessageEffect(false);
        setTimeout(() => {
            setShowMessageEffect(true);
            setTimeout(() => {
                setShowMessageEffect(false);
                setMessage('');
            }, 5000);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const feedbackData = {
            subject: subject,
            details: details,
            link: link,
        };

        try {
            await axios.post(feedbackUrl, feedbackData, authConfig);
            handleMessageText('Feedback sent. Thank you for your feedback!');
            setSubject('');
            setDetails('');
            setLink('');

        } catch (error) {
            handleMessageText(error.response.data);
        }
    };

    return (
        <>
            <h1 className={gStyles.head}>Feedback</h1>
            <div className={styles.container}>
                <h5 className={`${styles.message} ${showMessageEffect ? styles.effect : ''}`}>{message}</h5>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Subject *'
                        required
                        className={styles.box}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <textarea
                        type='text'
                        placeholder='Details *'
                        required
                        className={`${styles.box} ${styles.textarea}`}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />

                    <input
                        type='url'
                        placeholder='Relative link'
                        className={styles.box}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <button type='submit' className={styles.btnbutton}>Submit</button>
                </form>
            </div>
        </>
    );
}

export default FeedbackPage;
