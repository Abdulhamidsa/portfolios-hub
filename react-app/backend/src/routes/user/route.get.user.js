import { Router } from 'express'
import { getUserProfile } from '../../handlers/user.handlers.js'
import { checkAuthentication } from '../../../middleware/authMiddleware.js'
const router = Router()
router.get('/profile', checkAuthentication, getUserProfile)
export default router
