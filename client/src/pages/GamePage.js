import Nav from '../components/Nav';
import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';


function GamePage() {
    const gameData = {
        title: 'Game Title',
        description: 'Game Description',
        releaseDate: '2023-06-03',
        platform: 'PC',
        tags: ['Tag1', 'Tag2', 'Tag3'],
        imgUrl: 'assets/img/s35eqy-1685642025780.jpg',
        storeLink: 'https://www.google.com',
    };

    // const [imageSrc, setImageSrc] = useState('');

    // useEffect(() => {
    //     axios.get('http://localhost:3000/' + gameData.imgUrl, { responseType: 'blob' })
    //         .then(response => {
    //             const imageURL = URL.createObjectURL(response.data);
    //             setImageSrc(imageURL);
    //         });
    // }, []);


    return (
        <>
            <Nav />
            <h1 className={gStyles.head}>Games</h1>
            <Games gameData={gameData} />
            {/* <div>
                {imageSrc && <img src={imageSrc}/>}
            </div> */}
        </>
    );
}

export default GamePage;