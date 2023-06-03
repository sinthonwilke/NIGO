import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Games.module.css';
import gameImg from '../assets/example/gameImg.jpg';
import { AiOutlineHeart, AiFillCloseSquare } from 'react-icons/ai';
import axios from 'axios';

function Games({ gameData }) {

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/' + gameData.imgUrl, { responseType: 'blob' })
            .then(response => {
                const imageURL = URL.createObjectURL(response.data);
                setImageSrc(imageURL);
            });
    }, []);


    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
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

    return (
        <div>
            <div className={styles.itemCard}>
                <button className={styles.btnContent} onClick={handleButtonClick}>
                    <div>
                        {imageSrc && <img src={imageSrc} />}
                    </div>
                </button>
                <h3>{gameData.title}</h3>
                <div className={styles.buttonContainer}>
                    <button className={styles.A2Cbtn}>Add To Collection</button>
                    <button className={styles.likeBtn}><AiOutlineHeart style={{ fontSize: '26px' }} /></button>
                </div>
            </div>
            {showDetail && (
                <div className={styles.itemCardDetail}>
                    <div className={styles.detail} ref={detailRef}>
                        <div className={styles.leftDetail}>
                            {imageSrc && <img src={imageSrc} />}
                            <button className={styles.exitBtn} onClick={handleButtonClick}><AiFillCloseSquare /></button>
                        </div>
                        <div className={styles.rightDetail}>
                            <h3>{gameData.title}</h3>
                            <p>{gameData.description}</p>
                            <p className={styles.tags}>Release Date: {gameData.releaseDate}</p>
                            <p className={styles.tags}>Platform: {gameData.platform}</p>
                            <div className={styles.lastLine}>
                                <p className={styles.tags}>{gameData.tags.map(tag => `#${tag}`).join(' ')}</p>
                                <a href={gameData.storeLink} target="_blank">Store Link</a>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Games;
