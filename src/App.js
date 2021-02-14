import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ResultsList from './ResultsList';
import Button from '@material-ui/core/Button';


function App(){

  const userNameRef = useRef();
  let name = '';
  // const user = {
  //   id: null,
  //   name: null,
  //   bio: null,
  //   avatar: null,
  //   url: null,
  //   followers: null,
  //   following: null,
  //   stars: null
  // };

  const usersList = [];

  const options = {
    headers: {
      'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };

  const [resultsCount, setResultsCount] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
   console.log("refreshing")
  }, []);

  const getResults = () => {

    name = userNameRef.current.value;

    axios.get(`https://api.github.com/search/users?q=${name}+in:user&per_page=50`, {
      headers: options.headers,
      q: 'q'
    }).then(response => {

      setResultsCount(response.data.total_count);
      // setResults(response.data.items);

      response.data.items.forEach(result => {

        let username = result.login;
        let user;


        axios.get(`https://api.github.com/users/${username}`, {
          headers: options.headers,
          q: 'q'
          }).then(response => {
          let userResult = response.data;


          user = {
            id: result.id,
            name: username,
            bio: userResult.bio,
            avatar: result.avatar_url,
            url: result.html_url,
            followers: userResult.followers,
            following: userResult.following,
            stars: null
          };

          usersList.push(user);
          
        }).catch(error => {
          console.log(error);
        })
        
      })
      setResults(usersList);
      setIsLoading(!isLoading);

    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <>
    <header className="header">
    <h1>Github User Finder</h1>
    <input ref={userNameRef} type="text" placeholder="Enter a Github Username"/>
    <Button onClick={getResults} >Submit</Button>
    {resultsCount === 0 ? <div className="resultsCount">Search for user!</div> : resultsCount === 1 ? <div className="resultsCount">I found {resultsCount} result!</div> : <div className="resultsCount">I found {resultsCount} results!</div>}
    </header>
    {results.length === 0 ? <ResultsList results={results} /> : null}
    <ResultsList results={results} />
    </>
  );
};

export default App;