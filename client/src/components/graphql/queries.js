import { gql } from "@apollo/client";

export const TWEETS_QUERY = gql`
    query {
        posts {
            title 
            body 
            author {
                name 
            }
            published 
        }
    }
`