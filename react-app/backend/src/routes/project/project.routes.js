import { Router } from 'express'
import getProjects from '../project.api.js'
import { requiresLogin } from '../../../util/auth.js'
const router = Router()

router.get('/projects_home', requiresLogin, getProjects)
export default router
