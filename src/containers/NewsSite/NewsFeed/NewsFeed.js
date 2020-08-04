import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import CardColumns from 'react-bootstrap/CardColumns';
import News from '../../../components/News/News';

const cookies = new Cookies();

const NewsFeed = (props) => {
    const [articles, setArticles] = useState( [] );
    const [newsFeed, setNewsFeed] = useState();
    const [error, setError] = useState( true );
    const [errorMessage, setErrorMessage] = useState();

    useEffect( () => {
        const category = props.match.params.category;
        const apiKey = cookies.get('apiKey');
        
        // Offline strategy.
        if ( !navigator.onLine && localStorage.getItem(category) !== null ) {
            setError( false );
            setArticles( JSON.parse( localStorage.getItem(category) ) );
        } else if( !apiKey ) {
            setError( true );
            setErrorMessage( <p>Register at <a href="https://newsapi.org/register">newsapi.org</a> to get an API key!</p> );
        } else {
            axios.get( `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}` )
            .then( response => {
                setError( false );
                const articles = response.data.articles;
                setArticles( articles );
                localStorage.setItem( category, JSON.stringify( articles ) );
            } )
            .catch( error => {
                setError( true );
                console.log(error);
                setErrorMessage( error.message );
            } );
        }
    }, [ props.match.params.category ] );

    useEffect( () => {
        let newsFeed = <p style={{ textAlign: 'center' }}>{errorMessage}</p>; 
        if ( !error ) {
            newsFeed = articles.map( article => {
                return (
                    <News
                        key={article.title}
                        image={article.urlToImage}
                        title={article.title}
                        description={article.description}
                        source={article.source.name}
                        url={article.url} />
                );
            } );
        }
        setNewsFeed( newsFeed );
    }, [ articles, error, errorMessage ] );

    return (
        <CardColumns>
            {newsFeed}
        </CardColumns>
    );
};

export default NewsFeed;