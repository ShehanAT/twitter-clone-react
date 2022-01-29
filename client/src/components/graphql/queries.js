import { gql } from "@apollo/client";

const TWEETS_QUERY = gql`
    query {
        tweets {
            body 
            author {
                firstName 
                lastName  
            }
            published 
        }
    }
`;

const USERS_QUERY = gql`
    query {
        users {
            firstName 
            lastName 
          
        }
    }

`;

const USERS_AND_TWEETS_QUERY = gql`
    query {
        usersAndTweets {
            users {
                firstName
                lastName
                email
                age
            }
            tweets{
                body 
                author {
                    firstName 
                    lastName  
                }
                published 
            }
        }
    }
`;

const USER_LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
        login(
            query: {
                email: $email 
                password: $password 
            }
        ) {
            userId 
            userFirstName
            token 
            tokenExpiration
        }
    }

`;

export { TWEETS_QUERY, USERS_QUERY, USERS_AND_TWEETS_QUERY, USER_LOGIN_QUERY };