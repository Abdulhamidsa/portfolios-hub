import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from '../../../../../server.js'
import { connect } from '../../../../../utils/db.js'
import { endPoints } from '../../../../../utils/endPoints.js'
import { shutdownServer } from '../../../helpers/setup-server.js'
import { Project } from '../../../../models/project.model.js'
import { mockedApp } from '../../../helpers/setup-server.js'
import { getProjectTest } from '../../../helpers/mock.data.js'

const projectMock = { ...getProjectTest(), title: 'mocked projec' } // if we need to change the title not all
describe('CRUD operations on a project', () => {
    // let token = ''
    beforeAll(async () => {
        await connect()
        await Project.create(projectMock)
        // here we could delete all liked projects in likes collection , something like this:
        // await Like.deleteMany({ projectId: projectMock._id })
        // login could be implemented here to get the token and pass it to the header bellow (.set('Authorization', `Bearer ${token}`))
        // token = await login()
    })
    afterAll(async () => {
        // no need to delete all , we could delete the project by id
        // await Project.deleteOne({ _id: projectMock._id })
        await Project.deleteMany({})
        await shutdownServer()
    })
    describe('projects/fetch-all', () => {
        test('fetch all projects', async () => {
            const path = endPoints.project.all
            const response = await request(mockedApp).get(path)
            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
            // const pArr = await Project.find({})
            // const p = pArr[0]
            // expect(pArr.length).toBe(1)
            // expect(p._id.toString()).toBe(projectMock._id.toString())
            // expect(p.title).toBe(projectMock.title)

            // pArr.forEach((item, i) => {
            //     expect(item._id.toString()).toBeDefined()
            // })
        })
    })
    describe('projects/uploads', () => {
        test('upload project', async () => {
            const path = endPoints.project.upload
            const response = await request(mockedApp).post(path).send(projectMock)
            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
        })
    })
    describe('projects/edit', () => {
        test('edit project', async () => {
            const path = `${endPoints.project.edit}?projectId=${projectMock._id}`
            const response = await request(mockedApp).put(path).send(projectMock)
            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
        })
    })
    describe('projects/delete', () => {
        test('delete project', async () => {
            const path = `${endPoints.project.delete}?projectId=${projectMock._id}`
            const response = await request(mockedApp).delete(path)
            console.log(projectMock._id)
            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
        })
    })
})
// describe('auth/register', () => {
//     test('signup', async () => {
//         const p = endPoints.user.auth.register
//         const response = await request(app).post(p).send(user)
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
