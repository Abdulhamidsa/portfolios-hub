// import bcrypt  from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '../util/jwt.js'
import { Credential } from '../src/models/credential.model.js'
import { User } from '../src/models/user.model.js'
// import { verifyToken } from '../util/jwt.js'
import AppError from '../util/error.handler.js'
// signin service
export const signinService = async (data) => {
    const { email, password } = data
    const userCredential = await Credential.findOne({ email })
    if (!userCredential) {
        throw new AppError('Email not registered', 400)
    }
    if (password !== userCredential.password) {
        throw new AppError('Invalid password', 400)
    }
    const user = await User.findById(userCredential._id)
    if (!user) {
        throw new AppError('User not found', 404)
    }
    const payload = {
        id: user._id,
        userType: user.userType,
        friendlyId: user.friendlyId,
    }
    const [accessToken, refreshToken] = await Promise.all([generateAccessToken(payload), generateRefreshToken(payload)])
    return { accessToken, refreshToken }
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
