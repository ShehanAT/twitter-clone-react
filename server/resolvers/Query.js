import { User } from '../database/models.js';

const Query = {
    users(parents, args, { db }, info) {
        if(!args.query){
            return db.users;
        }

        return db.users.filter((user) => {
            console.log(user.name);
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    tweets(parent, args, { db }, info){
        if(!args.query){
            return db.tweets;
        }

        return db.tweets.filter((tweet) => {
            console.log(tweet);
            const isTitleMatch = tweet.title.toLowerCase().includes(args.query.toLowerCase());
            const isBodyMatch = tweet.body.toLowerCase().includes(args.query.toLowerCase());
            
            return isTitleMatch || isBodyMatch;
        });
    },
    async usersAndTweets(parent, args, { db }, info){
        if(!args.query){
            // const userFilter = {};
            const dbUsers = await User.find();
            return {users: dbUsers, tweets: db.tweets}
        }
    },
    comments(parent, args, { db }, info){
        
    }
}

export { Query as default };