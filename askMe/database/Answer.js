// import the Sequelize
const sequelize = require('sequelize');

// import the connection with the database
const connection = require('./database');
const {Sequelize} = require("sequelize");

const Answer = connection.define("Answers", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force: false});

module.exports = Answer;