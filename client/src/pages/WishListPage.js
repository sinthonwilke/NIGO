import gStyles from '../styles/global.module.css';
import CreateCollection from '../components/CreateCollection';

function WishListPage() {
    return (
        <>
            <h1 className={gStyles.head}>WishList</h1>
            <CreateCollection />
        </>
    );
}

export default WishListPage;
