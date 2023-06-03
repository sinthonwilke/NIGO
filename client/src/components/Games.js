import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Games.module.css';
import { AiOutlineHeart, AiFillCloseSquare, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { favUrl } from '../services/apiList'
import authConfig from '../services/authConfig';

function Games({ gameData }) {
    const [imageSrc, setImageSrc] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef(null);
    const [like, setLike] = useState(false);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(favUrl + gameData._id, authConfig);
                setLike(response.data);
            } catch (error) {
                console.error('Failed to fetch like status:', error);
            }
        };

        fetchLikeStatus();
    }, []);


    useEffect(() => {
        axios
            .get('http://localhost:3000/' + gameData.imgUrl, { responseType: 'blob' })
            .then(response => {
                const imageURL = URL.createObjectURL(response.data);
                setImageSrc(imageURL);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = event => {
            if (detailRef.current && !detailRef.current.contains(event.target)) {
                setShowDetail(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        setShowDetail(!showDetail);
    };

    const handleLikeClick = async () => {
        setLike(prevLike => !prevLike);
        try {
            if (like) {
                await axios.delete(favUrl + gameData._id, authConfig);
            } else {
                await axios.post(favUrl + gameData._id, {}, authConfig);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const releaseDate = new Date(gameData.releaseDate);
    const formattedDate = releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div>
            <div className={styles.itemCard}>
                <button className={styles.btnContent} onClick={handleButtonClick}>
                    <div>{imageSrc && <img src={imageSrc} />}</div>
                </button>
                <h3>{gameData.title}</h3>
                <div className={styles.buttonContainer}>
                    <button className={styles.A2Cbtn}>Add To Collection</button>
                    <button className={styles.likeBtn} onClick={handleLikeClick}>
                        {like ? <AiFillHeart style={{ fontSize: '26px' }} /> : <AiOutlineHeart style={{ fontSize: '26px' }} />}
                    </button>
                </div>
            </div>
            {showDetail && (
                <div className={styles.itemCardDetail}>
                    <div className={styles.detail} ref={detailRef}>
                        <div className={styles.leftDetail}>
                            {imageSrc && <img src={imageSrc} />}
                            <button className={styles.exitBtn} onClick={handleButtonClick}>
                                <AiFillCloseSquare />
                            </button>
                        </div>
                        <div className={styles.rightDetail}>
                            <h3>{gameData.title}</h3>
                            <p>{gameData.description}</p>
                            <p className={styles.tags}>Release Date: {formattedDate}</p>
                            <p className={styles.tags}>Platform: {gameData.platform}</p>
                            <div className={styles.lastLine}>
                                <p className={styles.tags}>
                                    {gameData.tags.map(tag => `#${tag}`).join(' ')}
                                </p>
                                <a href={gameData.link} target="_blank" rel="noopener noreferrer">
                                    Store Link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Games;
