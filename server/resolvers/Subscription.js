/*
Subscriptions are long-lasting GraphQL read operations that can update their result whenever a particular server-side event occurs. Most commonly, updated results 
are pushed from the server to subscribing clients. For example, a chat application's server might use a subscription to push newly received messages to 
all clients in a particular chat room 

*/

const Subscription = {
    getAllTweets: {
        async subscribe(parent, args, { pubsub }, info){
            return pubsub.asyncIterator('getAllTweets');
        },
    },
    user: {
        subscription(parent, args, { pubsub }, info){
            return pubsub.asyncIterator('user');
        }
    }
};

export { Subscription as default };