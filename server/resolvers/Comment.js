const Comment = {
    author(parent, args, { db }, info){
        return db.users.find((user) => {
            return user.id === parent.author;
        });
    },
    tweet(parent, args, { db }, info) {
        return db.tweets.find((tweet) => {
            return tweet.id === parent.tweet;
        });
    },
};

export { Comment as default };