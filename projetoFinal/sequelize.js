var dotenv = require('dotenv');
dotenv.config();
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_SCHEMA , process.env.DB_USERS, process.env.DB_PASS, {
    dialect: 'mysql',
    dialectOptions:{
        ssl:{
            require:true
        },
    host:process.env.DB_HOST,
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle:10000
    }
    }
})

//so para testar nao e o final
// const sequelize = new Sequelize('projetoFinalBackend', 'root', 'andando10-', {
//     dialect: 'mysql'
// })

const UserDataModel = require("./models/Users");
const PostDataModel = require('./models/Posts');
const FollowDataModel = require('./models/Follows');
const PostlikeDataModel = require('./models/Post_likes');
const CommentDataModel = require('./models/Comments');

console.log(process.env.DB_SCHEMA)
console.log(process.env.DB_USER)



const User = UserDataModel(sequelize, DataTypes);
const Post = PostDataModel(sequelize, DataTypes);
const Follow = FollowDataModel(sequelize, DataTypes);
const PostLike = PostlikeDataModel(sequelize, DataTypes);
const Comment = CommentDataModel(sequelize, DataTypes);

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.belongsToMany(User, { through: Follow, as: 'Followers', foreignKey: 'follower_id' });
User.belongsToMany(User, { through: Follow, as: 'Followings', foreignKey: 'followed_id' });

User.belongsToMany(Post, { through: PostLike, as: 'LikedPosts', foreignKey: 'user_id' });
Post.belongsToMany(User, { through: PostLike, as: 'Likes', foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(err => {
        console.error("Unable to connect", err)
    });



sequelize.sync({ force: false })
    .then(() => {
        console.log("Tables created!");
    })

module.exports = {
    User,
    Post,
    Follow,
    PostLike,
    Comment
}