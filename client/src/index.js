import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient, // Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all the while automatically updating your UI 
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { GRAPHQL_HTTP_SERVER_URL, GRAPHQL_WS_SERVER_URL } from './environment';
import redux from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
