import mongoose from 'mongoose'
const { Schema, model } = mongoose

const likeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true,
    },
    likedAt: {
        type: Date,
        default: Date.now,
    },
})
export const Like = model('Like', likeSchema)
