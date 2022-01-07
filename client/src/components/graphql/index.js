import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetUsers from "../graphql-components/GetUsers";

const GraphQL = () => {

    const errorLink = onError(({ graphqlErrors, networkError }) => {
        if(graphqlErrors){
            graphqlErrors.map(({ message, location, path}) => {
                alert(`Graphql error message: ${message}`)
            }); 
        }
    });
    
    const link = from([
        errorLink,
        new HttpLink({ uri: "http://localhost:8080/graphql" }),
    ]);
    
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
    });

    return (
        <ApolloProvider client={client}>
            {" "}
            <GetUsers />
        </ApolloProvider>
    );
}

export default GraphQL;
