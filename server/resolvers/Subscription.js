/*
Subscripts are long-lasting GraphQL read operations that can update their result whenever a particular server-side event occurs. Most commonly, updated results 
are pushed from the server to subscribing clients. For example, a chat application's server might use a subscription to push newly received messages to 
all clients in a particular chat room 

*/
const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info){
            const post = db.posts.find((post) => {
                    post.id === postId && post.published
                });
            
                if(!post){
                    throw new Error("Post not found!");
                }

                return pubsub.asyncIterator(`comment ${postId}`);
        },
    },
    post: {
        subscribe(parent, args, { pubsub }, info){
            return pubsub.asyncIterator('post');
        },
    },
};

export { Subscription as default };