import gStyles from '../styles/global.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { gameListUrl } from '../services/apiList';
import { useState } from 'react';
import styles from '../styles/AdminPageTable.module.css';
import Loading from '../components/Loading';


function AdminGamePage() {
    const [gameList, setGameList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const gameListResponse = await axios.get(gameListUrl);
            const updatedGameList = gameListResponse.data.map((gameList, index) => ({
                ...gameList,
                id: index + 1
            }));
            setGameList(updatedGameList);

            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <h1 className={gStyles.head}>Admin: Games</h1>
                <Loading />
            </>
        )
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
                                            <button className={styles.btn}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    };
}

export default AdminGamePage;