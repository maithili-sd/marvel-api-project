import React, { useState } from 'react';

const SearchFromAPI = (props) => {
    const [targetValue, setTargetValue] = useState(null);

    // set search term in the parent element through props (use context api instead)
    const handleClick = (e) => {
        props.searchValue(targetValue);
    };
    const handleChange = (e) => {
        setTargetValue(e.target.value);
    };
    return (
        <form
            method="POST"
            onSubmit={(e) => {
                e.preventDefault();
                handleClick();
            }}
            name="formName"
            className="center"
        >
            <label>
                <span>Search: </span>
                <input
                    autoComplete="off"
                    type="text"
                    className="searchBar"
                    name="searchTerm"
                    onChange={handleChange}
                />
            </label>
            <label>
                <button type="submit" className="searchButton" value="Search">
                    Search
                </button>
            </label>
        </form>
    );
};

export default SearchFromAPI;
