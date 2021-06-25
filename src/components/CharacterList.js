import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import noImage from '../img/no-image.png';
import SearchFromAPI from './SearchFromAPI';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';
import '../App.css';

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
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

const CharacterList = (props) => {
    const md5 = require('blueimp-md5');
    const publickey = '6ae4f20900483eaeff1f0177e613a09f';
    const privatekey = '76d8d385d9e1bda7d558ca5cfb5099238d44cc46';
    const ts = new Date().getTime();
    const stringToBeHashed = ts + privatekey + publickey;
    const hash = md5(stringToBeHashed);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const listUrl =
        baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [characterListData, setCharacterListData] = useState([]);
    const [lastPage, setLastPage] = useState(null);

    let card = null;

    // fetch character list data from marvel api
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let pageNum = props.match.params.page;
                let isnum = /^\d+$/.test(pageNum);
                if (isnum) {
                    let characterListUrl = `${listUrl}&limit=20&offset=${
                        parseInt(pageNum) * 20
                    }`;

                    const apiResults = await axios.get(characterListUrl);
                    const data = apiResults.data.data.results;
                    const totalResults = apiResults.data.data.total;
                    setCharacterListData(data);
                    let noOfPagesDivisible = totalResults / 20 - 1;
                    let noOfPages = Math.floor(totalResults / 20);
                    if (totalResults % 20 === 0)
                        setLastPage(noOfPagesDivisible);
                    else setLastPage(noOfPages);

                    setLoading(false);
                } else {
                    setCharacterListData([]);
                    setLoading(false);
                }
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();
        return () => {
            setSearchTerm('');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.page]);

    // fetch search data from api
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const apiSearchResults = await axios.get(
                    listUrl + '&nameStartsWith=' + searchTerm + '&limit=20'
                );
                const data = apiSearchResults.data.data;
                setSearchData(data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }
        if (searchTerm) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const searchValue = async (value) => {
        setSearchTerm(value);
    };

    // build character list card
    const buildCard = (character) => {
        if (character !== undefined) {
            let characterThumbnail =
                character.thumbnail.path +
                '/standard_fantastic.' +
                character.thumbnail.extension;

            return (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                    key={character.id}
                >
                    <Card className={classes.card} variant="outlined">
                        <CardActionArea>
                            <Link to={`/characters/${character.id}`}>
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    image={
                                        characterThumbnail
                                            ? characterThumbnail
                                            : noImage
                                    }
                                    title={character.name + ' image'}
                                />

                                <CardContent>
                                    <Typography
                                        className={classes.titleHead}
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                    >
                                        {character.name}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        }
    };

    // if search term is entered
    if (searchTerm) {
        // if loading
        if (loading) {
            return (
                <div>
                    <h1>Hang on...fetching search results</h1>
                </div>
            );
        }
        // return search data results
        else if (searchData.results) {
            return (
                <Redirect
                    to={{
                        pathname: `/search/characters/${searchTerm}`,
                        state: {
                            searchData: searchData,
                            searchTerm: searchTerm,
                        },
                    }}
                />
            );
        }
    } else {
        card =
            characterListData &&
            characterListData.map((character) => {
                return buildCard(character);
            });
    }

    if (loading) {
        return (
            <div>
                <h1>Loading character list...</h1>
            </div>
        );
    }
    // ensure proper pagination
    else if (
        parseInt(props.match.params.page) > 0 &&
        parseInt(props.match.params.page) < lastPage
    ) {
        return (
            <div>
                <SearchFromAPI searchValue={searchValue} />
                <br />
                <br />
                <div className="Button-container">
                    <Link
                        to={`/characters/page/${
                            parseInt(props.match.params.page) - 1
                        }`}
                        className="pagePrev"
                    >
                        Previous page
                    </Link>
                    <Link
                        to={`/characters/page/${
                            parseInt(props.match.params.page) + 1
                        }`}
                        className="pageNext"
                    >
                        Next page
                    </Link>
                </div>
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    } else if (parseInt(props.match.params.page) === 0) {
        return (
            <div>
                <SearchFromAPI searchValue={searchValue} />
                <br />
                <br />
                <div className="Button-container">
                    <Link
                        to={`/characters/page/${
                            parseInt(props.match.params.page) + 1
                        }`}
                        className="pageNext"
                    >
                        Next page
                    </Link>
                </div>
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    } else if (parseInt(props.match.params.page) === lastPage) {
        return (
            <div>
                <SearchFromAPI searchValue={searchValue} />
                <br />
                <br />
                <div className="Button-container">
                    <Link
                        to={`/characters/page/${
                            parseInt(props.match.params.page) - 1
                        }`}
                        className="pagePrev"
                    >
                        Previous page
                    </Link>
                </div>
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: `/pageerror/characters/${props.match.params.page}`,
                    state: { page: props.match.params },
                }}
            />
        );
    }
};

export default CharacterList;
