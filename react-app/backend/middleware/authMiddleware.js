import { getErrorResponse } from '../util/api.response.js'
import { checkAuthenticationService } from '../services/auth.service.js'
import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' })
    }
}

// check authentication middleware
export const checkAuthentication = async (req, res, next) => {
    try {
        await checkAuthenticationService(req)
        // continue to the next middleware
        next()
    } catch (error) {
        if (error.message !== 'Token has expired. Please log in again.') {
        }
        return getErrorResponse(res, error.status || 401, error.message || 'An error occurred')
    }
}
