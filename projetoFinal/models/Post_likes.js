module.exports = (sequelize, type) => {
    return sequelize.define("post_like", {
        like_id: {
            type: type.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        },
        post_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'post_id'
            },
            onDelete: 'CASCADE'
        }
    });
};
