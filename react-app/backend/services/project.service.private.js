import { Project } from '../src/models/project.model.js'

// upload project
export const uploadProject = async (req) => {
    const { title, description, projectUrl, imageUrl } = req.body
    if (!title || !description || !projectUrl || !imageUrl) {
        throw { message: 'All fields are required', status: 400 }
    }
    const newProject = {
        title,
        description,
        projectUrl,
        projectImage: imageUrl,
        projectThumbnail: imageUrl,
        userId: req.user._id,
    }
    try {
        const createdProject = await Project.create(newProject)
        return createdProject
    } catch (error) {
        throw { message: 'Aan error occurred while uploading project', status: 500 }
    }
}

// fetch user projects
export const fetchUserProjects = async (req) => {
    try {
        const projects = await Project.find({ userId: req.user._id })
        return projects
    } catch (error) {
        throw { message: 'An error occurred while fetching user projects', status: 500 }
    }
}
