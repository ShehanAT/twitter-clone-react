import db from "./database/db.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Tweet from "./resolvers/Tweet.js";
import Comment from "./resolvers/Comment.js";
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { User as MongooseUser } from "./database/models.js";

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './Schemas/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User, 
        Tweet,
        Comment 
    },
    context: {
        db,
        pubsub 
    },
});

server.start({ port: process.env.PORT | 8080}, () => {
    console.log(`The server is running on port ${process.env.PORT | 8080}`);
});