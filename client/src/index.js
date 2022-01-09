import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import redux from "./redux/store";
import App from './App';
import { HttpLink } from '@apollo/client';
import { GRAPHQL_HTTP_SERVER_URL, GRAPHQL_WS_SERVER_URL } from './environment';

// Creating a HTTP link 
const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_SERVER_URL
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_SERVER_URL, 
  options: { reconnect: true },
});

ReactDOM.render(
  <Provider store={redux.store}>
    <PersistGate loading={null} persistor={redux.persistor}>
      <App />  
    </PersistGate>
  </Provider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

