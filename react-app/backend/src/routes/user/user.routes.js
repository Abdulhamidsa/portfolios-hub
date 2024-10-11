import { Router } from 'express'
import { handleFetchAllProjects } from '../../handlers/user.handlers.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
import { refreshTokens } from '../../../util/refresh.token.js'
const router = Router()
router.get('/profile', refreshTokens, authenticateUser, handleFetchAllProjects)
export default router
