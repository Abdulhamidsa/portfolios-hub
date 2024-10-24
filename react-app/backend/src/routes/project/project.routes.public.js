import { Router } from 'express'
import { handleFetchAllProjects } from '../../handlers/project.handlers.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
import { refreshTokens } from '../../../util/refresh.token.js'
const router = Router()
// fetch all projects
router.use(refreshTokens)
router.use(authenticateUser)
router.get('/all', handleFetchAllProjects)
// upload projects
export default router
