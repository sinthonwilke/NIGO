import styles from '../styles/PopCollection.module.css';
import axios from 'axios';
import { collectionGamesUrl } from '../services/apiList';
import authConfig from '../services/authConfig';

function PopCollection({ onClose, collectionList, gameId }) {

    const clickHandler = async (collectionId) => {
        console.log(collectionId);
        console.log(gameId);
        const addGame = await axios.post(collectionGamesUrl, { collection_id: collectionId, game_id: gameId }, authConfig)
        console.log(addGame);
    };

    return (
        <>
            <div className={styles.bg} onClick={onClose}>
                <div className={styles.container} >
                    <p>Add game to ...</p>
                    <div className={styles.line}></div>
                    {collectionList.map((collection) => (
                        <button key={collection.id} onClick={() => clickHandler(collection._id)}>
                            {collection.name}
                        </button>
                    ))}
                </div>
            </div >
        </>
    );
}

export default PopCollection;