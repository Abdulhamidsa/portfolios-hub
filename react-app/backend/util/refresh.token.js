import { verifyToken, generateAccessToken, generateRefreshToken } from '../util/jwt.js'
import { getSuccessResponse, getErrorResponse } from '../util/api.response.js'
import { Credential } from '../src/models/credential.model.js'
import { User } from '../src/models/user.model.js'

export const refreshTokens = async (req, res, next) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        return res.status(403).json(getErrorResponse('No refresh token provided.'))
    }
    try {
        const payload = await verifyToken(refreshToken, 'refresh')
        const userCredential = await Credential.findById(payload.id)
        if (!userCredential) {
            return res.json(getErrorResponse('User not found in credentials.'))
        }
        const user = await User.findById(userCredential.id)
        if (!user) {
            return res.json(getErrorResponse('User not found in users.'))
        }
        const accessTokenPayload = {
            id: userCredential._id,
            friendlyId: user.friendlyId,
            userRole: user.userRole,
        }
        const newAccessToken = generateAccessToken(accessTokenPayload)
        const newRefreshToken = generateRefreshToken({ id: userCredential._id })

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
        res.cookie('isAuthenticated', 'true', {
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
