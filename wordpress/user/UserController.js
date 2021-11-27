const express = require('express');
const router = express.Router();
const User = require('./User.js');
const bcrypt = require('bcryptjs');


router.get('/admin/users', (req, res) => {
    res.send('Users list');
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
module.exports = router;