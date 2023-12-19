const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');
const user = require('./user');
const room = require('./room');
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
    room_idx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: room,
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
post.belongsTo(room, {
    foreignKey: 'room_idx',
    targetKey: 'idx'
});

sequelize.sync();

module.exports = chat;