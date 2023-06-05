import { useEffect, useState } from 'react';
import styles from '../styles/Collection.module.css';
import { BiRename } from 'react-icons/bi';
import { CgMoreO, CgMoreVerticalO } from 'react-icons/cg';
import { TbTrashXFilled } from 'react-icons/tb';
import { collectionUrl } from '../services/apiList';
import authConfig from '../services/authConfig';
import axios from 'axios';
import { collectionGamesUrl, favUrl } from '../services/apiList';
import Games from '../components/Games';
import loadStyle from '../styles/Loading.module.css';

function Collection(collection) {
    const [gameList, setGameList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [textValue, setTextValue] = useState(collection.collection.name);
    const [showMore, setShowMore] = useState(true);
    const [isRenaming, setIsRenaming] = useState(false);
    const [updatedTextValue, setUpdatedTextValue] = useState(textValue);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameListResponse = await axios.get(collectionGamesUrl + collection.collection._id, authConfig);
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

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    const handleRename = () => {
        setUpdatedTextValue(textValue);
        setIsRenaming(!isRenaming);
    };

    const handleRemove = async () => {
        await axios.delete(collectionUrl + collection.collection._id, authConfig);
        window.location.reload();
    };

    const handleTextChange = (event) => {
        setUpdatedTextValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTextValue(updatedTextValue);
        setIsRenaming(false);
        await axios.put(collectionUrl + collection.collection._id, { name: updatedTextValue }, authConfig);
    };

    if (isLoading) {
        return (
            <>
                <div className={loadStyle.loadBody}>
                    <div className={loadStyle.loading}>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={styles.collection}>
                    <div className={styles.head}>
                        {isRenaming ? (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <input
                                    type="text"
                                    value={updatedTextValue}
                                    onChange={handleTextChange}
                                    autoFocus
                                    className={styles.headerText}
                                />
                            </form>
                        ) : (
                            <p className={`${styles.headerText} ${textValue ? '' : styles.emptyText}`}>{textValue}</p>
                        )}
                        <div className={styles.btnGroup}>
                            <button className={styles.switchBtn} onClick={handleViewMore}>
                                {showMore ? <CgMoreO className={styles.icon} /> : <CgMoreVerticalO className={styles.icon} />}
                            </button>
                            <button className={styles.btn} onClick={handleRename}><BiRename className={styles.icon} /></button>
                            <button className={styles.btn} onClick={handleRemove}><TbTrashXFilled className={styles.icon} /></button>
                        </div>
                    </div>
                    <div className={styles.line} />
                    <div className={`${styles.body} ${showMore ? styles.showMore : ''}`}>
                        <div className={showMore ? styles.showless : styles.showmore}>
                            {gameList.map(game => (
                                <div className={styles.gameItem} key={game._id}>
                                    <Games game={game} favList={favList} fromColPage={collection.collection._id} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default Collection;
