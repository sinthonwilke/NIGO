import gStyles from '../styles/global.module.css';
import styles from '../styles/ProfilePage.module.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { userUrl, url, updateUserUrl } from '../services/apiList';
import authConfig from '../services/authConfig';

function ProfilePage() {
    const [isUserNameEditing, setIsUserNameEditing] = useState(false);
    const [isBioEditing, setIsBioEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const [userNameInput, setUserNameInput] = useState(userName);
    const [bio, setBio] = useState('');
    const [bioInput, setBioInput] = useState(bio);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isErrorMessage, setIsErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(userUrl, authConfig);
                const userDetail = userRes.data;

                const imgRes = await axios.get(url + userDetail.profilePicture, { responseType: 'blob' });
                const imageURL = URL.createObjectURL(imgRes.data);

                setUserName(userDetail.username);
                setBio(userDetail.bio);
                setImageSrc(imageURL);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleUserNameEdit = (e) => {
        setIsUserNameEditing(!isUserNameEditing);
        setUserNameInput(userName);
    };

    const handleBioEdit = (e) => {
        setIsBioEditing(!isBioEditing);
        setBioInput(bio);
    };

    const handleUserNameChange = (e) => {
        setUserNameInput(e.target.value);
    };

    const handleBioChange = (e) => {
        setBioInput(e.target.value);
    };

    const handleProfileImgChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.put(updateUserUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                ...authConfig
            });
            const imageURL = URL.createObjectURL(file);
            setImageSrc(imageURL);
            displayErrorMessage('Profile image updated.');
        } catch (error) {
            displayErrorMessage('Error updating profile image.', true);
        }
    };

    const handleUserNameSubmit = async (e) => {
        setIsUserNameEditing(false);
        if (userNameInput === userName) return;

        try {
            const res = await axios.put(updateUserUrl, { username: userNameInput }, authConfig);
            setUserName(userNameInput);
            displayErrorMessage('User name updated.');
        } catch (error) {
            displayErrorMessage('Username already exists.', true);
        }
    };

    const handleBioSubmit = async (e) => {
        e.preventDefault();
        setIsBioEditing(false);
        if (bioInput === bio) return;

        try {
            setBio(bioInput);
            displayErrorMessage('Bio updated.')
            await axios.put(updateUserUrl, { bio: bioInput }, authConfig);
        } catch (error) {
            displayErrorMessage(error);
        }
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const displayErrorMessage = (msg, error = false) => {
        setIsErrorMessage(error);
        setErrorMessage(msg);
    };

    if (isLoading) {
        return (
            <>
                <h1 className={gStyles.head}>Profile</h1>
                <Loading />
            </>
        )
    } else {
        return (
            <>
                <h1 className={gStyles.head}>Profile</h1>

                <div className={styles.container}>

                    {errorMessage && (
                        <div className={`${styles.msg} ${isErrorMessage ? styles.red : styles.green}`}>{errorMessage}</div>
                    )}

                    <form>
                        <label htmlFor="profileImg">
                            <img src={imageSrc} className={styles.profileBtn} />
                            <input
                                type="file"
                                id="profileImg"
                                name="profileImg"
                                accept="image/*"
                                onChange={handleProfileImgChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </form>

                    {isUserNameEditing ? (
                        <form onSubmit={handleUserNameSubmit} className={styles.formStyle}>
                            <>
                                <h3 className={styles.h3}>
                                    Username:
                                    <button
                                        type='button'
                                        onClick={handleUserNameEdit}
                                        className={styles.icon}>
                                        <AiOutlineEdit />
                                    </button>
                                </h3>
                                <input
                                    type="text"
                                    value={userNameInput}
                                    onChange={handleUserNameChange}
                                />
                            </>
                        </form>

                    ) : (
                        <>
                            <h3 className={styles.h3}>
                                Username:
                                <button
                                    type='button'
                                    onClick={handleUserNameEdit}
                                    className={styles.icon}>
                                    <AiOutlineEdit />
                                </button>
                            </h3>
                            <p>{userName}</p>
                        </>
                    )}

                    {isBioEditing ? (
                        <form onSubmit={handleBioSubmit} className={styles.formStyle}>
                            <>
                                <h3 className={styles.h3}>
                                    Bio:
                                    <button onClick={handleBioEdit}
                                        type='button'
                                        className={styles.icon}>
                                        <AiOutlineEdit />
                                    </button>
                                </h3>
                                <input
                                    type="text"
                                    value={bioInput}
                                    onChange={handleBioChange}
                                />
                            </>
                        </form>
                    ) : (
                        <>
                            <h3 className={styles.h3}>
                                Bio:
                                <button
                                    type='button'
                                    onClick={handleBioEdit}
                                    className={styles.icon}>
                                    <AiOutlineEdit />
                                </button>
                            </h3>
                            <p>{bio}</p>
                        </>
                    )}

                </div >
            </>
        );
    }
}

export default ProfilePage;
