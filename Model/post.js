const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');
const user = require('./user');
const {now} = require("sequelize/lib/utils");

const post = sequelize.define('post', {
    idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    writer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // user 테이블의 idx를 참조
        references: {
            model: user,
            key: 'idx',
        }
    },
    address2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address3 : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    placeName : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    meetDate : {
        type: Sequelize.DATE,
        allowNull: false,
    },
    // writeDate : {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: now().getDate(),
    // },
    people : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    menu1 : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    menu2 : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profileImage : {
        type: Sequelize.STRING,
    },
});

post.belongsTo(user, {
    foreignKey: 'writer',
    targetKey: 'idx'
});

sequelize.sync();

module.exports = post;