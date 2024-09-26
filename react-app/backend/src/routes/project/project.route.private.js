import { Router } from 'express'
import { handleUploadProjects } from '../../controllers/project.controller.js'
import { checkAuthentication } from '../../../util/auth.js'
const router = Router()

// upload project
// router.get('/:friendlyId/projects', checkAuthentication, handleGetUserProjects)
router.post('/:friendlyId/projects/upload', checkAuthentication, handleUploadProjects)

export default router
