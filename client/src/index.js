import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import { GRAPHQL_HTTP_SERVER_URL, GRAPHQL_WS_SERVER_URL } from './environment';

// Creating a HTTP link 
const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_SERVER_URL
});

// Create a WebSocket link 
const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_SERVER_URL, 
  options: { reconnect: true },
});

// We are sending data to each link, using the ability to split links
// Data to be sent to each link will depend on what kind of operation is being sent 
const link = split(
  // split based on operation type 
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && 
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link, 
  cache: new InMemoryCache().restore({}),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

