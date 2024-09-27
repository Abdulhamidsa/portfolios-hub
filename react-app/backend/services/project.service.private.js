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
// delete project
export const deleteProject = async (req) => {
    const { projectId } = req.params
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
