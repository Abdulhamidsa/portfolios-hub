import { fetchAllProjects } from '../../services/project.service.public.js'
import {
    uploadProject,
    fetchUserProjects,
    deleteProject,
    editProject,
    likeProject,
} from '../../services/project.service.private.js'
import { getErrorResponse, getSuccessResponse } from '../../util/api.response.js'
// fetch all projects
export const handleFetchAllProjects = async (req, res, next) => {
    const userId = req.locals.userId
    try {
        const projects = await fetchAllProjects(userId)
        return res.json(getSuccessResponse(projects))
    } catch (error) {
        next(error)
    }
}
// upload projects
export const handleUploadProjects = async (req, res, next) => {
    const { title, description, projectUrl, imageUrl, projectThumbnail } = req.body
    console.log(req.body)
    const userId = req.locals.userId
    const data = {
        userId,
        title,
        description,
        projectUrl,
        imageUrl,
        projectThumbnail,
    }

    try {
        await uploadProject(data)
        res.json(getSuccessResponse('Project uploaded successfully'))
    } catch (error) {
        next(error)
    }
}

// fetch user projects
export const handleFetchUserProjects = async (req, res, next) => {
    const data = req.locals.userId
    try {
        const projects = await fetchUserProjects(data)
        return res.json(getSuccessResponse(projects))
    } catch (error) {
        next(error)
    }
}
// delete project
export const handleDeleteProject = async (req, res, next) => {
    const { projectId } = req.params
    console.log(projectId)
    try {
        const response = await deleteProject(projectId)
        return res.json(getSuccessResponse(response))
    } catch (error) {
        next(error)
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
// like project
export const handleLikeProject = async (req, res, next) => {
    const projectId = req.params.projectId
    const userId = req.locals.userId
    const data = { projectId, userId }
    try {
        const likedProject = await likeProject(data)
        return res.json(getSuccessResponse(likedProject))
    } catch (error) {
        next(error)
    }
}
