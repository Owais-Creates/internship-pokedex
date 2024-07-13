import React from 'react';
import './Search.css';

const Search = ({ setSearchTerm }) => {
    return (
        <>
            <input
                className='search-bar'
                type="text"
                placeholder="Search here ..."
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
        </>
    );
};

export default Search;
