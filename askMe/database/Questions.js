// import the sequelize
const sequelize = require('sequelize');

// import the connection with the database
const connection = require('./database');
const {Sequelize} = require("sequelize");


// Question => is a model that will creat a table
const Question = connection.define('QuestionTable', {
    title: {
        // Sequelize.string => short text
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        // Sequelize.text => long text
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {
    console.log('Created Table')
})

module.exports = Question;