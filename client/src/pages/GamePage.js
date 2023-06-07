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
    const [message, setMessage] = useState('');
    const [showMessageEffect, setShowMessageEffect] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {

                let getThisUrl = gameListUrl;
                let showMsg = true;

                if (searchValue) {
                    getThisUrl = searchGameUrl + searchValue;
                }
                else if (searchValue == '' || searchValue == null) {
                    getThisUrl = gameListUrl;
                    showMsg = false;
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

                if (updatedGameList.length > 0 && showMsg == true) {
                    setMessage(`Search result for "${searchValue}"`);
                    setShowMessageEffect(true);

                } else if (updatedGameList.length <= 0 && showMsg == true) {
                    setMessage(`No search result for "${searchValue}"`);
                    setShowMessageEffect(true);
                }

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

    const handleMessageText = (msg) => {
        setMessage(msg);
        setShowMessageEffect(false);
        setTimeout(() => {
            setShowMessageEffect(true);
        }
            , 1);
    };

    const [year, setYear] = useState('');
    const [platform, setPlatform] = useState('');
    const [genres, setGenres] = useState([]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
    };

    const handleGenreChange = (event) => {
        const selectedGenres = Array.from(event.target.form.elements.genres)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        setGenres(selectedGenres);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Year:', year);
        console.log('Platform:', platform);
        console.log('Genres:', genres);
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
                <h5 className={`${styles.message} ${showMessageEffect ? styles.effect : ''}`}>{message}</h5>

                <div>
                    <form onSubmit={handleSubmit} className={styles.filterContainer}>
                        <div>
                            <p>Year:</p>
                            <select id="year-select">
                                <option value="">Select a year</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>
                        </div>

                        <div className={styles.radioContainer}>
                            <p>Platform:</p>
                            <select id="platform-select">
                                <option value="">Select a platform</option>
                                <option value="PC">PC</option>
                                <option value="Xbox">Xbox</option>
                            </select>
                        </div>

                        <div>
                            <p>Genres:</p>
                            <select id="genre-select" multiple>
                                <option value="RPG">RPG</option>
                                <option value="Open world">Open world</option>
                                <option value="Shoot">Shoot</option>
                            </select>
                        </div>

                        <div>
                            <button type="submit" className={styles.btn}>Filter</button>
                        </div>
                    </form>
                </div>

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