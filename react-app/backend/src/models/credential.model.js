import mongoose from 'mongoose'
const { Schema, model } = mongoose

const credentialSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
    },

    dateOfBirth: {
        type: Date,
    },
    password: {
        type: String,
        trim: true,
    },
})
const Credential = model('Credential', credentialSchema)
export { Credential }
