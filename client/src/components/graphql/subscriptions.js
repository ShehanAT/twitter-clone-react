import { gql } from '@apollo/client';

const TWEETS_SUBSCRIPTION = gql`
    subscription {
        tweet {
            mutation 
            data {
                title 
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

export { TWEETS_SUBSCRIPTION, USER_SUBSCRIPTION };