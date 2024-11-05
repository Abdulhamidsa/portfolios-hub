import request from 'supertest'
import { User } from '../../../../models/user.model.js'
import { Credential } from '../../../../models/credential.model.js'
import { connect } from '../../../../../utils/db.js'
import { shutdownServer } from '../../../helpers/setup-server.js'
import app from '../../../../../server.js'
import { endPoints } from '../../../../../utils/endPoints.js'
import { user } from '../../../helpers/mock.data..js'

describe('User creation and login', () => {
    beforeAll(async () => {
        await connect()
    })
    afterAll(async () => {
        // await Promise.all([User.deleteMany({}), Credential.deleteMany({})])
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
