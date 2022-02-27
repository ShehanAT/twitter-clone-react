import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import Tweet from "./resolvers/Tweet.js";
import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from "mongoose";
import path from "path";
import { MONGODB_CONNECTION_URI } from "./config/environment.js";
import { GraphQLScalarType, Kind } from "graphql";
const __dirname = path.resolve();

const pubsub = new PubSub();

const bigIntScalar = new GraphQLScalarType({
    name: "BigInt",
    description: "Big Integer type of representing integers larger than 32-bits",
    serialize(value){
        return value;
    },
    parseValue(value){
        return new BigInt(value)
    },
    parseLiteral(ast){
        if(ast.kind === Kind.INT){
            return new BigInt(parseInt(ast.value, 10));
        }
        return null;
    }
});

const server = new GraphQLServer({ 
    typeDefs: `${__dirname}/Schemas/schema.graphql`,
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Tweet,
        BigInt: bigIntScalar
    },
    context: {
        pubsub 
    },
});

mongoose.connect(MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', () => {
    console.log("MongoDB Connection Error. Please make sure that MongoDB is running.");
    process.exit(1);
});
mongoose.set('debug', true);

server.start({ port: process.env.PORT | 8081}, () => {
    console.log(`The server is running on port ${process.env.PORT | 8081}`);
});


