import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { gameListUrl, favUrl } from '../services/apiList';
import styles from '../styles/GamePage.module.css';
import authConfig from '../services/authConfig';

function GamePage() {
    const [gameList, setGameList] = useState([]);
    const [favList, setFavList] = useState([]);


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

        // axios.get(favUrl, authConfig)
        //     .then(response => {
        //         const updatedGameList = response.data.map((gameData, index) => ({
        //             ...gameData,
        //             id: index + 1
        //         }));
        //         setGameList(updatedGameList);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching game list:', error);
        //     });
    }, []);


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