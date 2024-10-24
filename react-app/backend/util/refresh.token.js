import { verifyToken, generateAccessToken, generateRefreshToken } from '../util/jwt.js'
import { getErrorResponse } from '../util/api.response.js'
import { User } from '../src/models/user.model.js'

export const refreshTokens = async (req, res, next) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.clearCookie('isAuthorized')
        return res.status(403).json(getErrorResponse('No refresh token provided.'))
    }
    try {
        const payload = await verifyToken(refreshToken, 'refresh')
        const user = await User.findById(payload.id)
        if (!user) {
            return res.json(getErrorResponse('User not found in users.'))
        }
        const accessTokenPayload = {
            id: user._id,
            friendlyId: user.friendlyId,
            userRole: user.userRole,
        }
        const newAccessToken = generateAccessToken(accessTokenPayload)
        const newRefreshToken = generateRefreshToken({ id: user._id })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: process.env.HTTP_ONLY,
            secure: process.env.SECURE,
            maxAge: process.env.REFRESH_TOKEN_EXPIRY || 604800000, // 7 days
            path: '/',
            sameSite: 'Strict',
        })
        res.cookie('accessToken', newAccessToken, {
            httpOnly: process.env.HTTP_ONLY,
            secure: process.env.SECURE,
            maxAge: process.env.ACCESS_TOKEN_EXPIRY || 900000, // 15 minutes
            path: '/',
            sameSite: 'Strict',
        })
        res.cookie('isAuthorized', 'true', {
            httpOnly: false,
            secure: false,
            maxAge: process.env.ACCESS_TOKEN_EXPIRY || 900000, // 15 minutes
            path: '/',
            sameSite: 'Strict',
        })

        req.accessToken = newAccessToken
        req.refreshToken = newRefreshToken
        next()
    } catch (error) {
        return res.json(getErrorResponse(error.message))
    }
}
