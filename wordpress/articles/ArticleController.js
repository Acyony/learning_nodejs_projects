const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');


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



module.exports = router;

/**
 * categoryId - foreign key that makes reference to an id of a category an the table of categories
 * Its generate when we use the belongs to
 */