const express = require('express');
const router = express.Router();
/**
 * Import the module category;
 * To save the Category on the database;
 * slug => title version optimizing for url (Web Developer = web-developer);
 */
const Category = require('./Category');

const slugify = require('slugify');


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
            res.redirect('/')
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

module.exports = router;