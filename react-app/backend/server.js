import express, { urlencoded, json } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import z from 'zod'
import rateLimit from 'express-rate-limit'
import { validZod } from './util/validation.js'
import expressListRoutes from 'express-list-routes'
import { connect } from './util/db.js'
import { SECRETS } from './util/config.js'
import { upload } from './util/upload.js'
import { forgotPassword } from './src/controllers/user.controllers.js'
import UserRouter from './src/routes/user.router.js'
import ProjectRouter from './src/routes/project/project.routes.js'
import usersRouter from './src/routes/user/user.auth.routes.js'
const app = express()

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(cookieParser())

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(morgan('dev'))

app.use(helmet())
app.use((req, res, next) => {
    res.set('X-XSS-Protection', '1; mode=block')
    res.set('X-Frame-Options', 'deny')
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    next()
})
app.use(helmet.hidePoweredBy())
app.use(json())
app.use(urlencoded({ extended: true }))

// Configure CORS to allow requests from a specific domain
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your domain
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, // Access-Control-Allow-Credentials: true
}
app.use(cors(corsOptions))

// Endpoint shows Server Running
app.get('/', (req, res) => {
    res.json('Server is Running')
})
app.use('/user', usersRouter)
app.use('/project', ProjectRouter)

// Util single file upload API
app.post('/upload', upload.single('file'), (req, res) => res.send({ imageURL: req.file.path }))

// User CRUD APIs
app.use('/api/user', UserRouter)

// Change Password without login
app.put('/changePassword', forgotPassword)

// Admin auth
// app.post('/admin-register', userModel, adminSignUp);
// app.post('/admin-login', userModel, adminSignin);

/**
 * Validation Test - this is an example on how to validate variable sent to the backend
 * This test and validates that all expected parameters is present and is of the correct type
 *
 * @usage http://localhost:8080/test-validation/123
 *
 * @param testid
 *
 */

const schema = z.object({
    testid: z
        .string({ required_error: 'testid is required' })
        .min(3, 'testid must be at least 3 characters')
        .max(10, 'testid must be at most 10 characters'),
})

app.get('/test-validation/:testid', validZod(schema, 'params'), (req, res, next) => {
    //
    // No need to have any validation or checks to make sure if the testid is valid or exists
    //
    const testid = req.params.testid

    res.json({ message: 'Validation Test Passed', testid: testid })
})

export const start = async () => {
    try {
        await connect()
        app.listen(process.env.PORT, () => {
            if (SECRETS.node_env === process.env.NODE_ENV) {
                expressListRoutes(app)
            }
            console.log(`REST API on http://localhost:${process.env.PORT}/`)
        })
    } catch (e) {
        console.error(e)
    }
}
