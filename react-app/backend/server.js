import express, { urlencoded, json } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import expressListRoutes from 'express-list-routes'
import { connect } from './util/db.js'
import { SECRETS } from './util/config.js'
import corsOptions from './config/cors.js'
import publicUserRouter from './src/routes/user/user.routes.js'
import publicProjectRouter from './src/routes/project/project.routes.public.js'
import privateProjectRouter from './src/routes/project/project.routes.private.js'
import authRouter from './src/routes/auth/auth.routes.js'
import bodyParser from 'body-parser'
import expressErrorMiddleware from './middleware/errorMiddleware.js'
import 'express-async-errors'
const app = express()
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(cookieParser())
app.use(bodyParser.json())
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
app.use(cors(corsOptions))
// Endpoint shows Server Running
app.get('/', (req, res) => {
    res.json('Server is Running')
})

app.use('/auth', authRouter)
app.use('/user', publicUserRouter)
app.use('/projects', publicProjectRouter)
app.use('/:friendlyId/projects', privateProjectRouter)
app.use(expressErrorMiddleware)

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

// app.use(function (req, res) {
//     res.status(400)
// })

// app.use(function (req, res, next) {
//     res.status(404).json({ error: 'Not found' })
// })

// app.use(function (error, req, res, next) {
//     const statusCode = error.status || 500
//     const message = error.message || 'Something went wrong!'
//     res.status(statusCode).json({ error: message })
// })

// app.use(function (error, req, res, next) {
//     console.error(error.stack)
//     res.status(500).json({ error: 'Something went wrong!' })
// })
