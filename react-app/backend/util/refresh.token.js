import { verifyToken, generateNewToken } from './jwt.js'
import { getSuccessResponse, getErrorResponse } from '../util/api.response.js'
export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return getErrorResponse(res, 500, 'Refresh token not found')
    }
    try {
        const payload = await verifyToken(refreshToken)
        const newAccessToken = generateNewToken({ _id: payload.id })
        res.cookie('accessToken', newAccessToken, { httpOnly: false, secure: true, maxAge: 5 * 60 * 1000, path: '/' })
        return getSuccessResponse(res, 200, 'Access token refreshed')
    } catch (error) {
        console.error(error)
        return getErrorResponse(res, 500, 'Server error. Please try again later.')
    }
}
