import { verifyToken, generateAccessToken, generateRefreshToken } from '../util/jwt.js'
import { getSuccessResponse, getErrorResponse } from '../util/api.response.js'
import { Credential } from '../src/models/credential.model.js'
import { User } from '../src/models/user.model.js'

export const refreshTokens = async (req, res, next) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        return res.json(getErrorResponse('No refresh token provided.'))
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
        const accessToken = generateAccessToken(accessTokenPayload)
        const newRefreshToken = generateRefreshToken({ id: userCredential._id })
        res.cookie('accessToken', accessToken, { httpOnly: true })
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true })
        req.accessToken = accessToken
        req.refreshToken = newRefreshToken
        next()
    } catch (error) {
        return res.json(getErrorResponse(error.message))
    }
}
