// import { User } from '../src/models/user.model.js'
// import bcrypt from 'bcryptjs'
// import { generateNewToken, generateRefreshToken, verifyToken } from './jwt.js'
// import { Credential } from '../src/models/credential.model.js'
// import { requiredFields } from '../config/register.data.config.js'
// import { getSuccessResponse, getErrorResponse } from './api.response.js'
// export const signup = async (req, res) => {
//     const { firstName, lastName, username, dateOfBirth, email, mobile, userId } = req.body

//     for (const { field, required, message } of requiredFields) {
//         if (required && !req.body[field]) {
//             return res.status(400).json({ message })
//         }
//     }

//     try {
//         const [userByMobile, userByName, userByEmail] = await Promise.all([
//             Credential.findOne({ mobile: mobile || '' }),
//             Credential.findOne({ username }),
//             Credential.findOne({ email }),
//         ])

//         if (userByName) {
//             return getErrorResponse('Username is already in use', 409)(res)
//         }
//         if (userByEmail) {
//             return getErrorResponse('Email is already in use', 409)(res)
//         }
//         if (userByMobile) {
//             return getErrorResponse('Mobile number is already in use', 409)(res)
//         }
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         const newUser = await Credential.create({
//             userId,
//             firstName,
//             lastName,
//             username,
//             dateOfBirth,
//             password: hashedPassword,
//             email,
//             mobile,
//         })

//         return getSuccessResponse('user created succecfully', 200)(res)
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json(getErrorResponse('Server error. Please try again later.', 500))
//     }
// }

// export const signin = async (req, res) => {
//     const Model = req.model
//     const { email, password } = req.body
//     if (!email || !password) {
//         return getErrorResponse('Email and password required', 400)(res)
//     }
//     try {
//         const user = await Model.findOne({ email })
//         if (!user) {
//             return getErrorResponse('Email not registered', 400)(res)
//         }
//         if (password !== user.password) {
//             return getErrorResponse('Invalid Email or Password', 401)(res)
//         }
//         const userData = await Model.findOne({ email }).select('name email')
//         const accesstoken = generateNewToken(user)
//         res.cookie('accessToken', accesstoken, { httpOnly: false, secure: true, path: '/' })
//         const refreshToken = generateRefreshToken(user)
//         res.cookie('refreshToken', refreshToken, { httpOnly: false, secure: true, path: '/' })
//         return getSuccessResponse({ userData, accesstoken }, 200)(res)
//     } catch (error) {
//         console.error(error)
//         return getErrorResponse('Server error. Please try again later.', 500)(res)
//     }
// }
// export const requiresLogin = async (req, res, next) => {
//     const Model = Credential
//     if (!req.headers.authorization) {
//         return res.status(401).send({ message: 'not authorized' })
//     }
//     let token = req.headers.authorization.split('Bearer ')[1]
//     if (!token) {
//         return res.status(401).send({ message: 'Token not found' })
//     }
//     try {
//         const payload = await verifyToken(token)
//         const user = await Model.findById(payload.id).select('-password').lean().exec()
//         req.user = user
//         next()
//     } catch (e) {
//         console.log(e)
//         return res.status(401).send({ message: 'Not Authorized' })
//     }
// }

// const getUserProfile = (req, res) => {
//     if (!req.user) {
//         return res.status(400).json({ message: 'User not Found' })
//     }
//     res.json({ status: 'ok', data: req.user })
// }

// const updateAccountActive = async (req, res) => {
//     try {
//         const { id } = req.params
//         const update = await User.findByIdAndUpdate(
//             { _id: id },
//             {
//                 $set: {
//                     active: req.body.active,
//                 },
//             },
//             {
//                 new: true,
//             }
//         )
//         res.send(update)
//     } catch (error) {
//         res.send(error)
//     }
// }

// const updateUserProfile = async (req, res) => {
//     if (!req.user) {
//         return res.status(400).json({ message: 'User not Found' })
//     }
//     const userID = req.user._id
//     const updateObject = req.body
//     if (!updateObject) {
//         return res.status(400).json({
//             message: 'Nothing to Update',
//         })
//     }
//     try {
//         const doc = await User.findByIdAndUpdate(userID, updateObject, {
//             new: true,
//         })
//             .select('-password -identities')
//             .lean()
//             .exec()
//         return res.json({ status: 'ok', data: doc })
//     } catch (e) {
//         console.log(e.message)
//         if (e.message.includes('username_1 dup key')) {
//             return res.status(500).json({
//                 message: 'Error updating username, username already exists',
//                 error: e.message,
//             })
//         }
//         res.status(500).send({ message: 'Error performing the update', error: e.message })
//     }
// }

// const deleteUser = async (req, res) => {
//     const Model = req.model
//     if (!req.user) {
//         return res.status(400).json({ message: 'User not Found' })
//     }
//     try {
//         await Model.findOneAndDelete({ _id: req.user._id }).exec()
//         res.json({ status: 'ok', message: 'User Deleted Successfully' })
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ message: 'Error deleting User' })
//     }
// }

