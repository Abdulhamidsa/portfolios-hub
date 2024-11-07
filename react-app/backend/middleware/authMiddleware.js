// import { getErrorResponse } from '../util/api.response.js'
// import { checkAuthenticationService } from '../services/auth.service.js'

import { verifyToken } from '../utils/jwt.js'
import AppError from '../utils/error.handler.js'
export const authenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        return next(new AppError('Unauthorized: No access token provided', 401))
    }
    try {
        const payload = await verifyToken(accessToken, 'access')
        req.locals = { userId: payload.id }
        next()
    } catch (error) {
        return next(new AppError(error.message, error.status))
    }
}
