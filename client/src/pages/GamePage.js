import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { gameListUrl, favUrl, collectionUrl, searchGameUrl } from '../services/apiList';
import styles from '../styles/GamePage.module.css';
import authConfig from '../services/authConfig';
import PopCollection from '../components/PopCollection';
import Loading from '../components/Loading';

function GamePage() {
    const [gameList, setGameList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [collectionList, setCollectionList] = useState([]);
    const [gameId, setGameId] = useState(null);
    const [isPopCollectionVisible, setPopCollectionVisible] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');

    useEffect(() => {
        const fetchData = async () => {
            try {

                let getThisUrl = gameListUrl;

                if (searchValue) {
                    getThisUrl = searchGameUrl + searchValue;
                }

                const gameListResponse = await axios.get(getThisUrl);
                const updatedGameList = gameListResponse.data.map((gameList, index) => ({
                    ...gameList,
                    id: index + 1
                }));
                setGameList(updatedGameList);

                const favListResponse = await axios.get(favUrl, authConfig);
                const updatedFavList = favListResponse.data.map((favList) => ({
                    ...favList
                }));
                setFavList(updatedFavList);

                const collectionListRes = await axios.get(collectionUrl, authConfig);
                const updatedCollectionList = collectionListRes.data.map((collectionList, index) => ({
                    ...collectionList,
                    id: index + 1
                }));
                setCollectionList(updatedCollectionList);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchValue]);

    const handleChildSignal = (gameId) => {
        setGameId(gameId);
        setPopCollectionVisible(!isPopCollectionVisible);
    };

    const handleClosePopCollection = () => {
        setPopCollectionVisible(false);
    };

    if (isLoading) {
        return (
            <>
                <h1 className={gStyles.head}>Games</h1>
                <Loading />
            </>
        )
    } else {

        return (
            <>
                <h1 className={gStyles.head}>Games</h1>
                <div className={styles.gameContainer}>
                    {gameList.map(game => (
                        <div className={styles.item} key={game._id}>
                            <Games game={game} favList={favList} onSignal={handleChildSignal} />
                        </div>
                    ))}
                </div>
                {isPopCollectionVisible && (
                    <PopCollection onClose={handleClosePopCollection} collectionList={collectionList} gameId={gameId} />
                )}
            </>
        );
    }
};

export default GamePage;