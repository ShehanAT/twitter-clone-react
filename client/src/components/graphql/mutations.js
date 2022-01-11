import { gql } from "@apollo/client";

const CREATE_TWEETS_MUTATION = gql`
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
                firstName 
                lastName  
            }
            published 
        }
        
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $firstName: String! 
        $lastName: String!
        $email: String! 
        $age: String!
        $password: String! 
    ){
        createUser(
            data: {
                firstName: $firstName 
                lastName: $lastName 
                email: $email 
                age: $age 
                password: $password 
            }
        ) {
           firstName 
           lastName 
           email 
           age 
           password 
        }
        
    }
`;

export { CREATE_TWEETS_MUTATION, CREATE_USER_MUTATION };