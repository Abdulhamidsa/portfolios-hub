import { fetchAllProjects } from '../../services/project.service.public.js'
import { uploadProject, fetchUserProjects } from '../../services/project.service.private.js'
import { getErrorResponse, getSuccessResponse } from '../../util/api.response.js'

// fetch all projects
export const handleFetchAllProjects = async (req, res) => {
    try {
        const projects = await fetchAllProjects()
        return getSuccessResponse(res, 200, projects)
    } catch (error) {
        return getErrorResponse(res, error.status, error.message)
    }
}
// upload projects
export const handleUploadProjects = async (req, res) => {
    try {
        const upload = await uploadProject(req)
        return getSuccessResponse(res, 200, upload)
    } catch (error) {
        return getErrorResponse(res, error.status, error.message)
    }
}
// fetch user projects
export const handleFetchUserProjects = async (req, res) => {
    try {
        const projects = await fetchUserProjects(req)
        return getSuccessResponse(res, 200, projects)
    } catch (error) {
        return getErrorResponse(res, error.status, error.message)
    }
}
