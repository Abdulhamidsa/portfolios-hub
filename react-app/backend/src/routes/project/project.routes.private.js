import { Router } from 'express'
import {
    handleUploadProjects,
    handleFetchUserProjects,
    handleDeleteProject,
    handleEditProject,
    handleLikeProject,
} from '../../handlers/project.handlers.js'
import { refreshTokens } from '../../../util/refresh.token.js'
import { validZod } from '../../../middleware/valid.zod.js'
import { projectUploadSchema, projectFetchSchema, queryParamsValidator } from '../../../util/validations.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
// import { checkAuthentication } from '../../../middleware/authMiddleware.js'
const router = Router()
router.use(refreshTokens)
router.use(authenticateUser)
// upload project
router.post('/upload', validZod(projectUploadSchema, 'body'), handleUploadProjects)
// user projects route
router.get('/all', validZod(projectFetchSchema, 'query'), handleFetchUserProjects)
// edit project
router.put('/:friendlyId/:projectId', validZod(queryParamsValidator, 'params'), handleEditProject)
// delete project
router.delete('/:projectId', validZod(queryParamsValidator, 'params'), handleDeleteProject)
// like project
router.post('/like/:projectId', handleLikeProject)
export default router
