module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        user_id: {
            type: type.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: type.STRING(45),
            allowNull: false
        },
        email: {
            type: type.STRING(70),
            allowNull: false
        },
        password: {
            type: type.STRING(255),
            allowNull: false
        },
        qt_followers: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        qt_following: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        qt_posts: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    });
};
