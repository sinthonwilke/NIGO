import Nav from '../components/Nav';
import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { gameListUrl } from '../services/apiList';
import styles from '../styles/GamePage.module.css';

function GamePage() {
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        axios.get(gameListUrl)
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

    console.log(gameList);

    return (
        <>
            <h1 className={gStyles.head}>Games</h1>
            <div className={styles.gameContainer}>
                {gameList.map(gameData => (
                    <div className={styles.item} key={gameData.id}>
                        <Games gameData={gameData} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default GamePage;