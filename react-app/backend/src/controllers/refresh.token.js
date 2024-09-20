import { verifyToken, generateNewToken } from '../../util/jwt.js'
import { getSuccessResponse, getErrorResponse } from '../../util/apiResponse.js'
export const refreshAccessToeken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return getErrorResponse('Refresh token not found', 404)(res)
    }
    try {
        const payload = await verifyToken(refreshToken)
        const newAccessToken = generateNewToken({ _id: payload.id })
        res.cookie('accessToken', newAccessToken, { httpOnly: false, secure: true, maxAge: 5 * 60 * 1000, path: '/' })
        return getSuccessResponse('Access token refreshed', 200)(res)
    } catch (error) {
        console.error(error)
        return getErrorResponse('Server error. Please try again later.', 500)(res)
    }
}
