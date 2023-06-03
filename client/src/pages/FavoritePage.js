import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { favUrl } from '../services/apiList';
import styles from '../styles/GamePage.module.css';
import authConfig from '../services/authConfig';

function FavoritePage() {
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        axios.get(favUrl, authConfig)
            .then(response => {
                const updatedGameList = response.data.map((gameData, index) => ({
                    ...gameData,
                    id: index + 1
                }));
                setGameList(updatedGameList);
            })
            .catch(error => {
                console.error('Error fetching game list:', error);
            });
    }, []);

    return (
        <>
            <h1 className={gStyles.head}>Favorite</h1>
            <div className={styles.gameContainer}>
                {gameList.map(gameData => (
                    <div className={styles.item} key={gameData.id}>
                        <Games gameData={gameData} fromFavPage={true} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default FavoritePage;