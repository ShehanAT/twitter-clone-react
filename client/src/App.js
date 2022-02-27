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
     
    </>
  )
}

export default App;