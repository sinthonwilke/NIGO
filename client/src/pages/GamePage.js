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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Chip from '../UI/Chip';

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
                        <div className={styles.filter1}>
                            <Box sx={{ minWidth: 120 }} >
                                <FormControl fullWidth >
                                    <InputLabel sx={{ color: 'white' }} >Year</InputLabel>
                                    <Select style={{ border: '1px solid rgba(255,255,255, 0.25)' }}
                                        value={year}
                                        onChange={handleYearChange}
                                        sx={{
                                            color: 'white', // text color
                                            '& .MuiSelect-icon': {
                                                color: 'white' // icon color
                                            }
                                        }}
                                    >
                                        <MenuItem value={"2023"}>2023</MenuItem>
                                        <MenuItem value={"2022"}>2022</MenuItem>
                                        <MenuItem value={"2021"}>2021</MenuItem>
                                        <MenuItem value={"2020"}>2020</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className={styles.filter2}>
                            <Box sx={{ minWidth: 120 }} >
                                <FormControl fullWidth >
                                    <InputLabel sx={{ color: 'white' }} >Platform</InputLabel>
                                    <Select style={{ border: '1px solid rgba(255,255,255, 0.25)' }}
                                        value={platform}
                                        onChange={handlePlatformChange}
                                        sx={{
                                            color: 'white', // text color
                                            '& .MuiSelect-icon': {
                                                color: 'white' // icon color
                                            }
                                        }}
                                    >
                                        <MenuItem value={"Steam"}>Steam</MenuItem>
                                        <MenuItem value={"Xbox"}>Xbox</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className={styles.filter3}>
                            <Chip />
                        </div>

                        <div className={styles.filter4}>
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