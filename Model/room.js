const Sequelize = require('sequelize');
const sequelize = require('../Database/mariadb.js');
const user = require('./user');
const post = require('./post');

const room = sequelize.define('room', {
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
    check: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 0,
        unsigned: true, 
    },
},{
    timestamps: false,
  });

room.belongsTo(user, {
    foreignKey: 'user_idx',
    targetKey: 'idx'
});
room.belongsTo(post, {
    foreignKey: 'post_idx',
    targetKey: 'idx'
});

sequelize.sync();

module.exports = room;