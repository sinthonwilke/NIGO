import loadStyle from '../styles/Loading.module.css';

function Loading() {
    return (
        <div className={loadStyle.loadBody}>
            <div className={loadStyle.loading}>
                <div className={loadStyle.dot}></div>
                <div className={loadStyle.dot}></div>
                <div className={loadStyle.dot}></div>
                <div className={loadStyle.dot}></div>
                <div className={loadStyle.dot}></div>
            </div>
        </div>
    );
}

export default Loading;
