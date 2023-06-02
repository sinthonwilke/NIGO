import { useState } from 'react';

function GameMenu() {

    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
    });

    const [selectedRadio, setSelectedRadio] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({ ...checkboxes, [name]: checked });
    };

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform actions with form data
        console.log('Submitted:', checkboxes, selectedRadio, selectedYear);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Checkboxes:</h3>
            {["test", 2, 3, 4, 5].map((index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        name={`checkbox${index}`}
                        checked={checkboxes[`checkbox${index}`]}
                        onChange={handleCheckboxChange}
                    />
                    Checkbox {index}
                </label>
            ))}
            <br />

            <h3>Radio Buttons:</h3>
            {[1, 2, 3, 4, 5].map((index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name="radio"
                        value={`radio${index}`}
                        checked={selectedRadio === `radio${index}`}
                        onChange={handleRadioChange}
                    />
                    Radio {index}
                </label>
            ))}
            <br />

            <h3>Year Selection:</h3>
            <select value={selectedYear} onChange={handleYearChange}>
                <option value="">Select a year</option>
                {[2020, 2021, 2022, 2023].map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default GameMenu;