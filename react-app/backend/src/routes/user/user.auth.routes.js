import { Router } from 'express'
import { signup, signin } from '../../../util/auth.js'
import { Credential } from '../../models/credential.model.js'
import { setModel } from '../../../middleware/setModel.js'

const router = Router()
router.post('/register', setModel(Credential), signup)
router.post('/signin', setModel(Credential), signin)
export default router
