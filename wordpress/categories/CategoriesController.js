const express = require('express');
const router = express.Router();
/**
 * Import the module category;
 * To save the Category on the database;
 * slug => title version optimizing for url (Web Developer = web-developer);
 */
const Category = require('./Category');

const slugify = require('slugify');
const {where} = require("sequelize");


/**
 * Creating a new Category
 */

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new.ejs');
})

/**
 * To read the input value and transform in to a slug
 */
router.post('/categories/save', (req, res) => {
    let title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories');
        })
    } else {
        res.redirect('/admin/categories/new');
    }
});


/**
 * To list the categories
 */
router.get('/admin/categories', ((req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/categories/index.ejs', {categories: categories});
    })
}))


/**
 * To delete a category
 */

router.post('/categories/delete', (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            });
        } else { //id not a number
            res.redirect('/admin/categories');
        }
    } else { // id null
        res.redirect('/admin/categories');
    }
});


/**
 * To edit and update a category
 */


router.get('/admin/categories/edit/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        res.redirect('/admin/categories');
    }

    Category.findByPk(id).then((category) => {
        if (category != undefined) {
            res.render('admin/categories/edit', {category: category});
        } else {
            res.redirect('/admin/categories');
        }
    }).catch(err => {
        res.redirect('/admin/categories');
    })
});

router.post('/categories/update', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    Category.update({title: title, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories');
    })
})


module.exports = router;