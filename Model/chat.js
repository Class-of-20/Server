const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');
const user = require('./user');
<<<<<<< HEAD
const post = require('./post');
const {now} = require("sequelize/lib/utils");

const chat = sequelize.define('chat', {
=======
const room = require('./room');
const {now} = require("sequelize/lib/utils");

const post = sequelize.define('chat', {
>>>>>>> create-room
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
<<<<<<< HEAD
    post_idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: post,
=======
    room_idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: room,
>>>>>>> create-room
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

<<<<<<< HEAD
chat.belongsTo(user, {
    foreignKey: 'user_idx',
    targetKey: 'idx'
});
chat.belongsTo(post, {
    foreignKey: 'post_idx',
=======
post.belongsTo(user, {
    foreignKey: 'user_idx',
    targetKey: 'idx'
});
post.belongsTo(room, {
    foreignKey: 'room_idx',
>>>>>>> create-room
    targetKey: 'idx'
});

sequelize.sync();

module.exports = chat;