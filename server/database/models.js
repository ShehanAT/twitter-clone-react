import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate";




var userSchema = new mongoose.Schema({});
var tweetSchema = new mongoose.Schema({});

var userSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    firstName: String,
    lastName: String,
    email: String, 
    age: Number,
    tweets: [
        new mongoose.Schema({
            id: mongoose.ObjectId,
            title: String,
            body: String,
            published: Boolean,
            author: userSchema,
            comments: [
                new mongoose.Schema({
                    id: mongoose.ObjectId,
                    text: String,
                    author: userSchema,
                    tweet: tweetSchema
                })
            ]
        })
    ],
    comments: [
        new mongoose.Schema({
            id: mongoose.ObjectId,
            text: String,
            author: userSchema,
            tweet: tweetSchema
        })
    ],

    password: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date, 

}, { timestamps: true });

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
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
// mongoose schemas allows for pre-packaged plugins to extend their functionalities
// mongoose-paginate is used to paginate the response received from any data source 
userSchema.plugin(mongoosePaginate)

var commentSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    text: String,
    author: userSchema,
    tweet: tweetSchema
});

var tweetSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    title: String,
    body: String,
    published: Boolean,
    author: userSchema,
    comments: [commentSchema]
});

var Tweet = mongoose.model('Tweet', tweetSchema);


var User = mongoose.model('User', userSchema);

var Comment = mongoose.model('Comment', commentSchema);

export { User, Tweet, Comment as default };