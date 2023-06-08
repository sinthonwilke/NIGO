import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import styles from '../styles/AdminPageTable.module.css';
import gStyles from '../styles/global.module.css';
import { gameListUrl } from '../services/apiList';
import authConfig from '../services/authConfig';

function AdminGamePage() {

    const [gameList, setGameList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const gameListResponse = await axios.get(gameListUrl);
            const updatedGameList = gameListResponse.data.map((game, index) => ({
                ...game,
                id: index + 1
            }));
            setGameList(updatedGameList);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching game list:', error);
            setIsLoading(false);
        }
    };

    const handleDelete = async (gameId) => {
        try {
            await axios.delete(gameListUrl + gameId, authConfig);
            fetchData();
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    };

    if (isLoading) {
        return (
            <>
                <h1 className={gStyles.head}>Admin: Games</h1>
                <Loading />
            </>
        );
    } else {
        return (
            <>
                <div>
                    <h1 className={gStyles.head}>Admin: Games</h1>
                    <div className={styles.container}>
                        <table>
                            <thead>
                                <tr>
                                    <th>title</th>
                                    <th>id</th>
                                    <th>releaseDate</th>
                                    <th>desc</th>
                                    <th>platform</th>
                                    <th>link</th>
                                    <th>tags</th>
                                    <th>img</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameList.map((game) => (
                                    <tr key={game.id}>
                                        <td>{game.title}</td>
                                        <td>{game._id}</td>
                                        <td>{game.releaseDate}</td>
                                        <td>{game.description.length > 50 ? game.description.slice(0, 50) + ' >>>...' : game.description}</td>
                                        <td>{game.platform}</td>
                                        <td>{game.link}</td>
                                        <td>{game.tags.join(', ')}</td>
                                        <td>{game.imgUrl}</td>
                                        <td>
                                            <button className={styles.btn}>Edit</button>
                                            <button className={styles.btn}>Image</button>
                                            <button className={styles.btn} onClick={() => handleDelete(game._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminGamePage;
