import bcrypt from 'bcryptjs'
import { generateNewToken, generateRefreshToken } from '../util/jwt.js'
import { Credential } from '../src/models/credential.model.js'
import { User } from '../src/models/user.model.js'
import { verifyToken } from '../util/jwt.js'

// signin service
export const signinService = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw { message: 'email and password are required', status: 400 }
    }
    try {
        const user = await Credential.findOne({ email })
        if (!user) {
            throw { message: 'Email not registered', status: 400 }
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password)
        if (password !== user.password) {
            throw { message: 'Invalid email or password', status: 400 }
        }
        const accessToken = generateNewToken(user)
        const refreshToken = generateRefreshToken(user)
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, path: '/' })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, path: '/' })

        return { accessToken }
    } catch (error) {
        throw error
    }
}
// required  login service

export const checkAuthenticationService = async (req) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        throw { message: 'Not authorized', status: 401 }
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = await verifyToken(token)
        console.log('payload', payload)
        const userCredential = await Credential.findById(payload.id).select('-password').lean().exec()
        if (!userCredential) {
            throw { message: 'User not found', status: 404 }
        }
        const user = await User.findOne({ _id: userCredential.userId }).select('friendlyId').lean().exec()
        if (!user) {
            throw { message: 'User profile not found', status: 404 }
        }
        req.user = { ...userCredential, friendlyId: user.friendlyId }
    } catch (error) {
        throw error
    }
}
