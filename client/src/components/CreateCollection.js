import React, { useState } from 'react';
import gStyles from '../styles/global.module.css';
import style from '../styles/CreateCollection.module.css';
import { BiAddToQueue } from 'react-icons/bi';

function CreateCollection() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue('');
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Add new collection here..."
            />
            <button type="submit"><BiAddToQueue className={style.icon} /></button>
        </form>
    );
}

export default CreateCollection;
