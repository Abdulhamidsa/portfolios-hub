import { Router } from 'express'
import { handleUploadProjects, handleFetchUserProjects } from '../../handlers/project.handlers.js'
import { checkAuthentication } from '../../../util/auth.js'
const router = Router()

// user projects route
router.get('/:friendlyId/projects/all', checkAuthentication, handleFetchUserProjects)
// upload project
router.post('/:friendlyId/projects/upload', checkAuthentication, handleUploadProjects)

export default router
