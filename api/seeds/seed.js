const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')
const dotenv = require('dotenv')

const prisma = new PrismaClient()

async function clear() {
    await prisma.commentaire.deleteMany({})
    await prisma.article.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.categorie.deleteMany({})
}

const fakerAuthors = () => ({
    name: faker.name.firstName() + faker.name.lastName(),
    email: faker.internet.email(),
    passwrd: faker.internet.password(),
    role: 'AUTHOR',
})
const fakerCategories = () => ({
    name: faker.animal.type(),
})
const fakerAdmins = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    passwrd: faker.internet.password(),
    role: 'ADMIN',
})

const getRandomCategory = async() => {
    const categories = await prisma.categorie.findMany({})
    const randomCategory =
        categories[Math.floor(Math.random() * categories.length)]
    return randomCategory
}

const getRandomUser = async() => {
    const users = await prisma.user.findMany({})
    const randomUser = users[Math.floor(Math.random() * users.length)]
    return randomUser
}

const fakerArticles = async(name) => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.words(680),
    image: faker.image.animals(),
    published: true,
    authorId: (await getRandomUser()).id,
    categorId: name,
})


const fakerComments = (artId, randomUser) => ({
    comment: faker.lorem.sentence(),
    writtenById: randomUser,
    postId: artId,
})

async function main() {
    const fakerAuthorsRounds = 10
    const fakerAdminsRounds = 1
    const fakerCategoriesRounds = 10
    const fakerArticlesRounds = 100
    dotenv.config()
    console.log('Seeding...')
    await clear()
    var arr = []
        /// --------- Authors ---------------
    for (let i = 0; i < fakerAuthorsRounds; i++) {
        let o = fakerAuthors()
        await prisma.user.create({ data: o })
        arr.push(o.email);
    }
    /// --------- Admins ---------------
    for (let i = 0; i < fakerAdminsRounds; i++) {
        let o = fakerAdmins();
        await prisma.user.create({ data: o })
        arr.push(o.email);
    }
    var arrCat = []
    for (let i = 0; i < fakerCategoriesRounds; i++) {
        let o = fakerCategories();
        await prisma.categorie.create({ data: o })
        arrCat.push(o.name)
    }


    for (let i = 0; i < fakerArticlesRounds; i++) {
        const randomCategory = arrCat[Math.floor((Math.random() * fakerCategoriesRounds) % fakerCategoriesRounds)]
        await prisma.article.create({ data: await fakerArticles(randomCategory) })
    }

    /// --------- Comments ---------------
    const articles = await prisma.article.findMany()
    for (let i = 0; i < articles.length; i++) {
        const numberOfComments = Math.floor(Math.random() * 20)
        for (let j = 0; j < numberOfComments; j++) {
            const randomUser = arr[Math.floor((Math.random() * fakerAuthorsRounds) % fakerAuthorsRounds)]
            prisma.commentaire.create({ data: fakerComments(articles[i].id, randomUser) })
        }
    }

    console.log('Seeding finished')
}

main()
    .catch((e) => console.error(e))
    .finally(async() => {
        await prisma.$disconnect()
    })