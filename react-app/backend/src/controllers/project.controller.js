import { fetchAllProjects } from '../../services/project.service.public.js'
import { uploadProject } from '../../services/project.service.private.js'
import { getErrorResponse, getSuccessResponse } from '../../util/api.response.js'

// fetch all projects
export const handleFetchAllProjects = async (req, res) => {
    try {
        const projects = await fetchAllProjects()
        return getSuccessResponse(res, 200, projects)
    } catch (error) {
        return getErrorResponse(res, error.status || 500, error.message || 'an error occurred while fetching projects')
    }
}
// upload projects
export const handleUploadProjects = async (req, res) => {
    try {
        const upload = await uploadProject(req)
        return getSuccessResponse(res, 200, upload)
    } catch (error) {
        return getErrorResponse(res, error.status || 500, error.message || 'an error occurred while uploading project')
    }
}
