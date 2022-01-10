

const Query = {
    users(parents, args, { db }, info) {
        if(!args.query){
            return db.users;
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    tweets(parent, args, { db }, info){
        if(!args.query){
            return db.tweets;
        }

        return db.tweets.filter((tweet) => {
            const isTitleMatch = tweet.title.toLowerCase().includes(args.query.toLowerCase());
            const isBodyMatch = tweet.body.toLowerCase().includes(args.query.toLowerCase());
            
            return isTitleMatch || isBodyMatch;
        });
    },
    comments(parent, args, { db }, info){
        
    }
}

export { Query as default };