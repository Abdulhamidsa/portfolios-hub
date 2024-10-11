import { Project } from '../src/models/project.model.js'

// fetch projects
export const fetchAllProjects = async () => {
    try {
        const projects = await Project.find()
        return projects
    } catch (error) {
        throw new AppError('An error occurred while fetching projects', 500)
    }
}
