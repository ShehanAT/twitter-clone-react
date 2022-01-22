import React, { useState } from 'react';
import { 
  Container,
} from 'reactstrap';
import { Row } from "antd";
import { useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Signup from "./components/signup/index";
import Home from "./components/home/index";
import Login from "./components/login/index";
import Explore from "./components/explore/index";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import BookMarks from "./components/bookmarks/index";
import Notifications from './components/notifications';
import Messages from './components/messages';
import Lists from './components/lists';
import Profile from './components/profile';
import { Header } from "./components/styles/common";
import classes from "./App.css";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

const App = () => { 

  const [ isLoggedIn ] = useState(false);

  const theme = useSelector((state) => state.theme);

  const username = sessionStorage.getItem("loggedInUserFirstName");

  return (
    <>
          {/* <Container>
            <Row>
              <Header border={theme.border} bg={theme.bg} color={theme.color}>
                <h1 className={classes.centerTitle}>Twitter Clone Application</h1>
              </Header>
            </Row>
            <Row>
              <h3 className={classes.centerTitle}>What's on your mind?</h3>
            </Row> 
          </Container> */}
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>} client={apolloClient}></Route>
        <Route exact path="/explore" element={<Explore/>}/>
        <Route exact path="/bookmarks" element={<BookMarks/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/notifications" element={<Notifications/>} />
        <Route exact path="/messages" element={<Messages/>} />
        <Route exact path="/lists" element={<Lists/>} />
        <Route exact path="/profile/:username" element={<Profile username={username}/>} />
        <Route exact path="/" element={<Signup/>}></Route>

      </Routes>
    </>
  )
}

export default App;