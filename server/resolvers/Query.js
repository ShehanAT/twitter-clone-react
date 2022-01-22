import { Tweet, User } from '../database/models.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';


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
    async tweets(parent, args, { db }, info){
        const dbTweets = await Tweet.find();
        return dbTweets;
    },
    async usersAndTweets(parent, args, { db }, info){
        if(!args.query){
            const dbUsers = await User.find();
            const dbTweets = await Tweet.find();
            return {users: dbUsers, tweets: dbTweets}
        }
    },
    async login(parent, args, { db }, info){
        if(!args.query.email){
            throw new Error("Login credentials cannot be empty!");
        }
        const dbUser = await User.find({ email: args.query.email });
        let foundUser = null;
        if(dbUser.length == 0){
            throw new Error(`User with email: ${args.query.email} not found in database!`);
        }else{
            foundUser = dbUser[0];
        }
        const inputtedPassword = args.query.password;
        const currentPassword = foundUser.password;

        const loginResult = await bcrypt.compare(inputtedPassword, currentPassword);
        if(loginResult){
            const jwtToken = jwt.sign({
                userId: foundUser.id,
                email: args.query.email, 
                password: currentPassword
                }, "secret");
            return { userId: foundUser._id, userFirstName: foundUser.firstName, token: jwtToken, tokenExpiration: 1 };
        }else{
            throw new Error("Invalid Password! Please try again...");
        }
    },
    comments(parent, args, { db }, info){
        
    }
}

export { Query as default };