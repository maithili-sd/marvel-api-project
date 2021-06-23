import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const PageError = (props) => {
    return (
        <div>
            <h1>Error 404:</h1>
            <h2>This page does not exist!</h2>
            <Link className="itemlink" to="/">
                Go back to home
            </Link>
        </div>
    );
};

export default PageError;
