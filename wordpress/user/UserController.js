const express = require('express');
const router = express.Router();
const User = require('./User.js');
const bcrypt = require('bcryptjs');
const {where} = require("sequelize");


router.get('/admin/users', (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', {users: users});
    })
})


router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
})

router.post('/users/create', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if (!user) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            // hash => will be saved on the database

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                res.redirect('/');
            })
        } else {
            res.redirect('/admin/users/create');
        }
    })
})

router.get('/login', (req, res) => {
    res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if (user) {
            // validate password
            let correctPassword = bcrypt.compareSync(password, user.password);
            if (correctPassword) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                };
                res.redirect('/admin/articles');
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    });

});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;