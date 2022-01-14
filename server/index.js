import db from "./database/db.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Tweet from "./resolvers/Tweet.js";
import Comment from "./resolvers/Comment.js";
import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from "mongoose";
import path from "path";
import { MONGODB_CONNECTION_URI } from "./config/environment.js";
import { GraphQLScalarType, Kind } from "graphql";
const __dirname = path.resolve();

const pubsub = new PubSub();

const bigIntScalar = new GraphQLScalarType({
    name: "BigInt",
    description: "Big Integer type for represents integers larger than 32-bits",
    serialize(value){
        return value; // Convert outgoing BigInt to integer for JSON 
    },
    parseValue(value){
        return new BigInt(value) // Convert incoming integer to BigInt
    },
    parseLiteral(ast){
        if(ast.kind === Kind.INT){
            return new BigInt(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to BigInt 
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});

const server = new GraphQLServer({
typeDefs: `${__dirname}/server/Schemas/schema.graphql`,
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User, 
        Tweet,
        Comment,
        BigInt: bigIntScalar
    },
    context: {
        db,
        pubsub 
    },
});


mongoose.connect(MONGODB_CONNECTION_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.connection.on('error', () => {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});
mongoose.set('debug', true);

server.start({ port: process.env.PORT | 8080}, () => {
    console.log(`The server is running on port ${process.env.PORT | 8080}`);
});