import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, { db }, info){
        const emailTaken = db.users.some((user) => user.email === args.data.email);

        if(emailTaken){
            throw new Error("Email taken");
        }

        const user = {
            id: uuidv4(), // creates a universally unique identifier(UUID) which is a 128-bit number 
            ...args.data,
        }

        // save new user in database 
        db.users.push(user);

        return user;

    },
    deleteUser(parent, args, { db }, info){
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if(userIndex === -1){
            throw new Error("User not found!")
        }

        // using splice() to delete found user. splice() changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
        const deletedUsers = db.users.splice(userIndex, 1);

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id;

            if(match){
                // comment.post == comment.post.id == post.id 
                db.comments = db.comments.filter((comment) => comment.post !== post.id);
            }
            // Only return posts not made by specified user
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
        const user = db.users.find((ser) => user.id === id);

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
    createPost(parent, args, { db, pubsub }, info){
        const userExists = db.users.some((user) => user.id === args.data.author);

        if(!userExists){
            throw new Error("User not found!");
        }

        const post = {
            id: uuidv4(),
            ...args.data 
        }

        if(args.data.published){
            // if published == True then use pubsub to publish post 

            // PubSub is a class that exposes a simple Publish and subscribe API. It sits between your application's logic and the GraphQL subscription engine - it 
            // receives a publish command from your app logic and pushes it to your GraphQL execution engine
            pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post,
                },
            });
        }

        return post;
    },
    deletePost(parent, args, { db, pubsub }, info){
        // args is a Post instance, in this case
        const postIndex = db.posts.findIndex((post) => post.id === args.id);

        if(postIndex === -1){
            throw new Error("Post not found");
        }

        // removing the post to be deleted from the db.posts array using splice()
        const [post] = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter((comment) => comment.post !== args.id);

        if(post.published){
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: post,
                },
            });
        }

        return post;
    }
}