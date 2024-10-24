import { Router } from 'express'
import { handleFetchUserProfile, handleEditUserProfile, handleFetchAllUsers } from '../../handlers/user.handlers.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
import { refreshTokens } from '../../../util/refresh.token.js'
const router = Router()
router.use(refreshTokens)
router.use(authenticateUser)
router.get('/profile', handleFetchUserProfile)
router.post('/update', handleEditUserProfile)
router.get('/all', handleFetchAllUsers)
export default router
