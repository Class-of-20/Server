const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');
const user = require('./user');

const post = sequelize.define('chat', {
    idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    manager: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'idx',
        }
    },
});

post.belongsTo(user, {
    foreignKey: 'user_idx',
    targetKey: 'idx'
});

sequelize.sync();

module.exports = rooms;