import { Router } from 'express'
import { signup, signin } from '../../../util/auth.js'
const router = Router()
router.post('/register', signup)
router.post('/signin', signin)
export default router
