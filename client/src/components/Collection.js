import { useState } from 'react';
import styles from '../styles/Collection.module.css';
import { BiRename } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import example from '../assets/example.jpg';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { CgMoreO, CgMoreVerticalO } from 'react-icons/cg';


function Collection() {
    const [showMore, setShowMore] = useState(true);

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <div className={styles.collection}>
                <div className={styles.head}>
                    <h3>Test</h3>
                    <div className={styles.btnGroup}>
                        <button className={styles.switchBtn} onClick={handleViewMore}>
                            {showMore ? <CgMoreO className={styles.icon} /> : <CgMoreVerticalO className={styles.icon} />}
                        </button>
                        <button className={styles.btn}><BiRename className={styles.icon} /></button>
                        <button className={styles.btn}><AiFillDelete className={styles.icon} /></button>
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
