import React, { useState } from 'react';
import { 
  Container,
} from 'reactstrap';
import { Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Signup from "./components/signup/index";
import Home from "./components/home/index";
import Navbar from "./components/navbar/index";
import Login from "./components/login/index";
import Explore from "./components/explore/index";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import MenuBar from "./components/menubar/index";
import SideBar from "./components/sidebar/index";
import BookMarks from "./components/bookmarks/index";
import Notifications from './components/notifications';
import Messages from './components/messages';
import Lists from './components/lists';
import Profile from './components/profile';
import { ProfileCorner, Header } from "./components/styles/common";
import classes from "./App.css";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

const App = () => { 

  const [ isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useSelector((state) => state.theme);

  const username = sessionStorage.getItem("loggedInUserFirstName");

  const withMenuBar = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={7} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={9} md={19} xs={19}>
          <WrappedComponent />
        </Col>
        <Col lg={8} md={0} xs={0}>
          <SideBar />
        </Col>
      </Row>
    </React.Fragment>
    );

    return (
      <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Container>
            <Container>
              <Row>
                <Header border={theme.border} bg={theme.bg} color={theme.color}>
                  <h1 className={classes.centerTitle}>Twitter Clone Application</h1>
                </Header>
              </Row>
              <Row>
                <h3 className={classes.centerTitle}>What's on your mind?</h3>
              </Row> 
            </Container>
        <Routes>
          <Route exact path="/signup" component={<Signup/>}></Route>
          <Route exact path="/login" element={<Login/>} client={apolloClient}></Route>
          <Route exact path="/explore" element={<Explore/>}/>
          <Route exact path="/bookmarks" element={<BookMarks/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/notifications" element={<Notifications/>} />
          <Route exact path="/messages" element={<Messages/>} />
          <Route exact path="/lists" element={<Lists/>} />
          <Route exact path="/profile/:username" element={<Profile username={username}/>} />
          <Route path="/" element={<Home/>}></Route>

        </Routes>
      </Container>
      </>
    )
}

export default App;