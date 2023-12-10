const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');
const user = require('./user');
const post = require('./post');
const {now} = require("sequelize/lib/utils");

const post = sequelize.define('chat', {
    idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'idx',
        }
    },
    post_idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: post,
            key: 'idx',
        }
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    time : {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

post.belongsTo(user, {
    foreignKey: 'user_idx',
    targetKey: 'idx'
});
post.belongsTo(post, {
    foreignKey: 'post_idx',
    targetKey: 'idx'
});

sequelize.sync();

module.exports = chat;