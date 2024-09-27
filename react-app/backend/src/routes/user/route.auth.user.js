import { Router } from 'express'
import { signup, signin, signout } from '../../../util/auth.js'
import { checkAuthentication } from '../../../middleware/authMiddleware.js'
import { refreshAccessToken } from '../../../util/refresh.token.js'
const router = Router()
router.post('/register', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/check-auth', checkAuthentication)
router.get('/refresh-access-token', refreshAccessToken)
export default router
