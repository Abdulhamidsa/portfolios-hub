import { Router } from 'express'
import {
    handleUploadProjects,
    handleFetchUserProjects,
    handleDeleteProject,
    handleEditProject,
} from '../../handlers/project.handlers.js'
import { checkAuthentication } from '../../../middleware/authMiddleware.js'
const router = Router()

// upload project
router.post('/:friendlyId/projects/upload', checkAuthentication, handleUploadProjects)
// user projects route
router.get('/:friendlyId/projects/all', checkAuthentication, handleFetchUserProjects)
// edit project
router.put('/:friendlyId/projects/:projectId', checkAuthentication, handleEditProject)
// delete project
router.delete('/:friendlyId/projects/:projectId', checkAuthentication, handleDeleteProject)

export default router
