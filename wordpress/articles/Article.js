const Sequelize = require('sequelize');
/**
 * Importing the connection with the database
 */
const connection = require('../database/database');

/**
 * With which category to set the relationship
 */
const Category = require('../categories/Category')



/**
 * Creating a table on database called ' articles'
 * slug: for the Article address
 */
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false

    }
})



/**
 * Declaring the relation between two modules
 * hasMany => 1 Category has many Articles
 * 1 Article belongs to a category 1- to- 1
 * !!!! Always when a new relationship is created the database has to be updated!
 */

Category.hasMany(Article);
Article.belongsTo(Category);

// Article.sync({force: true});

module.exports = Article;