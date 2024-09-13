import { getAllProjects } from '../controllers/project.controller.js'
import { getSuccessResponse, getErrorResponse } from '../../util/apiResponse.js'
const getProjects = async (req, res) => {
    try {
        const projects = await getAllProjects()
        return getSuccessResponse(projects, 200)(res)
    } catch (error) {
        return getErrorResponse(500)(res)
    }
}
export default getProjects
