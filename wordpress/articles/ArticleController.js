const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');
const {where} = require("sequelize");


router.get('/admin/articles', ((req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then((articles) => {
        res.render('admin/articles/index', {articles: articles});
    })
}));

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
});

router.post('/articles/save', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    // saving data to the server
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles');
    })
})


/**
 * To delete a category
 */

router.post('/articles/delete', (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            });
        } else { //id not a number
            res.redirect('/admin/articles');
        }
    } else { // id null
        res.redirect('/admin/articles');
    }
});

router.get('/admin/articles/edit/:id', (req, res) => {
    let id = req.params.id;

    Article.findByPk(id).then(article => {
        console.log(article)
        if (article) {
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {categories: categories, article: article});
            })
        } else {
            res.redirect('/');
        }
    }).catch((err) => {
        res.redirect('/');
    })
})


router.post('/articles/update', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.update({
        title: title,
        body: body,
        categoryId: category,
        slug: slugify(title)
    }, {where: {id: id}}).then(() => {
        res.redirect('/admin/articles');
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    })
});


router.get('/articles/page/:num', (req, res) => {
    let page = req.params.num;
    let offset = 0;

    if (isNaN(page) || page === 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 4;
    }

    // setting how many articles I want per page => pagination approach
    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        let next;
        if (offset + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render('admin/articles/page', {result: result, categories: categories})
        })

    })
});


module.exports = router;

/**
 * categoryId - foreign key that makes reference to an id of a category an the table of categories
 * Its generate when we use the belongs to
 */