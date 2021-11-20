const {Sequelize} = require("sequelize");

const config = {
    db_name: process.env.DB_NAME || "askMe",
    db_user: process.env.DB_USER || "root",
    db_host: process.env.DB_HOST || "localhost",
    db_pass: process.env.DB_PASS,
};

const connection = new Sequelize(
    config.db_name, config.db_user, config.db_pass, {
    host: config.db_host,
    dialect: 'mysql'
})

module.exports = connection;