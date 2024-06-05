module.exports = (sequelize, type) => {
    return sequelize.define("comment", {
        comment_id: {
            type: type.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        },
        post_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'posts', 
                key: 'post_id'
            },
            onDelete: 'CASCADE'
        },
        content: {
            type: type.STRING(280),
            allowNull: false
        }
    });
};