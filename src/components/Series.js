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

const Series = (props) => {
    const md5 = require('blueimp-md5');
    const publickey = '6ae4f20900483eaeff1f0177e613a09f';
    const privatekey = '76d8d385d9e1bda7d558ca5cfb5099238d44cc46';
    const ts = new Date().getTime();
    const stringToBeHashed = ts + privatekey + publickey;
    const hash = md5(stringToBeHashed);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';

    const [seriesData, setSeriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    // fetch data for a particular seriesId from marvel api
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let seriesId = props.match.params.id;
                let isnum = /^\d+$/.test(seriesId);
                if (isnum) {
                    const seriesUrl = `${baseUrl}/${parseInt(
                        seriesId
                    )}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

                    const apiResults = await axios.get(seriesUrl);
                    const data = apiResults.data.data.results;
                    setSeriesData(data);

                    setLoading(false);
                } else {
                    setSeriesData([]);
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
                <h1>Loading series....</h1>
            </div>
        );
    }
    // if no data
    else if (!seriesData || seriesData.length === 0) {
        return (
            <Redirect
                to={{
                    pathname: `/series/error/${props.match.params.id}`,
                    state: { id: props.match.params.id, endpoint: 'series' },
                }}
            />
        );
    }
    // if data, build series card
    else if (seriesData) {
        let characterThumbnail =
            seriesData[0].thumbnail.path +
            '/standard_fantastic.' +
            seriesData[0].thumbnail.extension;

        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader
                    className={classes.titleHead}
                    title={seriesData.name}
                />
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                        seriesData && characterThumbnail
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
                                {seriesData && seriesData[0].title ? (
                                    <dd>{seriesData[0].title}</dd>
                                ) : (
                                    <dd>No title available</dd>
                                )}
                            </p>
                            <p>
                                <dt className="title">Description:</dt>
                                {seriesData && seriesData[0].description ? (
                                    <dd>{seriesData[0].description}</dd>
                                ) : (
                                    <dd>No description available</dd>
                                )}
                            </p>
                            <p>
                                <dt className="title">Creators:</dt>
                                {seriesData &&
                                seriesData[0].creators.available !== 0 ? (
                                    <dd>{seriesData[0].creators.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {seriesData[0].creators.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Characters:</dt>
                                {seriesData &&
                                seriesData[0].characters.available !== 0 ? (
                                    <dd>
                                        {seriesData[0].characters.available}
                                    </dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {seriesData[0].characters.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available stories:</dt>
                                {seriesData &&
                                seriesData[0].stories.available !== 0 ? (
                                    <dd>{seriesData[0].stories.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {seriesData[0].stories.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available comics:</dt>
                                {seriesData &&
                                seriesData[0].comics.available !== 0 ? (
                                    <dd>{seriesData[0].comics.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {seriesData[0].comics.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                            <p>
                                <dt className="title">Available events:</dt>
                                {seriesData &&
                                seriesData[0].events.available !== 0 ? (
                                    <dd>{seriesData[0].events.available}</dd>
                                ) : (
                                    <dd>No data available</dd>
                                )}
                            </p>
                            <ul>
                                {seriesData[0].events.items.map(
                                    (item, index) => (
                                        <li key={index}>{item.name}</li>
                                    )
                                )}
                            </ul>
                        </dl>
                        <Link to="/series/page/0">Back to all series</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Series;
