import { Router } from 'express'
import getProjects from '../project.api.js'
const router = Router()
router.get('/', getProjects)
export default router
