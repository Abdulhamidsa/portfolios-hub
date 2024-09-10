import { User } from '../src/models/user.model.js'
import { faker } from '@faker-js/faker'
import { connect } from '../util/db.js'
// import { Projects } from '../src/models/projects.model.js'

import mongoose from 'mongoose'
const predefinedLinks = ['cv', 'social media', 'pdf cv']
const predefinedProfessions = [
    'web development',
    'frontend development',
    'backend development',
    'full stack development',
    'UI/UX designer',
    'graphic designer',
    'web designer',
    'product designer',
    'motion graphics',
    'visual designer',
    'creative director',
    'digital marketer',
]
const generateUserData = (count) => {
    return Array.from({ length: count }).map(() => ({
        credentials: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            mobile: faker.phone.number(),
            dateOfBirth: faker.date.birthdate(),
            password: faker.internet.password(),
        },
        personalInfo: {
            profilePicture: faker.image.avatar(),
            bio: faker.lorem.sentence(),
            profession: faker.helpers.arrayElement(predefinedProfessions),
            country: faker.location.country(),
            links: [
                {
                    name: faker.helpers.arrayElement(predefinedLinks),
                    url: faker.internet.url(),
                },
            ],
        },
        friendlyId: faker.string.uuid(),
        userType: 'user',
        approved: faker.datatype.boolean(),
        active: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    }))
}
const generateProjectsData = (count, userId) => {
    return Array.from({ length: count }).map(() => ({
        userId: new mongoose.Types.ObjectId(faker.helpers.arrayElement(userId)),
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        projectUrl: faker.internet.url(),
        projectImage: Array.from({ length: 3 }).map(() => faker.image.url()),
        projectThumbnail: faker.image.url(),
    }))
}
const generateTagsData = (count) => {
    return Array.from({ length: count }).map(() => ({
        name: faker.lorem.word(),
    }))
}

const deleteExistingData = async () => {
    try {
        await Promise.all([User.deleteMany({})])
        console.log('data deleted')
    } catch (error) {
        console.error('failed deleting data:', error)
        throw error
    }
}
const insertData = async () => {
    try {
        const users = generateUserData(10)
        await User.insertMany(users)
        // const allUsers = await User.find({}, '_id').exec()
        // const userId = allUsers.map((user) => user._id.toString())

        // const projects = generateProjectsData(20, userId)
        // await Projects.insertMany(projects)

        console.log('data inserted')
    } catch (error) {
        console.error('failed to insert data:', error)
        throw error
    }
}
const seed = async () => {
    try {
        connect()
        await Promise.all([deleteExistingData(), insertData()])
        console.log('data seeded')
        process.exit(0)
    } catch (error) {
        console.error('failed seeding data', error)
        process.exit(1)
    }
}
seed()
