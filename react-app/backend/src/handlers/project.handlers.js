import { fetchAllProjects } from '../../services/project.service.public.js'
import {
    uploadProject,
    fetchUserProjects,
    deleteProject,
    editProject,
    likeProject,
} from '../../services/project.service.private.js'
import { getSuccessResponse } from '../../utils/api.response.js'
import mongoose from 'mongoose'

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
    const { title, description, projectUrl, projectImage, projectThumbnail, tags } = req.body
    const userId = req.locals.userId
    const data = {
        userId,
        title,
        description,
        projectUrl,
        projectImage,
        projectThumbnail,
        tags,
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
    const { projectId } = req.query
    try {
        const response = await deleteProject(projectId)
        return res.json(getSuccessResponse(response))
    } catch (error) {
        next(error)
    }
}
// edit project
export const handleEditProject = async (req, res, next) => {
    const { projectId } = req.query
    const { title, description, projectUrl, projectImage, projectThumbnail, tags } = req.body
    const data = {
        projectId,
        title,
        description,
        projectUrl,
        projectImage,
        projectThumbnail,
        tags,
    }
    try {
        const editedProject = await editProject(data)
        return res.json(getSuccessResponse(editedProject))
    } catch (error) {
        next(error)
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
