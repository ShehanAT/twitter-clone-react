import React, { useState } from 'react';
import { 
  Container,
} from 'reactstrap';
import { Route, Routes } from 'react-router-dom';
import Signup from "./components/signup/index";
import Home from "./components/home/index";
import Navbar from "./components/navbar/index";
import Login from "./components/login/index";
import Explore from "./components/explore/index";
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

const App = () => { 

  const [ isLoggedIn, setIsLoggedIn] = useState(false);

    return (
      <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Container>
        <Routes>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/login" element={<Login/>} client={apolloClient}></Route>
          <Route exact path="/explore" element={<Explore/>}/>
          <Route path="/" element={<Home/>}></Route>

        </Routes>
      </Container>
      </>
    )
}

export default App;