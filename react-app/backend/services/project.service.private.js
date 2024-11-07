import { Project } from '../src/models/project.model.js'
import AppError from '../utils/error.handler.js'
import { Like } from '../src/models/likes.modal.js'
import mongoose from 'mongoose'
// upload project
export const uploadProject = async (data) => {
    const { title, description, projectUrl, projectImage, userId, projectThumbnail, tags } = data
    const newProject = {
        _id: new mongoose.Types.ObjectId(),
        userId,
        title,
        description,
        projectUrl,
        projectImage,
        projectThumbnail,
        tags,
    }
    try {
        const createdProject = await Project.create(newProject)
        return createdProject
    } catch (error) {
        throw new AppError(error.message || 'An error occurred while uploading project', error.status || 500)
    }
}

// project exist
// valid image
// upload image and store in cloud storage

// fetch user projects
export const fetchUserProjects = async (userId) => {
    if (!userId) {
        throw new AppError('User ID is required', 400)
    }
    try {
        const projects = await Project.find({ userId: userId }).select('-__v -userId')
        const projectsWithLikes = await Promise.all(
            projects.map(async (project) => {
                const likesCount = await Like.countDocuments({ projectId: project._id })
                return {
                    ...project.toObject(),
                    likesCount,
                }
            })
        )

        return projectsWithLikes
    } catch (error) {
        throw new AppError(error.message || 'An error occurred while fetching projects', 500)
    }
}

// delete project
export const deleteProject = async (data) => {
    const projectId = data
    try {
        const project = await Project.findByIdAndDelete(projectId)
        if (!project) {
            throw new AppError('Project not found', 404)
        }
        return { message: 'Project deleted successfully' }
    } catch (error) {
        throw new AppError(error.message || 'An error occurred while deleting the project', 500)
    }
}
// edit project
export const editProject = async (data) => {
    // object destructuring to get projectId and rest of the data
    const { projectId, ...updateData } = data
    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, {
            new: true,
        })
        if (!updatedProject) {
            throw new AppError('Project not found', 404)
        }
        return updatedProject
    } catch (error) {
        throw new AppError(error.message || 'An error occurred while updating the project', 500)
    }
}
// like project
export const likeProject = async (data) => {
    const { projectId, userId } = data
    try {
        const project = await Project.findById(projectId)
        if (!project) {
            throw { message: 'Project not found', status: 404 }
        }
        const existingLike = await Like.findOneAndDelete({ projectId, userId })

        if (existingLike) {
            return { message: 'Like removed', liked: false }
        } else {
            const newLike = new Like({
                userId,
                projectId,
            })
            await newLike.save()
            return { message: 'Project liked', liked: true }
        }
    } catch (error) {
        throw { message: error.message || 'An error occurred while liking the project', status: 500 }
    }
}
