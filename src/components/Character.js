import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import noImage from '../img/no-image.png';
import {
    makeStyles,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
} from '@material-ui/core';
import '../App.css';

const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        borderRadius: 5,
        border: '2px solid  #F0131E',
        boxShadow:
            '0 19px 38px rgba(0,0,0,0.10), 0 15px 12px rgba(0,0,0,0.05);',
    },
    titleHead: {
        fontWeight: 'bold',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    media: {
        height: '100%',
        width: '100%',
    },
    button: {
        color: ' #F0131E',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

const Character = (props) => {
    const md5 = require('blueimp-md5');
    const publickey = '6ae4f20900483eaeff1f0177e613a09f';
    const privatekey = '76d8d385d9e1bda7d558ca5cfb5099238d44cc46';
    const ts = new Date().getTime();
    const stringToBeHashed = ts + privatekey + publickey;
    const hash = md5(stringToBeHashed);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

    const [characterData, setCharacterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    // fetch data for a particular characterId from marvel api
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let characterId = props.match.params.id;
                let isnum = /^\d+$/.test(characterId);
                if (isnum) {
                    const characterUrl = `${baseUrl}/${parseInt(
                        characterId
                    )}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

                    const apiResults = await axios.get(characterUrl);
                    const data = apiResults.data.data.results;
                    setCharacterData(data);

                    setLoading(false);
                } else {
                    setCharacterData([]);
                    setLoading(false);
                }
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.id]);

    // if loading
    if (loading) {
        return (
            <div>
                <h1>Loading character....</h1>
            </div>
        );
    }
    // if no data
    else if (!characterData || characterData.length === 0) {
        return (
            <Redirect
                to={{
                    pathname: `/error/characters/${props.match.params.id}`,
                    state: { id: props.match.params.id, endpoint: 'character' },
                }}
            />
        );
    }
    // if data, build character card
    else if (characterData) {
        let characterThumbnail =
            characterData[0].thumbnail.path +
            '/standard_fantastic.' +
            characterData[0].thumbnail.extension;

        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader
                    className={classes.titleHead}
                    title={characterData.name}
                />
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                        characterData && characterThumbnail
                            ? characterThumbnail
                            : noImage
                    }
                    title="show image"
                />

                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                    >
                        <dl>
                            <p>
                                <dt className="title">Name:</dt>
                                {characterData && characterData[0].name ? (
                                    <dd>{characterData[0].name}</dd>
                                ) : (
                                    <dd>No name available</dd>
                                )}
                            </p>
                            <p>
                                <dt className="title">Description:</dt>
                                {characterData &&
                                characterData[0].description ? (
                                    <dd>{characterData[0].description}</dd>
                                ) : (
                                    <dd>No description available</dd>
                                )}
                            </p>
                            <p>
                                <dt className="title">Available comics:</dt>
                                {characterData &&
                                characterData[0].comics.available !== 0 ? (
                                    <dd>{characterData[0].comics.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {characterData[0].comics.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available series:</dt>
                                {characterData &&
                                characterData[0].series.available !== 0 ? (
                                    <dd>{characterData[0].series.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {characterData[0].series.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available stories:</dt>
                                {characterData &&
                                characterData[0].stories.available !== 0 ? (
                                    <dd>
                                        {characterData[0].stories.available}
                                    </dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {characterData[0].stories.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available events:</dt>
                                {characterData &&
                                characterData[0].events.available !== 0 ? (
                                    <dd>{characterData[0].events.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {characterData[0].events.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                        </dl>
                        <Link to="/characters/page/0">
                            Back to all characters
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Character;
