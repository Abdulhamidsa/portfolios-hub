import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { User } from '../src/models/user.model.js' // Adjust the import path as needed
import { Projects } from '../src/models/projects.model.js' // Adjust the import path as needed
import { Tag } from '../src/models/tags.model.js' // Adjust the import path as needed
import { connect } from '../util/db.js'

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
const predefinedTags = [
    'webDev',
    'ux/ui',
    'noodejs',
    'react',
    'nextjs',
    'mongodb',
    'css',
    'html',
    'javascript',
    'mern',
    'fullstack',
    'designer',
    'typescript',
    'graphql',
    'firebase',
    'aws',
    'azure',
    'vuejs',
    'angular',
    'bootstrap',
    'tailwind',
    'sass',
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

const generateProjectsData = (count, userIds, tagIds) => {
    return Array.from({ length: count }).map(() => {
        const numTags = faker.datatype.number({ min: 1, max: 5 })
        const projectTags = Array.from({ length: numTags }).map(
            () => new mongoose.Types.ObjectId(faker.helpers.arrayElement(tagIds))
        )
        const numImages = faker.datatype.number({ min: 1, max: 5 })
        const projectImages = Array.from({ length: numImages }).map(() => faker.image.url())
        return {
            userId: new mongoose.Types.ObjectId(faker.helpers.arrayElement(userIds)),
            title: faker.lorem.words(3),
            description: faker.lorem.sentences(2),
            projectUrl: faker.internet.url(),
            projectImage: projectImages,
            projectThumbnail: faker.image.url(),
            tags: projectTags,
        }
    })
}
const generateTagsData = (count) => {
    return Array.from({ length: count }).map(() => ({
        name: faker.helpers.arrayElement(predefinedTags),
    }))
}

const deleteExistingData = async () => {
    try {
        await Promise.all([User.deleteMany({}), Projects.deleteMany({}), Tag.deleteMany({})])
        console.log('Existing data deleted successfully')
    } catch (error) {
        console.error('Failed to delete existing data:', error)
        throw error
    }
}

const insertData = async () => {
    try {
        const tags = generateTagsData(10)
        await Tag.insertMany(tags)
        const allTags = await Tag.find({}, '_id').exec()
        const tagIds = allTags.map((tag) => tag._id.toString())
        const users = generateUserData(10)
        await User.insertMany(users)
        const allUsers = await User.find({}, '_id').exec()
        const userIds = allUsers.map((user) => user._id.toString())
        const projects = generateProjectsData(20, userIds, tagIds)
        await Projects.insertMany(projects)
        console.log('Data inserted successfully')
    } catch (error) {
        console.error('Failed to insert data:', error)
        throw error
    }
}

const seed = async () => {
    try {
        await connect()
        await deleteExistingData()
        await insertData()
        console.log('Data seeding completed successfully')
        process.exit(0)
    } catch (error) {
        console.error('Seeding failed:', error)
        process.exit(1)
    }
}

seed()
