import { expect, describe, test } from 'vitest'
import { startServer } from './helpers/setup-server.js'
import app from '././../server'
import request from 'supertest'
import { Tag } from '../models/tags.model.js'
import mongoose from 'mongoose'
import { Project } from '../models/project.model.js'
import { User } from '../models/user.model.js'
import { generateFriendlyId } from 'util/herlper.js'
import { shutdownServer } from '../test/helpers/setup-server.js'
import { Credential } from '../models/credential.model.js'
import { endPoints } from 'util/endPoints.js'
import { connect } from 'util/db.js'
export const createMongooseId = () => {
    return new mongoose.Types.ObjectId()
}
const project = {
    userId: createMongooseId(),
    title: 'some tiyle',
    description: 'some descasdfkajsldkajsldjk',
    projectUrl: 'google.com',
    projectImage: 'asdkajldkjasdlk',
    projectThumbnail: 'asdkalsdjasdj',
    tags: [createMongooseId()],
}
const user = {
    username: 'someusername',
    friendlyId: generateFriendlyId('username'),
    profilePicture: 'https://thispersondoesnotexist.com/',
    bio: 'somebio',
    profession: 'Web Developer',
    country: 'Syria',
    links: [{ name: 'CV', url: 'https://thispersondoesnotexist.com/' }],
    email: 'a@ssa.com',
    password: '123456',
    firstName: 'somefirstname',
    lastName: 'somelastname',
    userRole: 'user',
    dateOfBirth: new Date(),
}
describe('User creation and login', () => {
    beforeAll(async () => {
        await connect()
    })
    afterAll(async () => {
        await Promise.all([User.deleteMany({}), Credential.deleteMany({})])
        await shutdownServer()
    })
    describe('auth/register', () => {
        test('signup', async () => {
            const p = endPoints.user.auth.register
            const response = await request(app).post(p).send(user)
            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
        })
    })
    describe('auth/signin', () => {
        test('login', async () => {
            const p = endPoints.user.auth.signin
            console.log(p)
            const response = await request(app).post(p).send({ email: user.email, password: user.password })
            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
        })
    })
})
// describe.only('auth/signin', () => {
//     beforeAll(async () => {
//         await startServer()
//         await User.findOne(user)
//     })
//     test('login', async () => {
//         const p = '/auth/signin'
//         const response = await request(app).post(p).send({ email: user.email, password: user.password })
//         expect(response.status).toBe(200)
//         expect(response.body.result).toBe(true)
//     })
// })

// describe('/auth/tag ', () => {
//     beforeAll(async () => {
//         await startServer()
//         await Project.create(project)
//     })

//     afterAll(async () => {
//         const arr = await Tag.find({})
//         const ids = arr.map((t) => t._id)
//         await Tag.deleteMany({ _id: { $in: ids } })

//         await Project.deleteOne({ _id: project._id })

//         await shutdownServer()
//     })

//     describe('tags CRUD', () => {
//         //
//         // hitting an endpoint to create something
//         //
//         test('create tag', async () => {
//             const p = '/auth/create-tag'

//             const response = await request(app).post(p).send({ name: 'tag1' })

//             expect(response.status).toBe(200)
//             expect(response.body.result).toBe(true)
//         })

//         //
//         // pulling out what i have just saved
//         //
//         test('get empy tags collection', async () => {
//             const p = '/auth/get-tags'
//             const res = await Tag.findOne({ name: 'tag1' })
//             expect(res.name).toBe('tag1')
//         })
//     })

//     describe('tags CRUD version', () => {
//         //
//         // hitting an endpoint to create something
//         //

//         test('get project by id', async () => {
//             const p = '/auth/get-project/' + project._id
//             const response = await request(app).get(p)

//             expect(response.status).toBe(200)
//             expect(response.body.result).toBe(true)
//             expect(response.body.data._id.toString()).toBe(project._id.toString())
//         })

//         test.only('fail to get non valid project by id', async () => {
//             const p = '/auth/get-project/' + 'asdasdasd'

//             const response = await request(app).get(p)
//             expect(true).not.toBe(false)
//             expect(response.body.result).toBe(false)
//         })
//     })
// })
