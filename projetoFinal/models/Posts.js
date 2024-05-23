module.exports = (sequelize, type) => {
    return sequelize.define("post", {
        post_id: {
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
        content: {
            type: type.STRING(280),
            allowNull: true
        },
        image: {
            type: type.BLOB,
            allowNull: true
        },
        created_at: {
            type: type.DATE,
            allowNull: false,
            defaultValue: type.NOW
        },
        qt_likes: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    });
};
