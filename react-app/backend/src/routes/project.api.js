import { getAllProjects } from '../controllers/project.controller.js'
import { getSuccessResponse, getErrorResponse } from '../../util/apiResponse.js'

const getProjects = async (req, res) => {
    try {
        const projects = await getAllProjects()
        res.status(200).json(getSuccessResponse(projects))
    } catch (error) {
        res.status(500).json(getErrorResponse(error, 'GET_PROJECTS_ERROR'))
    }
}

export default getProjects
