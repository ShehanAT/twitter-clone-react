import { User } from '../database/models.js';
import bcrypt from 'bcryptjs';
import { UserInputError, ApolloError } from 'apollo-server';

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
    async login(parent, args, { db }, info){
        if(!args.query.email){
            throw new Error("Login credentials cannot be empty!");
            // throw new UserInputError("Login credentials cannot be empty!");
        }
        const dbUser = await User.find({ email: args.query.email });
        let foundUser = null;
        if(dbUser.length == 0){
            throw new Error(`User with email: ${args.query.email} not found in database!`);
            // return `User with email: ${args.query.email} not found in database!`;
        }else{
            foundUser = dbUser[0];
        }

        const passwordSalt = foundUser.passwordSalt;
        const inputtedPassword = args.query.password;
      
        bcrypt.hash(inputtedPassword, passwordSalt, function(err, hash){
            if(err){
                return next(err);
            }

            if(hash == foundUser.password){
                next();
            }else{
                throw new Error("Invalid Password! Please try again...");
                // return next(Error("Invalid Password! Please try again..."));
            }
        });

    },
    comments(parent, args, { db }, info){
        
    }
}

export { Query as default };