var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
    /* GET articles listing. */
router.get('/', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');

    let skip = req.query.skip
    let take = req.query.take
    let articles = await prisma.article.findMany()
    skip = skip || 0
    take = take || 10
    const u = [...articles]
    res.send(u.splice(skip, take));
});
/* GET article by id. */
router.get('/:id', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');

    const article = await prisma.article.findUnique({
        where: {
            id: +req.params.id
        }
    })

    if (article != {}) {
        res.status(200)
        res.send(article);
    } else {
        res.status(404)
        res.send({})
    }

});
/* POSt add article. */
router.post('/', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');

    try {
        const article = await prisma.article.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                authorId: req.body.UserId,
                image: req.body.image,
            }
        })
        res.status(200)
        res.send(article)
    } catch (e) {

        console.log(
            'error'
        )
        throw e
    }

});
/* PAtCH update article. */
router.patch('/', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');

    const article = await prisma.article.update({
        where: { id: parseInt(req.body.id) },
        data: req.body,
    })
    res.status(201)
    res.send(article)
});
/* delete article with id . */
router.delete('/:id', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');

    try {
        const u = await prisma.article.delete({
            where: { id: parseInt(req.params.id) },
        })
        res.status(204)
        res.send(u)
    } catch (e) {

        console.log(
            'There is no article here with this id !!'
        )
        throw e
    }


});
module.exports = router;