import { Router } from 'express'
import { getUserProfile } from '../../handlers/user.controller.js'
import { checkAuthentication } from '../../../util/auth.js'
const router = Router()
router.get('/profile', checkAuthentication, getUserProfile)
export default router
