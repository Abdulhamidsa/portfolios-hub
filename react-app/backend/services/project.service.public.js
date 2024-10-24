import { Project } from '../src/models/project.model.js'
import AppError from '../util/error.handler.js'
import { Like } from '../src/models/likes.modal.js'

// fetch projects
export const fetchAllProjects = async (userId) => {
    if (!userId) {
        throw new AppError('User ID is required', 400)
    }
    try {
        const projects = await Project.find().populate(
            'userId',
            'personalInfo.profilePicture personalInfo.username personalInfo.profession -_id'
        )
        const likedProjects = await Like.find({ userId }).select('projectId')
        const likedProjectIds = likedProjects.map((like) => like.projectId.toString())

        const projectsWithLikedStatus = await Promise.all(
            projects.map(async (project) => {
                const likeCount = await Like.countDocuments({ projectId: project._id })

                return {
                    ...project.toObject(),
                    likedByUser: likedProjectIds.includes(project._id.toString()),
                    likeCount: likeCount,
                }
            })
        )
        return projectsWithLikedStatus
    } catch (error) {
        console.error('Error fetching projects:', error)
        throw new AppError(error.message || 'An error occurred while fetching projects', 500)
    }
}
