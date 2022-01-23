import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ApolloClient, // Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all the while automatically updating your UI 
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import { PersistGate } from 'redux-persist/integration/react';
import redux from "./redux/store";
import { WebSocketLink } from 'apollo-link-ws';
import { GRAPHQL_HTTP_SERVER_URL, GRAPHQL_WS_SERVER_URL } from './environment';

global.matchMedia = global.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  }
}

test('renders learn react link', () => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_HTTP_SERVER_URL
  });

  const wsLink = new WebSocketLink({
    uri: GRAPHQL_WS_SERVER_URL, 
    options: { reconnect: true },
  });

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
  render(
  <BrowserRouter>
    <Provider store={redux.store}>
     <ApolloProvider client={client}>
       <PersistGate loading={null} persistor={redux.persistor}>
         <App/>
       </PersistGate>
     </ApolloProvider>
   </Provider>
   </BrowserRouter>);
  const linkElement = screen.getByText(/Join twitter today./i);
  expect(linkElement).toBeInTheDocument();
});
