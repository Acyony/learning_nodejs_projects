const Sequelize = require('sequelize');
/**
 * Importing the connection with the database
 */
const connection = require('../database/database');

/**
 * Creating a table on database called 'categories'
 * slug: for the category address
 */
const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


//!!!! Always when a new relationship is created the database has to be updated!
// to synchronize with the database
// {force: true} means, each time the application will reload it will recreate the table on the database.
//{force: false} => if the table already exists it'll be not created againg
// User.sync({force: false});

module.exports = User;