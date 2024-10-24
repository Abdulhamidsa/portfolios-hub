import { Project } from '../src/models/project.model.js'
import AppError from '../util/error.handler.js'
import { Like } from '../src/models/likes.modal.js'
// upload project
export const uploadProject = async (data) => {
    const { title, description, projectUrl, imageUrl, userId, projectThumbnail } = data
    const newProject = {
        userId,
        title,
        description,
        projectUrl,
        projectImage: imageUrl,
        projectThumbnail,
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
        // Step 1: Fetch projects created by the user
        const projects = await Project.find({ userId: userId })

        // Step 2: Fetch like counts for each project
        const projectIds = projects.map((project) => project._id)
        const likeCounts = await Like.aggregate([
            { $match: { projectId: { $in: projectIds } } },
            { $group: { _id: '$projectId', count: { $sum: 1 } } },
        ])

        // Step 3: Create a map for like counts
        const likeMap = {}
        likeCounts.forEach((like) => {
            likeMap[like._id.toString()] = like.count
        })

        // Step 4: Attach like count to each project
        const projectsWithLikes = projects.map((project) => ({
            ...project.toObject(),
            likesCount: likeMap[project._id.toString()] || 0, // Default to 0 if no likes
        }))

        return projectsWithLikes
    } catch (error) {
        throw new AppError(error.message || 'An error occurred while fetching projects', 500)
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
