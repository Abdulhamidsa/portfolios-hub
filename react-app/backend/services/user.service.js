import { User } from '../src/models/user.model.js'
import { Credential } from '../src/models/credential.model.js'
import AppError from '../util/error.handler.js'

export const getUserProfileService = async (userId) => {
    try {
        const userInfo = await User.findById(userId).select('-_id -__v -active -updatedAt')
        const userCredential = await Credential.findById(userId).select('-password -_id -__v')
        if (!userInfo) {
            throw new AppError('User not found', 404)
        }
        if (!userCredential) {
            throw new AppError('User credential not found', 404)
        }
        const user = { userInfo, userCredential }
        return user
    } catch (error) {
        throw new AppError(error.message || 'Error fetching user profile', error.status || 500)
    }
}

export const editUserProfileService = async (userId, data) => {
    try {
        const updateData = {}

        if (data.profilePicture) {
            updateData['personalInfo.profilePicture'] = data.profilePicture
        }
        if (data.bio) {
            updateData['personalInfo.bio'] = data.bio
        }
        if (data.profession) {
            updateData['personalInfo.profession'] = data.profession
        }
        if (data.country) {
            updateData['personalInfo.country'] = data.country
        }
        if (data.links && Array.isArray(data.links)) {
            updateData['personalInfo.links'] = data.links
        }
        const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true })

        if (!user) {
            throw { message: 'User not found', status: 404 }
        }

        return user
    } catch (error) {
        throw { message: error.message || 'Error editing user profile', status: error.status || 500 }
    }
}
export const getAllUsersService = async () => {
    try {
        const users = await User.find({}).select('-_id -__v -active -updatedAt -deletedAt -userRole -approved ')
        return users
    } catch (error) {
        throw new AppError(error.message || 'Error fetching all users', error.status || 500)
    }
}
