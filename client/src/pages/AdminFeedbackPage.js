import gStyles from '../styles/global.module.css';
import styles from '../styles/AdminPageTable.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { feedbackUrl } from '../services/apiList';
import Loading from '../components/Loading';
import authConfig from '../services/authConfig';

function AdminFeedbackPage() {

    const [feedbackList, setFeedbackList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const feedbackListResponse = await axios.get(feedbackUrl, authConfig);
            const updatedFeedbackList = feedbackListResponse.data.map((feedback, index) => ({
                ...feedback,
                id: index + 1
            }));
            setFeedbackList(updatedFeedbackList);

            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <h1 className={gStyles.head}>Admin: Feedbacks</h1>
                <Loading />
            </>
        );
    } else {
        return (
            <>
                <h1 className={gStyles.head}>Admin: Feedbacks</h1>
                <div className={styles.container}>
                    <table>
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>subject</th>
                                <th>details</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackList.map((feedback) => (
                                <tr key={feedback.id}>
                                    <td>{feedback.emailSender}</td>
                                    <td>{feedback.subject}</td>
                                    <td>{feedback.details}</td>
                                    <td>
                                        <button className={styles.btn}>Receive</button>
                                        <button className={styles.btn}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default AdminFeedbackPage;