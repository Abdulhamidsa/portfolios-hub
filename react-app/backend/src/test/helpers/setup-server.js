/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 11/10/2023.
 */

import mongoose from 'mongoose'
import express from 'express'
import { createMongooseId } from './mock.data.js'
import app from '../../../server.js'

const connect = (uri) => {
    if (!uri || uri === 'null') {
        console.log('######')
        console.error('index > databaseUri not define ', uri)
        console.log('########')
        return Promise.reject('URI not defind')
    }
    console.log('setup-server > uri = ', uri)
    return mongoose
        .connect(uri)
        .then((res) => {
            if (process.env.NODE_ENV !== 'TEST') {
                console.log(' db > DATABASE CONNECTED  ')
            }

            return res
        })
        .catch((err) => {
            console.log(' www > CONNECTION ERROR= ')
            console.log(' db > err = ', err)
            return Promise.reject()
        })
}

export const disconnect = () => {
    return mongoose.disconnect().catch((err) => {
        console.log(' db > err = ', err)
        return Promise.reject()
    })
}

/**
 *
 *  Setup the server for testing
 *
 * - connects to MongoDB
 * - loads the pems used for logging in
 *
 * ---------------------------------------------------------------------------------------
 */
export const startServer = async () => {
    const uri = process.env.MONGO_CONNECTION_STRING
    return connect(uri)
        .then((result) => {
            console.log('setup-server > done = ')
            return result
        })

        .catch((error) => {
            console.log('setup-server.ts > error = ', error)
            return Promise.reject(error)
        })
}

/**
 * Shutdown the database connnection after testing
 *
 * ---------------------------------------------------------------------------------------
 */

export const shutdownServer = async () => {
    return disconnect()
        .then((result) => {
            return result
        })
        .catch((error) => {
            console.log('setup-server.ts > error = ', error)
            return Promise.reject(error)
        })
}

// middleware to add userId to req.locals

// const app = express()
// app.use((req, res, next) => {
//     req.locals = { userId: createMongooseId() }
//     next()
// })

export const mockedApp = express()
mockedApp.use((req, res, next) => {
    req.locals = { userId: createMongooseId() }
    next()
})
mockedApp.use(app)
