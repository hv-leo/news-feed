import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Category from '../../components/Category/Category';
import NewsFeed from './NewsFeed/NewsFeed';

const categoriesList = [ 
    { id: "business", name:"Business" },
    { id: "entertainment", name:"Entertainment" },
    { id: "general", name:"General" },
    { id: "health", name:"Health" },
    { id: "science", name:"Science" },
    { id: "sports", name:"Sports" },
    { id: "technology", name:"Technology" }
];

let categories = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
categories = categoriesList.map( category => {
    const link = `/${category.id}`;
    return (
        <Category key={category.name} name={category.name} link={link} />
    );
} );

const cookies = new Cookies();
const apiKey = cookies.get('apiKey');

const NewsSite = (props) => (
    <Container>
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/news-feed/">NewsFeed</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {categories}
                </Nav>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="apiKey-addon">
                        API Key
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="API Key..."
                        aria-label="API Key..."
                        aria-describedby="apiKey-addon"
                        defaultValue={apiKey}
                        onChange={e => cookies.set('apiKey', e.target.value)} />
                </InputGroup>
            </Navbar.Collapse>
        </Navbar>
        <Route path={"/:category"} component={NewsFeed}/>
    </Container>
);

export default NewsSite;