import { newToken, verifyToken } from './jwt.js'
import { Credential } from '../src/models/credential.model.js'
import { requiredFields } from '../config/register.data.config.js'
import bcrypt from 'bcryptjs'
import { getSuccessResponse, getErrorResponse } from '../util/apiResponse.js'
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
    const { firstName, lastName, username, dateOfBirth, password, email, mobile, userId } = req.body

    for (const { field, required, message } of requiredFields) {
        if (required && !req.body[field]) {
            return res.status(400).json({ message })
        }
    }

    try {
        const [userByMobile, userByName, userByEmail] = await Promise.all([
            Credential.findOne({ mobile: mobile || '' }),
            Credential.findOne({ username }),
            Credential.findOne({ email }),
        ])

        if (userByName) {
            return getErrorResponse('Username is already in use', 409)(res)
        }
        if (userByEmail) {
            return getErrorResponse('Email is already in use', 409)(res)
        }
        if (userByMobile) {
            return getErrorResponse('Mobile number is already in use', 409)(res)
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

        return getSuccessResponse('user created succecfully', 200)(res)
    } catch (error) {
        console.error(error)
        return res.status(500).json(getErrorResponse('Server error. Please try again later.', 500))
    }
}

const signin = async (req, res) => {
    const Model = req.model
    const { mobile, password } = req.body
    if (!mobile || !password) {
        return res.status(400).json({ message: 'Mobile and password are required.' })
    }
    try {
        const user = await Model.findOne({ mobile })
        if (!user) {
            return res.status(404).json({ status: 'failed', message: 'Mobile number is not registered.' })
        }
        if (user.active === false) {
            return res.status(403).json({ status: 'failed', message: 'Account is suspended. Please contact admin.' })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ status: 'failed', message: 'Invalid password.' })
        }
        const userData = await Model.findOne({ mobile }).select('name mobile photo')
        const accesstoken = newToken(user)
        console.log('accesstoken', accesstoken)
        res.cookie('token', accesstoken, { httpOnly: true, secure: true })
        const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        // return res.status(200).json({ status: 'ok', data: userData, token: accesstoken })
        return getSuccessResponse({ userData, accesstoken }, 200)(res)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error. Please try again later.' })
    }
}
const requiresLogin = async (req, res, next) => {
    const Model = req.model
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'User not authorized' })
    }
    let token = req.headers.authorization.split('Bearer ')[1]
    if (!token) {
        return res.status(401).send({ message: 'Token not found' })
    }
    try {
        const payload = await verifyToken(token)
        const user = await Model.findById(payload.id).select('-password').lean().exec()
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).send({ message: 'Not Authorized' })
    }
}

// const requiresAdminLogin = async (req, res, next) => {
//     const Model = req.model
//     if (!req.headers.authorization) {
//         return res.status(401).send({ message: 'User not authorized' })
//     }
//     let token = req.headers.authorization.split('Bearer ')[1]
//     if (!token) {
//         return res.status(401).send({ message: 'Token not found' })
//     }
//     try {
//         const payload = await verifyToken(token)
//         const user = await Model.findOne({ _id: payload.id, userType: 'admin' }).select('-password').lean().exec()
//         req.user = user
//         next()
//     } catch (e) {
//         console.log(e)
//         return res.status(401).send({ message: 'Not Authorized' })
//     }
// }

// const adminSignin = async (req, res) => {
//     const Model = req.model

//     if (!req.body.email || !req.body.password) return res.status(400).send({ message: 'Email and password required' })
//     const user = await Model.findOne({ email: req.body.email }).exec()
//     if (!user) {
//         return res.status(400).send({ message: 'Email not registered' })
//     }

//     try {
//         const match = await user.checkPassword(req.body.password)

//         if (!match || user.userType === 'user') {
//             return res.status(401).send({ message: 'Invalid Email or Password' })
//         }

//         if (!user.approved) {
//             return res.status(401).send({ message: 'Please contact admin to approve ur account' })
//         }
//         const token = newToken(user)

//         return res.status(201).send({ status: 'ok', token: token })
//     } catch (e) {
//         console.log(e)
//         return res.status(401).send({ message: 'Not Authorized' })
//     }
// }

// const adminSignUp = async (req, res, next) => {
//     const Model = req.model
//     if (!req.body.email || !req.body.password) {
//         return res.status(400).send({
//             message: 'Required fields missing',
//         })
//     }
//     const user = await Model.findOne({ email: req.body.email })
//     if (user) return res.status(200).send({ status: 'failed', message: 'Email is already in use' })
//     else {
//         try {
//             const user = await Model.create({ ...req.body, approved: true, userType: 'admin' })
//             return res.status(201).send({ status: 'ok', data: user })
//         } catch (e) {
//             console.log(e)
//             return res.status(400).send({ status: 'Error Communicating with server' })
//         }
//     }
// }

export { signup, signin, requiresLogin }
