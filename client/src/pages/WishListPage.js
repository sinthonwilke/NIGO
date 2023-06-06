import CreateCollection from '../components/CreateCollection';
import Collection from '../components/Collection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { collectionUrl } from '../services/apiList';
import authConfig from '../services/authConfig';
import gStyles from '../styles/global.module.css';
import Loading from '../components/Loading';

function WishListPage() {
    const [collectionList, setCollectionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isChildLoading, setIsChildLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionListRes = await axios.get(collectionUrl, authConfig);
                const updatedCollectionList = collectionListRes.data.map((collectionList, index) => ({
                    ...collectionList,
                    id: index + 1
                }));
                setCollectionList(updatedCollectionList);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChildSignal = () => {
        setIsChildLoading(true);
    };

    if (isLoading || isChildLoading) {
        return (
            <>
                <h1 className={gStyles.head}>WishList</h1>
                <CreateCollection />
                <Loading />
            </>
        )
    } else {
        return (
            <>
                <h1 className={gStyles.head}>WishList</h1>
                <CreateCollection />
                {collectionList.map(collection => (
                    <div className='{styles.item}' key={collection._id}>
                        <Collection collection={collection} isChildLoading={handleChildSignal} />
                    </div>
                ))}
            </>
        );
    }
}

export default WishListPage;
