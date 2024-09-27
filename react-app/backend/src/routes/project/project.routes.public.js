import { Router } from 'express'
import { handleFetchAllProjects } from '../../handlers/project.controller.js'
const router = Router()
// fetch all projects
router.get('/all', handleFetchAllProjects)
// upload projects
export default router
