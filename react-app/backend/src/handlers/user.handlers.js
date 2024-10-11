import { getSuccessResponse, getErrorResponse } from '../../util/api.response.js'
import { getUserProfileService } from '../../services/user.service.js'

export const handleFetchAllProjects = async (req, res) => {
    try {
        const user = await getUserProfileService()
        return res.json(getSuccessResponse(user))
    } catch (error) {
        return res.status(500).json(getErrorResponse('Failed to fetch users'))
    }
}
