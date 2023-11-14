const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');

const user = sequelize.define('userTest', {
    idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    name : {
        type: Sequelize.STRING,
    },
    address : {
        type: Sequelize.STRING,
    },
}, {
    defaultScope: {
        attributes: {
            allowNull: false,
        }

    }
});

sequelize.sync();

module.exports = user;