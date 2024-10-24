import { getSuccessResponse } from '../../util/api.response.js'
import { getUserProfileService, editUserProfileService, getAllUsersService } from '../../services/user.service.js'

export const handleFetchUserProfile = async (req, res, next) => {
    const userId = req.locals.userId
    try {
        const user = await getUserProfileService(userId)
        return res.json(getSuccessResponse(user))
    } catch (error) {
        next(error)
    }
}

export const handleEditUserProfile = async (req, res, next) => {
    const userId = req.locals.userId
    const data = req.body
    console.log(data)
    try {
        const user = await editUserProfileService(userId, data)
        return res.json(getSuccessResponse(user))
    } catch (error) {
        next(error)
    }
}
export const handleFetchAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService()
        return res.json(getSuccessResponse(users))
    } catch (error) {
        next(error)
    }
}
