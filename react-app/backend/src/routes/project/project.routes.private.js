import { Router } from 'express'
import {
    handleUploadProjects,
    handleFetchUserProjects,
    handleDeleteProject,
    handleEditProject,
    handleLikeProject,
} from '../../handlers/project.handlers.js'
import { refreshTokens } from '../../../utils/refresh.token.js'
import { validZod } from '../../../middleware/valid.zod.js'
import { projectUploadSchema, projectFetchSchema, queryParamsValidator } from '../../../utils/validations.js'
import { authenticateUser } from '../../../middleware/authMiddleware.js'
// import { checkAuthentication } from '../../../middleware/authMiddleware.js'
const router = Router()
// router.use(refreshTokens)
// router.use(authenticateUser)
// upload project
router.post('/', validZod(projectUploadSchema, 'body'), handleUploadProjects)
// user projects route
router.get('/', validZod(projectFetchSchema, 'body'), handleFetchUserProjects)
// edit project
router.put('/', validZod(queryParamsValidator, 'query'), validZod(projectUploadSchema, 'body'), handleEditProject)
// delete project
router.delete('/', validZod(queryParamsValidator, 'query'), handleDeleteProject)
// like project
router.post('/like/:projectId', handleLikeProject)

export default router
