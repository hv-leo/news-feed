import React from 'react';
import Card from 'react-bootstrap/Card';

const News = (props) => {
    const image = `${props.image}` !== null ? 
        <Card.Img variant="top" src={props.image} alt="Image Unavailable" /> 
        : null;
    return (
        <Card>
            {image}
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                <Card.Link>{props.source}</Card.Link>
                <Card.Link href={props.url} className="float-right">Read more...</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default News;