import { Credential } from '../src/models/credential.model.js'
import { requiredFields } from '../config/register.data.config.js'
import bcrypt from 'bcryptjs'
import { getSuccessResponse, getErrorResponse } from '../util/api.response.js'
import { signinService } from '../services/auth.service.js'
import { verifyToken } from '../util/jwt.js'

export const signup = async (req, res) => {
    const { firstName, lastName, username, dateOfBirth, email, mobile, userId } = req.body
    for (const { field, required, message } of requiredFields) {
        if (required && !req.body[field]) {
            return getErrorResponse(res, 400, message)
        }
    }
    try {
        const [userByMobile, userByName, userByEmail] = await Promise.all([
            Credential.findOne({ mobile }),
            Credential.findOne({ username }),
            Credential.findOne({ email }),
        ])

        if (userByName || userByEmail || userByMobile) {
            const message = userByName
                ? 'Username is already in use'
                : userByEmail
                  ? 'Email is already in use'
                  : 'Mobile number is already in use'

            return getErrorResponse(res, 409, message)
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await Credential.create({
            userId,
            firstName,
            lastName,
            username,
            dateOfBirth,
            password: hashedPassword,
            email,
            mobile,
        })

        return getSuccessResponse(res, 201, newUser)
    } catch (error) {
        console.error(error)
        return getErrorResponse(res, 500, 'Server error. Please try again later.')
    }
}

// signin handler
export const signinHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const data = { email, password }
        const { accessToken, refreshToken, isAuthorized } = await signinService(data)
        res.cookie('accessToken', accessToken, {
            httpOnly: process.env.HTTP_ONLY,
            secure: process.env.SECURE,
            maxAge: process.env.ACCESS_TOKEN_EXPIRY || 900000, // 15 minutes
            path: '/',
            sameSite: 'Strict',
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: process.env.HTTP_ONLY,
            secure: process.env.SECURE,
            maxAge: process.env.REFRESH_TOKEN_EXPIRY || 604800000, // 7 days
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
        return res.json(getSuccessResponse(accessToken))
    } catch (error) {
        next(error)
    }
}
// signout handler
export const signout = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken
        if (!accessToken && !refreshToken) {
            return res.json(getSuccessResponse('User not logged in'))
        }
        if (accessToken && refreshToken) {
            req.res.clearCookie('accessToken')
            req.res.clearCookie('refreshToken')
        }
        return res.json(getSuccessResponse('User signed out'))
    } catch (error) {
        next(error)
    }
}
// required login handler and not a middleware
export const requiredLogin = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json(getErrorResponse('Unauthorized: No access token provided'))
    }
    try {
        const payload = await verifyToken(token, 'access')
        return res.json(getSuccessResponse('user authenticated'))
    } catch (error) {
        if (error.message !== 'Token is invalid') {
            console.error('Token verification error:', error)
        }
    }
}
