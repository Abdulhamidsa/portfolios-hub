import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js'
import { Credential } from '../src/models/credential.model.js'
import { User } from '../src/models/user.model.js'
import { generateFriendlyId, hashPassword } from '../utils/herlper.js'
import AppError from '../utils/error.handler.js'
import { getSuccessResponse } from '../utils/api.response.js'
// signin service
export const signinService = async (data) => {
    const { email, password } = data
    const userCredential = await Credential.findOne({ email })

    if (!userCredential) {
        throw new AppError('Email not registered', 400)
    }

    const isPasswordValid = await bcrypt.compare(password, userCredential.password)
    if (!isPasswordValid) {
        throw new AppError('Invalid password', 400)
    }

    const user = await User.findById(userCredential._id)
    if (!user) {
        throw new AppError('User not found', 404)
    }

    try {
        const payload = {
            id: user._id,
            userType: user.userType,
            friendlyId: user.friendlyId,
        }

        const [accessToken, refreshToken] = await Promise.all([
            generateAccessToken(payload),
            generateRefreshToken(payload),
        ])

        return { accessToken, refreshToken }
    } catch (error) {
        console.error('Error generating tokens:', error)
        throw new AppError(error.message || 'An error occurred while signing in', 500)
    }
}

// signout service
export const signoutService = async (req) => {
    try {
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken

        if (!accessToken && !refreshToken) {
            return { message: 'User not logged in' }
        }
        if (accessToken && refreshToken) {
            req.res.clearCookie('accessToken')
            req.res.clearCookie('refreshToken')
        }
        return { message: 'Signout successful' }
    } catch (error) {
        throw { message: error.message || 'An error occurred while signing out', status: 500 }
    }
}
// signup service

export const signupService = async (data) => {
    const { firstName, lastName, username, email, password, profession, country, links, profilePicture } = data
    const session = await mongoose.startSession()
    session.startTransaction()
    const existingCredential = await Credential.findOne({ $or: [{ email }, { username }] })
    if (existingCredential) {
        throw new AppError('Email or username already registered', 400)
    }
    try {
        const newCredential = await Credential.create({
            _id: new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
        })

        const newUser = await User.create({
            _id: newCredential._id,
            friendlyId: generateFriendlyId(firstName),
            personalInfo: {
                profession,
                country,
                links,
                username,
                profilePicture,
            },
        })
        return getSuccessResponse('User registered successfully')
    } catch (error) {
        throw new AppError(error.message || 'An error occurred while registering user', 500)
    }
}
