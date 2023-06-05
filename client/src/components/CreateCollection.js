import React, { useState } from 'react';
import gStyles from '../styles/global.module.css';
import style from '../styles/CreateCollection.module.css';
import { BiAddToQueue } from 'react-icons/bi';
import axios from 'axios';
import { collectionUrl } from '../services/apiList';
import authConfig from '../services/authConfig';

function CreateCollection() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setInputValue('');
        const response = await axios.post(collectionUrl, { name: inputValue }, authConfig);
        window.location.reload();
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder='Add new collection here...'
                />
                <button type="submit"><BiAddToQueue className={style.icon} /></button>
            </form>
            <div style={{ marginBottom: '32px' }} ></div>
        </>
    );
}

export default CreateCollection;
