const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');

const user = sequelize.define('user', {
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
            len: [5, 20],        // 길이 제한 5~20자
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name : {    // 별명
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 10],
        },
        // defaultValue: 'CoffeeName',     // 기본값으로 'CoffeeName'를 설정
    },
    address1 : {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '부산광역시',
    },
    address2 : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address3 : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profileImage : {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING,
    }
}, {
    defaultScope: {
        attributes: {
            allowNull: false,
        }
    }
});

sequelize.sync();

module.exports = user;