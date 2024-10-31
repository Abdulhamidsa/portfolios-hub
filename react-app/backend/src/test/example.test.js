import { expect, test } from 'vitest'
import { sum } from '../../services/testService.js'
import { shutdownServer, startServer } from './helpers/setup-server.js'

test('adds 1 + 2 to equal 3', () => {
    beforeAll(async () => {
        await startServer()

        // login an admin user and get a token
    })

    afterAll(async () => {
        //... what ever need to be rest or deleted
        await shutdownServer()
    })

    expect(sum(1, 2)).toBe(3)
})
