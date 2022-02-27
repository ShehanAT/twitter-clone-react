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