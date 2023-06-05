import styles from '../styles/Collection.module.css';
import { BiRename } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import example from '../assets/example.jpg';
function Collection() {
    return (
        <>
            <div className={styles.collection}>
                <div className={styles.head}>
                    <h3>Test</h3>
                    <div className={styles.btnGroup}>
                        <button className={styles.btn}><BiRename className={styles.icon} /></button>
                        <button className={styles.btn}><AiFillDelete className={styles.icon} /></button>
                    </div>
                </div>
                <div className={styles.line} />
                <div className={styles.body}>
                    <div className={styles.item}>
                        <img src={example} alt="example" />
                        <img src={example} alt="example" />
                        <img src={example} alt="example" />
                        <img src={example} alt="example" />
                        <img src={example} alt="example" />
                    </div>
                </div>
                <button className={styles.switchBtn}>View More</button>
            </div>
        </>

    );
}

export default Collection;