import { gql } from '@apollo/client';

const TWEETS_SUBSCRIPTION = gql`
    subscription {
        tweet {
            mutation 
            data {
                body 
                author {
                    firstName 
                    lastName 
                }
                published 
            }
        }
    }

`

const USER_SUBSCRIPTION = gql`
    subscription {
        user {
            mutation 
            userData {
                firstName 
                lastName 
                email 
                age 
                password 
            }
        }
    }

`

const GET_ALL_TWEETS_SUBSCRIPTION = gql`
    subscription {
        getAllTweets {
            mutation
            data { 
                body 
                author {
                    firstName 
                    lastName 
                    email 

                }
                published 
            }
        }
    }

`

export { TWEETS_SUBSCRIPTION, USER_SUBSCRIPTION, GET_ALL_TWEETS_SUBSCRIPTION };