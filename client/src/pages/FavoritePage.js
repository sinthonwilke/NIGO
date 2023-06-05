import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { favGamesUrl } from '../services/apiList';
import styles from '../styles/GamePage.module.css';
import loadStyle from '../styles/Loading.module.css';
import authConfig from '../services/authConfig';

function FavoritePage() {
    const [gameList, setGameList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameListResponse = await axios.get(favGamesUrl, authConfig);
                const updatedGameList = gameListResponse.data.map((gameList, index) => ({
                    ...gameList,
                    id: index + 1
                }));
                setGameList(updatedGameList);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <div className={loadStyle.loadBody}>
                    <div className={loadStyle.loading}>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className={gStyles.head}>Favorite</h1>
                <div className={styles.gameContainer}>
                    {gameList.map(game => (
                        <div className={styles.item} key={game._id}>
                            <Games game={game} fromFavPage={true} />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default FavoritePage;