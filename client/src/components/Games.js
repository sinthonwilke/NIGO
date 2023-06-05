import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Games.module.css';
import { AiOutlineHeart, AiFillCloseSquare, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { favUrl } from '../services/apiList';
import authConfig from '../services/authConfig';

function Games({ game, fromFavPage = false, favList = [] }) {

    const [imageSrc, setImageSrc] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [like, setLike] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const detailRef = useRef(null);

    useEffect(() => {
        const fetchLikeStatus = () => {
            const isLiked = favList.some((favItem) => favItem.game_id === game._id);
            setLike(isLiked);
        };

        const loadImage = async () => {
            try {
                const response = await axios.get('http://localhost:3000/' + game.imgUrl, { responseType: 'blob' });
                const imageURL = URL.createObjectURL(response.data);
                setImageSrc(imageURL);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load image:', error);
            }
        };

        const handleClickOutside = event => {
            if (detailRef.current && !detailRef.current.contains(event.target)) {
                setShowDetail(false);
            }
        };

        if (!fromFavPage) {
            fetchLikeStatus();
        } else {
            setLike(true);
        }
        loadImage();
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
                await axios.delete(favUrl + game._id, authConfig);
            } else {
                await axios.post(favUrl + game._id, {}, authConfig);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const releaseDate = new Date(game.releaseDate);
    const formattedDate = releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div>
            {isLoading ? (
                <div className={styles.loading}><p>Loading...</p></div>
            ) : (
                <div className={styles.itemCard}>
                    <button className={styles.btnContent} onClick={handleButtonClick}>
                        <div>{imageSrc && <img src={imageSrc} />}</div>
                    </button>
                    <h3>{game.title}</h3>
                    <div className={styles.buttonContainer}>
                        <button className={styles.A2Cbtn}>Add To Collection</button>
                        <button className={styles.likeBtn} onClick={handleLikeClick}>
                            {like ? (
                                <AiFillHeart style={{ fontSize: '26px' }} />
                            ) : (
                                <AiOutlineHeart style={{ fontSize: '26px' }} />
                            )}
                        </button>
                    </div>
                </div>
            )}
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
                            <h3>{game.title}</h3>
                            <p>{game.description}</p>
                            <p className={styles.tags}>Release Date: {formattedDate}</p>
                            <p className={styles.tags}>Platform: {game.platform}</p>
                            <div className={styles.lastLine}>
                                <p className={styles.tags}>
                                    {game.tags.map(tag => `#${tag}`).join(' ')}
                                </p>
                                <a href={game.link} target="_blank" rel="noopener noreferrer">
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
