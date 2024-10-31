import { Router } from 'express'
import { signupHandler, signinHandler, signout, requiredLogin } from '../../../util/auth.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
import { refreshTokens } from '../../../util/refresh.token.js'
import { validZod } from '../../../middleware/valid.zod.js'
import { signInSchema, signUpSchema } from '../../../util/validations.js'
import { getErrorResponse, getSuccessResponse } from '../../../util/api.response.js'
import { Tag } from '../../models/tags.model.js'
import { Project } from '../../models/project.model.js'
const router = Router()
// user auth routes
router.post('/register', validZod(signUpSchema, 'body'), signupHandler)
router.post('/signin', validZod(signInSchema, 'body'), signinHandler)
router.post('/signout', signout)
// authentication routes
// router.get('/check-auth', checkAccessToken, (req, res) => {
//     res.json({ message: 'User is authenticated', user: req.user })
// })
router.get('/check-auth', refreshTokens, requiredLogin)
router.post('/refresh-tokens', refreshTokens)

router.get('/get-tags', (req, res, next) => {
    Tag.find({}).then((tags) => {
        res.json(getSuccessResponse({ tags: tags }))
    })
})

router.get('/get-project/:projectId', (req, res, next) => {
    Project.findOne({ _id: req.params.projectId })
        .orFail(new Error(`Project with id ${req.params.projectId} does not exist`))
        .then((project) => {
            res.json(getSuccessResponse(project))
        })
        .catch((err) => {
            res.json(getErrorResponse(err))
        })
})

router.post('/create-tag', (req, res, next) => {
    const body = req.body

    const name = body.name
    Tag.create({ name: name || new Date().getTime().toString() }).then((createTag) => {
        res.json(getSuccessResponse({ tag: createTag }))
    })
})

export default router
