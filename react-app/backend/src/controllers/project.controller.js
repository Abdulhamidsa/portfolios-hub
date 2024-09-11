import { Project } from '../models/project.model.js'

export const getAllProjects = async () => {
    try {
        return await Project.find()
    } catch (error) {
        return Promise.reject(error)
    }
}
