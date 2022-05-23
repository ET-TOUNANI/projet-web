var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.send('index');
});
router.post('/register', async function(req, res, next) {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            passwrd: req.body.passwrd,
            role: req.body.role,
        },
    })
    res.status(200)
    res.send(user)
});
router.post('/login', async function(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        }
    })
    if (user.passwrd == req.body.passwrd) {
        res.status(200)
        res.send(user)
    } else {
        res.status(404)
        res.send({})
    }

});



module.exports = router;