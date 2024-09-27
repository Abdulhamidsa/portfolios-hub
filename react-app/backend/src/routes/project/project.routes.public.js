import { Router } from 'express'
import { handleFetchAllProjects } from '../../handlers/project.handlers.js'
const router = Router()
// fetch all projects
router.get('/all', handleFetchAllProjects)
// upload projects
export default router
