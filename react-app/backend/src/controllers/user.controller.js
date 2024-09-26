import { getSuccessResponse, getErrorResponse } from '../../util/api.response.js'
import { getUserProfileService } from '../../services/user.service.js'

export const getUserProfile = async (req, res) => {
    try {
        const user = await getUserProfileService(req)
        return getSuccessResponse(res, 200, user)
    } catch (error) {
        return getErrorResponse(res, error.status || 500, error.message || 'Failed to fetch users')
    }
}
