import { Project } from '../src/models/project.model.js'
import AppError from '../util/error.handler.js'

// upload project
export const uploadProject = async (data) => {
    const { title, description, projectUrl, imageUrl, userId } = data
    const newProject = {
        userId,
        title,
        description,
        projectUrl,
        projectImage: imageUrl,
        projectThumbnail: imageUrl,
    }
    try {
        const createdProject = await Project.create(newProject)
        return createdProject
    } catch (error) {
        throw new AppError(error || 'An error occurred while uploading project', 500)
    }
}
// project exist
// valid image
// upload image and store in cloud storage

// fetch user projects
export const fetchUserProjects = async (data) => {
    const userId = data
    if (!userId) {
        throw new AppError('User ID is required', 400)
    }
    try {
        const projects = await Project.find({ userId: userId })
        return projects
    } catch (error) {
        throw new AppError(error || 'An error occurred while fetching projects', 500)
    }
}
// delete project
export const deleteProject = async (data) => {
    const { projectId } = data
    try {
        const project = await Project.findByIdAndDelete(projectId)
        if (!project) {
            throw { message: 'Project not found', status: 404 }
        }
        return { message: 'Project deleted successfully' }
    } catch (error) {
        throw { message: error.message || 'An error occurred while deleting project', status: 500 }
    }
}
// edit project
export const editProject = async (req) => {
    const { projectId } = req.params
    const { title, description, projectUrl, imageUrl } = req.body
    if (!title || !description || !projectUrl || !imageUrl) {
        throw { message: 'All fields are required', status: 400 }
    }
    try {
        const project = await Project.findById(projectId)
        if (!project) {
            throw { message: 'Project not found', status: 404 }
        }
        project.title = title
        project.description = description
        project.projectUrl = projectUrl
        project.projectImage = imageUrl
        project.projectThumbnail = imageUrl
        const updatedProject = await project.save()
        return updatedProject
    } catch (error) {
        throw { message: error.message || 'An error occurred while updating project', status: 500 }
    }
}
