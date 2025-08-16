// src/components/common/SearchBar.jsx

import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
    return (
        <Form.Control
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            style={{ width: '100px' }}
        />
    );
};

export default SearchBar;