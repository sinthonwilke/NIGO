import CreateCollection from '../components/CreateCollection';
import Collection from '../components/Collection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { collectionUrl } from '../services/apiList';
import loadStyle from '../styles/Loading.module.css';
import authConfig from '../services/authConfig';

function WishListPage() {
    const [collectionList, setCollectionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                <CreateCollection />
                {collectionList.map(collection => (
                    <div className='{styles.item}' key={collection._id}>
                        <Collection collection={collection} />
                    </div>
                ))}
            </>
        );
    }
}

export default WishListPage;
