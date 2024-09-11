import { Router } from 'express'
import { getAllProjects } from '../../controllers/project.controller.js'
import { getSuccessResponse, getErrorResponse } from '../../../util/apiResponse.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const projects = await getAllProjects()
        res.json(getSuccessResponse(projects))
    } catch (error) {
        res.json(getErrorResponse(error, 'GET_PROJECTS_ERROR'))
    }
})

export default router
