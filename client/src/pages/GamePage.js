import Nav from '../components/Nav';
import Games from '../components/Games';
import GameMenu from '../components/GameMenu';
import gStyles from '../styles/global.module.css';
import styles from '../styles/GamePage.module.css';


function GamePage() {
    const gameData = {
        title: 'Game Title',
        description: 'Game Description',
        releaseDate: '2023-06-03',
        platform: 'PC',
        tags: ['Tag1', 'Tag2', 'Tag3'],
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