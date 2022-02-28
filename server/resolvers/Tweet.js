import { User } from '../database/models.js';

const Tweet = {
    async author(parent, args, { db }, info){
        console.log(parent);
        const user = await User.findById(parent.author);
        return user;
    }
}

export { Tweet as default };