module.exports = (sequelize, type) => {
    return sequelize.define("follow", {
        follower_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        },
        followed_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        }
    });
};
