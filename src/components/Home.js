import React from 'react';
import '../App.css';

const md5 = require('blueimp-md5');
const publickey = '6ae4f20900483eaeff1f0177e613a09f';
const privatekey = '76d8d385d9e1bda7d558ca5cfb5099238d44cc46';
const ts = new Date().getTime();
const stringToBeHashed = ts + privatekey + publickey;
const hash = md5(stringToBeHashed);
const baseUrl = 'https://gateway.marvel.com:443/v1/public';
const charactersURL = `${baseUrl}/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
const comicsURL = `${baseUrl}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}`;
const seriesURL = `${baseUrl}/series?ts=${ts}&apikey=${publickey}&hash=${hash}`;

const Home = () => {
    return (
        <div>
            <p>
                This is a simple example of using React to query the Marvel API.
                Start by clicking the "Characters", "Comic" or "Series" button
                above.
            </p>

            <p className="hometext">
                The application queries three of Marvel API's end-points:{' '}
                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={charactersURL}
                >
                    Characters
                </a>{' '}
                ,{' '}
                <a rel="noopener noreferrer" target="_blank" href={comicsURL}>
                    Comics
                </a>{' '}
                and{' '}
                <a rel="noopener noreferrer" target="_blank" href={seriesURL}>
                    Series
                </a>{' '}
            </p>
        </div>
    );
};

export default Home;
