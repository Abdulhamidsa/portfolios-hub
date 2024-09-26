import { Credential } from '../src/models/credential.model.js'
import { requiredFields } from '../config/register.data.config.js'
import bcrypt from 'bcryptjs'
import { getSuccessResponse, getErrorResponse } from '../util/api.response.js'
import { signinService } from '../services/auth.service.js'
import { checkAuthenticationService } from '../services/auth.service.js'
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
export const signin = async (req, res) => {
    try {
        const signIn = await signinService(req, res)
        return getSuccessResponse(res, 200, signIn)
    } catch (error) {
        console.error(error)
        return getErrorResponse(res, error.status || 500, error.message || 'an error occurred')
    }
}
// check authentication handler
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
