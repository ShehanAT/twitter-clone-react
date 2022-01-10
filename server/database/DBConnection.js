import { mongoose } from 'mongoose';

var userSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    firstName: String,
    lastName: String,
    email: String, 
    age: Number,
    tweets: [tweetSchema],
    comments: [commentSchema]
}, { timestamps: true });

var tweetSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    title: String,
    body: String,
    published: Boolean,
    author: userSchema,
    comments: [commentSchema]
});

var commentSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    text: String,
    author: userSchema,
    tweet: tweetSchema
});

var User = mongoose.model('User', userSchema);
var Tweet = mongoose.model('Tweet', tweetSchema);
var Comment = mongoose.model('Comment', commentSchema);

export { User, Tweet, Comment as default };