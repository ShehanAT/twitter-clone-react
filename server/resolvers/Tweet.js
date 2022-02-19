import { User } from '../database/models.js';

const Tweet = {
    async author(parent, args, { db }, info){
        console.log(parent);
        const user = await User.findById(parent.author);
        return user;
        // return db.users.find((user) => {
        //     return user.id === parent.author;
        // });
    },
    comments(parents, args, { db }, info){
        return db.comments.filter((comment) => {
            return comment.post === parent.id;
        });
    }
}

export { Tweet as default };