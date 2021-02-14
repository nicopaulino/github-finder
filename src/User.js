import React from 'react'
import Card from '@material-ui/core/Card';
import './User.css';

export default function User({ result }) {
    // console.log("Result Object:", result);
    return (
        <Card className="resultsCard">
            <img src={result.avatar} width="90" height="90"/>
            <a href={result.url} target="_blank" rel="noreferrer noopener">{result.name}</a>
            <div>{result.bio}</div>
            <div>Followers: {result.followers}</div>
            <div>Following: {result.following}</div>
        </Card>
    )
}
