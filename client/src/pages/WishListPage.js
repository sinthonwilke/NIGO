import gStyles from '../styles/global.module.css';
import CreateCollection from '../components/CreateCollection';
import Collection from '../components/Collection';

function WishListPage() {
    return (
        <>
            <h1 className={gStyles.head}>WishList</h1>
            <CreateCollection />
            <Collection />
        </>
    );
}

export default WishListPage;
