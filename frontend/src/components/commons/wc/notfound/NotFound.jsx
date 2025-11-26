import React from 'react';
import './NotFound.css';
import { NavLink } from 'react-router';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
            <NavLink to="/" className="not-found-link">Go Back Home</NavLink>
        </div>
    );
};

export default NotFound;