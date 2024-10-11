import { User } from '../src/models/user.model.js'

export const getUserProfileService = async (req) => {
    const userId = '67064e7ebad0b914cbcc6df1'
    try {
        const user = await User.findById(userId).select('-password').exec()
        if (!user) {
            throw { message: 'User not found', status: 404 }
        }
        return user
    } catch (error) {
        throw { message: error.message || 'Error fetching user profile', status: error.status || 500 }
    }
}
