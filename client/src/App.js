import React, { useState } from 'react';
import { 
  Container,
} from 'reactstrap';
import { Route, Routes } from 'react-router-dom';
import Signup from "./components/signup/index";
import Home from "./components/home/index";
import Navbar from "./components/navbar/index";
import Login from "./components/login/index";
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

const App = () => { 

  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  // useMutation() is the primary API for executing queries in an Apollo application

  // useCallback() returns a memoized callback. Memoization is an optimization technique used primarily to speed up computer programs by storing the results for expensive function calls and returning the cached result when the same inputs occur again.
  // useCallback() also returns the same function instance between renderings(aka memoization)
  // as long as addTweet, tweetTitle and tweetBody variable values are the same, useCallback() does not submit the form. If one or more of the values change then the form is submitted

    const handleIsLoggedIn = (loggedIn) => { 
      setIsLoggedIn(loggedIn);
    }

    return (
      <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Container>
        <Routes>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/login" element={<Login/>} client={apolloClient} handleLogin={handleIsLoggedIn}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Container>
      </>
    )
}

export default App;