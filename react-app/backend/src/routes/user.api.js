import express from 'express'
import { signup, signin } from '../../util/auth.js'
import { Credential } from '../models/auth.model.js'
import { setModel } from '../../middleware/setModel.js'

const router = express.Router()
router.use(setModel(Credential))
router.post('/register', signup)
router.post('/login', signin)

export default router
