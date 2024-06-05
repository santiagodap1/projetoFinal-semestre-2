const Follow = require("../sequelize.js").Follow
const User = require("../sequelize.js").User

exports.getAllFollowers = (req, res, next) => {
    const userId = req.params.userId;
    User.findOne({
        where: { id: userId },
        include: [{
            model: User,
            as: 'Followers'
        }]
    })
    .then(user => {
        res.send(user.Followers)
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}

exports.getFollowerCount = (req, res, next) => {
    const userId = req.params.userId;
    
    Follow.count({
        where: { followed_id: userId }
    })
    .then(count => {
        res.json({ followerCount: count });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};




exports.getAllFollowing = (req, res, next) => {
    const userId = req.params.userId; 

    User.findOne({
        where: { id: userId },
        include: [{
            model: User,
            as: 'Followings'
        }]
    })
    .then(user => {
        res.send(user.Followings)
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}

exports.getFollowingCount = (req, res, next) => {
    const userId = req.params.userId;
    
    Follow.count({
        where: { follower_id: userId }
    })
    .then(count => {
        res.json({ followingCount: count });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};





exports.followUser = (req, res, next) => {
    const followerId = req.body.followerId; 
    const followedId = req.body.followedId; 

    Follow.create({
        follower_id: followerId,
        followed_id: followedId
    })
    .then(() => {
        res.status(200).send({ message: 'User followed successfully.' });
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}


exports.unfollowUser = (req, res, next) => {
    const followerId = req.body.followerId; 
    const followedId = req.body.followedId;           

    Follow.destroy({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    })
    .then(() => {
        res.status(200).send({ message: 'User unfollowed successfully.' });
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}

exports.isFollowing = (req, res, next) => {
    const followerId = req.body.followerId;
    const followedId = req.body.followedId; 

    Follow.findOne({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    })
    .then(follow => {
        if (follow) {
            res.status(200).send({ message: 'User is following.' });
        } else {
            res.status(200).send({ message: 'User is not following.' });
        }
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}