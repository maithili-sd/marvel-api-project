import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/no-image.png';
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

const SearchResults = (props) => {
    const classes = useStyles();

    let card = null;

    const endpoint = () => {
        const endpointProp = props.match.params.endpoint;
        if (endpointProp === 'characters') {
            return 'characters';
        } else if (endpointProp === 'comics') {
            return 'comics';
        } else if (endpointProp === 'series') {
            return 'series';
        }
    };

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
                            <Link to={`/${endpoint()}/${character.id}`}>
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    image={
                                        characterThumbnail
                                            ? characterThumbnail
                                            : noImage
                                    }
                                    title={`${
                                        character.name
                                            ? character.name
                                            : character.title
                                    } image`}
                                />

                                <CardContent>
                                    <Typography
                                        className={classes.titleHead}
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                    >
                                        {character.name
                                            ? character.name
                                            : character.title}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        }
    };

    if (props.location.state.searchTerm) {
        if (props.location.state.searchData.results.length === 0) {
            return (
                <div>
                    <h1>Error 404:</h1>
                    <h2>
                        No results found for the search term '
                        {props.match.params.searchterm}'!
                    </h2>
                    <Link className="itemlink" to="/">
                        Go back to home
                    </Link>
                </div>
            );
        } else {
            card =
                props.location.state.searchData.results &&
                props.location.state.searchData.results.map((character) => {
                    return buildCard(character);
                });
            return (
                <div>
                    <h2>
                        Showing results for: {props.match.params.searchterm}
                    </h2>
                    <Grid container className={classes.grid} spacing={5}>
                        {card}
                    </Grid>
                </div>
            );
        }
    }
};

export default SearchResults;
