const { PrismaClient } = require('@prisma/client');
var express = require('express');
var path = require('path');
var router = express.Router();
const { prismaCient } = require('@prisma/client')
const prisma = new PrismaClient()
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.send('index');
});
router.post('/', async function(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        }
    })
    if (user.passwrd == req.body.passwd) {
        if (user.role == 'ADMIN') {
            res.sendFile(path.join(__dirname, '../public/dashboard.html'));
        } else if (user.role == 'AUTHOR') {
            res.sendFile(path.join(__dirname, '../public/articles.html'));
        } else {
            res.sendFile(path.join(__dirname, '../public/viewArticle.html'));
        }
    } else {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }

});



module.exports = router;