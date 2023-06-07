import gStyles from '../styles/global.module.css';
import styles from '../styles/AdminPage.module.css';
import { Link, Routes, Route } from 'react-router-dom';
import AdminGamePage from './AdminGamePage';
import AdminFeedbackPage from './AdminFeedbackPage';

function AdminPage() {
    return (

        <div>
            <h1 className={gStyles.head}>Admin</h1>
            <div className={styles.container}>
                <Link to="/admin/game">
                    <button className={styles.btn}>Game</button>
                </Link>
                <Link to="/admin/feedback">
                    <button className={styles.btn}>Feedback</button>
                </Link>
            </div>

        </div>
    );
}

export default AdminPage;
