import { expect, describe, test } from 'vitest'
import { shutdownServer, startServer } from './helpers/setup-server.js'
import app from '././../server'
import request from 'supertest'
import { Tag } from '../models/tags.model.js'
import mongoose from 'mongoose'
import { Project } from '../models/project.model.js'

export const createMongooseId = () => {
    return new mongoose.Types.ObjectId()
}

const project = {
    _id: createMongooseId(),
    userId: createMongooseId(),
    title: 'some tiyle',
    description: 'some descasdfkajsldkajsldjk',
    projectUrl: 'google.com',
    projectImage: 'asdkajldkjasdlk',
    projectThumbnail: 'asdkalsdjasdj',
    tags: [createMongooseId()],
}

describe('/auth/tag ', () => {
    beforeAll(async () => {
        await startServer()
        await Project.create(project)
    })

    afterAll(async () => {
        const arr = await Tag.find({})
        const ids = arr.map((t) => t._id)
        await Tag.deleteMany({ _id: { $in: ids } })

        await Project.deleteOne({ _id: project._id })

        await shutdownServer()
    })

    describe('tags CRUD', () => {
        //
        // hitting an endpoint to create something
        //
        test('create tag', async () => {
            const p = '/auth/create-tag'

            const response = await request(app).post(p).send({ name: 'tag1' })

            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
        })

        //
        // pulling out what i have just saved
        //
        test('get empy tags collection', async () => {
            const p = '/auth/get-tags'
            const res = await Tag.findOne({ name: 'tag1' })
            expect(res.name).toBe('tag1')
        })
    })

    describe('tags CRUD version', () => {
        //
        // hitting an endpoint to create something
        //

        test('get project by id', async () => {
            const p = '/auth/get-project/' + project._id
            const response = await request(app).get(p)

            expect(response.status).toBe(200)
            expect(response.body.result).toBe(true)
            expect(response.body.data._id.toString()).toBe(project._id.toString())
        })

        test.only('fail to get non valid project by id', async () => {
            const p = '/auth/get-project/' + 'asdasdasd'

            const response = await request(app).get(p)
            expect(true).not.toBe(false)
            expect(response.body.result).toBe(false)
        })
    })
})
