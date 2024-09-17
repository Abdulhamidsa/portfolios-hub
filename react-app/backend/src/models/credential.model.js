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
    email: {
        type: String,
        unique: true,
        required: true,
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
const Credential = model('Credential', credentialSchema)
export { Credential }
