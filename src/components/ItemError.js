import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const ItemError = (props) => {
    return (
        <div>
            <h1>Error 404:</h1>
            <h2>
                No {props.match.params.endpoint} found with id of '
                {props.match.params.id}'!
            </h2>
            <Link className="itemlink" to="/">
                Go back to home
            </Link>
        </div>
    );
};

export default ItemError;
