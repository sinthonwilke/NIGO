import { useState } from 'react';
import styles from '../styles/Collection.module.css';
import { BiRename } from 'react-icons/bi';
import { CgMoreO, CgMoreVerticalO } from 'react-icons/cg';
import { TbTrashXFilled } from 'react-icons/tb';
import { collectionUrl } from '../services/apiList';
import authConfig from '../services/authConfig';
import axios from 'axios';

function Collection(collection) {
    const [textValue, setTextValue] = useState(collection.collection.name);
    const [showMore, setShowMore] = useState(true);
    const [isRenaming, setIsRenaming] = useState(false);
    const [updatedTextValue, setUpdatedTextValue] = useState(textValue);

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    const handleRename = () => {
        setUpdatedTextValue(textValue);
        setIsRenaming(!isRenaming);
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
                        <p className={styles.headerText}>{textValue}</p>
                    )}
                    <div className={styles.btnGroup}>
                        <button className={styles.switchBtn} onClick={handleViewMore}>
                            {showMore ? <CgMoreO className={styles.icon} /> : <CgMoreVerticalO className={styles.icon} />}
                        </button>
                        <button className={styles.btn} onClick={handleRename}><BiRename className={styles.icon} /></button>
                        <button className={styles.btn}><TbTrashXFilled className={styles.icon} /></button>
                    </div>
                </div>
                <div className={styles.line} />
                <div className={`${styles.body} ${showMore ? styles.showMore : ''}`}>
                    <div className={showMore ? styles.item : styles.showmore}>
                        <>
                            {/* <div className={styles.item} key={game._id}>
                                <Games game={game} favList={favList} />
                            </div> */}
                        </>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Collection;
