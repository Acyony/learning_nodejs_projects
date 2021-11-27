const express = require('express');
const router = express.Router();

router.get('/admin/users', (req, res) => {
    res.send('Users list');
})


router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
})

router.post('/users/create', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    res.json({email: email, password: password});
})
module.exports = router;