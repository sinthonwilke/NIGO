import Nav from '../components/Nav';
import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';


function GamePage() {
    const gameData = {
        title: 'Game Title',
        description: 'Game Descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
        releaseDate: '2023-06-03',
        platform: 'PC',
        tags: ['Tag1', 'Tag2', 'Tag3'],
        imgUrl: 'assets/img/s35eqy-1685642025780.jpg',
        storeLink: 'https://www.google.com',
    };

    return (
        <>
            <Nav />
            <h1 className={gStyles.head}>Games</h1>
            <Games gameData={gameData} />
        </>
    );
}

export default GamePage;