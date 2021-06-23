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

const Comic = (props) => {
    const md5 = require('blueimp-md5');
    const publickey = '6ae4f20900483eaeff1f0177e613a09f';
    const privatekey = '76d8d385d9e1bda7d558ca5cfb5099238d44cc46';
    const ts = new Date().getTime();
    const stringToBeHashed = ts + privatekey + publickey;
    const hash = md5(stringToBeHashed);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';

    const [comicData, setComicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    // fetch data for a particular comicId from marvel api
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let comicId = props.match.params.id;
                let isnum = /^\d+$/.test(comicId);
                if (isnum) {
                    const comicUrl = `${baseUrl}/${parseInt(
                        comicId
                    )}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

                    const apiResults = await axios.get(comicUrl);
                    const data = apiResults.data.data.results;
                    setComicData(data);

                    setLoading(false);
                } else {
                    setComicData([]);
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
                <h1>Loading comic....</h1>
            </div>
        );
    }
    // if no data
    else if (!comicData || comicData.length === 0) {
        return (
            <Redirect
                to={{
                    pathname: `/error/comics/${props.match.params.id}`,
                    state: { id: props.match.params.id, endpoint: 'comic' },
                }}
            />
        );
    }
    // if data, build comic card
    else if (comicData) {
        let characterThumbnail =
            comicData[0].thumbnail.path +
            '/standard_fantastic.' +
            comicData[0].thumbnail.extension;

        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader
                    className={classes.titleHead}
                    title={comicData.name}
                />
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                        comicData && characterThumbnail
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
                                <dt className="title">Title:</dt>
                                {comicData && comicData[0].title ? (
                                    <dd>{comicData[0].title}</dd>
                                ) : (
                                    <dd>No title available</dd>
                                )}
                            </p>
                            <p>
                                <dt className="title">Page count:</dt>
                                {comicData && comicData[0].pageCount ? (
                                    <dd>{comicData[0].pageCount}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <p>
                                <dt className="title">Creators:</dt>
                                {comicData &&
                                comicData[0].creators.available !== 0 ? (
                                    <dd>{comicData[0].creators.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {comicData[0].creators.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Characters:</dt>
                                {comicData &&
                                comicData[0].characters.available !== 0 ? (
                                    <dd>{comicData[0].characters.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {comicData[0].characters.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available stories:</dt>
                                {comicData &&
                                comicData[0].stories.available !== 0 ? (
                                    <dd>{comicData[0].stories.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {comicData[0].stories.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available events:</dt>
                                {comicData &&
                                comicData[0].events.available !== 0 ? (
                                    <dd>{comicData[0].events.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {comicData[0].events.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                        </dl>
                        <Link to="/comics/page/0">Back to all comics</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Comic;
