import { useState } from 'react';
import styles from '../styles/Collection.module.css';
import { BiRename } from 'react-icons/bi';
import example from '../assets/example.jpg';
import { CgMoreO, CgMoreVerticalO } from 'react-icons/cg';
import { TbTrashXFilled } from 'react-icons/tb';


function Collection() {
    const [textValue, setTextValue] = useState('Test');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setTextValue(updatedTextValue);
        setIsRenaming(false);
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
                            <img src={example} alt="example" />
                            <img src={example} alt="example" />
                            <img src={example} alt="example" />
                            <img src={example} alt="example" />
                            <img src={example} alt="example" />
                        </>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Collection;
