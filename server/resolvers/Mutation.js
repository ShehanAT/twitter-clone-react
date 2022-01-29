import { User, Tweet } from '../database/models.js';
// import { GraphQLServerError  } from 'graphql-yoga';
import pkg from 'graphql-yoga';

const { GraphQLServerError  } = pkg;

const Mutation = {
    async createUser(parent, args, { db }, info){
        try {
            console.log(args.data);
            const existingUser = await User.findOne({ email: args.data.email })
            if(existingUser){
                throw new Error("That email address is already taken!");
            }
            // const hashedPassword = await bcrypt.hash(args.data.password, 12);

            const user = new User({
                firstName: args.data.firstName,
                lastName: args.data.lastName,
                email: args.data.email,
                password: args.data.password,
                age: args.data.age,
            });
            
            const result = await user.save();
            
            return { ...result._doc, password: null, _id: result.id }
        }catch(err){
            throw new GraphQLServerError("Ran into GraphQL Server error!");
        }
    },
    deleteUser(parent, args, { db }, info){
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if(userIndex === -1){
            throw new Error("User not found!")
        }

        // using splice() to delete found user. splice() changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
        const deletedUsers = db.users.splice(userIndex, 1);

        db.tweets = db.tweets.filter((tweet) => {
            const match = tweet.author === args.id;

            if(match){
                // comment.tweet == comment.tweet.id == tweet.id 
                db.comments = db.comments.filter((comment) => comment.tweet !== tweet.id);
            }
            // Only return tweets not made by specified user
            return !match;
        });

        db.comments = db.comments.filter((comment) => {
            // comment.author == comment.author.id == args.id
            comment.author !== args.id;
        })

        // return the deleted user
        return deletedUsers[0];
    },
    updateUser(parent, args, { db }, info){
        const { id, data } = args;
        const user = db.users.find((user) => user.id === id);

        if(!user){
            throw new Error("User not found!");
        }

        if(typeof data.email === 'string'){
            // check if the newly provided email is unique in the database
            const emailTaken = db.users.some((user) => user.email === data.email)

            if(emailTaken){
                throw new Error("Email already taken!");
            }

            user.email = data.email;
        }

        if(typeof data.name === 'string'){
            user.name = data.name;
        }

        if(typeof data.age !== 'undefined'){
            user.age = data.age;
        }

        return user;
    },
    async createTweet(parent, args, { db, pubsub }, info){
        if(args.data.author){
            const foundUser = await User.findById(args.data.author);

            if(!foundUser){
                throw new Error("Posting user not found!");
            }
            
            const newTweet = new Tweet({
                body: args.data.body,
                published: args.data.published,
                author: foundUser,
                comments: []
            });
            
            if(args.data.published){

                // if published == True then use mongoose to save the tweet to MongoDB
                
                const newTweetResult = await newTweet.save();
                
                const allTweets = await Tweet.find();
                
                // PubSub is a class that exposes a simple Publish and subscribe API. It sits between your application's logic and the GraphQL subscription engine - it 
                // receives a publish command from your app logic and pushes it to your GraphQL execution engine
                pubsub.publish('getAllTweets', {
                    getAllTweets: {
                        mutation: 'CREATED',
                        data: allTweets,
                    },
                });

                return { ...newTweetResult._doc }
                // return { newTweet }
            }else{
                throw new Error("Set Tweet.published to 'true' in order to publish the tweet!")
            }
        }else {
            throw new Error("Posting user not provided!");
        }

    

   
    },
    deleteTweet(parent, args, { db, pubsub }, info){
        // args is a Tweet instance, in this case
        const tweetIndex = db.tweets.findIndex((tweet) => tweet.id === args.id);

        if(tweetIndex === -1){
            throw new Error("Tweet not found");
        }

        // fetching the tweet to be deleted from the db.tweets array using splice() and assigning it to the `tweet` variable 
        const [tweet] = db.tweets.splice(tweetIndex, 1);

        db.comments = db.comments.filter((comment) => comment.tweet !== args.id);

        if(tweet.published){
            pubsub.publish('tweet', {
                tweet: {
                    mutation: 'DELETED',
                    data: tweet,
                },
            });
        }

        return tweet;
    },
    updateTweet(parent, args, { db }, info){
        const { id, data } = args;
        const foundTweet = db.tweets.find((tweet) => { tweet.id === id });
        const originalTweet = { ...foundTweet }
        
        if(!foundTweet){
            throw new Error("tweet not found!");
        }

        if(typeof data.body === "string"){
            foundTweet.body = data.body;
        }

        if(typeof data.published === "boolean"){
            foundTweet.published = data.published;

            if(originalTweet.published && !foundTweet.published){
                // delete original tweet and replace it with new tweet 
                pubsub.publish("publish", {
                    tweet: {
                        mutation: "DELETED",
                        data: originalTweet
                    }
                });

                pubsub.publish("publish", {
                    tweet: {
                        mutation: "CREATED",
                        data: foundTweet
                    }
                });
            }else if(!originalTweet.published && foundTweet.published){
                pubsub.publish("publish", {
                    tweet: {
                        mutation: "CREATED",
                        data: foundTweet
                    }
                })
            }
        }else if(foundTweet.published){
            pubsub.publish("publish", {
                tweet: {
                    mutation: "UPDATED",
                    data: foundTweet
                }
            })
        }

        if(typeof data.author !== "undefined"){
            foundTweet.author = data.author;
        }

        return foundTweet;
    },
}

export { Mutation as default };