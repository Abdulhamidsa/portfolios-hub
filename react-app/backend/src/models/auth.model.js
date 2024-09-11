import exp from 'constants'
import mongoose from 'mongoose'
const { Schema, model } = mongoose

const credentialSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    mobile: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        trim: true,
    },
})
const Credentials = model('Credentials', credentialSchema)
export { Credentials }
