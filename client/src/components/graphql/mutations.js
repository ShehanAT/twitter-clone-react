import { gql } from "@apollo/client";

export const CREATE_TWEETS_MUTATION = gql`
    mutation createTweet(
        $title: String!
        $body: String!
        $published: Boolean! 
        $authorId: ID!
    ){
        createTweet(
            data: {
                title: $title
                body: $body
                published: $published
                author: $authorId
            }
        ) {
            title 
            body 
            author {
                name 
            }
            published 
        }
        
    }
`;