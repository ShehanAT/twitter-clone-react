import { gql } from '@apollo/client';

export const TWEETS_SUBSCRIPTION = gql`
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