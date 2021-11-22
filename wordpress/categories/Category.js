const Sequelize = require('sequelize');
/**
 * Importing the connection with the database
 */
const connection = require('../database/database');

/**
 * Creating a table on database called 'categories'
 * slug: for the category address
 */
const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


//!!!! Always when a new relationship is created the database has to be updated!

//Category.sync({force: true});

module.exports = Category;