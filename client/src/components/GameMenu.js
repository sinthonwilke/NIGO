import gStyles from '../styles/global.module.css';

function GameMenu() {
    return (
        <div className="content">
            <h1 className={gStyles.head}>Games</h1>
            <button>Add Game</button>
        </div>
    );
}

export default GameMenu;