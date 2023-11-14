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
        allowNull: false,
        validate: {
            len: [5, 10],               // 길이가 5~10자여야 함
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'CoffeeName',     // 기본값으로 'CoffeeName'를 설정
    },
    address : {
        type: Sequelize.STRING,
        allowNull: false,
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