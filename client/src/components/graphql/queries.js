import { gql } from "@apollo/client";

export const TWEETS_QUERY = gql`
    query {
        tweets {
            title 
            body 
            author {
                firstName 
                lastName  
            }
            published 
        }
    }
`