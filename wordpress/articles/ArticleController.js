const express = require('express');
const router = express.Router();


router.get('/articles', ((req, res) => {
    res.send('Welcome to the articles section!')
}));

router.get('/admin/articles/new', ((req, res) => {
    res.send('Creating a new article!')
}));

module.exports = router;