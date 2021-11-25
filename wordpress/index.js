const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");

const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticleController');

/**
 * Importing the Modules
 */
const Article = require('./articles/Article');
const Category = require('./categories/Category');


//View engine
app.set('view engine', 'ejs');

// static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Connected to database successfully!')
    }).catch((err) => {
    console.log(`error connecting database ${err}`);
})


app.use('/', categoriesController);
app.use('/', articleController);


app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories});
        })
    })
})


/**
 * Looking for the slug the user will pass in the route
 */
app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories});
            })
        } else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    })
})

/**
 * Looking for a category using the slug.
 * Because there is a relationship beteween the articles and categories we need use join include:[{model: Article}]
 */
app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if (category !== undefined) {
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            });
        } else {
            res.redirect('/');
        }
    }).catch(error => {
        res.redirect('/');
    })
})


app.listen(8080, () => {
    console.log("Server is running on port 8080!")
})