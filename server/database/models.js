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
            title: String,
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

    // tryLogin: {
    //     validator: () => {
    //         bcrypt.hash(inputtedPassword, passwordSalt, function(err, hash){
    //             if(err){
    //                 return next(err);
    //             }
    
    //             if(hash == foundUser.password){
    //                 next();
    //             }else{
    //                 throw new Error("Invalid Password! Please try again...");
    //                 // return next(Error("Invalid Password! Please try again..."));
    //             }
    //         });
    //     }
    // }
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

userSchema.methods.comparePassword = async function(inputtedPassword, currentPassword, callback){
    bcrypt.hash(inputtedPassword, this.passwordSalt, function(err, hash){
        if(err){
            return callback(err);
        }
        const inputtedHash = hash;
        bcrypt.compare(inputtedPassword, currentPassword, function(error, isMatch){
            if(error) return callback(err);
            return callback(null, isMatch);
        });
        // if(hash == this.password){
        //     callback();
        // }else{
        //     return callback(new Error("Invalid Password! Please try again..."));
        // }
    });
};

// mongoose schemas allows for pre-packaged plugins to extend their functionalities
// mongoose-paginate is used to paginate the response received from any data source 
userSchema.plugin(mongoosePaginate)

var Tweet = mongoose.model('Tweet', tweetSchema);

var User = mongoose.model('User', userSchema);

var Comment = mongoose.model('Comment', commentSchema);

export { User, Tweet, Comment as default };