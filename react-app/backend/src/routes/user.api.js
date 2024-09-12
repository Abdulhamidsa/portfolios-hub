import express from 'express'
import { signup, signin } from '../../util/auth.js'
import { Credential } from '../models/auth.model.js'

const router = express.Router()
router.post('/register', Credential, signup)
router.post('/login', Credential, signin)

export default router
