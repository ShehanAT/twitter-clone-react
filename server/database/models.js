import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate";
import bcrypt from 'bcryptjs';

var userSchema = new mongoose.Schema();
var tweetSchema = new mongoose.Schema();
var commentSchema = new mongoose.Schema();

userSchema.add({
    id: mongoose.ObjectId,
    firstName: String,
    lastName: String,
    email: String, 
    age: Number,
    tweets: [
        tweetSchema.add(new mongoose.Schema({
            id: mongoose.ObjectId,
            body: String,
            published: Boolean,
            author: userSchema,
            comments: [
                commentSchema.add(new mongoose.Schema({
                    id: mongoose.ObjectId,
                    text: String,
                    author: userSchema,
                    tweet: tweetSchema
                }))
            ]
        }))
    ],
    comments: [
        commentSchema
    ],

    password: String,
    passwordSalt: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date, 
});


// Password hash middleware
userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            user.passwordSalt = salt;
            next();
        });
    });
});

// mongoose schemas allows for pre-packaged plugins to extend their functionalities
// mongoose-paginate is used to paginate the response received from any data source 
userSchema.plugin(mongoosePaginate)

var Tweet = mongoose.model('Tweet', tweetSchema);

var User = mongoose.model('User', userSchema);

var Comment = mongoose.model('Comment', commentSchema);

export { User, Tweet, Comment as default };