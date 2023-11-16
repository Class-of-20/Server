const Sequelize = require('sequelize');

const sequelize = require('../Database/mariadb.js');
const user = require('./user');

const post = sequelize.define('post', {
    idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    write: {
        type: user.id,
        allowNull: false,
    },
    address2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address3 : {    // 별명
        type: Sequelize.STRING,
        allowNull: false,
    },
    addressPlace : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    meeetDate : {
        type: Sequelize.DATE,
        allowNull: false,
    },
    meeetTime : {
        type: Sequelize.TIME,
        allowNull: false,
    },
    writeDate : {
        type: Sequelize.DATE,
        allowNull: false,
    },
    writeTime : {
        type: Sequelize.TIME,
        allowNull: false,
    },
    minPeople : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    maxPeople : {
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

sequelize.sync();

module.exports = post;