import { Router } from 'express'
import getProjects from '../project.api.js'
import { setModel } from '../../../middleware/setModel.js'
import { Credential } from '../../models/credential.model.js'
import { requiresLogin } from '../../../util/auth.js'
const app = Router()

const router = Router()

app.use(setModel(Credential))

router.get('/projects_home', requiresLogin, getProjects)
export default router
