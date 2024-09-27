import { Project } from '../src/models/project.model.js'

// upload project
export const uploadProject = async (req, res) => {
    try {
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

        const createdProject = await Project.create(newProject)
        return createdProject
    } catch (error) {
        throw error
    }
}

// fetch user projects

export const fetchUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id })
        return projects
    } catch (error) {
        throw error
    }
}
