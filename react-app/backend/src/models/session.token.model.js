import mongoose from 'mongoose'
const { Schema, model } = mongoose

const sessionTokenSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'revoked'], default: 'active' },
    expiresAt: { type: Date, required: true },
})

export const SessionToken = model('SessionToken', sessionTokenSchema)
