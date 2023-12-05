const Sequelize = require('sequelize');

require("dotenv").config();

/*
 (DB이름, DB사용자, DB비밀번호)
 dialect: 사용할 DB 종류
 host: DB가 설치된 컴퓨터 주소
 */
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = sequelize;