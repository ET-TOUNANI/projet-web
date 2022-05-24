var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
    /* GET users listing. */
router.get('/', async function(req, res, next) {
    let skip = req.query.skip
    let take = req.query.take
    let users = await prisma.user.findMany()
    skip = skip || 0
    take = take || 10
    const u = [...users]
    res.send(u.splice(skip, take));
});
/* GET user by id. */
router.get('/:id', async function(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {
            id: +req.params.id
        }
    })

    if (user != {}) {
        res.status(200)
        res.send(user);
    } else {
        res.status(404)
        res.send({})
    }

});
/* POSt add user. */
router.post('/', async function(req, res, next) {
    try {
        const user = await prisma.user.create({
            data: req.body
        })
        res.status(200)
        res.send(user)
    } catch (e) {

        console.log(
            'email already exist !!'
        )
        throw e
    }

});
/* PAtCH update user. */
router.patch('/', async function(req, res, next) {

    const user = await prisma.user.update({
        where: { id: +req.body.id },
        data: req.body,
    })
    res.status(201)
    res.send(user)
});
/* delete user with id . */
router.delete('/:id', async function(req, res, next) {
    try {
        const u = await prisma.user.delete({
            where: { id: +req.params.id },
        })
        res.status(204)
        res.send(u)
    } catch (e) {

        console.log(
            'There is no user here with this id !!'
        )
        throw e
    }


});
module.exports = router;