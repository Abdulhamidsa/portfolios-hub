import { Router } from 'express'
import { signup, signinHandler, signout, requiredLogin } from '../../../util/auth.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
import { refreshTokens } from '../../../util/refresh.token.js'
import { validZod } from '../../../middleware/valid.zod.js'
import { signInSchema } from '../../../util/validations.js'
const router = Router()
// user auth routes
router.post('/register', signup)
router.post('/signin', validZod(signInSchema, 'body'), signinHandler)
router.post('/signout', signout)
// authentication routes
// router.get('/check-auth', checkAccessToken, (req, res) => {
//     res.json({ message: 'User is authenticated', user: req.user })
// })
router.get('/check-auth', refreshTokens, requiredLogin)
router.post('/refresh-tokens', refreshTokens)
export default router
