import { fetchAllProjects } from '../../services/project.service.public.js'
import { uploadProject, fetchUserProjects, deleteProject, editProject } from '../../services/project.service.private.js'
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
// delete project
export const handleDeleteProject = async (req, res) => {
    try {
        const response = await deleteProject(req)
        return getSuccessResponse(res, 200, response)
    } catch (error) {
        return getErrorResponse(res, error.status || 500, error.message)
    }
}
// edit project
export const handleEditProject = async (req, res) => {
    try {
        const editedProject = await editProject(req)
        return getSuccessResponse(res, 200, editedProject)
    } catch (error) {
        return getErrorResponse(res, error.status || 500, error.message)
    }
}
