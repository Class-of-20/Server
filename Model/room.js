const Sequelize = require('sequelize');
const sequelize = require('../Database/mariadb.js');
const user = require('./user');

const room = sequelize.define('room', {
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

room.belongsTo(user, {
    foreignKey: 'manager',
    targetKey: 'idx'
});

sequelize.sync();

module.exports = room;