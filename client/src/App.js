import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import Signup from "./components/signup/index";
import Home from "./components/home/index";
import Explore from "./components/explore/index";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import BookMarks from "./components/bookmarks/index";
import Notifications from './components/notifications';
import Messages from './components/messages';
import Lists from './components/lists';
import Profile from './components/profile';
import { SERVER_URL } from './environment';


const App = () => { 


  const username = sessionStorage.getItem("loggedInUserFirstName");

  return (
    <>
       <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route exact path="/explore" element={<Explore/>}/>
        <Route exact path="/bookmarks" element={<BookMarks/>} />
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