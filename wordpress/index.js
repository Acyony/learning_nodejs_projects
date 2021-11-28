const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require("./database/database");

const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticleController');
const usersController = require('./user/UserController');

/**
 * Importing the Modules
 */
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/User');
const cookie = require("cookie");


//View engine
app.set('view engine', 'ejs');


//Sessions
app.use(session({
    secret: 'bonekDeCroche', cookie: {maxAge: 30000}
}))


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
app.use('/', usersController);


/**
 * Learning how to work with sessions
 */
/*app.get('/session', (req, res) => {
    req.session.training = 'training Nodejs'
    req.session.year = 2021
    req.session.email = 'alcione@email.com'
    req.session.user = {
        username: 'acyony',
        email: 'alcione@email.com',
        id: 10
    }
    res.send('Session is generated successfully!')
});


app.get('/reading', (req, res) => {
    res.json({
        training: req.session.training,
        year: req.session.year,
        email: req.session.email,
        user: req.session.user
    })

});*/

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {
                articles: articles,
                categories: categories,
                result: {
                    page: 0,
                    next: false
                }
            });
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