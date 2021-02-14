import React from 'react'
import User from './User';

export default function ResultsList({ results }) {
    console.log("Results Array:", results);
    return (
        results.map(result => {    
            return <User key={result.id} result={result}/>
        })
    )
}