// const changeUserPassword = async (req, res) => {
//     const Modal = req.model
//     const { oldPassword, newPassword } = req.body
//     if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Required fields missing' })
//     if (!req.user) return res.status(400).json({ message: 'User Not Found' })
//     try {
//         const user = await Modal.findById(req.user._id)
//         const match = await user.checkPassword(oldPassword)
//         if (!match) return res.status(401).json({ message: 'incorrect old password' })
//         const doc = await Modal.findByIdAndUpdate(req.user._id)
//         if (doc) {
//             doc.password = newPassword
//             await doc.save()
//         }
//         res.json({ status: 'OK', message: 'Password Changed Successfully' })
//     } catch (e) {
//         console.log(e.message)
//         res.status(500).json({
//             message: 'Error Occurred while changing password.',
//             error: e.message,
//         })
//     }
// }

// const getUsers = async (req, res) => {
//     let { page, limit } = req.query
//     page = page * 1
//     limit = limit * 1
//     let limitVal = limit
//     let skipeValue = (page - 1) * limitVal
//     try {
//         if (!req.user) {
//             return res.status(400).json({ message: 'User Not Found' })
//         }
//         const totalRecords = await User.countDocuments({ userType: 'user' })
//         const user = await User.find({ userType: 'user' }).sort({ createdAt: -1 }).limit(limitVal).skip(skipeValue)
//         res.status(200).json({ user, totalRecords: totalRecords })
//     } catch (e) {
//         console.log(e.message)
//         res.status(500).json({ message: 'Error getting details' })
//     }
// }

// const getUser = async (req, res) => {
//     try {
//         const { id } = req.params

//         const user = await User.findOne({ _id: id })

//         if (user) {
//             return res.status(200).json({
//                 status: 'success',
//                 user,
//             })
//         } else {
//             return res.status(404).json({
//                 status: 'failed',
//                 message: "User Doesn't Exists",
//             })
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error getting details' })
//     }
// }

// const forgotPassword = async (req, res) => {
//     let password
//     const user = await User.findOne({ email: req.body.email })
//     if (!user) return res.status(200).send({ status: 'failed', message: 'Email is not registered with us' })
//     else {
//         password = generatePassword(8)
//         const hash = await bcrypt.hash(password, 8)
//         const updateQuery = req.body
//         try {
//             await User.findOneAndUpdate(updateQuery, { password: hash }, { new: true })
//             //send email or sms to send new password subscribe to a service like sendgrid or AWS SES
//             res.status(200).send({
//                 status: 'success',
//                 message: 'New password generated successfully. Please check ur email.',
//             })
//         } catch (error) {
//             return res.status(500).json({ status: 'failed', message: 'error.message' })
//         }
//     }
// }

// function generatePassword(length) {
//     var result = ''
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     var charactersLength = characters.length
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength))
//     }
//     return result
// }

// export {
//     getUserProfile,
//     updateUserProfile,
//     deleteUser,
//     forgotPassword,
//     changeUserPassword,
//     getUsers,
//     getUser,
//     updateAccountActive,
// }
