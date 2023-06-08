import { useEffect, useState } from 'react';
import userStyles from '../styles/ProfilePage.module.css';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { findUserUrl, url } from '../services/apiList';
import axios from 'axios';
import gStyles from '../styles/global.module.css';

function OtherProfilePage() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userFound, setUserFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let user = searchValue.substring(1);
                const userRes = await axios.post(findUserUrl, { username: user });
                const userDetail = userRes.data;

                const imgRes = await axios.get(url + userDetail.profilePicture, { responseType: 'blob' });
                const imageURL = URL.createObjectURL(imgRes.data);

                setUserName(userDetail.username);
                setBio(userDetail.bio);
                setImageSrc(imageURL)
                setUserFound(true);
                setIsLoading(false);
            } catch (error) {
                setUserFound(false);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);


    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    } else if (userFound === true) {
        return (
            <>
                <div className={userStyles.container}>
                    <img src={imageSrc} className={userStyles.profileBtn} />
                    <h3 className={userStyles.h3}>Username:</h3>
                    <p>{userName}</p>
                    <h3 className={userStyles.h3}>Bio:</h3>
                    <p>{bio}</p>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <h1 className={gStyles.centerScreen}>Username "{searchValue.substring(1)}" Not Found . . .</h1>
            </>
        );
    }
}


export default OtherProfilePage;