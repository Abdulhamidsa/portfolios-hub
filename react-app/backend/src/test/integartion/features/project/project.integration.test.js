import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from '../../../../../server.js'
import { projectTest } from '../../../helpers/mock.data..js'
import { connect } from '../../../../../utils/db.js'
import { endPoints } from '../../../../../utils/endPoints.js'
import { shutdownServer } from '../../../helpers/setup-server.js'
import { Project } from '../../../../models/project.model.js'

// app.use('/:friendlyId/projects', privateProjectRouter)

// router.post('/upload', validZod(projectUploadSchema, 'body'), handleUploadProjects)
// // user projects route
// router.get('/all', validZod(projectFetchSchema, 'query'), handleFetchUserProjects)
// // edit project
// router.put('/:friendlyId/:projectId', validZod(queryParamsValidator, 'params'), handleEditProject)
// // delete project
// router.delete('/:projectId', validZod(queryParamsValidator, 'params'), handleDeleteProject)
// // like project
// router.post('/like/:projectId', handleLikeProject)

describe('CRUD operations on a project', () => {
    beforeAll(async () => {
        await connect()
    })
    afterAll(async () => {
        // await Project.deleteMany({})
        await shutdownServer()
    })
    describe('projects/upload', () => {
        test('upload project', async () => {
            const path = endPoints.project.upload
            const response = await request(app).post(path).send(projectTest)
            console.log(response.body)
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
