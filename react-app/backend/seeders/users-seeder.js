import { User } from '../src/models/user.model.js'
import { faker } from '@faker-js/faker'
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

const seed = async () => {
    try {
        await connect()
        await Promise.all([User.deleteMany({}), User.insertMany(generateUserData(10))])
        console.log('true')
        process.exit(0)
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
seed()
