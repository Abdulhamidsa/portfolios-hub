import { Router } from 'express'
// import { getAllProjects } from '../../controllers/project.controller.js'
// import { getSuccessResponse, getErrorResponse } from '../../../util/apiResponse.js'
import getProjects from '../project.api.js'

const router = Router()

router.get('/', getProjects)

export default router
