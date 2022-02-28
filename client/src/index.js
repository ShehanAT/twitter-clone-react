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


const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_SERVER_URL
})

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_SERVER_URL,
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' && 
      definition.operation === 'subscription'
    )
  }
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({}),
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={redux.store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={redux.persistor}>
          <App/>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  
  </BrowserRouter>
)

