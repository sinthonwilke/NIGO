import gStyles from '../styles/global.module.css';
import styles from '../styles/HomePage.module.css';
import Games from '../components/Games';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { recentGameUrl, favUrl, collectionUrl, updateUserUrl } from '../services/apiList';
import authConfig from '../services/authConfig';
import Loading from '../components/Loading';
import PopCollection from '../components/PopCollection';

function HomePage() {

    const [gameList, setGameList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [collectionList, setCollectionList] = useState([]);
    const [isPopCollectionVisible, setPopCollectionVisible] = useState(false);
    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameListResponse = await axios.get(recentGameUrl);
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
                console.log(updatedGameList)

            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };
        fetchData();
    }, []);

    const handleClosePopCollection = () => {
        setPopCollectionVisible(false);
    };

    const handleChildSignal = (gameId) => {
        setGameId(gameId);
        setPopCollectionVisible(!isPopCollectionVisible);
    };

    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    } else {
        return (
            <>
                <h1 className={gStyles.head}>News</h1>
                <h2 style={{ marginLeft: "32px" }}>Recently Added</h2>
                <div className={styles.gameContainer}>
                    {gameList.map((game) => (
                        <Games
                            key={game.id}
                            game={game}
                            favList={favList}
                            onSignal={handleChildSignal}
                        />
                    ))}
                </div>
                {isPopCollectionVisible && (
                    <PopCollection onClose={handleClosePopCollection} collectionList={collectionList} gameId={gameId} />
                )}
            </>
        );
    }
}

export default HomePage;